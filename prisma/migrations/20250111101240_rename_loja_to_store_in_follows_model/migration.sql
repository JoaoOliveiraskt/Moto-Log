/*
  Warnings:

  - You are about to drop the column `lojaId` on the `Follows` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,storeId]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storeId` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_lojaId_fkey";

-- DropIndex
DROP INDEX "Follows_userId_lojaId_key";

-- AlterTable
ALTER TABLE "Follows" DROP COLUMN "lojaId",
ADD COLUMN     "storeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Follows_userId_storeId_key" ON "Follows"("userId", "storeId");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Loja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
