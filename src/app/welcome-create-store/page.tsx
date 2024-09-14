import { Button } from "@/components/ui/button";
import Link from "next/link";
import Icon from "@/components/icons/icon-component";

export default function WelcomeCreateStore() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center space-y-10">
      <div className="w-full space-y-3 flex flex-col items-center justify-center">
        <h1
          className="
        text-2xl
        font-bold
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        text-center 
        bg-gradient-to-r from-slate-500 to-stone-700 text-transparent bg-clip-text p-2
      "
        >
          Bem vindo ao Moto-Log
        </h1>
        <h2 className="text-sm sm:text-lg max-w-lg text-center">
          Comece com sua nova loja em apenas algumas etapas e comece a vender
          seus produtos online.
        </h2>
      </div>
      <Link href="/create-store" passHref>
        <Button className="text-sm tracking-tight">
          <p className="block">Começar</p>
        </Button>
      </Link>
    </main>
  );
}
