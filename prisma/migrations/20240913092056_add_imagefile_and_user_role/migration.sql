/*
  Warnings:

  - Added the required column `userId` to the `Loja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loja" ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "imagemFile" TEXT,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "imagemUrl" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Loja" ADD CONSTRAINT "Loja_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
