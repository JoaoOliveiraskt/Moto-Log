"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Link } from "next-view-transitions";
import UserInfo from "@/components/user-info";
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
          variant="ghost"
          size="menu"
          className="w-full border-border/7 justify-start hover:bg-background"
        >
          <Link href="/" className="flex gap-4 w-full items-center py-7 ">
            <Icon.home size={iconSize} />
            <TypographyLarge className="font-medium">Início</TypographyLarge>
          </Link>
        </Button>

        {isLojista && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="ghost"
            size="menu"
            className="w-full  border-border/7 justify-start hover:bg-background"
          >
            <Link
              href="/dashboard/products"
              className="flex gap-4 w-full items-center py-7 "
            >
              <Icon.dashboard size={iconSize} />
              <TypographyLarge className="font-medium">
                Dashboard
              </TypographyLarge>
            </Link>
          </Button>
        )}

        {isAuthenticated && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="ghost"
            size="menu"
            className="w-full  border-border/7 justify-start hover:bg-background"
          >
            <Link
              href={isAuthenticated ? "/my-orders" : ""}
              className="flex gap-4 w-full items-center py-7 "
            >
              <Icon.order size={iconSize} />
              <TypographyLarge className="font-medium">Pedidos</TypographyLarge>
            </Link>
          </Button>
        )}

        {isAuthenticated && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="ghost"
            size="menu"
            className="w-full  border-border/7 justify-start hover:bg-background"
          >
            <Link
              href={isAuthenticated ? "/following" : ""}
              className="flex gap-4 w-full items-center py-7 "
            >
              <Icon.users size={iconSize} />
              <TypographyLarge className="font-medium">
                Seguindo
              </TypographyLarge>
            </Link>
          </Button>
        )}

        {isAuthenticated && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="ghost"
            size="menu"
            className="w-full  border-border/7 justify-start hover:bg-background"
          >
            <Link
              href={isAuthenticated ? "/favorites" : ""}
              className="flex gap-4 w-full items-center py-7 "
            >
              <Icon.bookmark size={iconSize} />
              <TypographyLarge className="font-medium">
                Favoritos
              </TypographyLarge>
            </Link>
          </Button>
        )}

        {!isLojista && (
          <Button
            asChild
            onClick={handleMenuOpen.close}
            variant="ghost"
            size="menu"
            className="w-full  border-border/7 justify-start hover:bg-background"
          >
            <Link
              href="/welcome-create-store"
              className="flex gap-4 w-full items-center py-7 "
            >
              <Icon.sell size={iconSize} strokeWidth={1.25} />
              <TypographyLarge className="font-medium">
                Vender Agora
              </TypographyLarge>
            </Link>
          </Button>
        )}

        <Button
          asChild
          onClick={handleMenuOpen.close}
          variant="ghost"
          size="menu"
          className="w-full  border-border/7 justify-start hover:bg-background"
        >
          <Link
            href="/community"
            className="flex gap-4 w-full items-center py-7 "
          >
            <Icon.globe size={iconSize} strokeWidth={1.25} />
            <TypographyLarge className="font-medium">
              Comunidade
            </TypographyLarge>
          </Link>
        </Button>

        <ModeToggle
          variant="ghost"
          iconSize={iconSize}
          className="flex gap-4 w-full justify-start items-center py-7 border-border/70 hover:bg-background"
          size="menu"
        >
          <TypographyLarge className="font-medium">Tema</TypographyLarge>
        </ModeToggle>

        <LoginButton
          iconSize={iconSize}
          variant="ghost"
          className="w-full border-border/70 px-4 py-7 hover:bg-background"
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
            <div className="flex flex-col items-center justify-center gap-1">
              <Avatar className="cursor-pointer w-6 h-6">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              </Avatar>
              <p className="text-xs font-medium text-muted-foreground">Você</p>
            </div>
          ) : (
            <button className="flex items-center">
              <MenuBtn className={className} iconSize={iconSize}>
                Menu
              </MenuBtn>
            </button>
          )}
        </DrawerTrigger>

        <DrawerContent className="pb-4 px-4 outline-none overflow-hidden">
          {/* Efeitos de glass e gradientes */}
          <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-black/40 dark:to-transparent" />
          <div className="absolute top-2 left-1/4 w-full h-72 dark:bg-gradient-to-b dark:from-purple-500/15 dark:via-transparent dark:to-transparent dark:blur-xl" />
          <div className="absolute top-2 right-1/4 w-full h-72 dark:bg-gradient-to-b dark:from-sky-600/15 dark:via-transparent dark:to-transparent dark:blur-xl" />

          <div className="relative z-10">
            <DrawerHeader className=" w-full flex items-center justify-start">
              <UserInfo />
            </DrawerHeader>
            <div className="flex flex-col items-center w-full">{menuItems}</div>
          </div>
        </DrawerContent>
      </Drawer>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default MobileMenu;
