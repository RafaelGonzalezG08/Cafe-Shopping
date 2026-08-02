import { join } from 'path';

/**
 * Carpetas de datos del backend.
 *
 * En la version con Docker todo colgaba de process.cwd() (/app dentro del
 * contenedor) porque el volumen se montaba ahi. En la version nativa eso no
 * sirve: process.cwd() seria la carpeta de instalacion del programa, que el
 * instalador REEMPLAZA en cada actualizacion — las fotos de los productos y
 * las facturas se borrarian al actualizar.
 *
 * Por eso Electron pasa estas rutas por variables de entorno, apuntando a la
 * carpeta de datos del usuario (AppData), que sobrevive a las
 * actualizaciones. Si no vienen definidas (desarrollo, o el contenedor de
 * Docker) se mantiene el comportamiento anterior.
 */

export const UPLOADS_DIR = process.env.UPLOADS_DIR || join(process.cwd(), 'uploads');
export const BACKUPS_DIR = process.env.BACKUP_DIR || join(process.cwd(), 'backups');
