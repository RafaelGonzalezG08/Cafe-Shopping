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
    execFile(
      'docker',
      ['compose', '-p', COMPOSE_PROJECT_NAME, 'up', '-d'],
      { cwd: PROJECT_DIR, windowsHide: true, timeout: 5 * 60 * 1000 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`docker compose up -d fallo:\n${stderr || error.message}`));
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

function createMainWindow() {
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

  mainWindow.loadURL(FRONTEND_URL);
}

function setupAutoUpdater() {
  // Configurar electron-updater en modo no-automático: nosotros controlamos
  // cuándo verificar y cuándo instalar.
  if (!app.isPackaged) {
    autoUpdater.forceDevUpdateConfig = true;
  }
  autoUpdater.checkForUpdatesAndNotify = false;

  autoUpdater.on('update-available', (info) => {
    setSplashStatus('Se encontró una actualización. Descargando...');
  });

  autoUpdater.on('update-downloaded', (info) => {
    if (!mainWindow || mainWindow.isDestroyed()) return;

    dialog
      .showMessageBox(mainWindow, {
        type: 'info',
        title: 'Actualización disponible',
        message: `Cafe Shopping ${info.version} está disponible.`,
        detail: 'La actualización se instalará la próxima vez que reinicies la aplicación.',
        buttons: ['Instalar ahora y reiniciar', 'Instalar después'],
        defaultId: 0,
      })
      .then((result) => {
        if (result.response === 0) {
          // Instalar y reiniciar
          setImmediate(() => autoUpdater.quitAndInstall());
        }
      });
  });

  autoUpdater.on('error', (error) => {
    // Silenciar errores de actualización (ej. sin conexión a internet)
    // La app sigue funcionando de todos modos
    console.error('Update error:', error);
  });
}

async function checkForUpdates() {
  setSplashStatus('Verificando actualizaciones...');
  try {
    await autoUpdater.checkForUpdates();
  } catch {
    // Si falla la verificación, simplemente continuamos — no es crítico
  }
}

async function startup() {
  createSplashWindow();
  setupAutoUpdater();

  try {
    setSplashStatus('Verificando Docker Desktop...');
    await ensureDockerRunning();

    setSplashStatus('Iniciando los contenedores...');
    await dockerComposeUp();

    setSplashStatus('Esperando a que la app este lista...');
    await waitForFrontend();

    setSplashStatus('Iniciando el agente de WhatsApp...');
    launchWhatsappAgent();

    setSplashStatus('Verificando actualizaciones...');
    await checkForUpdates();

    setSplashStatus('Abriendo Cafe Shopping...');
    createMainWindow();
  } catch (error) {
    if (splashWindow && !splashWindow.isDestroyed()) splashWindow.destroy();
    dialog.showErrorBox('Cafe Shopping', String(error.message || error));
    app.quit();
  }
}

app.whenReady().then(startup);

app.on('window-all-closed', () => {
  // No hacemos "docker compose down" al cerrar: los contenedores se quedan
  // corriendo en segundo plano (asi la proxima apertura es instantanea, y
  // el agente de WhatsApp sigue procesando envios aunque cierres la ventana).
  if (process.platform !== 'darwin') app.quit();
});