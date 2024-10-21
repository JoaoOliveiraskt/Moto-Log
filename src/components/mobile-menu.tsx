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
        <Button
          asChild
          onClick={handleMenuOpen.close}
          variant="secondary"
          size="menu"
          className="w-full shadow-md"
        >
          <Link href="/" className="flex gap-4 w-full justify-between py-7 ">
            <TypographyLarge className="font-medium">Início</TypographyLarge>
            <icon.home size={20} />
          </Link>
        </Button>

        {isLojista && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="secondary"
            size="menu"
            className="w-full shadow-md"
          >
            <Link
              href="/dashboard/products"
              className="flex gap-4 w-full justify-between py-7 "
            >
              <TypographyLarge className="font-medium">
                Anúncios
              </TypographyLarge>
              <icon.dashboard size={20} />
            </Link>
          </Button>
        )}

        {isAuthenticated && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="secondary"
            size="menu"
            className="w-full shadow-md"
          >
            <Link
              href={isAuthenticated ? "/my-orders" : ""}
              className="flex gap-4 w-full justify-between py-7 "
            >
              <TypographyLarge className="font-medium">Pedidos</TypographyLarge>
              <icon.order size={20} />
            </Link>
          </Button>
        )}

        {!isLojista && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="secondary"
            size="menu"
            className="w-full shadow-md"
          >
            <Link
              href="/welcome-create-store"
              className="flex gap-4 w-full justify-between py-7 "
            >
              <TypographyLarge className="font-medium">
                Vender Agora
              </TypographyLarge>
              <icon.sell size={20} />
            </Link>
          </Button>
        )}

        <ModeToggle
          variant="secondary"
          iconSize={20}
          className="flex flex-row-reverse gap-4 w-full justify-between py-7 hover:bg-secondary/80 shadow-md"
          size="menu"
        >
          <TypographyLarge className="font-medium">Tema</TypographyLarge>
        </ModeToggle>

        {isAuthenticated && (
          <LoginButton
            variant="secondary"
            iconSize={20}
            onClick={handleMenuOpen.close}
            size="menu"
            className="flex flex-row-reverse gap-4 w-full justify-between py-7 hover:bg-secondary/80 shadow-md"
          >
            <TypographyLarge className="font-medium">Sair</TypographyLarge>
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

        <DrawerContent className="pb-10 px-8 bg-card">
          <DrawerHeader className="mx-auto w-full max-w-sm flex items-center justify-center">
            <AvatarInfo size="menu" />
          </DrawerHeader>
          <div className="space-y-2 flex flex-col items-center w-full">
            {menuItems}
          </div>
        </DrawerContent>
      </Drawer>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default MobileMenu;
