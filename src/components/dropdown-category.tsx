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
        <div className="flex items-center gap-1 hover:text-foreground">
          <p>Categorias</p>
          <RiArrowDropDownLine />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {categories.map((category) => (
          <DropdownMenuItem className="cursor-pointer hover:text-foreground" key={category.id}>
            <p>{category.nome}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
