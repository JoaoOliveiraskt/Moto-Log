import { Suspense } from "react";
import ProductTableSkeleton from "./table-skeleton";
import { getUserStore } from "@/app/actions/store/get-user-store";
import ProductsData from "./product-data-fetcher";

export default async function ProductsContent() {
  const storeData = await getUserStore();

  return (
    <main className="sm:py-0 mt-4">
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductsData storeId={storeData.id} />
      </Suspense>
    </main>
  );
}
