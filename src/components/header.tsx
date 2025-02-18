"use client";

import Menu from "./menu";
import SearchInput from "./search-input";
import CartButton from "./cart-button";
import MotoLogLogo from "./icons/moto-log-logo";
import HeaderLoginBtn from "./header-login-btn";
import Icon from "./icons/icon-component";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 0);
    });
  }, [scrollY]);
  return (
    <motion.header
      className={cn(
        "hidden lg:flex fixed top-0 z-40 h-14 w-screen xl:pr-4",
        isScrolled ? "bg-background" : ""
      )}
      animate={{
        backdropFilter: isScrolled ? "blur(200px)" : "blur(0px)",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      <div className="h-full w-full relative mx-auto px-4  lg:px-6 flex items-center justify-between">
        <div className="hover:scale-105 active:scale-95 h-fit">
          <MotoLogLogo />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <SearchInput className="w-96 xl:w-[32rem]" />
        </div>

        <div className="flex items-center gap-x-6">
          <HeaderLoginBtn className="h-8 text-xs" />

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Link href="/community">
                  <Icon.globe size={20} className="rotate-45" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Comunidade</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <CartButton
                  iconSize={20}
                  model="icon"
                  className="!text-foreground"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">Carrinho</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Menu
                  iconSize={20}
                  className="bg-background shadow-sm !text-foreground"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">Menu</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.header>
  );
}
