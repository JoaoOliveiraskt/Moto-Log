"use client";

import { useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton, { AvatarInfo } from "./login-button";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./theme/theme-switcher";
import icon from "@/components/icons/icon-component";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "./login-dialog";
import MenuBtn from "./menu-btn";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import TypographyLarge from "./typography/typography-large";

interface Props {
  className?: string;
  children?: React.ReactNode;
  iconSize?: number;
}

const MobileMenu = ({ className, children, iconSize = 18 }: Props) => {
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
            className="flex gap-4 px-10 w-full justify-start py-6 hover:bg-background"
          >
            <icon.home size={20} />
            <TypographyLarge>Home</TypographyLarge>
          </Button>
        </Link>

        {isLojista && (
          <Link href="/dashboard/products">
            <Button
              onClick={handleMenuOpen.close}
              variant="ghost"
              size="menu"
              className="flex gap-4 px-10 w-full justify-start py-6 hover:bg-background"
            >
              <icon.dashboard size={20} />
              <TypographyLarge>Dashboard</TypographyLarge>
            </Button>
          </Link>
        )}

        <Link href={isAuthenticated ? "/my-orders" : ""}>
          <Button
            onClick={!isAuthenticated ? toggleOpen : handleMenuOpen.close}
            variant="ghost"
            size="menu"
            className="flex gap-4 px-10 w-full justify-start py-6 hover:bg-background"
          >
            <icon.order size={20} />
            <TypographyLarge>Pedidos</TypographyLarge>
          </Button>
        </Link>

        {!isLojista && (
          <Link href="/welcome-create-store">
            <Button
              onClick={handleMenuOpen.close}
              variant="ghost"
              size="menu"
              className="flex gap-4 px-10 w-full justify-start py-6 hover:bg-background"
            >
              <icon.sell size={20} />
              <TypographyLarge>Vender Agora</TypographyLarge>
            </Button>
          </Link>
        )}

        <ModeToggle
          iconSize={20}
          className="flex gap-4 px-10 w-full justify-start py-6 hover:bg-background"
          size="menu"
        >
          <TypographyLarge>Tema</TypographyLarge>
        </ModeToggle>

        {isAuthenticated && (
          <LoginButton
            iconSize={20}
            onClick={handleMenuOpen.close}
            size="menu"
            className="flex space-x-3 gap-1 px-10 w-full justify-start py-6 hover:bg-background"
          >
            <TypographyLarge>Sair</TypographyLarge>
          </LoginButton>
        )}
      </>
    ),
    [isAuthenticated, isLojista, toggleOpen, handleMenuOpen.close]
  );

  return (
    <>
      <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerTrigger asChild>
          {isAuthenticated ? (
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
            </Avatar>
          ) : (
            <button className="flex items-center">
              <MenuBtn className={className} iconSize={iconSize}>
                Menu
              </MenuBtn>
            </button>
          )}
        </DrawerTrigger>

        <DrawerContent className="pb-8">
          <DrawerHeader className="mx-auto w-full max-w-sm">
            <AvatarInfo size="menu" />
          </DrawerHeader>
          <div className="space-y-0">{menuItems}</div>
        </DrawerContent>
      </Drawer>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default MobileMenu;
