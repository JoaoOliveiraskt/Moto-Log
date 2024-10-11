"use client";

import { AvatarInfo } from "./login-button";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./theme/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import icon from "@/components/icons/icon-component";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

interface Props {
  className?: string;
  children?: React.ReactNode;
  iconSize?: number;
  model?: string;
}

const Menu = ({ className, children, iconSize, model }: Props) => {
  const status = UserStatus();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isLojista = session?.user.role === "LOJISTA";

  const handleMenuOpen = {
    open: () => setIsMenuOpen(true),
    close: () => setIsMenuOpen(false),
  };

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger
        onClick={handleMenuOpen.open}
        className={`rounded-md flex items-center justify-center text-muted-foreground hover: transition-colors ${className}`}
      >
        <icon.menu size={18} />
        <p>{children}</p>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="px-2 py-2 bg-card rounded-xl text-muted-foreground"
        align="end"
      >
        <AvatarInfo onClick={handleMenuOpen.close} size={"menu"}/>
        
        <ModeToggle className="flex gap-3 px-4 w-full justify-start" size={"menu"}>
          <span>Tema</span>
        </ModeToggle>

        <div className="space-y-1">
          <Link href={"/"} className="block" onClick={handleMenuOpen.close}>
            <Button
              variant={"ghost"}
              size={"menu"}
              className="space-x-3 w-full justify-start text-sm tracking-tight  "
            >
              <icon.home size={18} className="" />
              <p className="block ">Início</p>
            </Button>
          </Link>

          {isLojista && (
            <Link
              href="/dashboard/products"
              passHref
              onClick={handleMenuOpen.close}
            >
              <Button
                variant={"ghost"}
                size={"menu"}
                className="space-x-3 w-full justify-start text-sm tracking-tight"
              >
                <icon.dashboard size={18} />
                <p className="block ">Dashboard</p>
              </Button>
            </Link>
          )}

          <Link
            href={status === "authenticated" ? "/my-orders" : "/login"}
            className="block"
            onClick={handleMenuOpen.close}
          >
            <Button
              variant={"ghost"}
              size={"menu"}
              className="space-x-3 w-full justify-start text-sm tracking-tight"
            >
              <icon.order size={18} />

              <p className="block ">Meus Pedidos</p>
            </Button>
          </Link>

         {!isLojista && (
           <Link
            href="/welcome-create-store"
            passHref
            onClick={handleMenuOpen.close}
          >
            <Button
              variant={"ghost"}
              size={"menu"}
              className="space-x-3 w-full justify-start text-sm tracking-tight"
            >
              <icon.sell size={18} />
              <p className="block ">Vender Agora</p>
            </Button>
          </Link>
         )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
