import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { LogLine } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BuildLogs({ logs }: { logs: LogLine[] }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-lg bg-background-deep shadow-border">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>
          <span className="text-2xs font-medium tracking-wide text-muted uppercase">Build logs</span>
          <span className="ml-2 font-mono text-2xs text-subtle">{logs.length} lines</span>
        </span>
        <ChevronDown className={cn("size-4 text-subtle transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="terminal-scroll max-h-72 overflow-auto border-t border-border px-4 py-3 font-mono text-2xs leading-6">
          {logs.length === 0 ? (
            <p className="text-subtle">Waiting for log stream from the control plane.</p>
          ) : (
            logs.map((line, i) => (
              <p key={`${line.timestamp ?? "t"}-${i}`} className={tone(line.level)}>
                {line.timestamp ? (
                  <span className="text-subtle">[{line.timestamp}] </span>
                ) : null}
                {line.message}
              </p>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

function tone(level: LogLine["level"]) {
  if (level === "error") return "text-danger";
  if (level === "warn") return "text-warning";
  if (level === "debug") return "text-subtle";
  return "text-foreground/90";
}
