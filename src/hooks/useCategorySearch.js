"use client";

import { useState, useEffect } from "react";
import { fetchProductCategory } from "@/services/products-api";

export default function useCategorySearch() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await fetchProductCategory();
        console.log(categoriesData)
        setCategories(categoriesData.slice(0, 5));
      } catch (error) {
        console.error("Erro ao buscar categorias de produtos:", error);
      }
    }

    fetchCategories();
  }, []);
  return categories;
}
