import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function TypographyH4({ children, className }: Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-lg md:text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}
