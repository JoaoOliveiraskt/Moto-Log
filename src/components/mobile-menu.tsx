"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import TypographyLarge from "./typography/typography-large";
import LoginButton from "./login-button";
import { getMenuItems } from "./menu-links";
import { useStore } from "@/hooks/use-store";

interface Props {
  className?: string;
  iconSize?: number;
}

const MobileMenu = ({ className, iconSize = 24 }: Props) => {
  const { isAuthenticated, user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isLojista = useMemo(() => session?.user.role === "LOJISTA", [session]);
  const { data: storeData } = useStore();

  const storeSlug = storeData?.slug || "";

  const handleMenuOpen = {
    open: () => setIsMenuOpen(true),
    close: () => setIsMenuOpen(false),
  };

  const menuItems = useMemo(() => {
    return getMenuItems(isAuthenticated, isLojista, storeSlug).map(
      (item, i) => (
        <Button
          key={i}
          asChild
          onClick={handleMenuOpen.close}
          variant="ghost"
          size="menu"
          className="w-full border-border/7 justify-start hover:bg-background"
        >
          <Link
            href={item.href}
            className="flex gap-4 w-full items-center py-7 "
          >
            {item.icon}
            <TypographyLarge className="font-medium">
              {item.label}
            </TypographyLarge>
          </Link>
        </Button>
      )
    );
  }, [isAuthenticated, isLojista, storeSlug, handleMenuOpen.close]);

  return (
    <>
      <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerTrigger asChild>
          {isAuthenticated ? (
            <div>
              <Avatar className="cursor-pointer w-6 h-6">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              </Avatar>
            </div>
          ) : (
            <div>
              <MenuBtn className={className} iconSize={iconSize} />
            </div>
          )}
        </DrawerTrigger>

        <DrawerContent className="pb-2 px-0 outline-none overflow-hidden">
          <div className="relative z-10 px-4">
            <DrawerHeader className=" w-full flex items-center justify-start">
              <UserInfo />
            </DrawerHeader>
            <div className="flex flex-col items-center w-full ">
              {menuItems}

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
                  <Icon.globe size={iconSize} />
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
                  <TypographyLarge className="font-medium">
                    Sair
                  </TypographyLarge>
                ) : (
                  <TypographyLarge className="font-medium">
                    Entrar
                  </TypographyLarge>
                )}
              </LoginButton>
            </div>
          </div>
          <DrawerFooter className="py-4 px-0">
            <div className="px-8">
              <Link
                onClick={handleMenuOpen.close}
                href={"/download-app"}
                className="text-sm text-muted-foreground hover:text-sky-600 underline"
              >
                Baixar app
              </Link>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default MobileMenu;
