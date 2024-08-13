import Link from "next/link";
import DropdownCategory from "./dropdown-category";
import DropdownStore from "./dropdown-store";
import Menu from "./menu";
import { TbSquareLetterMFilled } from "react-icons/tb";
import SearchInput from "./search-input";
import CartSideBar from "./cart-button";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";

const logoFont = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Header() {
  return (
    <div className="hidden lg:block fixed top-0 z-10 h-16 bg-background w-screen">
      <div className="h-full max-w-screen-2xl mx-auto px-4">
        <div className="w-full h-full flex items-center justify-between">
          <div className="w-fit flex items-center gap-10">
            <div className="md:flex md:items-center md:gap-3">
              <Link className=" flex items-center gap-3" href="/">
                <TbSquareLetterMFilled size={35} />
                <p className={`${logoFont.className} text-xl `}>Moto/Log</p>
              </Link>
            </div>

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
          </div>

          <div className="flex items-center justify-between w-auto gap-2">
            <SearchInput className="w-96" />
            <div className="flex items-center justify-between  gap-2">
              <CartSideBar iconSize={18} model="outline" />

              <Menu
                iconSize={18}
                className="h-9 w-9 border border-input bg-background shadow-sm hover:bg-accent rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
