import { createFileRoute } from "@tanstack/react-router";
import { AWS_REGION, AWS_REGION_FULL } from "@/lib/constants";
import { getApiBase } from "@/lib/api";
import { ConsolePage } from "@/components/layout/console-page";

export const Route = createFileRoute("/_console/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const api = getApiBase();
  return (
    <ConsolePage title="Settings" context="Control plane">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <section className="rounded-lg bg-card p-5 shadow-border">
          <h2 className="text-sm font-medium">Region</h2>
          <p className="mt-2 font-mono text-sm">{AWS_REGION_FULL}</p>
          <p className="mt-1 font-mono text-xs text-muted">{AWS_REGION}</p>
        </section>
        <section className="rounded-lg bg-card p-5 shadow-border">
          <h2 className="text-sm font-medium">API endpoint</h2>
          <p className="mt-2 break-all font-mono text-xs text-muted">
            {api ?? "VITE_API_BASE_URL is not set. Deploy and job polling cannot reach the control plane."}
          </p>
        </section>
        <section className="rounded-lg bg-card p-5 shadow-border">
          <h2 className="text-sm font-medium">Operator</h2>
          <p className="mt-2 text-sm text-muted">
            This console is a control-plane client. It does not mint AWS resource IDs, cost figures, or
            runtime outcomes locally.
          </p>
        </section>
      </div>
    </ConsolePage>
  );
}
