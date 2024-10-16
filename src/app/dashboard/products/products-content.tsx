import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import ProductTable from "./components/product-table";

async function getProductsForUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return [];
  }

  const userId = session.user.id;

  const products = await db.produto.findMany({
    where: { loja: { userId: userId } },
    include: { loja: { select: { nome: true, id: true } } },
  });

  return products || [];
}

export default async function ProductsContent() {
  const products = await getProductsForUser();

  const activeProducts = products.filter(
    (product) => product.status === "ATIVO"
  );
  const archivedProducts = products.filter(
    (product) => product.status === "ARQUIVADO"
  );

  return (
    <main className="mx-auto w-full max-w-[75rem] gap-4 sm:py-0 md:gap-8 mt-4">
      <Tabs defaultValue="all">
        <div className="flex items-center mb-4">
          <TabsList className="space-x-2  border border-border p-1 rounded-lg">
            <TabsTrigger value="all" className="">
              Todos
            </TabsTrigger>
            <TabsTrigger value="active" className="">
              Ativo
            </TabsTrigger>
            <TabsTrigger value="archived" className="">
              Arquivado
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size={"lg"} className="gap-1">
              <Link
                href="/dashboard/add-product"
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Adicionar produto
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <ProductTable
            products={products}
            title="Todos Produtos"
            description="Gerencie seus produtos e visualize seu desempenho de vendas."
          />
        </TabsContent>

        <TabsContent value="active">
          <ProductTable
            products={activeProducts}
            title="Produtos Ativos"
            description="Gerencie seus produtos ativos."
          />
        </TabsContent>

        <TabsContent value="archived">
          <ProductTable
            products={archivedProducts}
            title="Produtos Arquivados"
            description="Gerencie seus produtos arquivados."
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
