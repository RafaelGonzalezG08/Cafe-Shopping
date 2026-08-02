# Version nativa (sin Docker)

Esta rama (`version-nativa`) es la misma aplicacion, pero corriendo como un
programa de Windows normal: **no necesita Docker Desktop, ni PostgreSQL, ni
nginx, ni contenedores**. La version con Docker sigue intacta en `main`.

| | Con Docker (`main`) | Nativa (`version-nativa`) |
|---|---|---|
| Base de datos | PostgreSQL en contenedor | SQLite (un archivo) |
| Arranque | 80–174 segundos | ~5 segundos |
| Facturas PNG | Puppeteer (+300 MB de Chromium) | El propio Chromium de Electron |
| WhatsApp | 5 `docker run` por factura | Lectura directa de archivos |
| Requisitos | Docker Desktop | Ninguno |

---

## Como abrir la aplicacion

### Uso normal (cuando ya este instalada)

Doble clic en el acceso directo **Cafe Shopping** del escritorio. Eso es todo:
la app levanta sola su base de datos, el servicio interno y el agente de
WhatsApp.

### Probarla ahora, sin instalar

```bash
cd desktop
npx electron .
```

Antes hace falta compilar backend y frontend una vez:

```bash
cd backend && npm install && npx prisma generate && npm run build
cd ../frontend && npm install && npm run build
```

> El frontend debe compilarse apuntando al backend nativo:
> `VITE_API_URL=http://localhost:3010/api npm run build`

### Generar el instalador

```bash
cd desktop
npm run dist
```

El `.exe` queda en `desktop/dist/`.

---

## Usuarios

Tras sembrar los datos de ejemplo (`node prisma/dist/seed.js`), la clave de
los tres usuarios es `cafe1234`:

- `admin@cafeshopping.com` — ADMIN
- `cajero@cafeshopping.com` — CAJERO
- `contabilidad@cafeshopping.com` — CONTABILIDAD

---

## Donde viven los datos

Todo en `%APPDATA%\cafe-shopping-desktop\datos\`:

```
cafe-shopping.db      la base de datos completa
uploads/              fotos de productos, facturas PNG, cola de WhatsApp
backups/              respaldos automaticos
.jwt-secret           clave de sesion (unica por instalacion)
```

Esta **fuera** de la carpeta del programa a proposito: el instalador reemplaza
esa carpeta en cada actualizacion y se llevaria por delante fotos y facturas.

Para respaldar todo a mano, basta copiar esa carpeta. Ademas la app copia sola
los respaldos a `OneDrive\CafeShopping\Respaldos`.

---

## Traer los datos de la version con Docker

Con los contenedores de la version vieja encendidos:

```bash
cd backend
npx prisma generate --schema prisma/schema-origen-postgres.prisma
node prisma/migrar-desde-postgres.js
```

Copia clientes, productos, ventas, facturas, deudas y auditoria conservando
los ids, y al terminar compara el total vendido de ambas bases. Solo lee de
Postgres, y se puede repetir sin duplicar nada.

---

## Agente de WhatsApp

Mismo funcionamiento, pero ahora lee la cola directo del disco. Debe estar
corriendo `send_whatsapp_agent.exe` (la app lo abre sola al iniciar) con
WhatsApp Desktop abierto y con sesion iniciada.

Registro de actividad: `C:\temp\whatsapp_send\agent.log`

---

## Detalles tecnicos que conviene recordar

- **SQLite no soporta enums, `Json` ni `@db.Decimal`.** Los enums viven en
  `backend/src/common/enums.ts` como constantes que se usan igual
  (`Role.ADMIN`); `audit_logs.changes` guarda JSON serializado. El `Decimal`
  simple si es exacto con dinero (verificado: `0.10 + 0.20 = 0.30`).
- **Las migraciones se aplican solas al arrancar** (`MigrationsService`),
  leyendo los `.sql` — no hace falta el CLI de Prisma en la PC del cliente.
  Usa la misma tabla `_prisma_migrations` que Prisma.
- **Puertos 3010 (backend) y 5183 (interfaz)**, distintos a los de la version
  con Docker (3000/5173) para que ambas puedan convivir mientras se prueba.
- **`bcryptjs` en vez de `bcrypt`**: el original es nativo y exige compilarse
  con herramientas de C++, algo que falla en una PC sin ellas.
