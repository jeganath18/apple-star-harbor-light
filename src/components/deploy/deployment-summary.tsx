import { ArchitectureBadge } from "@/components/deploy/architecture-badge";
import { StatusBadge, jobStatusTone } from "@/components/status-badge";
import { confidenceLabel, formatDuration, formatJobId, repoDisplay } from "@/lib/format";
import type { Job } from "@/lib/types";

export function DeploymentSummary({ job }: { job: Job }) {
  return (
    <div className="rounded-lg bg-card p-4 shadow-border">
      <p className="text-2xs font-medium tracking-wide text-muted uppercase">Deployment summary</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Repository" value={repoDisplay(job.repository)} mono />
        <Field label="Job" value={formatJobId(job.jobId)} mono />
        <div>
          <p className="text-2xs tracking-wide text-subtle uppercase">Status</p>
          <div className="mt-1">
            <StatusBadge
              label={String(job.status)}
              tone={jobStatusTone(String(job.status))}
              pulse={!["COMPLETED", "FAILED"].includes(String(job.status).toUpperCase())}
            />
          </div>
        </div>
        <Field label="Duration" value={formatDuration(job.durationMs)} mono />
        <Field label="Verdict" value={job.verdict} mono />
        <Field label="Confidence" value={confidenceLabel(job.confidence)} mono />
        <Field
          label="Decision source"
          value={
            job.decisionSource === "deterministic"
              ? "Deterministic scanner"
              : job.decisionSource === "bedrock"
                ? "Amazon Bedrock"
                : job.decisionSource === "policy"
                  ? "Deployment policy"
                  : "—"
          }
        />
        <div>
          <p className="text-2xs tracking-wide text-subtle uppercase">Runtime</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {job.targetPlatform ? (
              <ArchitectureBadge label={job.targetPlatform} tone="muted" />
            ) : null}
            {job.runtimeMode ? (
              <ArchitectureBadge
                label={job.runtimeMode}
                tone={job.runtimeKind === "native_arm" ? "arm" : job.runtimeKind === "qemu" ? "qemu" : "x86"}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-2xs tracking-wide text-subtle uppercase">{label}</p>
      <p className={mono ? "mt-1 font-mono text-sm" : "mt-1 text-sm"}>{value}</p>
    </div>
  );
}
