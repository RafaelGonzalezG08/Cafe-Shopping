# Cafe Shopping - App de escritorio

Envuelve todo el proyecto (Docker + frontend + agente de WhatsApp) en una sola
app de Windows con icono propio. Al abrirla: prende Docker Desktop si hace
falta, levanta los contenedores, espera a que la app este lista, prende el
agente de WhatsApp, y muestra Cafe Shopping en una ventana nativa — todo lo
que hacia `iniciar_cafe_shopping.ahk`, pero como una app instalable de verdad.

## 0) Primero, si es la primera vez en esta PC

Antes de compilar la app de escritorio, la PC necesita tener el proyecto ya
instalado y funcionando al menos una vez (Docker con las imagenes construidas,
`.env` creado, base de datos con las migraciones aplicadas). Para eso corre
**`instalar.bat`** (doble clic) en la raiz del proyecto — automatiza Docker,
el `.env`, las migraciones y deja el agente de WhatsApp instalado. Ver los
comentarios de `instalar.ps1` para el detalle de que hace.

Una vez que eso corrio sin errores, sigue con los pasos de abajo para
compilar la app de escritorio (que es solo la forma "un clic" de abrir todo
lo que `instalar.bat` ya dejó funcionando).

## Requisitos para compilarla

- **Windows** (recomendado compilar en la misma PC donde se va a usar; evita
  problemas de compilar instaladores de Windows desde otro sistema operativo).
- [Node.js 20+](https://nodejs.org) instalado.
- El resto del proyecto tal cual esta (no hace falta tocar nada mas).

## Pasos

Abre una terminal (PowerShell) en la carpeta `desktop/` de este proyecto:

```powershell
cd desktop
npm install
npm run dist
```

Eso descarga Electron (una sola vez) y genera el instalador en
`desktop/dist/`, algo como:

```
desktop/dist/Cafe Shopping Setup 1.0.0.exe
```

Ese `.exe` es el instalador final: doble clic, siguiente, siguiente, y crea
un acceso directo "Cafe Shopping" en el Escritorio y el menu de Inicio, con
icono propio. Se puede copiar y compartir ese instalador a cualquier otra PC
del negocio.

## Que incluye el instalador

`npm run dist` empaqueta **todo el proyecto** (backend, frontend,
`docker-compose.yml`, `send_whatsapp_agent.ahk`/`.exe`, etc.) dentro de la
app instalada, en una carpeta de recursos interna. No hace falta tener el
proyecto descomprimido en otro lado aparte.

**Antes de compilar, revisa:**

- `docker-compose.yml`, `.env` y `backend/.env` en la raiz del proyecto
  deben tener ya la configuracion final (puertos, tasa de impuesto, etc.):
  eso queda "congelado" dentro del instalador.
- Si quieres que el agente de WhatsApp arranque como `.exe` (mas prolijo, sin
  depender de tener AutoHotkey instalado en la PC del negocio), compila
  primero `send_whatsapp_agent.ahk` a `.exe` (click derecho > Compile Script,
  con AutoHotkey v1.1 instalado) y deja el `.exe` junto al `.ahk` en la raiz
  del proyecto antes de correr `npm run dist`. Si no existe el `.exe`, la app
  intenta abrir el `.ahk` directamente (requiere AutoHotkey instalado en esa
  PC).

## Requisitos para *usar* la app instalada (en la PC del negocio)

Estos siguen siendo necesarios — la app de escritorio solo automatiza
prenderlos, no los reemplaza:

- **Docker Desktop** instalado.
- **WhatsApp Desktop** instalado y con sesion iniciada.
- Si el agente se empaqueto como `.ahk` (no `.exe`): **AutoHotkey v1.1**
  instalado en esa PC.

## Icono de la app

Ya viene con un icono generico (`build/icon.png`). Para poner tu propio logo:
reemplaza `desktop/build/icon.png` por una imagen cuadrada (idealmente
512x512px, fondo transparente) y vuelve a correr `npm run dist` —
electron-builder genera el `.ico` de Windows automaticamente a partir de ese
PNG.

## Probar sin compilar el instalador

Para ver la app corriendo sin generar el `.exe` cada vez (util mientras
ajustas algo):

```powershell
cd desktop
npm install
npm start
```

## Notas

- Al cerrar la ventana, los contenedores de Docker **se quedan corriendo**
  en segundo plano (asi la proxima vez que abras la app, carga al instante).
  Si quieres apagarlos del todo, usa Docker Desktop o `docker compose down`
  desde una terminal.
- Esta app no reemplaza los `.env`/`docker-compose.yml` del proyecto — los
  usa tal cual. Cualquier cambio ahi requiere volver a compilar (`npm run
  dist`) para que quede reflejado en el instalador.
