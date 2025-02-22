"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icons/icon-component";
import { Switch } from "../ui/switch";
import TypographyLarge from "../typography/typography-large";

interface Props {
  className?: string;
  children?: React.ReactNode;
  size?: "default" | "icon" | "sm" | "lg" | "xl" | "menu" | null;
  iconSize?: number;
  variant?: "secondary" | "ghost";
}

export function ModeToggle({
  className,
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
      variant={variant}
      size={size}
      className={`${className} flex items-center justify-between pl-3 lg:pl-4`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center gap-x-4 w-9 h-9 lg:w-fit lg:h-fit bg-accent lg:bg-transparent rounded-xl">
          <Icon.sun
            size={iconSize}
            className="flex rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Icon.moon
            size={iconSize}
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </div>
        <TypographyLarge className="!font-medium lg:text-sm">
          Modo escuro
        </TypographyLarge>
      </div>

      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
    </Button>
  );
}
