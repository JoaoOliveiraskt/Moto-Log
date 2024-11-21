import Menu from "./menu";
import SearchInput from "./search-input";
import CartButton from "./cart-button";
import Container from "./container";
import MotoLogLogo from "./icons/moto-log-logo";
import HeaderLoginBtn from "./header-login-btn";
import Icon from "./icons/icon-component";
import { Link } from "next-view-transitions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header() {
  return (
    <div className="hidden lg:flex fixed top-0 z-40 h-16 bg-background w-screen">
      <Container className="h-full w-full relative">
        <div className="w-full h-full flex items-center justify-between">
          <div className="hover:scale-105 active:scale-95 h-fit">
            <MotoLogLogo />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <SearchInput className="w-96 xl:w-[32rem]" />
          </div>
          <div className="flex items-center w-auto gap-2">
            <div className="flex items-center gap-4">
              <HeaderLoginBtn />
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/community">
                      <Icon.globe size={19} className="rotate-45" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Comunidade</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <CartButton iconSize={19} model="icon" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Carrinho</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Menu
                      iconSize={22}
                      className="bg-background shadow-sm !text-foreground"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Menu</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
