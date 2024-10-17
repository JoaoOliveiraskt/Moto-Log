"use client";

import LoginButton, { AvatarInfo } from "./login-button";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./theme/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import icon from "@/components/icons/icon-component";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "./login-dialog";
import { Avatar, AvatarImage } from "./ui/avatar";
import MenuBtn from "./menu-btn";

interface Props {
  className?: string;
  children?: React.ReactNode;
  iconSize?: number;
  model?: string;
}

const Menu = ({ className, children, iconSize, model }: Props) => {
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isLojista = session?.user.role === "LOJISTA";
  const [openDialog, setOpenDialog] = useState(false);

  const toggleOpen = () => setOpenDialog(!openDialog);

  const handleMenuOpen = {
    open: () => setIsMenuOpen(true),
    close: () => setIsMenuOpen(false),
  };

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger onClick={handleMenuOpen.open}>
          {isAuthenticated ? (
            <Avatar>
              <AvatarImage
                src={user?.image as string | undefined}
                alt={user?.name as string | undefined}
              />
            </Avatar>
          ) : (
            <MenuBtn>{children}</MenuBtn>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="px-2 py-2 bg-card rounded-xl text-foreground min-w-64"
          align="end"
        >
          <AvatarInfo onClick={handleMenuOpen.close} size={"menu"} />

          <div className="space-y-0">
            <Link href={"/"} className="block" onClick={handleMenuOpen.close}>
              <Button
                variant={"ghost"}
                size={"menu"}
                className="space-x-3 w-full justify-start text-sm tracking-tight"
              >
                <icon.home size={18} className="" />
                <p className="block ">Início</p>
              </Button>
            </Link>

            {isLojista && (
              <Link
                href="/dashboard/products"
                passHref
                onClick={handleMenuOpen.close}
              >
                <Button
                  variant={"ghost"}
                  size={"menu"}
                  className="space-x-3 w-full justify-start text-sm tracking-tight"
                >
                  <icon.dashboard size={18} />
                  <p className="block ">Dashboard</p>
                </Button>
              </Link>
            )}

            <Link
              href={isAuthenticated ? "/my-orders" : ""}
              className="block"
              onClick={handleMenuOpen.close}
            >
              <Button
                onClick={isAuthenticated ? undefined : toggleOpen}
                variant={"ghost"}
                size={"menu"}
                className="space-x-3 w-full justify-start text-sm tracking-tight"
              >
                <icon.order size={18} />

                <p className="block ">Meus Pedidos</p>
              </Button>
            </Link>

            {!isLojista && (
              <Link
                href="/welcome-create-store"
                passHref
                onClick={handleMenuOpen.close}
              >
                <Button
                  variant={"ghost"}
                  size={"menu"}
                  className="space-x-3 w-full justify-start text-sm tracking-tight"
                >
                  <icon.sell size={18} />
                  <p className="block ">Vender Agora</p>
                </Button>
              </Link>
            )}

            <ModeToggle
              className="flex gap-3 px-4 w-full justify-start"
              size={"menu"}
            >
              <span>Tema</span>
            </ModeToggle>

            {isAuthenticated && (
              <LoginButton
                size={"menu"}
                className="w-full bg-transparent justify-start border-none"
              />
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default Menu;
