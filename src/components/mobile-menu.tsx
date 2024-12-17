"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Link } from "next-view-transitions";
import UserInfo from "@/components/user-info";
import GoogleSignInButton from "./google-signin-button";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./theme/theme-switcher";
import Icon from "@/components/icons/icon-component";
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
import LoginButton from "./login-button";

interface Props {
  className?: string;
  iconSize?: number;
}

const MobileMenu = ({ className, iconSize = 22 }: Props) => {
  const { isAuthenticated, user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isLojista = useMemo(() => session?.user.role === "LOJISTA", [session]);

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
          className="w-full  border-border/70 "
        >
          <Link href="/" className="flex gap-4 w-full justify-between py-6 ">
            <TypographyLarge className="font-medium">Início</TypographyLarge>
            <Icon.home size={iconSize} />
          </Link>
        </Button>

        {isLojista && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="secondary"
            size="menu"
            className="w-full  border-border/70 "
          >
            <Link
              href="/dashboard/products"
              className="flex gap-4 w-full justify-between py-6 "
            >
              <TypographyLarge className="font-medium">
                Dashboard
              </TypographyLarge>
              <Icon.dashboard size={iconSize} />
            </Link>
          </Button>
        )}

        {isAuthenticated && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="secondary"
            size="menu"
            className="w-full  border-border/70 "
          >
            <Link
              href={isAuthenticated ? "/my-orders" : ""}
              className="flex gap-4 w-full justify-between py-6 "
            >
              <TypographyLarge className="font-medium">Pedidos</TypographyLarge>
              <Icon.order size={iconSize} />
            </Link>
          </Button>
        )}

        {!isLojista && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="secondary"
            size="menu"
            className="w-full  border-border/70 "
          >
            <Link
              href="/welcome-create-store"
              className="flex gap-4 w-full justify-between py-6 "
            >
              <TypographyLarge className="font-medium">
                Vender Agora
              </TypographyLarge>
              <Icon.sell size={iconSize} />
            </Link>
          </Button>
        )}

        <Button
          asChild
          onClick={handleMenuOpen.close}
          variant="secondary"
          size="menu"
          className="w-full  border-border/70 "
        >
          <Link
            href="/community"
            className="flex gap-4 w-full justify-between py-6 "
          >
            <TypographyLarge className="font-medium">
              Comunidade
            </TypographyLarge>
            <Icon.globe size={iconSize} />
          </Link>
        </Button>

        <ModeToggle
          variant="secondary"
          iconSize={iconSize}
          className="flex flex-row-reverse gap-4 w-full justify-between py-6 border-border/70 "
          size="menu"
        >
          <TypographyLarge className="font-medium">Tema</TypographyLarge>
        </ModeToggle>

        <LoginButton
          iconSize={iconSize}
          variant="secondary"
          className="w-full border-border/70 px-4"
        >
          {isAuthenticated ? (
            <TypographyLarge className="font-medium">Sair</TypographyLarge>
          ) : (
            <TypographyLarge className="font-medium">Entrar</TypographyLarge>
          )}
        </LoginButton>
      </>
    ),
    [isAuthenticated, isLojista, handleMenuOpen.close, iconSize]
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

        <DrawerContent className="pb-6 px-4 bg-card">
          <DrawerHeader className="mx-auto w-full flex items-center justify-center">
            <UserInfo />
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
