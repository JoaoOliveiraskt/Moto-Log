"use client";

import * as React from "react";
import { Sun } from "lucide-react";
import { RxMoon } from "react-icons/rx";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function ModeToggle({className, children}: Props) {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-muted-foreground hover:text-foreground ">
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className={`cursor-pointer outline-none border-none ${className}`}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <RxMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className={``}>{children}</span>
          
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
