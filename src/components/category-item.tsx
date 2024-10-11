"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  nome: string;
}

interface CategoryProps {
  category: Category;
  link: string;
  className?: string;
  active?: boolean;
}

export default function CategoryItem({
  category,
  link,
  className,
  active,
}: CategoryProps) {
  return (
    <Link
      href={link}
      className={cn([
        `w-auto rounded-full z-20 border dark:border-zinc-900`,
        active && "bg-foreground text-background",
        className,
      ])}
    >
      <div className="flex items-center gap-1 w-fit px-4 py-1.5 bg-card hover:bg-accent hover:text-foreground rounded-full">
        <p className="font-medium">{category.nome}</p>
      </div>
    </Link>
  );
}
