import { createFileRoute, Link } from "@tanstack/react-router";
import { ArchitectureCard } from "@/components/deploy/architecture-card";
import { BedrockReasoning } from "@/components/deploy/bedrock-reasoning";
import { CostComparison } from "@/components/deploy/cost-comparison";
import { LiveDeployment } from "@/components/deploy/live-deployment";
import { RuntimeCard } from "@/components/deploy/runtime-card";
import { ReportSection, ReportVisual } from "@/components/deploy/report-section";
import { ErrorState } from "@/components/error-state";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge, jobStatusTone } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJob } from "@/hooks/use-job";
import { ApiError } from "@/lib/api";
import { confidenceLabel, formatJobId, repoDisplay } from "@/lib/format";
import { architecturePath } from "@/lib/job-derive";

export const Route = createFileRoute("/_console/reports/$jobId")({
  component: ReportPage,
});

function ReportPage() {
  const { jobId } = Route.useParams();
  const query = useJob(jobId);
  const job = query.data;
  const apiErr = query.error instanceof ApiError ? query.error.shape : null;
  const path = job ? architecturePath(job) : null;

  return (
    <AppShell
      title="Deployment report"
      context={<span className="font-mono">{formatJobId(jobId)}</span>}
      status={
        job ? <StatusBadge label={String(job.status)} tone={jobStatusTone(String(job.status))} /> : null
      }
      action={
        <Button asChild size="sm" variant="secondary">
          <Link to="/deployments/$jobId" params={{ jobId }}>
            Open pipeline
          </Link>
        </Button>
      }
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        {query.isPending ? <Skeleton className="h-64 rounded-lg" /> : null}
        {query.isError && !job ? (
          <ErrorState
            title={apiErr?.title ?? "Report unavailable."}
            detail={apiErr?.detail ?? "The control plane did not return this job."}
            onRetry={() => query.refetch()}
          />
        ) : null}
        {job ? (
          <>
            <ReportSection title="Deployment summary" eyebrow="Report">
              <dl className="grid gap-3 sm:grid-cols-2">
                <Item k="Repository" v={repoDisplay(job.repository)} />
                <Item k="Job" v={job.jobId} />
                <Item k="Decision" v={job.verdict} />
                <Item k="Confidence" v={confidenceLabel(job.confidence)} />
                <Item
                  k="Source"
                  v={
                    job.raw.report.decision.source === "deterministic"
                      ? "Deterministic Scanner"
                      : job.decisionSource === "bedrock"
                        ? "Amazon Bedrock"
                        : job.decisionSource
                  }
                />
                <Item k="Build" v={job.targetPlatform ?? "—"} />
                <Item k="Image" v={job.imageUri ?? job.resources?.ecrImage ?? "—"} />
                <Item k="Runtime" v={job.runtimeMode ?? "—"} />
              </dl>
            </ReportSection>

            <ReportSection title="Architecture decision">
              <ArchitectureCard job={job} />
              {path ? (
                <div className="mt-4">
                  <p className="mb-3 text-xs text-muted">{path.caption}</p>
                  <ReportVisual nodes={path.nodes} />
                </div>
              ) : null}
            </ReportSection>
{/* job?.raw?.report?.scanner?.docker?.baseImages?.image */}
            <ReportSection title="Scanner findings">
              {job?.raw?.report?.scanner?.confidence ? (
                <ul className="space-y-1.5 font-mono text-xs text-muted">
                  {job.raw?.report?.scanner?.verdict ? <li>Verdict: {job.raw?.report?.scanner?.verdict}</li> : null}
                  {job?.raw?.report?.scanner?.docker?.baseImages?.image ? <li>Framework: {job?.raw?.report?.scanner?.docker?.baseImages?.image}</li> : null}
                  {job.scanner?.evidence.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                  {job.scanner?.nativeDependencies.map((d) => (
                    <li key={d}>Native dependency: {d}</li>
                  ))}
                  {job.scanner?.evidence.length === 0 && job.scanner?.nativeDependencies.length === 0 ? (
                    <li>Scanner payload present, no evidence list returned.</li>
                  ) : null}
                </ul>
              ) : (
                <p className="text-sm text-muted">No scanner payload on this job.</p>
              )}
            </ReportSection>

            <BedrockReasoning job={job} />
            <RuntimeCard job={job} />


            <CostComparison job={job} />

            {/* <ReportSection title="AWS resources">
              {job.resources && Object.values(job.resources).some(Boolean) ? (
                <dl className="grid gap-3 sm:grid-cols-2">
                  {job.resources.cluster ? <Item k="Cluster" v={job.resources.cluster} /> : null}
                  {job.resources.service ? <Item k="Service" v={job.resources.service} /> : null}
                  {job.resources.taskDefinition ? (
                    <Item k="Task definition" v={job.resources.taskDefinition} />
                  ) : null}
                  {job.resources.instanceId ? <Item k="Instance" v={job.resources.instanceId} /> : null}
                  {job.resources.ecrImage ? <Item k="ECR" v={job.resources.ecrImage} /> : null}
                  {job.resources.logGroup ? <Item k="Logs" v={job.resources.logGroup} /> : null}
                </dl>
              ) : (
                <p className="text-sm text-muted">
                  AWS resource identifiers are shown only when the control plane returns them.
                </p>
              )}
            </ReportSection> */}

            <LiveDeployment job={job} />
          </>
        ) : null}
      </div>
    </AppShell>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-2xs tracking-wide text-subtle uppercase">{k}</dt>
      <dd className="mt-1 break-all font-mono text-xs">{v}</dd>
    </div>
  );
}
