import Link from "next/link";
import { Button } from "./ui/button";
import { GoChevronRight } from "react-icons/go";

interface Props {
  href: string;
}

export default function SeeAllButton({ href }: Props) {
  return (
    <Button variant={"secondary"}>
      <Link
        href={href}
        className="flex items-center gap-1"
      >
        <span className=" font-medium">Ver todos</span>
        <GoChevronRight />
      </Link>
    </Button>
  );
}
