import { Link } from "@tanstack/react-router";
import { ArchitectureBadge } from "@/components/deploy/architecture-badge";
import { StatusBadge, jobStatusTone } from "@/components/status-badge";
import { formatDuration, formatRelative, repoDisplay } from "@/lib/format";
import type { Job } from "@/lib/types";

export function DeploymentHistory({ jobs }: { jobs: Job[] }) {
  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-border">
      <div className="hidden grid-cols-12 gap-3 px-4 py-2.5 text-2xs tracking-wide text-subtle uppercase md:grid">
        <span className="col-span-3">Repository</span>
        <span className="col-span-2">Job ID</span>
        <span className="col-span-1">Arch</span>
        <span className="col-span-2">Runtime</span>
        <span className="col-span-1">Status</span>
        <span className="col-span-1">Duration</span>
        <span className="col-span-1">Created</span>
        <span className="col-span-1">Live</span>
      </div>
      <ul className="divide-y divide-border">
        {jobs.map((job) => (
          <li key={job.jobId}>
            <Link
              to="/deployments/$jobId"
              params={{ jobId: job.jobId }}
              className="grid grid-cols-1 gap-2 px-4 py-3 transition-colors duration-150 hover:bg-card-elevated md:grid-cols-12 md:items-center md:gap-3"
            >
              <span className="truncate font-mono text-xs md:col-span-3">
                {repoDisplay(job.repository)}
              </span>
              <span className="truncate font-mono text-2xs text-muted md:col-span-2">{job.jobId}</span>
              <span className="md:col-span-1">
                <ArchitectureBadge
                  label={
                    job.containerArchitecture ??
                    (job.verdict === "native_arm64" ? "ARM64" : job.verdict === "x86_required" ? "AMD64" : "—")
                  }
                  tone={job.verdict === "native_arm64" ? "arm" : job.verdict === "x86_required" ? "x86" : "muted"}
                />
              </span>
              <span className="font-mono text-2xs text-muted md:col-span-2">
                {job.runtimeMode ?? job.recommendedRuntime ?? "—"}
              </span>
              <span className="md:col-span-1">
                <StatusBadge label={String(job.status)} tone={jobStatusTone(String(job.status))} />
              </span>
              <span className="font-mono text-2xs text-muted tabular md:col-span-1">
                {formatDuration(job.durationMs)}
              </span>
              <span className="font-mono text-2xs text-muted md:col-span-1">
                {formatRelative(job.createdAt)}
              </span>
              <span className="font-mono text-2xs md:col-span-1">
                {job.liveUrl ? <span className="text-success">Live</span> : <span className="text-subtle">—</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
