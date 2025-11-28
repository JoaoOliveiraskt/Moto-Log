-- Enable unaccent extension for accent-insensitive search
CREATE EXTENSION IF NOT EXISTS unaccent;

-- AlterTable
ALTER TABLE "Categoria" ALTER COLUMN "searchVector" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Loja" ALTER COLUMN "searchVector" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Produto" ALTER COLUMN "searchVector" DROP DEFAULT;
