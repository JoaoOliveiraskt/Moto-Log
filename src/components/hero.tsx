import React from "react";
import { PiSealCheck } from "react-icons/pi";
import SearchInput from "./search-input";
import { Banner } from "./banner";

export default function Section() {
  return (
    <div className="pt-20">
      <section className="relative">
        <div className="relative space-y-10">
          <div className="mx-auto text-center">
            <SearchInput className="fixed top-0 right-0 w-full p-2 z-10 h-16 max-w-md mx-auto lg:hidden" />

            <ul className="flex items-center justify-center mt-6 space-x-6 sm:space-x-8">
              <li className="flex items-center gap-1.5">
                <PiSealCheck size={20} />
                <span className="text-xs font-medium text-primary sm:text-sm">
                  {" "}
                  Entregas Rápidas e Confiáveis{" "}
                </span>
              </li>

              <li className="flex items-center gap-1.5">
                <PiSealCheck size={20} />
                <span className="text-xs font-medium text-primary sm:text-sm">
                  {" "}
                  Apoio local.{" "}
                </span>
              </li>
            </ul>
          </div>

          <Banner />
        </div>
      </section>
    </div>
  );
}
