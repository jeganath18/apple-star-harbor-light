import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-border hover:bg-foreground",
        secondary:
          "bg-card-elevated text-foreground shadow-border hover:shadow-border-hover",
        outline:
          "bg-transparent text-foreground shadow-border hover:bg-card-elevated",
        ghost: "text-muted hover:text-foreground hover:bg-card-elevated",
        infra:
          "bg-infra/15 text-infra shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-infra)_35%,transparent)] hover:bg-infra/25",
        danger:
          "bg-danger/15 text-danger shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-danger)_35%,transparent)] hover:bg-danger/25",
        link: "text-infra underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-5 text-md",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
