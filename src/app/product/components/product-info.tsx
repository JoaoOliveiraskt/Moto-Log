import Icon from "@/components/icons/icon-component";

interface ProductInfoProps {
  product: {
    totalVendido: number | null;
    estoque: number;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-wrap justify-between sm:justify-start gap-x-4 lg:gap-x-6 text-sm">
      <div className="flex items-center gap-x-1 text-xs sm:text-sm">
        <span className="">{product.totalVendido}</span>
        <span className=" ">Vendidos</span>
      </div>
      <div className="flex items-center gap-x-1 text-xs sm:text-sm">
        <span>{product.estoque}</span>
        <span>Em estoque</span>
      </div>
      <div className="flex items-center gap-x-1 ts">
        <Icon.delivery size={18} />
        <span className=" text-xs sm:text-sm">Entrega grátis</span>
      </div>
    </div>
  );
}
