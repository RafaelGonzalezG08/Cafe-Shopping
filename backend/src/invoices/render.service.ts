import { Injectable, Logger } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';
import sharp from 'sharp';

/**
 * Envuelve Puppeteer para convertir el HTML de la factura en PNG o PDF.
 *
 * PNG: se usa un screenshot directo del HTML (control total del diseño visual,
 * ideal para enviar por WhatsApp). PDF: se usa page.pdf() para descargas/impresion.
 *
 * Reutiliza una sola instancia de Chromium entre llamadas para no pagar el costo
 * de arranque en cada factura; se relanza automaticamente si el browser muere.
 */
@Injectable()
export class RenderService {
  private readonly logger = new Logger(RenderService.name);
  private browserPromise: Promise<Browser> | null = null;

  private async getBrowser(): Promise<Browser> {
    if (!this.browserPromise) {
      this.browserPromise = puppeteer.launch({
        headless: true,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    }
    try {
      const browser = await this.browserPromise;
      if (!browser.isConnected()) throw new Error('Browser desconectado');
      return browser;
    } catch (error) {
      this.logger.warn(`Reiniciando instancia de Chromium: ${error}`);
      this.browserPromise = null;
      return this.getBrowser();
    }
  }

  async htmlToPng(html: string, viewportWidth = 420, scale = 3): Promise<Buffer> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    try {
      // deviceScaleFactor simula una pantalla "retina": Chromium renderiza a
      // `scale`x la resolucion base sin cambiar el layout (sigue siendo un
      // viewport de `viewportWidth` px de CSS), asi el PNG sale nitido incluso
      // si el cliente hace zoom al verlo en WhatsApp.
      await page.setViewport({ width: viewportWidth, height: 800, deviceScaleFactor: scale });
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const element = await page.$('.ticket');
      const screenshot = await (element ?? page).screenshot({ type: 'png' });
      return this.compressPng(Buffer.from(screenshot));
    } finally {
      await page.close();
    }
  }

  /**
   * Reduce el peso del PNG de la factura sin cambiar formato ni resolucion.
   *
   * Sigue siendo PNG a proposito: el agente de WhatsApp lo pega usando
   * `Set-Clipboard -Path` + Ctrl+V en WhatsApp Desktop (ver
   * send_whatsapp_agent.ahk), y ahi el formato importa — WhatsApp trata los
   * .webp como STICKERS, asi que convertirlo, aunque pesara menos, mandaria
   * la factura como sticker en vez de como imagen.
   *
   * Tampoco se baja la resolucion: se mantiene el render 3x para que el
   * cliente pueda hacer zoom sin que se vea pixelada.
   *
   * Lo que si se hace es reducir la paleta a 256 colores. Una factura es
   * texto plano sobre fondo claro con unos pocos tonos de marca, asi que
   * entra de sobra en 256 colores y el resultado es visualmente identico,
   * pero pesa ~60% menos (medido sobre facturas reales: 191 KB -> 73 KB).
   */
  private async compressPng(png: Buffer): Promise<Buffer> {
    try {
      const compressed = await sharp(png)
        .png({ palette: true, colours: 256, compressionLevel: 9, effort: 10 })
        .toBuffer();

      // Si por lo que sea la version con paleta saliera mas pesada, se queda
      // la original: el objetivo es que pese menos, no aplicar el filtro porque si.
      return compressed.length < png.length ? compressed : png;
    } catch (error) {
      this.logger.warn(`No se pudo comprimir el PNG de la factura, se envia sin comprimir: ${error}`);
      return png;
    }
  }

  async htmlToPdf(html: string): Promise<Buffer> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    try {
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const pdf = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '20px', bottom: '20px' } });
      return Buffer.from(pdf);
    } finally {
      await page.close();
    }
  }

  async onModuleDestroy() {
    if (this.browserPromise) {
      const browser = await this.browserPromise;
      await browser.close();
    }
  }
}
