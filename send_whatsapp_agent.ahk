; send_whatsapp_agent.ahk
;
; Agente de escritorio que reemplaza a Twilio/S3 para el envio de facturas.
; Corre en segundo plano en la PC del negocio (donde esta abierto WhatsApp
; Desktop) y hace lo siguiente en bucle:
;
;   1) Revisa la carpeta whatsapp-queue/ dentro del volumen de Docker del
;      backend (el mismo que usa el backend para guardar los PNG de las
;      facturas). El backend deja ahi un archivo "<id>.job" cada vez que
;      alguien pide enviar una factura.
;   2) Por cada job encontrado: extrae el PNG de la factura, lo pega en el
;      chat de WhatsApp Desktop del telefono del cliente junto con el texto
;      de la factura (como pie de foto, un solo mensaje), y borra el job.
;   3) Escribe el resultado (OK o ERROR:motivo) en whatsapp-results/<id>.result
;      dentro del mismo volumen, para que el backend confirme el envio.
;
; Requisitos: Docker Desktop corriendo, WhatsApp Desktop instalado y con
; sesion iniciada, y este script corriendo (dejalo en la carpeta de inicio
; de Windows para que arranque solo con la PC).
;
; PORTABLE: este archivo NO tiene ninguna ruta con un nombre de usuario de
; Windows quemada, ni el nombre exacto de la carpeta del proyecto. Al
; arrancar, detecta solo:
;   - La ruta de WhatsApp Desktop, leyendo la variable de entorno
;     LOCALAPPDATA (que Windows define para cualquier usuario, sea cual sea
;     su nombre) en vez de escribir "C:\Users\<alguien>\..." a mano.
;   - El nombre real del volumen de Docker, buscando uno que termine en
;     "_backend_uploads" (Docker Compose nombra el volumen segun el nombre
;     de la carpeta del proyecto, que puede variar de una PC a otra).
; Por eso el mismo archivo sirve para instalarlo en cualquier PC sin editar
; nada a mano (ver instalar.ps1/instalar.bat, que ademas lo copia a la
; carpeta de Inicio de Windows).

#NoEnv
#SingleInstance Force
#Persistent
SendMode Input
SetWorkingDir %A_ScriptDir%
SetTitleMatchMode, 2

; ===== CONFIGURACION =====
LOCAL_DIR         := "C:\temp\whatsapp_send"
DOCKER_EXE        := "docker"
POLL_INTERVAL_MS  := 3000   ; cada cuanto revisa la cola
DOCKER_TIMEOUT_MS := 15000  ; maximo que se espera cualquier "docker run"
LOG_FILE          := LOCAL_DIR "\agent.log"
; ==========================

FileCreateDir, %LOCAL_DIR%

; ---- Detectar la ruta de WhatsApp Desktop (sin usuario quemado) ----
EnvGet, localAppData, LOCALAPPDATA
WHATSAPP_EXE_PATH := localAppData "\WhatsApp\WhatsApp.exe"
if !FileExist(WHATSAPP_EXE_PATH)
    LogLine("AVISO: no encontre WhatsApp Desktop en " WHATSAPP_EXE_PATH ". Instalalo (Microsoft Store o whatsapp.com/download) antes de mandar facturas.")

; ---- Detectar el volumen de Docker (sin nombre de carpeta quemado) ----
VOLUME_NAME := DetectVolumeName()
if (VOLUME_NAME = "") {
    ; Fallback por si Docker todavia no responde en este primer instante
    ; (por ejemplo si Windows recien arranco). El agente lo vuelve a
    ; intentar en cada ciclo de todos modos, asi que esto solo importa para
    ; el primer log — no bloquea el funcionamiento.
    VOLUME_NAME := "backend_uploads"
    LogLine("AVISO: no se pudo detectar el volumen de Docker todavia (Docker Desktop puede seguir arrancando). Reintentando cada ciclo.")
} else {
    LogLine("Volumen de Docker detectado: " VOLUME_NAME)
}

LogLine("=== Agente de WhatsApp iniciado. Vigilando " VOLUME_NAME " cada " POLL_INTERVAL_MS "ms (timeout docker: " DOCKER_TIMEOUT_MS "ms) ===")

; Icono de bandeja para saber que esta corriendo (click derecho > Exit para salir)
Menu, Tray, Tip, Agente WhatsApp Cafe Shopping (activo)

