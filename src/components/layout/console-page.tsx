import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

export function ConsolePage({
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
  return (
    <AppShell title={title} context={context} status={status} action={action}>
      {children}
    </AppShell>
  );
}
