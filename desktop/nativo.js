// nativo.js — arranque sin Docker.
//
// Reemplaza todo lo que antes hacia "docker compose up": levanta el backend
// como proceso hijo y sirve el frontend compilado desde disco. No hace falta
// Docker Desktop, ni Postgres, ni nginx, ni contenedores.
//
// Por que un proceso hijo y no cargar NestJS dentro de Electron: el backend
// tiene su propio ciclo de vida (cron de respaldos, conexiones a la base) y
// aislarlo evita que un fallo suyo tumbe la ventana. Ademas se reinicia solo
// si se cae, sin arrastrar la interfaz.
//
// El backend corre con el Node que YA trae Electron (ELECTRON_RUN_AS_NODE), asi
// que no hay que instalar Node en la PC del cliente.

const { app } = require('electron');
const { fork } = require('child_process');
const http = require('http');
const net = require('net');
const path = require('path');
const fs = require('fs');

// Puertos propios, distintos a los de la version con Docker (3000/5173): asi
// las dos pueden convivir en la misma PC mientras se prueba la migracion, sin
// que una le robe el puerto a la otra. El frontend se compila apuntando a
// BACKEND_PORT (ver VITE_API_URL en el build).
const BACKEND_PORT = 3010;
const FRONTEND_PORT = 5183;
const MAX_WAIT_BACKEND_MS = 60000;

let backendProcess = null;
let frontendServer = null;

/**
 * Carpeta de datos del usuario (AppData). Todo lo que el negocio NO puede
 * perder vive aqui, nunca dentro de la carpeta del programa: el instalador
 * reemplaza esa carpeta en cada actualizacion, y con ella se irian la base de
 * datos, las fotos de los productos y las facturas.
 */
