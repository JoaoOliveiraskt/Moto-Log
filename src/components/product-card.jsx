"use client";

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
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
            <p className="font-bold">R$ {product.preco},00</p>
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
