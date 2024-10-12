"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { useSession } from "next-auth/react";
import Icon from "./icons/icon-component";

const scrollToSection = () => {
  const element = document.getElementById("category-list");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

export default function Hero() {
  const status = UserStatus();

  if (status !== "authenticated") {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-5/6 text-center p-4 mt-20 lg:mt-24 w-full border-b -mb-9 overflow-hidden">
          <div className="px-2 py-1 bg-sky-700 rounded-lg flex items-center justify-center mb-4">
            <span className="text-xs text-center text-white">
              Lançamentos semanais 🎉
            </span>
          </div>
          <h1 className=" text-3xl sm:text-7xl font-bold mb-4 max-w-3xl text-foreground tracking-tight bg-gradient-to-b dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400  dark:text-transparent dark:bg-clip-text p-2">
            <Balancer>
              O App que simplifica suas compras e vendas online
            </Balancer>
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-md md:max-w-xl text-muted-foreground">
            <Balancer>
              Evite idas às lojas físicas, economize horas e encontre produtos
              de qualidade com facilidade, tudo no conforto da sua casa.
            </Balancer>
          </p>
          <div className="flex space-x-4 mb-8">
            <Button size={"xl"} className="rounded-full transition">
              <Link href={"/login"} className="md:text-[1.01rem] font-medium">
                Criar conta gratuita
              </Link>
            </Button>
            <Button
              size={"xl"}
              variant={"outline"}
              className="rounded-full md:text-[1.01rem] font-medium"
              onClick={scrollToSection}
            >
              Explorar
            </Button>
          </div>

          <div className="mb-8">
            <div className="mx-auto max-w-7xl flex flex-col items-center justify-center">
              <h2 className="text-center text-sm  text-muted-foreground">
                Com a confiança das equipes mais inovadoras do mundo
              </h2>
              <div className="flex mt-4">
                <img
                  alt="Reform"
                  src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-400.svg"
                  width={158}
                  height={48}
                  className="col-span-2 max-h-7 w-full object-contain lg:col-span-1"
                />
                <img
                  alt="Tuple"
                  src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-400.svg"
                  width={158}
                  height={48}
                  className="col-span-2 max-h-7 w-full object-contain lg:col-span-1"
                />
                <img
                  alt="SavvyCal"
                  src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-400.svg"
                  width={158}
                  height={48}
                  className="col-span-2 max-h-7 w-full object-contain sm:col-start-2 lg:col-span-1"
                />
                <img
                  alt="Statamic"
                  src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-400.svg"
                  width={158}
                  height={48}
                  className="col-span-2  max-h-7 w-full object-contain sm:col-start-auto lg:col-span-1"
                />
              </div>
            </div>

            <div className="flex gap-0.5 w-full items-center justify-center mt-6">
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
