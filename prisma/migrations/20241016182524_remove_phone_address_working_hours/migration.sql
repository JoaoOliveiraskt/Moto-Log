/*
  Warnings:

  - You are about to drop the column `endereco` on the `Loja` table. All the data in the column will be lost.
  - You are about to drop the column `horarioFuncionamento` on the `Loja` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Loja` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Loja" DROP COLUMN "endereco",
DROP COLUMN "horarioFuncionamento",
DROP COLUMN "telefone";
