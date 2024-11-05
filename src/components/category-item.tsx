import Link from "next/link";

interface Category {
  id: string;
  nome: string;
}

interface CategoryProps {
  category: Category;
  link: string;
}

export default function CategoryItem({ category, link }: CategoryProps) {
  return (
    <Link
      href={link}
      className="flex items-center w-fit px-4 py-1.5 bg-accent hover:bg-accent-foreground rounded-lg transition-all"
    >
      <p className="font-semibold">{category.nome}</p>
    </Link>
  );
}
