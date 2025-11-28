-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN "searchVector" TSVECTOR GENERATED ALWAYS AS (setweight(to_tsvector('portuguese', coalesce(nome, '')), 'A')) STORED;

-- AlterTable
ALTER TABLE "Loja" ADD COLUMN "searchVector" TSVECTOR GENERATED ALWAYS AS (setweight(to_tsvector('portuguese', coalesce(nome, '')), 'A') || setweight(to_tsvector('portuguese', coalesce(descricao, '')), 'B')) STORED;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN "searchVector" TSVECTOR GENERATED ALWAYS AS (setweight(to_tsvector('portuguese', coalesce(nome, '')), 'A') || setweight(to_tsvector('portuguese', coalesce(descricao, '')), 'B')) STORED;

-- CreateIndex
CREATE INDEX "Categoria_searchVector_idx" ON "Categoria" USING GIN ("searchVector");

-- CreateIndex
CREATE INDEX "Loja_searchVector_idx" ON "Loja" USING GIN ("searchVector");

-- CreateIndex
CREATE INDEX "Produto_searchVector_idx" ON "Produto" USING GIN ("searchVector");
