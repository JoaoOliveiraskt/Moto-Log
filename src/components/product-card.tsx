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
      categoria: { select: { nome: true } };
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
          <div className="h-48 w-full lg:h-[17rem] rounded-2xl overflow-hidden border">
            <Image
              src={product.imagemUrl}
              alt={product.nome}
              width={600}
              height={600}
              priority
              className="object-cover w-full h-full hover:scale-105  duration-500 transition-all"
            />
          </div>
          <div className="min-h-full px-1 py-2 flex flex-col justify-between">
            <h3 className="text-xs text-muted-foreground font-medium">
              {product.categoria?.nome}
            </h3>

            <h2 className="font-bold line-clamp-2 lg:line-clamp-1">
              {product.nome}
            </h2>

            <div className="flex flex-col-reverse items-start md:flex-row md:items-center md:gap-2 mt-0.5">
              <span className="font-medium text-sm text-foreground">
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

            <div className="w-fit mt-2">
              <Link
                href={`/store/${product.lojaId}`}
                className="text-foreground font-medium hover:text-cyan-600 mb-2 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-md border overflow-hidden flex-shrink-0">
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
                  <h5 className="text-sm: md:text-base ">
                    {product.loja.nome}
                  </h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Link>

      <div className="absolute top-2 right-2 h-7 w-7 bg-white flex items-center rounded-full ">
        <LikeButton size={20} className="text-black hover:text-black" />
      </div>
    </div>
  );
};

export default ProductCard;
