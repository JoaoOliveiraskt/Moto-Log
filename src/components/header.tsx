import Link from "next/link";
import Menu from "./menu";
import { TbSquareLetterMFilled } from "react-icons/tb";
import SearchInput from "./search-input";
import CartSideBar from "./cart-button";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import { ModeToggle } from "./theme/theme-switcher";
import Container from "./container";

const logoFont = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Header() {
  return (
    <div className="hidden lg:flex fixed top-0 z-10 h-[72px] bg-background w-screen">
      <Container className="h-full w-full relative">
        <div className="w-full h-full flex items-center justify-between">
          <div className="w-fit flex items-center gap-10">
            <div className="md:flex md:items-center md:gap-3">
              <Link className=" flex items-center gap-3" href="/">
              <svg width="128" height="60" viewBox="0 0 128 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-20 w-[43px] fill-fg-primary" data-sentry-element="svg" data-sentry-source-file="MobbinLogo.tsx" data-sentry-component="MobbinLogo"><title>Mobbin</title><path d="M128 28H96V60H128V28Z" data-sentry-element="path" data-sentry-source-file="MobbinLogo.tsx"></path><path d="M0 59.9998V31.8268L31.8268 0H59.9998V28.1731L28.1731 59.9998H0Z" data-sentry-element="path" data-sentry-source-file="MobbinLogo.tsx"></path><path d="M48 59.9998V31.8268L79.8268 0H108V28.1731L76.1731 59.9998H48Z" data-sentry-element="path" data-sentry-source-file="MobbinLogo.tsx"></path></svg>
              </Link>
            </div>

            {/* 
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-5 tracking-tight text-foreground font-medium ">
                  <li>
                    <DropdownCategory />
                  </li>

                  <li>
                    <DropdownStore />
                  </li>
                </ul>
              </nav>
            </div>
         */}
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <SearchInput className="w-96 xl:w-[30rem] " />
          </div>
          <div className="flex items-center w-auto gap-2">
            <div className="flex items-center gap-2">
              <ModeToggle className="border-none text-muted-foreground rounded-full"/>
              <CartSideBar
                iconSize={18}
                model="outline"
                className="border-none rounded-full"
              />

              <Menu
                iconSize={18}
                // Estilização do botão
                className="h-9 w-9 rounded-full bg-background hover:bg-accent shadow-sm"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
