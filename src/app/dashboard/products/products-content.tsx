import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import ProductTable from "./components/product-table";
import BtnAddProduct from "./components/btn-add-product";

async function getProductsForUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return [];
  }

  const userId = session.user.id;

  const products = await db.produto.findMany({
    where: { loja: { userId: userId } },
    include: { loja: { select: { nome: true, id: true } } },
    orderBy: { createdAt: "asc" },
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
            <BtnAddProduct />
          </div>
        </div>

        <TabsContent value="all">
          <ProductTable products={products} />
        </TabsContent>

        <TabsContent value="active">
          <ProductTable products={activeProducts} />
        </TabsContent>

        <TabsContent value="archived">
          <ProductTable products={archivedProducts} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
