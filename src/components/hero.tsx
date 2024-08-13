import React from "react";
import { PiSealCheck } from "react-icons/pi";
import SearchInput from "./search-input";
import { Banner } from "./banner";

export default function Section() {
  return (
    <div className="mt-20 lg:mt-24">
      <section className="relative">
        <div className="relative space-y-10">
          <Banner />
          <div className="mx-auto text-center">
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
        </div>
      </section>
    </div>
  );
}
