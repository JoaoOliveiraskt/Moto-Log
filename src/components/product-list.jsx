"use client";

import React from "react";
import ProductCard from "./product-card";
import useProductSearch from "@/hooks/useProductSearch";

export default function ProductList({ startIndex, endIndex }) {
  const products = useProductSearch(startIndex, endIndex);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {products.map((item) => (
        <div key={item.id}>
          <ProductCard product={item} />
        </div>
      ))}
    </div>
  );
}
