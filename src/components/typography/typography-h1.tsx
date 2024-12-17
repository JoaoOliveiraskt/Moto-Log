import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function TypographyH1({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl lg:text-5xl font-extrabold tracking-tight dark:bg-gradient-to-br pb-1 dark:from-neutral-50 dark:via-neutral-300 dark:to-neutral-500  dark:text-transparent dark:bg-clip-text",
        className
      )}
    >
      {children}
    </h1>
  );
}
