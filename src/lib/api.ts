import {
  asBoolean,
  asNumber,
  asString,
  asStringArray,
  isRecord,
  pick,
  unwrapData,
} from "@/lib/utils";
import type {
  ApiErrorShape,
  BedrockInfo,
  ConnectionState,
  CostInfo,
  CreateJobResponse,
  DecisionSource,
  HealthInfo,
  Job,
  JobStatus,
  LogLine,
  QemuInfo,
  RuntimeKind,
  ScannerFindings,
  StageInfo,
  StageState,
  Verdict,
} from "@/lib/types";
import { AWS_REGION } from "@/lib/constants";

export class ApiError extends Error {
  readonly shape: ApiErrorShape;
  constructor(shape: ApiErrorShape) {
    super(shape.detail);
    this.name = "ApiError";
    this.shape = shape;
  }
}

export function getApiBase(): string | null {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().replace(/\/+$/, "");
  return trimmed || null;
}

export function getConnectionState(opts: {
  lastSuccess?: boolean;
  lastFailure?: boolean;
}): ConnectionState {
  if (!getApiBase()) return "unconfigured";
  if (opts.lastFailure && !opts.lastSuccess) return "unavailable";
  if (opts.lastSuccess) return "connected";
  return "unavailable";
}

async function request(path: string, init?: RequestInit): Promise<unknown> {
  const base = getApiBase();
  if (!base) {
    throw new ApiError({
      title: "ArchPilot control plane is temporarily unavailable.",
      detail:
        "VITE_API_BASE_URL is not configured. The dashboard cannot reach the deployment API.",
      retryable: false,
    });
  }

  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        accept: "application/json",
        ...(init?.body ? { "content-type": "application/json" } : {}),
        ...init?.headers,
      },
    });
  } catch (err) {
    throw new ApiError({
      title: "ArchPilot control plane is temporarily unavailable.",
      detail: err instanceof Error ? err.message : "Network request failed.",
      retryable: true,
    });
  }

  const text = await response.text();
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = { message: text };
    }
  }

  if (!response.ok) {
    const record = isRecord(json) ? json : {};
    const message =
      asString(record.message) ??
      asString(record.error) ??
      asString(record.detail) ??
      `Request failed with ${response.status}`;
    throw new ApiError({
      title: mapHttpTitle(response.status, message),
      detail: message,
      status: response.status,
      retryable: response.status >= 500 || response.status === 429,
    });
  }

  return json;
}

function mapHttpTitle(status: number, message: string): string {
  const lower = message.toLowerCase();
  if (status === 404) return "Deployment not found.";
  if (status === 400 && lower.includes("repo")) {
    return "Repository could not be analyzed.";
  }
  if (lower.includes("build")) return "Container build failed.";
  if (lower.includes("qemu")) return "QEMU runtime validation failed.";
  if (lower.includes("health") || lower.includes("deploy")) {
    return "Deployment did not become healthy.";
  }
  if (status >= 500) return "ArchPilot control plane is temporarily unavailable.";
  return "Request failed.";
}

export async function createJob(repoUrl: string): Promise<CreateJobResponse> {
  const json = await request("/jobs", {
    method: "POST",
    body: JSON.stringify({
      repoUrl,
      repositoryUrl: repoUrl,
      repository: repoUrl,
      githubUrl: repoUrl,
      region: AWS_REGION,
    }),
  });
  const data = unwrapData(json) ?? (isRecord(json) ? json : {});
  const jobId =
    asString(pick(data, "jobId", "job_id", "id")) ??
    (isRecord(data.job) ? asString(pick(data.job, "jobId", "job_id", "id")) : undefined);
  if (!jobId) {
    throw new ApiError({
      title: "Deployment could not be created.",
      detail: "The API did not return a jobId.",
      retryable: true,
    });
  }
  return { jobId, raw: data };
}

export async function fetchJob(jobId: string): Promise<Job> {
  const json = await request(`/jobs/${encodeURIComponent(jobId)}`);
  return normalizeJob(json, jobId);
}

