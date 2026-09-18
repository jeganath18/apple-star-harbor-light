import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function Topbar({
  title,
  context,
  status,
  action,
  onMenu,
}: {
  title: string;
  context?: ReactNode;
  status?: ReactNode;
  action?: ReactNode;
  onMenu?: () => void;
}) {
  return (
    <header className="flex min-h-14 flex-wrap items-center gap-3 bg-background/80 px-4 py-2.5 backdrop-blur-sm shadow-[inset_0_-1px_0_0_var(--color-border)] lg:px-6">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu className="size-4" />
      </Button>
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-medium tracking-tight">{title}</h1>
        {context ? <div className="mt-0.5 truncate text-xs text-muted">{context}</div> : null}
      </div>
      <div className="ml-auto flex flex-wrap items-center gap-2">
        {status}
        {action}
      </div>
    </header>
  );
}
