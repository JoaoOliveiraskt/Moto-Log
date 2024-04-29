const apiUrl = "https://api.escuelajs.co/api/v1";

export const fetchProductCategory = async () => {
  try {
    const response = await fetch(`${apiUrl}/categories`);

    if (!response.ok) {
      throw new Error("Erro ao obter categorias de produtos");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao obter categorias de produtos", error);
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}/products`);
    
    if (!response.ok) {
      throw new Error("Erro ao obter produtos");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao obter produtos", error);
    throw error;
  }
};
