import { Decimal } from "@prisma/client/runtime/library";

interface ProductWithDecimals {
  preco: Decimal | number;
  porcentagemDesconto: Decimal | number | null;
  [key: string]: any;
}

export const convertProductDecimals = <T extends ProductWithDecimals>(
  product: T
) => {
  return {
    ...product,
    preco:
      typeof product.preco === "number"
        ? product.preco
        : product.preco.toNumber(),
    porcentagemDesconto: product.porcentagemDesconto
      ? typeof product.porcentagemDesconto === "number"
        ? product.porcentagemDesconto
        : product.porcentagemDesconto.toNumber()
      : 0,
  } as Omit<T, "preco" | "porcentagemDesconto"> & {
    preco: number;
    porcentagemDesconto: number;
  };
};
