import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  className?: string;
}

export default function SeeAllButton({ href, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center text-foreground transition-all text-sky-600 hover:underline",
        className
      )}
    >
      <span className="font-medium text-sm">Ver todos</span>
    </Link>
  );
}
