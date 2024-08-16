import { Produto } from "../../../prisma/generated/client";

export const calculateTotalPrice = (product: Produto) => {
  const preco = Number(product.preco);
  const porcentagemDesconto = Number(product.porcentagemDesconto);

  if (porcentagemDesconto === 0) {
    return preco;
  }

  const discount = preco * (porcentagemDesconto / 100);
  return preco - discount;
};

export default calculateTotalPrice;
