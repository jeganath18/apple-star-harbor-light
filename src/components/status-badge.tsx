import { Check, CircleAlert, LoaderCircle, Minus, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StageState } from "@/lib/types";

const TONE: Record<string, string> = {
  success:
    "text-success bg-success/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-success)_28%,transparent)]",
  warning:
    "text-warning bg-warning/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-warning)_28%,transparent)]",
  danger:
    "text-danger bg-danger/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-danger)_28%,transparent)]",
  infra:
    "text-infra bg-infra/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-infra)_28%,transparent)]",
  ai: "text-ai bg-ai/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ai)_28%,transparent)]",
  muted: "text-muted bg-card-elevated shadow-border",
};

export function StatusBadge({
  label,
  tone = "muted",
  pulse = false,
  className,
}: {
  label: string;
  tone?: keyof typeof TONE;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-2xs tracking-wide uppercase",
        TONE[tone],
        className,
      )}
    >
      {pulse ? (
        <span className="relative flex size-1.5" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-current" />
        </span>
      ) : (
        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {label}
    </span>
  );
}

export function StageIcon({ state }: { state: StageState }) {
  if (state === "COMPLETED") {
    return <Check className="size-3.5 text-success" aria-hidden="true" />;
  }
  if (state === "RUNNING") {
    return <LoaderCircle className="size-3.5 animate-spin text-infra" aria-hidden="true" />;
  }
  if (state === "FAILED") {
    return <CircleAlert className="size-3.5 text-danger" aria-hidden="true" />;
  }
  if (state === "WARNING") {
    return <TriangleAlert className="size-3.5 text-warning" aria-hidden="true" />;
  }
  if (state === "SKIPPED") {
    return <Minus className="size-3.5 text-subtle" aria-hidden="true" />;
  }
  return <span className="block size-2 rounded-full bg-subtle/50" aria-hidden="true" />;
}

export function jobStatusTone(status: string | undefined): keyof typeof TONE {
  const s = (status ?? "").toUpperCase();
  if (s === "COMPLETED" || s === "SUCCEEDED") return "success";
  if (s === "FAILED" || s === "ERROR") return "danger";
  if (s.includes("VALIDAT") || s.includes("FALLBACK") || s === "DECIDED") return "warning";
  if (s === "AI_ANALYSIS") return "ai";
  if (s === "QUEUED") return "muted";
  return "infra";
}
