import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { AWS_REGION_FULL } from "@/lib/constants";
import type { Job } from "@/lib/types";

export function LiveDeployment({ job }: { job: Job }) {
  const url = job.liveUrl ?? job.health?.liveUrl;
  const healthy = job.health?.healthy === true || (job.status === "COMPLETED" && Boolean(url));
  const [copied, setCopied] = useState(false);

  if (!url && job.status !== "COMPLETED") {
    return (
      <div className="rounded-lg bg-card p-4 shadow-border">
        <p className="text-2xs font-medium tracking-wide text-muted uppercase">Live application</p>
        <p className="mt-3 text-sm text-muted">No live URL yet. This card populates when the control plane publishes an endpoint.</p>
      </div>
    );
  }

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Live URL copied");
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy URL");
    }
  }

  return (
    <div className={healthy ? "rounded-lg bg-card p-4 glow-success" : "rounded-lg bg-card p-4 shadow-border"}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-2xs font-medium tracking-wide text-muted uppercase">Live application</p>
        <StatusBadge
          label={healthy ? "LIVE · Healthy" : url ? "Published" : "Unavailable"}
          tone={healthy ? "success" : "muted"}
          pulse={healthy}
        />
      </div>
      <p className="mt-3 break-all font-mono text-sm text-infra">{url ?? "—"}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Meta label="Region" value={job.region ? `AWS · ${job.region}` : AWS_REGION_FULL} />
        <Meta label="Runtime" value={job.runtimeMode ?? job.recommendedRuntime ?? "—"} />
        <Meta label="Container" value={job.containerArchitecture ?? "—"} />
        <Meta label="Host" value={job.hostArchitecture ?? "—"} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {url ? (
          <Button asChild size="sm">
            <a href={url} target="_blank" rel="noreferrer">
              <ExternalLink className="size-3.5" />
              Open Application
            </a>
          </Button>
        ) : null}
        {url ? (
          <Button type="button" size="sm" variant="secondary" onClick={copy}>
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            Copy URL
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xs tracking-wide text-subtle uppercase">{label}</p>
      <p className="mt-1 font-mono text-xs text-foreground">{value}</p>
    </div>
  );
}