export async function fetchJobs(): Promise<Job[]> {
  try {
    const json = await request("/jobs");
    const list = extractJobList(json);
    return list.map((item, i) => normalizeJob(item, asString(isRecord(item) ? item.jobId : undefined) ?? `unknown-${i}`));
  } catch (err) {
    if (err instanceof ApiError && err.shape.status === 404) return [];
    throw err;
  }
}

export async function probeConnection(): Promise<ConnectionState> {
  if (!getApiBase()) return "unconfigured";
  try {
    await request("/jobs");
    return "connected";
  } catch (err) {
    if (err instanceof ApiError && (err.shape.status === 404 || err.shape.status === 405)) {
      return "connected";
    }
    try {
      await request("/health");
      return "connected";
    } catch {
      return "unavailable";
    }
  }
}

function extractJobList(json: unknown): unknown[] {
  if (Array.isArray(json)) return json;
  if (!isRecord(json)) return [];
  for (const key of ["jobs", "items", "data", "results"]) {
    const v = json[key];
    if (Array.isArray(v)) return v;
    if (isRecord(v) && Array.isArray(v.jobs)) return v.jobs;
  }
  return [];
}

export function normalizeJob(raw: unknown, fallbackId: string): Job {
  const data = unwrapData(raw) ?? (isRecord(raw) ? raw : {});
  const nested = isRecord(data.architecture)
    ? data.architecture
    : isRecord(data.decision)
      ? data.decision
      : {};

  const jobId =
    asString(pick(data, "jobId", "job_id", "id")) ?? fallbackId;

  const status = normalizeStatus(
    asString(pick(data, "status", "state", "jobStatus", "job_status")),
  );

  const verdict = normalizeVerdict(
    asString(pick(data, "verdict", "architectureVerdict", "architecture_verdict")) ??
      asString(pick(nested, "verdict")),
  );

  const decisionSource = normalizeDecisionSource(
    asString(pick(data, "decisionSource", "decision_source", "source")) ??
      asString(pick(nested, "source", "decisionSource")),
  );

  const runtimeMode = asString(
    pick(data, "runtimeMode", "runtime_mode", "runtime") ?? pick(nested, "runtimeMode", "runtime"),
  );
  const recommendedRuntime = asString(
    pick(data, "recommendedRuntime", "recommended_runtime") ?? pick(nested, "recommendedRuntime"),
  );
  const executionArchitecture = asString(
    pick(data, "executionArchitecture", "execution_architecture", "hostArchitecture", "host_architecture"),
  );
  const containerArchitecture = asString(
    pick(
      data,
      "containerArchitecture",
      "container_architecture",
      "imageArchitecture",
      "image_architecture",
    ),
  );
  const hostArchitecture = asString(
    pick(data, "hostArchitecture", "host_architecture") ?? executionArchitecture,
  );

  const liveUrl = asString(
    pick(data, "live_url", "liveUrl", "url", "applicationUrl", "application_url"),
  );

  const fallback = detectFallback(data, runtimeMode, recommendedRuntime);
  const runtimeKind = inferRuntimeKind({
    verdict,
    runtimeMode,
    recommendedRuntime,
    fallback,
    containerArchitecture,
    hostArchitecture,
  });

  return {
    jobId,
    status,
    stage: asString(pick(data, "stage", "currentStage", "current_stage")),
    verdict,
    confidence: asNumber(pick(data, "confidence", "confidenceScore", "confidence_score")),
    decisionSource,
    recommendedRuntime,
    executionArchitecture,
    runtimeMode,
    targetPlatform: asString(pick(data, "targetPlatform", "target_platform", "platform")),
    buildStatus: asString(pick(data, "buildStatus", "build_status")),
    liveUrl,
    reportKey: asString(pick(data, "reportKey", "report_key")),
    repository: asString(
      pick(data, "repository", "repoUrl", "repo_url", "githubUrl", "github_url", "url"),
    ),
    region: asString(pick(data, "region")) ?? AWS_REGION,
    createdAt: asString(pick(data, "createdAt", "created_at")),
    updatedAt: asString(pick(data, "updatedAt", "updated_at")),
    startedAt: asString(pick(data, "startedAt", "started_at")),
    completedAt: asString(pick(data, "completedAt", "completed_at")),
    durationMs: asNumber(pick(data, "durationMs", "duration_ms", "duration")),
    message: asString(pick(data, "message", "statusMessage", "status_message")),
    error: asString(pick(data, "error", "errorMessage", "error_message", "failureReason", "failure_reason")),
    errorCode: asString(pick(data, "errorCode", "error_code")),
    logs: normalizeLogs(pick(data, "logs", "buildLogs", "build_logs", "events")),
    stages: normalizeStages(pick(data, "stages", "steps", "pipeline")),
    scanner: normalizeScanner(pick(data, "scanner", "scan", "findings", "scannerFindings")),
    bedrock: normalizeBedrock(data),
    cost: normalizeCost(pick(data, "cost", "costEstimate", "cost_estimate", "pricing")),
    qemu: normalizeQemu(data, runtimeKind),
    health: normalizeHealth(data, liveUrl),
    resources: normalizeResources(pick(data, "resources", "aws", "awsResources", "aws_resources")),
    containerArchitecture,
    hostArchitecture,
    instanceType: asString(pick(data, "instanceType", "instance_type", "instance")),
    imageUri: asString(pick(data, "imageUri", "image_uri", "ecrImage", "ecr_image", "image")),
    fallback,
    runtimeKind,
    raw: data,
  };
}

