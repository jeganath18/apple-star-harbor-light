import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md bg-card-elevated px-3.5 font-mono text-sm text-foreground shadow-border",
          "placeholder:text-subtle",
          "transition-[box-shadow] duration-150",
          "hover:shadow-border-hover",
          "focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-infra)_70%,transparent),0_0_0_4px_color-mix(in_oklab,var(--color-infra)_18%,transparent)]",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
