"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Icon from "./icons/icon-component";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import LoginDialog from "./login-dialog";
import TypographyH1 from "./typography/typography-h1";
import { description } from "@/app/dashboard/orders/page";

const scrollToSection = () => {
  const element = document.getElementById("category-list");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const heroContent = {
  title: "O App que simplifica suas compras e vendas online",
  description:  "Evite idas às lojas físicas, economize horas e encontre produtos de qualidade com facilidade, tudo no conforto da sua casa.",
  buttonLoginText: "Criar conta gratuita",
  buttonExploreText: "Explorar",
  badge: "Lançamentos semanais 🎉",
}

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-5/6 text-center p-4 mt-20 lg:mt-24 w-full border-b -mb-9 overflow-hidden">
          <div className="px-2 py-1 bg-sky-700 rounded-lg flex items-center justify-center mb-4">
            <span className="text-xs text-center text-white">
              {heroContent.badge}
            </span>
          </div>
          <div>
            <TypographyH1
              className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 max-w-3xl text-foreground tracking-tight bg-gradient-to-b
           dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400  dark:text-transparent dark:bg-clip-text p-2"
            >
              <Balancer>
                {heroContent.title}
              </Balancer>
            </TypographyH1>
          </div>

          <div>
            <p className="text-base md:text-lg mb-8 max-w-md md:max-w-xl text-muted-foreground">
              <Balancer>
                {heroContent.description}
              </Balancer>
            </p>
          </div>
          <div className="flex space-x-4 mb-8">
            <Button
              onClick={toggleOpen}
              size={"xl"}
              className="rounded-full transition md:text-[1.01rem] font-medium"
            >
              {heroContent.buttonLoginText}
            </Button>
            <Button
              size={"xl"}
              variant={"outline"}
              className="rounded-full md:text-[1.01rem] font-medium"
              onClick={scrollToSection}
            >
              {heroContent.buttonExploreText}
            </Button>
          </div>

          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="mx-auto max-w-7xl flex flex-col items-center justify-center">
              <h2 className="text-center text-sm  text-muted-foreground">
                Com a confiança das equipes mais inovadoras do mundo
              </h2>
              <div className="flex gap-2 mt-4">
                <Image
                  alt="Reform"
                  src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-400.svg"
                  width={158}
                  height={48}
                  className=" max-h-7 w-fit "
                />
                <Image
                  alt="Tuple"
                  src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-400.svg"
                  width={158}
                  height={48}
                  className=" max-h-7 w-fit "
                />
                <Image
                  alt="SavvyCal"
                  src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-400.svg"
                  width={158}
                  height={48}
                  className=" max-h-7 w-fit  "
                />
                <Image
                  alt="Statamic"
                  src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-400.svg"
                  width={158}
                  height={48}
                  className="max-h-7 w-fit "
                />
              </div>
            </div>

            <div className="flex gap-1 w-full items-center justify-center mt-6">
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
            </div>
          </div>
        </div>
        <LoginDialog open={open} onOpenChange={setOpen} />
      </>
    );
  } else {
    return null;
  }
}
