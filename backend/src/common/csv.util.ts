/**
 * Convierte filas planas (un objeto = una fila, sus llaves = columnas) a
 * texto CSV, escapando comillas/comas/saltos de linea. Excel lo abre igual
 * que un .xlsx sin necesitar ninguna libreria para generar el formato real.
 */
export function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => {
    const str = String(value ?? '');
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const lines = [
    headers.join(','),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(',')),
  ];
  return lines.join('\n');
}
