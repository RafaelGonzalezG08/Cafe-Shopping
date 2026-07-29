# ---------- Etapa: dependencias + generación de Prisma Client ----------
FROM node:20-slim AS deps
WORKDIR /app
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate

# ---------- Etapa: build de TypeScript ----------
FROM deps AS build
WORKDIR /app
COPY . .
RUN npm run build

# ---------- Etapa: runtime ----------
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Chromium del sistema en vez del binario que descarga Puppeteer: imagen mas
# liviana y evita depender de una descarga externa grande en cada build.
# postgresql-client (pg_dump) y tar se usan para el respaldo automatico.
#
# IMPORTANTE: instalamos postgresql-client-16 especificamente (repositorio
# oficial de PostgreSQL/PGDG), no el "postgresql-client" generico de Debian
# (que trae la 15). pg_dump se niega a respaldar un servidor MAS NUEVO que
# el propio pg_dump, y docker-compose.yml usa postgres:16-alpine — si esto
# alguna vez se actualiza a otra version mayor de Postgres, hay que cambiar
# el "16" de las 2 lineas de abajo para que coincida.
RUN apt-get update \
  && apt-get install -y --no-install-recommends chromium ca-certificates fonts-liberation dumb-init tar curl gnupg \
  && curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /usr/share/keyrings/postgresql.gpg \
  && echo "deb [signed-by=/usr/share/keyrings/postgresql.gpg] http://apt.postgresql.org/pub/repos/apt $(. /etc/os-release && echo $VERSION_CODENAME)-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends postgresql-client-16 \
  && apt-get purge -y curl gnupg \
  && apt-get autoremove -y \
  && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

RUN mkdir -p /app/uploads /app/backups

EXPOSE 3000

# Aplica migraciones pendientes y arranca. Usa dumb-init para manejar señales
# correctamente (Ctrl+C / docker stop) dentro del contenedor.
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
