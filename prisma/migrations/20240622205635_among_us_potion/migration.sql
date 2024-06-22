/*
  Warnings:

  - Added the required column `location` to the `Kitchen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kitchen" ADD COLUMN     "location" TEXT NOT NULL;