Loop
{
    ; Si el arranque no logro detectar el volumen (Docker no estaba listo
    ; todavia), lo reintenta aqui en cada ciclo hasta lograrlo.
    if (VOLUME_NAME = "backend_uploads") {
        redetected := DetectVolumeName()
        if (redetected != "") {
            VOLUME_NAME := redetected
            LogLine("Volumen de Docker detectado (reintento): " VOLUME_NAME)
        }
    }

    jobs := GetPendingJobs()
    if (jobs.Length() > 0)
        LogLine("Poll: " jobs.Length() " job(s) pendiente(s).")
    for index, jobName in jobs
    {
        LogLine("Procesando " jobName " ...")
        result := ProcessJob(jobName)
        if (result.ok)
            LogLine("OK -> " jobName)
        else
            LogLine("ERROR -> " jobName ": " result.errMsg)
    }
    Sleep, %POLL_INTERVAL_MS%
}
Return

; ============================================================
; Corre un comando via cmd.exe con un limite de tiempo real.
; ============================================================
RunWithTimeout(cmdLine, timeoutMs, outFile := "") {
    fullCmd := cmdLine
    if (outFile != "")
        fullCmd := cmdLine " > """ outFile """ 2>&1"

    Run, %ComSpec% /c %fullCmd%, , Hide, pid
    if !pid
        return {timedOut: false, launchFailed: true}

    startTime := A_TickCount
    Loop
    {
        Process, Exist, %pid%
        if !ErrorLevel
            return {timedOut: false, launchFailed: false}
        if (A_TickCount - startTime > timeoutMs) {
            Process, Close, %pid%
            return {timedOut: true, launchFailed: false}
        }
        Sleep, 150
    }
}

; ============================================================
; Busca el volumen de Docker donde el backend deja los pedidos de envio.
;
; IMPORTANTE: antes esto solo buscaba un volumen que TERMINARA en
; "_backend_uploads". Eso fallaba silenciosamente cuando existia mas de uno
; (por ejemplo, si el proyecto se corrio alguna vez desde una carpeta con
; otro nombre, quedaba "<otra-carpeta>_backend_uploads" ademas del real).
; El agente elegia el primero de la lista — que podia ser el viejo — y se
; quedaba vigilando una cola vacia para siempre: el backend encolaba las
; facturas en un volumen y el agente miraba otro. Desde afuera parecia que
; "el agente dejo de llamarse", sin ningun error visible.
;
; Ahora se resuelve en 3 pasos, del mas confiable al mas general:
;   1) Se le pregunta al contenedor del backend que esta CORRIENDO cual
;      volumen tiene montado en /app/uploads. Es la fuente de la verdad:
;      es literalmente donde el backend escribe.
;   2) Si no se puede, se prefiere "cafe-shopping_backend_uploads" (el
;      nombre que fuerza la app de escritorio con COMPOSE_PROJECT_NAME).
;   3) Como ultimo recurso, el comportamiento viejo por sufijo.
; ============================================================
DetectVolumeName() {
    global LOCAL_DIR, DOCKER_EXE, DOCKER_TIMEOUT_MS

    ; --- 1) Preguntarle al contenedor del backend que esta corriendo ---
    nameFile := LOCAL_DIR "\_backend_container.txt"
    FileDelete, %nameFile%
    psCmd := DOCKER_EXE " ps --filter ""label=com.docker.compose.service=backend"" --format ""{{.Names}}"""
    run := RunWithTimeout(psCmd, DOCKER_TIMEOUT_MS, nameFile)
    if (!run.timedOut && !run.launchFailed && FileExist(nameFile)) {
        FileRead, psOut, %nameFile%
        containerName := ""
        Loop, Parse, psOut, `n, `r
        {
            candidate := RegExReplace(A_LoopField, "^\s+|\s+$", "")
            if (candidate != "" && !InStr(candidate, " ")) {
                containerName := candidate
                break
            }
        }

        if (containerName != "") {
            mountsFile := LOCAL_DIR "\_backend_mounts.txt"
            FileDelete, %mountsFile%
            inspectCmd := DOCKER_EXE " inspect --format ""{{range .Mounts}}{{.Name}}:{{.Destination}} {{end}}"" " containerName
            run2 := RunWithTimeout(inspectCmd, DOCKER_TIMEOUT_MS, mountsFile)
            if (!run2.timedOut && !run2.launchFailed && FileExist(mountsFile)) {
                FileRead, mounts, %mountsFile%
                ; Busca el volumen montado exactamente en /app/uploads
                if (RegExMatch(mounts, "([^\s:]+):/app/uploads(\s|$)", m)) {
                    if (m1 != "")
                        return m1
                }
            }
        }
    }

    ; --- 2 y 3) Listar volumenes: preferir el nombre esperado, si no por sufijo ---
    listFile := LOCAL_DIR "\_volume_list.txt"
    FileDelete, %listFile%
    cmd := DOCKER_EXE " volume ls --format ""{{.Name}}"""

    run3 := RunWithTimeout(cmd, DOCKER_TIMEOUT_MS, listFile)
    if (run3.timedOut || run3.launchFailed)
        return ""
    if !FileExist(listFile)
        return ""

    FileRead, content, %listFile%
    porSufijo := ""
    Loop, Parse, content, `n, `r
    {
        line := RegExReplace(A_LoopField, "^\s+|\s+$", "")
        if (line = "")
            continue
        if (line = "cafe-shopping_backend_uploads")
            return line
        if (porSufijo = "" && RegExMatch(line, "i)_backend_uploads$"))
            porSufijo := line
    }
    return porSufijo
}

