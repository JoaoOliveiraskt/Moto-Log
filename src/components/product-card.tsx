"use client";

import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "../../prisma/generated/client";
import { BsArrowDownShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { Button } from "./ui/button";
import { ToastAction } from "./ui/toast";
import { toast } from "./ui/use-toast";
interface ProductProps {
  product: Prisma.ProdutoGetPayload<{
    include: { loja: { select: { nome: true; id: true } } };
  }>;
}

const ProductCard = ({ product }: ProductProps) => {
  const showLikedToast = () => {
    toast({
      title: "Produto adicionado aos favoritos",
      icon: <BiLike size={20} />,
    });
  };

  return (
    <div className="relative">
      <Link href={`/product/${product.id}`}>
        <div className="cursor-pointer rounded-lg h-64 sm:h-auto overflow-hidden text-foreground">
          <div className="h-32 w-full md:h-60 overflow-hidden">
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
                <BsArrowDownShort size={20} />
                <span className="text-sm">
                  {Number(product.porcentagemDesconto)}%
                </span>
              </div>
            )}
          </div>
          <div className="h-full flex flex-col gap-2 p-2 ">
            <div>
              <h2 className="font-medium line-clamp-1">{product.nome}</h2>
            </div>
            <Link
              href={`/store/${product.lojaId}`}
              className="text-muted-foreground font-medium hover:text-lime-600 w-fit"
            >
              <p>{product.loja.nome}</p>
            </Link>
            <div className="flex gap-2 items-center">
              <div>
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
          </div>
        </div>
      </Link>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={showLikedToast}
        className="flex items-center justify-center absolute top-2 right-2 rounded-full"
      >
        <BiLike size={14} />
      </Button>
    </div>
  );
};

export default ProductCard;
