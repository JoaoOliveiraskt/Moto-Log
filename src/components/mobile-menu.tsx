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
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import TypographyLarge from "./typography/typography-large";
import LoginButton from "./login-button";
import { getMenuItems } from "./menu-links";
import { useStore } from "@/hooks/use-store";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

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

  const menuBlocks = useMemo(() => {
    const items = getMenuItems(isAuthenticated, isLojista, storeSlug);

    return [
      // Bloco 1: Navegação Principal
      {
        title: "Navegação Principal",
        items: items.filter((item) => item.label === "Dashboard"),
      },
      // Bloco 2: Atividades do Usuário
      {
        title: "Atividades",
        items: items.filter((item) =>
          ["Compras", "Seguindo", "Favoritos"].includes(item.label)
        ),
      },
      // Bloco 3: Social
      {
        title: "Social",
        items: items.filter((item) => item.label === "Comunidade"),
      },
      // Bloco 4: Outros
      {
        title: "",
        items: items.filter(
          (item) =>
            ![
              "Dashboard",
              "Compras",
              "Seguindo",
              "Favoritos",
              "Comunidade",
            ].includes(item.label)
        ),
      },
    ];
  }, [isAuthenticated, isLojista, storeSlug]);

  interface MenuItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    color?: string;
    text?: string;
  }

  interface MenuBlock {
    title: string;
    items: Array<MenuItem>;
    color?: string;
    text?: string;
  }

  const renderMenuBlock = (block: MenuBlock, index: number) => {
    if (block.items.length === 0) return null;

    return (
      <div key={index} className="w-full">
        <div className="flex flex-col w-full mb-2 rounded-2xl bg-card overflow-hidden">
          {block.items.map((item, i) => (
            <div key={i}>
              <Button
                asChild
                onClick={handleMenuOpen.close}
                variant="ghost"
                size="menu"
                className="w-full hover:bg-secondary px-3"
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-7"
                >
                  <div className="flex gap-4 w-full items-center">
                    <div
                      className={cn(
                        "w-9 h-9 flex items-center justify-center rounded-xl bg-accent"
                      )}
                    >
                      {item.icon}
                    </div>
                    <TypographyLarge className="font-medium ">
                      {item.label}
                    </TypographyLarge>
                  </div>
                  <Icon.chevronRight size={20} />
                </Link>
              </Button>
              {i < block.items.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    );
  };

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

        <DrawerContent className="pb-4 px-0 outline-none overflow-hidden bg-background">
          <div className="relative z-10 px-4">
            <DrawerHeader className=" w-full flex items-center justify-start px-1">
              <UserInfo />
            </DrawerHeader>
            <div className="flex flex-col items-center w-full">
              {menuBlocks.map(renderMenuBlock)}

              <div className="bg-card rounded-2xl w-full overflow-hidden">
                <ModeToggle
                  variant="ghost"
                  iconSize={16}
                  className="flex gap-4 w-full justify-start items-center py-7 hover:bg-card"
                  size="menu"
                />
                <Separator />
                <LoginButton
                  iconSize={16}
                  variant="ghost"
                  className="w-full pr-4 pl-5 lg:px-4 py-7 hover:bg-card"
                />
              </div>
            </div>
          </div>

          <div className="px-4 w-full mt-2">
            <Link
              onClick={handleMenuOpen.close}
              href="/download-app"
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500/10 to-sky-500/10 border border-indigo-500/20 p-3 flex items-center gap-3 hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Icon.smartphone size={18} className="text-indigo-500" />
              </div>
              <div>
                <span className="font-medium text-sm">Baixar app</span>
                <p className="text-xs text-muted-foreground">
                  Acesso rápido no celular
                </p>
              </div>
            </Link>
          </div>
        </DrawerContent>
      </Drawer>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default MobileMenu;
