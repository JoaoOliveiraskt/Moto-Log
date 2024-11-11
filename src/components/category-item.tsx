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
      variant={"secondary"}
      asChild
      className="flex items-center w-fit h-fit py-2.5  rounded-full transition-all text-foreground"
    >
      <Link href={link}>
        <p className="font-semibold">{category.nome}</p>
      </Link>
    </Button>
  );
}
