import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function TypographySmall({ children, className }: Props) {
  return (
    <small className={cn("text-xs font-medium leading-none", className)}>
      {children}
    </small>
  );
}
