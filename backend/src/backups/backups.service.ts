import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import { promisify } from 'util';
import { promises as fs, createReadStream, createWriteStream } from 'fs';
import { createGzip, createGunzip } from 'zlib';
import { pipeline as pipelineCb } from 'stream';
import { join, isAbsolute, resolve } from 'path';
import { PrismaService } from '../prisma/prisma.service';

const execAsync = promisify(exec);
const pipeline = promisify(pipelineCb);

/**
 * Ruta real del archivo .db a partir de DATABASE_URL ("file:./cafe.db").
 * Se necesita para restaurar, porque restaurar en SQLite es literalmente
 * reemplazar ese archivo.
 */
function resolveSqliteFile(): string {
  const url = process.env.DATABASE_URL;
  if (!url?.startsWith('file:')) {
    throw new Error('DATABASE_URL debe apuntar a un archivo SQLite (file:...).');
  }
  const ruta = url.slice('file:'.length);
  // Prisma resuelve las rutas relativas respecto a la carpeta del schema.
  return isAbsolute(ruta) ? ruta : resolve(process.cwd(), 'prisma', ruta);
}

const BACKUP_DIR = process.env.BACKUP_DIR || join(process.cwd(), 'backups');
const UPLOADS_DIR = join(process.cwd(), 'uploads');
const RETENTION_DAYS = Number(process.env.BACKUP_RETENTION_DAYS ?? 30);
const INTERVAL_DAYS = Number(process.env.BACKUP_INTERVAL_DAYS ?? 3);
const MARKER_FILE = join(BACKUP_DIR, '.last-backup.json');

/**
 * Respalda la base de datos (pg_dump) y la carpeta de uploads cada
 * `BACKUP_INTERVAL_DAYS` dias (3 por defecto), guardandolos SIEMPRE en
 * /app/backups, en disco local — nunca en S3/R2, a proposito: el bucket de
 * R2 esta configurado con lectura publica (para que WhatsApp vea las
 * facturas), y un respaldo completo de la base de datos ahi expondria datos
 * sensibles de clientes (telefonos, montos, contraseñas hasheadas).
 *
 * Ese directorio /app/backups se monta como volumen desde docker-compose.yml
 * a una carpeta del host (ver BACKUP_HOST_DIR en docker-compose.yml) - si
 * quieres una copia fuera de tu propia PC, la forma recomendada es apuntar
 * BACKUP_HOST_DIR a una carpeta dentro de tu OneDrive/Google Drive/Dropbox
 * *privados*: el propio cliente de sincronizacion de Windows la sube solo,
 * sin necesitar credenciales ni integraciones adicionales, y sigue siendo
 * una carpeta privada tuya (no un bucket con lectura publica).
 *
 * Se usa un archivo marcador (en vez de un setInterval en memoria) para que
 * la periodicidad de "cada 3 dias" sobreviva a reinicios del contenedor.
 */
@Injectable()
export class BackupsService {
  private readonly logger = new Logger(BackupsService.name);
  private running = false;

  // Se usa para el snapshot con VACUUM INTO y para soltar/retomar la conexion
  // al restaurar (Windows no permite sobrescribir un archivo abierto).
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async checkAndRun() {
    const last = await this.getLastRun();
    const dueMs = INTERVAL_DAYS * 24 * 60 * 60 * 1000;
    if (last && Date.now() - last.getTime() < dueMs) return;
    await this.run();
  }

  async getLastRun(): Promise<Date | null> {
    try {
      const raw = await fs.readFile(MARKER_FILE, 'utf-8');
      const data = JSON.parse(raw);
      return data.timestamp ? new Date(data.timestamp) : null;
    } catch {
      return null;
    }
  }

  /** Info para mostrar en Configuracion: ultimo respaldo y archivos guardados. */
  async list() {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    const files = await fs.readdir(BACKUP_DIR);
    const items = await Promise.all(
      files
        .filter((f) => !f.startsWith('.'))
        .map(async (f) => {
          const stat = await fs.stat(join(BACKUP_DIR, f));
          return { name: f, sizeBytes: stat.size, createdAt: stat.mtime };
        }),
    );
    items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return {
      lastRun: await this.getLastRun(),
      intervalDays: INTERVAL_DAYS,
      retentionDays: RETENTION_DAYS,
      files: items,
    };
  }

