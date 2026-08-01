// main.js — proceso principal de Electron.
//
// Hace lo mismo que hacia iniciar_cafe_shopping.ahk, pero como parte de una
// app de escritorio real:
//   1) Verifica/arranca Docker Desktop.
//   2) Corre "docker compose up -d" sobre el proyecto empaquetado.
//   3) Espera a que el frontend responda.
//   4) Lanza el agente de WhatsApp (send_whatsapp_agent.exe o .ahk).
//   5) Muestra la app en una ventana nativa.

const { app, BrowserWindow, dialog, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const { spawn, execFile } = require('child_process');
const net = require('net');
const path = require('path');
const fs = require('fs');

const FRONTEND_URL = 'http://localhost:5173';
const FRONTEND_PORT = 5173;
const MAX_WAIT_DOCKER_MS = 90000;
const MAX_WAIT_FRONTEND_MS = 60000;
const POLL_MS = 2000;

// Nombre fijo del proyecto de Docker Compose. IMPORTANTE: tiene que ser el
// mismo que usa instalar.ps1/instalar.bat (que toma el nombre de la carpeta
// del proyecto, normalmente "cafe-shopping"). La app empaquetada corre desde
// una carpeta interna llamada "app-project", asi que sin esto Docker Compose
// pensaria que es un proyecto distinto y crearia un segundo set de
// contenedores/base de datos en paralelo (con el mismo puerto -> choque) en
// vez de reusar el que ya esta corriendo.
const COMPOSE_PROJECT_NAME = 'cafe-shopping';

// En produccion (app empaquetada), el proyecto completo (docker-compose.yml,
// backend/, frontend/, agente de WhatsApp) vive en resources/app-project.
// En desarrollo ("npm start" dentro de desktop/), es la carpeta padre.
const PROJECT_DIR = app.isPackaged
  ? path.join(process.resourcesPath, 'app-project')
  : path.join(__dirname, '..');

let splashWindow = null;
let mainWindow = null;

// ---------------------------------------------------------------------
// Actualizaciones: marcador de "actualizacion descargada, pendiente de
// instalar en el proximo reinicio". Ver explicacion completa donde se
// usa, en checkForUpdates() y startup().
// ---------------------------------------------------------------------
let autoInstallPendingUpdate = false;

function pendingUpdateMarkerPath() {
  return path.join(app.getPath('userData'), 'pending-update.json');
}

function markUpdatePending(version) {
  try {
    fs.writeFileSync(
      pendingUpdateMarkerPath(),
      JSON.stringify({ version, downloadedAt: new Date().toISOString() }),
    );
  } catch {
    // Si falla escribir el marcador no es grave: en el peor caso, la
    // proxima vez que haya conexion se vuelve a preguntar como si fuera
    // una actualizacion nueva.
  }
}

function clearUpdatePendingMarker() {
  try {
    fs.unlinkSync(pendingUpdateMarkerPath());
  } catch {
    // No existia o ya se habia borrado, no pasa nada.
  }
}

function hasPendingUpdateMarker() {
  return fs.existsSync(pendingUpdateMarkerPath());
}

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 420,
    height: 260,
    frame: false,
    resizable: false,
    center: true,
    show: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true },
  });
  splashWindow.loadFile(path.join(__dirname, 'splash.html'));
}

function setSplashStatus(text) {
  if (!splashWindow || splashWindow.isDestroyed()) return;
  const safe = JSON.stringify(text);
  splashWindow.webContents.executeJavaScript(`window.setStatus && window.setStatus(${safe})`).catch(() => {});
}

function dockerListo() {
  return new Promise((resolve) => {
    execFile('docker', ['info'], { windowsHide: true, timeout: 8000 }, (error) => {
      resolve(!error);
    });
  });
}

