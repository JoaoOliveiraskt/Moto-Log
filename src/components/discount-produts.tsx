import Link from "next/link";
import Container from "./container";
import { IoIosArrowRoundForward } from "react-icons/io";
import { db } from "@/lib/prisma";
import ProductCard from "./product-card";

async function getDiscountProducts() {
  const discountProducts = await db.produto.findMany({
    where: {
      porcentagemDesconto: {
        gt: 0,
      },
    },
    include: {
      loja: {
        select: {
          nome: true,
          id: true,
        },
      },
    },
  });

  if (!discountProducts) {
    return [];
  }

  return discountProducts;
}

export default async function DiscountProducts() {
  const products = await getDiscountProducts();

  if (!products) {
    return null;
  }

  return (
    <Container  className="my-10 flex flex-col gap-4">
      <div  className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-xl sm:text-3xl">
          Em promoção
        </h2>
        <Link href="#" className="flex items-center gap-1 text-blue-700">
          <span className=" font-medium">Ver todos</span>
          <IoIosArrowRoundForward />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {products.slice(0, 10).map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Container>
  );
}
