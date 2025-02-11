import { getUserStore } from "@/app/actions/store/get-user-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";

export default async function UserStoreSelector() {
  const store = await getUserStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="data-[state=open]:text-foreground flex items-center gap-2 p-2 rounded-md w-52">
        <div className="rounded-md overflow-hidden">
          {store?.profileImageUrl ? (
            <Image
              src={store.profileImageUrl}
              alt="logo da loja"
              width={100}
              height={100}
              className="w-8 h-8 object-cover rounded-md"
            />
          ) : (
            <div className="w-8 h-8 rounded-md border bg-accent"></div>
          )}
        </div>
        <div className="flex flex-col ml-2 items-start">
          <span className="text-sm font-medium">{store?.nome}</span>
          <span className="text-xs text-muted-foreground">Empresa</span>
        </div>
        <ChevronsUpDown className="ml-auto" size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 min-w-60" align="start" side="bottom">
        <DropdownMenuLabel>Lojas</DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <div className="rounded-md overflow-hidden">
              {store?.profileImageUrl ? (
                <Image
                  src={store.profileImageUrl}
                  alt="logo da loja"
                  width={100}
                  height={100}
                  className="w-8 h-8 object-cover rounded-md"
                />
              ) : (
                <div className="w-8 h-8 rounded-md border bg-accent"></div>
              )}
            </div>
            <p>{store?.nome}</p>
          </div>
          <DropdownMenuShortcut>⌘ 1</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
