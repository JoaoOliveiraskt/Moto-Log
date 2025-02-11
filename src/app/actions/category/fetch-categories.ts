export default async function fetchCategories() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/fetch-categories`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["categories"],
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar categorias");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    return [];
  }
}
