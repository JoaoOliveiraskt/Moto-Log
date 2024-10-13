import Link from "next/link";
import icon from "../icons/icon-component";
import { Button } from "./button";

interface Props {
  children?: React.ReactNode;
  className?: string;
  size?: number;
}

export default function HomeButton({ children, className, size }: Props) {
  return (
    <Link
      href="/"
      className="flex flex-col items-center gap-1"
      prefetch={false}
    >
      <Button
        variant="icon"
        size="icon"
        className={`flex flex-col items-center gap-1 cursor-pointer outline-none border-none ${className}`}
      >
        <icon.home color="foreground" size={size}/>
        <p className="text-muted-foreground text-sm">
          {children}
        </p>
      </Button>
    </Link>
  );
}
