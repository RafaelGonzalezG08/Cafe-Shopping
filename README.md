# Cafe Shopping

Sistema de punto de venta (POS), facturación y reportes para un negocio de cafetería.
Genera facturas en PNG y las envía por WhatsApp Desktop (vía un agente local en AutoHotkey,
`send_whatsapp_agent.ahk`) al cerrar cada venta, además de llevar clientes, deudas, gastos y
reportes de ventas.

Este repositorio fue generado a partir de la especificación funcional/técnica del proyecto,
priorizando (en este orden, tal como se pidió): **1)** flujo POS + factura PNG por WhatsApp,
**2)** ventas/clientes/deudas, **3)** reportes, **4)** UI responsiva, **5)** tests y documentación.

## Estado del proyecto — que esta completo

| Area | Estado |
|---|---|
| Autenticación JWT + roles (ADMIN/CAJERO/CONTABILIDAD) | ✅ Completo |
| CRUD Clientes, Productos, Gastos | ✅ Completo |
| Ventas (POS) con cálculo de subtotal/impuestos/total | ✅ Completo |
| Generación de factura HTML→PNG/PDF (Puppeteer) | ✅ Completo |
| Subida a S3/Spaces con fallback local para desarrollo | ✅ Completo |
| Envío de factura por WhatsApp Desktop (agente local `.ahk`, sin Twilio) | ✅ Completo |
| Deudas de clientes + registro de abonos + cron de vencidas | ✅ Completo |
| Reportes (ventas por día/semana/mes, deudas, gastos, flujo de caja) + export CSV | ✅ Completo |
| Dashboard con KPIs | ✅ Completo |
| Frontend responsivo (POS, Clientes, Ventas, Gastos, Reportes, Configuración) | ✅ Completo |
| Auditoría (audit_logs) en las mutaciones principales | ✅ Completo |
| Tests unitarios (cálculo de totales, auth) + e2e de humo | ✅ Incluidos |
| Docker + docker-compose + CI (GitHub Actions) | ✅ Completo |
| Export a **PDF** de reportes (solo CSV implementado) | ⚠️ Pendiente (ver "Próximos pasos") |
| BullMQ + Redis para colas/reintentos | ⚠️ No incluido — se uso `@nestjs/schedule` (equivalente a node-cron) para el único job programado (marcar deudas vencidas). Es la opción mas simple explícitamente permitida por la especificación original. Si necesitas reintentos robustos de envíos de WhatsApp a mayor escala, es el primer lugar natural para agregar una cola. |
| Gestión de inventario avanzada | ⚠️ Básica (CRUD + descuento de stock al vender), tal como la especificación la marcaba como opcional |

**Importante sobre la validación:** el entorno donde se generó este proyecto no tiene acceso
de red a `binaries.prisma.sh` (el CDN de Prisma), así que **no se pudo ejecutar
`npx prisma generate` ni correr migraciones reales aquí**. El **frontend sí se instaló y
compiló exitosamente** (`npm run build` sin errores). Para el backend se verificó manualmente
cada uso de Prisma Client contra el schema; el único tipo de error visto al compilar en este
entorno fue el esperado (`Module "@prisma/client" has no exported member 'Role'`, etc.), que
desaparece en cuanto corres `npx prisma generate` con acceso normal a internet. **El primer
paso al bajar este proyecto debe ser `npm install && npx prisma generate` en `backend/`,
seguido de `npm run build` y `npm test` para confirmar que todo compila en tu máquina.**

## Stack técnico

- **Frontend:** React + TypeScript (Vite), Tailwind CSS, React Query, Zustand, React Router, Recharts.
- **Backend:** NestJS (TypeScript), Prisma ORM, PostgreSQL, Passport-JWT, class-validator.
- **Facturación:** Plantilla HTML propia → Puppeteer (screenshot PNG + PDF).
- **WhatsApp:** agente local en AutoHotkey (`send_whatsapp_agent.ahk`) que controla WhatsApp
  Desktop; el backend deja "pedidos" de envío en una cola de archivos dentro del volumen local
  de uploads, sin depender de Twilio.
- **Almacenamiento:** disco local (volumen `backend_uploads`), con soporte opcional a S3 /
  DigitalOcean Spaces solo para links públicos de factura (no lo usa el envío por WhatsApp).
