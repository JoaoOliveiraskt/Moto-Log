import { Prisma } from "../../../../prisma/generated/client";

interface DiscountBadgeProps {
  product: Prisma.ProdutoGetPayload<{}>;
}

export default function DiscountBadge({ product }: DiscountBadgeProps) {
  return (
    <div>
      <span className="text-sm text-confirmed">
        {product.porcentagemDesconto?.toString() ?? ""}% OFF
      </span>
    </div>
  );
}
