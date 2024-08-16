import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/prisma";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GoChevronRight } from "react-icons/go";

export default async function DropdownStore() {
  const storeNames = await db.loja.findMany({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1 hover:text-foreground text-muted-foreground">
          <p>Lojas</p>
          <RiArrowDropDownLine />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card">
        {storeNames.map((store) => (
          <Link key={store.id} href={`/store/${store.id}`}>
            <DropdownMenuItem className="hover:text-foreground">
              {store.nome}
            </DropdownMenuItem>
          </Link>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href="#"
            className=" flex items-center justify-between w-full "
          >
            <span >Ver todas</span>
            <GoChevronRight size={15} />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
