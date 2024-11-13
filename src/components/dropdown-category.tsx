import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { db } from "@/lib/prisma";
import { Link } from "next-view-transitions";

export default async function DropdownCategory() {
  const categories = await db.categoria.findMany({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1 hover:text-foreground text-muted-foreground">
          <p>Categorias</p>
          <RiArrowDropDownLine />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <DropdownMenuItem>
              {category.nome}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
