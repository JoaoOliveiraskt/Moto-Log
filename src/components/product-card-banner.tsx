"use client";

import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { cn } from "@/lib/utils";

interface Props {
  product: {
    id: string;
    imagemUrl: string;
    nome: string;
    porcentagemDesconto: number | null;
  };
  imageClassName?: string;
}

export default function ProductCardBanner({ product, imageClassName }: Props) {
  return (
    <div className="relative">
      {product.porcentagemDesconto && product.porcentagemDesconto > 0 ? (
        <span className="bg-accent/90 text-foreground px-2 h-fit font-medium flex items-center justify-center rounded-sm text-xs absolute left-2 top-2 uppercase">
          {Number(product.porcentagemDesconto)}% off
        </span>
      ) : null}
      <Link
        href={`/product/${product.id}`}
        className="block "
        onMouseEnter={() => router.prefetch(`/product/${product.id}`)}
      >
        <div
          className={cn(
            "h-72 w-full rounded-2xl overflow-hidden bg-accent",
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
              "object-cover w-full h-full duration-500 transition-opacity"
            )}
          />
        </div>
      </Link>
    </div>
  );
}
