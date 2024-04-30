"use client";

import useCategorySearch from "@/hooks/useCategorySearch";
import Image from "next/image";

const descriptions = {
  Ropa: "Moda para todas as ocasiões.",
  Electronics: "Tecnologia que simplifica sua vida.",
  "Change title": "Conforto e estilo para o seu lar.",
  Shoes: "Estilo e conforto para os seus pés.",
  Miscellaneous: "Descubra produtos únicos e surpreendentes.",
};

export default function HeroCards() {
  const categories = useCategorySearch();

  return (
    <div className="flex w-full gap-6 pb-8 mt-12 overflow-x-auto sm:mt-16 lg:mt-20 snap-x">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6"
        >
          <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
            <div className="px-4 py-5 sm:p-5">
              <div className="flex items-start lg:items-center">
                <a href="#" title="" className="shrink-0">
                  <Image
                    className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                    src={category.image}
                    alt={category.name}
                    width={100}
                    height={100}
                  />
                </a>

                <div className="flex-1 ml-4 lg:ml-6">
                  <p className="text-xs font-bold text-zinc-900 lg:text-sm">
                    <a href="#" title="" className="">
                      
                      {category.name}
                    </a>
                  </p>

                  <p className="mt-2 text-sm font-semibold text-zinc-500 group-hover:text-zinc-600">
                    <a href="#" title="" className="">
                      {" "}
                      {descriptions[category.name]}{" "}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
