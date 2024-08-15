"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

import Lottie from "lottie-react";
import cartAnimation from "../../public/animations/cart-animation.json";
import groovyWalkAnimation from "../../public/animations/groovy-walk.json";

export const Banner = () => {
  return (
    <div
      className="relative mx-auto my-10 max-w-screen-xl h-56 rounded-2xl overflow-hidden 
      bg-gradient-to-bl backdrop-blur-3xl"
    >
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center gap-4 sm:gap-12 p-4 sm:p-8 h-full w-full z-10">
        <div className="space-y-2 sm:space-y-3 text-center">
          <strong className="text-left text-lg sm:text-xl font-bold text-foreground drop-shadow-md z-10">
            Encontre as melhores ofertas na sua loja favorita
          </strong>

          <h2 className="text-md sm:text-lg text-foreground drop-shadow-md z-10">
            Aproveite as melhores promoções e descontos!
          </h2>
        </div>
        <Link href="#category-list">
          <Button
            variant={"secondary"}
            size={"lg"}
            className="rounded-full  shadow-xl shadow-foreground/20 dark:shadow-none "
          >
            Ver Ofertas
          </Button>
        </Link>
      </div>
      <Lottie
        animationData={groovyWalkAnimation}
        className="w-1/2 sm:h-full absolute bottom-0 right-0 z-0"
      />
    </div>
  );
};

export const BannerSec = () => {
  return (
    <div
      className="flex items-center justify-around mx-auto mt-10 mb-10 max-w-screen-xl sm:h-64 p-4 sm:p-8 h-full w-full rounded-2xl overflow-hidden 
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
          <Button
            variant={"outline"}
            size={"lg"}
            className="rounded-full bg-transparent"
          >
            Aproveite as Ofertas
          </Button>
        </Link>
      </div>
      <Lottie animationData={cartAnimation} className="ml-8 h-72 w-fit  " />
    </div>
  );
};

export const BannerTerc = () => {
  <div
    className="flex items-center justify-around mx-auto mt-10 mb-10 max-w-screen-xl h-40 sm:h-64 rounded-2xl overflow-hidden 
  bg-gradient-to-bl backdrop-blur-3xl bg-yellow-500"
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
        <Button
          variant={"outline"}
          size={"lg"}
          className="bg-transparent rounded-full"
        >
          Aproveite as Ofertas
        </Button>
      </Link>
    </div>
    <Lottie animationData={cartAnimation} className="ml-8 h-72 w-fit  " />
  </div>;
};
