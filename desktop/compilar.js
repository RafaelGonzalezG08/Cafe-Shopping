/**
 * Genera el instalador completo, en orden y sin pasos olvidables.
 *
 *   cd desktop
 *   npm run instalador
 *
 * Existe porque compilar a mano tiene tres trampas que producen un
 * instalador roto SIN dar ningun error:
 *
 *  1) La cache incremental de TypeScript (tsconfig.build.tsbuildinfo) cree
 *     que ya emitio los archivos, pero "nest build" borra dist/ antes de
 *     empezar. El resultado es un dist/ a medias — llego a quedar sin
 *     main.js. Por eso se borra la cache antes.
 *
 *  2) El frontend guarda la direccion del backend EN EL MOMENTO DE
 *     COMPILAR. Si se compila sin VITE_API_URL apuntando al puerto 3010, la
 *     aplicacion instalada busca el 3000 (el de la version con Docker) y no
 *     responde nada.
 *
 *  3) Si no se sube la version, electron-builder sobreescribe el instalador
 *     anterior y el actualizador automatico no ofrece el cambio, porque
 *     compara numeros de version.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const BACKEND = path.join(RAIZ, 'backend');
const FRONTEND = path.join(RAIZ, 'frontend');
const PUERTO_BACKEND = 3010; // debe coincidir con BACKEND_PORT de nativo.js

function paso(titulo) {
  console.log(`\n=== ${titulo} ===`);
}

function correr(comando, cwd, env = {}) {
  execSync(comando, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });
}

function versionActual() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')).version;
}

function subirVersion(nueva) {
  const ruta = path.join(__dirname, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(ruta, 'utf8'));
  pkg.version = nueva;
  fs.writeFileSync(ruta, JSON.stringify(pkg, null, 2) + '\n');
  return nueva;
}

/** Sube el ultimo numero: 2.0.2 -> 2.0.3 */
function siguienteVersion(actual) {
  const [mayor, menor, parche] = actual.split('.').map(Number);
  return `${mayor}.${menor}.${(parche || 0) + 1}`;
}

const nueva = process.argv[2] || siguienteVersion(versionActual());

console.log(`Compilando Cafe Shopping ${versionActual()} -> ${nueva}`);

paso('1/4  Backend');
fs.rmSync(path.join(BACKEND, 'tsconfig.build.tsbuildinfo'), { force: true });
correr('npm run build', BACKEND);
if (!fs.existsSync(path.join(BACKEND, 'dist', 'main.js'))) {
  console.error('\nERROR: no se genero backend/dist/main.js. Revisa los errores de arriba.');
  process.exit(1);
}

paso('2/4  Interfaz');
correr('npm run build', FRONTEND, { VITE_API_URL: `http://localhost:${PUERTO_BACKEND}/api` });
const indice = path.join(FRONTEND, 'dist', 'index.html');
if (!fs.existsSync(indice)) {
  console.error('\nERROR: no se genero frontend/dist. Revisa los errores de arriba.');
  process.exit(1);
}

paso(`3/4  Version ${nueva}`);
subirVersion(nueva);

paso('4/4  Instalador (tarda varios minutos)');
correr('npm run dist', __dirname);

const salida = path.join(__dirname, 'dist', `Cafe Shopping Setup ${nueva}.exe`);
if (fs.existsSync(salida)) {
  const mb = (fs.statSync(salida).size / 1024 / 1024).toFixed(0);
  console.log(`\nLISTO: ${salida}  (${mb} MB)`);
} else {
  console.error('\nERROR: el instalador no aparecio. Revisa los errores de arriba.');
  process.exit(1);
}
