"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import TypographyH1 from "@/components/typography/typography-h1";
import TypographyP from "@/components/typography/typography-p";

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
    <main className="max-w-full h-screen flex flex-col items-center justify-center">
      <div className="relative  w-full space-y-3 flex flex-col items-center justify-center -top-8">
        <motion.div {...h1Animation} className="max-w-xs lg:max-w-2xl">
          <TypographyH1 className="text-center p-2 tracking-tighter dark:bg-gradient-to-br dark:from-neutral-50 dark:via-neutral-300 dark:to-neutral-500  dark:text-transparent dark:bg-clip-text ">
            Seja bem-vindo ao Moto Log
          </TypographyH1>
        </motion.div>
        <motion.div {...pAnimation}>
          <TypographyP className="text-sm sm:text-base max-w-xs sm:max-w-md text-center px-7 md:px-0">
            Crie sua nova loja em poucos passos e comece a vender seus produtos
            online de forma simples e rápida.
          </TypographyP>
        </motion.div>
      </div>

      <motion.div {...buttonAnimation}>
        <Link href="/create-store" passHref>
          <Button
            className="tracking-tight py-6 px-10 font-semibold"
            size={"rounded"}
          >
            Começar
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