function normalizeStatus(value: string | undefined): JobStatus | string {
  if (!value) return "QUEUED";
  const v = value.toUpperCase().replace(/[\s-]/g, "_");
  const aliases: Record<string, JobStatus> = {
    PENDING: "QUEUED",
    QUEUED: "QUEUED",
    SCANNING: "ANALYZING",
    ANALYZE: "ANALYZING",
    ANALYZING: "ANALYZING",
    ANALYSIS: "ANALYZING",
    AI: "AI_ANALYSIS",
    AI_ANALYSIS: "AI_ANALYSIS",
    BEDROCK: "AI_ANALYSIS",
    REASONING: "AI_ANALYSIS",
    DECIDED: "DECIDED",
    DECISION: "DECIDED",
    BUILD: "BUILDING",
    BUILDING: "BUILDING",
    DEPLOY: "DEPLOYING",
    DEPLOYING: "DEPLOYING",
    VALIDATE: "VALIDATING",
    VALIDATING: "VALIDATING",
    VALIDATION: "VALIDATING",
    REPORT: "REPORTING",
    REPORTING: "REPORTING",
    COMPLETE: "COMPLETED",
    COMPLETED: "COMPLETED",
    SUCCEEDED: "COMPLETED",
    SUCCESS: "COMPLETED",
    FAILED: "FAILED",
    ERROR: "FAILED",
    FAILURE: "FAILED",
  };
  return aliases[v] ?? v;
}

function normalizeVerdict(value: string | undefined): Verdict {
  if (!value) return "unknown";
  const v = value.toLowerCase().replace(/[\s-]/g, "_");
  if (v.includes("native") && v.includes("arm")) return "native_arm64";
  if (v.includes("arm64") && !v.includes("x86") && !v.includes("amd")) return "native_arm64";
  if (v.includes("x86") || v.includes("amd64")) return "x86_required";
  if (v.includes("ambiguous") || v.includes("unknown")) return "ambiguous";
  if (v === "native_arm64") return "native_arm64";
  if (v === "x86_required") return "x86_required";
  return "unknown";
}

function normalizeDecisionSource(value: string | undefined): DecisionSource {
  if (!value) return "unknown";
  const v = value.toLowerCase();
  if (v.includes("determin")) return "deterministic";
  if (v.includes("bedrock") || v.includes("ai") || v.includes("llm")) return "bedrock";
  if (v.includes("policy")) return "policy";
  return "unknown";
}

