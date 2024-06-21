import { Prisma } from "../../../../prisma/generated/client";

interface DiscountBadgeProps {
  product: Prisma.ProdutoGetPayload<{}>;
}

export default function DiscountBadge({ product }: DiscountBadgeProps) {
  return (
    <div className="flex items-center">
      <p className="text-gray-400 line-through tracking-wider">
        {product.porcentagemDesconto.toString()}%
      </p>
    </div>
  );
}
