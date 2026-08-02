"use strict";
/**
 * Valores que antes eran enums de Postgres.
 *
 * SQLite no soporta enums, asi que en el esquema estos campos son texto. Para
 * no perder seguridad de tipos ni llenar el codigo de cadenas sueltas, aqui se
 * definen como objetos constantes que ademas funcionan como tipo:
 *
 *   Role.ADMIN            -> "ADMIN"     (igual que antes)
 *   function f(r: Role)   -> solo acepta "ADMIN" | "CAJERO" | "CONTABILIDAD"
 *
 * Asi el resto del backend sigue escribiendose exactamente igual que cuando
 * los enums venian de @prisma/client; solo cambia de donde se importan.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESTADOS_PEDIDO = exports.ESTADOS_DEUDA = exports.ESTADOS_FACTURA = exports.METODOS_PAGO = exports.ROLES = exports.EstadoPedido = exports.EstadoDeuda = exports.EstadoFactura = exports.MetodoPago = exports.Role = void 0;
exports.Role = {
    ADMIN: 'ADMIN',
    CAJERO: 'CAJERO',
    CONTABILIDAD: 'CONTABILIDAD',
};
exports.MetodoPago = {
    EFECTIVO: 'EFECTIVO',
    TARJETA: 'TARJETA',
    TRANSFERENCIA: 'TRANSFERENCIA',
    CREDITO: 'CREDITO',
    OTRO: 'OTRO',
};
exports.EstadoFactura = {
    PENDIENTE: 'PENDIENTE',
    GENERADA: 'GENERADA',
    ENVIADA: 'ENVIADA',
    ERROR: 'ERROR',
};
exports.EstadoDeuda = {
    PENDIENTE: 'PENDIENTE',
    PARCIAL: 'PARCIAL',
    PAGADA: 'PAGADA',
    VENCIDA: 'VENCIDA',
};
/**
 * Estados por los que pasa un pedido antes de llegar al cliente. ENTREGADO no
 * llega a guardarse: al marcarlo, el pedido se borra y la factura queda como
 * el registro de la venta (ver orders.service.ts).
 */
exports.EstadoPedido = {
    PENDIENTE: 'PENDIENTE',
    EMPACADO: 'EMPACADO',
    ENTREGADO: 'ENTREGADO',
};
/** Listas para validadores (class-validator `IsIn`) y para recorrer valores. */
exports.ROLES = Object.values(exports.Role);
exports.METODOS_PAGO = Object.values(exports.MetodoPago);
exports.ESTADOS_FACTURA = Object.values(exports.EstadoFactura);
exports.ESTADOS_DEUDA = Object.values(exports.EstadoDeuda);
exports.ESTADOS_PEDIDO = Object.values(exports.EstadoPedido);