; ============================================================
; Devuelve un array con los nombres de archivo *.job pendientes
; ============================================================
GetPendingJobs() {
    global VOLUME_NAME, DOCKER_EXE, LOCAL_DIR, DOCKER_TIMEOUT_MS
    listFile := LOCAL_DIR "\_queue_list.txt"
    FileDelete, %listFile%
    cmd := DOCKER_EXE " run --rm -v " VOLUME_NAME ":/data busybox sh -c ""mkdir -p /data/whatsapp-queue /data/whatsapp-results && ls /data/whatsapp-queue"""

    run := RunWithTimeout(cmd, DOCKER_TIMEOUT_MS, listFile)
    jobs := []
    if (run.timedOut) {
        LogLine("TIMEOUT: 'docker run ls whatsapp-queue' no respondio en " DOCKER_TIMEOUT_MS "ms.")
        return jobs
    }
    if (run.launchFailed) {
        LogLine("ERROR: no se pudo lanzar el comando docker.")
        return jobs
    }
    if !FileExist(listFile)
        return jobs

    FileRead, content, %listFile%
    Loop, Parse, content, `n, `r
    {
        ; Limpieza extrema: elimina espacios y caracteres de control alrededor
        line := RegExReplace(A_LoopField, "^\s+|\s+$", "")
        
        if (line = "")
            continue
        
        ; MATCH ROBUSTO: Usa RegEx para validar si termina en .job ignorando la basura invisible
        if RegExMatch(line, "i)\.job$")
            jobs.Push(line)
        else
            LogLine("Docker devolvio una linea rara al listar la cola: [" line "]")
    }
    return jobs
}

; ============================================================
; Procesa un job: extrae PNG, envia por WhatsApp Desktop...
; ============================================================
ProcessJob(jobName) {
    global VOLUME_NAME, DOCKER_EXE, LOCAL_DIR, WHATSAPP_EXE_PATH, DOCKER_TIMEOUT_MS

    jobId := SubStr(jobName, 1, StrLen(jobName) - 4) ; quita ".job"

    ; --- 1) Leer el contenido del job ---
    jobLocalPath := LOCAL_DIR "\" jobName
    FileDelete, %jobLocalPath%
    catCmd := DOCKER_EXE " run --rm -v " VOLUME_NAME ":/data busybox sh -c ""cat /data/whatsapp-queue/" jobName """"
    LogLine("  [1/7] Leyendo job desde el volumen...")
    run := RunWithTimeout(catCmd, DOCKER_TIMEOUT_MS, jobLocalPath)
    if (run.timedOut)
        return {ok: false, errMsg: "TIMEOUT leyendo el job desde Docker."}

    if !FileExist(jobLocalPath)
        return {ok: false, errMsg: "No se pudo leer el job desde el volumen."}

    FileRead, jobContent, %jobLocalPath%
    parsed := ParseJob(jobContent)
    if (parsed.phone = "" || parsed.filename = "") {
        LogLine("  Job invalido (falta telefono o archivo).")
        rmCmd0 := DOCKER_EXE " run --rm -v " VOLUME_NAME ":/data busybox sh -c ""rm -f /data/whatsapp-queue/" jobName """"
        RunWithTimeout(rmCmd0, DOCKER_TIMEOUT_MS)
        result := {ok: false, errMsg: "Job invalido."}
        PushResult(jobId, result)
        return result
    }

    ; --- 2) Sacar el job de la cola YA ---
    LogLine("  [2/7] Quitando job de la cola...")
    rmCmd := DOCKER_EXE " run --rm -v " VOLUME_NAME ":/data busybox sh -c ""rm -f /data/whatsapp-queue/" jobName """"
    run := RunWithTimeout(rmCmd, DOCKER_TIMEOUT_MS)
    if (run.timedOut)
        LogLine("  AVISO: el 'rm' del job dio timeout.")

    ; --- 3) Extraer el PNG de la factura ---
    LogLine("  [3/7] Extrayendo PNG " parsed.filename " ...")
    pngLocalPath := LOCAL_DIR "\" parsed.filename
    FileDelete, %pngLocalPath%
    extractCmd := DOCKER_EXE " run --rm -v " VOLUME_NAME ":/data -v """ LOCAL_DIR """:/backup busybox sh -c ""cp /data/invoices/" parsed.filename " /backup/"""
    run := RunWithTimeout(extractCmd, DOCKER_TIMEOUT_MS)
    if (run.timedOut) {
        result := {ok: false, errMsg: "TIMEOUT extrayendo PNG."}
        PushResult(jobId, result)
        return result
    }

    if !FileExist(pngLocalPath) {
        result := {ok: false, errMsg: "No se pudo extraer el PNG del volumen."}
        PushResult(jobId, result)
        return result
    }

    ; --- 4) Cargar la imagen real al portapapeles ---
    LogLine("  [4/7] Copiando imagen al portapapeles...")
    psCmd := "powershell.exe -NoProfile -Command ""Set-Clipboard -Path '" pngLocalPath "'"""
    run := RunWithTimeout(psCmd, DOCKER_TIMEOUT_MS)
    if (run.timedOut) {
        result := {ok: false, errMsg: "TIMEOUT copiando imagen al portapapeles."}
        PushResult(jobId, result)
        return result
    }
    Sleep, 400

    ; --- 5) Asegurar que WhatsApp Desktop este activo ---
    LogLine("  [5/7] Activando WhatsApp Desktop...")
    IfWinNotExist, ahk_exe WhatsApp.Root.exe
    {
        Run, whatsapp:
        WinWait, ahk_exe WhatsApp.Root.exe, , 10
    }
    IfWinNotExist, WhatsApp
    {
        Run, %WHATSAPP_EXE_PATH%
        WinWait, WhatsApp, , 10
    }

    WinActivate, WhatsApp
    WinWaitActive, WhatsApp, , 5
    if ErrorLevel {
        result := {ok: false, errMsg: "No se pudo activar WhatsApp."}
        PushResult(jobId, result)
        return result
    }

    ; --- 6) Buscar el chat por telefono ---
    LogLine("  [6/7] Buscando chat de " parsed.phone " ...")
    searchDigits := RegExReplace(parsed.phone, "[^0-9]", "")
    Send, ^f
    Sleep, 1000
    SendRaw, %searchDigits%
    Sleep, 1000
    Send, {Enter}
    Sleep, 1000

    ; --- 7) Pegar la imagen y escribir el texto ---
    LogLine("  [7/7] Pegando imagen y enviando...")
    Send, ^v
    Sleep, 3000

    caption := StrReplace(parsed.message, "`n", " ")
    caption := StrReplace(caption, "`r", "")
    SendRaw, %caption%
    Sleep, 600
    Send, {Enter}
    Sleep, 1200

    result := {ok: true, errMsg: ""}
    PushResult(jobId, result)
    return result
}

