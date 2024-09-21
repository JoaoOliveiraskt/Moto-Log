"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Pattern from "@/components/pattern";

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
    <main className="w-full h-screen flex flex-col items-center justify-center space-y-10">
      
      <Pattern />

      <div className="relative z-10 w-full space-y-3 flex flex-col items-center justify-center">
        <motion.div {...h1Animation}>
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center bg-gradient-to-r from-slate-600 via-indigo-500 to-slate-600 text-transparent bg-clip-text p-2 tracking-tighter">
            Bem-vindo ao Moto-Log
          </h1>
        </motion.div>
        <motion.div {...pAnimation}>
          <h2 className="text-sm sm:text-lg max-w-lg text-center px-7 md:px-0">
            Crie sua nova loja em poucos passos e comece a vender seus produtos
            online de forma simples e rápida.
          </h2>
        </motion.div>
      </div>

      <motion.div {...buttonAnimation}>
        <Link href="/create-store" passHref>
          <Button className="text-sm tracking-tight">
            <p className="block">Começar</p>
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}