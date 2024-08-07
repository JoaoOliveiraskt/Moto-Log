import Link from "next/link";
import IconComponent from "../icons/icon-component";
import { Button } from "./button";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function HomeButton({children, className}: Props) {
  return (
    <Link
      href="/"
      className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
      prefetch={false}
    >
      <Button
        variant="icon"
        size="icon"
        className={`flex flex-col gap-1 cursor-pointer outline-none border-none ${className}`}
      >
        <IconComponent iconName="home" color="foreground"/>
        <p className="text-muted-foreground hover:text-foreground">{children}</p>
      </Button>

    </Link>
  );
}
