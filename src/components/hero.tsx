import React from "react";
import Container from "./container";
import { Input } from "./ui/input";
import { PiSealCheck } from "react-icons/pi";
import { Button } from "./ui/button";
import Image from "next/image";
import { RxMagnifyingGlass } from "react-icons/rx";
import Link from "next/link";

export default function Section() {
  return (
    <Container className="pt-0 md:pt-5 lg:pt-24">
      <section className="relative">
        <div className="relative space-y-10">
          <div className="mx-auto text-center">
            {/*<h1 className="pb-2 text-3xl font-bold  sm:text-4xl lg:text-5xl tracking-tighter text-foreground">
              Revolucione sua Experiência de Compra e Venda com Moto Log
            </h1>
            <p className="max-w-md mx-auto mt-4 font-medium leading-7 text-muted-foreground">
              Explore e apoie lojas locais com Moto-Log. Conecte-se a produtos
              exclusivos, entregas rápidas e faça parte da revolução no comércio
              local online.
            </p>*/}

            <form
              action="#"
              method="POST"
              className=" max-w-md h-fit mx-auto mt-8"
            >
              <div className="w-full h-full relative">
                <label htmlFor="" className="sr-only">
                  {" "}
                  Buscar{" "}
                </label>
                <RxMagnifyingGlass
                  size={16}
                  className="absolute start-4 top-1/2 -translate-y-1/2"
                />

                <Input
                  type="text"
                  name=""
                  id=""
                  className="border border-border rounded-lg h-11 w-full  px-10 text-lg"
                  placeholder="Buscar produtos..."
                />
                <Button
                  variant={"secondary"}
                  type="button"
                  className="absolute rounded-lg border border-border end-1 top-1/2 -translate-y-1/2 text-sm font-medium transition"
                >
                  <div className="flex items-center gap-2">
                    <p> Buscar </p>
                  </div>
                </Button>
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
          <div className="relative mx-auto sm:py-10 px-2 md:p-14 w-full h-40 sm:h-80 md:h-120  rounded-3xl overflow-hidden bg-gradient-to-tr from-zinc-200 via-zinc-100 dark:from-cyan-950/5 dark:via-transparent to-transparent">
            <Image
              src="https://images.unsplash.com/photo-1634885468882-b39d4e92d0a0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Tênis"
              className="absolute inset-0 w-full h-full object-cover"
              width={1000}
              height={1000}
            />
            <div className="relative  flex items-end justify-between h-full pb-6 px-2">
              <strong className="max-w-44 sm:max-w-xl text-left text-xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                Descubra o seu próximo produto favorito.
              </strong>
              <Link href="#category-list" >
                <Button variant={"secondary"} className="">
                  Comprar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
