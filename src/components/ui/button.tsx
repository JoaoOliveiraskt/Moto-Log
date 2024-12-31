import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex transform tracking-tight active:scale-95 transition-transform items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background shadow hover:bg-primary/90 font-semibold",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border bg-background hover:bg-accent/50 shadow-sm hover:text-foreground",
        secondary: "text-foreground bg-accent hover:bg-accent-foreground",
        ghost: "hover:bg-accent hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "h-10 px-4 py-4 rounded-md",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-10 rounded-md px-6",
        xl: "h-12 rounded-md px-6",
        icon: "h-fit w-fit",
        iconShaped: "h-9 w-9 rounded-md",
        rounded: "h-9 lg:h-10 px-4 py-4 rounded-full",
        menu: "h-9 px-4 py-5 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
