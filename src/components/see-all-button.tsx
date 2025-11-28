import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  className?: string;
  onClick?: () => void;
}

export default function SeeAllButton({ href, className, onClick }: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center text-foreground transition-all text-sky-600 relative after:absolute after:bg-sky-600 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 ",
        className
      )}
    >
      <span className="font-medium text-sm">Ver mais</span>
    </Link>
  );
}
