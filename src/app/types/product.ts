import type { Produto, Categoria, Loja } from "prisma/generated/client";

export interface Product extends Produto {
  categoria: Categoria;
  loja: Loja;
}