; iniciar_cafe_shopping.ahk
;
; Lanzador de un clic para Cafe Shopping. Hace, en orden:
;   1) Verifica que Docker Desktop este corriendo (lo abre si hace falta y
;      espera a que el motor de Docker responda).
;   2) Levanta los contenedores (docker compose up -d).
;   3) Espera a que el frontend responda en el navegador.
;   4) Inicia el agente de WhatsApp (send_whatsapp_agent.ahk).
;   5) Abre Cafe Shopping en el navegador.
;
; Este script asume que vive en la RAIZ del proyecto, junto a
; docker-compose.yml y send_whatsapp_agent.ahk (no hace falta editar rutas).
;
; Para usarlo con un clic: crea un acceso directo a este archivo (o a su
; version compilada .exe, ver instrucciones al final) en el Escritorio o en
; la carpeta de Inicio de Windows.

#NoEnv
#SingleInstance Force
SendMode Input
SetWorkingDir %A_ScriptDir%
SetTitleMatchMode, 2

; ===== CONFIGURACION =====
PROJECT_DIR      := A_ScriptDir  ; carpeta donde esta este script (= raiz del proyecto)
FRONTEND_URL     := "http://localhost:5173"
FRONTEND_PORT    := 5173
AGENT_SCRIPT     := PROJECT_DIR "\send_whatsapp_agent.ahk"
MAX_WAIT_DOCKER_MS   := 90000  ; cuanto esperar a que Docker Desktop arranque
MAX_WAIT_FRONTEND_MS := 60000  ; cuanto esperar a que el frontend responda
POLL_MS              := 2000
; ==========================

Q := Chr(34)
EnvGet, ProgramFilesDir, ProgramFiles
DOCKER_DESKTOP_EXE := ProgramFilesDir "\Docker\Docker\Docker Desktop.exe"

; ---------------------------------------------------------------
; Ventana de estado simple (se actualiza con SetStatus())
; ---------------------------------------------------------------
Gui, +AlwaysOnTop -SysMenu +ToolWindow
Gui, Font, s10, Segoe UI
Gui, Add, Text, w380 h40 vStatusText Center, Iniciando Cafe Shopping...
Gui, Show, w420 h100, Cafe Shopping
SetStatus("Verificando Docker Desktop...")

; ---------------------------------------------------------------
; 1) Verificar / arrancar Docker Desktop
; ---------------------------------------------------------------
if !DockerListo() {
    if FileExist(DOCKER_DESKTOP_EXE) {
        Run, %DOCKER_DESKTOP_EXE%
    } else {
        Gui, Destroy
        MsgBox, 48, Cafe Shopping, No se encontro Docker Desktop en:`n%DOCKER_DESKTOP_EXE%`n`nAbrelo manualmente y vuelve a correr este acceso directo.
        ExitApp
    }

    elapsed := 0
    Loop {
        SetStatus("Esperando a que Docker Desktop inicie... (" Round(elapsed/1000) "s)")
        if DockerListo()
            break
        Sleep, %POLL_MS%
        elapsed += POLL_MS
        if (elapsed >= MAX_WAIT_DOCKER_MS) {
            Gui, Destroy
            MsgBox, 48, Cafe Shopping, Docker Desktop no respondio a tiempo.`nAbrelo manualmente, espera a que diga "Docker Desktop is running" y vuelve a intentar.
            ExitApp
        }
    }
}

; ---------------------------------------------------------------
; 2) Levantar los contenedores
; ---------------------------------------------------------------
SetStatus("Iniciando los contenedores (docker compose up -d)...")
; COMPOSE_PROJECT_NAME fijo: mismo nombre que usa instalar.ps1, para que
; siempre reuse los mismos contenedores/volumenes en vez de crear otros.
RunWait, %ComSpec% /c set COMPOSE_PROJECT_NAME=cafe-shopping && docker compose up -d, %PROJECT_DIR%, Hide
if ErrorLevel {
    Gui, Destroy
    MsgBox, 48, Cafe Shopping, docker compose up -d fallo (codigo %ErrorLevel%).`nAbre una terminal en la carpeta del proyecto y corre "docker compose up" sin -d para ver el error completo.
    ExitApp
}

; ---------------------------------------------------------------
; 3) Esperar a que el frontend responda
; ---------------------------------------------------------------
SetStatus("Esperando a que la app este lista...")
elapsed := 0
Loop {
    if PuertoAbierto(FRONTEND_PORT)
        break
    Sleep, %POLL_MS%
    elapsed += POLL_MS
    if (elapsed >= MAX_WAIT_FRONTEND_MS)
        break  ; seguimos igual: puede que solo este tardando, abrimos el navegador de todos modos
}

; ---------------------------------------------------------------
; 4) Iniciar el agente de WhatsApp
; ---------------------------------------------------------------
SetStatus("Iniciando el agente de WhatsApp...")
agentExe := PROJECT_DIR "\send_whatsapp_agent.exe"
if FileExist(agentExe)
    Run, %agentExe%
else if FileExist(AGENT_SCRIPT)
    Run, %AGENT_SCRIPT%
else
    MsgBox, 48, Cafe Shopping, No se encontro send_whatsapp_agent.ahk/.exe junto a este lanzador. El envio por WhatsApp no va a funcionar hasta que lo agregues.

; ---------------------------------------------------------------
; 5) Abrir el navegador
; ---------------------------------------------------------------
SetStatus("Abriendo Cafe Shopping...")
Sleep, 500
Run, %FRONTEND_URL%

SetStatus("Listo!")
Sleep, 900
Gui, Destroy
ExitApp

; ============================================================
; Actualiza el texto de la ventana de estado
; ============================================================
SetStatus(msg) {
    GuiControl,, StatusText, %msg%
}

; ============================================================
; true si "docker info" responde (el motor de Docker esta arriba)
; ============================================================
DockerListo() {
    RunWait, %ComSpec% /c docker info > NUL 2>&1, , Hide
    return (ErrorLevel = 0)
}

; ============================================================
; true si se puede abrir una conexion TCP a localhost:puerto
; ============================================================
PuertoAbierto(port) {
    global Q
    tempFile := A_Temp "\_cafe_shopping_port_check.txt"
    FileDelete, %tempFile%
    psCmd := "powershell.exe -NoProfile -Command " Q "$c=New-Object Net.Sockets.TcpClient; try { $c.Connect('localhost'," port "); 'OK' } catch { 'NO' } finally { $c.Close() }" Q
    RunWait, %ComSpec% /c %psCmd% > "%tempFile%" 2>&1, , Hide
    if !FileExist(tempFile)
        return false
    FileRead, result, %tempFile%
    return (Trim(result) = "OK")
}

GuiClose:
    ExitApp
return
