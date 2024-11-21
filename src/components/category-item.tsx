"use client";

import { Link } from "next-view-transitions";
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
      size={"rounded"}
      className={cn(
        "h-8 md:h-10",
        isActive && "bg-foreground text-background hover:bg-foreground/90"
      )}
      asChild
    >
      <Link href={link}>
        <p className="font-semibold text-sm">{category.nome}</p>
      </Link>
    </Button>
  );
}
