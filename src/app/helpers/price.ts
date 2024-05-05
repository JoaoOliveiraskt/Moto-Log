import { Produto } from "prisma/generated/client";

export const calculateTotalPrice = (product: Produto) => {
  if (Number(product.porcentagemDesconto) === 0) {
    return Number(product.preco);
  }

  const discount =
    Number(product.preco) * (Number(product.porcentagemDesconto) / 100);
  return Number(product.preco) - discount;
};

export default calculateTotalPrice;
