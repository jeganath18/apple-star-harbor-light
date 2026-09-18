import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Clock3, Cpu, Landmark } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { DeploymentHistory } from "@/components/deploy/deployment-history";
import { RepositoryInput } from "@/components/deploy/repository-input";
import { MetricCard } from "@/components/metric-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobs } from "@/hooks/use-jobs";
import { formatDuration, formatUsd } from "@/lib/format";
import { ConsolePage } from "@/components/layout/console-page";

export const Route = createFileRoute("/_console/overview")({
  component: OverviewPage,
});

function OverviewPage() {
  const { data, isPending } = useJobs();
  const jobs = data ?? [];
  const active = jobs.filter((j) => !["COMPLETED", "FAILED"].includes(String(j.status).toUpperCase()));
  const completed = jobs.filter((j) => String(j.status).toUpperCase() === "COMPLETED");
  const durations = completed.map((j) => j.durationMs).filter((n): n is number => typeof n === "number");
  const avg =
    durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : undefined;
  const arm = jobs.filter((j) => j.runtimeKind === "native_arm" || j.verdict === "native_arm64").length;
  const qemu = jobs.filter((j) => j.runtimeKind === "qemu").length;
  const x86 = jobs.filter((j) => j.runtimeKind === "fallback_x86" || j.verdict === "x86_required").length;
  const savings = completed
    .map((j) => j.cost?.differenceMonthly)
    .filter((n): n is number => typeof n === "number");
  const savingsSum = savings.length ? savings.reduce((a, b) => a + b, 0) : undefined;

  return (
    <ConsolePage
      title="Overview"
      context="Control plane"
      action={
        <Button asChild size="sm">
          <Link to="/deployments">View deployments</Link>
        </Button>
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-xl bg-card p-5 shadow-border">
          <p className="text-2xs font-medium tracking-wide text-muted uppercase">Deploy a repository</p>
          <h2 className="mt-1 text-lg font-medium tracking-tight">Start an architecture-aware deployment</h2>
          <div className="mt-4">
            <RepositoryInput autoFocus />
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Active deployments"
            value={isPending ? "—" : active.length}
            icon={<Activity className="size-4" />}
          />
          <MetricCard
            label="Completed"
            value={isPending ? "—" : completed.length}
            icon={<Clock3 className="size-4" />}
          />
          <MetricCard
            label="Avg duration"
            value={avg !== undefined ? formatDuration(avg) : "—"}
            hint="Completed jobs only"
            icon={<Cpu className="size-4" />}
          />
          <MetricCard
            label="Estimated compute savings"
            value={savingsSum !== undefined ? formatUsd(savingsSum) : "—"}
            hint="Sum of control-plane estimates · not a bill"
            icon={<Landmark className="size-4" />}
          />
        </section>

        <section className="rounded-lg bg-card p-4 shadow-border">
          <p className="text-2xs font-medium tracking-wide text-muted uppercase">Architecture distribution</p>
          {jobs.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Distribution appears after the first real deployment.</p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs">
              <span className="text-infra">ARM64 native {arm}</span>
              <span className="text-warning">QEMU {qemu}</span>
              <span className="text-muted">X86 required / fallback {x86}</span>
            </div>
          )}
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">Recent deployments</h2>
            <Link to="/deployments" className="text-xs text-muted hover:text-foreground">
              All deployments
            </Link>
          </div>
          {isPending ? (
            <Skeleton className="h-40 w-full rounded-lg" />
          ) : jobs.length === 0 ? (
            <EmptyState
              title="No deployments yet."
              description="Deploy a GitHub repository to see your first architecture analysis."
            />
          ) : (
            <DeploymentHistory jobs={jobs.slice(0, 8)} />
          )}
        </section>
      </div>
    </ConsolePage>
  );
}
