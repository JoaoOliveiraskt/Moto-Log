"use client";

import Link from "next/link";
import Icon from "../icons/icon-component";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
  size?: number;
  onClick?: () => void;
}

export default function HomeButton({
  children,
  className,
  size,
  onClick,
}: Props) {
  const pathName = usePathname();

  return (
    <Link
      href="/"
      prefetch={false}
      className="flex flex-col items-center gap-1"
    >
      <Button
        variant="icon"
        size="icon"
        className={cn(
          "flex flex-col items-center gap-1 cursor-pointer outline-none border-none",
          pathName === "/" ? "text-foreground" : "text-muted-foreground",
          className
        )}
      >
        <Icon.home size={size} />
        <p className="font-semibold text-xs">{children}</p>
      </Button>
    </Link>
  );
}
