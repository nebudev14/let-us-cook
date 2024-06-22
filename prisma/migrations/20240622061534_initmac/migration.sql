-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('HOST', 'CHEF');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('MONEY', 'FOOD');

-- CreateEnum
CREATE TYPE "KitchenType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "Kitchen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "tags" TEXT[],
    "type" "KitchenType" NOT NULL,

    CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitchenUser" (
    "userId" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,
    "payment" "PaymentType" NOT NULL,
    "status" "UserStatus" NOT NULL,

    CONSTRAINT "KitchenUser_pkey" PRIMARY KEY ("userId","kitchenId")
);

-- CreateTable
CREATE TABLE "Review" (
    "rating" DECIMAL(65,30) NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("userId","kitchenId")
);

-- AddForeignKey
ALTER TABLE "KitchenUser" ADD CONSTRAINT "KitchenUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitchenUser" ADD CONSTRAINT "KitchenUser_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
