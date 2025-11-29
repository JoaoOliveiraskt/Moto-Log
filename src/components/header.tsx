"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Menu from "./menu";
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

import SearchDialog from "./search-dialog";
import SearchInputButton from "@/app/search/components/search-input-button";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isResultsPage = pathname === "/search/results";
  const searchTerm = searchParams.get("q") || "";

  return (
    <header className="hidden lg:flex fixed top-0 z-40 h-14 w-screen xl:pr-4 bg-background border-b">
      <div className="h-full w-full relative mx-auto px-4 lg:px-6 flex items-center justify-between">
        <div className="hover:scale-105 active:scale-95 h-fit">
          <MotoLogLogo />
        </div>

        <div className="flex items-center gap-x-6">
          <HeaderLoginBtn className="h-8 text-xs" />

          {isResultsPage ? (
            <SearchInputButton searchTerm={searchTerm} />
          ) : (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SearchDialog>
                    <button className="hover:text-primary transition-colors">
                      <Icon.search size={22} />
                    </button>
                  </SearchDialog>
                </TooltipTrigger>
                <TooltipContent side="bottom">Pesquisar (Ctrl+K)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

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
    </header>
  );
}
