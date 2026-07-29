# instalar.ps1
#
# Instalador semi-automatico de Cafe Shopping para una PC nueva.
# Se corre UNA vez por PC, parado en la carpeta del proyecto (donde estan
# docker-compose.yml, este script, y send_whatsapp_agent.ahk).
#
# Automatiza:
#   - Verificar que Docker Desktop este instalado y corriendo
#   - Crear el .env (pide la carpeta de respaldos)
#   - Construir y levantar los contenedores
#   - Aplicar migraciones + datos de ejemplo (usuario admin)
#   - Copiar el agente de WhatsApp a la carpeta de Inicio de Windows y
#     arrancarlo (se autoconfigura solo: detecta el volumen de Docker y la
#     ruta de WhatsApp Desktop el mismo, sin importar el usuario de Windows
#     ni el nombre de la carpeta del proyecto)
#
# NO automatiza (hay que hacerlo a mano, una sola vez, antes de correr esto):
#   - Instalar Docker Desktop (y habilitar WSL2) - https://www.docker.com/products/docker-desktop/
#   - Instalar AutoHotkey v1.1 - https://www.autohotkey.com/download/ahk-install.exe
#   - Instalar y loguear WhatsApp Desktop
#   - Verificar en Docker Desktop > Settings > General que "Start Docker
#     Desktop when you log in" este activado (asi los contenedores
#     arrancan solos con la PC, gracias a "restart: unless-stopped")

$ErrorActionPreference = 'Stop'
$ProjectDir = $PSScriptRoot
Set-Location $ProjectDir

# Nombre fijo del proyecto de Docker Compose (containers/red/volumenes). Sin
# esto, Docker Compose lo infiere del nombre de la carpeta — si alguien la
# renombra o hay una carpeta duplicada ("cafe-shopping (1)"), terminaria
# creando un segundo set de contenedores en paralelo con el mismo puerto.
$env:COMPOSE_PROJECT_NAME = 'cafe-shopping'

function Write-Step($msg) { Write-Host ""; Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "!! $msg" -ForegroundColor Yellow }
function Write-Ok($msg)   { Write-Host "OK: $msg" -ForegroundColor Green }

# ---------- 1) Verificar Docker (y arrancar Docker Desktop si hace falta) ----------
Write-Step "Verificando Docker Desktop..."

function Test-DockerListo {
    $prevEap = $ErrorActionPreference
    $ErrorActionPreference = 'SilentlyContinue'
    docker info 2>&1 | Out-Null
    $ErrorActionPreference = $prevEap
    return ($LASTEXITCODE -eq 0)
}

if (-not (Test-DockerListo)) {
    $dockerDesktopExe = Join-Path $env:ProgramFiles "Docker\Docker\Docker Desktop.exe"
    if (-not (Test-Path $dockerDesktopExe)) {
        Write-Warn "Docker Desktop no esta instalado (o no lo encontre en '$dockerDesktopExe')."
        Write-Warn "Instalalo primero: https://www.docker.com/products/docker-desktop/"
        Write-Warn "Despues de instalarlo (y reiniciar si te lo pide), vuelve a correr este script."
        exit 1
    }

    Write-Warn "Docker Desktop no esta corriendo. Abriendolo..."
    Start-Process $dockerDesktopExe

    $listo = $false
    for ($i = 0; $i -lt 45; $i++) {
        Start-Sleep -Seconds 2
        Write-Host "." -NoNewline
        if (Test-DockerListo) { $listo = $true; break }
    }
    Write-Host ""

    if (-not $listo) {
        Write-Warn "Docker Desktop no respondio despues de un buen rato."
        Write-Warn "Abrelo manualmente, espera a que diga 'Docker Desktop is running' abajo a la izquierda, y vuelve a correr este script."
        exit 1
    }
}
docker compose version | Out-Null
Write-Ok "Docker responde correctamente."

# ---------- 2) Crear .env ----------
Write-Step "Configurando .env"
if (Test-Path ".env") {
    Write-Ok ".env ya existe, no lo toco (borralo primero si quieres reconfigurar desde cero)."
} else {
    $defaultBackupDir = Join-Path $env:USERPROFILE "OneDrive\Documentos\respaldos cafe shopping"
    $backupDir = Read-Host "Carpeta para los respaldos automaticos (Enter para usar '$defaultBackupDir')"
    if ([string]::IsNullOrWhiteSpace($backupDir)) { $backupDir = $defaultBackupDir }
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

    $envContent = Get-Content ".env.example" -Raw
    $envContent = $envContent -replace '(?m)^BACKUP_HOST_DIR=.*$', "BACKUP_HOST_DIR=$backupDir"
    Set-Content -Path ".env" -Value $envContent -NoNewline
    Write-Ok ".env creado. Respaldos en: $backupDir"
}

