/*
  Warnings:

  - You are about to drop the column `payment` on the `Kitchen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kitchen" DROP COLUMN "payment";

-- DropEnum
DROP TYPE "PaymentType";
