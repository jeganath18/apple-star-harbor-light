import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Github, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError, createJob } from "@/lib/api";
import { GITHUB_REPO_PATTERN } from "@/lib/constants";
import { trackJob } from "@/lib/jobs-store";
import { cn } from "@/lib/utils";

export function RepositoryInput({
  size = "default",
  className,
  autoFocus,
}: {
  size?: "default" | "hero";
  className?: string;
  autoFocus?: boolean;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const url = value.trim();
    if (!GITHUB_REPO_PATTERN.test(url)) {
      setError("Enter a GitHub repository URL, for example https://github.com/user/project");
      return;
    }
    setError(null);
    setPending(true);
    try {
      const created = await createJob(url);
      trackJob({ jobId: created.jobId, repoUrl: url, createdAt: new Date().toISOString() });
      toast.success("Deployment queued");
      await navigate({ to: "/deployments/$jobId", params: { jobId: created.jobId } });
    } catch (err) {
      const shape = err instanceof ApiError ? err.shape : null;
      setError(
        shape?.detail ??
          (err instanceof Error ? err.message : "The control plane rejected this repository."),
      );
      toast.error(shape?.title ?? "Repository could not be analyzed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          "flex flex-col gap-2 sm:flex-row sm:items-center",
          size === "hero" && "sm:gap-3",
        )}
      >
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">GitHub repository URL</span>
          <Github
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle"
            aria-hidden="true"
          />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://github.com/user/project"
            autoFocus={autoFocus}
            autoComplete="off"
            spellCheck={false}
            className={cn("pl-10", size === "hero" && "h-12 text-sm")}
            aria-invalid={Boolean(error)}
          />
        </label>
        <Button type="submit" size={size === "hero" ? "lg" : "default"} disabled={pending}>
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
          Deploy Repository
        </Button>
      </div>
      {error ? (
        <p className="mt-2 font-mono text-xs text-danger" role="alert">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-subtle">
          ArchPilot clones the repository, scans architecture requirements, then deploys to the runtime
          that actually fits.
        </p>
      )}
    </form>
  );
}
