"use client";

import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function EmptyFavorites() {
  return (
    <EmptyState
      icon={
        <DotLottieReact
          src="https://lottie.host/9eedf916-9f88-422b-a30a-bc71c516608f/WKR3e0yKFX.lottie"
          loop
          autoplay
        />
      }
      title=" Você ainda não tem produtos favoritos."
      description="Continue comprando e adicione produtos aos seus favoritos."
    >
      <div className="flex items-center justify-center w-full">
        <Button size={"xl"} asChild className="w-fit">
          <Link href="/">Continuar comprando</Link>
        </Button>
      </div>
    </EmptyState>
  );
}
