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
<style>
  :root{
    --tinta:#241019; --suave:#93767C; --linea:#E6C7C9;
    --fondo:#FBF2F1; --papel:#FFFFFF; --acento:#B75D66; --acento-osc:#96434C;
    /* Rosa pastel del encabezado y el pie. Es mas claro que el fondo de la
       pagina para que las dos franjas se distingan sin usar bordes. */
    --pastel:#F7DEE1;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  /* Nada de la pagina se puede seleccionar/copiar salvo los nombres de las
     piezas (mas abajo se re-habilita en .nombre). Disuade la copia casual del
     catalogo; no frena devtools ni capturas de pantalla. */
  body{background:var(--fondo);color:var(--tinta);
    font-family:'Segoe UI',system-ui,-apple-system,sans-serif;line-height:1.5;
    -webkit-user-select:none;user-select:none}
  .pieza .nombre,.visor .info .nombre{-webkit-user-select:text;user-select:text}
  img{max-width:100%;display:block}

  header{background:var(--pastel);color:var(--tinta);padding:2.5rem 1.25rem;text-align:center}
  header img{width:72px;height:72px;border-radius:16px;object-fit:cover;margin:0 auto 1rem}
  header h1{font-size:1.9rem;letter-spacing:-.02em}
  /* La frase del negocio va en cursiva, con una pila de tipografias que
     existen en Windows, Mac y Android; si ninguna esta, "cursive" deja al
     sistema elegir la suya en vez de caer en una fuente recta. */
  header .frase{font-family:'Brush Script MT','Segoe Script','Snell Roundhand',cursive;
    font-style:italic;font-size:1.5rem;color:var(--acento-osc);margin-top:.5rem;line-height:1.2}
  header p{color:var(--suave);margin-top:.4rem;font-size:.95rem}

  .barra{position:sticky;top:0;z-index:20;background:var(--papel);
    border-bottom:1px solid var(--linea);padding:.75rem 1.25rem;
    box-shadow:0 2px 8px rgba(36,16,25,.05);
    display:flex;gap:.6rem;align-items:center}
  .barra input{flex:1;min-width:0;padding:.6rem .9rem;border:1px solid var(--linea);
    border-radius:10px;font-size:1rem;outline:none;background:var(--fondo)}
  .barra input:focus{border-color:var(--acento)}
  .btn-filtros{position:relative;display:flex;align-items:center;gap:.4rem;
    padding:.6rem .9rem;border:1px solid var(--linea);border-radius:10px;
    background:var(--papel);color:var(--tinta);font-size:.85rem;font-weight:600;
    cursor:pointer;white-space:nowrap}
  .btn-filtros.activo{border-color:var(--acento);color:var(--acento-osc)}
  .btn-filtros .punto{position:absolute;top:-5px;right:-5px;width:9px;height:9px;
    border-radius:50%;background:var(--acento)}

  /* Panel de filtros: material (chips que solo muestran lo que existe en el
     inventario) y rango de precio. Con inputs de numero en vez de un slider:
     funciona igual con el dedo en el celular y con el mouse, sin depender de
     ninguna libreria externa. */
  .panel-filtros{max-width:1100px;margin:0 auto;padding:0 1.25rem;overflow:hidden;
    max-height:0;transition:max-height .2s ease}
  .panel-filtros.abierto{max-height:480px}
  .panel-filtros .contenido{padding:1rem 0;border-bottom:1px solid var(--linea)}
  .panel-filtros h3{font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;
    color:var(--suave);margin-bottom:.5rem}
  .chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem}
  .chip{padding:.4rem .85rem;border-radius:999px;border:1px solid var(--linea);
    background:var(--papel);font-size:.82rem;font-weight:600;color:var(--tinta);
    cursor:pointer;transition:background .15s,color .15s,border-color .15s}
  .chip.activo{background:var(--acento);border-color:var(--acento);color:#fff}
  .rango-precio{display:flex;align-items:center;gap:.6rem;margin-bottom:.85rem}
  .rango-precio input{width:100%;padding:.55rem .7rem;border:1px solid var(--linea);
    border-radius:9px;font-size:.9rem;outline:none;background:var(--fondo)}
  .rango-precio input:focus{border-color:var(--acento)}
  .rango-precio span{color:var(--suave);font-size:.85rem}
  .limpiar-filtros{background:none;border:0;color:var(--acento-osc);font-size:.8rem;
    font-weight:700;cursor:pointer;padding:0}

  main{max-width:1100px;margin:0 auto;padding:1.5rem 1.25rem 7rem}
  .contador{color:var(--suave);font-size:.8rem;margin-bottom:.85rem}
  .rejilla{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}

  .pieza{background:var(--papel);border:1px solid var(--linea);border-radius:14px;
    overflow:hidden;display:flex;flex-direction:column;
    box-shadow:0 1px 2px rgba(36,16,25,.04);
    transition:transform .18s ease,box-shadow .18s ease}
  .pieza:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(36,16,25,.12)}
  .pieza .foto{position:relative;aspect-ratio:1;background:#F3E0E1;display:flex;
    align-items:center;justify-content:center;color:var(--suave);font-size:.8rem;
    overflow:hidden}
  .pieza .foto img{width:100%;height:100%;object-fit:cover;transition:transform .3s ease}
  .pieza .foto.clicable{cursor:zoom-in}
  .pieza .foto.clicable:hover img{transform:scale(1.06)}
  /* Lupa que aparece al pasar el mouse, para que se note que la foto se
     puede ampliar antes de hacerle clic (en el celular no aparece, ahi ya
     es sabido que las fotos se tocan). */
  .pieza .foto .lupa{position:absolute;right:.5rem;bottom:.5rem;width:28px;height:28px;
    border-radius:50%;background:rgba(255,255,255,.92);display:flex;align-items:center;
    justify-content:center;opacity:0;transition:opacity .18s ease;color:var(--acento-osc)}
  .pieza .foto.clicable:hover .lupa{opacity:1}
  .pieza .foto .sinfoto{display:flex;flex-direction:column;align-items:center;gap:.35rem;
    color:var(--suave)}
  .pieza .foto .sinfoto span{font-size:.68rem}
  /* Insignia de material: misma idea que en Productos dentro de la app, para
     que un vistazo baste sin tener que leer el nombre completo de la pieza. */
  .pieza .material{position:absolute;top:.45rem;left:.45rem;padding:.2rem .55rem;
    border-radius:999px;background:rgba(36,16,25,.72);color:#fff;
    font-size:.62rem;font-weight:700;letter-spacing:.02em;backdrop-filter:blur(2px)}
  .pieza .cuerpo{padding:.75rem;display:flex;flex-direction:column;gap:.35rem;flex:1}
  .pieza .sku{font-size:.65rem;color:var(--acento);font-weight:700;letter-spacing:.04em}
  .pieza .nombre{font-size:.85rem;font-weight:600;line-height:1.3}
  .pieza .precio{font-size:1.05rem;font-weight:800;color:var(--acento-osc);margin-top:auto}
  .pieza button{margin-top:.5rem;width:100%;padding:.5rem;border:0;border-radius:9px;
    background:var(--acento);color:#fff;font-weight:700;font-size:.8rem;cursor:pointer;
    transition:background .15s ease}
  .pieza button:hover{background:var(--acento-osc)}
  .pieza button.puesto{background:#0E8A5F}

  /* Visor de foto ampliada: se abre al hacer clic en la imagen de una pieza. */
  .visor{position:fixed;inset:0;z-index:50;background:rgba(20,8,12,.82);
    display:none;align-items:center;justify-content:center;padding:1.5rem;
    opacity:0;transition:opacity .2s ease}
  .visor.abierto{display:flex}
  .visor.visible{opacity:1}
  .visor .marco{position:relative;max-width:min(600px,92vw);max-height:88vh;
    display:flex;flex-direction:column;align-items:center;gap:.75rem}
  .visor img{max-width:100%;max-height:72vh;border-radius:14px;object-fit:contain;
    background:var(--papel);box-shadow:0 20px 50px rgba(0,0,0,.35)}
  .visor .info{color:#fff;text-align:center}
  .visor .info .nombre{font-weight:700;font-size:1rem}
  .visor .info .precio{color:#F7DEE1;font-weight:800;margin-top:.15rem}
  .visor .cerrar{position:absolute;top:-.75rem;right:-.75rem;width:36px;height:36px;
    border-radius:50%;border:0;background:#fff;color:var(--tinta);cursor:pointer;
    display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,0,0,.25)}

  .vacio{text-align:center;color:var(--suave);padding:3rem 1rem}
  .vacio button{margin-top:.75rem;padding:.5rem 1rem;border:1px solid var(--linea);
    border-radius:9px;background:var(--papel);color:var(--acento-osc);font-weight:700;
    font-size:.82rem;cursor:pointer}

  /* Barra del pedido: fija abajo para que en el celular siempre este a mano */
  .pedido{position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--papel);
    border-top:1px solid var(--linea);padding:.85rem 1.25rem;
    box-shadow:0 -4px 20px rgba(36,16,25,.10);display:none}
  .pedido.visible{display:block}
  .pedido .fila{max-width:1100px;margin:0 auto;display:flex;gap:.75rem;
    align-items:center;justify-content:space-between;flex-wrap:wrap}
  .pedido .total{font-weight:800;font-size:1.1rem}
  .pedido .total span{display:block;font-size:.72rem;color:var(--suave);font-weight:600}
  .pedido .acciones{display:flex;gap:.5rem}
  .pedido button{padding:.65rem 1.1rem;border-radius:10px;border:0;font-weight:700;
    cursor:pointer;font-size:.9rem}
  .pedido .enviar{background:#0E8A5F;color:#fff}
  .pedido .vaciar{background:transparent;color:var(--suave);border:1px solid var(--linea)}

  footer{background:var(--pastel);color:var(--tinta);padding:2rem 1.25rem;text-align:center;
    font-size:.85rem}

  /* ---- Punto de venta oculto ----
     Se abre manteniendo pulsado "Filtros" 2s y metiendo una clave que valida
     el relevo en la nube (nunca viaja en este HTML). */
  .modal{position:fixed;inset:0;z-index:60;background:rgba(20,8,12,.82);
    display:none;align-items:center;justify-content:center;padding:1.25rem}
  .modal.abierto{display:flex}
  .modal .caja{background:var(--papel);border-radius:16px;padding:1.5rem;
    width:100%;max-width:380px;max-height:88vh;overflow-y:auto;
    box-shadow:0 20px 50px rgba(0,0,0,.35)}
  .modal h2{font-size:1.1rem;margin-bottom:.35rem}
  .modal p.sub{color:var(--suave);font-size:.85rem;margin-bottom:1rem}
  .modal label{display:block;font-size:.72rem;text-transform:uppercase;
    letter-spacing:.04em;color:var(--suave);font-weight:700;margin:.85rem 0 .35rem}
  .modal input[type=password],.modal input[type=text],.modal input[type=tel],
  .modal input[type=number]{width:100%;padding:.65rem .8rem;border:1px solid var(--linea);
    border-radius:10px;font-size:1rem;outline:none;background:var(--fondo)}
  .modal input:focus{border-color:var(--acento)}
  .modal .metodos{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.15rem}
  .modal .metodos button{flex:1;min-width:calc(50% - .2rem);padding:.55rem;border-radius:9px;
    border:1px solid var(--linea);background:var(--papel);font-size:.82rem;font-weight:700;
    color:var(--tinta);cursor:pointer}
  .modal .metodos button.activo{background:var(--acento);border-color:var(--acento);color:#fff}
  .modal .acciones{display:flex;gap:.5rem;margin-top:1.25rem}
  .modal .acciones button{flex:1;padding:.7rem;border-radius:10px;border:0;
    font-weight:700;font-size:.9rem;cursor:pointer}
  .modal .acciones .ok{background:#0E8A5F;color:#fff}
  .modal .acciones .cancelar{background:var(--fondo);color:var(--suave);border:1px solid var(--linea)}
  .modal .error{color:var(--acento-osc);font-size:.82rem;font-weight:700;margin-top:.75rem;min-height:1rem}
  .modal .contactos{margin-top:.4rem;background:none;border:0;color:var(--acento-osc);
    font-size:.8rem;font-weight:700;cursor:pointer;padding:0}
  .modal .resumen-venta{background:var(--fondo);border-radius:10px;padding:.7rem .85rem;
    font-size:.85rem;margin-bottom:.25rem}
  .modal .resumen-venta b{font-size:1rem}

  /* Franja "modo venta activo": bloque normal al tope de la pagina (se va con
     el scroll, es solo un indicador). */
  .modo-venta{background:var(--acento-osc);color:#fff;font-size:.8rem;font-weight:700;
    padding:.5rem 1rem;text-align:center;display:none;align-items:center;
    justify-content:center;gap:.6rem}
  .modo-venta.visible{display:flex}
  .modo-venta button{background:rgba(255,255,255,.2);border:0;color:#fff;border-radius:6px;
    padding:.15rem .5rem;font-size:.72rem;font-weight:700;cursor:pointer}

  .pedido .cobrar{background:var(--acento);color:#fff;display:none}
  .pedido.modo-venta-activo .cobrar{display:inline-block}

  @media(max-width:420px){
    .rejilla{grid-template-columns:repeat(2,1fr);gap:.7rem}
    header{padding:1.75rem 1rem}
    header h1{font-size:1.45rem}
  }
</style>
</head>
<body>

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
const carrito = new Map();

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

function pintar() {
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
    const puesto = carrito.has(p.sku);
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
        <button data-sku="\${p.sku}" class="\${puesto ? 'puesto' : ''}">
          \${puesto ? '✓ Agregado (' + carrito.get(p.sku) + ')' : 'Agregar'}
        </button>
      </div>
    </article>\`;
  }).join('');

  rejilla.querySelectorAll('button[data-sku]').forEach(b => {
    b.onclick = () => { agregar(b.dataset.sku); };
  });
  rejilla.querySelectorAll('[data-visor]').forEach(el => {
    el.onclick = () => abrirVisor(el.dataset.visor);
  });
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
  // En modo venta el carrito no puede pasar de 30 productos distintos: es el
  // tope que acepta el relevo (evita que alguien intente saturar la app).
  if (pos.activo && !carrito.has(sku) && carrito.size >= 30) {
    alert('Maximo 30 productos distintos por venta.');
    return;
  }
  carrito.set(sku, (carrito.get(sku) || 0) + 1);
  pintar();
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
  pintar();
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
  pintar();
};

function actualizarPedido() {
  const barra = document.getElementById('pedido');
  let piezas = 0, total = 0;
  for (const [sku, cant] of carrito) {
    const p = DATOS.productos.find(x => x.sku === sku);
    if (!p) continue;
    piezas += cant;
    total += p.precio * cant;
  }
  barra.classList.toggle('visible', piezas > 0);
  document.getElementById('resumen').textContent = piezas === 1 ? '1 pieza' : piezas + ' piezas';
  document.getElementById('total').textContent = dinero(total);
}

document.getElementById('vaciar').onclick = () => {
  carrito.clear();
  pintar(document.getElementById('buscar').value);
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
  for (const [sku, cant] of carrito) {
    const p = DATOS.productos.find(x => x.sku === sku);
    if (!p) continue;
    total += p.precio * cant;
    lineas.push(cant + ' x ' + p.nombre + ' (' + sku + ') - RD$ ' + dinero(p.precio * cant));
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
  pintar();
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
  for (const [sku, cant] of carrito) {
    const p = DATOS.productos.find(x => x.sku === sku);
    if (p) { piezas += cant; total += p.precio * cant; }
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
  for (const [sku, cant] of carrito) {
    const p = DATOS.productos.find(x => x.sku === sku);
    if (p) items.push({ sku, cantidad: cant, precio: p.precio });
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
      pintar();
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

pintarChipsMaterial();
pintarChipsCategoria();
pintar();
actualizarPedido();
</script>
</body>
</html>`;
}
