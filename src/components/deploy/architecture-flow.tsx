import { Check, Github, LoaderCircle } from "lucide-react";
import type { Job } from "@/lib/types";
import { cn } from "@/lib/utils";

const NODES = [
  { id: "github", label: "GitHub", match: ["QUEUED"] },
  { id: "scanner", label: "Scanner", match: ["ANALYZING"] },
  { id: "decision", label: "Architecture Decision", match: ["AI_ANALYSIS", "DECIDED"] },
  { id: "build", label: "Build", match: ["BUILDING"] },
  { id: "runtime", label: "Runtime", match: ["DEPLOYING", "VALIDATING"] },
  { id: "health", label: "Health Check", match: ["REPORTING"] },
  { id: "live", label: "Live Application", match: ["COMPLETED"] },
];

function nodeState(job: Job, index: number): "done" | "active" | "pending" | "failed" | "warn" {
  const status = String(job.status).toUpperCase();
  if (status === "FAILED") {
    const current = NODES.findIndex((n) => n.match.includes(status));
    if (index === Math.max(current, 0)) return "failed";
  }
  if (status === "COMPLETED") return "done";
  const activeIndex = NODES.findIndex((n) => n.match.includes(status));
  const idx = activeIndex === -1 ? 0 : activeIndex;
  if (index < idx) return "done";
  if (index === idx) return job.runtimeKind === "fallback_x86" && nIsRuntime(index) ? "warn" : "active";
  return "pending";
}

function nIsRuntime(index: number) {
  return NODES[index]?.id === "runtime";
}

export function ArchitectureFlow({ job }: { job: Job }) {
  return (
    <div className="rounded-lg bg-card p-4 shadow-border">
      <p className="text-2xs font-medium tracking-wide text-muted uppercase">Infrastructure flow</p>
      <div className="mt-4 flex flex-col gap-0 md:flex-row md:items-stretch md:gap-0">
        {NODES.map((node, index) => {
          const state = nodeState(job, index);
          return (
            <div key={node.id} className="flex flex-1 items-stretch md:flex-col">
              <div className="flex items-center md:flex-col md:items-center">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-md",
                    state === "done" && "bg-success/10 text-success",
                    state === "active" && "glow-infra bg-infra/10 text-infra",
                    state === "warn" && "glow-warning bg-warning/10 text-warning",
                    state === "failed" && "glow-danger bg-danger/10 text-danger",
                    state === "pending" && "bg-card-elevated text-subtle shadow-border",
                  )}
                >
                  {node.id === "github" ? (
                    <Github className="size-3.5" />
                  ) : state === "active" ? (
                    <LoaderCircle className="size-3.5 animate-spin" />
                  ) : state === "done" ? (
                    <Check className="size-3.5" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-current" />
                  )}
                </div>
                {index < NODES.length - 1 ? (
                  <div className="mx-2 h-px flex-1 bg-border md:mx-0 md:my-2 md:h-auto md:w-px md:flex-none md:min-h-6" />
                ) : null}
              </div>
              <p
                className={cn(
                  "ml-3 self-center font-mono text-2xs tracking-wide uppercase md:mt-2 md:ml-0 md:self-auto md:text-center",
                  state === "pending" ? "text-subtle" : "text-foreground",
                )}
              >
                {node.label}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted">
        Active path is driven by live job status. ArchPilot does not animate ahead of the control plane.
      </p>
    </div>
  );
}
