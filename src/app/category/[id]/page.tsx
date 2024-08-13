import BottomNav from "@/components/bottom-nav";
import Container from "@/components/container";
import Footer from "@/components/footer";
import GoBackButton from "@/components/go-back-button";

import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const category = await db.categoria.findUnique({
    where: { id },
    include: {
      produtos: {
        include: {
          loja: true,
        },
      },
    },
  });

  if (!category) {
    return null;
  }

  return category;
}

export default async function CategorieList({ params }: Props) {
  const category = await getData(params.id);

  if (!category) {
    notFound();
  }

  const products = category?.produtos || [];

  return (
    <>
      <Header />
      <Container className="flex flex-col gap-8 mt-8 lg:mt-16">
        <GoBackButton name={category.nome} />

        {products.length > 0 ? (
          <ProductList>
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </ProductList>
        ) : (
          <h2 className="font-bold text-primary text-xl sm:text-3xl text-center mt-20">
            Ops, não encontramos produtos nessa categoria
          </h2>
        )}
      </Container>
      <BottomNav />
      <Footer />
    </>
  );
}
