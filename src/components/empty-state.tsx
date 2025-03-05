import TypographyH1 from "./typography/typography-h1";
import TypographyP from "./typography/typography-p";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  children,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <main
      className={cn(
        "min-w-full h-screen flex flex-col items-center justify-center sm:max-w-md mx-auto",
        className
      )}
    >
      <div className="-top-8 lg:-top-48 relative flex flex-col gap-y-6 lg:px-4 w-full px-4">
        <div className="w-full gap-y-2 flex flex-col items-center justify-center">
          {icon ? <div>{icon}</div> : null}
          <div>
            <TypographyH1 className="text-center text-xl lg:text-2xl font-semibold !tracking-tight dark:text-white">
              {title}
            </TypographyH1>
          </div>
          <div>
            <TypographyP className="text-center text-sm font-medium text-muted-foreground tracking-tight max-w-72 lg:max-w-full">
              {description}
            </TypographyP>
          </div>
        </div>

        {children && (
          <div className="w-full flex flex-col items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </main>
  );
}
