import React from "react";
import Container from "./container";
import { Input } from "./ui/input";
import { PiSealCheck } from "react-icons/pi";

export default function Section() {
  return (
    <Container className="mt-8 sm:mt-24">
      <section className="relative">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center ">
            <h1 className="pb-2 text-3xl font-bold  sm:text-4xl lg:text-5xl tracking-tighter text-foreground bg-clip-text dark:text-transparent dark:bg-gradient-to-r from-white to-gray-500">
              Revolucione sua Experiência de Compra e Venda com Moto Log
            </h1>
            <p className="max-w-md mx-auto mt-4 font-medium leading-7 text-muted-foreground">
              Explore e apoie lojas locais com Moto-Log. Conecte-se a produtos
              exclusivos, entregas rápidas e faça parte da revolução no comércio
              local online.
            </p>

            <form
              action="#"
              method="POST"
              className=" max-w-md h-11 mx-auto mt-8 space-y-4 sm:space-x-4 sm:flex sm:space-y-0 sm:items-end"
            >
              <div className="flex-1 h-full ">
                <label htmlFor="" className="sr-only">
                  {" "}
                  Buscar{" "}
                </label>

                <Input
                  type="text"
                  name=""
                  id=""
                  className="border border-border w-full h-full px-4 text-lg font-medium rounded-lg bg-card"
                  placeholder="Pesquisa"
                />
              </div>

              <div className="relative group h-full">
                <button
                  type="button"
                  className="h-full inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:py-3.5 font-medium text-foreground transition-all duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none "
                >
                  Buscar
                </button>
              </div>
            </form>

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
    </Container>
  );
}
