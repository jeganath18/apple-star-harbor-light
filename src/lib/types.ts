export type JobStatus =
  | "QUEUED"
  | "ANALYZING"
  | "AI_ANALYSIS"
  | "DECIDED"
  | "BUILDING"
  | "DEPLOYING"
  | "VALIDATING"
  | "REPORTING"
  | "COMPLETED"
  | "FAILED";

export type StageState = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED" | "WARNING" | "SKIPPED";

export type DecisionSource = "deterministic" | "bedrock" | "policy" | "unknown";

export type RuntimeKind = "native_arm" | "qemu" | "fallback_x86" | "unknown";

export type Verdict = "native_arm64" | "x86_required" | "ambiguous" | "unknown";

export interface LogLine {
  timestamp?: string;
  message: string;
  level?: "info" | "warn" | "error" | "debug";
}

export interface StageInfo {
  id: string;
  title: string;
  description: string;
  state: StageState;
  durationMs?: number;
  detail?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface ScannerFindings {
  verdict?: string;
  armCompatible?: boolean;
  x86Required?: boolean;
  evidence: string[]
  nativeDependencies: string[];
  notes: string[];
}

export interface BedrockInfo {
  invoked: boolean;
  model?: string;
  confidence?: number;
  recommendation?: string;
  explanation?: string;
  evidence: string[];
  risks: string[];
}

export interface CostInfo {
  actualMonthly?: number;
  comparisonMonthly?: number;
  differenceMonthly?: number;
  differencePercent?: number;
  actualLabel?: string;
  comparisonLabel?: string;
  vcpu?: number;
  memoryGb?: number;
  hoursPerMonth?: number;
  cpuPrice?: number;
  memoryPrice?: number;
  currency?: string;
  disclaimer?: string;
}

export interface QemuInfo {
  present: boolean;
  status?: "VALIDATED" | "FAILED" | "RUNNING" | "PENDING";
  containerArchitecture?: string;
  hostArchitecture?: string;
  host?: string;
  instance?: string;
  emulation?: string;
  message?: string;
}

export interface HealthInfo {
  status?: string;
  healthy?: boolean;
  liveUrl?: string;
  checkedAt?: string;
}

export interface AwsResources {
  cluster?: string;
  service?: string;
  taskDefinition?: string;
  instanceId?: string;
  ecrImage?: string;
  logGroup?: string;
  bucket?: string;
  table?: string;
}

export interface Job {
  jobId: string;
  status: JobStatus | string;
  stage?: string;
  verdict: Verdict;
  confidence?: number;
  decisionSource: DecisionSource;
  recommendedRuntime?: string;
  executionArchitecture?: string;
  runtimeMode?: string;
  targetPlatform?: string;
  buildStatus?: string;
  liveUrl?: string;
  reportKey?: string;
  repository?: string;
  region?: string;
  createdAt?: string;
  updatedAt?: string;
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
  message?: string;
  error?: string;
  errorCode?: string;
  logs: LogLine[];
  stages?: StageInfo[];
  scanner?: ScannerFindings;
  bedrock?: BedrockInfo;
  cost?: CostInfo;
  qemu?: QemuInfo;
  health?: HealthInfo;
  resources?: AwsResources;
  containerArchitecture?: string;
  hostArchitecture?: string;
  instanceType?: string;
  imageUri?: string;
  fallback: boolean;
  runtimeKind: RuntimeKind;
  raw: Record<string, unknown>;
}

export interface CreateJobResponse {
  jobId: string;
  raw: Record<string, unknown>;
}

export interface ApiErrorShape {
  title: string;
  detail: string;
  status?: number;
  retryable: boolean;
}

export type ConnectionState = "connected" | "unavailable" | "unconfigured";
