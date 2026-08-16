import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { extname, join } from 'path';
import { EstadoFactura, MetodoPago } from '../common/enums';
import { UPLOADS_DIR } from '../common/paths';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { RenderService } from './render.service';
import { StorageService } from './storage.service';
import { WhatsappService } from './whatsapp.service';
import { renderInvoiceHtml } from './invoice.template';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly render: RenderService,
    private readonly storage: StorageService,
    private readonly whatsapp: WhatsappService,
  ) {}

  /** Renderiza el PNG (y PDF) de la factura de una venta y sube los archivos. */
  async generateForSale(saleId: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id: saleId },
      include: { items: true, client: true, user: { select: { nombre: true } }, invoice: true, payments: true },
    });
    if (!sale) throw new NotFoundException('Venta no encontrada.');
    if (!sale.invoice) throw new NotFoundException('La venta no tiene una factura asociada.');

    const business = await this.getBusinessProfile();
    // El render corre en una pagina "data:text/html" (ver nativo.js ->
    // renderizarParaBackend): no tiene origen ni carpeta propia, asi que una
    // ruta relativa como "/uploads/logo/x.webp" nunca puede cargar - el logo
    // simplemente no aparecia. Se incrusta como base64 para que no dependa
    // de resolver ninguna ruta.
    const logoParaFactura = await this.resolverLogoParaFactura(business.logoUrl);
    const html = renderInvoiceHtml(sale as any, sale.invoice.numero, { ...business, logoUrl: logoParaFactura });

    try {
      const [pngBuffer, pdfBuffer] = await Promise.all([
        this.render.htmlToPng(html),
        this.render.htmlToPdf(html),
      ]);

      const keyBase = `invoices/${sale.invoice.numero}`;
      const [pngUrl, pdfUrl] = await Promise.all([
        this.storage.upload(pngBuffer, `${keyBase}.png`),
        this.storage.upload(pdfBuffer, `${keyBase}.pdf`),
      ]);

      const updated = await this.prisma.invoice.update({
        where: { saleId },
        data: { pngUrl, pdfUrl, estado: EstadoFactura.GENERADA, ultimoError: null },
      });

      return updated;
    } catch (error: any) {
      this.logger.error(`Error generando factura para venta ${saleId}: ${error?.message ?? error}`);
      await this.prisma.invoice.update({
        where: { saleId },
        data: { estado: EstadoFactura.ERROR, ultimoError: String(error?.message ?? error) },
      });
      throw error;
    }
  }

  /** Genera (si hace falta) y envia la factura por WhatsApp al cliente de la venta. */
  async sendWhatsapp(saleId: string, userId?: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id: saleId },
      include: { client: true, invoice: true },
    });
    if (!sale) throw new NotFoundException('Venta no encontrada.');
    if (!sale.client?.telefono) {
      throw new BadRequestException('La venta no tiene un cliente con telefono asociado.');
    }

    let invoice = sale.invoice;
    if (!invoice?.pngUrl) {
      invoice = await this.generateForSale(saleId);
    }
    if (!invoice.pngUrl) {
      throw new BadRequestException('No se pudo generar el PNG de la factura.');
    }

    const business = await this.getBusinessProfile();
    // Al contado: mensaje breve, sin el monto (ya va en la imagen adjunta) y
    // dando las gracias. A credito se deja el mensaje con el monto: ahi si
    // importa que el cliente vea de una cuanto quedo debiendo.
    const firma = `${business.nombre}\n_un placer al comprar_`;
    const mensaje =
      sale.metodoPago === MetodoPago.CREDITO
        ? `Hola ${sale.client.nombre}, gracias por tu compra en ${business.nombre}. Adjuntamos tu factura ${invoice.numero} por un total de ${Number(sale.total).toFixed(2)}.`
        : `¡Hola ${sale.client.nombre}! Gracias por tu compra. Aqui tienes tu factura ${invoice.numero}.\n\n${firma}`;

    // El agente de WhatsApp Desktop (send_whatsapp_agent.ahk) saca el PNG
    // directamente del volumen local de uploads, por eso se le pasa la key
    // relativa (ej. "invoices/FAC-2026-00010.png") y no la URL publica.
    const pngKey = `invoices/${invoice.numero}.png`;
    const result = await this.whatsapp.sendInvoice(sale.client.telefono, pngKey, mensaje);

    const updated = await this.prisma.invoice.update({
      where: { saleId },
      data: result.ok
        ? { estado: EstadoFactura.ENVIADA, sentWhatsappAt: new Date(), ultimoError: null }
        : { estado: EstadoFactura.ERROR, ultimoError: result.errorMessage },
    });

    await this.audit.log('Invoice', invoice.id, 'UPDATE', userId, {
      accion: 'send-whatsapp',
      ok: result.ok,
      sid: result.sid,
    });

    if (!result.ok) {
      throw new BadRequestException(
        `No se pudo enviar la factura por WhatsApp: ${result.errorMessage}`,
      );
    }

    return updated;
  }

  async findBySaleId(saleId: string) {
    const invoice = await this.prisma.invoice.findUnique({ where: { saleId } });
    if (!invoice) throw new NotFoundException('Factura no encontrada.');
    return invoice;
  }

  /**
   * Envia un recordatorio de saldo pendiente por WhatsApp (usado por Cobros).
   * Reusa el mismo agente .ahk que el envio normal de facturas: adjunta el
   * PNG de la factura de la venta (generandolo si hiciera falta) junto con
   * el texto del recordatorio, en vez del link manual wa.me de antes.
   */
  async sendDebtReminder(saleId: string, saldo: number, userId?: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id: saleId },
      include: { client: true, invoice: true },
    });
    if (!sale) throw new NotFoundException('Venta no encontrada.');
    if (!sale.client?.telefono) {
      throw new BadRequestException('El cliente no tiene un telefono registrado.');
    }

    let invoice = sale.invoice;
    if (!invoice?.pngUrl) {
      invoice = await this.generateForSale(saleId);
    }
    if (!invoice.pngUrl) {
      throw new BadRequestException('No se pudo generar el PNG de la factura.');
    }

    const business = await this.getBusinessProfile();
    const mensaje =
      `Hola ${sale.client.nombre}, te saludamos de ${business.nombre}. ` +
      `Te recordamos tu saldo pendiente de RD$ ${saldo.toFixed(2)} (factura ${invoice.numero}). ` +
      `Cualquier duda, con gusto te ayudamos. ¡Gracias!`;

    const pngKey = `invoices/${invoice.numero}.png`;
    const result = await this.whatsapp.sendInvoice(sale.client.telefono, pngKey, mensaje);

    await this.audit.log('Invoice', invoice.id, 'UPDATE', userId, {
      accion: 'recordatorio-whatsapp',
      ok: result.ok,
      sid: result.sid,
    });

    if (!result.ok) {
      throw new BadRequestException(`No se pudo enviar el recordatorio por WhatsApp: ${result.errorMessage}`);
    }

    return { ok: true };
  }

  /**
   * Convierte el logo (guardado como ruta relativa "/uploads/logo/x.webp")
   * en un data URI base64, para que se vea en la factura. Si ya es una URL
   * absoluta (BACKEND_PUBLIC_URL configurado) se deja tal cual, porque esa
   * si carga bien desde cualquier pagina. Si el archivo no se puede leer, la
   * factura sigue generandose igual, solo que sin logo.
   */
  private async resolverLogoParaFactura(logoUrl: string | null | undefined): Promise<string | null> {
    if (!logoUrl) return null;
    if (/^https?:\/\//i.test(logoUrl)) return logoUrl;

    const relativa = logoUrl.replace(/^\/uploads\//, '');
    const ruta = join(UPLOADS_DIR, relativa);
    try {
      const buffer = await fs.readFile(ruta);
      const ext = extname(ruta).slice(1).toLowerCase() || 'png';
      const mime = ext === 'jpg' ? 'jpeg' : ext;
      return `data:image/${mime};base64,${buffer.toString('base64')}`;
    } catch (error) {
      this.logger.warn(`No se pudo leer el logo (${ruta}) para incrustarlo en la factura: ${error}`);
      return null;
    }
  }

  private async getBusinessProfile() {
    const profile = await this.prisma.businessProfile.findFirst();
    return (
      profile ?? {
        nombre: 'Cafe Shopping',
        logoUrl: null,
        direccion: null,
        identifFiscal: null,
      }
    );
  }

  get integrationsStatus() {
    return {
      whatsapp: this.whatsapp.isConfigured,
    };
  }
}
