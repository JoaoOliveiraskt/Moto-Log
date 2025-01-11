"use client";

import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";
import StoreBadge from "./store-badge";
import TypographySmall from "./typography/typography-small";
import { Produto, Loja, Categoria } from "../../prisma/generated/client";
import TypographyP from "./typography/typography-p";
import FavoriteProductButton from "./favorite-product-button";

interface ProductProps {
  product: Produto & {
    categoria: Categoria;
    loja: Loja;
  };
  className?: string;
  imageClassName?: string;
  showStoreImage?: boolean;
  infoClassName?: string;
  titleClassName?: string;
}

const ProductCard = ({
  product,
  className,
  imageClassName,
  showStoreImage,
  infoClassName,
  titleClassName,
}: ProductProps) => {
  const { loja } = product;

  return (
    <div
      className={cn(
        "h-[21.85rem] w-full max-w-72 overflow-hidden text-foreground",
        "md:hover:bg-accent md:dark:hover:bg-accent/30 rounded-2xl md:px-2 md:pb-2 md:pt-2",
        className
      )}
    >
      <div className="relative">
        <Link href={`/product/${product.id}`} className="block ">
          <div
            className={cn(
              "h-56 w-full lg:h-[13rem] rounded-xl overflow-hidden bg-accent shadow-lg",
              imageClassName
            )}
          >
            <Image
              src={product.imagemUrl}
              alt={product.nome}
              width={1000}
              height={1000}
              priority
              quality={80}
              className={cn(
                "object-cover w-full h-full brightness-90 hover:brightness-100 duration-500 transition-opacity"
              )}
            />
          </div>
        </Link>

        {/*<div className="absolute bottom-2.5 right-2.5 flex items-center">
          <FavoriteProductButton
            product={{ id: product.id }}
            size={20}
            
       />
        </div>*/}
     
      </div>

      <div
        className={cn(
          "h-fit py-2 flex flex-col justify-between",
          infoClassName
        )}
      >
        <Link href={`/product/${product.id}`} className="">
          <TypographyP
            className={cn("text-sm font-semibold line-clamp-1", titleClassName)}
          >
            {product.nome}
          </TypographyP>
        </Link>

        <div className="flex flex-col items-start mt-1">
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
          <span className="text-sm text-foreground">
            {formatCurrency(Number(calculateTotalPrice(product)))}
          </span>
        </div>

        <TypographySmall className="text-muted-foreground mt-1">
          {product.totalVendido} vendidos
        </TypographySmall>

        <div className="mt-auto pt-3">
          <StoreBadge
            showImage={showStoreImage}
            store={{
              id: loja.id,
              nome: loja.nome,
              imagemUrl: loja.imagemUrl || "",
              descricao: loja.descricao || "",
            }}
            followers={410}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
