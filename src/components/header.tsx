/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/moto-log-logo.png";
import DropdownCategory from "./dropdown-category";
import DropdownStore from "./dropdown-store";
import CartButton from "./ui/cart-button";
import MenuSideBar from "./menu-sidebar";
import { ModeToggle } from "./theme/theme-switcher";
import Container from "./container";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Sobre", href: "#" },
  { name: "Serviços", href: "#" },
];

export default function Header() {
  return (
    <div className="border-t border-zinc-400/65 dark:border-zinc-800 fixed bottom-0 sm:top-0 z-10 w-full h-max px-2 sm:px-0 pb-8 p-2 sm:py-4 bg-background">
      <Container className="flex items-center justify-center">
        <div className="w-full flex items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="font-black text-4xl" href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={40}
                height={40}
                priority
                className="z-50"
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global" className="">
              <ul className="flex items-center gap-6 text-sm">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      className="transition text-primary hover:text-muted-foreground dark:text-muted-foreground dark:hover:text-primary"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                <li>
                  <DropdownCategory />
                </li>

                <li>
                  <DropdownStore />
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="flex">
              <CartButton />
            </div>

            <MenuSideBar />
          </div>
        </div>
      </Container>
    </div>
  );
}
