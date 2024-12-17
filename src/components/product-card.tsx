"use client";

import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Prisma } from "../../prisma/generated/client";
import LikeButton from "./like-button";
import { cn } from "@/lib/utils";
import StoreBadge from "./store-badge";
import TypographySmall from "./typography/typography-small";
import { Produto, Loja, Categoria } from "../../prisma/generated/client";
import TypographyH4 from "./typography/typography-h4";
import TypographyP from "./typography/typography-p";

interface ProductProps {
  product: Produto & {
    categoria: Categoria;
    loja: Loja;
  };
  className?: string;
}

const ProductCard = ({ product, className }: ProductProps) => {
  const { loja } = product;

  return (
    <div
      className={cn(
        "h-max w-full  max-w-72 overflow-hidden text-foreground ",
        "md:hover:bg-accent/50 md:dark:hover:bg-accent/30 rounded-2xl md:px-2 md:pt-2",
        className
      )}
    >
      <div className="relative">
        <Link href={`/product/${product.id}`} className="block ">
          <div
            className={cn(
              "h-56  w-full lg:h-[13rem] rounded-2xl overflow-hidden bg-accent shadow-lg"
            )}
          >
            <Image
              src={product.imagemUrl}
              alt={product.nome}
              width={1000}
              height={1000}
              priority
              quality={80}
              className="object-cover w-full h-full hover:brightness-75 duration-500 transition-all"
            />
          </div>
        </Link>

        {/*<div className="absolute bottom-2.5 right-2.5 h-7 w-7 bg-white flex items-center rounded-full">
          <LikeButton
            product={{ id: product.id }}
            size={20}
            className="text-black hover:text-black"
          >
            Salvar Produto
          </LikeButton>
        </div>
        */}
      </div>

      <div className="min-h-full px-1 py-2 flex flex-col justify-between">
        <Link href={`/product/${product.id}`} className="">
          <TypographyP className="text-sm line-clamp-1">{product.nome}</TypographyP>
        </Link>

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

        <div className="mt-2">
          <StoreBadge
            store={{
              id: loja.id,
              nome: loja.nome,
              imagemUrl: loja.imagemUrl || "",
              descricao: loja.descricao || "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
