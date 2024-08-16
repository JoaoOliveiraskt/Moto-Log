import Link from "next/link";
import DropdownCategory from "./dropdown-category";
import DropdownStore from "./dropdown-store";
import Menu from "./menu";
import { TbSquareLetterMFilled } from "react-icons/tb";
import SearchInput from "./search-input";
import CartSideBar from "./cart-button";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import { ModeToggle } from "./theme/theme-switcher";

const logoFont = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Header() {
  return (
    <div className="hidden lg:block fixed top-0 z-10 h-[72px] bg-background w-screen">
      <div className="h-full w-full mx-auto max-w-[1740px] px-4 relative">
        <div className="w-full h-full flex items-center justify-between">
          <div className="w-fit flex items-center gap-10">
            <div className="md:flex md:items-center md:gap-3">
              <Link className=" flex items-center gap-3" href="/">
                <TbSquareLetterMFilled size={35} />
                <p className={`${logoFont.className} text-xl `}>Moto/Log</p>
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
              <ModeToggle className="border-none"/>
              <CartSideBar
                iconSize={18}
                model="outline"
                className="border-none"
              />

              <Menu
                iconSize={18}
                // Estilização do botão
                className="h-9 w-9 rounded-md bg-background hover:bg-accent shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
