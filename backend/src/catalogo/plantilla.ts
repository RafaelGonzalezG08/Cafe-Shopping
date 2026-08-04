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
}

export interface DatosCatalogo {
  negocio: string;
  descripcion: string;
  direccion: string;
  telefonoWhatsapp: string;
  datosPago: string;
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
    --oscuro:#22101A;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--fondo);color:var(--tinta);
    font-family:'Segoe UI',system-ui,-apple-system,sans-serif;line-height:1.5}
  img{max-width:100%;display:block}

  header{background:var(--oscuro);color:#FBF2F1;padding:2.5rem 1.25rem;text-align:center}
  header img{width:72px;height:72px;border-radius:16px;object-fit:cover;margin:0 auto 1rem}
  header h1{font-size:1.9rem;letter-spacing:-.02em}
  header p{color:#E6C7C9;margin-top:.4rem;font-size:.95rem}

  .barra{position:sticky;top:0;z-index:20;background:var(--papel);
    border-bottom:1px solid var(--linea);padding:.75rem 1.25rem;
    display:flex;gap:.75rem;align-items:center}
  .barra input{flex:1;min-width:0;padding:.6rem .9rem;border:1px solid var(--linea);
    border-radius:10px;font-size:1rem;outline:none;background:var(--fondo)}
  .barra input:focus{border-color:var(--acento)}

  main{max-width:1100px;margin:0 auto;padding:1.5rem 1.25rem 7rem}
  .rejilla{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}

  .pieza{background:var(--papel);border:1px solid var(--linea);border-radius:14px;
    overflow:hidden;display:flex;flex-direction:column}
  .pieza .foto{aspect-ratio:1;background:#F3E0E1;display:flex;align-items:center;
    justify-content:center;color:var(--suave);font-size:.8rem}
  .pieza .foto img{width:100%;height:100%;object-fit:cover}
  .pieza .cuerpo{padding:.75rem;display:flex;flex-direction:column;gap:.35rem;flex:1}
  .pieza .sku{font-size:.65rem;color:var(--acento);font-weight:700;letter-spacing:.04em}
  .pieza .nombre{font-size:.85rem;font-weight:600;line-height:1.3}
  .pieza .precio{font-size:1.05rem;font-weight:800;color:var(--acento-osc);margin-top:auto}
  .pieza button{margin-top:.5rem;width:100%;padding:.5rem;border:0;border-radius:9px;
    background:var(--acento);color:#fff;font-weight:700;font-size:.8rem;cursor:pointer}
  .pieza button:hover{background:var(--acento-osc)}
  .pieza button.puesto{background:#0E8A5F}

  .vacio{text-align:center;color:var(--suave);padding:3rem 1rem}

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

  footer{background:var(--oscuro);color:#E6C7C9;padding:2rem 1.25rem;text-align:center;
    font-size:.85rem}
  footer .pago{max-width:520px;margin:1rem auto 0;background:rgba(255,255,255,.07);
    border-radius:12px;padding:1rem;text-align:left;white-space:pre-line;font-size:.82rem}
  footer .pago b{display:block;margin-bottom:.35rem;color:#FBF2F1}

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
  ${datos.descripcion ? `<p>${esc(datos.descripcion)}</p>` : ''}
  ${datos.direccion ? `<p>${esc(datos.direccion)}</p>` : ''}
</header>

<div class="barra">
  <input id="buscar" type="search" placeholder="Buscar por nombre o codigo..." autocomplete="off">
</div>

<main>
  <div class="rejilla" id="rejilla"></div>
  <p class="vacio" id="sinResultados" hidden>No encontramos piezas con esa busqueda.</p>
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
  ${
    datos.datosPago
      ? `<div class="pago"><b>Formas de pago</b>${esc(datos.datosPago)}</div>`
      : ''
  }
  <p style="margin-top:1rem;opacity:.6;font-size:.75rem">Precios en pesos dominicanos. Actualizado el ${esc(datos.generado)}.</p>
</footer>

<script>
const DATOS = ${json};
const carrito = new Map();

const dinero = (n) => n.toLocaleString('es-DO', {minimumFractionDigits:2, maximumFractionDigits:2});

function pintar(filtro = '') {
  const rejilla = document.getElementById('rejilla');
  const q = filtro.trim().toLowerCase();
  const lista = DATOS.productos.filter(p =>
    !q || p.nombre.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));

  document.getElementById('sinResultados').hidden = lista.length > 0;
  rejilla.innerHTML = lista.map(p => {
    const puesto = carrito.has(p.sku);
    return \`<article class="pieza">
      <div class="foto">\${p.imagen ? \`<img src="\${p.imagen}" alt="\${p.nombre}" loading="lazy">\` : 'Sin foto'}</div>
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
  pintar(document.getElementById('buscar').value);
  actualizarPedido();
}

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

document.getElementById('enviar').onclick = () => {
  // El pedido se manda como mensaje de WhatsApp: no hay servidor que lo
  // reciba, y asi el negocio lo atiende por el canal que ya usa.
  const lineas = [];
  let total = 0;
  for (const [sku, cant] of carrito) {
    const p = DATOS.productos.find(x => x.sku === sku);
    if (!p) continue;
    total += p.precio * cant;
    lineas.push(cant + ' x ' + p.nombre + ' (' + sku + ') - RD$ ' + dinero(p.precio * cant));
  }
  const texto = 'Hola! Quiero hacer este pedido:\\n\\n' + lineas.join('\\n') +
    '\\n\\nTotal: RD$ ' + dinero(total);
  const tel = DATOS.telefonoWhatsapp.replace(/[^0-9]/g, '');
  window.open('https://wa.me/' + tel + '?text=' + encodeURIComponent(texto), '_blank');
};

document.getElementById('buscar').oninput = (e) => pintar(e.target.value);

pintar();
actualizarPedido();
</script>
</body>
</html>`;
}
