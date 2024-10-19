"use client";

import { useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton, { AvatarInfo } from "./login-button";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./theme/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import icon from "@/components/icons/icon-component";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "./login-dialog";
import MenuBtn from "./menu-btn";

interface Props {
  className?: string;
  children?: React.ReactNode;
  iconSize?: number;
  model?: string;
}

const Menu = ({ className, children, iconSize, model }: Props) => {
  const { isAuthenticated, user } = useAuth();
  const { data: session } = useSession();
  const [openDialog, setOpenDialog] = useState(false);

  const isLojista = useMemo(() => session?.user.role === "LOJISTA", [session]);

  const toggleOpen = useCallback(() => setOpenDialog((prev) => !prev), []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = {
    open: () => setIsMenuOpen(true),
    close: () => setIsMenuOpen(false),
  };

  const menuItems = useMemo(
    () => (
      <>
        <Link href="/">
          <Button
            onClick={handleMenuOpen.close}
            variant="ghost"
            size="menu"
            className="flex gap-3 px-4 w-full justify-start py-6"
          >
            <icon.home size={18} />
            <span>Início</span>
          </Button>
        </Link>

        {isLojista && (
          <Link href="/dashboard/products">
            <Button
              onClick={handleMenuOpen.close}
              variant="ghost"
              size="menu"
              className="flex gap-3 px-4 w-full justify-start py-6"
            >
              <icon.dashboard size={18} />
              <span>Dashboard</span>
            </Button>
          </Link>
        )}

        <Link href={isAuthenticated ? "/my-orders" : ""}>
          <Button
            onClick={!isAuthenticated ? toggleOpen : handleMenuOpen.close}
            variant="ghost"
            size="menu"
            className="flex gap-3 px-4 w-full justify-start py-6"
          >
            <icon.order size={18} />
            <span>Pedidos</span>
          </Button>
        </Link>

        {!isLojista && (
          <Link href="/welcome-create-store">
            <Button
              variant="ghost"
              size="menu"
              className="flex gap-3 px-4 w-full justify-start py-6"
            >
              <icon.sell size={18} />
              <span>Vender Agora</span>
            </Button>
          </Link>
        )}

        <ModeToggle
          className="flex gap-3 px-4 w-full justify-start py-6"
          size="menu"
        >
          <span>Tema</span>
        </ModeToggle>

        {isAuthenticated && (
          <LoginButton
            iconSize={18}
            onClick={handleMenuOpen.close}
            size="menu"
            className="flex px-4 w-full justify-start py-6 bg-transparent"
          >
            <span>Sair</span>
          </LoginButton>
        )}
      </>
    ),
    [isAuthenticated, isLojista, toggleOpen, handleMenuOpen.close]
  );

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          {isAuthenticated ? (
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
            </Avatar>
          ) : (
            <button className="flex items-center">
              <MenuBtn className={className} iconSize={iconSize}>
                {children}
              </MenuBtn>
            </button>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="p-2 bg-card rounded-xl min-w-72 w-fit"
        >
          <AvatarInfo size="menu" />
          <div className="space-y-0">{menuItems}</div>
        </DropdownMenuContent>
      </DropdownMenu>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default Menu;
