/*
  Warnings:

  - You are about to drop the column `followers` on the `Loja` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Loja" DROP COLUMN "followers";

-- CreateTable
CREATE TABLE "Follows" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lojaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follows_userId_lojaId_key" ON "Follows"("userId", "lojaId");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
