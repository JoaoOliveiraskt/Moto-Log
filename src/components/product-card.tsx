"use client";

import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "../../prisma/generated/client";
import LikeButton from "./like-button";
import { cn } from "@/lib/utils";
import StoreBadge from "./store-badge";
import TypographySmall from "./typography/typography-small";

interface ProductProps {
  product: Prisma.ProdutoGetPayload<{
    include: {
      categoria: { select: { nome: true } };
      loja: {
        select: { id: true; nome: true; imagemUrl: true; descricao: true };
      };
    };
  }>;
  className?: string;
  showHoverCard?: boolean;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

const ProductCard = ({
  product,
  className,
  showHoverCard,
  align = "start",
  side = "bottom",
}: ProductProps) => {
  const { loja } = product;

  return (
    <div className="relative cursor-pointer h-max overflow-hidden text-foreground md:hover:bg-accent/50 md:dark:hover:bg-accent/30 rounded-2xl md:p-2 transition-all">
      <Link href={`/product/${product.id}`}>
        <div
          className={cn(
            "h-48 w-fulll lg:h-[13rem] rounded-2xl overflow-hidden border",
            className
          )}
        >
          <Image
            src={product.imagemUrl}
            alt={product.nome}
            width={1000}
            height={1000}
            priority
            className="object-cover w-full h-full hover:brightness-75 duration-500 transition-all"
          />
        </div>
        <div className="min-h-full px-1 py-2 flex flex-col justify-between">
          <h2 className="text-sm line-clamp-2 ">{product.nome}</h2>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <Link
              href={`/category/${product.categoriaId}`}
              className="  hover:text-cyan-600 w-fit"
            >
              {product.categoria?.nome}
            </Link>
          </div>

          <div className="flex flex-col items-start mt-2">
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
            <span className="font-bold text-xl text-foreground">
              {formatCurrency(Number(calculateTotalPrice(product)))}
            </span>
          </div>

          <TypographySmall className="text-muted-foreground mt-2">
            {product.totalVendido} vendidos
          </TypographySmall>
        </div>
      </Link>

      <div className="mt-2">
        <StoreBadge
          store={{
            id: loja.id,
            nome: loja.nome,
            imagemUrl: loja.imagemUrl,
            descricao: loja.descricao,
          }}
          showHoverCard={showHoverCard}
          align={align}
          side={side}
        />
      </div>

      <div className="absolute top-[44%] right-2.5 md:right-5 mb-2  h-7 w-7 bg-white flex items-center rounded-full ">
        <LikeButton
          product={{ id: product.id }}
          size={20}
          className="text-black hover:text-black"
        >
          Salvar Produto
        </LikeButton>
      </div>
    </div>
  );
};

export default ProductCard;
