import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { db } from "@/lib/prisma";

export default async function DropdownCategory() {
  const categories = await db.categoria.findMany({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <p className="transition text-primary hover:text-muted-foreground dark:text-muted-foreground dark:hover:text-primary">
            Categorias
          </p>
          <RiArrowDropDownLine />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {categories.map((category) => (
          <DropdownMenuItem className="cursor-pointer" key={category.id}>
            {category.nome}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
