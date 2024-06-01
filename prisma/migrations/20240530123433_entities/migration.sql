/*
  Warnings:

  - You are about to drop the column `isLoggen` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "isLoggen",
ADD COLUMN     "isLoggedIn" BOOLEAN NOT NULL DEFAULT false;
