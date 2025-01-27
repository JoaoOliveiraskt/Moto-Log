"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./theme/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "./login-dialog";
import MenuBtn from "./menu-btn";
import Loader from "./ui/loader";
import { Separator } from "./ui/separator";
import LoginButton from "@/components/login-button";
import UserInfo from "@/components/user-info";
import { useStore } from "@/hooks/use-store";
import { getMenuItems } from "./menu-links";

interface Props {
  className?: string;
  children?: React.ReactNode;
  iconSize?: number;
}

const Menu = ({ className, children, iconSize }: Props) => {
  const { isAuthenticated, user, loading } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { data: storeData } = useStore();

  const storeSlug = storeData?.slug || "";

  const isLojista = useMemo(() => session?.user.role === "LOJISTA", [session]);

  const handleMenuOpen = {
    open: () => setIsMenuOpen(true),
    close: () => setIsMenuOpen(false),
  };

  const menuItems = useMemo(() => {
    return getMenuItems(isAuthenticated, isLojista, storeSlug).map(
      (item, i) => (
        <Link key={i} href={item.href}>
          <Button
            onClick={handleMenuOpen.close}
            variant="ghost"
            size="menu"
            className="flex gap-4 items-center px-4 w-full justify-start py-6"
          >
            {item.icon}
            <span className="tracking-wide">{item.label}</span>
          </Button>
        </Link>
      )
    );
  }, [isAuthenticated, isLojista, storeSlug, handleMenuOpen.close]);

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        {loading ? (
          <div className="w-9 h-9 rounded-full bg-accent animate-pulse"></div>
        ) : (
          <DropdownMenuTrigger asChild>
            {isAuthenticated ? (
              <Avatar className="cursor-pointer">
                {loading ? (
                  <Loader size={16} />
                ) : (
                  <AvatarImage
                    src={user?.image as string}
                    alt={user?.name as string}
                  />
                )}
              </Avatar>
            ) : (
              <div>
                <MenuBtn className={className} iconSize={iconSize}>
                  {children}
                </MenuBtn>
              </div>
            )}
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent
          align="end"
          className="bg-card rounded-2xl w-64 min-w-64 shadow-2xl"
        >
          {isAuthenticated && (
            <div>
              <UserInfo className="py-4 pl-6" />
              <Separator />
            </div>
          )}
          <div className="flex-col flex p-2">
            {menuItems}
            <ModeToggle
              iconSize={20}
              className="flex gap-4 items-center px-4 w-full justify-start py-6  mb-2"
              size="menu"
            >
              <span className=" tracking-wide">Tema</span>
            </ModeToggle>
          </div>
          <Separator />
          <LoginButton className="rounded-none" iconSize={20}>
            <span className="tracking-wide">
              {isAuthenticated ? "Sair" : "Entrar"}
            </span>
          </LoginButton>
        </DropdownMenuContent>
      </DropdownMenu>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default Menu;
