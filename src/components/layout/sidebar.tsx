import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Boxes,
  Cpu,
  FileText,
  LayoutGrid,
  Settings,
  Signal,
} from "lucide-react";
import { ArchPilotLogo } from "@/components/brand/logo";
import { AWS_REGION, AWS_REGION_LABEL } from "@/lib/constants";
import { getApiBase } from "@/lib/api";
import type { ConnectionState } from "@/lib/types";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/overview", label: "Overview", icon: LayoutGrid },
  { to: "/deployments", label: "Deployments", icon: Activity },
  { to: "/projects", label: "Projects", icon: Boxes },
  { to: "/analysis", label: "Architecture Analysis", icon: Cpu },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar({
  connection,
  onNavigate,
}: {
  connection: ConnectionState;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const api = getApiBase();

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-14 items-center px-4 shadow-[inset_0_-1px_0_0_var(--color-border)]">
        <Link to="/" className="rounded-sm" onClick={onNavigate} aria-label="ArchPilot home">
          <ArchPilotLogo />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Console">
        {NAV.map((item) => {
          const active =
            pathname === item.to ||
            (item.to !== "/overview" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex min-h-10 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors duration-150",
                active
                  ? "bg-card-elevated text-foreground shadow-border"
                  : "text-muted hover:bg-card-elevated/60 hover:text-foreground",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 p-3 shadow-[inset_0_1px_0_0_var(--color-border)]">
        <div className="rounded-md bg-background px-3 py-2.5 shadow-border">
          <p className="text-2xs tracking-wide text-subtle uppercase">AWS Region</p>
          <p className="mt-1 font-mono text-xs text-foreground">{AWS_REGION_LABEL}</p>
          <p className="font-mono text-2xs text-muted">{AWS_REGION}</p>
        </div>
        <div className="flex items-center gap-2 px-1">
          <Signal
            className={cn(
              "size-3.5",
              connection === "connected" && "text-success",
              connection === "unavailable" && "text-danger",
              connection === "unconfigured" && "text-warning",
            )}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-xs text-foreground">
              {connection === "connected" && "Control plane connected"}
              {connection === "unavailable" && "Control plane unavailable"}
              {connection === "unconfigured" && "API not configured"}
            </p>
            <p className="truncate font-mono text-2xs text-subtle">
              {api ?? "VITE_API_BASE_URL unset"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-1 pb-1">
          <span
            className="flex size-8 items-center justify-center rounded-md bg-card-elevated font-mono text-2xs text-muted shadow-border"
            aria-hidden="true"
          >
            AP
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs text-foreground">Operator</p>
            <p className="truncate font-mono text-2xs text-subtle">ap-south-1 · console</p>
          </div>
        </div>
      </div>
    </div>
  );
}
