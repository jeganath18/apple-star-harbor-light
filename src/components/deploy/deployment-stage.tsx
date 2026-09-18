import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { StageIcon } from "@/components/status-badge";
import { formatDuration } from "@/lib/format";
import type { StageInfo } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DeploymentStage({ stage, defaultOpen }: { stage: StageInfo; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const active = stage.state === "RUNNING";
  const failed = stage.state === "FAILED";
  const warn = stage.state === "WARNING";

  return (
    <div
      className={cn(
        "rounded-md bg-card transition-[box-shadow] duration-200",
        active && "glow-infra",
        failed && "glow-danger",
        warn && "glow-warning",
        !active && !failed && !warn && "shadow-border",
      )}
    >
      <button
        type="button"
        className="flex w-full items-start gap-3 px-3.5 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className={cn(
            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-sm",
            active && "bg-infra/15 text-infra",
            stage.state === "COMPLETED" && "bg-success/10 text-success",
            failed && "bg-danger/10 text-danger",
            warn && "bg-warning/10 text-warning",
            (stage.state === "QUEUED" || stage.state === "SKIPPED") && "bg-card-elevated text-subtle",
          )}
        >
          <StageIcon state={stage.state} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">{stage.title}</span>
            <span className="font-mono text-2xs tracking-wide text-subtle uppercase">{stage.state}</span>
            {stage.durationMs !== undefined ? (
              <span className="font-mono text-2xs text-muted tabular">{formatDuration(stage.durationMs)}</span>
            ) : null}
          </span>
          <span className="mt-0.5 block text-xs text-muted">{stage.description}</span>
        </span>
        <ChevronDown
          className={cn(
            "mt-1 size-4 shrink-0 text-subtle transition-transform duration-150",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="border-t border-border px-3.5 py-3">
          {stage.detail ? (
            <p className="font-mono text-xs leading-relaxed text-muted">{stage.detail}</p>
          ) : (
            <p className="text-xs text-subtle">No additional technical detail from the control plane yet.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
