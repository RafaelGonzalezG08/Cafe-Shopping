/**
 * Plantilla del catalogo web.
 *
 * Es un sitio ESTATICO a proposito: un solo HTML con sus fotos al lado, sin
 * servidor ni base de datos. Se puede subir a cualquier hosting gratuito, no
 * cuesta mensualidad, no hay nada que mantener y no hay nada que hackear
 * (no existe backend ni datos de clientes en linea).
 *
 * El pedido no se procesa aqui: el carrito arma un mensaje y lo abre en
 * WhatsApp del negocio. Asi el cobro se coordina por el mismo canal que el
 * negocio ya usa, sin pasarela de pago ni comisiones.
 */

export interface ProductoCatalogo {
  sku: string;
  nombre: string;
  precio: number;
  imagen: string | null;
  /** Ya traducido para mostrar ("Plata", "Oro"...), ver catalogo.service.ts. */
  material: string;
  /** Nombre de la categoria (Anillo, Collar...), o null si la pieza no tiene una asignada. */
  categoria: string | null;
  /** Tallas / medidas que ofrece la pieza. Vacio = la pieza no maneja tallas. */
  tallas: string[];
}

export interface DatosCatalogo {
  negocio: string;
  descripcion: string;
  direccion: string;
  telefonoWhatsapp: string;
  logo: string | null;
  productos: ProductoCatalogo[];
  generado: string;
  /**
   * Direccion del relevo en la nube (ver /cloud-relay), si el negocio lo
   * configuro. Si falta, el pedido sigue funcionando igual - solo se manda
   * por WhatsApp y hay que pegarlo a mano en la app, como siempre.
   */
  relevoUrl?: string;
}

