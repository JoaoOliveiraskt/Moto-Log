'use client';

import { AvatarInfo } from "./ui/login-button";
import { Separator } from "./ui/separator";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "./ui/button";
import { FiHome } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { useSession } from "next-auth/react";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

const MenuSideBar = () => {
  const status = UserStatus();

  return (
    <Sheet>
      <SheetTrigger className="flex rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
        <AiOutlineMenu size={24} />
      </SheetTrigger>

      <SheetContent>
        <div className="flex flex-col mt-4 space-y-4">
          <AvatarInfo />
        </div>

        <div className="py-4">
          <Separator />
        </div>

        <div className="space-y-2">
          <Button
            variant={"ghost"}
            className="space-x-3 w-full justify-start text-sm tracking-tight"
          >
            <FiHome size={18} />
            <span className="block">Inicio</span>
          </Button>

          {status === "authenticated" && (
            <>
              <Button
                variant={"ghost"}
                className="space-x-3 w-full justify-start text-sm tracking-tight"
              >
                <RiFileList3Line size={18} />
                <span className="block">Meus Pedidos</span>
              </Button>
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
