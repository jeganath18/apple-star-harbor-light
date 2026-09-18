import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyState } from "@/components/empty-state";
import { StatusBadge, jobStatusTone } from "@/components/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobs } from "@/hooks/use-jobs";
import { formatRelative, repoDisplay } from "@/lib/format";
import { ConsolePage } from "@/components/layout/console-page";

export const Route = createFileRoute("/_console/reports/")({
  component: ReportsPage,
});

function ReportsPage() {
  const { data, isPending } = useJobs();
  const reports = (data ?? []).filter((j) =>
    ["COMPLETED", "FAILED", "REPORTING"].includes(String(j.status).toUpperCase()),
  );

  return (
    <ConsolePage title="Reports" context="Explainable deployment reports">
      <div className="mx-auto max-w-6xl">
        {isPending ? <Skeleton className="h-48 rounded-lg" /> : null}
        {!isPending && reports.length === 0 ? (
          <EmptyState
            title="Deployment reports will appear here."
            description="Completed jobs publish an explainable report covering scanner evidence, Bedrock reasoning, runtime, and cost."
          />
        ) : null}
        {reports.length > 0 ? (
          <ul className="divide-y divide-border overflow-hidden rounded-lg bg-card shadow-border">
            {reports.map((job) => (
              <li key={job.jobId}>
                <Link
                  to="/reports/$jobId"
                  params={{ jobId: job.jobId }}
                  className="flex flex-col gap-1 px-4 py-3 hover:bg-card-elevated sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-mono text-sm">{repoDisplay(job.repository)}</p>
                    <p className="font-mono text-2xs text-muted">{job.jobId}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge label={String(job.status)} tone={jobStatusTone(String(job.status))} />
                    <span className="font-mono text-2xs text-subtle">{formatRelative(job.completedAt ?? job.createdAt)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </ConsolePage>
  );
}
