import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import { join } from 'path';

export interface WhatsappSendResult {
  ok: boolean;
  sid?: string;
  errorMessage?: string;
}

/**
 * Envia facturas por WhatsApp usando WhatsApp Desktop en la PC del negocio,
 * en vez de Twilio (API paga) o un bucket S3 publico.
 *
 * Como funciona:
 * 1) Este servicio deja un archivo "pedido" (.job) en uploads/whatsapp-queue/.
 *    Esa carpeta vive dentro del mismo volumen Docker (backend_uploads) que ya
 *    usa el script send_whatsapp_agent.ahk para sacar los PNG de las facturas.
 * 2) El script .ahk corre en la PC como un agente en segundo plano: revisa esa
 *    carpeta cada pocos segundos, y cuando encuentra un .job saca el PNG del
 *    volumen, lo pega en el chat de WhatsApp Desktop del cliente junto con el
 *    texto de la factura, y escribe la confirmacion en uploads/whatsapp-results/.
 * 3) Este servicio espera (poll) esa confirmacion un tiempo maximo y responde.
 *
 * IMPORTANTE: para que esto funcione, send_whatsapp_agent.ahk debe estar
 * corriendo en la PC donde esta abierto WhatsApp Desktop.
 */
@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly uploadsDir = join(process.cwd(), 'uploads');
  private readonly queueDir = join(this.uploadsDir, 'whatsapp-queue');
  private readonly resultsDir = join(this.uploadsDir, 'whatsapp-results');

  /** Cuanto esperamos a que el agente de WhatsApp confirme el envio. */
  private readonly timeoutMs = Number(process.env.WHATSAPP_AGENT_TIMEOUT_MS || 60000);
  /** Cada cuanto revisamos si ya llego la confirmacion. */
  private readonly pollMs = Number(process.env.WHATSAPP_AGENT_POLL_MS || 1500);

  get isConfigured(): boolean {
    // El agente local no requiere credenciales: siempre esta "configurado".
    // Lo unico que puede fallar en tiempo real es que el .ahk no este corriendo,
    // lo cual se refleja como timeout al enviar, no aqui.
    return true;
  }

  /**
   * Encola el envio de una factura. `pngKey` es la ruta relativa dentro de
   * uploads (ej. "invoices/FAC-2026-00010.png"), la misma que arma
   * StorageService al guardar el archivo localmente.
   */
  async sendInvoice(toPhone: string, pngKey: string, message: string): Promise<WhatsappSendResult> {
    const jobId = randomUUID();
    const filename = pngKey.split('/').pop() ?? pngKey;

    try {
      await fs.mkdir(this.queueDir, { recursive: true });
      await fs.mkdir(this.resultsDir, { recursive: true });

      const jobPath = join(this.queueDir, `${jobId}.job`);
      const jobContent = buildJobFile({ phone: normalizePhone(toPhone), filename, message });
      await fs.writeFile(jobPath, jobContent, 'utf-8');

      this.logger.log(`Factura encolada para WhatsApp (job ${jobId}, archivo ${filename}).`);

      const result = await this.waitForResult(jobId);
      return result;
    } catch (error: any) {
      this.logger.error(`Error encolando WhatsApp para ${toPhone}: ${error?.message ?? error}`);
      return { ok: false, errorMessage: error?.message ?? 'Error desconocido encolando el envio.' };
    }
  }

  private async waitForResult(jobId: string): Promise<WhatsappSendResult> {
    const resultPath = join(this.resultsDir, `${jobId}.result`);
    const deadline = Date.now() + this.timeoutMs;

    while (Date.now() < deadline) {
      try {
        const raw = await fs.readFile(resultPath, 'utf-8');
        await fs.unlink(resultPath).catch(() => undefined);
        return parseResultFile(raw, jobId);
      } catch {
        // Todavia no existe el resultado: seguimos esperando.
        await sleep(this.pollMs);
      }
    }

    const msg =
      'El agente de WhatsApp (send_whatsapp_agent.ahk) no confirmo el envio a tiempo. ' +
      'Verifica que el script este corriendo en la PC y que WhatsApp Desktop este abierto.';
    this.logger.warn(`Timeout esperando confirmacion del job ${jobId}.`);
    return { ok: false, sid: jobId, errorMessage: msg };
  }
}

function buildJobFile(data: { phone: string; filename: string; message: string }): string {
  // Formato simple linea a linea (clave=valor) para que el .ahk lo pueda leer
  // sin necesitar una libreria de JSON. `message` va siempre en la ultima
  // linea y puede contener "=", por eso se parte solo en el primer "=".
  return [`phone=${data.phone}`, `filename=${data.filename}`, `message=${data.message}`].join('\n');
}

function parseResultFile(raw: string, jobId: string): WhatsappSendResult {
  const firstLine = raw.split(/\r?\n/, 1)[0]?.trim() ?? '';
  if (firstLine.startsWith('OK')) {
    return { ok: true, sid: jobId };
  }
  const errorMessage = firstLine.startsWith('ERROR:')
    ? firstLine.slice('ERROR:'.length).trim() || 'El agente de WhatsApp reporto un error sin detalle.'
    : firstLine || 'El agente de WhatsApp reporto un error sin detalle.';
  return { ok: false, sid: jobId, errorMessage };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Asegura formato E.164 basico (+codigoPais...). No sustituye una libreria completa de validacion. */
function normalizePhone(phone: string): string {
  const trimmed = phone.trim();
  return trimmed.startsWith('+') ? trimmed : `+${trimmed.replace(/[^0-9]/g, '')}`;
}
