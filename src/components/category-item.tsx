import Link from "next/link";
import { Button } from "./ui/button";

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
    <Button
      asChild
      className="flex border-none items-center w-fit h-fit py-2 bg-accent/60 hover:bg-accent dark:bg-accent dark:hover:bg-accent-foreground rounded-lg transition-all text-foreground"
    >
      <Link href={link}>
        <p className="font-semibold">{category.nome}</p>
      </Link>
    </Button>
  );
}
