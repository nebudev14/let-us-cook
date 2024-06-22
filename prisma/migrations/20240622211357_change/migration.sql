/*
  Warnings:

  - You are about to drop the `KitchenUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `Kitchen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Kitchen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KitchenUser" DROP CONSTRAINT "KitchenUser_kitchenId_fkey";

-- DropForeignKey
ALTER TABLE "KitchenUser" DROP CONSTRAINT "KitchenUser_userId_fkey";

-- AlterTable
ALTER TABLE "Kitchen" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "KitchenUser";

-- CreateTable
CREATE TABLE "Reservation" (
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("userId","kitchenId")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kitchen" ADD CONSTRAINT "Kitchen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