  /** Ejecuta el respaldo ahora mismo (usado por el cron y por el boton manual). */
  async run(): Promise<{ ok: boolean; error?: string }> {
    if (this.running) return { ok: false, error: 'Ya hay un respaldo en curso.' };
    this.running = true;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    try {
      await fs.mkdir(BACKUP_DIR, { recursive: true });

      const dbFile = join(BACKUP_DIR, `db-${timestamp}.sqlite.gz`);
      const snapshotFile = join(BACKUP_DIR, `.snapshot-${timestamp}.sqlite`);

      // "VACUUM INTO" es la forma correcta de respaldar SQLite mientras la
      // app esta en uso: pide a SQLite que escriba una copia consistente y ya
      // compactada. Copiar el archivo con fs.copyFile seria mas simple pero
      // peligroso — si alguien esta cobrando una venta en ese instante, la
      // copia puede quedar a medio escribir y el respaldo naceria corrupto,
      // justo el dia que haga falta.
      await this.prisma.$executeRawUnsafe(`VACUUM INTO '${snapshotFile.replace(/'/g, "''")}'`);

      const rawStat = await fs.stat(snapshotFile);
      if (rawStat.size < 200) {
        await fs.unlink(snapshotFile).catch(() => undefined);
        throw new Error(
          `La copia de la base de datos salio sospechosamente pequeña (${rawStat.size} bytes).`,
        );
      }

      // Se comprime con zlib (incluido en Node) en vez de invocar "gzip":
      // corriendo nativo en Windows ese comando no existe, y el respaldo
      // fallaria en la PC del cliente aunque aqui funcione por tener Git.
      await pipeline(createReadStream(snapshotFile), createGzip(), createWriteStream(dbFile));
      await fs.unlink(snapshotFile).catch(() => undefined);

      let uploadsFile: string | null = null;
      try {
        const hasUploads = await fs
          .readdir(UPLOADS_DIR)
          .then((list) => list.length > 0)
          .catch(() => false);
        if (hasUploads) {
          uploadsFile = join(BACKUP_DIR, `uploads-${timestamp}.tar.gz`);
          await execAsync(`tar -czf "${uploadsFile}" -C "${process.cwd()}" uploads`);
        }
      } catch (error) {
        this.logger.warn(`No se pudo respaldar la carpeta de uploads: ${error}`);
      }

      await fs.writeFile(
        MARKER_FILE,
        JSON.stringify({ timestamp: new Date().toISOString(), files: [dbFile, uploadsFile].filter(Boolean) }),
      );

      await this.cleanupOld();
      this.logger.log(`Respaldo completado (local): ${dbFile}${uploadsFile ? ` + ${uploadsFile}` : ''}`);
      return { ok: true };
    } catch (error: any) {
      this.logger.error(`Fallo el respaldo: ${error?.message ?? error}`);
      return { ok: false, error: String(error?.message ?? error) };
    } finally {
      this.running = false;
    }
  }

