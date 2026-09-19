

export type StageState = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED" | "WARNING" | "SKIPPED";


export type RuntimeKind = "native_arm" | "qemu" | "fallback_x86" | "unknown";


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
  | "FAILED"
  | string;

export type Verdict =
  | "native_arm64"
  | "x86_required"
  | "ambiguous"
  | "unsupported"
  | string;

export type DecisionSource =
  | "deterministic"
  | "bedrock"
  | string;

export type RuntimeMode =
  | "FARGATE"
  | "QEMU"
  | string;


export interface Job {
  jobId: string;

  liveUrl?: string;
  live_url?: string;

  qemuStatus?: string;

  repoUrl?: string;
  reportKey?: string;
  runtimeMode?: string;
  scanKey?: string;

  stage?: string;
  status?: string;

  targetPlatform?: string;

  validationCommandId?: string;
  validationStatus?: string;

  verdict?: string;

  report?: {
    jobId: string;
    generatedAt: string;
    repository: string;

    decision: {
      verdict: string;
      confidence: number;
      source: string;
    };

    scanner: {
      verdict: string;
      confidence: number;
      scannerVersion: string;

      docker: {
        exists: boolean;

        baseImages: Array<{
          image: string;
          explicitPlatform?: string;
          arm64Support: boolean;
          message: string;
        }>;

        unknownBaseImage: boolean;
        containerPort: number;
      };

      dependencies: {
        ecosystems: string[];
        nativeAddons: string[];
        knownX86Only: string[];
      };

      nativeBinaries: Array<Record<string, unknown>>;

      architectureReferences: string[];

      findings: Array<{
        type: string;
        severity: string;
        evidence?: string;
        message: string;
      }>;

      summary: {
        nativeArm64: number;
        ambiguous: number;
        hardFailures: number;
      };
    };

    build: {
      status?: string;
      buildId?: string;
      imageUri?: string;
      platform?: string;
    };

    deployment: {
      status?: string;
      architecture?: string;
      containerPort?: number;
      live_url?: string;
      runtimeMode?: string;
    };

    costComparison: {
      model?: string;
      basis?: string;

      runtime?: string;

      hostArchitecture?: string;
      containerArchitecture?: string;

      instanceType?: string;
      comparisonInstanceType?: string;

      vcpus?: number;
      memoryGb?: number;
      hoursPerMonth?: number;

      arm64HourlyUsd?: number;
      x86HourlyUsd?: number;

      arm64MonthlyUsd?: number;
      x86MonthlyUsd?: number;

      estimatedSavingsUsd?: number;
      estimatedSavingsPercent?: number;

      pricingSource?: string;

      excludes?: string[];
    };

    summary: string;
  };
}



export interface DeploymentReport {
  jobId: string;

  generatedAt: string;

  repository: string;

  decision: Decision;

  scanner: ScannerReport;

  build: BuildInfo;

  deployment: DeploymentInfo;

  costComparison: CostComparison;

  summary: string;
}

export interface Decision {
  verdict: Verdict;

  confidence: number;

  source: DecisionSource;
}

export interface ScannerReport {
  verdict: Verdict;

  confidence: number;

  scannerVersion: string;

  docker: DockerInfo;

  dependencies: DependencyInfo;

  nativeBinaries: NativeBinary[];

  architectureReferences: string[];

  findings: ScannerFinding[];

  summary: ScannerSummary;
}

export interface DockerInfo {
  exists: boolean;

  baseImages: BaseImage[];

  unknownBaseImage: boolean;

  containerPort: number;
}

export interface BaseImage {
  image: string;

  explicitPlatform?: string;

  arm64Support: boolean;

  message: string;
}

export interface DependencyInfo {
  ecosystems: string[];

  nativeAddons: string[];

  knownX86Only: string[];
}

export interface NativeBinary {
  path?: string;

  architecture?: string;

  severity?: string;

  message?: string;

  [key: string]: unknown;
}

export interface ScannerFinding {
  type: string;

  severity: "hard" | "ambiguous" | "compatible" | string;

  evidence?: string;

  message: string;
}

export interface ScannerSummary {
  nativeArm64: number;

  ambiguous: number;

  hardFailures: number;
}

export interface BuildInfo {
  status?: string;

  buildId?: string;

  imageUri?: string;

  platform?: string;
}

export interface DeploymentInfo {
  status?: string;

  architecture?: string;

  containerPort?: number;

  live_url?: string;

  runtimeMode?: RuntimeMode;
}

export interface CostComparison {
  model?: string;

  basis?: string;

  runtime?: string;

  hostArchitecture?: string;

  containerArchitecture?: string;

  instanceType?: string;

  comparisonInstanceType?: string;

  vcpus?: number;

  memoryGb?: number;

  hoursPerMonth?: number;

  arm64HourlyUsd?: number;

  x86HourlyUsd?: number;

  arm64MonthlyUsd?: number;

  x86MonthlyUsd?: number;

  estimatedSavingsUsd?: number;

  estimatedSavingsPercent?: number;

  pricingSource?: string;

  excludes?: string[];
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
