/*
  Warnings:

  - A unique constraint covering the columns `[lojaId]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoriaId]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Produto_lojaId_key" ON "Produto"("lojaId");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_categoriaId_key" ON "Produto"("categoriaId");
