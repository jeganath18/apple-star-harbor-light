import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyState } from "@/components/empty-state";
import { DeploymentHistory } from "@/components/deploy/deployment-history";
import { RepositoryInput } from "@/components/deploy/repository-input";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobs } from "@/hooks/use-jobs";
import { ConsolePage } from "@/components/layout/console-page";

export const Route = createFileRoute("/_console/deployments/")({
  component: DeploymentsPage,
});

function DeploymentsPage() {
  const { data, isPending, isError, error, refetch } = useJobs();
  const jobs = data ?? [];

  return (
    <ConsolePage
      title="Deployments"
      context="Job history"
      action={
        <Button asChild size="sm" variant="secondary">
          <Link to="/overview">New deployment</Link>
        </Button>
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <RepositoryInput />
        {isPending ? <Skeleton className="h-64 w-full rounded-lg" /> : null}
        {isError ? (
          <ErrorState
            title="ArchPilot control plane is temporarily unavailable."
            detail={error instanceof Error ? error.message : "Could not load deployments."}
            onRetry={() => refetch()}
          />
        ) : null}
        {!isPending && !isError && jobs.length === 0 ? (
          <EmptyState
            title="No deployments yet."
            description="Deploy a GitHub repository to see your first architecture analysis."
          />
        ) : null}
        {jobs.length > 0 ? <DeploymentHistory jobs={jobs} /> : null}
      </div>
    </ConsolePage>
  );
}
