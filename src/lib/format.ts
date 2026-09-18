import { formatDistanceToNowStrict, parseISO } from "date-fns";

export function formatJobId(id: string | undefined): string {
  if (!id) return "—";
  return id;
}

export function repoDisplay(url: string | undefined): string {
  if (!url) return "unknown repository";
  try {
    const u = new URL(url);
    return u.pathname.replace(/^\//, "").replace(/\.git$/, "").replace(/\/$/, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\.git$/, "");
  }
}

export function formatDuration(ms: number | undefined): string {
  if (ms === undefined || !Number.isFinite(ms) || ms < 0) return "—";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(seconds < 10 ? 1 : 0)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return s ? `${m}m ${s}s` : `${m}m`;
}

export function formatRelative(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    const d = parseISO(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return formatDistanceToNowStrict(d, { addSuffix: true });
  } catch {
    return iso;
  }
}

export function formatTimestamp(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    const d = parseISO(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC");
  } catch {
    return iso;
  }
}

export function formatPercent(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return "—";
  const pct = value <= 1 ? value * 100 : value;
  return `${Math.round(pct)}%`;
}

export function formatUsd(value: number | undefined, digits = 2): string {
  if (value === undefined || !Number.isFinite(value)) return "—";
  return `$${value.toFixed(digits)}`;
}

export function lastUpdatedLabel(updatedAt: number): string {
  const delta = Math.max(0, Math.round((Date.now() - updatedAt) / 1000));
  if (delta <= 1) return "Last updated just now";
  return `Last updated ${delta}s ago`;
}

export function confidenceLabel(value: number | undefined): string {
  return formatPercent(value);
}
