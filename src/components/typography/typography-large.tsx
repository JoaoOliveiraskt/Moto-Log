import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function TypographyLarge({ children, className }: Props) {
  return <p className={cn("text-lg font-semibold", className)}>{children}</p>;
}
