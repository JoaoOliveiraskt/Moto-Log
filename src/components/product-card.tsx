import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Produto, Loja, Categoria } from "../../prisma/generated/client";
import { memo } from "react";
import { Badge } from "./ui/badge";
import Icon from "@/components/icons/icon-component";

interface ProductProps {
  product: Produto & {
    categoria: Categoria;
    loja: Loja;
  };
  className?: string;
  imageClassName?: string;
  infoClassName?: string;
  titleClassName?: string;
}

const ProductCard = memo(({
  product,
  className,
  imageClassName,
  infoClassName,
  titleClassName,
}: ProductProps) => {
  const { loja } = product;
  const totalPrice = calculateTotalPrice(product);

  const isCustomLayout = !!imageClassName || !!infoClassName || !!titleClassName;

  return (
    <Link href={`/product/${product.id}`} className={cn("group block relative w-full h-full transform-gpu will-change-transform", className)}>
      <div className={cn(
        "relative w-full overflow-hidden rounded-2xl shadow-sm transition-all duration-500 group-hover:shadow-md will-change-transform",
        isCustomLayout ? "aspect-[2/3] lg:aspect-[3/2]" : "aspect-[2/3]"
      )}>
        <Image
          src={product.imagemUrl}
          alt={product.nome}
          fill
          className="object-cover group-hover:brightness-90 transition-all duration-200"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
          {loja.profileImageUrl ? (
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image src={loja.profileImageUrl} alt={loja.nome} fill className="object-cover" />
            </div>
          ) : (
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-card flex items-center justify-center">
              <Icon.store className="object-cover text-muted-foreground" size={12} />
            </div>
          )}

          {Number(product.porcentagemDesconto) > 0 && (
            <Badge className="px-1 py-0 rounded-[6px] text-[10px] lg:text-[10.5px] font-extrabold border border-white/15">
              {Number(product.porcentagemDesconto)}% OFF
            </Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />


          <div className="relative pt-12 px-3 pb-3 flex flex-col justify-end h-full gap-1">
            <h3 className="text-base leading-snug font-medium tracking-tight text-white/90 line-clamp-2">
              {product.nome}
            </h3>

            <span className="text-lg font-bold tracking-tight text-white">
              {formatCurrency(Number(totalPrice))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
