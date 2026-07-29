# Guía de integración — Cafe Shopping

Esta guía va en el orden correcto: cada fase depende de que la anterior funcione. No saltes
fases — la mayoría de los problemas de integración pasan por probar WhatsApp antes de tener
Postgres corriendo, o el frontend antes que el backend responda.

---

## Fase 0 — Requisitos

```bash
node -v      # 20 o superior
docker -v
docker compose version
```

Descomprime el proyecto y entra a la carpeta:

```bash
unzip cafe-shopping.zip
cd cafe-shopping
```

---

## Fase 1 — Base de datos + Prisma (el cimiento)

Todo lo demás depende de que el ORM y el schema estén sincronizados con una base real. Sin
esto, nada del backend arranca.

```bash
cd backend
cp .env.example .env
```

Levanta solo Postgres (aún no todo el stack):

```bash
docker run -d --name cafe-db \
  -e POSTGRES_USER=cafeshopping -e POSTGRES_PASSWORD=cafeshopping -e POSTGRES_DB=cafe_shopping \
  -p 5432:5432 postgres:16-alpine
```

En `backend/.env`, confirma:

```
DATABASE_URL=postgresql://cafeshopping:cafeshopping@localhost:5432/cafe_shopping
```

Instala y sincroniza el schema:

```bash
npm install
npx prisma generate      # ✅ checkpoint: no debe haber errores de "no exported member"
npx prisma migrate dev --name init   # ✅ checkpoint: crea las 11 tablas
npm run prisma:seed      # ✅ checkpoint: imprime los 3 usuarios de prueba
```

**Verificación:** `npx prisma studio` abre una UI en `localhost:5555` donde deberías ver las
tablas `users`, `clients`, `products`, etc. con datos del seed. Si esto funciona, el cimiento
está listo.

---

## Fase 2 — Backend solo (todavía sin Twilio/S3)

```bash
npm run build   # ✅ checkpoint: compila sin errores
npm test        # ✅ checkpoint: tests unitarios en verde
npm run start:dev
```

**Verificación:** abre `http://localhost:3000/api/docs` (Swagger). Prueba `POST /auth/login`
con `admin@cafeshopping.com` / `cafe1234` → debe devolver un `accessToken`. Si esto funciona,
el backend está correctamente acoplado a la base de datos.

---

## Fase 3 — Acoplar el frontend al backend

En otra terminal:

```bash
cd frontend
cp .env.example .env   # confirma VITE_API_URL=http://localhost:3000/api
npm install
npm run dev
```

**Verificación:**
1. Abre `http://localhost:5173`, entra con `admin@cafeshopping.com` / `cafe1234`.
2. Deberías ver el Dashboard (con los datos del seed).
3. Ve a **Punto de venta**, agrega un producto, cobra en efectivo.
4. ✅ checkpoint clave: debe aparecer la vista previa de la factura (PNG). Esto confirma que
   Puppeteer está renderizando correctamente en tu máquina.

> Si el PNG no aparece y el backend muestra un error de Chromium: te falta el navegador que
> usa Puppeteer localmente (fuera de Docker). Corre `npx puppeteer browsers install chrome`
> dentro de `backend/` y reinicia `npm run start:dev`. Dentro de Docker esto no pasa porque la
> imagen ya trae Chromium (ver Fase 6).

En este punto **ya tienes el 90% del sistema acoplado** (auth, POS, ventas, clientes, deudas,
gastos, reportes). Lo único que falta es WhatsApp real y almacenamiento en la nube.

---

## Fase 4 — Almacenamiento S3/Spaces (antes que Twilio, no después)

Ojo con el orden: Twilio necesita descargar el PNG desde una URL **pública**. El fallback local
del backend (`/uploads`) no es accesible desde internet, así que si configuras Twilio primero
el envío va a fallar aunque las credenciales estén bien. Por eso S3 va primero.

1. Crea un bucket (AWS S3) o un Space (DigitalOcean) con **acceso público de lectura**.
2. Genera una llave de acceso.
3. Completa en `backend/.env`:
   ```
   S3_BUCKET=tu-bucket
   S3_KEY=...
   S3_SECRET=...
   S3_REGION=us-east-1        # o nyc3, etc. en DigitalOcean
   S3_ENDPOINT=               # solo si NO es AWS, ej: https://nyc3.digitaloceanspaces.com
   S3_PUBLIC_URL=             # ej: https://tu-bucket.nyc3.digitaloceanspaces.com
   ```
