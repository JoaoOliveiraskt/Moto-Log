import React from "react";
import HeroCards from "./hero-categories";
export default function Section() {
  return (
    <>
      <section class="relative py-12 bg-white sm:py-16 lg:py-20">
        <div class="absolute inset-0">
          <img
            class="object-cover w-full h-full"
            src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/grid-pattern.png"
            alt=""
          />
        </div>

        <div class="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Revolucione sua Experiência de Compra e Venda com Moto Log
            </h1>
            <p class="max-w-md mx-auto mt-6 text-base font-normal leading-7 text-gray-500">
              Explore e apoie lojas locais com Moto-Log. Conecte-se a produtos
              exclusivos, entregas rápidas e faça parte da revolução no comércio
              local online.
            </p>

            <form
              action="#"
              method="POST"
              class="max-w-md mx-auto mt-8 space-y-4 sm:space-x-4 sm:flex sm:space-y-0 sm:items-end"
            >
              <div class="flex-1">
                <label for="" class="sr-only">
                  {" "}
                  Buscar{" "}
                </label>
                <div>
                  <input
                    type="email"
                    name=""
                    id=""
                    class="block w-full px-4 py-3 sm:py-3.5 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                    placeholder="Pesquisa"
                  />
                </div>
              </div>

              <div class="relative group">
                <div class="absolute transitiona-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>

                <button
                  type="button"
                  class="inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Buscar
                </button>
              </div>
            </form>

            <ul class="flex items-center justify-center mt-6 space-x-6 sm:space-x-8">
              <li class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-xs font-medium text-gray-900 sm:text-sm">
                  {" "}
                  Entregas Rápidas e Confiáveis{" "}
                </span>
              </li>

              <li class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-xs font-medium text-gray-900 sm:text-sm">
                  {" "}
                  Apoio local.{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <HeroCards />
    </>
  );
}
