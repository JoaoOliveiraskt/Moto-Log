import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTable from "./product-table";
import BtnAddProduct from "../../components/btn-add-product";

interface ProductsTabsClientProps {
  products: any[];
  activeProducts: any[];
  archivedProducts: any[];
}

export function ProductsTabs({
  products,
  activeProducts,
  archivedProducts,
}: ProductsTabsClientProps) {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center mb-4">
        <TabsList className="space-x-2">
          <TabsTrigger value="all" className="hover:text-foreground">
            Todos
          </TabsTrigger>
          <TabsTrigger value="active" className="hover:text-foreground">
            Ativo
          </TabsTrigger>
          <TabsTrigger value="archived" className="hover:text-foreground">
            Arquivado
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto">
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
  );
}
