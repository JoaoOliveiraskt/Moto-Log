"use client";

import * as React from "react";
import { RxMoon } from "react-icons/rx";
import { useTheme } from "next-themes";
import { LuSun } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function ModeToggle({ className, children }: Props) {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className={`cursor-default text-muted-foreground hover:text-foreground ${className}`}
    >
      <LuSun
        size={18}
        className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <RxMoon
        size={20}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className={``}>{children}</span>
    </Button>
  );
}
