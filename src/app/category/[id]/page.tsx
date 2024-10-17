import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/app/actions/getCategory";

interface Props {
  params: {
    id: string;
  };
}

export default async function CategorieList({ params }: Props) {
  const category = await getCategoryById(params.id);

  if (!category) {
    notFound();
  }

  const products = category?.produtos || [];

  return (
    <>
      <Container className="flex flex-col gap-8 mt-20 min-h-screen">
        <GoBackButton name={category.nome} className="hidden lg:flex" />

        {products.length > 0 ? (
          <ProductList>
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={{ ...product, categoria: { nome: category.nome } }} />
              </div>
            ))}
          </ProductList>
        ) : (
          <h2 className="font-bold text-primary text-xl sm:text-3xl text-center mt-20">
            Ops, não encontramos produtos nessa categoria
          </h2>
        )}
      </Container>
    </>
  );
}
