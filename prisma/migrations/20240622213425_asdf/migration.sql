/*
  Warnings:

  - Added the required column `payment` to the `Kitchen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kitchen" ADD COLUMN     "payment" "PaymentType" NOT NULL;

-- DropEnum
DROP TYPE "UserStatus";
