import { ArchitectureBadge } from "@/components/deploy/architecture-badge";
import type { Job } from "@/lib/types";

export function ArchitectureCard({ job }: { job: Job }) {
  const kind = job.runtimeKind;
  const container =
    job.containerArchitecture ??
    (kind === "native_arm" ? "ARM64" : kind === "unknown" ? "—" : "AMD64");
  const host =
    job.hostArchitecture ??
    (kind === "native_arm"
      ? "ARM64"
      : kind === "qemu"
        ? "ARM64"
        : kind === "fallback_x86"
          ? "X86_64"
          : "—");
  const runtime =
    kind === "native_arm"
      ? "ECS Fargate"
      : kind === "qemu"
        ? "QEMU/binfmt"
        : kind === "fallback_x86"
          ? "ECS Fargate"
          : job.runtimeMode ?? "Pending";
  const path =
    kind === "native_arm"
      ? "ARM64 → ARM64"
      : kind === "qemu"
        ? "AMD64 → ARM64"
        : kind === "fallback_x86"
          ? "AMD64 → AMD64"
          : "Awaiting decision";

  return (
    <div className="rounded-lg bg-card p-4 shadow-border">
      <div className="flex items-center justify-between gap-3">
        <p className="text-2xs font-medium tracking-wide text-muted uppercase">Architecture</p>
        <ArchitectureBadge
          label={kind === "native_arm" ? "Native ARM" : kind === "qemu" ? "QEMU path" : kind === "fallback_x86" ? "X86 fallback" : "Undecided"}
          tone={kind === "native_arm" ? "arm" : kind === "unknown" ? "muted" : "x86"}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Meta label="Container" value={container} />
        <Meta label="Host" value={host} />
        <Meta label="Runtime" value={runtime} />
        <Meta label="Architecture" value={path} />
      </div>
      {kind === "qemu" ? (
        <p className="mt-4 text-xs text-muted">
          AMD64 image preserved. Execution is attempted on an ARM64 Graviton host through QEMU/binfmt, then
          validated. This does not mean every x86 workload will run.
        </p>
      ) : null}
      {kind === "fallback_x86" ? (
        <p className="mt-4 text-xs text-warning">
          QEMU runtime validation was not viable. Policy placed the AMD64 image on ECS Fargate X86_64.
        </p>
      ) : null}
      {kind === "native_arm" ? (
        <p className="mt-4 text-xs text-muted">
          Workload is ARM64-compatible. Image built as linux/arm64 and deployed to ECS Fargate ARM64.
        </p>
      ) : null}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xs tracking-wide text-subtle uppercase">{label}</p>
      <p className="mt-1 font-mono text-sm text-foreground">{value}</p>
    </div>
  );
}
