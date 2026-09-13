/**
 * Compila el APK del celular y lo deja listo para descargar desde la app.
 *
 *   cd mobile-app
 *   node compilar.js
 *
 * A diferencia de desktop/compilar.js, esto NO hace falta correrlo con cada
 * cambio de la app: el APK es solo un WebView que carga la misma direccion de
 * siempre (ver MainActivity.kt) -- el contenido real lo sigue sirviendo la
 * PC. Solo hace falta recompilar si cambia el icono, el nombre, o la logica
 * de confianza del certificado en MainActivity.kt.
 *
 * Requiere Java 17 y el Android SDK ya instalados (ver mobile-app/local.properties
 * para la ruta del SDK que se uso al armar este proyecto).
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const FRONTEND_DIST = path.join(RAIZ, 'frontend', 'dist');
const APK_GENERADO = path.join(__dirname, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
const APK_DESTINO = path.join(FRONTEND_DIST, 'cafe-shopping.apk');

function paso(titulo) {
  console.log(`\n=== ${titulo} ===`);
}

paso('1/2  Compilando el APK (modo debug, para instalar a mano)');
const gradlew = process.platform === 'win32' ? '.\\gradlew.bat' : './gradlew';
execSync(`${gradlew} assembleDebug --console=plain`, { cwd: __dirname, stdio: 'inherit' });

if (!fs.existsSync(APK_GENERADO)) {
  console.error(`\nERROR: no se genero ${APK_GENERADO}. Revisa los errores de arriba.`);
  process.exit(1);
}

paso('2/2  Copiando a frontend/dist para que se pueda descargar desde el celular');
if (!fs.existsSync(FRONTEND_DIST)) {
  console.error(
    `\nERROR: no existe ${FRONTEND_DIST}. Corre "npm run build" en frontend/ (o desktop/compilar.js) al menos una vez antes.`,
  );
  process.exit(1);
}
fs.copyFileSync(APK_GENERADO, APK_DESTINO);

const mb = (fs.statSync(APK_DESTINO).size / 1024 / 1024).toFixed(1);
console.log(`\nLISTO: ${APK_DESTINO} (${mb} MB)`);
console.log('Se descarga desde el celular entrando a https://<ip-de-la-pc>:5183/cafe-shopping.apk');
