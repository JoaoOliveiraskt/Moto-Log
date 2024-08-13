import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export const Banner = () => {
  return (
    <div className="relative mx-auto sm:py-10 px-2 md:p-14 w-full h-40 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-bl backdrop-blur-3xl from-violet-950 via-cyan-900 to-background">
      <div className="relative flex flex-col justify-around h-full">
        <strong className="max-w-44 sm:max-w-xl text-left text-xl sm:text-2xl md:text-2xl font-bold text-white drop-shadow-md">
        Encontre o produto perfeito para você.
        </strong>
        <Link href="#category-list">
          <Button
            variant={"outline"}
            size={"lg"}
            className="bg-transparent hover:bg-background rounded-full"
          >
            Comprar Agora
          </Button>
        </Link>
      </div>
    </div>
  );
};
