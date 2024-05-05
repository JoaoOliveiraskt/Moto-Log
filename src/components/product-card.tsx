"use client";

import Image from "next/image";
import Link from "next/link";
import { Decimal } from "prisma/generated/client/runtime/library";

interface ProductProps {
  product: {
    id: string;
    nome: string;
    imagemUrl: string;
    preco: Decimal;
    loja: {
      nome: string;
    };
  };
}

const ProductCard = ({ product }: ProductProps) => {
  const formatPrice = (price: Decimal) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(price));
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="hover:shadow-lg cursor-pointer rounded-lg overflow-hidden">
        <div className="relative h-32 w-40 md:w-full md:h-48 rounded-lg">
          <Image
            src={product.imagemUrl}
            alt={product.nome}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-2">
          <div className="hover:text-orange-400">
            <h2 className="font-medium line-clamp-1">{product.nome}</h2>
          </div>
          <div>
            <p className="font-bold">{formatPrice(product.preco)}</p>
          </div>
          <div>
            <p className="">{product.loja.nome}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
