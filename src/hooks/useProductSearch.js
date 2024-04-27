import { useState, useEffect } from "react";
import { fetchAllProducts } from "../services/products-api";

function useProductSearch(startIndex, endIndex) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await fetchAllProducts();
        setProducts(productsData.slice(startIndex, endIndex));
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProducts();
  }, [startIndex, endIndex]);

  return products;
}

export default useProductSearch;