  /**
   * Restaura la base de datos (y los uploads, si el respaldo los incluye) a
   * partir de un archivo db-<timestamp>.sql.gz de la lista de `list()`.
   * DESTRUCTIVO: reemplaza los datos actuales por los del respaldo. Por eso
   * solo se expone a ADMIN (ver backups.controller.ts) y el frontend pide
   * confirmacion antes de llamarlo.
   */
  async restore(dbFileName: string): Promise<{ ok: boolean; error?: string; restoredUploads?: boolean }> {
    if (this.running) return { ok: false, error: 'Hay un respaldo/restauracion en curso, intenta en un momento.' };
    if (!/^db-[\w.-]+\.sqlite\.gz$/.test(dbFileName)) {
      return { ok: false, error: 'Nombre de archivo de respaldo invalido.' };
    }
    this.running = true;
    try {
      const dbFile = join(BACKUP_DIR, dbFileName);
      const exists = await fs
        .access(dbFile)
        .then(() => true)
        .catch(() => false);
      if (!exists) throw new Error(`No se encontro el respaldo ${dbFileName}.`);

      // Se descomprime a un archivo aparte y se valida ANTES de tocar la base
      // en uso: si el .gz estuviera corrupto, descubrirlo despues de haber
      // borrado la base actual dejaria al negocio sin datos y sin respaldo.
      const restoredFile = join(BACKUP_DIR, `.restore-${Date.now()}.sqlite`);
      await pipeline(createReadStream(dbFile), createGunzip(), createWriteStream(restoredFile));

      const restoreStat = await fs.stat(restoredFile);
      if (restoreStat.size < 200) {
        await fs.unlink(restoredFile).catch(() => undefined);
        throw new Error(
          `El respaldo ${dbFileName} esta vacio o corrupto (${restoreStat.size} bytes) — no se puede restaurar. ` +
            `Prueba con otro punto de la lista.`,
        );
      }
      // Comprobacion extra: que sea de verdad una base SQLite (los primeros
      // 16 bytes de todo archivo SQLite son "SQLite format 3\0").
      const cabecera = await fs.readFile(restoredFile, { encoding: 'latin1', flag: 'r' }).then((c) => c.slice(0, 15));
      if (cabecera !== 'SQLite format 3') {
        await fs.unlink(restoredFile).catch(() => undefined);
        throw new Error(`El respaldo ${dbFileName} no parece una base de datos valida.`);
      }

      this.logger.warn(`Restaurando base de datos desde ${dbFileName} ...`);

      // Con SQLite "restaurar" es reemplazar el archivo. Hay que soltar la
      // conexion primero (Windows no deja sobrescribir un archivo abierto) y
      // volver a conectar despues. Se guarda la base actual como .anterior
      // por si la restauracion resulta ser la decision equivocada.
      const rutaActual = resolveSqliteFile();
      await this.prisma.$disconnect();
      try {
        await fs.rename(rutaActual, `${rutaActual}.anterior`).catch(() => undefined);
        await fs.copyFile(restoredFile, rutaActual);
      } finally {
        await this.prisma.$connect();
      }
      await fs.unlink(restoredFile).catch(() => undefined);

      // El archivo de uploads comparte el mismo sufijo de timestamp que el
      // de la base de datos (ej. db-2026-...gz / uploads-2026-...tar.gz).
      const timestamp = dbFileName.slice('db-'.length, -'.sql.gz'.length);
      const uploadsFile = join(BACKUP_DIR, `uploads-${timestamp}.tar.gz`);
      const hasUploadsBackup = await fs
        .access(uploadsFile)
        .then(() => true)
        .catch(() => false);

      let restoredUploads = false;
      if (hasUploadsBackup) {
        this.logger.warn(`Restaurando carpeta de uploads desde uploads-${timestamp}.tar.gz ...`);
        // fs.rm en vez de "rm -rf": ese comando no existe en Windows nativo.
        await fs.rm(UPLOADS_DIR, { recursive: true, force: true });
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await execAsync(`tar -xzf "${uploadsFile}" -C "${process.cwd()}"`);
        restoredUploads = true;
      }

      this.logger.warn(`Restauracion completada desde ${dbFileName}.`);
      return { ok: true, restoredUploads };
    } catch (error: any) {
      this.logger.error(`Fallo la restauracion: ${error?.message ?? error}`);
      return { ok: false, error: String(error?.message ?? error) };
    } finally {
      this.running = false;
    }
  }

  private async cleanupOld() {
    const files = await fs.readdir(BACKUP_DIR);
    const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
    for (const file of files) {
      if (file.startsWith('.')) continue;
      const filePath = join(BACKUP_DIR, file);
      const stat = await fs.stat(filePath);
      if (stat.mtimeMs < cutoff) {
        await fs.unlink(filePath);
        this.logger.log(`Respaldo antiguo eliminado (> ${RETENTION_DAYS} dias): ${file}`);
      }
    }
  }
}
