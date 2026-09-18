import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$")({
  component: NotFound,
});

function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background px-6 text-center">
      <p className="font-mono text-xs text-subtle">404</p>
      <h1 className="text-lg font-medium tracking-tight">This path is not in the control plane.</h1>
      <Button asChild variant="secondary">
        <Link to="/">Back to ArchPilot</Link>
      </Button>
    </main>
  );
}
