-- CreateEnum
CREATE TYPE "EstadoPedido" AS ENUM ('PENDIENTE', 'EMPACADO', 'ENTREGADO');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "estado" "EstadoPedido" NOT NULL DEFAULT 'PENDIENTE',
    "fecha_entrega" TIMESTAMP(3),
    "notas" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_sale_id_key" ON "orders"("sale_id");

-- CreateIndex
CREATE INDEX "orders_estado_idx" ON "orders"("estado");

-- CreateIndex
CREATE INDEX "orders_fecha_entrega_idx" ON "orders"("fecha_entrega");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
