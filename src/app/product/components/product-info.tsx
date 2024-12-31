import type { Product } from "@/app/types/product";
import Icon from "@/components/icons/icon-component";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-wrap justify-between sm:justify-start gap-x-4 lg:gap-x-8 gap-y-4 text-sm">
      <div className="flex flex-col items-start gap-y-1">
        <div className="flex items-center space-x-1">
          <span className="">4,8</span>
          <Icon.star size={10} />
        </div>

        <span className="text-muted-foreground text-xs sm:text-sm">
          13,2 mi avaliações
        </span>
      </div>
      <div className="flex flex-col items-start gap-y-1">
        <span className="">{product.totalVendido}</span>
        <span className="text-muted-foreground text-xs sm:text-sm">
          Vendidos
        </span>
      </div>
      <div className="flex flex-col items-start gap-y-1">
        <span className="">{product.estoque}</span>
        <span className="text-muted-foreground text-xs sm:text-sm">
          Em estoque
        </span>
      </div>
      <div className="flex flex-col items-start gap-y-1">
        <Icon.delivery size={20} />
        <span className="text-muted-foreground text-xs sm:text-sm">
          Entrega grátis
        </span>
      </div>
    </div>
  );
}
