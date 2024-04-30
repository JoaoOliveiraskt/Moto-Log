import { useState, useEffect } from "react";
import { fetchAllProducts } from "../services/products-api";

function useProductSearch(startIndex, endIndex) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await fetchAllProducts();

        const formatProductDataUrl = productsData.map((product) => ({
          ...product,
          images: product.images.map((image) => {
            if (
              image.startsWith("http://") ||
              image.startsWith("https://") ||
              image.startsWith("/")
            ) {
              return image;
            } else {
              return "/" + image;
            }
          }),
        }));
        setProducts(formatProductDataUrl.slice(startIndex, endIndex));
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProducts();
  }, [startIndex, endIndex]);

  return products;
}

export default useProductSearch;
