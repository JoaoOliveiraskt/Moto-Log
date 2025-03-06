import { Suspense } from "react";
import ProductTableSkeleton from "./table-skeleton";
import { ProductsTabs } from "./product-tabs";

export default async function ProductsContent() {
  return (
    <main className="mt-4">
        <ProductsTabs />
    </main>
  );
}
