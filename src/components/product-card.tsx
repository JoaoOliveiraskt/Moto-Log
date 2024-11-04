"use client";

import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "../../prisma/generated/client";
import LikeButton from "./like-button";
import { cn } from "@/lib/utils";
import StoreBadge from "./store-badge";

interface ProductProps {
  product: Prisma.ProdutoGetPayload<{
    include: {
      categoria: { select: { nome: true } };
      loja: {
        select: { nome: true; id: true; imagemUrl: true; descricao: true };
      };
    };
  }>;
  className?: string;
}

const ProductCard = ({ product, className }: ProductProps) => {
  return (
    <div className="relative mb-6">
      <Link href={`/product/${product.id}`}>
        <div className="cursor-pointer h-max overflow-hidden text-foreground md:hover:bg-accent/50 md:dark:hover:bg-accent/30 rounded-2xl md:p-2 transition-all">
          <div
            className={cn(
              "h-48 w-full lg:h-[13rem] rounded-2xl overflow-hidden border",
              className
            )}
          >
            <Image
              src={product.imagemUrl}
              alt={product.nome}
              width={1000}
              height={1000}
              priority
              className="object-cover w-full h-full hover:scale-105 duration-500 transition-all"
            />
          </div>
          <div className="min-h-full px-1 py-2 flex flex-col justify-between">
            <h2 className="text-sm line-clamp-2 ">{product.nome}</h2>
            <Link
              href={`/category/${product.categoriaId}`}
              className="text-xs text-muted-foreground  hover:text-cyan-600 w-fit"
            >
              {product.categoria?.nome}
            </Link>

            <div className="flex flex-col items-start mt-0.5">
              <span className="font-bold text- text-foreground">
                {formatCurrency(Number(calculateTotalPrice(product)))}
              </span>
              {Number(product.porcentagemDesconto) > 0 && (
                <div className="flex gap-2">
                  <span className="text-xs line-through text-muted-foreground font-medium">
                    {formatCurrency(Number(product.preco))}
                  </span>
                  <span className="text-xs text-confirmed">
                    {Number(product.porcentagemDesconto)}% OFF
                  </span>
                </div>
              )}
            </div>

            <div>
              {/* @ts-ignore */}
              <StoreBadge product={product} />
            </div>
          </div>
        </div>
      </Link>

      <div className="absolute top-3 right-3 h-7 w-7 bg-white flex items-center rounded-full ">
        <LikeButton
          product={{ id: product.id }}
          size={20}
          className="text-black hover:text-black"
        />
      </div>
    </div>
  );
};

export default ProductCard;
