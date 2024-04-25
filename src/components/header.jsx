/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import Logo from "../../public/moto-log-logo.png"

export default function Header() {
    return (
      <header className="bg-white px-4">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="font-black text-4xl" href="#">            
                <Image 
                src={Logo}
                alt="Logo" 
                width={40} 
                height={40}   
                className="z-50"         
                />
              </Link>
            </div>
      
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> Home </Link>
                  </li>   
                  <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> Sobre </Link>
                  </li>
      
                  <li>
                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> Serviços </Link>
                  </li>
                </ul>
              </nav>
            </div>
      
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link
                  className="text-sm font-medium text-white"
                  href="#"
                >
                  <Button  className="shadow-xl">Login</Button>
                </Link>
      
                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-gray-100 text-sm font-medium shadow-md"
                    href="#"
                  >
                    <Button variant="outline">Registrar</Button>
                  </Link>
                </div>
              </div>
      
              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }