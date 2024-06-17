/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/moto-log-logo.png";
import DropdownCategory from "./dropdown-category";
import DropdownStore from "./dropdown-store";
import CartButton from "./ui/cart-button";
import MenuSideBar from "./menu-sidebar";

export default function Header() {
  return (
    <header className="bg-white px-4">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex h-16 items-center justify-between">
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
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Sobre{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Serviços{" "}
                  </Link>
                </li>

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
            <div className="flex">
              <CartButton />
            </div>

            <MenuSideBar />
          </div>
        </div>
      </div>
    </header>
  );
}
