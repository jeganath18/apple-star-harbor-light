import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function asString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
}

export function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

export function asBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    const single = asString(value);
    return single ? [single] : [];
  }
  return value.map(asString).filter((v): v is string => Boolean(v));
}

export function pick<T = unknown>(
  obj: Record<string, unknown>,
  ...keys: string[]
): T | undefined {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key] as T;
    }
  }
  return undefined;
}

export function unwrapData(raw: unknown): Record<string, unknown> | null {
  if (!isRecord(raw)) return null;
  if (isRecord(raw.data)) return raw.data;
  if (isRecord(raw.job)) return raw.job;
  if (isRecord(raw.result)) return raw.result;
  return raw;
}
