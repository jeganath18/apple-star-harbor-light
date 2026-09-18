import { cn } from "@/lib/utils";

export function ArchitectureBadge({
  label,
  tone = "muted",
  className,
}: {
  label: string;
  tone?: "arm" | "x86" | "qemu" | "fargate" | "muted" | "ai";
  className?: string;
}) {
  const tones: Record<string, string> = {
    arm: "text-infra bg-infra/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-infra)_30%,transparent)]",
    x86: "text-warning bg-warning/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-warning)_30%,transparent)]",
    qemu: "text-warning bg-warning/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-warning)_30%,transparent)]",
    fargate: "text-foreground bg-card-elevated shadow-border",
    muted: "text-muted bg-card-elevated shadow-border",
    ai: "text-ai bg-ai/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ai)_30%,transparent)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-2xs tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
