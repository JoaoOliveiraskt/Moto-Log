import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/app/actions/category/get-category-by-id";
import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function Category({ params }: Props) {
  const category = await getCategoryById(params.id);

  if (!category) {
    notFound();
  }

  const products = category?.produtos || [];

  if (!products || products.length === 0) {
    return (
      <EmptyState title="Ops, não encontramos produtos nessa categoria">
        <div className="flex items-center justify-center w-full">
          <Button size={"xl"} asChild className="w-fit">
            <Link href="/">Ver todos os produtos</Link>
          </Button>
        </div>
      </EmptyState>
    );
  }

  return (
    <>
      <Container className="space-y-2 pt-[7.5rem] lg:pt-[9rem] min-h-screen">
        <GoBackButton
          name={category.nome}
          containerClassName="hidden lg:flex"
        />

        <ProductList>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={{
                  ...product,
                  categoria: { id: category.id, nome: category.nome },
                }}
              />
            </div>
          ))}
        </ProductList>
      </Container>
    </>
  );
}
