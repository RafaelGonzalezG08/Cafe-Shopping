import { Prisma } from '@prisma/client';

type SaleWithRelations = Prisma.SaleGetPayload<{
  include: { items: true; client: true; user: { select: { nombre: true } }; payments: true };
}>;

interface BusinessInfo {
  nombre: string;
  logoUrl?: string | null;
  direccion?: string | null;
  identifFiscal?: string | null;
}

const money = (value: Prisma.Decimal | number) =>
  Number(value).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fecha = (date: Date) =>
  new Date(date).toLocaleDateString('es-DO', {
    dateStyle: 'long',
    timeZone: 'America/Santo_Domingo',
  });

const METODO_LABEL: Record<string, string> = {
  EFECTIVO: 'Efectivo',
  TARJETA: 'Tarjeta',
  TRANSFERENCIA: 'Transferencia',
  CREDITO: 'Credito',
  OTRO: 'Otro',
};

/**
 * Genera el HTML de la factura. Ancho angosto tipo recibo (380px) para que se
 * vea bien tanto en la vista previa del POS como al recibirla en WhatsApp en
 * un telefono (evita franjas negras arriba/abajo por ser demasiado ancha).
 *
 * Si la venta tiene pagos/abonos registrados (tipico de ventas a credito),
 * se agrega una seccion con el historial de abonos y el saldo pendiente, de
 * forma que la factura (PNG/PDF) siempre refleje el estado real de la cuenta.
 */
export function renderInvoiceHtml(
  sale: SaleWithRelations,
  numero: string,
  business: BusinessInfo,
): string {
  const itemsRows = sale.items
    .map(
      (item) => `
        <tr>
          <td class="desc">${escapeHtml(item.descripcion)}</td>
          <td class="num">${item.cantidad}</td>
          <td class="num">${money(item.precioUnitario)}</td>
          <td class="num">${money(item.total)}</td>
        </tr>`,
    )
    .join('');

  const totalPagado = sale.payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const saldoPendiente = Math.max(0, Number(sale.total) - totalPagado);
  const esCredito = sale.metodoPago === 'CREDITO';
  const mostrarPagos = esCredito || sale.payments.length > 0;
  const cuentaSaldada = saldoPendiente <= 0.01;

  const pagosRows = sale.payments
    .map(
      (p) => `
        <tr>
          <td>${fecha(p.fecha)}</td>
          <td>${METODO_LABEL[p.metodo] ?? p.metodo}</td>
          <td class="num">${money(p.amount)}</td>
        </tr>`,
    )
    .join('');

  const pagosSection = mostrarPagos
    ? `
    <div class="section-title" style="margin-top: 14px;">Abonos</div>
    ${
      sale.payments.length > 0
        ? `<table>
            <thead><tr><th>Fecha</th><th>Metodo</th><th class="num">Monto</th></tr></thead>
            <tbody>${pagosRows}</tbody>
          </table>`
        : `<div style="font-size: 12.5px; color: #5C5245; margin-bottom: 10px;">Sin abonos registrados todavia.</div>`
    }
    <div class="saldo-box ${cuentaSaldada ? 'saldo-ok' : 'saldo-pendiente'}">
      ${
        cuentaSaldada
          ? '&#10003; CUENTA SALDADA'
          : `SALDO PENDIENTE: RD$ ${money(saldoPendiente)}`
      }
    </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #15120D;
    background: #FAF8F3;
  }
  .ticket {
    width: 380px;
    margin: 0 auto;
    background: #FFFFFF;
    padding: 24px 22px 20px;
    border: 1px solid #E1D6BF;
    position: relative;
  }
  .logo-corner { position: absolute; top: 20px; left: 20px; width: 42px; height: 42px; object-fit: contain; border-radius: 8px; }
  .header { text-align: center; border-bottom: 3px solid #C4900D; padding-bottom: 14px; margin-bottom: 18px; }
  .brand { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .brand-name { font-size: 19px; font-weight: 700; letter-spacing: -0.01em; }
  .brand-meta { font-size: 11px; color: #5C5245; }
  .invoice-meta { margin-top: 10px; font-size: 11px; color: #5C5245; }
  .invoice-number { font-size: 15px; font-weight: 700; color: #C4900D; }
  .section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #8A8172; margin-bottom: 4px; }
  .client-block { margin-bottom: 16px; font-size: 12.5px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
  thead th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; color: #8A8172; padding: 6px 3px; border-bottom: 2px solid #E1D6BF; }
  thead th.num, td.num { text-align: right; }
  tbody td { padding: 7px 3px; font-size: 12.5px; border-bottom: 1px dashed #E1D6BF; }
  td.desc { max-width: 140px; }
  .totals { width: 200px; margin-left: auto; font-size: 12.5px; }
  .totals-row { display: flex; justify-content: space-between; padding: 3px 0; }
  .totals-row.total { font-size: 16px; font-weight: 700; border-top: 2px solid #15120D; margin-top: 6px; padding-top: 8px; color: #C4900D; }
  .footer { margin-top: 20px; padding-top: 12px; border-top: 1px dashed #E1D6BF; font-size: 10.5px; color: #8A8172; text-align: center; }
  .metodo-pago { display: inline-block; background: #EFE8DA; color: #785705; font-size: 10.5px; padding: 3px 10px; border-radius: 999px; margin-top: 5px; }
  .saldo-box { margin-top: 8px; padding: 9px 10px; border-radius: 8px; font-size: 13px; font-weight: 700; text-align: center; }
  .saldo-box.saldo-ok { background: #D2ECDD; color: #075136; }
  .saldo-box.saldo-pendiente { background: #FBF2DC; color: #785705; }
</style>
</head>
<body>
  <div class="ticket">
    ${business.logoUrl ? `<img class="logo-corner" src="${escapeHtml(business.logoUrl)}" alt="logo" />` : ''}
    <div class="header">
      <div class="brand">
        <div class="brand-name">${escapeHtml(business.nombre)}</div>
        ${business.direccion ? `<div class="brand-meta">${escapeHtml(business.direccion)}</div>` : ''}
        ${business.identifFiscal ? `<div class="brand-meta">RNC/ID Fiscal: ${escapeHtml(business.identifFiscal)}</div>` : ''}
      </div>
      <div class="invoice-meta">
        <div class="invoice-number">${escapeHtml(numero)}</div>
        <div>${fecha(sale.fecha)}</div>
        <div class="metodo-pago">${METODO_LABEL[sale.metodoPago] ?? sale.metodoPago}</div>
      </div>
    </div>

    <div class="client-block">
      <div class="section-title">Cliente</div>
      <div>${escapeHtml(sale.client?.nombre ?? 'Consumidor final')}</div>
      ${sale.client?.telefono ? `<div>${escapeHtml(sale.client.telefono)}</div>` : ''}
    </div>

    <table>
      <thead>
        <tr>
          <th>Descripcion</th>
          <th class="num">Cant.</th>
          <th class="num">P. Unit.</th>
          <th class="num">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <div class="totals">
      <div class="totals-row"><span>Subtotal</span><span>${money(sale.subtotal)}</span></div>
      <div class="totals-row"><span>Impuestos</span><span>${money(sale.impuestos)}</span></div>
      <div class="totals-row total"><span>Total</span><span>${money(sale.total)}</span></div>
    </div>

    ${pagosSection}

    <div class="footer">
      Atendido por ${escapeHtml(sale.user?.nombre ?? '-')} &middot; Gracias por su compra
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