- **Infraestructura:** Docker + docker-compose, GitHub Actions.

## Estructura del repositorio

```
cafe-shopping/
├── backend/            # API NestJS
│   ├── src/
│   │   ├── auth/           # Login, registro, JWT
│   │   ├── clients/        # CRUD de clientes
│   │   ├── client-debts/   # Deudas y abonos
│   │   ├── products/       # Catálogo (opcional)
│   │   ├── sales/          # Ventas (POS)
│   │   ├── invoices/       # Plantilla + Puppeteer + S3 (opcional) + cola de WhatsApp
│   │   ├── expenses/       # Gastos
│   │   ├── reports/        # Reportes y export CSV
│   │   ├── settings/       # Perfil del negocio + estado de integraciones
│   │   ├── audit/          # audit_logs
│   │   └── common/         # Guards, decoradores, filtros
│   ├── prisma/schema.prisma
│   └── prisma/seed.ts
├── frontend/           # SPA React + Vite
│   └── src/pages/{pos,clients,sales,expenses,reports,settings}
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Requisitos previos

- Node.js 20+
- Docker y Docker Compose (recomendado para desarrollo rápido)
- Windows con [AutoHotkey v1.1](https://www.autohotkey.com/) y WhatsApp Desktop instalados, para
  correr `send_whatsapp_agent.ahk` (requerido para que el envío por WhatsApp funcione de verdad;
  ver "Configurar el agente de WhatsApp Desktop" más abajo)
- Un bucket S3 o DigitalOcean Spaces (opcional — solo para que el link de descarga de la factura
  se pueda abrir fuera de tu propia PC; sin esto, los PNG/PDF se guardan localmente y el envío por
  WhatsApp funciona igual)

## Instalación y desarrollo local

### Opción A: con Docker (recomendado)

```bash
git clone <este-repositorio>
cd cafe-shopping
cp backend/.env.example backend/.env
# Edita backend/.env si quieres agregar credenciales de S3 (opcional) o ajustar timeouts del agente de WhatsApp

docker compose up --build
```

Esto levanta Postgres, el backend (`http://localhost:3000/api`, docs en `/api/docs`) y el
frontend (`http://localhost:5173`). Las migraciones corren automáticamente al iniciar el
backend (`prisma migrate deploy`). Para poblar datos de ejemplo:

```bash
docker compose exec backend npm run prisma:seed
```

Usuarios de prueba tras el seed (contraseña `cafe1234`): `admin@cafeshopping.com` (ADMIN),
`cajero@cafeshopping.com` (CAJERO), `contabilidad@cafeshopping.com` (CONTABILIDAD).

> **¿Uso diario en la PC del negocio?** `instalar.bat` deja todo instalado la primera vez.
> Para el dia a dia (un clic y arranca todo: Docker, contenedores, agente de WhatsApp, la app),
> hay una app de escritorio compilable en `desktop/` — ver [`desktop/README.md`](./desktop/README.md).

### Opción B: sin Docker

```bash
# 1. Base de datos: usa un Postgres local o uno en la nube y copia su URL

# 2. Backend
cd backend
cp .env.example .env      # ajusta DATABASE_URL y demás variables
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed       # opcional, carga datos de ejemplo
npm run start:dev         # http://localhost:3000/api

# 3. Frontend (en otra terminal)
cd frontend
cp .env.example .env
npm install
npm run dev                # http://localhost:5173
```

## Variables de entorno (backend)

| Variable | Requerida | Descripción |
|---|---|---|
| `DATABASE_URL` | Sí | Cadena de conexión de PostgreSQL |
| `JWT_SECRET` | Sí | Secreto para firmar los tokens JWT |
| `JWT_EXPIRES_IN` | No | Duración del token (default `8h`) |
| `WHATSAPP_AGENT_TIMEOUT_MS` | No | Cuánto espera el backend la confirmación del agente `.ahk` antes de marcar error (default `60000`) |
| `WHATSAPP_AGENT_POLL_MS` | No | Cada cuánto revisa el backend si ya llegó la confirmación (default `1500`) |
| `S3_BUCKET` / `S3_KEY` / `S3_SECRET` / `S3_REGION` | Solo para almacenamiento en la nube | Si se omiten, se usa disco local (`/uploads`). No afecta el envío por WhatsApp. |
| `S3_ENDPOINT` | Solo proveedores S3-compatibles | Ej. DigitalOcean Spaces |
| `S3_PUBLIC_URL` | Recomendado con S3 | URL pública base para construir enlaces |
| `DEFAULT_TAX_RATE` | No | Tasa de impuesto por defecto (0.18 = 18%) |
| `PUPPETEER_EXECUTABLE_PATH` | Solo en Docker | Ruta al Chromium del sistema |

