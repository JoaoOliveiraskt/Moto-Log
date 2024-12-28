"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Link } from "next-view-transitions";
import LoginButton from "@/components/login-button";
import UserInfo from "@/components/user-info";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./theme/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/icons/icon-component";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "./login-dialog";
import MenuBtn from "./menu-btn";
import Loader from "./ui/loader";
import { Separator } from "./ui/separator";

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

  const isLojista = useMemo(() => session?.user.role === "LOJISTA", [session]);

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
            className="flex gap-3 px-4 w-full justify-between py-6  mt-4"
          >
            <span className=" tracking-wide">Início</span>
            <Icon.home size={20} />
          </Button>
        </Link>

        {isLojista && (
          <Link href="/dashboard/products">
            <Button
              onClick={handleMenuOpen.close}
              variant="ghost"
              size="menu"
              className="flex gap-3 px-4 w-full justify-between py-6 "
            >
              <span className=" tracking-wide">Dashboard</span>
              <Icon.dashboard size={20} />
            </Button>
          </Link>
        )}

        {isAuthenticated && (
          <Link href={"/my-orders"}>
            <Button
              onClick={handleMenuOpen.close}
              variant="ghost"
              size="menu"
              className="flex gap-3 px-4 w-full justify-between py-6 "
            >
              <span className=" tracking-wide">Pedidos</span>
              <Icon.order size={20} />
            </Button>
          </Link>
        )}

        {!isLojista && (
          <Link href="/welcome-create-store">
            <Button
              onClick={handleMenuOpen.close}
              variant="ghost"
              size="menu"
              className="flex gap-3 px-4 w-full justify-between py-6"
            >
              <span className=" tracking-wide">Vender agora</span>
              <Icon.sell size={20} />
            </Button>
          </Link>
        )}

        <ModeToggle
          iconSize={20}
          className="flex flex-row-reverse gap-3 px-4 w-full justify-between py-6  mb-4"
          size="menu"
        >
          <span className=" tracking-wide">Tema</span>
        </ModeToggle>
      </>
    ),
    [isAuthenticated, isLojista, handleMenuOpen.close]
  );

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
              <UserInfo />
              <Separator />
            </div>
          )}
          <div className="flex-col flex gap-y-2 px-2">{menuItems}</div>
          <Separator />
          <LoginButton className="rounded-none" iconSize={20}>
            {isAuthenticated ? (
              <span className=" tracking-wide">Sair</span>
            ) : (
              <span className=" tracking-wide">Entrar</span>
            )}
          </LoginButton>
        </DropdownMenuContent>
      </DropdownMenu>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default Menu;
