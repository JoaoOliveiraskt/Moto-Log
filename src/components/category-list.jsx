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
<div className="flex md:flex-wrap md:items-center md:justify-center w-full gap-4 py-8 sm:py-4 sm:overflow-x-auto lg:mt-20 snap-x px-4">
    {categories.map((category) => (
      <CategoryItem key={category.id} category={category} />
    ))}
</div>
  )
}