function detectFallback(
  data: Record<string, unknown>,
  runtimeMode?: string,
  recommendedRuntime?: string,
): boolean {
  const explicit = asBoolean(
    pick(data, "fallback", "fellBack", "fell_back", "usedFallback", "used_fallback"),
  );
  if (explicit === true) return true;
  const blob = `${runtimeMode ?? ""} ${recommendedRuntime ?? ""}`.toUpperCase();
  if (blob.includes("FALLBACK")) return true;
  if (blob.includes("FARGATE") && (blob.includes("X86") || blob.includes("AMD64"))) return true;
  return false;
}

function inferRuntimeKind(input: {
  verdict: Verdict;
  runtimeMode?: string;
  recommendedRuntime?: string;
  fallback: boolean;
  containerArchitecture?: string;
  hostArchitecture?: string;
}): RuntimeKind {
  const blob = `${input.runtimeMode ?? ""} ${input.recommendedRuntime ?? ""}`.toUpperCase();
  if (input.fallback || blob.includes("FALLBACK")) return "fallback_x86";
  if (blob.includes("QEMU") || blob.includes("BINFMT")) return "qemu";
  if (blob.includes("FARGATE") && (blob.includes("X86") || blob.includes("AMD64"))) {
    return "fallback_x86";
  }
  if (blob.includes("FARGATE") && blob.includes("ARM")) return "native_arm";
  if (input.verdict === "native_arm64") return "native_arm";
  const container = (input.containerArchitecture ?? "").toUpperCase();
  const host = (input.hostArchitecture ?? "").toUpperCase();
  if ((container.includes("AMD") || container.includes("X86")) && host.includes("ARM")) {
    return "qemu";
  }
  if (input.verdict === "x86_required" && blob.includes("FARGATE")) return "fallback_x86";
  return "unknown";
}

function normalizeLogs(value: unknown): LogLine[] {
  if (!value) return [];
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((message) => ({ message }));
  }
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return { message: item };
      if (!isRecord(item)) return null;
      const message =
        asString(pick(item, "message", "msg", "text", "line", "log")) ?? JSON.stringify(item);
      return {
        timestamp: asString(pick(item, "timestamp", "time", "ts", "at")),
        message,
        level: normalizeLogLevel(asString(pick(item, "level", "severity"))),
      } satisfies LogLine;
    })
    .filter((v): v is LogLine => Boolean(v));
}

function normalizeLogLevel(value: string | undefined): LogLine["level"] {
  if (!value) return "info";
  const v = value.toLowerCase();
  if (v.includes("err")) return "error";
  if (v.includes("warn")) return "warn";
  if (v.includes("debug")) return "debug";
  return "info";
}

function normalizeStages(value: unknown): StageInfo[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const stages: StageInfo[] = [];
  value.forEach((item, index) => {
    if (!isRecord(item)) return;
    const id = asString(pick(item, "id", "key", "name", "stage")) ?? `stage-${index}`;
    const stage: StageInfo = {
      id,
      title: asString(pick(item, "title", "name", "label")) ?? id,
      description: asString(pick(item, "description", "detail", "summary")) ?? "",
      state: normalizeStageState(asString(pick(item, "state", "status"))),
    };
    const durationMs = asNumber(pick(item, "durationMs", "duration_ms", "duration"));
    const detail = asString(pick(item, "detail", "output", "message"));
    const startedAt = asString(pick(item, "startedAt", "started_at"));
    const completedAt = asString(pick(item, "completedAt", "completed_at"));
    if (durationMs !== undefined) stage.durationMs = durationMs;
    if (detail) stage.detail = detail;
    if (startedAt) stage.startedAt = startedAt;
    if (completedAt) stage.completedAt = completedAt;
    stages.push(stage);
  });
  return stages.length ? stages : undefined;
}

