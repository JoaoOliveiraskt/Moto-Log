"use client";

import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "prisma/generated/client";
import { BsArrowDownShort } from "react-icons/bs";

interface ProductProps {
  product: Prisma.ProdutoGetPayload<{
    include: { loja: { select: { nome: true } } };
  }>;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="hover:shadow-md cursor-pointer rounded-lg h-64 overflow-hidden">
        <div className="relative h-32 w-full md:h-48">
          <Image
            src={product.imagemUrl}
            alt={product.nome}
            fill
            className="object-cover"
          />
          {Number(product.porcentagemDesconto) > 0 && (
            <div className="flex items-center justify-center absolute px-1 top-2 left-2 bg-red-500 text-primary-foreground rounded-2xl">
              <BsArrowDownShort size={20} />
              <span className="text-sm">
                {Number(product.porcentagemDesconto)}%
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between p-2">
          <div className="hover:text-orange-400">
            <h2 className="font-medium line-clamp-1">{product.nome}</h2>
          </div>
          <div>
            <div className="flex gap-4">
              <h3 className="font-bold">
                {formatCurrency(calculateTotalPrice(product))}
              </h3>
            </div>
            {Number(product.porcentagemDesconto) > 0 && (
              <p className="text-sm line-through text-muted-foreground">
                {formatCurrency(Number(product.preco))}
              </p>
            )}
          </div>
          <div>
            <p className="">{product.loja.nome}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
