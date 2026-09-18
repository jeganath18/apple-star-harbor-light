import { useQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getApiBase, probeConnection } from "@/lib/api";

export function AppShell({
  title,
  context,
  status,
  action,
  children,
}: {
  title: string;
  context?: ReactNode;
  status?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const apiConfigured = Boolean(getApiBase());
  const connection = useQuery({
    queryKey: ["connection"],
    queryFn: probeConnection,
    enabled: apiConfigured,
    refetchInterval: 20_000,
    staleTime: 10_000,
  });
  const state = apiConfigured ? (connection.data ?? "unavailable") : "unconfigured";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 shadow-[inset_-1px_0_0_0_var(--color-border)] lg:block">
        <Sidebar connection={state} />
      </aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0">
          <Sidebar connection={state} onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="lg:pl-60">
        <Topbar
          title={title}
          context={context}
          status={status}
          action={action}
          onMenu={() => setOpen(true)}
        />
        <main className="px-4 py-5 lg:px-6 lg:py-6">{children}</main>
      </div>
    </div>
  );
}
