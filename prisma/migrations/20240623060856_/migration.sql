/*
  Warnings:

  - You are about to alter the column `cost` on the `Kitchen` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Kitchen" ALTER COLUMN "cost" SET DATA TYPE DOUBLE PRECISION;
