import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg bg-card p-4 shadow-border", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-2xs font-medium tracking-wide text-muted uppercase">{label}</p>
        {icon ? <span className="text-subtle">{icon}</span> : null}
      </div>
      <p className="mt-2 font-mono text-2xl tracking-tight text-foreground tabular">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
