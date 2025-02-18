"use client";

import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import FeedIcon from "../icons/feed-icon";

interface Props {
  className?: string;
}

export default function HomeButton({ className }: Props) {
  const pathName = usePathname();

  return (
    <Link href="/" prefetch={false}>
      <Button
        variant="icon"
        size="icon"
        className={cn(
          "flex items-center justify-center cursor-pointer mt-1",
          className
        )}
      >
        <FeedIcon isActive={pathName === "/"} />
      </Button>
    </Link>
  );
}