# ---------- 3) Construir y levantar contenedores ----------
Write-Step "Construyendo y levantando los contenedores (esto puede tardar varios minutos la primera vez)..."
docker compose up -d --build
if ($LASTEXITCODE -ne 0) {
    Write-Warn "docker compose up fallo. Revisa el mensaje de arriba."
    exit 1
}
Write-Ok "Contenedores arriba."

# ---------- 4) Esperar a que el backend responda ----------
Write-Step "Esperando a que el backend termine de arrancar (aplica migraciones automaticamente)..."
$backendReady = $false
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 3
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:3000/api/docs" -UseBasicParsing -TimeoutSec 3
        if ($resp.StatusCode -eq 200) { $backendReady = $true; break }
    } catch { }
}
if (-not $backendReady) {
    Write-Warn "El backend no respondio a tiempo. Sigo igual, pero revisa 'docker compose logs backend' si algo falla despues."
} else {
    Write-Ok "Backend respondiendo."
}

# ---------- 5) Datos de ejemplo (usuario admin) ----------
Write-Step "Creando usuario administrador de ejemplo (si no existe todavia)..."
docker compose exec -T backend npm run prisma:seed
Write-Ok "Usuario admin: admin@cafeshopping.com / cafe1234 (cambia la clave despues de entrar)."

# ---------- 6) Verificar AutoHotkey y WhatsApp Desktop ----------
$ahkInstalled = (Test-Path "$env:ProgramFiles\AutoHotkey\AutoHotkeyU64.exe") -or (Test-Path "${env:ProgramFiles(x86)}\AutoHotkey\AutoHotkeyU64.exe")
if (-not $ahkInstalled) {
    Write-Warn "No detecto AutoHotkey instalado. El agente de WhatsApp no va a poder correr sin esto."
    Write-Warn "Instalalo (gratis): https://www.autohotkey.com/download/ahk-install.exe"
}
$whatsappPath = Join-Path $env:LOCALAPPDATA "WhatsApp\WhatsApp.exe"
if (-not (Test-Path $whatsappPath)) {
    Write-Warn "No encontre WhatsApp Desktop instalado. Instalalo (Microsoft Store o whatsapp.com/download) e inicia sesion."
}

# ---------- 7) Copiar el agente a la carpeta de Inicio ----------
Write-Step "Instalando el agente de WhatsApp (send_whatsapp_agent.ahk)..."
$ahkSource = Join-Path $ProjectDir "send_whatsapp_agent.ahk"
if (-not (Test-Path $ahkSource)) {
    Write-Warn "No encontre send_whatsapp_agent.ahk en esta carpeta. Salto este paso."
} else {
    # Ya no hace falta editar nada dentro del .ahk: se autoconfigura solo
    # (detecta el volumen de Docker y la ruta de WhatsApp Desktop al arrancar).
    $startupDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Startup"
    $ahkDest = Join-Path $startupDir "send_whatsapp_agent.ahk"
    Copy-Item -Path $ahkSource -Destination $ahkDest -Force
    Write-Ok "Agente instalado en la carpeta de Inicio: $ahkDest"
    Write-Ok "Arrancara solo la proxima vez que inicies sesion en Windows."

    if ($ahkInstalled) {
        Write-Step "Iniciando el agente ahora mismo (no hace falta reiniciar la PC para probarlo)..."
        Start-Process $ahkDest
        Write-Ok "Agente iniciado. Revisa el icono en la bandeja del sistema."
    }
}

# ---------- 8) Resumen final ----------
Write-Step "Listo."
Write-Host ""
Write-Host "  App:            http://localhost:5173" -ForegroundColor White
Write-Host "  Usuario admin:  admin@cafeshopping.com / cafe1234" -ForegroundColor White
Write-Host ""
Write-Warn "Pendientes que SI hay que revisar a mano:"
Write-Warn "  1. Docker Desktop > Settings > General > 'Start Docker Desktop when you log in' (activado)."
Write-Warn "  2. Abre WhatsApp Desktop y deja la sesion iniciada."
Write-Warn "  3. Configuracion > Datos del negocio: pon el nombre/icono real de este negocio."
Write-Warn "  4. Cambia la clave del usuario admin despues de tu primer login."
Write-Warn "  5. Para el uso diario (levantar todo con un clic), usa iniciar_cafe_shopping.ahk."
