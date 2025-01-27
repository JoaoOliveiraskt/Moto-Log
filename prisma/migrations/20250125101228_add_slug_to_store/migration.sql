/*
  Warnings:

  - You are about to drop the column `views` on the `Loja` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Loja` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Loja" DROP COLUMN "views",
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Loja_slug_key" ON "Loja"("slug");