function puertoAbierto(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const done = (ok) => {
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(1500);
    socket.once('connect', () => done(true));
    socket.once('timeout', () => done(false));
    socket.once('error', () => done(false));
    socket.connect(port, 'localhost');
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function dockerDesktopExePath() {
  const programFiles = process.env['ProgramFiles'] || 'C:\\Program Files';
  return path.join(programFiles, 'Docker', 'Docker', 'Docker Desktop.exe');
}

async function ensureDockerRunning() {
  if (await dockerListo()) return;

  const exePath = dockerDesktopExePath();
  if (!fs.existsSync(exePath)) {
    throw new Error(
      `No se encontro Docker Desktop en:\n${exePath}\n\nAbrelo manualmente y vuelve a iniciar Cafe Shopping.`,
    );
  }

  setSplashStatus('Abriendo Docker Desktop...');
  spawn(exePath, [], { detached: true, stdio: 'ignore' }).unref();

  let elapsed = 0;
  while (elapsed < MAX_WAIT_DOCKER_MS) {
    setSplashStatus(`Esperando a que Docker Desktop inicie... (${Math.round(elapsed / 1000)}s)`);
    if (await dockerListo()) return;
    await sleep(POLL_MS);
    elapsed += POLL_MS;
  }

  throw new Error(
    'Docker Desktop no respondio a tiempo.\nAbrelo manualmente, espera a que diga "Docker Desktop is running" y vuelve a intentar.',
  );
}

function dockerComposeUp() {
  return new Promise((resolve, reject) => {
    // "--build": sin esto, si el auto-updater reemplazo los archivos del
    // proyecto (backend/frontend nuevos) pero las imagenes de Docker locales
    // quedaron viejas, "up -d" arrancaria igual los contenedores VIEJOS —
    // la app se actualizaria de nombre pero seguiria corriendo el codigo
    // anterior por dentro. Con --build, Docker reconstruye solo lo que
    // cambio (usa cache de capas, asi que en la mayoria de los arranques
    // sin cambios es casi instantaneo de todos modos).
    execFile(
      'docker',
      ['compose', '-p', COMPOSE_PROJECT_NAME, 'up', '-d', '--build'],
      { cwd: PROJECT_DIR, windowsHide: true, timeout: 10 * 60 * 1000 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`docker compose up -d --build fallo:\n${stderr || error.message}`));
        } else {
          resolve();
        }
      },
    );
  });
}

async function waitForFrontend() {
  let elapsed = 0;
  while (elapsed < MAX_WAIT_FRONTEND_MS) {
    try {
      // El puerto 5173 (frontend) responde rapido, pero la API (3000) tarda
      // mas porque hace migraciones de BD. Esperar al health-check es lo que
      // de verdad indica que todo esta listo.
      const resp = await fetch('http://localhost:3000/api/health', { timeout: 2000 });
      if (resp.ok) return;
    } catch {
      // Todavia no esta listo, seguir esperando
    }
    await sleep(POLL_MS);
    elapsed += POLL_MS;
  }
  // No cortamos el arranque por esto: puede que solo este tardando un poco
  // mas (primera vez, migraciones, etc.). Abrimos la ventana igual.
}

function launchWhatsappAgent() {
  const exePath = path.join(PROJECT_DIR, 'send_whatsapp_agent.exe');
  const ahkPath = path.join(PROJECT_DIR, 'send_whatsapp_agent.ahk');

  if (fs.existsSync(exePath)) {
    spawn(exePath, [], { detached: true, stdio: 'ignore', cwd: PROJECT_DIR }).unref();
  } else if (fs.existsSync(ahkPath)) {
    // Requiere AutoHotkey instalado y asociado a los .ahk. shell.openPath
    // usa la asociacion de archivos de Windows, igual que hacer doble clic.
    shell.openPath(ahkPath);
  } else {
    dialog.showErrorBox(
      'Cafe Shopping',
      'No se encontro send_whatsapp_agent.exe/.ahk. El envio por WhatsApp no va a funcionar hasta que lo agregues junto al proyecto.',
    );
  }
}

async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    title: 'Cafe Shopping',
    webPreferences: { contextIsolation: true },
  });

  mainWindow.once('ready-to-show', () => {
    if (splashWindow && !splashWindow.isDestroyed()) splashWindow.destroy();
    mainWindow.show();
  });

  // index.html (a diferencia de los archivos hasheados en /assets/) no
  // manda Cache-Control, asi que Chromium puede quedarse con una copia
  // vieja en su cache HTTP persistente entre una version de la app y la
  // siguiente. Se limpia SIEMPRE antes de cargar para garantizar que se
  // vea el build que Docker acaba de servir, no uno cacheado de una
  // instalacion anterior.
  try {
    await mainWindow.webContents.session.clearCache();
  } catch {
    // Si falla no es grave: en el peor caso queda el comportamiento
    // anterior (cache posiblemente vieja), no bloqueamos el arranque por esto.
  }

  mainWindow.loadURL(FRONTEND_URL);
}

