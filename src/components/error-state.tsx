import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ErrorState({
  title,
  detail,
  onRetry,
  className,
}: {
  title: string;
  detail?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col gap-3 rounded-lg bg-card px-5 py-5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-danger)_28%,transparent)]",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <CircleAlert className="mt-0.5 size-4 text-danger" aria-hidden="true" />
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          {detail ? (
            <p className="mt-1 font-mono text-xs leading-relaxed text-muted">{detail}</p>
          ) : null}
        </div>
      </div>
      {onRetry ? (
        <div>
          <Button type="button" size="sm" variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        </div>
      ) : null}
    </div>
  );
}