## Configurar el agente de WhatsApp Desktop (envío real de WhatsApp)

El envío ya **no** usa Twilio ni requiere una URL pública para el PNG. En su lugar, el backend
deja un "pedido" de envío en una cola de archivos dentro del volumen local de uploads
(`backend_uploads`, montado en `backend/uploads` dentro del contenedor), y un script de
AutoHotkey corriendo en la PC del negocio (donde está WhatsApp Desktop abierto) se encarga de
pegar el PNG y el texto de la factura en el chat del cliente, todo en un solo mensaje.

1. Instala [AutoHotkey v1.1](https://www.autohotkey.com/) en la PC donde está WhatsApp Desktop.
2. Abre `send_whatsapp_agent.ahk` (raíz del repo) con un editor y ajusta al inicio del archivo:
   - `VOLUME_NAME`: nombre del volumen de Docker (por defecto `cafe-shopping_backend_uploads`,
     que es `<carpeta-del-proyecto>_backend_uploads`; revisa con `docker volume ls` si tu carpeta
     tiene otro nombre).
   - `WHATSAPP_EXE_PATH`: ruta al ejecutable de WhatsApp Desktop en esa PC.
3. Haz doble clic en el script (o colócalo en la carpeta de Inicio de Windows para que arranque
   solo). Queda corriendo en la bandeja del sistema, vigilando la cola cada pocos segundos —
   revisa `C:\temp\whatsapp_send\agent.log` si necesitas diagnosticar algo.
4. Desde la app, al cerrar una venta con cliente y teléfono, el backend deja el pedido en la cola,
   el agente lo procesa y pega el PNG + el texto en el chat de WhatsApp de ese número. El backend
   espera la confirmación del agente (`WHATSAPP_AGENT_TIMEOUT_MS`) antes de marcar la factura
   como enviada o con error.
5. Requiere Docker Desktop corriendo (el agente usa `docker run` para extraer los archivos del
   volumen) y que Windows tenga acceso al `docker` de la línea de comandos.

## Configurar almacenamiento (S3 / DigitalOcean Spaces) — opcional

1. Crea un bucket (S3) o un Space (DigitalOcean) con acceso público de lectura para los objetos subidos.
2. Genera una llave de acceso y complétala en `S3_KEY` / `S3_SECRET`.
3. `S3_BUCKET` = nombre del bucket/space, `S3_REGION` = región (ej. `nyc3` en DO).
4. Si usas un proveedor S3-compatible (no AWS), define `S3_ENDPOINT` (ej.
   `https://nyc3.digitaloceanspaces.com`) y `S3_PUBLIC_URL` (ej.
   `https://mi-bucket.nyc3.digitaloceanspaces.com`).
5. Sin estas variables, el sistema sigue funcionando normalmente: los PNG/PDF se guardan en
   `backend/uploads` y se sirven desde el propio backend. Esto **no** afecta el envío por
   WhatsApp (que ahora es 100% local vía el agente `.ahk`) — S3 solo importa si quieres que el
   link de descarga de la factura se pueda abrir desde fuera de tu propia PC.

## Tests

```bash
cd backend
npm test              # unitarios (cálculo de totales, autenticación)
npm run test:e2e       # e2e de humo (requiere DATABASE_URL activo)

cd frontend
npm run build           # incluye chequeo de tipos con tsc
```

## Documentación de la API

Con el backend corriendo, la documentación interactiva (Swagger/OpenAPI) está en
`http://localhost:3000/api/docs`.

### Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/login` | Login, devuelve JWT |
| POST | `/api/auth/register` | Crear usuario (ADMIN) |
| GET/POST/PUT/DELETE | `/api/clients` | CRUD de clientes |
| GET/POST/PUT/DELETE | `/api/products` | CRUD de productos |
| POST | `/api/sales` | Crear venta (genera factura automáticamente) |
| GET | `/api/sales`, `/api/sales/:id` | Listar / ver venta |
| POST | `/api/sales/:id/send-invoice-whatsapp` | Enviar/reenviar factura por WhatsApp |
| GET | `/api/invoices/:id/download?format=png\|pdf` | Descargar factura |
| GET/POST | `/api/expenses` | Gastos |
| GET | `/api/client-debts` | Deudas pendientes |
| POST | `/api/client-debts/:id/payments` | Registrar abono |
| GET | `/api/reports/dashboard` | KPIs del dashboard |
| GET | `/api/reports/sales?from&to&group` | Ventas por período |
| GET | `/api/reports/sales/export` | Export CSV |
| GET | `/api/reports/clients/debts`, `/api/reports/expenses`, `/api/reports/cashflow` | Reportes |
| GET/PUT | `/api/settings/business-profile` | Datos del negocio |

## Despliegue a producción

1. **Base de datos:** usa un Postgres administrado (DigitalOcean Managed DB, RDS, Render Postgres, etc.).
2. **Backend:** construye la imagen (`docker build ./backend`) y despliégala en DigitalOcean App
   Platform, Render o AWS ECS/Elastic Beanstalk. Configura las variables de entorno del backend
   como secretos de la plataforma (nunca las subas al repo). El contenedor corre
   `prisma migrate deploy` automáticamente al iniciar.
3. **Frontend:** construye la imagen con `VITE_API_URL` apuntando a la URL pública del backend,
   o publica el contenido de `dist/` en un hosting estático (Netlify, Vercel, S3+CloudFront, etc.).
4. **CI/CD:** el workflow en `.github/workflows/ci.yml` corre lint, tests y build en cada push/PR.
   Puedes extenderlo para hacer `docker build` + push a un registry y desplegar automáticamente.

### Backups de la base de datos

```bash
# Backup
docker compose exec postgres pg_dump -U cafeshopping cafe_shopping > backup_$(date +%F).sql

# Restauración
cat backup_2026-01-01.sql | docker compose exec -T postgres psql -U cafeshopping cafe_shopping
```

Para producción, programa este comando diariamente (cron del servidor o snapshot administrado
del proveedor de base de datos) con una retención sugerida de 30 días, tal como pide la
especificación original.

## Checklist de aceptación (de la especificación original)

- [x] Crear venta y generar factura PNG (Puppeteer, screenshot directo del HTML).
- [x] Endpoint de envío por WhatsApp que registra `sent_whatsapp_at` y el resultado del agente `.ahk`.
- [x] Reporte semanal/mensual/anual agregado por período.
- [x] Autenticación JWT + roles; endpoints de configuración/reportes restringidos a ADMIN/CONTABILIDAD.
- [x] Backups documentados (ver arriba). Automatización real depende del proveedor elegido en producción.
- [ ] **Pendiente de validar en la PC real:** el flujo completo (cola → `.ahk` → WhatsApp Desktop)
      depende de que `send_whatsapp_agent.ahk` esté corriendo en una PC con Docker Desktop y
      WhatsApp Desktop abiertos — el código maneja tanto el éxito como el error/timeout, pero no
      se pudo ejercitar con una sesión real de WhatsApp en este entorno.

## Próximos pasos sugeridos

- Exportar reportes también a PDF (la infraestructura de Puppeteer ya existe en `render.service.ts`,
  solo falta un endpoint que reutilice `htmlToPdf` con una plantilla de reporte).
- Si se espera alto volumen, mover la cola de WhatsApp a algo más robusto que archivos en disco
  (ej. BullMQ + Redis), o correr varias instancias del agente `.ahk` en paralelo.
- Añadir tests e2e adicionales para el flujo completo de venta → factura → envío.
- Este repositorio es un punto de partida sólido pero no un producto terminado: para continuar
  iterando con contexto completo del código (correr la app, ver logs, iterar sobre errores reales),
  se recomienda **Claude Code** en vez de pedir cambios grandes por chat.

## Licencia

Uso privado / interno del negocio. Ajusta esta sección según corresponda.
