import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-lg bg-card px-5 py-8 shadow-border",
        className,
      )}
    >
      {icon ? <div className="text-subtle">{icon}</div> : null}
      <div>
        <h2 className="text-md font-medium tracking-tight">{title}</h2>
        {description ? <p className="mt-1 max-w-md text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
