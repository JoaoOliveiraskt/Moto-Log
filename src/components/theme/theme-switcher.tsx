"use client";

import * as React from "react";
import { RxMoon } from "react-icons/rx";
import { useTheme } from "next-themes";
import { LuSun } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icons/icon-component";

interface Props {
  className?: string;
  children?: React.ReactNode;
  size?: "default" | "icon" | "sm" | "lg" | "xl" | "menu" | null;
  iconSize?: number;
  variant?: "secondary" | "ghost";
}

export function ModeToggle({
  className,
  children,
  size,
  iconSize = 18,
  variant = "ghost",
}: Props) {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      onClick={toggleTheme}
      variant={variant}
      size={size}
      className={`${className}`}
    >
      <Icon.sun
        size={iconSize}
        className="flex rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Icon.moon
        size={iconSize}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className={``}>{children}</span>
    </Button>
  );
}