/** Escapa texto que entra al HTML, para que un nombre con < o & no rompa la pagina. */
function esc(valor: string): string {
  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function generarHtml(datos: DatosCatalogo): string {
  // Los datos van embebidos como JSON en vez de generar una tarjeta por
  // producto en el HTML: asi el carrito puede recalcular totales en el
  // navegador sin pedir nada al servidor (no hay servidor).
  const json = JSON.stringify(datos).replace(/</g, '\\u003c');

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(datos.negocio)}</title>
<meta name="description" content="${esc(datos.descripcion || datos.negocio)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,400&family=Instrument+Sans:wght@400;500;600&display=swap">
<!-- GSAP + ScrollTrigger para el revelado de las piezas al hacer scroll. Si el
     CDN no responde (hosting sin internet, bloqueo), todo el JS de abajo lo
     comprueba con "if (window.gsap)" y la pagina funciona igual, sin animacion. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<style>
  /* ============================================================
     Catalogo web — vidrio esmerilado sobre ciruela oscura, con oro
     y tipografia editorial (Fraunces). Mismo diseno que el mockup
     aprobado. Un solo mundo visual, sin modo claro: el glassmorfismo
     necesita color detras del vidrio.
     ============================================================ */
  :root{
    --tinta:#F7EDE9; --suave:#C9B0AC; --linea:rgba(255,255,255,.16);
    --fondo:#1B1315; --acento:#E57D90; --acento-osc:#F0A7B5;
    --rose-soft:#F99AAA; --gold:#E6B25E; --gold-osc:#C9902F;
    --glass-a:rgba(255,255,255,.10); --glass-b:rgba(255,255,255,.035);
    --verde:#1FA971;
    color-scheme:dark;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  /* Nada de la pagina se puede seleccionar/copiar salvo los nombres de las
     piezas (mas abajo se re-habilita en .nombre). Disuade la copia casual del
     catalogo; no frena devtools ni capturas de pantalla. */
  body{
    background:
      radial-gradient(58% 48% at 14% 8%, rgba(229,125,144,.36), transparent 62%),
      radial-gradient(48% 42% at 88% 12%, rgba(230,178,94,.28), transparent 60%),
      radial-gradient(62% 55% at 80% 90%, rgba(125,90,104,.42), transparent 62%),
      radial-gradient(46% 40% at 10% 94%, rgba(229,125,144,.20), transparent 60%),
      var(--fondo);
    background-attachment:fixed;
    color:var(--tinta);
    font-family:'Instrument Sans','Segoe UI',system-ui,-apple-system,sans-serif;
    line-height:1.6;-webkit-font-smoothing:antialiased;
    -webkit-user-select:none;user-select:none;overflow-x:hidden}
  .pieza .nombre,.visor .info .nombre{-webkit-user-select:text;user-select:text}
  img{max-width:100%;display:block}
  h1,h2,.pieza .nombre,.pieza .precio,.visor .info .nombre,.visor .info .precio,
  .modal h2,.pedido .total{font-family:'Fraunces','Georgia',serif}
  :focus-visible{outline:2px solid var(--gold);outline-offset:2px;border-radius:6px}

  /* Orbes de fondo: GSAP los hace flotar (si no carga, quedan como halos fijos). */
  .orbs{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
  .orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.5}
  .orb.a{width:min(60vw,420px);height:min(60vw,420px);background:var(--acento);top:-90px;left:-70px}
  .orb.b{width:min(55vw,360px);height:min(55vw,360px);background:var(--gold);bottom:-120px;right:-90px}
  header,.barra,.panel-filtros,main,footer{position:relative;z-index:1}

  header{background:transparent;color:var(--tinta);padding:3.25rem 1.25rem 2rem;text-align:center}
  header img{width:74px;height:74px;border-radius:18px;object-fit:cover;margin:0 auto 1.1rem;
    box-shadow:0 16px 40px -14px rgba(0,0,0,.6)}
  header h1{font-size:clamp(2rem,5.5vw,3rem);font-weight:300;letter-spacing:-.015em;text-wrap:balance}
  /* La frase del negocio, en cursiva serif dorada: el toque editorial del mockup. */
  header .frase{font-family:'Fraunces','Georgia',serif;font-style:italic;font-weight:300;
    font-size:clamp(1.15rem,2.6vw,1.5rem);color:var(--gold);margin-top:.65rem;line-height:1.3}
  header p:not(.frase){color:var(--suave);margin-top:.5rem;font-size:.86rem;letter-spacing:.02em}

  .barra{position:sticky;top:0;z-index:20;
    background:linear-gradient(150deg,rgba(255,255,255,.10),rgba(255,255,255,.04));
    -webkit-backdrop-filter:blur(20px) saturate(150%);backdrop-filter:blur(20px) saturate(150%);
    border-bottom:1px solid var(--linea);padding:.75rem 1.25rem;
    display:flex;gap:.6rem;align-items:center}
  .barra input{flex:1;min-width:0;padding:.62rem .95rem;border:1px solid var(--linea);
    border-radius:999px;font:inherit;font-size:.95rem;outline:none;color:var(--tinta);
    background:rgba(255,255,255,.06)}
  .barra input::placeholder{color:var(--suave)}
  .barra input:focus{border-color:var(--acento)}
  .btn-filtros{position:relative;display:flex;align-items:center;gap:.4rem;
    padding:.62rem 1rem;border:1px solid var(--linea);border-radius:999px;
    background:rgba(255,255,255,.06);color:var(--tinta);font:inherit;font-size:.78rem;
    font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;white-space:nowrap;
    -webkit-user-select:none;user-select:none}
  .btn-filtros.activo{border-color:var(--acento);color:var(--acento-osc)}
  .btn-filtros .punto{position:absolute;top:-4px;right:-4px;width:9px;height:9px;
    border-radius:50%;background:var(--acento)}

  /* Panel de filtros: material y categoria (chips que solo muestran lo que existe
     en el inventario) y rango de precio con inputs de numero. */
  .panel-filtros{max-width:1120px;margin:0 auto;padding:0 1.25rem;overflow:hidden;
    max-height:0;transition:max-height .25s ease}
  .panel-filtros.abierto{max-height:520px}
  .panel-filtros .contenido{padding:1.1rem 0;border-bottom:1px solid var(--linea)}
  .panel-filtros h3{font-size:.64rem;text-transform:uppercase;letter-spacing:.18em;
    color:var(--suave);font-weight:600;margin-bottom:.6rem}
  .chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.1rem}
  .chip{padding:.42rem .9rem;border-radius:999px;border:1px solid var(--linea);
    background:rgba(255,255,255,.06);font:inherit;font-size:.8rem;font-weight:500;
    color:var(--suave);cursor:pointer;transition:background .16s,color .16s,border-color .16s}
  .chip:hover{color:var(--tinta)}
  .chip.activo{background:linear-gradient(135deg,var(--rose-soft),var(--acento));
    border-color:transparent;color:#1B1315;font-weight:600}
  .rango-precio{display:flex;align-items:center;gap:.6rem;margin-bottom:.9rem}
  .rango-precio input{width:100%;padding:.55rem .8rem;border:1px solid var(--linea);
    border-radius:999px;font:inherit;font-size:.9rem;outline:none;color:var(--tinta);
    background:rgba(255,255,255,.06)}
  .rango-precio input::placeholder{color:var(--suave)}
  .rango-precio input:focus{border-color:var(--acento)}
  .rango-precio span{color:var(--suave);font-size:.85rem}
  .limpiar-filtros{background:none;border:0;color:var(--gold);font:inherit;font-size:.78rem;
    font-weight:600;letter-spacing:.04em;cursor:pointer;padding:0}

  main{max-width:1120px;margin:0 auto;padding:1.75rem 1.25rem 7rem}
  .contador{color:var(--suave);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;
    margin-bottom:1rem}
  .rejilla{display:grid;gap:1.1rem;grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}

  .pieza{border-radius:20px;overflow:hidden;display:flex;flex-direction:column;
    background:linear-gradient(150deg,var(--glass-a),var(--glass-b));
    -webkit-backdrop-filter:blur(18px) saturate(150%);backdrop-filter:blur(18px) saturate(150%);
    border:1px solid var(--linea);
    box-shadow:0 20px 46px -26px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.16);
    transition:transform .28s cubic-bezier(.2,.7,.2,1),box-shadow .28s ease}
  .pieza:hover{transform:translateY(-6px);
    box-shadow:0 34px 66px -28px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.28)}
  .pieza .foto{position:relative;aspect-ratio:1;
    background:radial-gradient(circle at 50% 35%,rgba(255,255,255,.14),rgba(255,255,255,.03));
    display:flex;align-items:center;justify-content:center;color:var(--suave);overflow:hidden}
  .pieza .foto img{width:100%;height:100%;object-fit:cover;transition:transform .4s cubic-bezier(.2,.7,.2,1)}
  .pieza .foto.clicable{cursor:zoom-in}
  .pieza .foto.clicable:hover img{transform:scale(1.08)}
  /* Lupa que aparece al pasar el mouse, para que se note que la foto se
     puede ampliar antes de hacerle clic. */
  .pieza .foto .lupa{position:absolute;right:.55rem;bottom:.55rem;width:30px;height:30px;
    border-radius:50%;background:rgba(20,12,14,.55);border:1px solid var(--linea);
    -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;opacity:0;
    transition:opacity .18s ease;color:var(--tinta)}
  .pieza .foto.clicable:hover .lupa{opacity:1}
  .pieza .foto .sinfoto{display:flex;flex-direction:column;align-items:center;gap:.4rem;color:var(--suave)}
  .pieza .foto .sinfoto span{font-size:.64rem;letter-spacing:.12em;text-transform:uppercase}
  /* Insignia de material: un vistazo basta sin leer el nombre completo. */
  .pieza .material{position:absolute;top:.5rem;left:.5rem;padding:.2rem .6rem;border-radius:999px;
    background:rgba(20,12,14,.6);border:1px solid var(--linea);color:var(--tinta);
    font-size:.56rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
    -webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}
  .pieza .cuerpo{padding:.9rem;display:flex;flex-direction:column;gap:.4rem;flex:1}
  .pieza .sku{font-size:.58rem;color:var(--gold);font-weight:600;letter-spacing:.16em}
  .pieza .nombre{font-size:1rem;font-weight:400;line-height:1.3}
  .pieza .precio{font-size:1.15rem;font-weight:500;color:var(--gold);margin-top:auto;
    font-variant-numeric:tabular-nums}
  /* Tallas / medidas: el cliente elige una antes de agregar la pieza. */
  .pieza .tallas{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.1rem}
  .pieza .tallas .lbl{width:100%;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;
    color:var(--suave)}
  .pieza .tchip{font:inherit;font-size:.72rem;font-weight:500;padding:.2rem .55rem;border-radius:8px;
    cursor:pointer;color:var(--suave);background:rgba(255,255,255,.06);border:1px solid var(--linea);
    transition:all .15s ease}
  .pieza .tchip:hover{color:var(--tinta)}
  .pieza .tchip.activo{background:linear-gradient(135deg,var(--rose-soft),var(--acento));
    border-color:transparent;color:#1B1315;font-weight:600}
  .pieza button{margin-top:.6rem;width:100%;padding:.55rem;border:0;border-radius:999px;
    background:linear-gradient(135deg,var(--rose-soft),var(--acento));color:#1B1315;
    font:inherit;font-weight:600;font-size:.8rem;cursor:pointer;transition:filter .15s ease}
  .pieza button:hover{filter:brightness(1.06)}
  .pieza button.puesto{background:var(--verde);color:#fff}

  /* Visor de foto ampliada: se abre al hacer clic en la imagen de una pieza. */
  .visor{position:fixed;inset:0;z-index:50;background:rgba(15,8,11,.7);
    -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);
    display:none;align-items:center;justify-content:center;padding:1.5rem;
    opacity:0;transition:opacity .2s ease}
  .visor.abierto{display:flex}
  .visor.visible{opacity:1}
  .visor .marco{position:relative;max-width:min(600px,92vw);max-height:88vh;
    display:flex;flex-direction:column;align-items:center;gap:.9rem}
  .visor img{max-width:100%;max-height:70vh;border-radius:16px;object-fit:contain;
    background:rgba(255,255,255,.06);border:1px solid var(--linea);
    box-shadow:0 30px 70px rgba(0,0,0,.55)}
  .visor .info{color:var(--tinta);text-align:center}
  .visor .info .nombre{font-weight:400;font-size:1.35rem}
  .visor .info .precio{color:var(--gold);font-weight:500;font-size:1.2rem;margin-top:.2rem}
  .visor .cerrar{position:absolute;top:-.85rem;right:-.85rem;width:38px;height:38px;
    border-radius:50%;border:1px solid var(--linea);background:rgba(20,12,14,.8);color:var(--tinta);
    cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;
    -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}

  .vacio{text-align:center;color:var(--suave);padding:3.5rem 1rem}
  .vacio button{margin-top:.85rem;padding:.55rem 1.1rem;border:1px solid var(--linea);
    border-radius:999px;background:rgba(255,255,255,.06);color:var(--tinta);font:inherit;
    font-weight:600;font-size:.82rem;cursor:pointer}

  /* Barra del pedido: fija abajo para que en el celular siempre este a mano */
  .pedido{position:fixed;left:0;right:0;bottom:0;z-index:30;
    background:linear-gradient(150deg,rgba(255,255,255,.12),rgba(255,255,255,.05));
    -webkit-backdrop-filter:blur(22px) saturate(160%);backdrop-filter:blur(22px) saturate(160%);
    border-top:1px solid var(--linea);padding:.85rem 1.25rem;
    box-shadow:0 -16px 40px -12px rgba(0,0,0,.55);display:none}
  .pedido.visible{display:block}
  .pedido .fila{max-width:1120px;margin:0 auto;display:flex;gap:.75rem;
    align-items:center;justify-content:space-between;flex-wrap:wrap}
  .pedido .total{font-weight:500;font-size:1.2rem;font-variant-numeric:tabular-nums}
  .pedido .total #total{color:var(--gold)}
  .pedido .total #resumen{display:block;font-family:'Instrument Sans',sans-serif;font-size:.66rem;
    color:var(--suave);font-weight:500;letter-spacing:.12em;text-transform:uppercase}
  .pedido .acciones{display:flex;gap:.5rem}
  .pedido button{padding:.65rem 1.15rem;border-radius:999px;border:0;font:inherit;font-weight:600;
    cursor:pointer;font-size:.88rem}
  .pedido .enviar{background:var(--verde);color:#fff}
  .pedido .vaciar{background:transparent;color:var(--suave);border:1px solid var(--linea)}

  footer{background:transparent;color:var(--suave);padding:2.5rem 1.25rem 3rem;text-align:center;
    font-size:.85rem}
  footer p:first-child{color:var(--tinta);letter-spacing:.03em}

  /* ---- Punto de venta oculto ----
     Se abre manteniendo pulsado "Filtros" 2s y metiendo una clave que valida
     el relevo en la nube (nunca viaja en este HTML). Caja de vidrio. */
  .modal{position:fixed;inset:0;z-index:60;background:rgba(15,8,11,.7);
    -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);
    display:none;align-items:center;justify-content:center;padding:1.25rem}
  .modal.abierto{display:flex}
  .modal .caja{background:linear-gradient(150deg,rgba(255,255,255,.12),rgba(255,255,255,.05));
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:1px solid var(--linea);border-radius:20px;padding:1.6rem;
    width:100%;max-width:390px;max-height:88vh;overflow-y:auto;
    box-shadow:0 30px 70px rgba(0,0,0,.55)}
  .modal h2{font-size:1.3rem;font-weight:400;margin-bottom:.35rem}
  .modal p.sub{color:var(--suave);font-size:.85rem;margin-bottom:1rem}
  .modal label{display:block;font-size:.64rem;text-transform:uppercase;
    letter-spacing:.16em;color:var(--suave);font-weight:600;margin:.9rem 0 .4rem}
  .modal input[type=password],.modal input[type=text],.modal input[type=tel],
  .modal input[type=number]{width:100%;padding:.68rem .85rem;border:1px solid var(--linea);
    border-radius:12px;font:inherit;font-size:1rem;outline:none;color:var(--tinta);
    background:rgba(255,255,255,.06)}
  .modal input::placeholder{color:var(--suave)}
  .modal input:focus{border-color:var(--acento)}
  .modal .metodos{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.15rem}
  .modal .metodos button{flex:1;min-width:calc(50% - .2rem);padding:.55rem;border-radius:10px;
    border:1px solid var(--linea);background:rgba(255,255,255,.06);font:inherit;font-size:.82rem;
    font-weight:600;color:var(--tinta);cursor:pointer}
  .modal .metodos button.activo{background:linear-gradient(135deg,var(--rose-soft),var(--acento));
    border-color:transparent;color:#1B1315}
  .modal .acciones{display:flex;gap:.5rem;margin-top:1.35rem}
  .modal .acciones button{flex:1;padding:.72rem;border-radius:12px;border:0;
    font:inherit;font-weight:600;font-size:.9rem;cursor:pointer}
  .modal .acciones .ok{background:var(--verde);color:#fff}
  .modal .acciones .cancelar{background:rgba(255,255,255,.06);color:var(--suave);border:1px solid var(--linea)}
  .modal .error{color:var(--acento-osc);font-size:.82rem;font-weight:600;margin-top:.8rem;min-height:1rem}
  .modal .contactos{margin-top:.5rem;background:none;border:0;color:var(--gold);
    font:inherit;font-size:.8rem;font-weight:600;cursor:pointer;padding:0}
  .modal .resumen-venta{background:rgba(255,255,255,.06);border:1px solid var(--linea);border-radius:12px;
    padding:.75rem .9rem;font-size:.85rem;margin-bottom:.25rem}
  .modal .resumen-venta b{font-family:'Fraunces','Georgia',serif;font-size:1.05rem;color:var(--gold)}

  /* Franja "modo venta activo": bloque normal al tope de la pagina (se va con
     el scroll, es solo un indicador). */
  .modo-venta{background:linear-gradient(135deg,var(--acento-osc),var(--acento));color:#1B1315;
    font-size:.74rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
    padding:.5rem 1rem;text-align:center;display:none;align-items:center;
    justify-content:center;gap:.6rem;position:relative;z-index:2}
  .modo-venta.visible{display:flex}
  .modo-venta button{background:rgba(27,19,21,.25);border:0;color:#1B1315;border-radius:6px;
    padding:.15rem .55rem;font:inherit;font-size:.7rem;font-weight:700;cursor:pointer}

  .pedido .cobrar{background:linear-gradient(135deg,var(--rose-soft),var(--acento));color:#1B1315;display:none}
  .pedido.modo-venta-activo .cobrar{display:inline-block}

  @media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}

  @media(max-width:520px){
    .rejilla{grid-template-columns:repeat(2,1fr);gap:.75rem}
    header{padding:2.25rem 1rem 1.5rem}
    .pieza .nombre{font-size:.92rem}
  }
</style>
</head>
<body>

<div class="orbs" aria-hidden="true">
  <span class="orb a" id="orbA"></span>
  <span class="orb b" id="orbB"></span>
</div>

<div class="modo-venta" id="modoVenta">
  <span>&#128274; Modo venta activo</span>
  <button type="button" id="salirModoVenta">Salir</button>
</div>

<header>
  ${datos.logo ? `<img src="${esc(datos.logo)}" alt="">` : ''}
  <h1>${esc(datos.negocio)}</h1>
  ${datos.descripcion ? `<p class="frase">${esc(datos.descripcion)}</p>` : ''}
  ${datos.direccion ? `<p>${esc(datos.direccion)}</p>` : ''}
</header>

<div class="barra">
  <input id="buscar" type="search" placeholder="Buscar por nombre o codigo..." autocomplete="off">
  <button class="btn-filtros" id="btnFiltros" type="button">
    Filtros<span class="punto" id="puntoFiltros" hidden></span>
  </button>
</div>

<div class="panel-filtros abierto" id="panelFiltros">
  <div class="contenido">
    <div id="bloqueCategoria">
      <h3>Categoria</h3>
      <div class="chips" id="chipsCategoria"></div>
    </div>
    <div id="bloqueMaterial">
      <h3>Material</h3>
      <div class="chips" id="chipsMaterial"></div>
    </div>
    <h3>Precio (RD$)</h3>
    <div class="rango-precio">
      <input id="precioDesde" type="number" min="0" inputmode="numeric" placeholder="Desde">
      <span>&ndash;</span>
      <input id="precioHasta" type="number" min="0" inputmode="numeric" placeholder="Hasta">
    </div>
    <button class="limpiar-filtros" id="limpiarFiltros" type="button">Limpiar filtros</button>
  </div>
</div>

<main>
  <p class="contador" id="contador"></p>
  <div class="rejilla" id="rejilla"></div>
  <div class="vacio" id="sinResultados" hidden>
    <p>No encontramos piezas con esos filtros.</p>
    <button id="vaciarDesdeVacio" type="button">Quitar filtros</button>
  </div>
</main>

<div class="pedido" id="pedido">
  <div class="fila">
    <div class="total">
      <span id="resumen">0 piezas</span>
      RD$ <span id="total" style="display:inline">0.00</span>
    </div>
    <div class="acciones">
      <button class="vaciar" id="vaciar">Vaciar</button>
      <button class="cobrar" id="cobrar">Cobrar venta</button>
      <button class="enviar" id="enviar">Pedir por WhatsApp</button>
    </div>
  </div>
</div>

<div class="modal" id="modalClave">
  <div class="caja">
    <h2>Punto de venta</h2>
    <p class="sub">Escribe la clave del punto de venta para registrar una venta desde aqui.</p>
    <label for="claveInput">Clave</label>
    <input id="claveInput" type="password" autocomplete="off" inputmode="text">
    <div class="error" id="claveError"></div>
    <div class="acciones">
      <button type="button" class="cancelar" id="claveCancelar">Cancelar</button>
      <button type="button" class="ok" id="claveEntrar">Entrar</button>
    </div>
  </div>
</div>

<div class="modal" id="modalCobrar">
  <div class="caja">
    <h2>Cobrar venta</h2>
    <div class="resumen-venta" id="resumenVenta"></div>
    <label>Metodo de pago</label>
    <div class="metodos" id="metodosPago">
      <button type="button" data-metodo="EFECTIVO" class="activo">Efectivo</button>
      <button type="button" data-metodo="TARJETA">Tarjeta</button>
      <button type="button" data-metodo="TRANSFERENCIA">Transferencia</button>
      <button type="button" data-metodo="CREDITO">Credito</button>
    </div>
    <label for="descuentoInput">Descuento %</label>
    <input id="descuentoInput" type="number" min="0" max="100" inputmode="numeric" placeholder="0">
    <label for="clienteNombre">Cliente <span id="clienteObligatorio" style="color:var(--acento-osc)" hidden>(obligatorio a credito)</span></label>
    <input id="clienteNombre" type="text" autocomplete="off" placeholder="Nombre">
    <input id="clienteTelefono" type="tel" autocomplete="off" placeholder="Telefono" style="margin-top:.4rem">
    <button type="button" class="contactos" id="elegirContacto" hidden>Elegir de mis contactos</button>
    <div class="error" id="cobrarError"></div>
    <div class="acciones">
      <button type="button" class="cancelar" id="cobrarCancelar">Cancelar</button>
      <button type="button" class="ok" id="cobrarConfirmar">Confirmar venta</button>
    </div>
  </div>
</div>

<div class="visor" id="visor">
  <div class="marco">
    <button class="cerrar" id="cerrarVisor" type="button" aria-label="Cerrar">&times;</button>
    <img id="visorImg" src="" alt="">
    <div class="info">
      <div class="nombre" id="visorNombre"></div>
      <div class="precio" id="visorPrecio"></div>
    </div>
  </div>
</div>

<footer>
  <p>${esc(datos.negocio)}${datos.direccion ? ' &middot; ' + esc(datos.direccion) : ''}</p>
  <p style="margin-top:.75rem;color:var(--suave);font-size:.75rem">Precios en pesos dominicanos. Actualizado el ${esc(datos.generado)}.</p>
</footer>

<script>
const DATOS = ${json};
// carrito: clave -> { sku, talla, cantidad }. Una pieza con tallas ocupa una
// linea por talla elegida; una sin tallas usa el sku como clave.
const carrito = new Map();
// talla marcada en cada tarjeta (sku -> talla), antes de agregar al pedido.
const tallaElegida = new Map();
const claveCarrito = (sku, talla) => (talla ? sku + '\\u0001' + talla : sku);
const tieneTallas = (p) => Array.isArray(p.tallas) && p.tallas.length > 0;

// Que filtros de material mostrar: solo los que de verdad tiene el inventario
// (si el negocio no vende acero, no tiene sentido ofrecer ese chip).
const MATERIALES_DISPONIBLES = [...new Set(DATOS.productos.map(p => p.material))].sort();
// Igual para categoria: solo las que de verdad tienen piezas publicadas, y
// nunca "sin categoria" como chip (esas simplemente no entran en el filtro).
const CATEGORIAS_DISPONIBLES = [...new Set(DATOS.productos.map(p => p.categoria).filter(Boolean))].sort();
const filtros = { texto: '', materiales: new Set(), categorias: new Set(), desde: null, hasta: null };

const dinero = (n) => n.toLocaleString('es-DO', {minimumFractionDigits:2, maximumFractionDigits:2});

/**
 * Por palabras sueltas, sin importar el orden: "anillo verde" encuentra
 * "Anillo Piedra Verde" aunque "verde" no vaya pegado a "anillo". Cada
 * palabra de la busqueda tiene que aparecer en algun lugar del texto.
 */
function coincideTexto(texto, consulta) {
  if (!consulta) return true;
  const palabras = consulta.split(/\s+/).filter(Boolean);
  const textoNormalizado = texto.toLowerCase();
  return palabras.every((palabra) => textoNormalizado.includes(palabra));
}

function coincide(p) {
  if (!coincideTexto(p.nombre + ' ' + p.sku, filtros.texto)) return false;
  if (filtros.materiales.size > 0 && !filtros.materiales.has(p.material)) return false;
  if (filtros.categorias.size > 0 && (!p.categoria || !filtros.categorias.has(p.categoria))) return false;
  if (filtros.desde != null && p.precio < filtros.desde) return false;
  if (filtros.hasta != null && p.precio > filtros.hasta) return false;
  return true;
}

// Revelado de las piezas al hacer scroll (GSAP + ScrollTrigger). Solo se
// anima cuando "animar" es true: al cargar y al cambiar los filtros. Al
// escribir en el buscador o al agregar al carrito se re-pinta sin animar,
// para que no parpadee la rejilla. Sin GSAP no hace nada: las piezas ya
// estan visibles.
const _reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let _triggersPiezas = [];
let _safetyReveal = null;
function revelarPiezas(animar) {
  if (window.gsap) {
    _triggersPiezas.forEach(t => { if (t && t.kill) t.kill(); });
    _triggersPiezas = [];
    clearTimeout(_safetyReveal);
    gsap.killTweensOf('#rejilla .pieza');
    gsap.set('#rejilla .pieza', { clearProps: 'opacity,transform' });
  }
  if (!animar || !window.gsap || _reduce) return;
  const cards = Array.prototype.slice.call(document.querySelectorAll('#rejilla .pieza'));
  if (!cards.length) return;

  // Sin ScrollTrigger: una sola entrada suave y listo.
  if (!window.ScrollTrigger) {
    gsap.from(cards, { opacity: 0, y: 22, duration: 0.5, stagger: 0.03, ease: 'power2.out' });
    return;
  }

  // Las piezas ya visibles: entran de una, en cascada. Las de mas abajo: cada
  // una con su ScrollTrigger "once" (corre al llegar a ella y no se vuelve a
  // esconder al subir el scroll).
  const limite = window.innerHeight * 0.88;
  const enVista = [], abajo = [];
  cards.forEach(c => { (c.getBoundingClientRect().top < limite ? enVista : abajo).push(c); });

  if (enVista.length) {
    gsap.from(enVista, { opacity: 0, y: 22, duration: 0.5, stagger: 0.05, ease: 'power2.out' });
  }
  abajo.forEach(c => {
    const tw = gsap.from(c, {
      opacity: 0,
      y: 24,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: c, start: 'top 88%', once: true },
    });
    if (tw.scrollTrigger) _triggersPiezas.push(tw.scrollTrigger);
  });

  // Red de seguridad: si por lo que sea el motor de animacion se congela
  // (rAF detenido, pestana en segundo plano mucho rato), nada se queda a
  // medias — a los 4s todo visible sin importar el scroll.
  _safetyReveal = setTimeout(() => {
    gsap.set('#rejilla .pieza', { opacity: 1, y: 0, clearProps: 'opacity,transform' });
  }, 4000);
}

function pintar(animar) {
  const rejilla = document.getElementById('rejilla');
  const lista = DATOS.productos.filter(coincide);

  document.getElementById('sinResultados').hidden = lista.length > 0;
  document.getElementById('contador').textContent =
    lista.length === DATOS.productos.length
      ? lista.length + (lista.length === 1 ? ' pieza' : ' piezas')
      : 'Mostrando ' + lista.length + ' de ' + DATOS.productos.length + ' piezas';

  const iconoLupa = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
  const iconoGema = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"></path><path d="M2 9h20M8 3l4 18M16 3l-4 18"></path></svg>';

  rejilla.innerHTML = lista.map(p => {
    const enCarrito = [...carrito.values()].filter(e => e.sku === p.sku);
    const cantidad = enCarrito.reduce((s, e) => s + e.cantidad, 0);
    const puesto = cantidad > 0;

    let bloqueTallas = '';
    if (tieneTallas(p)) {
      if (!tallaElegida.has(p.sku)) tallaElegida.set(p.sku, p.tallas[0]);
      const sel = tallaElegida.get(p.sku);
      bloqueTallas = \`<div class="tallas"><span class="lbl">Talla</span>\` +
        p.tallas.map(t =>
          \`<button type="button" class="tchip\${t === sel ? ' activo' : ''}" data-talla-sku="\${p.sku}" data-talla="\${t}">\${t}</button>\`
        ).join('') + \`</div>\`;
    }

    return \`<article class="pieza">
      <div class="foto\${p.imagen ? ' clicable' : ''}" \${p.imagen ? \`data-visor="\${p.sku}"\` : ''}>
        \${p.imagen
          ? \`<img src="\${p.imagen}" alt="\${p.nombre}" loading="lazy"><span class="lupa">\${iconoLupa}</span>\`
          : \`<span class="sinfoto">\${iconoGema}<span>Sin foto</span></span>\`}
        <span class="material">\${p.material}</span>
      </div>
      <div class="cuerpo">
        <span class="sku">\${p.sku}</span>
        <span class="nombre">\${p.nombre}</span>
        <span class="precio">RD$ \${dinero(p.precio)}</span>
        \${bloqueTallas}
        <button data-sku="\${p.sku}" class="\${puesto ? 'puesto' : ''}">
          \${puesto ? '✓ Agregado (' + cantidad + ')' : 'Agregar'}
        </button>
      </div>
    </article>\`;
  }).join('');

  rejilla.querySelectorAll('[data-talla-sku]').forEach(b => {
    b.onclick = () => { tallaElegida.set(b.dataset.tallaSku, b.dataset.talla); pintar(false); };
  });
  rejilla.querySelectorAll('button[data-sku]').forEach(b => {
    b.onclick = () => { agregar(b.dataset.sku); };
  });
  rejilla.querySelectorAll('[data-visor]').forEach(el => {
    el.onclick = () => abrirVisor(el.dataset.visor);
  });

  revelarPiezas(animar);
}

// ---- Visor de foto ampliada ----

function abrirVisor(sku) {
  const p = DATOS.productos.find(x => x.sku === sku);
  if (!p || !p.imagen) return;
  document.getElementById('visorImg').src = p.imagen;
  document.getElementById('visorImg').alt = p.nombre;
  document.getElementById('visorNombre').textContent = p.nombre;
  document.getElementById('visorPrecio').textContent = 'RD$ ' + dinero(p.precio);
  const visor = document.getElementById('visor');
  visor.classList.add('abierto');
  requestAnimationFrame(() => visor.classList.add('visible'));
}

function cerrarVisor() {
  const visor = document.getElementById('visor');
  visor.classList.remove('visible');
  setTimeout(() => visor.classList.remove('abierto'), 200);
}

document.getElementById('cerrarVisor').onclick = cerrarVisor;
document.getElementById('visor').onclick = (e) => {
  if (e.target.id === 'visor') cerrarVisor();
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarVisor();
});

function agregar(sku) {
  const p = DATOS.productos.find(x => x.sku === sku);
  if (!p) return;
  const talla = tieneTallas(p) ? (tallaElegida.get(sku) || p.tallas[0]) : null;
  const clave = claveCarrito(sku, talla);
  // En modo venta el carrito no puede pasar de 30 lineas distintas: es el
  // tope que acepta el relevo (evita que alguien intente saturar la app).
  if (pos.activo && !carrito.has(clave) && carrito.size >= 30) {
    alert('Maximo 30 productos distintos por venta.');
    return;
  }
  const actual = carrito.get(clave);
  carrito.set(clave, { sku, talla, cantidad: (actual ? actual.cantidad : 0) + 1 });
  pintar(false);
  actualizarPedido();
}

// ---- Filtros ----

function pintarChipsMaterial() {
  const cont = document.getElementById('chipsMaterial');
  document.getElementById('bloqueMaterial').hidden = MATERIALES_DISPONIBLES.length < 2;
  cont.innerHTML = MATERIALES_DISPONIBLES.map(m =>
    \`<button type="button" class="chip" data-material="\${m}">\${m}</button>\`).join('');
  cont.querySelectorAll('.chip').forEach(chip => {
    chip.onclick = () => {
      const m = chip.dataset.material;
      filtros.materiales.has(m) ? filtros.materiales.delete(m) : filtros.materiales.add(m);
      chip.classList.toggle('activo');
      aplicarFiltros();
    };
  });
}

function pintarChipsCategoria() {
  const cont = document.getElementById('chipsCategoria');
  document.getElementById('bloqueCategoria').hidden = CATEGORIAS_DISPONIBLES.length < 2;
  cont.innerHTML = CATEGORIAS_DISPONIBLES.map(c =>
    \`<button type="button" class="chip" data-categoria="\${c}">\${c}</button>\`).join('');
  cont.querySelectorAll('.chip').forEach(chip => {
    chip.onclick = () => {
      const c = chip.dataset.categoria;
      filtros.categorias.has(c) ? filtros.categorias.delete(c) : filtros.categorias.add(c);
      chip.classList.toggle('activo');
      aplicarFiltros();
    };
  });
}

function contarFiltrosActivos() {
  let n = filtros.materiales.size + filtros.categorias.size;
  if (filtros.desde != null) n++;
  if (filtros.hasta != null) n++;
  return n;
}

function aplicarFiltros() {
  const n = contarFiltrosActivos();
  document.getElementById('btnFiltros').classList.toggle('activo', n > 0);
  document.getElementById('puntoFiltros').hidden = n === 0;
  pintar(true);
}

// El boton "Filtros": un toque normal abre/cierra el panel; mantenerlo
// pulsado 2s abre el punto de venta oculto (ver mas abajo).
(function () {
  const btn = document.getElementById('btnFiltros');
  let timer = null;
  let fueLargo = false;
  const arrancar = () => {
    fueLargo = false;
    clearTimeout(timer);
    timer = setTimeout(() => { fueLargo = true; abrirModalClave(); }, 2000);
  };
  const cortar = () => clearTimeout(timer);
  btn.addEventListener('pointerdown', arrancar);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => btn.addEventListener(ev, cortar));
  btn.addEventListener('contextmenu', (e) => e.preventDefault());
  btn.addEventListener('click', (e) => {
    if (fueLargo) { e.preventDefault(); e.stopPropagation(); fueLargo = false; return; }
    document.getElementById('panelFiltros').classList.toggle('abierto');
  });
})();

document.getElementById('precioDesde').oninput = (e) => {
  filtros.desde = e.target.value === '' ? null : Number(e.target.value);
  aplicarFiltros();
};
document.getElementById('precioHasta').oninput = (e) => {
  filtros.hasta = e.target.value === '' ? null : Number(e.target.value);
  aplicarFiltros();
};

function limpiarFiltros() {
  filtros.materiales.clear();
  filtros.categorias.clear();
  filtros.desde = null;
  filtros.hasta = null;
  document.getElementById('precioDesde').value = '';
  document.getElementById('precioHasta').value = '';
  document.querySelectorAll('.chip.activo').forEach(c => c.classList.remove('activo'));
  aplicarFiltros();
}
document.getElementById('limpiarFiltros').onclick = limpiarFiltros;
document.getElementById('vaciarDesdeVacio').onclick = () => {
  limpiarFiltros();
  document.getElementById('buscar').value = '';
  filtros.texto = '';
  pintar(true);
};

function actualizarPedido() {
  const barra = document.getElementById('pedido');
  let piezas = 0, total = 0;
  for (const it of carrito.values()) {
    const p = DATOS.productos.find(x => x.sku === it.sku);
    if (!p) continue;
    piezas += it.cantidad;
    total += p.precio * it.cantidad;
  }
  barra.classList.toggle('visible', piezas > 0);
  document.getElementById('resumen').textContent = piezas === 1 ? '1 pieza' : piezas + ' piezas';
  document.getElementById('total').textContent = dinero(total);
}

document.getElementById('vaciar').onclick = () => {
  carrito.clear();
  pintar(false);
  actualizarPedido();
};

/**
 * Numero de pedido corto y practicamente unico (fecha en base36 + 3
 * caracteres al azar), para que el cliente y el negocio tengan una misma
 * referencia al hablar del pedido — sin pedirle datos a nadie en la pagina.
 */
function generarCodigoPedido() {
  const fecha = Date.now().toString(36).slice(-5).toUpperCase();
  const azar = Math.random().toString(36).slice(2, 5).toUpperCase();
  return 'PED-' + fecha + azar;
}

document.getElementById('enviar').onclick = () => {
  // El pedido se manda como mensaje de WhatsApp: ese sigue siendo el canal
  // real con el cliente, pase lo que pase con el relevo de abajo.
  const codigo = generarCodigoPedido();
  const lineas = [];
  let total = 0;
  for (const it of carrito.values()) {
    const p = DATOS.productos.find(x => x.sku === it.sku);
    if (!p) continue;
    total += p.precio * it.cantidad;
    const et = it.talla ? ' [Talla ' + it.talla + ']' : '';
    lineas.push(it.cantidad + ' x ' + p.nombre + et + ' (' + it.sku + ') - RD$ ' + dinero(p.precio * it.cantidad));
  }
  const texto = 'Hola! Quiero hacer este pedido *#' + codigo + '*:\\n\\n' + lineas.join('\\n') +
    '\\n\\nTotal: RD$ ' + dinero(total);
  const tel = DATOS.telefonoWhatsapp.replace(/[^0-9]/g, '');
  // window.open() va PRIMERO y sin esperar nada: si se pone despues de un
  // await, el navegador lo trata como ventana emergente no pedida por el
  // usuario y la bloquea.
  window.open('https://wa.me/' + tel + '?text=' + encodeURIComponent(texto), '_blank');

  // Avisa al relevo en la nube (si esta configurado) para que el pedido
  // caiga solo en la app del negocio, ademas de llegar por WhatsApp. Si esto
  // falla (sin relevo, sin internet, lo que sea) no pasa nada: el mensaje de
  // WhatsApp ya salio y es quien de verdad importa.
  if (DATOS.relevoUrl) {
    fetch(DATOS.relevoUrl.replace(/\\/$/, '') + '/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo, texto }),
    }).catch(() => {});
  }
};

document.getElementById('buscar').oninput = (e) => {
  filtros.texto = e.target.value.trim().toLowerCase();
  pintar(false);
};

// ---- No copiar (todo salvo los nombres de las piezas) ----
function seleccionEnNombre() {
  const sel = document.getSelection();
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) return false;
  var nodo = sel.getRangeAt(0).commonAncestorContainer;
  if (nodo.nodeType === 3) nodo = nodo.parentElement;
  return !!(nodo && nodo.closest && nodo.closest('.nombre'));
}
document.addEventListener('copy', (e) => { if (!seleccionEnNombre()) e.preventDefault(); });

// ---- Punto de venta oculto ----
// La clave NUNCA esta en esta pagina: se manda al relevo en la nube y ese la
// compara con un secreto que solo vive en Cloudflare. El estado desbloqueado
// vive solo en memoria (no localStorage): recargar la pagina o pasar 5
// minutos lo vuelve a pedir.
const RELEVO = (DATOS.relevoUrl || '').replace(/\\/$/, '');
const DURACION_POS_MS = 5 * 60 * 1000;
const pos = { activo: false, clave: '', desde: 0, metodo: 'EFECTIVO', temporizador: null };

function abrirModalClave() {
  if (!RELEVO) { alert('El punto de venta web no esta configurado.'); return; }
  document.getElementById('claveError').textContent = '';
  document.getElementById('claveInput').value = '';
  document.getElementById('modalClave').classList.add('abierto');
  setTimeout(() => document.getElementById('claveInput').focus(), 50);
}
function cerrarModalClave() {
  document.getElementById('modalClave').classList.remove('abierto');
}
document.getElementById('claveCancelar').onclick = cerrarModalClave;
document.getElementById('claveInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('claveEntrar').click();
});
document.getElementById('claveEntrar').onclick = async () => {
  const clave = document.getElementById('claveInput').value;
  if (!clave) return;
  const err = document.getElementById('claveError');
  err.textContent = 'Verificando...';
  try {
    const r = await fetch(RELEVO + '/pos/verificar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clave }),
    });
    if (r.ok) { activarModoVenta(clave); cerrarModalClave(); }
    else if (r.status === 429) err.textContent = 'Demasiados intentos. Espera unos minutos.';
    else if (r.status === 503) err.textContent = 'El punto de venta web no esta configurado en Cloudflare.';
    else err.textContent = 'Clave incorrecta.';
  } catch { err.textContent = 'No se pudo verificar (sin conexion?).'; }
};

function activarModoVenta(clave) {
  pos.activo = true;
  pos.clave = clave;
  pos.desde = Date.now();
  clearTimeout(pos.temporizador);
  pos.temporizador = setTimeout(salirModoVenta, DURACION_POS_MS);
  document.getElementById('modoVenta').classList.add('visible');
  document.getElementById('pedido').classList.add('modo-venta-activo');
}
function salirModoVenta() {
  pos.activo = false;
  pos.clave = '';
  clearTimeout(pos.temporizador);
  document.getElementById('modoVenta').classList.remove('visible');
  document.getElementById('pedido').classList.remove('modo-venta-activo');
  document.getElementById('modalCobrar').classList.remove('abierto');
}
function sesionPosValida() {
  return pos.activo && (Date.now() - pos.desde) < DURACION_POS_MS;
}
document.getElementById('salirModoVenta').onclick = salirModoVenta;

// ---- Hoja de cobro ----
const metodosCont = document.getElementById('metodosPago');
metodosCont.querySelectorAll('button').forEach(b => {
  b.onclick = () => {
    metodosCont.querySelectorAll('button').forEach(x => x.classList.remove('activo'));
    b.classList.add('activo');
    pos.metodo = b.dataset.metodo;
    document.getElementById('clienteObligatorio').hidden = pos.metodo !== 'CREDITO';
  };
});

const btnContacto = document.getElementById('elegirContacto');
if (navigator.contacts && navigator.contacts.select) {
  btnContacto.hidden = false;
  btnContacto.onclick = async () => {
    try {
      const elegidos = await navigator.contacts.select(['name', 'tel'], { multiple: false });
      const c = elegidos && elegidos[0];
      if (c) {
        if (c.name && c.name[0]) document.getElementById('clienteNombre').value = c.name[0];
        if (c.tel && c.tel[0]) document.getElementById('clienteTelefono').value = c.tel[0];
      }
    } catch {}
  };
}

function abrirCobrar() {
  if (!sesionPosValida()) { salirModoVenta(); abrirModalClave(); return; }
  if (carrito.size === 0) { alert('Agrega al menos un producto.'); return; }
  let piezas = 0, total = 0;
  for (const it of carrito.values()) {
    const p = DATOS.productos.find(x => x.sku === it.sku);
    if (p) { piezas += it.cantidad; total += p.precio * it.cantidad; }
  }
  document.getElementById('resumenVenta').innerHTML =
    piezas + (piezas === 1 ? ' pieza' : ' piezas') + ' &middot; <b>RD$ ' + dinero(total) + '</b>';
  document.getElementById('cobrarError').textContent = '';
  document.getElementById('modalCobrar').classList.add('abierto');
}
document.getElementById('cobrar').onclick = abrirCobrar;
document.getElementById('cobrarCancelar').onclick = () =>
  document.getElementById('modalCobrar').classList.remove('abierto');

function generarCodigoVenta() {
  const fecha = Date.now().toString(36).slice(-5).toUpperCase();
  const azar = Math.random().toString(36).slice(2, 5).toUpperCase();
  return 'VNT-' + fecha + azar;
}

document.getElementById('cobrarConfirmar').onclick = async () => {
  if (!sesionPosValida()) { salirModoVenta(); abrirModalClave(); return; }
  const err = document.getElementById('cobrarError');
  const nombre = document.getElementById('clienteNombre').value.trim();
  const telefono = document.getElementById('clienteTelefono').value.trim();
  const descuentoPct = Math.max(0, Math.min(100, Number(document.getElementById('descuentoInput').value) || 0));
  if (pos.metodo === 'CREDITO' && (!nombre || !telefono)) {
    err.textContent = 'A credito hace falta el nombre y el telefono del cliente.';
    return;
  }
  const items = [];
  for (const it of carrito.values()) {
    const p = DATOS.productos.find(x => x.sku === it.sku);
    if (p) items.push({ sku: it.sku, cantidad: it.cantidad, precio: p.precio, talla: it.talla || undefined });
  }
  if (items.length === 0) { err.textContent = 'El carrito esta vacio.'; return; }
  const venta = {
    items,
    metodoPago: pos.metodo,
    descuentoPct,
    cliente: (nombre || telefono) ? { nombre, telefono } : null,
  };
  const codigo = generarCodigoVenta();
  err.textContent = 'Enviando...';
  try {
    const r = await fetch(RELEVO + '/pos/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo, venta, clave: pos.clave }),
    });
    if (r.ok) {
      carrito.clear();
      pintar(false);
      actualizarPedido();
      document.getElementById('modalCobrar').classList.remove('abierto');
      document.getElementById('descuentoInput').value = '';
      document.getElementById('clienteNombre').value = '';
      document.getElementById('clienteTelefono').value = '';
      alert('Venta ' + codigo + ' enviada. Va a aparecer en la app en un momento.');
    } else if (r.status === 429) {
      err.textContent = 'Se alcanzo el limite de ventas por ahora. Intenta en unos minutos.';
    } else if (r.status === 401) {
      err.textContent = 'La sesion expiro. Vuelve a entrar la clave.';
      salirModoVenta();
    } else {
      err.textContent = 'No se pudo enviar la venta (codigo ' + r.status + ').';
    }
  } catch { err.textContent = 'No se pudo enviar (sin conexion?).'; }
};

// GSAP: registrar el plugin y poner a flotar los orbes del fondo. Todo
// dentro de "if (window.gsap)" para que sin CDN la pagina siga igual.
if (window.gsap) {
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if (!_reduce) {
    gsap.to('#orbA', { xPercent: 14, yPercent: 12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('#orbB', { xPercent: -12, yPercent: -14, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}

pintarChipsMaterial();
pintarChipsCategoria();
pintar(true);
actualizarPedido();
</script>
</body>
</html>`;
}
