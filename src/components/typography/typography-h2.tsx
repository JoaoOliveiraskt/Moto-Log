import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function TypographyH2({ children, className }: Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-extrabold tracking-tight first:mt-0 text-foreground",
        className
      )}
    >
      {children}
    </h2>
  );
}