function normalizeStageState(value: string | undefined): StageState {
  if (!value) return "QUEUED";
  const v = value.toUpperCase();
  if (v.includes("SKIP")) return "SKIPPED";
  if (v.includes("WARN")) return "WARNING";
  if (v.includes("FAIL") || v.includes("ERROR")) return "FAILED";
  if (v.includes("RUN") || v.includes("PROGRESS") || v.includes("ACTIVE")) return "RUNNING";
  if (v.includes("COMPLETE") || v.includes("SUCCESS") || v.includes("DONE") || v.includes("SUCCEEDED")) {
    return "COMPLETED";
  }
  if (v.includes("QUEUE") || v.includes("PEND") || v.includes("WAIT")) return "QUEUED";
  return "QUEUED";
}

function normalizeScanner(value: unknown): ScannerFindings | undefined {
  if (!isRecord(value)) return undefined;
  return {
    verdict: asString(pick(value, "verdict", "result")),
    armCompatible: asBoolean(pick(value, "armCompatible", "arm_compatible", "nativeArm")),
    x86Required: asBoolean(pick(value, "x86Required", "x86_required")),
    evidence: asStringArray(pick(value, "evidence", "findings", "signals")),
    nativeDependencies: asStringArray(
      pick(value, "nativeDependencies", "native_dependencies", "dependencies"),
    ),
    notes: asStringArray(pick(value, "notes", "warnings")),
  };
}

function normalizeBedrock(data: Record<string, unknown>): BedrockInfo | undefined {
  const raw = pick(data, "bedrock", "ai", "reasoning", "aiReasoning", "ai_reasoning");
  const invokedExplicit = asBoolean(
    isRecord(raw) ? pick(raw, "invoked", "used", "called") : undefined,
  );
  if (!isRecord(raw) && invokedExplicit !== true) {
    const source = asString(pick(data, "decisionSource", "decision_source"));
    if (source && source.toLowerCase().includes("bedrock")) {
      return {
        invoked: true,
        confidence: asNumber(pick(data, "confidence")),
        recommendation: asString(pick(data, "recommendation", "recommendedRuntime", "recommended_runtime")),
        explanation: asString(pick(data, "explanation", "reason", "reasoning")),
        evidence: asStringArray(pick(data, "evidence")),
        risks: asStringArray(pick(data, "risks")),
      };
    }
    return undefined;
  }
  const obj = isRecord(raw) ? raw : {};
  const explanation = asString(
    pick(obj, "explanation", "reason", "reasoning", "summary", "text") ??
      pick(data, "explanation"),
  );
  const recommendation = asString(
    pick(obj, "recommendation", "recommendedRuntime", "recommended_runtime"),
  );
  const invoked = invokedExplicit ?? Boolean(explanation || recommendation);
  if (!invoked) return { invoked: false, evidence: [], risks: [] };
  return {
    invoked,
    model: asString(pick(obj, "model", "modelId", "model_id")),
    confidence: asNumber(pick(obj, "confidence") ?? pick(data, "confidence")),
    recommendation,
    explanation,
    evidence: asStringArray(pick(obj, "evidence", "signals") ?? pick(data, "evidence")),
    risks: asStringArray(pick(obj, "risks") ?? pick(data, "risks")),
  };
}

function normalizeCost(value: unknown): CostInfo | undefined {
  if (!isRecord(value)) return undefined;
  const actual = asNumber(
    pick(value, "actualMonthly", "actual_monthly", "gravitonMonthly", "monthly", "actual"),
  );
  const comparison = asNumber(
    pick(value, "comparisonMonthly", "comparison_monthly", "x86Monthly", "x86_monthly", "comparison"),
  );
  let difference = asNumber(
    pick(value, "differenceMonthly", "difference_monthly", "savings", "delta"),
  );
  let percent = asNumber(
    pick(value, "differencePercent", "difference_percent", "percent", "savingsPercent"),
  );
  if (difference === undefined && actual !== undefined && comparison !== undefined) {
    difference = comparison - actual;
  }
  if (percent === undefined && difference !== undefined && comparison) {
    percent = (difference / comparison) * 100;
  }
  return {
    actualMonthly: actual,
    comparisonMonthly: comparison,
    differenceMonthly: difference,
    differencePercent: percent,
    actualLabel: asString(pick(value, "actualLabel", "actual_label", "runtimeLabel")),
    comparisonLabel: asString(pick(value, "comparisonLabel", "comparison_label")),
    vcpu: asNumber(pick(value, "vcpu", "vCpu", "cpu")),
    memoryGb: asNumber(pick(value, "memoryGb", "memory_gb", "memory")),
    hoursPerMonth: asNumber(pick(value, "hoursPerMonth", "hours_per_month", "hours")),
    cpuPrice: asNumber(pick(value, "cpuPrice", "cpu_price")),
    memoryPrice: asNumber(pick(value, "memoryPrice", "memory_price")),
    currency: asString(pick(value, "currency")) ?? "USD",
    disclaimer: asString(pick(value, "disclaimer")),
  };
}

