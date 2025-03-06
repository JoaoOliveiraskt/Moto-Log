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
      variant="outline"
      className={cn(
        "h-10 rounded-full",
        isActive && "bg-foreground text-background hover:text-white dark:hover:text-black hover:bg-foreground/90"
      )}
      asChild
    >
      <Link href={"/"}>
        <p className=" text-sm tracking-wide">Todos</p>
      </Link>
    </Button>
  );
}
