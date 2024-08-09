/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/moto-log-logo.png";
import DropdownCategory from "./dropdown-category";
import DropdownStore from "./dropdown-store";
import CartSideBar from "./ui/cart-button";
import MenuSideBar from "./menu-sidebar";
import { ModeToggle } from "./theme/theme-switcher";
import Container from "./container";
import { TbHexagonLetterM } from "react-icons/tb";
import { TbCircleLetterMFilled } from "react-icons/tb";
import { TbSquareRoundedLetterMFilled } from "react-icons/tb";

const navLinks = [
  { name: "", href: "/" },
];

export default function Header() {
  return (
    <div className="hidden lg:block fixed top-0 z-10 w-full h-max py-3 bg-background">
      <Container className="flex items-center justify-center">
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-center gap-5">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="font-black text-4xl" href="/">
                <TbSquareRoundedLetterMFilled size={40} />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global" className="">
                <ul className="flex items-center gap-5 tracking-tight text-muted-foreground font-medium ">
                 {/*} {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        className="transition hover:text-foreground"
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}*/}

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

          <div className="flex items-center">
            <ModeToggle />

            <CartSideBar />

            <MenuSideBar />
          </div>
        </div>
      </Container>
    </div>
  );
}
