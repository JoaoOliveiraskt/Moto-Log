"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  nome: string;
}

interface CategoryProps {
  category: Category;
  link: string;
}

export default function CategoryItem({ category, link }: CategoryProps) {
  const pathname = usePathname();
  const isActive = pathname === `/category/${category.id}`;

  return (
    <Button
      variant="secondary"
      className={cn(
        "h-8",
        isActive && "bg-foreground text-background hover:bg-foreground/90"
      )}
      asChild
    >
      <Link href={link}>
        <p className=" text-sm tracking-wide">{category.nome}</p>
      </Link>
    </Button>
  );
}
