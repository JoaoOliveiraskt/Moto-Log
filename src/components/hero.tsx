"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Icon from "./icons/icon-component";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

const scrollToSection = () => {
  const element = document.getElementById("category-list");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const animation = (delay: number) => ({
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, duration: 0.7, delay },
});

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const divAnimation = animation(0.2);
  const h1Animation = animation(0.3);
  const pAnimation = animation(0.4);
  const btnAnimation = animation(0.5);
  const trusterAnimation = animation(0.6);

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-5/6 text-center p-4 mt-20 lg:mt-24 w-full b -mb-9 overflow-hidden">
          <motion.div
            {...divAnimation}
            className="px-2 py-1 bg-sky-700 rounded-lg flex items-center justify-center mb-4"
          >
            <span className="text-xs text-center text-white">
              Lançamentos semanais 🎉
            </span>
          </motion.div>
          <motion.div {...h1Animation}>
            <h1
              className=" text-3xl sm:text-7xl font-bold mb-4 max-w-3xl text-foreground tracking-tight bg-gradient-to-b
           dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400  dark:text-transparent dark:bg-clip-text p-2"
            >
              <Balancer>
                O App que simplifica suas compras e vendas online
              </Balancer>
            </h1>
          </motion.div>

          <motion.div {...pAnimation}>
            <p className="text-base md:text-lg mb-8 max-w-md md:max-w-xl text-muted-foreground">
              <Balancer>
                Evite idas às lojas físicas, economize horas e encontre produtos
                de qualidade com facilidade, tudo no conforto da sua casa.
              </Balancer>
            </p>
          </motion.div>
          <motion.div {...btnAnimation} className="flex space-x-4 mb-8">
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
          </motion.div>

          <div className="mb-8 flex flex-col items-center justify-center">
            <motion.div
              {...trusterAnimation}
              className="mx-auto max-w-7xl flex flex-col items-center justify-center"
            >
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
            </motion.div>

            <motion.div
              {...trusterAnimation}
              className="flex gap-1 w-full items-center justify-center mt-6"
            >
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
              <Icon.star className="w-3 h-3 text-orange-400" />
            </motion.div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
