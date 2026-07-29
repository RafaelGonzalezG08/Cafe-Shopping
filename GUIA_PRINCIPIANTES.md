# 📖 Guía Completa para Principiantes — Cafe Shopping (Windows)

Esta guía asume que **nunca has hecho esto antes**. No vamos a saltar nada: qué instalar, dónde
hacer clic, qué escribir, y qué deberías ver en pantalla si todo va bien. Tómate tu tiempo — no
hay prisa, y cada parte tiene una forma de comprobar que salió bien antes de seguir a la siguiente.

**Filosofía de esta guía:** en vez de instalar 6 programas distintos (Node.js, PostgreSQL,
etc.), vamos a instalar solo **dos programas**: un editor de texto (VS Code) y Docker Desktop.
Docker se encarga de "empacar" todo lo demás en cajas ya armadas y listas para usar. Esto
significa muchos menos pasos y muchas menos formas de que algo salga mal.

---

## Índice

- [Parte 0 — Diccionario: qué es cada cosa](#parte-0)
- [Parte 1 — Instalar los 2 programas necesarios](#parte-1)
- [Parte 2 — Ubicar y abrir el proyecto](#parte-2)
- [Parte 3 — El archivo de "secretos" (.env)](#parte-3)
- [Parte 4 — Levantar el sistema por primera vez](#parte-4)
- [Parte 5 — Cargar datos de prueba](#parte-5)
- [Parte 6 — Usar el sistema y comprobar que funciona](#parte-6)
- [Parte 7 — Crear tu cuenta de Twilio (WhatsApp real)](#parte-7)
- [Parte 8 — Crear tu cuenta de almacenamiento (DigitalOcean Spaces)](#parte-8)
- [Parte 9 — Conectar Twilio y Spaces al proyecto](#parte-9)
- [Parte 10 — Prueba real completa](#parte-10)
- [Parte 11 — Comandos del día a día](#parte-11)
- [Parte 12 — Solución de problemas](#parte-12)
- [Parte 13 — Diccionario final de términos](#parte-13)

---

<a name="parte-0"></a>
## Parte 0 — Diccionario: qué es cada cosa (léelo antes de empezar)

Vas a encontrar estas palabras muchas veces. Te las explico una vez, en español sencillo, para
que cuando las veas más adelante ya sepas de qué se trata.

| Palabra | Qué es, en criollo |
|---|---|
| **Terminal / PowerShell** | Una ventana donde escribes comandos de texto en vez de hacer clic en botones. Es como hablarle directamente a la computadora. Da miedo al principio, pero solo vas a copiar y pegar lo que te indique esta guía. |
| **VS Code** | Un programa gratis para abrir, ver y editar archivos de texto y de código. Piensa en él como un "Word" pero para programadores. |
| **Docker Desktop** | Un programa que crea "cajas" (contenedores) que ya traen todo instalado adentro (el servidor, la base de datos, etc.). En vez de instalar 5 programas a mano, Docker los descarga ya armados. |
| **Contenedor** | Una de esas "cajas" de Docker. En este proyecto vas a tener 3: una para la base de datos, una para el backend y una para el frontend. |
| **`docker compose`** | El comando que enciende/apaga **todas** las cajas a la vez, en el orden correcto. |
| **Base de datos (PostgreSQL / Postgres)** | El lugar donde se guarda TODA la información: clientes, ventas, facturas. Imagínalo como un Excel gigante, muy ordenado, que nunca se abre "a mano". |
| **Backend** | El "cerebro" del sistema. Corre en segundo plano, recibe pedidos ("crea esta venta", "manda esta factura") y habla con la base de datos. Tú no lo ves directamente. |
| **Frontend** | Lo que sí ves: la pantalla con botones, el punto de venta, los reportes. Le habla al backend por detrás para pedirle o mandarle información. |
| **API** | La "puerta" por donde el frontend le pide cosas al backend. No necesitas entenderla a fondo, solo saber que existe. |
| **`.env`** | Un archivo de texto con "secretos" y configuraciones (contraseñas, llaves de acceso) que el sistema necesita para funcionar, pero que NUNCA deben compartirse públicamente. |
| **Twilio** | La empresa que de verdad manda los mensajes de WhatsApp por ti. El sistema le dice "manda esta factura a este número" y Twilio lo hace. |
| **DigitalOcean Spaces (o S3)** | Un "almacén" en internet donde se guardan las imágenes de las facturas (PNG), para que Twilio pueda ir a buscarlas y enviarlas. |
| **`localhost`** | Significa "esta misma computadora". Cuando algo dice `localhost:5173`, es una dirección web que solo funciona en tu propia máquina, no en internet. |
| **Puerto (ej. `:3000`)** | El "número de puerta" dentro de tu computadora por donde entra/sale cada programa. No necesitas elegirlos, ya están definidos en el proyecto. |

---

<a name="parte-1"></a>
## Parte 1 — Instalar los 2 programas necesarios

### 1.1 — Visual Studio Code (el editor)

1. Abre tu navegador (Chrome, Edge, el que uses) y ve a: **https://code.visualstudio.com**
2. Haz clic en el botón grande morado/azul que dice **Download for Windows**.
3. Cuando termine de descargar, abre el archivo descargado (normalmente en tu carpeta
   **Descargas**, se llama algo como `VSCodeUserSetup-x64-x.x.x.exe`). Haz doble clic.
4. Se abre un instalador:
   - Acepta el acuerdo de licencia → **Siguiente**.
   - Deja la carpeta de instalación como está → **Siguiente**.
   - En "Tareas adicionales", te recomiendo **marcar** la casilla que dice algo como
     *"Agregar acción 'Abrir con Code' al menú contextual de Windows"* — esto te va a
     ahorrar tiempo después. → **Siguiente**.
   - Haz clic en **Instalar** y espera a que termine.
   - Haz clic en **Finalizar**. VS Code se abrirá solo.

✅ **Cómo saber que funcionó:** se abre una ventana con un fondo oscuro (o claro) y un mensaje
de bienvenida. Con eso ya está.

### 1.2 — Docker Desktop (el motor de todo)

Docker necesita una función de Windows llamada **WSL2**. En computadoras modernas (Windows 10
actualizado o Windows 11) casi siempre se activa sola durante la instalación, pero vamos a
asegurarla primero para evitar el error más común.

**Paso A — Activar WSL2 (una sola vez, con permisos de administrador):**

1. Haz clic en el botón de **Inicio** de Windows (la banderita, abajo a la izquierda).
2. Escribe: `PowerShell`
3. Cuando aparezca **"Windows PowerShell"** en los resultados, haz **clic derecho** sobre él
   y elige **"Ejecutar como administrador"**. Windows te va a preguntar *"¿Quieres permitir que
   esta aplicación haga cambios?"* → clic en **Sí**.
4. Se abre una ventana azul o negra. Escribe exactamente esto y presiona **Enter**:
   ```powershell
   wsl --install
   ```
5. Va a descargar e instalar cosas por un par de minutos. Al final probablemente te pida
   **reiniciar la computadora**. Guarda lo que tengas abierto y reinicia.

> Si el comando dice algo como *"WSL ya está instalado"*, perfecto, no tienes que hacer nada
> más — sigue al Paso B.

**Paso B — Instalar Docker Desktop:**

1. Ve a: **https://www.docker.com/products/docker-desktop**
2. Haz clic en **Download for Windows**.
3. Abre el instalador descargado (`Docker Desktop Installer.exe`).
4. Deja marcada la opción **"Use WSL 2 instead of Hyper-V"** si aparece (suele venir marcada
   por defecto — es la opción recomendada y funciona en cualquier versión de Windows 10/11,
   incluida Home).
5. Haz clic en **Ok** / **Install** y espera. Puede tardar varios minutos.
6. Al terminar, es posible que te pida **cerrar sesión o reiniciar de nuevo** — hazlo si te lo pide.
7. Después de reiniciar, abre **Docker Desktop** (búscalo en el menú Inicio si no se abre solo).
8. La primera vez te va a mostrar unas condiciones de servicio → acéptalas. Puede pedirte crear
   una cuenta gratuita de Docker Hub — puedes hacerlo o saltarlo con "Skip" si aparece la opción,
   no es obligatorio para este proyecto.
9. Espera a que en la esquina inferior izquierda de Docker Desktop veas una ballenita 🐳 y la
   palabra **"Engine running"** (motor corriendo) en verde.

✅ **Cómo saber que funcionó:** abre PowerShell (no hace falta que sea como administrador esta
vez) y escribe:
```powershell
docker --version
```
Debe responder algo como `Docker version 27.x.x`. Si en cambio dice que no reconoce el comando,
Docker todavía no terminó de instalarse o necesitas reiniciar la computadora una vez más.

> ⚠️ **Muy importante y fácil de olvidar:** Docker Desktop tiene que estar **abierto** (aunque
> sea minimizado, viendo la ballenita en la barra de tareas abajo a la derecha) cada vez que
> quieras usar el proyecto. Si lo cierras del todo, los comandos de `docker compose` van a fallar.

---

<a name="parte-2"></a>
## Parte 2 — Ubicar y abrir el proyecto

1. Busca el archivo **`cafe-shopping.zip`** que descargaste antes (normalmente Windows lo pone
   en tu carpeta **Descargas**).
2. Haz **clic derecho** sobre `cafe-shopping.zip` → elige **"Extraer todo..."**.
3. Te va a preguntar dónde extraerlo. Te sugiero cambiar el destino a algo simple y fácil de
   encontrar, por ejemplo `C:\Users\TuUsuario\Documents\cafe-shopping`. Anota esta ubicación,
   la vas a necesitar más adelante. Haz clic en **Extraer**.
4. Se abrirá una ventana del Explorador de Windows mostrando la carpeta ya descomprimida, con
   subcarpetas como `backend`, `frontend`, y archivos como `docker-compose.yml`.

### Abrir el proyecto en VS Code

1. Abre **VS Code**.
2. Ve al menú **Archivo (File)** → **Abrir carpeta... (Open Folder...)**.
3. Navega hasta la carpeta que acabas de extraer (ej. `Documents\cafe-shopping`) y selecciónala
   (selecciona la carpeta en sí, no un archivo de adentro) → clic en **Seleccionar carpeta**.
4. Si Windows te pregunta si confías en los autores de esta carpeta, marca que sí (es tu propio
   proyecto).
5. A la izquierda deberías ver el árbol de archivos: `backend`, `frontend`, `README.md`, etc.

### Abrir una terminal DENTRO de VS Code (la vas a usar todo el tiempo)

1. En el menú de arriba, ve a **Terminal** → **Nueva terminal (New Terminal)**.
   *(Atajo de teclado: `` Ctrl + ` `` — la tecla con el acento grave, arriba del Tab)*
2. Se abre un panel abajo con una línea esperando texto, algo como:
   ```
   PS C:\Users\TuUsuario\Documents\cafe-shopping>
   ```
3. Esa es tu terminal. Fíjate que **ya está parada dentro de la carpeta del proyecto** — no
   necesitas escribir `cd` ni nada para "moverte", ya estás en el lugar correcto. Cada vez que
   esta guía diga "escribe este comando", es en esta ventana.

✅ **Cómo saber que funcionó:** si ves ese texto `PS C:\...\cafe-shopping>` esperando que
escribas algo, vas perfecto.

---

<a name="parte-3"></a>
## Parte 3 — El archivo de "secretos" (.env)

El proyecto necesita un archivo llamado `.env` dentro de la carpeta `backend`, con configuración
como contraseñas y llaves de acceso. Por seguridad, este archivo **no viene incluido** — en su
lugar viene una plantilla llamada `.env.example` que vamos a copiar y renombrar.

1. En el panel izquierdo de VS Code, abre la carpeta **`backend`** haciendo clic sobre ella.
2. Busca el archivo **`.env.example`**.
3. Haz **clic derecho** sobre `.env.example` → **Copiar (Copy)**.
4. Haz **clic derecho** sobre la carpeta `backend` (o en un espacio vacío de la lista de
   archivos) → **Pegar (Paste)**. Va a aparecer un archivo nuevo, probablemente llamado
   `.env.example copy` o similar.
5. Haz **clic derecho** sobre ese archivo nuevo → **Cambiar nombre (Rename)** → bórralo todo y
   escribe exactamente: `.env` (con el punto adelante, sin nada más) → presiona Enter.

✅ **Cómo saber que funcionó:** en la carpeta `backend` ahora tienes **dos** archivos parecidos:
`.env.example` (la plantilla original, no la toques) y `.env` (tu copia real, esta sí la vamos
a editar).

> 💡 **Por qué usamos VS Code para esto y no el Bloc de notas:** el Bloc de notas de Windows a
> veces guarda los archivos con un formato invisible que rompe estos archivos de configuración.
> VS Code los guarda siempre bien. Usa siempre VS Code para tocar archivos de este proyecto.

Por ahora, con la plantilla tal cual viene alcanza para probar el sistema (sin WhatsApp real
todavía — eso lo activamos en la Parte 7 y 8). No necesitas cambiar nada en este archivo todavía.

---

<a name="parte-4"></a>
## Parte 4 — Levantar el sistema por primera vez

Este es el paso donde Docker arma las 3 "cajas" (base de datos, backend, frontend) y las prende.
**La primera vez tarda bastante** (5 a 15 minutos, depende de tu internet) porque tiene que
descargar varias cosas. Las siguientes veces va a ser mucho más rápido.

1. Asegúrate de que **Docker Desktop esté abierto** y diga "Engine running" (ver Parte 1.2).
2. En la terminal de VS Code (la que ya está parada en la carpeta `cafe-shopping`), escribe:
   ```powershell
   docker compose up --build
   ```
   y presiona **Enter**.
3. Vas a ver **muchísimo** texto pasando rápido. Esto es normal — es Docker descargando e
   instalando cosas dentro de las cajas. No cierres la ventana, no presiones nada, solo espera.
4. Vas a saber que casi termina cuando el texto empiece a mostrar líneas como:
   ```
   cafe-shopping-backend-1   | Cafe Shopping API escuchando en http://localhost:3000/api
   cafe-shopping-frontend-1  | ...
   ```
5. Cuando el texto se calme y deje de moverse (sigue "vivo", pero ya no aparecen líneas nuevas
   todo el tiempo), el sistema está corriendo.

✅ **Cómo saber que funcionó:** abre tu navegador (Chrome/Edge) en **otra ventana** (no cierres
la terminal) y ve a: **http://localhost:5173**. Deberías ver la pantalla de inicio de sesión de
"Cafe Shopping" con fondo oscuro.

> ⚠️ Esta terminal ahora está "ocupada" mostrando los registros (logs) en vivo de los 3
> programas. Es normal. **No la cierres** mientras uses el sistema — si la cierras (o presionas
> `Ctrl + C` adentro de ella), todo se apaga. Para seguir trabajando con otros comandos, abre una
> **segunda terminal** en VS Code: `` Ctrl + Shift + ` `` (o el botón `+` en el panel de la
> terminal) abre una nueva pestaña de terminal sin cerrar la primera.

---

<a name="parte-5"></a>
## Parte 5 — Cargar datos de prueba

El sistema arranca vacío (sin productos, sin clientes). Vamos a cargar unos datos de ejemplo
para poder probar todo sin tener que escribirlo a mano.

1. Abre una **segunda pestaña de terminal** en VS Code (no cierres la primera, ver nota arriba).
2. Escribe:
   ```powershell
   docker compose exec backend npm run prisma:seed
   ```
3. En unos segundos debería imprimir algo como:
   ```
   Listo. Usuarios de prueba (password: "cafe1234"):
     - admin@cafeshopping.com (ADMIN)
     - cajero@cafeshopping.com (CAJERO)
     - contabilidad@cafeshopping.com (CONTABILIDAD)
   ```

✅ **Cómo saber que funcionó:** ese mensaje con los 3 usuarios apareció, sin errores en rojo.

> Este comando solo lo necesitas correr **una vez** (la primera vez que instalas todo). Si lo
> corres de nuevo más adelante no rompe nada, simplemente no duplica lo que ya existe.

---

<a name="parte-6"></a>
## Parte 6 — Usar el sistema y comprobar que funciona

1. Ve a **http://localhost:5173** en tu navegador.
2. Inicia sesión con:
   - Correo: `admin@cafeshopping.com`
   - Contraseña: `cafe1234`
3. Deberías entrar al **Dashboard**, con tarjetas mostrando ventas de hoy, deudas, etc. (en 0 o
   con datos de ejemplo).
4. En el menú de la izquierda, haz clic en **"Punto de venta"**.
5. Haz clic sobre cualquier producto de la lista (ej. "Cafe con leche 12oz") para agregarlo al
   carrito, a la derecha.
6. Abajo a la derecha, deja el método de pago en **"Efectivo"** y haz clic en el botón grande
   **"Cobrar RD$ ..."**.
7. Espera unos segundos (está generando la imagen de la factura con Puppeteer).

✅ **Cómo saber que funcionó:** debería aparecer una tarjeta con **la imagen de la factura**
(un recibo con el logo, los productos, y el total). Si ves esa imagen, significa que el
backend, la base de datos y la generación de facturas están funcionando correctamente juntos.

> 🔧 **Si la imagen NO aparece** y en su lugar ves un mensaje de error: lee la Parte 12
> (Solución de problemas) — casi siempre es que Docker Desktop se quedó sin memoria asignada la
> primera vez, y basta con reintentar la venta una segunda vez.

En este punto, **ya tienes el 90% del sistema funcionando**: ventas, clientes, deudas, gastos y
reportes ya sirven completamente. Lo único que falta para que sea 100% real es conectar el envío
de WhatsApp de verdad (Parte 7 y 9) y el almacenamiento en la nube (Parte 8 y 9) — sin esto
último, las facturas se generan pero solo se guardan dentro de tu propia computadora, no en un
lugar público de internet.

---

<a name="parte-7"></a>
## Parte 7 — Crear tu cuenta de Twilio (para WhatsApp real)

Twilio es la empresa que realmente envía los mensajes de WhatsApp. Es gratis crear la cuenta;
lo que se paga (montos muy pequeños, centavos por mensaje) es cuando realmente envías mensajes,
y Twilio te da algo de crédito de regalo al registrarte para que puedas probar sin pagar nada al
inicio.

### 7.1 — Crear la cuenta

1. Ve a **https://www.twilio.com/try-twilio**
2. Completa el formulario de registro (correo, contraseña) o regístrate con tu cuenta de Google.
3. Te van a pedir verificar tu correo (revisa tu bandeja de entrada y haz clic en el enlace) y
   luego verificar un número de teléfono celular (te mandan un código por SMS que debes escribir
   en la página).
4. Te va a hacer un par de preguntas tipo encuesta ("¿qué vas a construir?", etc.) — responde
   lo que quieras, no afecta la configuración técnica. Si te pregunta qué producto te interesa,
   busca/selecciona **WhatsApp**.

### 7.2 — Encontrar tus credenciales (Account SID y Auth Token)

1. Una vez dentro, estarás en el **Twilio Console** (el panel principal).
2. En la parte superior o en un panel llamado **"Account Info"**, vas a ver dos campos:
   - **Account SID** (empieza con `AC` seguido de muchas letras y números)
   - **Auth Token** (oculto por unos puntitos; hay un botón/ícono de ojo para mostrarlo, o un
     botón "Copy" para copiarlo directo)
3. Copia ambos valores a algún lugar temporal (por ejemplo, un Bloc de notas) — los vamos a
   pegar en el archivo `.env` en la Parte 9. **Nunca compartas el Auth Token con nadie**, es
   como una contraseña.

### 7.3 — Activar el Sandbox de WhatsApp

El "Sandbox" es un modo de prueba gratuito de Twilio que te deja mandar WhatsApps reales sin
tener que pasar por el proceso (largo) de aprobación de un número de WhatsApp Business propio.

1. En el menú de la izquierda del Console, busca **Messaging**.
2. Dentro de Messaging, busca **"Try it out"** y luego **"Send a WhatsApp message"**.
3. Vas a ver una pantalla explicando el Sandbox, con un **código para unirte** (algo como
   `join palabra-clave`) y un **número de teléfono** (casi siempre empieza con `+1 415...`).
4. Desde **tu propio celular**, abre WhatsApp y manda un mensaje con ese texto exacto (ej.
   `join palabra-clave`) al número que te mostraron. Twilio te va a responder confirmando que
   te uniste — así es como pruebas mensajes sin pagar por un número propio todavía.
5. **Anota el número de WhatsApp del sandbox** (el que empieza con `+1415...`) — lo vas a
   necesitar en la Parte 9, con el formato `whatsapp:+14155238886` (así, con el prefijo
   `whatsapp:` pegado adelante).

✅ **Cómo saber que funcionó:** te llegó un mensaje de confirmación de Twilio a tu WhatsApp
después de mandar el código de unión.

> 💡 Cualquier cliente al que le quieras mandar facturas de prueba **también** tiene que unirse
> al sandbox mandando ese mismo código desde su propio WhatsApp — es una limitación del modo de
> prueba gratuito. Para mandar mensajes a cualquier cliente sin que se una primero, más adelante
> Twilio requiere aprobar un número de WhatsApp Business real (proceso aparte, ya para cuando
> tengas el negocio funcionando de verdad).

---

<a name="parte-8"></a>
## Parte 8 — Crear tu cuenta de almacenamiento (DigitalOcean Spaces)

**¿Por qué necesitas esto?** Cuando el sistema genera la imagen de una factura, tiene que
guardarla en algún lugar de internet al que Twilio pueda "ir a buscarla" para mandarla por
WhatsApp. Tu propia computadora no sirve para esto (Twilio no puede entrar a tu PC). Por eso se
usa un servicio de almacenamiento en la nube.

> 💰 **Costo:** DigitalOcean Spaces tiene un costo fijo de **$5 USD al mes** (incluye 250 GB de
> espacio, muchísimo más de lo que vas a usar con solo imágenes de facturas). No tiene plan
> gratis permanente, pero DigitalOcean suele regalar crédito inicial a cuentas nuevas que cubre
> los primeros meses — revisa la oferta vigente al registrarte. Lo elegimos para esta guía
> porque su panel es mucho más simple de configurar que el de Amazon S3 para alguien que
> recién empieza.

### 8.1 — Crear la cuenta

1. Ve a **https://www.digitalocean.com**
2. Haz clic en **"Sign up"**, completa el registro (correo + contraseña, o con Google/GitHub).
3. Verifica tu correo.
4. Te va a pedir agregar un **método de pago** (tarjeta de crédito/débito) — es obligatorio para
   poder crear el Space, aunque sea el plan más económico.

### 8.2 — Crear el "Space" (el almacén)

1. Dentro del panel de DigitalOcean, en el menú de la izquierda busca **"Spaces Object Storage"**
   (a veces bajo la sección "Manage").
2. Haz clic en **"Create Spaces Bucket"** (o el botón de crear, puede decir solo "Create").
3. Elige una **región** (el datacenter más cercano a ti; cualquiera funciona técnicamente, ej.
   `nyc3` o `sfo3`).
4. Ponle un nombre único a tu bucket, por ejemplo `cafe-shopping-facturas-tunombre` (tiene que
   ser único en todo DigitalOcean, por eso te sugiero agregar algo propio al nombre).
5. Deja las demás opciones por defecto (no hace falta activar el CDN para este proyecto).
6. Haz clic en **Crear (Create Spaces Bucket)**.

### 8.3 — Generar tu llave de acceso (Access Key)

1. Dentro de la sección **Spaces Object Storage**, busca la pestaña **"Access Keys"**.
2. Haz clic en **"Create Access Key"**.
3. Dale un nombre (ej. `cafe-shopping-key`) y confirma.
4. Te va a mostrar dos valores **una sola vez**:
   - **Access Key** (esto va en `S3_KEY`)
   - **Secret Key** (esto va en `S3_SECRET`)
5. **Cópialos ya mismo** a tu Bloc de notas temporal — si cierras esta ventana sin copiar el
   Secret Key, no lo vas a poder ver de nuevo (tendrías que crear una llave nueva).

### 8.4 — Anotar los datos que vas a necesitar

Junta estos 6 datos (los vamos a usar todos en la Parte 9):

| Dato | Dónde lo conseguiste | Ejemplo |
|---|---|---|
| `S3_BUCKET` | El nombre que le pusiste a tu Space | `cafe-shopping-facturas-tunombre` |
| `S3_KEY` | Access Key de la Parte 8.3 | `DO00ABC123...` |
| `S3_SECRET` | Secret Key de la Parte 8.3 | `abcXYZ...` |
| `S3_REGION` | La región que elegiste en 8.2 | `nyc3` |
| `S3_ENDPOINT` | `https://` + tu región + `.digitaloceanspaces.com` | `https://nyc3.digitaloceanspaces.com` |
| `S3_PUBLIC_URL` | `https://` + nombre de tu bucket + `.` + tu región + `.digitaloceanspaces.com` | `https://cafe-shopping-facturas-tunombre.nyc3.digitaloceanspaces.com` |

✅ **Cómo saber que funcionó:** tienes los 6 valores de la tabla anotados en algún lado. Con
eso, ya podemos pasar a conectarlo todo.

---

<a name="parte-9"></a>
## Parte 9 — Conectar Twilio y Spaces al proyecto

Ahora vamos a poner todos esos datos que anotaste dentro del archivo `.env` que creamos en la
Parte 3.

1. En VS Code, abre `backend` → haz clic en el archivo **`.env`** (el que creaste, no el
   `.env.example`).
2. Vas a ver líneas como `TWILIO_ACCOUNT_SID=` — con el cursor, haz clic justo después del signo
   `=` de cada línea y escribe el valor correspondiente, **sin espacios y sin comillas**.

Completa estas líneas con lo que anotaste en las Partes 7 y 8:

```
TWILIO_ACCOUNT_SID=AC1234567890abcdef1234567890abcd
TWILIO_AUTH_TOKEN=tu_auth_token_de_twilio
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

S3_BUCKET=cafe-shopping-facturas-tunombre
S3_KEY=tu_access_key
S3_SECRET=tu_secret_key
S3_REGION=nyc3
S3_ENDPOINT=https://nyc3.digitaloceanspaces.com
S3_PUBLIC_URL=https://cafe-shopping-facturas-tunombre.nyc3.digitaloceanspaces.com
```

3. Guarda el archivo: `Ctrl + S`.

### Reiniciar el sistema para que tome los cambios

El backend solo lee el archivo `.env` cuando arranca, así que si lo cambiaste mientras ya
estaba corriendo, necesita reiniciarse:

1. Ve a la terminal donde corre `docker compose up --build` (la primera que abriste en la
   Parte 4) y presiona `Ctrl + C` para detenerla.
2. Vuelve a escribir el mismo comando:
   ```powershell
   docker compose up --build
   ```
   (esta vez va a ser mucho más rápido que la primera, porque ya tiene casi todo descargado).

✅ **Cómo saber que funcionó:** entra al sistema (`localhost:5173`), ve al menú **Configuración**
(solo lo ve el usuario ADMIN). Debajo de "Integraciones" deberías ver **"WhatsApp: Configurado"**
y **"S3: Configurado"** en verde, en vez de "No configurado" en rojo.

---

<a name="parte-10"></a>
## Parte 10 — Prueba real completa (venta → factura → WhatsApp)

Este es el momento de la verdad: vamos a hacer una venta y que te llegue la factura de verdad
por WhatsApp.

1. Ve a **Clientes** en el menú → **"Nuevo cliente"**.
2. Llena el formulario con tu propio nombre y **tu número de WhatsApp** (el mismo que uniste al
   sandbox de Twilio en la Parte 7.3), en formato internacional, ej. `+18095551234`. Guarda.
3. Ve a **Punto de venta**.
4. Agrega uno o dos productos al carrito.
5. En la sección **Cliente**, escribe tu nombre en el buscador y selecciona tu propio cliente
   (el que acabas de crear).
6. Deja el método de pago en "Efectivo" y presiona **Cobrar**.
7. Cuando aparezca la vista previa de la factura, presiona el botón **"Enviar por WhatsApp"**.

✅ **Cómo saber que funcionó de verdad:** en unos segundos, te debería llegar un mensaje de
WhatsApp con la imagen de la factura adjunta, desde el número de Twilio.

🎉 Si llegaste hasta aquí y te llegó el mensaje: **el sistema completo está funcionando, de
principio a fin, exactamente como se diseñó.**

---

<a name="parte-11"></a>
## Parte 11 — Comandos del día a día (guárdate esta lista)

No necesitas memorizar nada — vuelve a esta sección cada vez que la necesites.

| Quiero... | Comando (escríbelo en la terminal de VS Code, dentro de la carpeta del proyecto) |
|---|---|
| Prender todo el sistema | `docker compose up -d` |
| Prender todo y ver los mensajes en vivo | `docker compose up` |
| Apagar todo | `docker compose down` |
| Ver si está prendido | `docker compose ps` |
| Ver los mensajes/errores del backend | `docker compose logs backend` |
| Ver los mensajes/errores del backend en vivo | `docker compose logs -f backend` |
| Cargar datos de prueba de nuevo | `docker compose exec backend npm run prisma:seed` |
| Reconstruir todo desde cero (tras cambiar código o `.env`) | `docker compose up --build` |

> Nota la diferencia entre `docker compose up` (se queda "pegado" mostrando mensajes en vivo,
> ideal cuando estás probando) y `docker compose up -d` (la `-d` es de "detached" / separado —
> prende todo y te devuelve el control de la terminal para hacer otras cosas mientras el sistema
> sigue corriendo de fondo). Para uso diario normal, `docker compose up -d` es más cómodo.

---

<a name="parte-12"></a>
## Parte 12 — Solución de problemas comunes en Windows

| Problema | Qué hacer |
|---|---|
| `docker : El término 'docker' no se reconoce...` | Docker Desktop no está instalado del todo, o instalaste pero no reiniciaste la computadora. Reinicia y vuelve a intentar. |
| Docker Desktop no abre / se queda cargando para siempre | Verifica que WSL2 esté activo: abre PowerShell **como administrador** y corre `wsl --status`. Si da error, repite el Paso A de la Parte 1.2. |
| `docker compose up` falla con algo sobre "virtualization" o "Hyper-V" | Tu procesador tiene la virtualización apagada. Abre el Administrador de tareas (`Ctrl+Shift+Esc`) → pestaña **Rendimiento** → **CPU** → busca la línea **"Virtualización"**. Si dice "Deshabilitada", tienes que entrar al BIOS/UEFI de tu computadora para activarla (el método exacto varía según la marca — busca "activar virtualización" + la marca de tu computadora). |
| El puerto 5432 (o 3000, o 5173) "ya está en uso" | Algún otro programa está usando ese mismo número. Cierra otros programas de desarrollo si tienes (otro Postgres, XAMPP, etc.) o reinicia la computadora. |
| La imagen de la factura no aparece la primera vez | La primera venta a veces tarda más porque Chromium (el navegador que genera la imagen) recién está arrancando dentro del contenedor. Espera 10 segundos y vuelve a intentar la venta. |
| "WhatsApp: No configurado" aunque ya llenaste el `.env` | Te faltó reiniciar con `docker compose up --build` después de guardar el archivo (Parte 9). Revisa también que no haya espacios antes/después del signo `=` en el `.env`. |
| Twilio manda error de "media" al enviar | Casi siempre significa que `S3_PUBLIC_URL` está mal escrito, o que tu Space no permite lectura pública. Revisa que copiaste bien la URL de la Parte 8.4. |
| No me llega el WhatsApp aunque todo dice "Configurado" | Confirma que **el número del cliente en el sistema** es el mismo que usaste para mandar `join <código>` al sandbox de Twilio (Parte 7.3). Solo los números que se unieron al sandbox pueden recibir mensajes de prueba. |
| VS Code no reconoce comandos de `docker` en su terminal aunque funcionan en PowerShell normal | Cierra VS Code por completo y vuelve a abrirlo (a veces necesita reiniciar para "ver" que Docker ya está instalado). |
| Quiero empezar de cero (borrar todos los datos y volver a probar) | `docker compose down -v` (el `-v` borra también los datos guardados) y luego repite la Parte 4 y 5. |

---

<a name="parte-13"></a>
## Parte 13 — Diccionario final (para cuando se te olvide algo)

- **`docker compose up --build`** → prende todo el sistema, reconstruyendo las cajas (úsalo
  después de cambiar el `.env` o el código).
- **`docker compose up -d`** → prende todo el sistema para uso normal del día a día.
- **`docker compose down`** → apaga todo.
- **`localhost:5173`** → la dirección donde ves y usas el sistema (frontend).
- **`localhost:3000/api/docs`** → la documentación técnica de la API (no la necesitas para usar
  el sistema, es más para quien programe sobre esto después).
- **`.env`** → donde van tus contraseñas y llaves de acceso. Nunca lo subas a internet ni lo
  compartas.
- **Sandbox de Twilio** → el modo de prueba gratuito de WhatsApp; los destinatarios deben
  "unirse" mandando un código antes de poder recibir mensajes.
- **Space (DigitalOcean)** → el almacén en la nube donde se guardan las imágenes de las facturas.

---

### ¿Y ahora qué?

Con esto tienes el sistema completo funcionando en tu computadora, con WhatsApp y almacenamiento
reales. Los próximos pasos naturales (llevar esto a un servidor real para que funcione todo el
tiempo, no solo en tu computadora; conseguir un número de WhatsApp Business propio en vez del
sandbox) están descritos en la sección **"Despliegue a producción"** del `README.md` del
proyecto — son pasos más avanzados, para cuando ya hayas probado todo localmente y quieras que
el negocio lo use de verdad, todos los días.
