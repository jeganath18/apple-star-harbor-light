import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyState } from "@/components/empty-state";
import { ArchitectureBadge } from "@/components/deploy/architecture-badge";
import { useJobs } from "@/hooks/use-jobs";
import { confidenceLabel, repoDisplay } from "@/lib/format";
import { ConsolePage } from "@/components/layout/console-page";

export const Route = createFileRoute("/_console/analysis")({
  component: AnalysisPage,
});

function AnalysisPage() {
  const { data } = useJobs();
  const jobs = data ?? [];

  return (
    <ConsolePage title="Architecture Analysis" context="Scanner evidence and Bedrock reasoning">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <section className="grid gap-3 md:grid-cols-3">
          <Note
            title="Deterministic scanner"
            body="Evidence from Dockerfiles, native dependencies, and declared platforms. Treated as fact."
          />
          <Note
            title="Amazon Bedrock"
            body="Invoked only when the scanner cannot establish a confident architecture. Labeled as AI reasoning."
          />
          <Note
            title="Deployment policy"
            body="Maps the verdict onto Fargate ARM64, Graviton + QEMU, or Fargate X86_64 fallback."
          />
        </section>
        {jobs.length === 0 ? (
          <EmptyState
            title="No architecture analyses yet."
            description="Deploy a GitHub repository to run the scanner and, if needed, Bedrock reasoning."
          />
        ) : (
          <ul className="divide-y divide-border overflow-hidden rounded-lg bg-card shadow-border">
            {jobs.map((job) => (
              <li key={job.jobId}>
                <Link
                  to="/deployments/$jobId"
                  params={{ jobId: job.jobId }}
                  className="flex flex-col gap-2 px-4 py-3 hover:bg-card-elevated sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-mono text-sm">{repoDisplay(job.repository)}</p>
                    <p className="mt-1 text-xs text-muted">
                      {job.decisionSource === "bedrock"
                        ? "Bedrock reasoning"
                        : job.decisionSource === "deterministic"
                          ? "Deterministic scanner"
                          : "Source pending"}
                      {job.confidence !== undefined ? ` · ${confidenceLabel(job.confidence)}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <ArchitectureBadge label={job.verdict} tone={job.verdict === "native_arm64" ? "arm" : "x86"} />
                    {job.runtimeKind !== "unknown" ? (
                      <ArchitectureBadge
                        label={job.runtimeKind.replace("_", " ")}
                        tone={job.runtimeKind === "native_arm" ? "arm" : "qemu"}
                      />
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ConsolePage>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg bg-card p-4 shadow-border">
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="mt-2 text-xs leading-relaxed text-muted">{body}</p>
    </article>
  );
}
