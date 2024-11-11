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
            className="flex gap-3 px-4 w-full justify-between py-6 font-medium tracking-wide"
          >
            <span>Início</span>
            <icon.home size={20} />
          </Button>
        </Link>

        {isLojista && (
          <Link href="/dashboard/products">
            <Button
              onClick={handleMenuOpen.close}
              variant="ghost"
              size="menu"
              className="flex gap-3 px-4 w-full justify-between py-6 font-medium tracking-wide"
            >
              <span>Dashboard</span>
              <icon.dashboard size={20} />
            </Button>
          </Link>
        )}

        {isAuthenticated && (
          <Link href={"/my-orders"}>
            <Button
              onClick={handleMenuOpen.close}
              variant="ghost"
              size="menu"
              className="flex gap-3 px-4 w-full justify-between py-6 font-medium tracking-wide"
            >
              <span>Pedidos</span>
              <icon.order size={20} />
            </Button>
          </Link>
        )}

        {!isLojista && (
          <Link href="/welcome-create-store">
            <Button
              onClick={handleMenuOpen.close}
              variant="ghost"
              size="menu"
              className="flex gap-3 px-4 w-full justify-between py-6 font-medium tracking-wide"
            >
              <span>Vender Agora</span>
              <icon.sell size={20} />
            </Button>
          </Link>
        )}

        <ModeToggle
          iconSize={20}
          className="flex flex-row-reverse gap-3 px-4 w-full justify-between py-6 font-medium tracking-wide"
          size="menu"
        >
          <span>Tema</span>
        </ModeToggle>

        {isAuthenticated && (
          <LoginButton
            iconSize={20}
            onClick={handleMenuOpen.close}
            size="menu"
            className="flex flex-row-reverse px-4 w-full justify-between py-6 font-medium tracking-wide bg-transparent"
          >
            <span>Sair</span>
          </LoginButton>
        )}
      </>
    ),
    [isAuthenticated, isLojista, handleMenuOpen.close]
  );

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        {isAuthenticated ? (
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={user?.image as string}
                alt={user?.name as string}
              />
            </Avatar>
          </DropdownMenuTrigger>
        ) : (
          <DropdownMenuTrigger asChild>
            <div>
              <MenuBtn className={className} iconSize={iconSize}>
                {children}
              </MenuBtn>
            </div>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent
          align="end"
          className="p-2.5 bg-card rounded-3xl min-w-72 w-full shadow-2xl"
        >
          {isAuthenticated && <AvatarInfo size="menu" />}
          <div className="space-y-0">{menuItems}</div>
          {!isAuthenticated && (
            <AvatarInfo
              variant="outline"
              size="menu"
              className="w-full -mb-6 py-5 rounded-xl"
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default Menu;
