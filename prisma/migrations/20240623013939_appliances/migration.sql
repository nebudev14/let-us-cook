/*
  Warnings:

  - You are about to drop the column `tags` on the `Kitchen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kitchen" DROP COLUMN "tags",
ADD COLUMN     "appliances" TEXT[];
