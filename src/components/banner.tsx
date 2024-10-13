"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Lottie from "lottie-react";
import cartAnimation from "../../public/animations/cart-animation.json";

export const BannerSec = () => {
  return (
    <div
      className="flex items-center justify-around mx-auto max-w-[1440px] sm:h-64 p-4 sm:p-8 h-full w-full rounded-2xl overflow-hidden 
      bg-gradient-to-bl backdrop-blur-3xl bg-sky-800"
    >
      <div className=" flex flex-col gap-12">
        <div className="space-y-3">
          <strong className="max-w-44 sm:max-w-xl text-left text-xl sm:text-2xl font-bold text-foreground drop-shadow-md">
            Conectando você aos melhores produtos da região
          </strong>

          <h2 className="text-lg sm:text-xl text-foreground drop-shadow-md">
            Descubra novidades e aproveite vantagens exclusivas
          </h2>
        </div>
        <Link href="#category-list">
          <Button size={"lg"} className="rounded-full">
            Aproveite as Ofertas
          </Button>
        </Link>
      </div>
      <Lottie animationData={cartAnimation} className="ml-8 h-72 w-fit" />
    </div>
  );
};
