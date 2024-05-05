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
import { HiMiniArrowSmallRight } from "react-icons/hi2";

export default async function DropdownStore() {
  const storeNames = await db.loja.findMany({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <p className="text-gray-500 transition hover:text-gray-500/75">
            Lojas
          </p>
          <RiArrowDropDownLine />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {storeNames.map((store) => (
          <DropdownMenuItem className="cursor-pointer" key={store.id}>
            {store.nome}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="#" className="flex items-center justify-between w-full">
            <span className="">Ver todas</span>
            <HiMiniArrowSmallRight />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
