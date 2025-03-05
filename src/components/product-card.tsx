import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Link from "next/link";
import { cn } from "@/lib/utils";
import StoreBadge from "./store-badge";
import TypographySmall from "./typography/typography-small";
import { Produto, Loja, Categoria } from "../../prisma/generated/client";
import TypographyP from "./typography/typography-p";
import ProductCardBanner from "./product-card-banner";

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
        "h-[22rem] lg:h-[22.5rem] w-full max-w-72 overflow-hidden text-foreground",
        "lg:hover:bg-accent lg:dark:hover:bg-accent/30 rounded-2xl lg:p-2",
        className
      )}
    >
      <ProductCardBanner
        product={{
          id: product.id,
          imagemUrl: product.imagemUrl,
          nome: product.nome,
          porcentagemDesconto: Number(product.porcentagemDesconto),
        }}
        imageClassName={imageClassName}
      />

      <div
        className={cn(
          "h-fit py-2 flex flex-col justify-between",
          infoClassName
        )}
      >
        <Link href={`/product/${product.id}`} className="">
          <TypographyP
            title={product.nome}
            className={cn("text-sm font-semibold line-clamp-1", titleClassName)}
          >
            {product.nome}
          </TypographyP>
        </Link>

        <div className="flex items-center mt-1 gap-x-2">
          <span className="text-sm text-foreground font-medium">
            {formatCurrency(Number(calculateTotalPrice(product)))}
          </span>
          {Number(product.porcentagemDesconto) > 0 && (
            <span className="text-xs line-through text-muted-foreground mt-0.5">
              {formatCurrency(Number(product.preco))}
            </span>
          )}
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
              profileImageUrl: loja.profileImageUrl || "",
              descricao: loja.descricao || "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