; ============================================================
; Parsea el contenido de un .job
; ============================================================
ParseJob(content) {
    phone := ""
    filename := ""
    messageLines := []
    inMessage := false

    Loop, Parse, content, `n, `r
    {
        line := A_LoopField
        if (!inMessage && SubStr(line, 1, 6) = "phone=") {
            phone := SubStr(line, 7)
        } else if (!inMessage && SubStr(line, 1, 9) = "filename=") {
            filename := SubStr(line, 10)
        } else if (SubStr(line, 1, 8) = "message=") {
            inMessage := true
            messageLines.Push(SubStr(line, 9))
        } else if (inMessage) {
            messageLines.Push(line)
        }
    }

    message := ""
    for i, l in messageLines
        message .= (i = 1 ? "" : "`n") . l

    return {phone: Trim(phone), filename: Trim(filename), message: message}
}

; ============================================================
; Escribe el resultado localmente y lo copia de vuelta
; ============================================================
PushResult(jobId, result) {
    global VOLUME_NAME, DOCKER_EXE, LOCAL_DIR, DOCKER_TIMEOUT_MS

    resultFileName := jobId ".result"
    resultLocalPath := LOCAL_DIR "\" resultFileName
    FileDelete, %resultLocalPath%

    text := result.ok ? "OK" : "ERROR:" result.errMsg
    FileAppend, %text%, %resultLocalPath%

    pushCmd := DOCKER_EXE " run --rm -v " VOLUME_NAME ":/data -v """ LOCAL_DIR """:/backup busybox sh -c ""mkdir -p /data/whatsapp-results && cp /backup/" resultFileName " /data/whatsapp-results/"""
    run := RunWithTimeout(pushCmd, DOCKER_TIMEOUT_MS)
    if (run.timedOut)
        LogLine("  AVISO: TIMEOUT subiendo el resultado de " jobId " al volumen.")
}

; ============================================================
; Log simple a archivo
; ============================================================
LogLine(msg) {
    global LOG_FILE
    FormatTime, ts,, yyyy-MM-dd HH:mm:ss
    FileAppend, [%ts%] %msg%`n, %LOG_FILE%
}