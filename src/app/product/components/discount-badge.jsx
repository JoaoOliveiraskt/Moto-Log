export default function DiscountBadge({ product }) {
  return (
    <div className="flex items-center">
      <p className="text-gray-400 line-through tracking-wider">
        {product.porcentagemDesconto.toString()}%
      </p>
    </div>
  );
}
