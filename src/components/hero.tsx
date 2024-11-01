"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Balancer from "react-wrap-balancer";
import Icon from "./icons/icon-component";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "./login-dialog";
import TypographyH1 from "./typography/typography-h1";
import TypographyP from "./typography/typography-p";
import TypographySmall from "./typography/typography-small";

const heroContent = {
  title: "O App que simplifica suas compras e vendas online",
  description:
    "Evite idas às lojas físicas, economize horas e encontre produtos de qualidade com facilidade, tudo no conforto da sua casa.",
  buttonLoginText: "Criar conta gratuita",
  buttonExploreText: "Explorar",
  badge: "Lançamentos semanais 🎉",
};

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const scrollToSection = () => {
    if (typeof window !== "undefined") {
      const element = document.getElementById("category-list");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 max-w-3xl text-foreground tracking-tighter bg-gradient-to-br
           dark:from-white dark:via-neutral-200 dark:to-neutral-400  dark:text-transparent dark:bg-clip-text p-2"
            >
              <Balancer>{heroContent.title}</Balancer>
            </TypographyH1>
          </div>

          <div>
            <TypographyP className="text-xs md:text-lg mb-8 max-w-md md:max-w-xl text-muted-foreground">
              <Balancer>{heroContent.description}</Balancer>
            </TypographyP>
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
              <TypographySmall className="text-center text-muted-foreground">
                Com a confiança das equipes mais inovadoras do mundo
              </TypographySmall>
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
