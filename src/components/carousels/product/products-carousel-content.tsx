import ProductCard from "../../product-card";
import { CarouselContent, CarouselItem } from "../../ui/carousel";
import { Produto, Categoria, Loja } from "prisma/generated/client";
import {
  getDiscountProducts,
  getRecentProducts,
  getBestSellers,
} from "@/app/actions/product/products";

interface Props {
  limit?: number;
  productType: "discount" | "recent" | "bestselling";
}

interface ProductCardProps extends Produto {
  categoria: Categoria;
  loja: Loja;
}

async function fetchProductsByType(type: Props["productType"], limit?: number) {
  try {
    switch (type) {
      case "discount":
        return await getDiscountProducts(limit);
      case "recent":
        return await getRecentProducts(limit);
      case "bestselling":
        return await getBestSellers(limit);
      default:
        return [];
    }
  } catch (error) {
    console.error(`Erro ao buscar produtos do tipo ${type}:`, error);
    return [];
  }
}

export default async function ProductsCarouselContent({
  limit,
  productType,
}: Props) {
  const products = await fetchProductsByType(productType, limit);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <CarouselContent className="flex gap-2 bg-transparent">
      {products.map((product: ProductCardProps) => (
        <CarouselItem
          key={product.id}
          className="basis-[47%] sm:basis-auto p-0"
        >
          <ProductCard product={product} className="max-w-64" />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
