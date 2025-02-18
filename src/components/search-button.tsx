"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Icon from "./icons/icon-component";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  isActive?: boolean;
}

export default function SearchButton({ className }: Props) {
  const pathName = usePathname();

  return (
    <Link href="/search" prefetch={false}>
      <Button
        variant="icon"
        size="icon"
        className={cn("flex items-center justify-center", className)}
      >
        {pathName === "/search" ? (
          <Icon.search size={28} className=" dark:stroke-white  stroke-black" />
        ) : (
          <Icon.search size={28} className="stroke-muted" />
        )}
      </Button>
    </Link>
  );
}
