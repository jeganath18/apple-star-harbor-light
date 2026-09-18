import { formatUsd } from "@/lib/format";
import type { Job } from "@/lib/types";

export function CostComparison({ job }: { job: Job }) {
  const cost = job.cost;
  if (!cost || (cost.actualMonthly === undefined && cost.comparisonMonthly === undefined)) {
    return (
      <div className="rounded-lg bg-card p-4 shadow-border">
        <p className="text-2xs font-medium tracking-wide text-muted uppercase">Cost intelligence</p>
        <p className="mt-3 text-sm text-foreground">Compute estimate not yet available.</p>
        <p className="mt-2 text-xs text-muted">
          ArchPilot only renders cost figures returned by the control plane. Values are never invented in the
          client.
        </p>
      </div>
    );
  }

  const actualLabel =
    cost.actualLabel ??
    (job.runtimeKind === "qemu"
      ? "Graviton + QEMU"
      : job.runtimeKind === "native_arm"
        ? "ARM64 Fargate"
        : "Selected runtime");
  const comparisonLabel =
    cost.comparisonLabel ??
    (job.runtimeKind === "qemu" ? "Equivalent X86 EC2" : "X86 Fargate");

  return (
    <div className="rounded-lg bg-card p-4 shadow-border">
      <p className="text-2xs font-medium tracking-wide text-muted uppercase">Cost intelligence</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-background px-3 py-3 shadow-border">
          <p className="text-2xs tracking-wide text-subtle uppercase">Actual runtime</p>
          <p className="mt-1 text-xs text-muted">{actualLabel}</p>
          <p className="mt-2 font-mono text-2xl tabular">{formatUsd(cost.actualMonthly)}</p>
          <p className="text-2xs text-subtle">/ month</p>
        </div>
        <div className="rounded-md bg-background px-3 py-3 shadow-border">
          <p className="text-2xs tracking-wide text-subtle uppercase">Comparison</p>
          <p className="mt-1 text-xs text-muted">{comparisonLabel}</p>
          <p className="mt-2 font-mono text-2xl text-muted tabular">{formatUsd(cost.comparisonMonthly)}</p>
          <p className="text-2xs text-subtle">/ month</p>
        </div>
      </div>
      {cost.differenceMonthly !== undefined ? (
        <p className="mt-4 font-mono text-sm text-infra">
          Estimated difference {formatUsd(cost.differenceMonthly)}
          {cost.differencePercent !== undefined
            ? ` · ${Math.round(cost.differencePercent)}%`
            : ""}
        </p>
      ) : null}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cost.vcpu !== undefined ? <Tiny label="vCPU" value={String(cost.vcpu)} /> : null}
        {cost.memoryGb !== undefined ? <Tiny label="Memory" value={`${cost.memoryGb} GB`} /> : null}
        {cost.hoursPerMonth !== undefined ? <Tiny label="Hours/month" value={String(cost.hoursPerMonth)} /> : null}
        {cost.cpuPrice !== undefined ? <Tiny label="CPU price" value={formatUsd(cost.cpuPrice, 4)} /> : null}
      </div>
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
