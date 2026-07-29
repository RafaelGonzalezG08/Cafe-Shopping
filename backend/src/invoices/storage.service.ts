import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { promises as fs } from 'fs';
import { join } from 'path';

/**
 * Sube archivos a S3 (o cualquier proveedor S3-compatible, ej. DigitalOcean Spaces
 * via S3_ENDPOINT) cuando hay credenciales configuradas. Si no las hay, cae a
 * disco local bajo /uploads (servido estaticamente por main.ts) para poder
 * desarrollar y probar sin depender de un bucket real.
 *
 * NOTA: el envio de facturas por WhatsApp (ver whatsapp.service.ts) ya NO
 * depende de que este archivo sea accesible publicamente: send_whatsapp_
 * agent.ahk lee el PNG directo del disco local (volumen backend_uploads), sin
 * pasar por una URL. S3 aqui solo importa si quieres que el link de descarga
 * de la factura se pueda abrir desde fuera de tu propia PC.
 */
@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3Client: S3Client | null;
  private readonly bucket = process.env.S3_BUCKET;
  private readonly localDir = join(process.cwd(), 'uploads');

  constructor() {
    this.s3Client = this.bucket
      ? new S3Client({
          region: process.env.S3_REGION || 'us-east-1',
          endpoint: process.env.S3_ENDPOINT || undefined,
          forcePathStyle: Boolean(process.env.S3_ENDPOINT),
          credentials:
            process.env.S3_KEY && process.env.S3_SECRET
              ? { accessKeyId: process.env.S3_KEY, secretAccessKey: process.env.S3_SECRET }
              : undefined,
        })
      : null;
  }

  get isS3Configured(): boolean {
    return Boolean(this.s3Client);
  }

  async upload(buffer: Buffer, key: string, contentType: string): Promise<string> {
    if (this.s3Client && this.bucket) {
      // AWS S3 y DigitalOcean Spaces usan ACL por objeto para hacerlo publico.
      // Cloudflare R2 (y algunos otros proveedores S3-compatibles) no soportan
      // ese parametro y manejan el acceso publico desde su panel en su lugar,
      // asi que lo omitimos cuando hay un S3_ENDPOINT personalizado que no es AWS.
      const usaAclPorObjeto = !process.env.S3_ENDPOINT;

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: buffer,
          ContentType: contentType,
          ...(usaAclPorObjeto ? { ACL: 'public-read' as const } : {}),
        }),
      );
      const base = process.env.S3_PUBLIC_URL?.replace(/\/$/, '');
      return base ? `${base}/${key}` : `https://${this.bucket}.s3.amazonaws.com/${key}`;
    }

    // Fallback local para desarrollo
    const filePath = join(this.localDir, key);
    await fs.mkdir(join(filePath, '..'), { recursive: true });
    await fs.writeFile(filePath, buffer);
    this.logger.warn(
      `S3 no configurado: "${key}" se guardo localmente. El envio por WhatsApp requiere una URL publica.`,
    );
    const backendUrl = process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 3000}`;
    return `${backendUrl}/uploads/${key}`;
  }
}
