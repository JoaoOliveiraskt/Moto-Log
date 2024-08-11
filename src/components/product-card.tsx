"use client";

import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "../../prisma/generated/client";
import { BsArrowDownShort } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
interface ProductProps {
  product: Prisma.ProdutoGetPayload<{
    include: { loja: { select: { nome: true; id: true } } };
  }>;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Link className="" href={`/product/${product.id}`}>
      <div className="cursor-pointer rounded-lg h-64 sm:h-80 overflow-hidden text-foreground  transition border border-transparent hover:border-border">
        <div className="relative h-32 w-full md:h-48">
          <Image
            src={product.imagemUrl}
            alt={product.nome}
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
          {Number(product.porcentagemDesconto) > 0 && (
            <div className="flex items-center justify-around absolute px-2 top-2 left-2 bg-background/75 dark:bg-background/70 backdrop-blur-3xl rounded-2xl">
              <BsArrowDownShort size={20} />
              <span className="text-sm">
                {Number(product.porcentagemDesconto)}%
              </span>
            </div>
          )}
          <div className="flex items-center justify-around absolute p-1 top-2 right-2 bg-background/75 dark:bg-background/70 backdrop-blur-3xl rounded-full">
            <IoMdHeartEmpty size={18} />
          </div>
        </div>
        <div className="h-full flex flex-col gap-2 p-2 ">
          <div className="">
            <h2 className="font-medium line-clamp-1">{product.nome}</h2>
          </div>
          <Link
            href={`/store/${product.lojaId}`}
            className="text-muted-foreground font-medium hover:text-lime-600 w-fit"
          >
            <p>{product.loja.nome}</p>
          </Link>
          <div className="flex gap-2 items-center">
            <div className="">
              <h3 className="font-bold text-lime-600">
                {formatCurrency(calculateTotalPrice(product))}
              </h3>
            </div>
            {Number(product.porcentagemDesconto) > 0 && (
              <p className="text-sm line-through text-muted-foreground/80 font-medium">
                {formatCurrency(Number(product.preco))}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
