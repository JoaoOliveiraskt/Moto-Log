"use client";

import { AvatarInfo } from "./login-button";
import { Separator } from "./ui/separator";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "./ui/button";
import { FiHome } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./theme/theme-switcher";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const MenuSideBar = ({className, children}: Props) => {
  const status = UserStatus();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = {
    open: () => setIsMenuOpen(true),
    close: () => setIsMenuOpen(false),
  };

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <div className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">

      <Button
        onClick={handleMenuOpen.open}
        variant="icon"
        size="icon"
        className={`flex flex-col gap-1 cursor-pointer outline-none border-none ${className}`}
      >
        <AiOutlineMenu size={24} />
        <p>{children}</p>
      </Button>
      </div>

      <SheetContent>
        <div className="flex flex-col mt-4 space-y-4">
          <div onClick={handleMenuOpen.close}><AvatarInfo /></div>
        </div>

        <div className="py-4">
          <Separator />
        </div>

        <div className="space-y-2">
          <Link href={"/"} className="block" onClick={handleMenuOpen.close}>
            <Button
              variant={"ghost"}
              className="space-x-3 w-full justify-start text-sm tracking-tight"
            >
              <FiHome size={18} className="text-foreground"/>
              <p className="block text-foreground">Início</p>
            </Button>
          </Link>

          {status === "authenticated" && (
            <>
              <Link
                href={"/my-orders"}
                className="block"
                onClick={handleMenuOpen.close}
              >
                <Button
                  variant={"ghost"}
                  className="space-x-3 w-full justify-start text-sm tracking-tight"
                >
                  <RiFileList3Line size={18} className="text-foreground"/>

                  <p className="block text-foreground">Meus Pedidos</p>
                </Button>
              </Link>
              <Button
                variant={"ghost"}
                className="space-x-3 w-full justify-start text-sm tracking-tight text-foreground"
              >
                <MdFavoriteBorder size={18} className="text-foreground"/>
                <span className="block text-foreground">Favoritos</span>
              </Button>
            </>
          )}

          <ModeToggle className="flex gap-3 px-4 w-full justify-start text-sm tracking-tight">
            <span className="text-foreground">Tema</span>
          </ModeToggle>
        </div>

        <div className="py-4">
          <Separator />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSideBar;