function setupAutoUpdater() {
  const fs = require('fs');
  const logFile = path.join(app.getPath('userData'), 'update-log.txt');

  function log(msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}\n`;
    console.log(line);
    fs.appendFileSync(logFile, line);
  }

  log('=== INICIANDO AUTO-UPDATER ===');
  autoUpdater.checkForUpdatesAndNotify = false;

  // CRITICO: por defecto electron-updater instala solo, en silencio, en
  // cuanto la app se cierre por CUALQUIER motivo — no solo cuando el
  // usuario elige "Instalar ahora" — si ya hay una version descargada
  // pendiente. Eso era el bug: el usuario elegia "Instalar despues",
  // seguia usando el programa, y al cerrarlo (como cualquier dia normal)
  // el instalador se disparaba solo, sin pasar por killWhatsappAgent()
  // primero (por eso a veces quedaba pegado/raro: el .exe del agente
  // todavia estaba corriendo y bloqueando su propio archivo).
  //
  // Lo desactivamos aqui y controlamos nosotros el momento exacto de
  // instalar, siempre pasando por killWhatsappAgent() antes. Ver
  // markUpdatePending()/hasPendingUpdateMarker() y su uso en
  // checkForUpdates() + startup().
  autoUpdater.autoInstallOnAppQuit = false;

  autoUpdater.on('checking-for-update', () => {
    log('Buscando actualizaciones...');
    setSplashStatus('Buscando actualizaciones...');
  });

  autoUpdater.on('update-available', (info) => {
    log(`Actualización disponible: v${info.version}`);
    setSplashStatus(`Actualización ${info.version} disponible. Descargando...`);
  });

  autoUpdater.on('update-not-available', (info) => {
    log('No hay actualización disponible');
    setSplashStatus('Ya está la última versión.');
  });

  autoUpdater.on('error', (error) => {
    log(`Error: ${error.message}`);
    setSplashStatus(`Error: ${error.message}`);
  });
}

/**
 * Mata el agente de WhatsApp (send_whatsapp_agent.exe) si esta corriendo.
 *
 * Necesario ANTES de instalar una actualizacion: el .exe vive dentro de la
 * carpeta de instalacion de la app (resources/app-project/...), y mientras
 * ese proceso siga corriendo, Windows no deja que el instalador de NSIS
 * sobreescriba esa carpeta — se queda "pegado" hasta que alguien lo cierra
 * a mano. Matandolo primero, el instalador puede actualizar sin trabarse.
 * (Se vuelve a abrir solo en el proximo arranque, ver launchWhatsappAgent().)
 */
function killWhatsappAgent() {
  return new Promise((resolve) => {
    execFile('taskkill', ['/F', '/IM', 'send_whatsapp_agent.exe', '/T'], { windowsHide: true }, () => {
      // Da igual si taskkill no encontro el proceso (no estaba corriendo);
      // solo nos interesa que no siga vivo antes de instalar.
      resolve();
    });
  });
}

/** Secuencia segura de instalacion: SIEMPRE cierra el agente primero. */
async function installNow() {
  clearUpdatePendingMarker();
  setSplashStatus('Cerrando el agente de WhatsApp antes de instalar...');
  await killWhatsappAgent();
  setImmediate(() => autoUpdater.quitAndInstall());
}

async function checkForUpdates() {
  const fs = require('fs');
  const logFile = path.join(app.getPath('userData'), 'update-log.txt');
  function log(msg) {
    const line = `[${new Date().toISOString()}] ${msg}\n`;
    console.log(line);
    fs.appendFileSync(logFile, line);
  }

  setSplashStatus('Verificando actualizaciones...');
  return new Promise((resolve) => {
    const cleanup = () => {
      autoUpdater.removeListener('update-not-available', onNotAvailable);
      autoUpdater.removeListener('update-downloaded', onDownloaded);
      autoUpdater.removeListener('error', onError);
    };

    const onNotAvailable = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      resolve();
    };

    // IMPORTANTE: el dialogo (y todo lo que decida el usuario) vive aqui
    // adentro, y la promesa de checkForUpdates() NO se resuelve hasta que
    // el usuario responde. Antes, el dialogo se mostraba desde un listener
    // aparte (permanente) mientras esta funcion resolvia de una vez al
    // descargarse el update — eso dejaba que startup() siguiera de largo y
    // abriera la ventana principal ENCIMA del dialogo, tapandolo.
    const onDownloaded = async (info) => {
      cleanup();
      log(`Actualización descargada: v${info.version}`);

      if (autoInstallPendingUpdate) {
        // Ya se le pregunto en una sesion anterior y eligio "Instalar
        // despues" — no lo volvemos a interrumpir con el mismo dialogo.
        // Se instala ahora, al reiniciar, tal como se le prometio.
        log('Instalando automaticamente (el usuario ya habia aceptado en una sesion anterior).');
        await installNow();
        // No resolvemos: la app esta a punto de cerrarse para instalar.
        return;
      }

      const parentWin = mainWindow && !mainWindow.isDestroyed() ? mainWindow : undefined;
      dialog
        .showMessageBox(parentWin, {
          type: 'info',
          title: 'Actualización disponible',
          message: `Cafe Shopping ${info.version} está disponible.`,
          detail: 'La actualización se instalará la próxima vez que reinicies la aplicación.',
          buttons: ['Instalar ahora y reiniciar', 'Instalar después'],
          defaultId: 0,
        })
        .then(async (result) => {
          if (result.response === 0) {
            await installNow();
            // No resolvemos: la app esta a punto de cerrarse para instalar.
          } else {
            markUpdatePending(info.version);
            resolve();
          }
        });
    };

    autoUpdater.once('update-downloaded', onDownloaded);
    autoUpdater.once('update-not-available', onNotAvailable);
    autoUpdater.once('error', onError);

    autoUpdater.checkForUpdates().catch(() => {
      cleanup();
      resolve();
    });
  });
}

async function startup() {
  createSplashWindow();
  setupAutoUpdater();

  // Si en la sesion anterior el usuario eligio "Instalar despues", queda
  // este marcador. Lo leemos ahora para saber que, cuando checkForUpdates()
  // vuelva a encontrar/descargar esa misma actualizacion mas abajo, hay que
  // instalarla directo sin volver a preguntar (ver onDownloaded arriba).
  autoInstallPendingUpdate = hasPendingUpdateMarker();
  if (autoInstallPendingUpdate) {
    setSplashStatus('Terminando de instalar la actualización pendiente...');
  }

  try {
    setSplashStatus('Verificando Docker Desktop...');
    await ensureDockerRunning();

    setSplashStatus('Iniciando los contenedores...');
    await dockerComposeUp();

    setSplashStatus('Esperando a que la app este lista...');
    await waitForFrontend();

    setSplashStatus('Verificando actualizaciones...');
    await checkForUpdates();

    // El agente se abre AQUI (despues de la verificacion/instalacion de
    // actualizaciones), no antes: si abriera primero y luego el usuario
    // decidiera instalar una actualizacion, tocaria cerrarlo de nuevo antes
    // de poder instalar (por el file-lock, ver killWhatsappAgent()). Asi
    // evitamos ese abrir-y-cerrar innecesario en el caso mas comun.
    setSplashStatus('Iniciando el agente de WhatsApp...');
    launchWhatsappAgent();

    setSplashStatus('Abriendo Cafe Shopping...');
    await createMainWindow();
  } catch (error) {
    if (splashWindow && !splashWindow.isDestroyed()) splashWindow.destroy();
    dialog.showErrorBox('Cafe Shopping', String(error.message || error));
    app.quit();
  }
}

app.whenReady().then(startup);

app.on('window-all-closed', () => {
  // A diferencia de los contenedores de Docker (esos SI se quedan corriendo
  // a proposito, para que la proxima apertura sea instantanea), el agente
  // de WhatsApp se cierra junto con la app: si no, se queda corriendo en
  // segundo plano sin que el usuario lo sepa, y puede seguir "activo"
  // aunque la persona crea que cerro todo.
  killWhatsappAgent().finally(() => {
    if (process.platform !== 'darwin') app.quit();
  });
});