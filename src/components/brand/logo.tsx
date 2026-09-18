import { cn } from "@/lib/utils";

export function ArchPilotMark({ className, title = "ArchPilot" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect x="1.25" y="1.25" width="29.5" height="29.5" rx="7" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8.5 20.5 16 8.5 23.5 20.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M11.4 16.2h9.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16.2" r="1.35" fill="currentColor" />
      <path
        d="M10.2 20.5h11.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function ArchPilotLogo({
  className,
  markClassName,
  wordmark = true,
}: {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      <ArchPilotMark className={markClassName} />
      {wordmark ? (
        <span className="text-sm font-semibold tracking-[-0.04em]">ArchPilot</span>
      ) : null}
    </span>
  );
}
