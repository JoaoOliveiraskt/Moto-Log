import { useState, useEffect } from "react";
import { fetchAllProducts } from "../services/products-api";

function useProductSearch(startIndex, endIndex) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await fetchAllProducts();
        console.log(productsData);
        const formatProductDataUrl = productsData.map((product) => ({
          ...product,
          // Se as URLs estiverem em um formato incorreto, corrija-as aqui
          images: product.images.map((image) => {
            if (
              image.startsWith("http://") ||
              image.startsWith("https://") ||
              image.startsWith("/")
            ) {
              return image; // Mantém a URL da imagem inalterada
            } else {
              // Adiciona uma barra "/" antes da URL da imagem
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
