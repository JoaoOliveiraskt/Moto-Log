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

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

const MenuSideBar = () => {
  const status = UserStatus();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = {
    open: () => setIsMenuOpen(true),
    close: () => setIsMenuOpen(false),
  };

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <Button
        onClick={handleMenuOpen.open}
        variant={"ghost"}
        className="flex rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
      >
        <AiOutlineMenu size={24} />
      </Button>

      <SheetContent>
        <div className="flex flex-col mt-4 space-y-4">
          <AvatarInfo />
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
              <FiHome size={18} />
              <p>Início</p>
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
                  <RiFileList3Line size={18} />

                  <p>Meus Pedidos</p>
                </Button>
              </Link>
              <Button
                variant={"ghost"}
                className="space-x-3 w-full justify-start text-sm tracking-tight"
              >
                <MdFavoriteBorder size={18} />
                <span className="block">Favoritos</span>
              </Button>
            </>
          )}
        </div>

        <div className="py-4">
          <Separator />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSideBar;
