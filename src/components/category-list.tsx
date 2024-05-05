import FetchCategory from "../hooks/fetch-categories";
import CategoryItem from "./category-item";

export default async function CategoryList() {
  const categories = await FetchCategory();
  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-4 py-2 mt-6 sm:py-4 lg:mt-20 snap-x">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
