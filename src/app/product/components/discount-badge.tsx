import { Prisma } from "../../../../prisma/generated/client";

interface DiscountBadgeProps {
  product: Prisma.ProdutoGetPayload<{}>;
}

export default function DiscountBadge({ product }: DiscountBadgeProps) {
  return (
    <div className="">
      <span className="text-sm font-medium text-confirmed">
        {product.porcentagemDesconto?.toString() ?? ""}% OFF
      </span>
    </div>
  );
}
