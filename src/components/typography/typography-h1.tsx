import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function TypographyH1({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl lg:text-5xl font-extrabold tracking-tight ",
        className
      )}
    >
      {children}
    </h1>
  );
}