function dataDir() {
  const dir = path.join(app.getPath('userData'), 'datos');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Raiz del proyecto empaquetado (backend/, frontend/dist, prisma/...). */
function projectDir() {
  return app.isPackaged ? path.join(process.resourcesPath, 'app-project') : path.join(__dirname, '..');
}

function puertoAbierto(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const done = (ok) => {
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(1000);
    socket.once('connect', () => done(true));
    socket.once('timeout', () => done(false));
    socket.once('error', () => done(false));
    socket.connect(port, '127.0.0.1');
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------
// Backend
// ---------------------------------------------------------------------

function startBackend(onLog) {
  const proyecto = projectDir();
  const datos = dataDir();
  const entrada = path.join(proyecto, 'backend', 'dist', 'main.js');

  if (!fs.existsSync(entrada)) {
    throw new Error(
      `No se encontro el backend compilado en:\n${entrada}\n\nFalta ejecutar "npm run build" en backend/ antes de empaquetar.`,
    );
  }

  const uploads = path.join(datos, 'uploads');
  fs.mkdirSync(uploads, { recursive: true });

  const env = {
    ...process.env,
    // ELECTRON_RUN_AS_NODE hace que el proceso hijo se comporte como Node puro
    // (sin ventana ni APIs de Electron), reutilizando el Node que Electron ya
    // incluye. Asi el cliente no necesita instalar Node.
    ELECTRON_RUN_AS_NODE: '1',
    NODE_ENV: 'production',
    PORT: String(BACKEND_PORT),
    // La base es un unico archivo dentro de los datos del usuario.
    DATABASE_URL: `file:${path.join(datos, 'cafe-shopping.db').replace(/\\/g, '/')}`,
    UPLOADS_DIR: uploads,
    BACKUP_DIR: path.join(datos, 'backups'),
    PRISMA_MIGRATIONS_DIR: path.join(proyecto, 'backend', 'prisma', 'migrations'),
    FRONTEND_URL: `http://localhost:${FRONTEND_PORT}`,
    JWT_SECRET: obtenerJwtSecret(datos),
  };

  backendProcess = fork(entrada, [], {
    env,
    cwd: path.join(proyecto, 'backend'),
    silent: true,
    windowsHide: true,
  });

  backendProcess.stdout?.on('data', (d) => onLog?.(String(d).trimEnd()));
  backendProcess.stderr?.on('data', (d) => onLog?.(String(d).trimEnd()));

  // El backend pide por aqui que se rendericen las facturas (ver
  // RenderService). Se responde con el PNG/PDF ya generado.
  backendProcess.on('message', (mensaje) => {
    if (mensaje?.tipo === 'render') renderizarParaBackend(mensaje, onLog);
  });

  backendProcess.on('exit', (code) => {
    onLog?.(`El backend termino con codigo ${code}`);
    backendProcess = null;
  });

  return backendProcess;
}

/**
 * Genera el PNG o PDF de una factura usando el Chromium de Electron.
 *
 * Esto sustituye a Puppeteer: la app YA es Chromium, asi que abrir un segundo
 * navegador solo para capturar una imagen sobraba. Ademas Puppeteer descarga
 * su propio Chromium al instalar dependencias — algo que en la PC de un
 * cliente no ocurre nunca, y la factura no se habria podido generar.
 *
 * La ventana va oculta (show: false) y se destruye siempre, incluso si el
 * render falla: si quedara viva, cada factura dejaria una ventana invisible
 * consumiendo memoria.
 */
async function renderizarParaBackend(mensaje, onLog) {
  const { BrowserWindow } = require('electron');
  const { id, formato, html, width, scale } = mensaje;
  let ventana = null;

  try {
    ventana = new BrowserWindow({
      show: false,
      width: Math.round(width || 420),
      height: 900,
      // JavaScript habilitado porque se necesita para medir el alto real del
      // ticket antes de capturar. El HTML lo genera el propio backend a partir
      // de su plantilla, con los valores escapados (ver invoice.template.ts),
      // asi que no se esta ejecutando codigo de terceros.
      webPreferences: { contextIsolation: true, nodeIntegration: false },
    });

    await ventana.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
    // Da un instante a que apliquen fuentes y estilos antes de capturar.
    await new Promise((r) => setTimeout(r, 300));

    let datos;
    if (formato === 'pdf') {
      datos = await ventana.webContents.printToPDF({ printBackground: true, pageSize: 'A4' });
    } else {
      // Se mide el alto real del ticket para recortar exactamente, en vez de
      // capturar una ventana fija con espacio sobrante debajo.
      const alto = await ventana.webContents.executeJavaScript(
        `Math.ceil((document.querySelector('.ticket') || document.body).getBoundingClientRect().height)`,
      );
      ventana.setContentSize(Math.round(width || 420), Math.max(1, Math.round(alto)));
      await new Promise((r) => setTimeout(r, 120));

      const imagen = await ventana.webContents.capturePage();
      // El factor de escala replica el deviceScaleFactor de Puppeteer: la
      // factura se ve nitida aunque el cliente le haga zoom en WhatsApp.
      const factor = Math.max(1, scale || 1);
      const ampliada = imagen.resize({
        width: Math.round(imagen.getSize().width * factor),
        quality: 'best',
      });
      datos = ampliada.toPNG();
    }

    backendProcess?.send({ tipo: 'render-resultado', id, datosBase64: datos.toString('base64') });
  } catch (error) {
    onLog?.(`Fallo el render de la factura: ${error}`);
    backendProcess?.send({ tipo: 'render-resultado', id, error: String(error?.message || error) });
  } finally {
    if (ventana && !ventana.isDestroyed()) ventana.destroy();
  }
}

/**
 * Secreto para firmar las sesiones. Se genera una vez por instalacion y se
 * guarda junto a los datos.
 *
 * No se deja uno fijo en el codigo a proposito: seria el mismo en todas las
 * instalaciones, y cualquiera con una copia del programa podria fabricar un
 * token valido para entrar como administrador en otro negocio.
 */
function obtenerJwtSecret(datos) {
  const archivo = path.join(datos, '.jwt-secret');
  try {
    if (fs.existsSync(archivo)) return fs.readFileSync(archivo, 'utf8').trim();
  } catch {
    // Si no se puede leer, se genera uno nuevo (solo cierra las sesiones abiertas).
  }
  const secreto = require('crypto').randomBytes(48).toString('hex');
  try {
    fs.writeFileSync(archivo, secreto, { mode: 0o600 });
  } catch {
    // Aunque no se pueda guardar, el secreto sirve para esta sesion.
  }
  return secreto;
}

async function waitForBackend(onStatus) {
  let transcurrido = 0;
  while (transcurrido < MAX_WAIT_BACKEND_MS) {
    try {
      const ok = await new Promise((resolve) => {
        const req = http.get(
          { host: '127.0.0.1', port: BACKEND_PORT, path: '/api/health', timeout: 1500 },
          (res) => {
            res.resume();
            resolve(res.statusCode === 200);
          },
        );
        req.on('error', () => resolve(false));
        req.on('timeout', () => {
          req.destroy();
          resolve(false);
        });
      });
      if (ok) return true;
    } catch {
      // sigue esperando
    }
    onStatus?.(`Preparando la base de datos... (${Math.round(transcurrido / 1000)}s)`);
    await sleep(500);
    transcurrido += 500;
  }
  return false;
}

// ---------------------------------------------------------------------
// Frontend
// ---------------------------------------------------------------------

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

/**
 * Sirve el frontend compilado por HTTP en localhost.
 *
 * Se usa un servidor HTTP diminuto en vez de cargar los archivos con file://
 * porque la app es una SPA con rutas (/pos, /pedidos, ...): con file:// esas
 * rutas no resuelven, y ademas el navegador trataria cada archivo como origen
 * distinto, rompiendo las llamadas a la API. Con http://localhost todo se
 * comporta igual que en la version con nginx.
 */
function startFrontend() {
  const raiz = path.join(projectDir(), 'frontend', 'dist');
  if (!fs.existsSync(path.join(raiz, 'index.html'))) {
    throw new Error(
      `No se encontro el frontend compilado en:\n${raiz}\n\nFalta ejecutar "npm run build" en frontend/ antes de empaquetar.`,
    );
  }

  frontendServer = http.createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    let archivo = path.join(raiz, url);

    // Cualquier ruta que no sea un archivo real cae en index.html, que es lo
    // que hace que funcionen las rutas de la SPA al recargar.
    if (!fs.existsSync(archivo) || fs.statSync(archivo).isDirectory()) {
      archivo = path.join(raiz, 'index.html');
    }

    // Defensa contra rutas tipo "../../": nunca salir de la carpeta del build.
    if (!path.resolve(archivo).startsWith(path.resolve(raiz))) {
      res.writeHead(403).end('Prohibido');
      return;
    }

    const ext = path.extname(archivo).toLowerCase();
    res.setHeader('Content-Type', TIPOS[ext] || 'application/octet-stream');
    // index.html sin cache: si el navegador se queda con una copia vieja, la
    // app sigue mostrando la version anterior tras actualizar (ya paso).
    res.setHeader('Cache-Control', ext === '.html' ? 'no-cache' : 'public, max-age=31536000');
    fs.createReadStream(archivo).pipe(res);
  });

  return new Promise((resolve, reject) => {
    frontendServer.once('error', reject);
    frontendServer.listen(FRONTEND_PORT, '127.0.0.1', () => resolve(`http://localhost:${FRONTEND_PORT}`));
  });
}

// ---------------------------------------------------------------------
// Ciclo de vida
// ---------------------------------------------------------------------

function stopAll() {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
  if (frontendServer) {
    frontendServer.close();
    frontendServer = null;
  }
}

module.exports = {
  BACKEND_PORT,
  FRONTEND_PORT,
  dataDir,
  projectDir,
  startBackend,
  waitForBackend,
  startFrontend,
  stopAll,
  puertoAbierto,
};
