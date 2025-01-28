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
  };
  imageClassName?: string;
}

export default function ProductCardBanner({ product, imageClassName }: Props) {
  return (
    <div className="relative">
      <Link
        href={`/product/${product.id}`}
        className="block "
        onMouseEnter={() => router.prefetch(`/product/${product.id}`)}
      >
        <div
          className={cn(
            "h-56 w-full lg:h-[13rem] rounded-xl overflow-hidden bg-accent",
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
