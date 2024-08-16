import FetchCategory from "../hooks/fetch-categories";
import CategoryItem from "./category-item";

export default async function CategoryList() {
  const categories = await FetchCategory();

  return (
    <div id="category-list" className="space-y-5 mt-20 lg:mt-32 ">
      <h2 className="text-start text-xl sm:text-3xl font-bold text-primary">
        Principais categorias
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {categories.slice(0, 6).map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            link={`/category/${category.id}`}
          />
        ))}
      </div>
    </div>
  );
}
