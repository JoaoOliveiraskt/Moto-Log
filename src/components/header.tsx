import Menu from "./menu";
import SearchInput from "./search-input";
import CartSideBar from "./cart-button";
import { ModeToggle } from "./theme/theme-switcher";
import Container from "./container";
import MotoLogLogo from "./icons/moto-log-logo";

export default function Header() {
  return (
    <div className="hidden lg:flex fixed top-0 z-10 h-[72px] bg-background w-screen">
      <Container className="h-full w-full relative">
        <div className="w-full h-full flex items-center justify-between">
          <div className="w-fit flex items-center gap-10">
            <div className="md:flex md:items-center md:gap-3">
              <MotoLogLogo />
            </div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <SearchInput className="w-96 xl:w-[30rem] " />
          </div>
          <div className="flex items-center w-auto gap-2">
            <div className="flex items-center gap-2">
              <ModeToggle className="border-none text-muted-foreground" />
              
              <CartSideBar
                iconSize={18}
                model="outline"
                className="border-none"
              />

              <Menu
                iconSize={18}
                className="h-9 w-9 bg-background hover:bg-accent shadow-sm"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
