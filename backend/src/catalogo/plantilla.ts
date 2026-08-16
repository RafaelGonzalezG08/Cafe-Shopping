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
  body{background:var(--fondo);color:var(--tinta);
    font-family:'Segoe UI',system-ui,-apple-system,sans-serif;line-height:1.5}
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
    overflow:hidden;display:flex;flex-direction:column}
  .pieza .foto{position:relative;aspect-ratio:1;background:#F3E0E1;display:flex;
    align-items:center;justify-content:center;color:var(--suave);font-size:.8rem}
  .pieza .foto img{width:100%;height:100%;object-fit:cover}
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
    background:var(--acento);color:#fff;font-weight:700;font-size:.8rem;cursor:pointer}
  .pieza button:hover{background:var(--acento-osc)}
  .pieza button.puesto{background:#0E8A5F}

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

  @media(max-width:420px){
    .rejilla{grid-template-columns:repeat(2,1fr);gap:.7rem}
    header{padding:1.75rem 1rem}
    header h1{font-size:1.45rem}
  }
</style>
</head>
<body>

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

<div class="panel-filtros" id="panelFiltros">
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
      <button class="enviar" id="enviar">Pedir por WhatsApp</button>
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

  rejilla.innerHTML = lista.map(p => {
    const puesto = carrito.has(p.sku);
    return \`<article class="pieza">
      <div class="foto">
        \${p.imagen ? \`<img src="\${p.imagen}" alt="\${p.nombre}" loading="lazy">\` : 'Sin foto'}
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
}

function agregar(sku) {
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

document.getElementById('btnFiltros').onclick = () => {
  document.getElementById('panelFiltros').classList.toggle('abierto');
};

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
  // El pedido se manda como mensaje de WhatsApp: no hay servidor que lo
  // reciba, y asi el negocio lo atiende por el canal que ya usa.
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
  window.open('https://wa.me/' + tel + '?text=' + encodeURIComponent(texto), '_blank');
};

document.getElementById('buscar').oninput = (e) => {
  filtros.texto = e.target.value.trim().toLowerCase();
  pintar();
};

pintarChipsMaterial();
pintarChipsCategoria();
pintar();
actualizarPedido();
</script>
</body>
</html>`;
}
