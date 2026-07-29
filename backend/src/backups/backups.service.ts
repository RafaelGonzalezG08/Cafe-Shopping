import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import { promisify } from 'util';
import { promises as fs } from 'fs';
import { join } from 'path';

const execAsync = promisify(exec);

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

      const dbUrl = process.env.DATABASE_URL;
      if (!dbUrl) throw new Error('DATABASE_URL no esta configurada.');
      const dbFile = join(BACKUP_DIR, `db-${timestamp}.sql.gz`);
      const rawSqlFile = join(BACKUP_DIR, `db-${timestamp}.sql`);
      // Se referencia $DATABASE_URL (heredada del entorno del proceso) en vez
      // de interpolar el valor directo en el comando, para no exponer la
      // contraseña en logs ni arriesgar problemas si tuviera caracteres
      // especiales para el shell.
      // --clean --if-exists: hace que el dump incluya sentencias DROP antes
      // de cada CREATE, para que se pueda restaurar sobre una base de datos
      // que ya tiene tablas (botón "Restaurar" abajo) sin que truene por
      // "relation already exists".
      //
      // IMPORTANTE: se dumpea a un archivo plano con -f en vez de
      // "pg_dump | gzip > archivo". Con una tuberia, el codigo de salida que
      // ve Node es el de gzip (el ULTIMO comando), no el de pg_dump — si
      // pg_dump fallaba (credenciales, version, lo que sea), gzip igual
      // comprimia "nada" y quedaba un .gz valido pero vacio de ~20 bytes,
      // reportando el respaldo como exitoso sin serlo. Con -f, un fallo de
      // pg_dump se ve como un fallo real de este comando.
      const dump = await execAsync(`pg_dump --clean --if-exists "$DATABASE_URL" -f "${rawSqlFile}"`);
      if (dump.stderr?.trim()) {
        this.logger.warn(`pg_dump stderr (respaldo igual continua si el exit code fue 0): ${dump.stderr.trim()}`);
      }

      const rawStat = await fs.stat(rawSqlFile);
      if (rawStat.size < 200) {
        throw new Error(
          `El dump de la base de datos salio sospechosamente pequeño (${rawStat.size} bytes). ` +
            `Revisa la conexion/version de pg_dump en el contenedor del backend.`,
        );
      }

      await execAsync(`gzip -f "${rawSqlFile}"`);

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
    if (!/^db-[\w.-]+\.sql\.gz$/.test(dbFileName)) {
      return { ok: false, error: 'Nombre de archivo de respaldo invalido.' };
    }
    this.running = true;
    try {
      const dbUrl = process.env.DATABASE_URL;
      if (!dbUrl) throw new Error('DATABASE_URL no esta configurada.');

      const dbFile = join(BACKUP_DIR, dbFileName);
      const exists = await fs
        .access(dbFile)
        .then(() => true)
        .catch(() => false);
      if (!exists) throw new Error(`No se encontro el respaldo ${dbFileName}.`);

      // Igual que en run(): se evita "gunzip -c archivo | psql", porque el
      // codigo de salida que ve Node ahi es el de psql (el ultimo comando de
      // la tuberia). Si el .gz estuviera corrupto o vacio, gunzip fallaria
      // pero psql (sin nada que ejecutar) igual saldria con exito, y la
      // restauracion se reportaria como completada sin restaurar nada. Por
      // eso primero se descomprime a un archivo plano y se revisa su tamaño.
      const restoreSqlFile = join(BACKUP_DIR, `.restore-${Date.now()}.sql`);
      await execAsync(`gunzip -c "${dbFile}" > "${restoreSqlFile}"`);
      const restoreStat = await fs.stat(restoreSqlFile);
      if (restoreStat.size < 200) {
        await fs.unlink(restoreSqlFile).catch(() => undefined);
        throw new Error(
          `El respaldo ${dbFileName} esta vacio o corrupto (${restoreStat.size} bytes) — no se puede restaurar. ` +
            `Prueba con otro punto de la lista.`,
        );
      }

      this.logger.warn(`Restaurando base de datos desde ${dbFileName} ...`);
      const psqlResult = await execAsync(`psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${restoreSqlFile}"`);
      if (psqlResult.stderr?.trim()) {
        this.logger.warn(`psql stderr durante la restauracion: ${psqlResult.stderr.trim()}`);
      }
      await fs.unlink(restoreSqlFile).catch(() => undefined);

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
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await execAsync(`rm -rf "${UPLOADS_DIR}"/*`);
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
