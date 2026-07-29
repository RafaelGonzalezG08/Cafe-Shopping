import { Injectable, Logger } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';

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

  async htmlToPng(html: string, viewportWidth = 420): Promise<Buffer> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: viewportWidth, height: 800 });
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const element = await page.$('.ticket');
      const screenshot = await (element ?? page).screenshot({ type: 'png' });
      return Buffer.from(screenshot);
    } finally {
      await page.close();
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
