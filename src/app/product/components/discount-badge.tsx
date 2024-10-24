import { Prisma } from "../../../../prisma/generated/client";

interface DiscountBadgeProps {
  product: Prisma.ProdutoGetPayload<{}>;
}

export default function DiscountBadge({ product }: DiscountBadgeProps) {
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <span>-</span>
      <span className=" tracking-wider">
        {product.porcentagemDesconto?.toString() ?? ""}%
      </span>
    </div>
  );
}
