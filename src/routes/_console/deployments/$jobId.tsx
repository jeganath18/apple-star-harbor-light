import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { ArchitectureCard } from "@/components/deploy/architecture-card";
import { ArchitectureFlow } from "@/components/deploy/architecture-flow";
import { BedrockReasoning } from "@/components/deploy/bedrock-reasoning";
import { BuildLogs } from "@/components/deploy/build-logs";
import { CostComparison } from "@/components/deploy/cost-comparison";
import { DeploymentSummary } from "@/components/deploy/deployment-summary";
import { DeploymentTimeline } from "@/components/deploy/deployment-timeline";
import { LiveDeployment } from "@/components/deploy/live-deployment";
import { RuntimeCard } from "@/components/deploy/runtime-card";
import { ErrorState } from "@/components/error-state";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge, jobStatusTone } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJob } from "@/hooks/use-job";
import { ApiError } from "@/lib/api";
import { AWS_REGION_FULL } from "@/lib/constants";
import { lastUpdatedLabel, repoDisplay } from "@/lib/format";
import { deriveStages, errorCopy } from "@/lib/job-derive";
import { listTrackedJobs } from "@/lib/jobs-store";

export const Route = createFileRoute("/_console/deployments/$jobId")({
  component: DeploymentPage,
});

function DeploymentPage() {
  const { jobId } = Route.useParams();
  const query = useJob(jobId);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const job = query.data;
  const tracked = listTrackedJobs().find((j) => j.jobId === jobId);
  const repo = job?.repository ?? tracked?.repoUrl;
  const fail = job ? errorCopy(job) : null;
  const apiErr = query.error instanceof ApiError ? query.error.shape : null;

  return (
    <AppShell
      title="Deployment"
      context={
        <span className="font-mono">
          {repoDisplay(repo)} · {jobId} · {job?.region ? `AWS · ${job.region}` : AWS_REGION_FULL}
        </span>
      }
      status={
        <div className="flex items-center gap-3">
          {job ? (
            <StatusBadge
              label={String(job.status)}
              tone={jobStatusTone(String(job.status))}
              pulse={!["COMPLETED", "FAILED"].includes(String(job.status).toUpperCase())}
            />
          ) : null}
          <span className="hidden font-mono text-2xs text-subtle sm:inline">
            {query.dataUpdatedAt ? lastUpdatedLabel(query.isFetching ? now : query.dataUpdatedAt) : "Waiting"}
          </span>
        </div>
      }
      action={
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="ghost" onClick={() => query.refetch()} aria-label="Refresh">
            <RefreshCw className="size-3.5" />
          </Button>
          <Button asChild size="sm" variant="secondary">
            <Link to="/reports/$jobId" params={{ jobId }}>
              <FileText className="size-3.5" />
              Report
            </Link>
          </Button>
        </div>
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        {query.isPending ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <Skeleton className="h-96 rounded-lg" />
            <Skeleton className="h-96 rounded-lg" />
          </div>
        ) : null}

        {query.isError && !job ? (
          <ErrorState
            title={apiErr?.title ?? "Deployment not found."}
            detail={apiErr?.detail ?? (query.error instanceof Error ? query.error.message : "Missing job")}
            onRetry={apiErr?.retryable === false ? undefined : () => query.refetch()}
          />
        ) : null}

        {job ? (
          <>
            {fail ? <ErrorState title={fail.title} detail={fail.detail} onRetry={() => query.refetch()} /> : null}
            {query.isError ? (
              <p className="font-mono text-2xs text-warning">
                Live updates interrupted. Showing last known state. {apiErr?.detail}
              </p>
            ) : null}
            <DeploymentSummary job={job} />
            <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <DeploymentTimeline stages={deriveStages(job)} />
              <div className="flex flex-col gap-4">
                <ArchitectureCard job={job} />
                <ArchitectureFlow job={job} />
                <BedrockReasoning job={job} />
                <RuntimeCard job={job} />
                <LiveDeployment job={job} />
                <CostComparison job={job} />
              </div>
            </div>
            <BuildLogs logs={job.logs} />
          </>
        ) : null}
      </div>
    </AppShell>
  );
}
