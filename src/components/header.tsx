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

export default function Header() {
  return (
    <div className="hidden lg:flex fixed top-0 z-40 h-14 bg-background w-screen lg:pr-4">
      <div className="h-full w-full max-w-[1290px] relative mx-auto px-4 xl:px-0 flex items-center justify-between">
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
                  <Icon.globe size={18} className="rotate-45" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Comunidade</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <CartButton
                  iconSize={18}
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
                  iconSize={18}
                  className="bg-background shadow-sm !text-foreground"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">Menu</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
