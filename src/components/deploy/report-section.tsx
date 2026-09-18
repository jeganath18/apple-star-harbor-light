import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ReportSection({
  title,
  eyebrow,
  children,
  className,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-lg bg-card p-5 shadow-border", className)}>
      {eyebrow ? (
        <p className="text-2xs font-medium tracking-wide text-muted uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="mt-1 text-md font-medium tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ReportVisual({ nodes }: { nodes: string[] }) {
  return (
    <ol className="flex flex-col gap-0">
      {nodes.map((node, i) => (
        <li key={`${node}-${i}`} className="flex flex-col items-start">
          <span className="rounded-md bg-card-elevated px-3 py-1.5 font-mono text-xs shadow-border">
            {node}
          </span>
          {i < nodes.length - 1 ? (
            <span className="ml-4 h-5 w-px bg-border" aria-hidden="true" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
