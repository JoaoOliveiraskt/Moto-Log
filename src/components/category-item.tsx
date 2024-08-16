"use client";

import Link from "next/link";
import { Card } from "./ui/card";

interface Category {
  id: string;
  nome: string;
  imageUrl: string;
}

interface CategoryProps {
  category: Category;
  link: string;
}

export default function CategoryItem({ category, link }: CategoryProps) {
  return (
    <Link href={link} className="w-auto rounded-full z-20 border">
      <div className="flex items-center gap-1 w-fit px-4 py-2 bg-background hover:bg-accent hover:text-foreground rounded-full">
        <p className="font-medium">{category.nome}</p>
      </div>
    </Link>
  );
}
