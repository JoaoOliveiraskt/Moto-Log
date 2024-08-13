import Link from "next/link";
import { Button } from "./ui/button";
import { GoChevronRight } from "react-icons/go";

interface Props {
  href: string;
}

export default function SeeAllButton({ href }: Props) {
  return (
    <Button variant={"icon"}>
      <Link href={href} className="flex items-center gap-1 text-cyan-500 hover:text-cyan-600 transition-all">
        <span className="font-medium">Ver todos</span>
        <GoChevronRight />
      </Link>
    </Button>
  );
}
