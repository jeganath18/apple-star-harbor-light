import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyState } from "@/components/empty-state";
import { ArchitectureBadge } from "@/components/deploy/architecture-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobs } from "@/hooks/use-jobs";
import { repoDisplay } from "@/lib/format";
import { ConsolePage } from "@/components/layout/console-page";

export const Route = createFileRoute("/_console/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data, isPending } = useJobs();
  const jobs = data ?? [];
  const groups = new Map<string, typeof jobs>();
  for (const job of jobs) {
    const key = repoDisplay(job.repository);
    const list = groups.get(key) ?? [];
    list.push(job);
    groups.set(key, list);
  }

  return (
    <ConsolePage title="Projects" context="Repositories observed by ArchPilot">
      <div className="mx-auto max-w-6xl">
        {isPending ? <Skeleton className="h-40 rounded-lg" /> : null}
        {!isPending && groups.size === 0 ? (
          <EmptyState
            title="No projects yet."
            description="Deploy a GitHub repository to register it as a project in this console."
          />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {[...groups.entries()].map(([repo, list]) => {
              const latest = list[0];
              return (
                <Link
                  key={repo}
                  to="/deployments/$jobId"
                  params={{ jobId: latest.jobId }}
                  className="rounded-lg bg-card p-4 shadow-border transition-[box-shadow] duration-150 hover:shadow-border-hover"
                >
                  <p className="font-mono text-sm">{repo}</p>
                  <p className="mt-1 text-xs text-muted">{list.length} deployment{list.length === 1 ? "" : "s"}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <ArchitectureBadge
                      label={latest.verdict === "unknown" ? "undecided" : latest.verdict}
                      tone={latest.verdict === "native_arm64" ? "arm" : "x86"}
                    />
                    {latest.runtimeMode ? (
                      <ArchitectureBadge label={latest.runtimeMode} tone="muted" />
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </ConsolePage>
  );
}
