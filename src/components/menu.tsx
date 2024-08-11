"use client";

import { AvatarInfo } from "./login-button";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "./ui/button";
import { FiHome } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./theme/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "./ui/scroll-area";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const Menu = ({ className, children }: Props) => {
  const status = UserStatus();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = {
    open: () => setIsMenuOpen(true),
    close: () => setIsMenuOpen(false),
  };

  const categories = [
    { name: "Roupas", id: "b0361d7c-45ce-467c-848f-7f688836de9c" },
    { name: "Calçados", id: "eecfa450-a377-4a2f-9a02-68ed93eaf9ff" },
    { name: "Eletrônicos", id: "3e9c3254-a79f-4b6e-9c42-ee9db1496dfb" },
    { name: "Acessórios", id: "533c7754-7693-4ed1-96c5-3ddcfae6701e" },
    { name: "Cosméticos", id: "d83e8be0-11ba-4fc0-82fe-41835580ae9b" },
    { name: "Livros", id: "43bc0bd2-d5df-440b-9047-6f9d429de1a5" },
  ];

  const stores = [
    { name: "Zapato", id: "245de65a-039c-4f12-ac6d-e3b4cfebb122" },
    { name: "ModaCool", id: "27974a9e-9d89-43c0-81b2-11552eb71e66" },
    { name: "ShoeSpot", id: "97bf7c2e-ec22-4965-99cf-ce5ffa685bb4" },
    { name: "TechMart", id: "aaf1d3af-4980-4f1d-b559-3610de769a85" },
    { name: "StyleCraze", id: "ea067f63-1629-4e76-bb9e-f54b9b8fb045" },
  ];

  return (
    
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
        <Button
          onClick={handleMenuOpen.open}
          variant="icon"
          size="icon"
          className={`flex flex-col gap-1 cursor-pointer outline-none border-none ${className}`}
        >
          <AiOutlineMenu size={24} />
          <p>{children}</p>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 px-2 bg-background/45 dark:bg-background/70 backdrop-blur-3xl">
        <DropdownMenuLabel className="flex flex-col space-y-4">
          <div onClick={handleMenuOpen.close}>
            <AvatarInfo />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

      
      <div className="space-y-2">
          <Link href={"/"} className="block" onClick={handleMenuOpen.close}>
            <Button
              variant={"ghost"}
              className="space-x-3 w-full justify-start text-sm tracking-tight cursor-default"
            >
              <FiHome size={18} className="text-foreground" />
              <p className="block text-foreground">Início</p>
            </Button>
          </Link>

          <Link
            href={status === "authenticated" ? "/my-orders" : "/login"}
            className="block"
            onClick={handleMenuOpen.close}
          >
            <Button
              variant={"ghost"}
              className="space-x-3 w-full justify-start text-sm tracking-tight cursor-default"
            >
              <RiFileList3Line size={18} className="text-foreground" />

              <p className="block text-foreground">Meus Pedidos</p>
            </Button>
          </Link>

          <ModeToggle className="cursor-default flex gap-3 px-4 w-full justify-start text-sm tracking-tight">
            <span className="text-foreground">Tema</span>
          </ModeToggle>
        </div>

        <DropdownMenuSeparator />

        <>
          <Accordion type="single" collapsible className="w-full border rounded-lg">
            <AccordionItem value="item-1" className="">
              <AccordionTrigger className="hover:no-underline ">
            
                  Categorias
             
              </AccordionTrigger>
              {categories.map((category, index) => (
                <AccordionContent
                  key={index}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <Link href={`/category/${category.id}`}>
                    <Button
                      variant={"ghost"}
                      className="space-x-3 w-full justify-start text-sm tracking-tight cursor-default"
                    >
                      <p className="block text-sm">{category.name}</p>
                    </Button>
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion >
        </>
     
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
