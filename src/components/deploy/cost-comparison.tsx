import { formatUsd } from "@/lib/format";
import type { Job } from "@/lib/types";

export function CostComparison({ job }: { job: Job }) {
  const cost = job?.raw?.report?.costComparison;

  const actualLabel =
    cost?.actualLabel ??
    (job?.qemu?.present
      ? "Graviton + QEMU"
        : "ARM64 Fargate");
  const comparisonLabel =
    cost?.comparisonLabel ??
    (job?.qemu?.present ? "Equivalent X86 EC2" : "X86 Fargate");

  return (
    <div className="rounded-lg bg-card p-4 shadow-border">
      <p className="text-2xs font-medium tracking-wide text-muted uppercase">Cost intelligence</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-background px-3 py-3 shadow-border">
          <p className="text-2xs tracking-wide text-subtle uppercase">Actual runtime</p>
          <p className="mt-1 text-xs text-muted">{actualLabel}</p>
          <p className="mt-2 font-mono text-2xl tabular">{formatUsd(cost?.arm64MonthlyUsd)}</p>
          <p className="text-2xs text-subtle">/ month</p>
        </div>
        <div className="rounded-md bg-background px-3 py-3 shadow-border">
          <p className="text-2xs tracking-wide text-subtle uppercase">Comparison</p>
          <p className="mt-1 text-xs text-muted">{comparisonLabel}</p>
          <p className="mt-2 font-mono text-2xl text-muted tabular">{formatUsd(cost?.x86MonthlyUsd
)}</p>
          <p className="text-2xs text-subtle">/ month</p>
        </div>
      </div>
      {cost?.estimatedSavingsPercent !== undefined ? (
        <p className="mt-4 font-mono text-sm text-infra">
          Estimated difference {formatUsd(cost?.estimatedSavingsUsd)}
          {cost?.estimatedSavingsPercent !== undefined
            ? ` · ${Math.round(cost?.estimatedSavingsPercent)}%`
            : ""}
        </p>
      ) : null}
      <p className="mt-4 text-2xs leading-relaxed text-subtle">
        Compute-only estimate. Excludes load balancer, storage, data transfer, public IPv4, monitoring, and
        other AWS charges. Not a guaranteed bill.
      </p>
    </div>
  );
}

function Tiny({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xs text-subtle">{label}</p>
      <p className="font-mono text-xs">{value}</p>
    </div>
  );
}
