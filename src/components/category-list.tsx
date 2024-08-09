import FetchCategory from "../hooks/fetch-categories";
import CategoryItem from "./category-item";
import Container from "./container";

export default async function CategoryList() {
  const categories = await FetchCategory();
  return (
    <Container className="my-10 flex flex-col gap-4">
      <h2 className="text-start text-xl sm:text-3xl font-bold text-primary">
        Principais categorias
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.slice(0, 6).map((category) => (
          <CategoryItem key={category.id} category={category} link={`/category/${category.id}`}/>
        ))}
      </div>
    </Container>
  );
}
