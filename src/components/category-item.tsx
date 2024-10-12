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
        `w-auto rounded-full z-20 border dark:border/10`,
        active && "bg-foreground text-background",
        className,
      ])}
    >
      <div className="flex items-center gap-1 w-fit px-4 py-2.5 bg-card/30 hover:bg-accent/50 hover:text-foreground rounded-full transition-all">
        <p className="font-medium">{category.nome}</p>
      </div>
    </Link>
  );
}