function normalizeQemu(data: Record<string, unknown>, runtimeKind: RuntimeKind): QemuInfo | undefined {
  const raw = pick(data, "qemu", "emulation", "runtimeValidation", "runtime_validation");
  const obj = isRecord(raw) ? raw : {};
  const present =
    runtimeKind === "qemu" ||
    Boolean(
      asString(pick(obj, "status")) ||
        asBoolean(pick(obj, "used", "enabled", "present")),
    );
  if (!present) return undefined;
  const statusRaw = asString(pick(obj, "status", "validation", "result")) ??
    asString(pick(data, "qemuStatus", "qemu_status"));
  const status = normalizeQemuStatus(statusRaw);
  return {
    present: true,
    status,
    containerArchitecture: asString(
      pick(obj, "containerArchitecture", "container_architecture") ??
        pick(data, "containerArchitecture", "container_architecture"),
    ),
    hostArchitecture: asString(
      pick(obj, "hostArchitecture", "host_architecture") ??
        pick(data, "hostArchitecture", "host_architecture"),
    ),
    host: asString(pick(obj, "host") ?? pick(data, "host")),
    instance: asString(pick(obj, "instance", "instanceType", "instance_type")),
    emulation: asString(pick(obj, "emulation")) ?? "QEMU/binfmt",
    message: asString(pick(obj, "message", "detail")),
  };
}

function normalizeQemuStatus(value: string | undefined): QemuInfo["status"] {
  if (!value) return "PENDING";
  const v = value.toUpperCase();
  if (v.includes("FAIL") || v.includes("ERROR")) return "FAILED";
  if (v.includes("VALID") || v.includes("SUCCESS") || v.includes("PASS") || v.includes("OK")) {
    return "VALIDATED";
  }
  if (v.includes("RUN") || v.includes("PROGRESS")) return "RUNNING";
  return "PENDING";
}

function normalizeHealth(data: Record<string, unknown>, liveUrl?: string): HealthInfo | undefined {
  const raw = pick(data, "health", "healthCheck", "health_check");
  const obj = isRecord(raw) ? raw : {};
  const status = asString(pick(obj, "status", "state") ?? pick(data, "healthStatus", "health_status"));
  const healthy = asBoolean(pick(obj, "healthy")) ??
    (status ? /healthy|ok|live|success/i.test(status) : undefined);
  const url = asString(pick(obj, "url", "liveUrl", "live_url")) ?? liveUrl;
  if (!status && healthy === undefined && !url) return undefined;
  return {
    status,
    healthy,
    liveUrl: url,
    checkedAt: asString(pick(obj, "checkedAt", "checked_at")),
  };
}

function normalizeResources(value: unknown): Job["resources"] {
  if (!isRecord(value)) return undefined;
  return {
    cluster: asString(pick(value, "cluster", "ecsCluster", "ecs_cluster")),
    service: asString(pick(value, "service", "ecsService", "ecs_service")),
    taskDefinition: asString(pick(value, "taskDefinition", "task_definition")),
    instanceId: asString(pick(value, "instanceId", "instance_id")),
    ecrImage: asString(pick(value, "ecrImage", "ecr_image", "imageUri", "image_uri")),
    logGroup: asString(pick(value, "logGroup", "log_group")),
    bucket: asString(pick(value, "bucket", "s3", "reportBucket")),
    table: asString(pick(value, "table", "dynamoTable", "dynamodb")),
  };
}
