import Link from "next/link";
import { Button } from "./ui/button";
import { GoChevronRight } from "react-icons/go";

interface Props {
  href: string;
}

export default function SeeAllButton({ href }: Props) {
  return (
    <Button asChild variant={"outline"} size={"rounded"}>
      <Link
        href={href}
        className="flex items-center gap-1 text-foreground transition-all ml-6"
      >
        <span className="font-medium text-sm">Ver todos</span>
        <GoChevronRight />
      </Link>
    </Button>
  );
}
