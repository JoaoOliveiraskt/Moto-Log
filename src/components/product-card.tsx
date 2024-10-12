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
    include: {
      loja: {
        select: { nome: true; id: true; imagemUrl: true; descricao: true };
      };
    };
  }>;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="relative mb-6">
      <Link href={`/product/${product.id}`}>
        <div className="cursor-pointer h-max overflow-hidden text-foreground">
          <div className="h-48 w-full lg:h-56 rounded-2xl overflow-hidden">
            <Image
              src={product.imagemUrl}
              alt={product.nome}
              width={600}
              height={600}
              priority
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-150"
            />
            {Number(product.porcentagemDesconto) > 0 && (
              <div className="text-black bg-confirmed flex items-center justify-around absolute px-1.5 py-0.5 -top-1.5 -left-1.5 rounded-lg">
                <icon.arrowDown size={18} />
                <span className="text-sm">
                  {Number(product.porcentagemDesconto)}%
                </span>
              </div>
            )}
          </div>
          <div className="min-h-full px-1 py-2 flex flex-col justify-between">
            <h2 className="font-semibold line-clamp-2 lg:line-clamp-1">
              {product.nome}
            </h2>

            <div className="flex flex-col-reverse items-start md:flex-row md:items-center md:gap-2 mt-0.5">
              <span className="font-medium text-sm text-foreground">
                {formatCurrency(Number(calculateTotalPrice(product)))}
              </span>
              {Number(product.porcentagemDesconto) > 0 && (
                <span className="text-xs line-through text-muted-foreground/80 font-medium">
                  {formatCurrency(Number(product.preco))}
                </span>
              )}
            </div>

            <div className="w-fit mt-2">
              <Link
                href={`/store/${product.lojaId}`}
                className="text-foreground font-medium hover:text-cyan-600 mb-2 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-green-500 flex-shrink-0">
                  {product.loja.imagemUrl ? (
                    <Image
                      src={product.loja.imagemUrl}
                      width={1000}
                      height={1000}
                      alt="logo da loja"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="text-sm: md:text-base">{product.loja.nome}</h5>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {product.loja.descricao}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Link>

      <LikeButton className="absolute top-2 right-2 h-7 w-7" />
    </div>
  );
};

export default ProductCard;
