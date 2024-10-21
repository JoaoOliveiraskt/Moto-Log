import Menu from "./menu";
import SearchInput from "./search-input";
import CartButton from "./cart-button";
import Container from "./container";
import MotoLogLogo from "./icons/moto-log-logo";
import HeaderLoginBtn from "./header-login-btn";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavDashboard from "@/app/dashboard/components/nav";

export default function Header() {
  return (
    <div className="hidden lg:flex fixed top-0 z-40 h-[72px] bg-background w-screen">
      <Container className="h-full w-full relative lg:min-w-full">
        <div className="w-full h-full flex items-center justify-between">
          <div className="w-fit flex items-center gap-10">
            <div className="md:flex md:items-center md:gap-3">
              <MotoLogLogo />
            </div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <SearchInput className="w-96 xl:w-[30rem]" />
          </div>
          <div className="flex items-center w-auto gap-2">
            <div className="flex items-center gap-2">
              <HeaderLoginBtn />

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <CartButton iconSize={18} model="ghost" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Carrinho</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Menu
                      iconSize={20}
                      className="h-9 w-9 bg-background hover:bg-accent shadow-sm !text-foreground"
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
