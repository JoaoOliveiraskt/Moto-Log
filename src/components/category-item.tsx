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
      className="flex items-center gap-1 w-fit px-5 py-2.5 border hover:bg-accent/50 hover:text-foreground rounded-full transition-all"
    >
      <p className="font-bold">{category.nome}</p>
    </Link>
  );
}
