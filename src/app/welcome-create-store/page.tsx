"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import TypographyH1 from "@/components/typography/typography-h1";
import TypographyP from "@/components/typography/typography-p";
import Balancer from "react-wrap-balancer";

const h1Animation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, duration: 0.5 },
};

const pAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, duration: 0.7, delay: 0.2 },
};

const buttonAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, duration: 0.9, delay: 0.4 },
};

export default function WelcomeCreateStore() {
  return (
    <main className="max-w-full h-screen flex flex-col items-center justify-center sm:max-w-md mx-auto">
      <div className="-top-8 lg:-top-48 relative flex flex-col items-center justify-center gap-y-6 px-4">
        <div className="w-full gap-y-2 flex flex-col items-center justify-center">
          <motion.div {...h1Animation} className="max-w-xs">
            <TypographyH1 className="text-center text-xl lg:text-2xl font-semibold !tracking-tight dark:text-white">
              Seja bem-vindo ao Moto Log
            </TypographyH1>
          </motion.div>
          <motion.div {...pAnimation}>
            <TypographyP className="text-center text-sm font-medium text-muted-foreground tracking-tight max-w-72 lg:max-w-full">
              Crie sua nova loja em poucos passos e comece a vender seus
              produtos online de forma simples e rápida.
            </TypographyP>
          </motion.div>
        </div>

        <motion.div {...buttonAnimation}>
          <Link href="/create-store" passHref>
            <Button size={"xl"}>Começar</Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
