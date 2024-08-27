"use client";

import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "../../prisma/generated/client";
import icon from "@/components/icons/icon-component";
import LikeButton from "./like-button";

interface ProductProps {
  product: Prisma.ProdutoGetPayload<{
    include: { loja: { select: { nome: true; id: true } } };
  }>;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="relative">
      <Link href={`/product/${product.id}`}>
        <div className="cursor-pointer rounded-lg h-auto overflow-hidden text-foreground">
          <div className="h-48 w-full lg:h-56 rounded-md overflow-hidden">
            <Image
              src={product.imagemUrl}
              alt={product.nome}
              width={1000}
              height={1000}
              priority
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-150"
            />
            {Number(product.porcentagemDesconto) > 0 && (
              <div className="text-black bg-lime-600 flex items-center justify-around absolute px-2 top-2 left-2 bg-foreground rounded-2xl">
                <icon.arrowDown size={18} />
                <span className="text-sm">
                  {Number(product.porcentagemDesconto)}%
                </span>
              </div>
            )}
          </div>
          <div className="h-full p-2">
            <h2 className="font-medium line-clamp-2">{product.nome}</h2>

            <div className="w-fit">
              <Link
                href={`/store/${product.lojaId}`}
                className="text-muted-foreground font-medium hover:text-lime-600  mb-2"
              >
                <h3 className="text-sm ">{product.loja.nome}</h3>
              </Link>
            </div>

            <div className="flex gap-2 items-center">
              <span className="font-bold">
                {formatCurrency(Number(calculateTotalPrice(product)))}
              </span>

              {Number(product.porcentagemDesconto) > 0 && (
                <span className="text-sm line-through text-muted-foreground/80 font-medium">
                  {formatCurrency(Number(product.preco))}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <LikeButton className="absolute top-2 right-2 h-7 w-7" size={14} />
    </div>
  );
};

export default ProductCard;
