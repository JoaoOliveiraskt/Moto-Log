import FetchCategory from "../hooks/fetch-categories";
import CategoryItem from "./category-item";

const descriptions = {
  Roupas: "Estilo para todas as ocasiões.",
  Calçados: "Conforto e moda para os seus pés.",
  Eletrônicos: "Inovação que simplifica sua vida.",
  Acessórios: "Descubra detalhes únicos e surpreendentes.",
  Cosméticos: "Beleza e cuidado para o seu dia a dia.",
  Livros: "Inspiração e conhecimento para sua mente.",
};

export default async function CategoryList() {
  const categories = await FetchCategory();
  return (
<div className="flex flex-wrap items-center justify-center w-full gap-4 py-2 mt-6 sm:py-4 lg:mt-20 snap-x">
    {categories.map((category) => (
      <CategoryItem key={category.id} category={category} />
    ))}
</div>
  )
}
