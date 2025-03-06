"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTable from "./product-table";
import BtnAddProduct from "../../components/btn-add-product";
import { useSearchParams, useRouter } from "next/navigation";

export function ProductsTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  return (
    <Tabs value={status} onValueChange={handleTabChange}>
      <div className="flex items-center mb-4 px-4 lg:px-0">
        <TabsList className="space-x-2">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Ativo</TabsTrigger>
          <TabsTrigger value="archived">Arquivado</TabsTrigger>
        </TabsList>
        <div className="ml-auto">
          <BtnAddProduct />
        </div>
      </div>

      <TabsContent value="all">
        <ProductTable />
      </TabsContent>

      <TabsContent value="active">
        <ProductTable />
      </TabsContent>

      <TabsContent value="archived">
        <ProductTable />
      </TabsContent>
    </Tabs>
  );
}
