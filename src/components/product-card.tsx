"use client";

import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "../../prisma/generated/client";
import { BsArrowDownShort } from "react-icons/bs";

interface ProductProps {
  product: Prisma.ProdutoGetPayload<{
    include: { loja: { select: { nome: true; id: true } } };
  }>;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Link className="" href={`/product/${product.id}`}>
      <div className="cursor-pointer rounded-lg h-64 sm:h-80 overflow-hidden text-foreground hover:hover:text-orange-400 transition">
        <div className="relative h-32 w-full md:h-48">
          <Image
            src={product.imagemUrl}
            alt={product.nome}
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
          {Number(product.porcentagemDesconto) > 0 && (
            <div className="flex items-center justify-around absolute px-2 top-2 left-2 bg-gradient-to-br from-indigo-800 to-cyan-600 text-destructive-foreground rounded-2xl">
              <BsArrowDownShort size={20} />
              <span className="text-sm">
                {Number(product.porcentagemDesconto)}%
              </span>
            </div>
          )}
        </div>
        <div className="h-full flex flex-col gap-2 p-2 ">
          <div className="">
            <h2 className="font-medium line-clamp-1">{product.nome}</h2>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-muted-foreground">
              <h3 className="font-bold">
                {formatCurrency(calculateTotalPrice(product))}
              </h3>
            </div>
            {Number(product.porcentagemDesconto) > 0 && (
              <p className="text-sm line-through text-muted-foreground/80 font-medium">
                {formatCurrency(Number(product.preco))}
              </p>
            )}
          </div>
          <Link
            href={`/store/${product.lojaId}`}
            className="text-muted-foreground font-medium hover:text-blue-600"
          >
            <p>{product.loja.nome}</p>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
