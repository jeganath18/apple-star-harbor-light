import { cn } from "@/lib/utils";

const STEPS = [
  "GitHub Repository",
  "Architecture Scanner",
  "Amazon Bedrock",
  "Architecture Decision",
  "Build",
  "Graviton / Fargate",
  "Runtime Validation",
  "Live Application",
];

export function PipelineVisual() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-card p-5 shadow-elevated">
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-60" />
      <p className="relative text-2xs font-medium tracking-wide text-muted uppercase">
        Deployment pipeline
      </p>
      <ol className="relative mt-4 space-y-0">
        {STEPS.map((step, i) => (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "mt-0.5 flex size-6 items-center justify-center rounded-sm font-mono text-2xs",
                  i === STEPS.length - 1
                    ? "bg-success/15 text-success"
                    : i === 2
                      ? "bg-ai/15 text-ai"
                      : "bg-infra/10 text-infra",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < STEPS.length - 1 ? (
                <svg width="2" height="22" className="my-1 overflow-visible text-border" aria-hidden="true">
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="22"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="animate-flow text-infra/50"
                  />
                </svg>
              ) : null}
            </div>
            <div className="pt-0.5 pb-1">
              <p className="font-mono text-xs text-foreground">{step}</p>
              {i === 2 ? (
                <p className="text-2xs text-ai">Invoked only when evidence is ambiguous</p>
              ) : null}
              {i === 6 ? (
                <p className="text-2xs text-muted">QEMU/binfmt or native health</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
