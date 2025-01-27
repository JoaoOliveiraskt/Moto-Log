import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function TypographyP({ children, className, title }: Props) {
  return (
    <p
      title={title}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    >
      {children}
    </p>
  );
}
