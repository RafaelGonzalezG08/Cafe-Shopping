-- AlterTable
ALTER TABLE "products" ADD COLUMN "costo_unitario" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "sale_items" ADD COLUMN "costo_unitario" DECIMAL(10,2) NOT NULL DEFAULT 0;
