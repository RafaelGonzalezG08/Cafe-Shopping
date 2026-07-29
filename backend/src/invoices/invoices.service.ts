import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EstadoFactura } from '@prisma/client';
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
    const html = renderInvoiceHtml(sale as any, sale.invoice.numero, business);

    try {
      const [pngBuffer, pdfBuffer] = await Promise.all([
        this.render.htmlToPng(html),
        this.render.htmlToPdf(html),
      ]);

      const keyBase = `invoices/${sale.invoice.numero}`;
      const [pngUrl, pdfUrl] = await Promise.all([
        this.storage.upload(pngBuffer, `${keyBase}.png`, 'image/png'),
        this.storage.upload(pdfBuffer, `${keyBase}.pdf`, 'application/pdf'),
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
    const mensaje = `Hola ${sale.client.nombre}, gracias por tu compra en ${business.nombre}. Adjuntamos tu factura ${invoice.numero} por un total de ${Number(sale.total).toFixed(2)}.`;

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
      s3: this.storage.isS3Configured,
    };
  }
}