4. Reinicia el backend (`Ctrl+C` y `npm run start:dev` de nuevo).

**Verificación:** en el frontend, ve a **Configuración** → debajo de "Integraciones" debe decir
**S3: Configurado**. Haz otra venta de prueba y confirma (revisando la URL de la imagen en el
navegador) que ahora apunta a tu bucket y no a `localhost:3000/uploads`.

> **Atajo para probar sin bucket todavía:** si solo quieres probar el envío real de WhatsApp
> sin montar S3 aún, puedes exponer tu backend local con [ngrok](https://ngrok.com)
> (`ngrok http 3000`) y poner esa URL en `BACKEND_PUBLIC_URL` en el `.env`. Es solo para
> pruebas — en producción usa S3.

---

## Fase 5 — Twilio WhatsApp (el último acople)

1. Crea una cuenta en [twilio.com](https://www.twilio.com) y activa el **WhatsApp Sandbox**.
2. Desde tu WhatsApp, envía el código de unión al número del sandbox (Twilio te lo muestra en
   el dashboard) — sin este paso Twilio no puede enviarte mensajes a ti como destinatario de prueba.
3. Completa en `backend/.env`:
   ```
   TWILIO_ACCOUNT_SID=AC...
   TWILIO_AUTH_TOKEN=...
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   ```
4. Reinicia el backend.

**Verificación:** en **Configuración** debe decir **WhatsApp: Configurado**. Ve a **Clientes**,
edita (o crea) un cliente con tu propio número (el que uniste al sandbox), haz una venta
asociada a ese cliente y presiona **Enviar por WhatsApp**. Deberías recibir el mensaje con la
imagen de la factura en segundos.

✅ **Si llegaste hasta aquí y recibiste el WhatsApp: el sistema está 100% acoplado end-to-end.**

---

## Fase 6 — Unirlo todo en Docker (el acople "de producción")

Esto reemplaza correr backend/frontend/postgres por separado con un solo comando, usando las
mismas variables que ya probaste:

```bash
# Detén los procesos sueltos de las fases anteriores (Ctrl+C) y el contenedor de prueba:
docker stop cafe-db && docker rm cafe-db

cd ..   # a la raíz del proyecto
docker compose up --build
```

`docker-compose.yml` ya conecta los tres servicios entre sí (el backend apunta al Postgres del
propio compose, el frontend apunta al backend). Tus credenciales de Twilio/S3 se leen de
`backend/.env` vía `env_file`.

```bash
docker compose ps                        # ✅ checkpoint: 3 servicios "running"/"healthy"
docker compose exec backend npm run prisma:seed   # si es la primera vez con este volumen
```

Abre `http://localhost:5173` de nuevo y repite la venta de prueba — ahora todo corre
containerizado, que es como se vería en producción.

---

## Checklist final de "todo acoplado"

- [ ] `npx prisma studio` muestra datos reales
- [ ] Login funciona en Swagger y en el frontend
- [ ] POS crea una venta y genera el PNG de la factura
- [ ] El PNG queda en tu bucket S3 (no en `localhost/uploads`)
- [ ] El WhatsApp llega de verdad al celular de prueba
- [ ] Reportes y Dashboard muestran los números correctos
- [ ] Un usuario CAJERO **no puede** entrar a Configuración (prueba de roles)
- [ ] `docker compose up --build` levanta todo desde cero en una carpeta limpia

## Problemas comunes

| Síntoma | Causa probable |
|---|---|
| `Module "@prisma/client" has no exported member` | No corriste `npx prisma generate` |
| Puppeteer falla solo fuera de Docker | Falta Chromium local → `npx puppeteer browsers install chrome` |
| Twilio responde error de "media" | La URL del PNG no es pública (te falta S3, ver Fase 4) |
| Frontend no puede llamar al backend (error de CORS) | `FRONTEND_URL` en `backend/.env` no coincide con el puerto real del frontend |
| `docker compose up` falla en el backend | Revisa `docker compose logs backend` — casi siempre es `DATABASE_URL` o falta esperar a que Postgres esté healthy |
