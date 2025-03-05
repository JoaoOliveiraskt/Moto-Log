"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CategoryHomeButton() {
  const pathname = usePathname();
  const isActive = pathname === `/`;
  return (
    <Button
      variant="secondary"
      className={cn(
        "h-8",
        isActive && "bg-foreground text-background hover:bg-foreground/90"
      )}
      asChild
    >
      <Link href={"/"}>
        <p className=" text-sm tracking-wide">Todos</p>
      </Link>
    </Button>
  );
}
