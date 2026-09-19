import { ArchitectureBadge } from "@/components/deploy/architecture-badge";
import { StatusBadge } from "@/components/status-badge";
import type { Job } from "@/lib/types";

export function RuntimeCard({ job }: { job: Job }) {
  if (job.runtimeKind !== "qemu" && !job.qemu?.present) return null;
  const qemu = job.raw.qemu;
  const status = qemu?.status ?? (job.status === "COMPLETED" ? "VALIDATED" : "PENDING");
  const failed = status === "FAILED" || job.runtimeKind === "fallback_x86";

  return (
    <div className={failed ? "rounded-lg bg-card p-4 glow-warning" : "rounded-lg bg-card p-4 glow-infra"}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-2xs font-medium tracking-wide text-muted uppercase">QEMU runtime validation</p>
        <StatusBadge
          label={failed ? "FAILED" : status}
          tone={failed ? "danger" : status === "VALIDATED" ? "success" : "infra"}
          pulse={status === "RUNNING" || status === "PENDING"}
        />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Meta label="Container architecture" value={qemu?.containerArchitecture ?? job.containerArchitecture ?? "AMD64"} />
        <Meta label="Host architecture" value={qemu?.hostArchitecture ?? job.hostArchitecture ?? "ARM64"} />
        <Meta label="Host" value={qemu?.host ?? "AWS Graviton"} />
        <Meta label="Emulation" value={qemu?.emulation ?? "QEMU/binfmt"} />
        <div className="flex items-end">
          <ArchitectureBadge label="AMD64 → ARM64" tone="qemu" />
        </div>
      </div>
      <p className="mt-4 text-sm text-foreground">
        {failed
          ? "QEMU runtime validation failed. ArchPilot automatically switched to native X86 infrastructure."
          : status === "VALIDATED"
            ? "AMD64 container successfully executed on ARM64 Graviton."
            : qemu?.message ?? "Waiting for runtime validation from the control plane."}
      </p>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xs tracking-wide text-subtle uppercase">{label}</p>
      <p className="mt-1 font-mono text-sm">{value}</p>
    </div>
  );
}
