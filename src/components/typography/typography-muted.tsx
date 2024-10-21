import { cn } from "@/lib/utils";

interface props {
  className?: string;
  children: React.ReactNode;
}

export default function TypographyMuted({ children, className }: props) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
