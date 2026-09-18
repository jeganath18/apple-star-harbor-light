import type { Job, JobStatus, StageInfo, StageState } from "@/lib/types";

export const PIPELINE_STAGES = [
  {
    id: "analysis",
    title: "Repository Analysis",
    description: "Deterministic scan of the GitHub repository for architecture signals.",
  },
  {
    id: "decision",
    title: "Architecture Decision",
    description: "Scanner evidence combined with Bedrock reasoning when the verdict is ambiguous.",
  },
  {
    id: "build",
    title: "Container Build",
    description: "Build and push the image for the selected target platform.",
  },
  {
    id: "deploy",
    title: "Deployment",
    description: "Place the workload on Fargate or a Graviton host according to policy.",
  },
  {
    id: "validate",
    title: "Runtime Validation",
    description: "Confirm the process is actually runnable on the chosen host architecture.",
  },
  {
    id: "health",
    title: "Health Check",
    description: "Probe the live endpoint until the service reports healthy — or it does not.",
  },
  {
    id: "report",
    title: "Report Generation",
    description: "Assemble the explainable deployment report and cost comparison.",
  },
] as const;

const STATUS_INDEX: Record<string, number> = {
  QUEUED: 0,
  ANALYZING: 0,
  ANALYSIS: 0,
  ANALYZE: 0,
  SCAN: 0,
  SCANNING: 0,
  AI_ANALYSIS: 1,
  DECIDED: 1,
  DECISION: 1,
  BUILDING: 2,
  BUILD: 2,
  DEPLOYING: 3,
  DEPLOY: 3,
  DEPLOYMENT: 3,
  VALIDATING: 4,
  VALIDATE: 4,
  VALIDATION: 4,
  HEALTH: 5,
  HEALTH_CHECK: 5,
  REPORTING: 6,
  REPORT: 6,
  COMPLETED: 7,
  FAILED: -1,
};

export function isTerminal(status: string | undefined): boolean {
  const s = (status ?? "").toUpperCase();
  return s === "COMPLETED" || s === "FAILED";
}

export function statusTone(status: string | undefined): "success" | "warning" | "danger" | "infra" | "muted" {
  const s = (status ?? "").toUpperCase();
  if (s === "COMPLETED") return "success";
  if (s === "FAILED") return "danger";
  if (s.includes("VALIDAT") || s.includes("FALLBACK")) return "warning";
  if (s === "QUEUED") return "muted";
  return "infra";
}

export function deriveStages(job: Job): StageInfo[] {
  if (job.stages && job.stages.length > 0) {
    return job.stages;
  }

  const status = String(job.status).toUpperCase() as JobStatus | string;
  const failed = status === "FAILED";
  const complete = status === "COMPLETED";
  const current =
    failed
      ? resolveFailedIndex(job)
      : (STATUS_INDEX[status] ?? 0);
  const skipAi = job.decisionSource === "deterministic" && status !== "AI_ANALYSIS";
  const skipQemu = job.runtimeKind === "native_arm";

  return PIPELINE_STAGES.map((meta, index) => {
    let state: StageState = "QUEUED";
    let detail: string | undefined;

    if (complete) {
      state = "COMPLETED";
    } else if (failed) {
      if (index < current) state = "COMPLETED";
      else if (index === current) state = "FAILED";
      else state = "QUEUED";
    } else if (status === "QUEUED" && index === 0) {
      state = "QUEUED";
    } else if (index < current) {
      state = "COMPLETED";
    } else if (index === current) {
      state = status === "QUEUED" ? "QUEUED" : "RUNNING";
    }

    if (meta.id === "decision" && skipAi && (state === "COMPLETED" || complete)) {
      detail = "Deterministic scanner produced a confident verdict. Amazon Bedrock was not invoked.";
    }
    if (meta.id === "validate" && skipQemu && (state === "COMPLETED" || complete || index < current)) {
      state = state === "QUEUED" ? "QUEUED" : "SKIPPED";
      detail = "Native ARM64 path — QEMU/binfmt validation is not required.";
    }
    if (meta.id === "validate" && job.runtimeKind === "fallback_x86") {
      if (complete) {
        state = "WARNING";
        detail = "QEMU runtime validation failed. Policy switched execution to ECS Fargate X86_64.";
      }
    }
    if (meta.id === "decision" && job.decisionSource === "bedrock") {
      detail = "Amazon Bedrock reasoned over ambiguous scanner evidence.";
    }
    if (failed && index === current) {
      detail = job.error ?? job.message ?? "Stage failed.";
    }

    return {
      id: meta.id,
      title: meta.title,
      description: meta.description,
      state,
      detail,
    };
  });
}

function resolveFailedIndex(job: Job): number {
  const stage = String(job.stage ?? "").toUpperCase().replace(/[\s-]/g, "_");
  if (stage && STATUS_INDEX[stage] !== undefined && STATUS_INDEX[stage] >= 0) {
    return STATUS_INDEX[stage];
  }
  const blob = `${job.error ?? ""} ${job.buildStatus ?? ""} ${job.message ?? ""}`.toLowerCase();
  if (blob.includes("report")) return 6;
  if (blob.includes("health")) return 5;
  if (blob.includes("qemu") || blob.includes("valid")) return 4;
  if (blob.includes("deploy")) return 3;
  if (blob.includes("build")) return 2;
  if (blob.includes("bedrock") || blob.includes("decision")) return 1;
  return 0;
}

export function architecturePath(job: Job): { nodes: string[]; caption: string } {
  if (job.runtimeKind === "native_arm") {
    return {
      nodes: ["ARM64 Container", "ARM64 Fargate", "Healthy Runtime", "Live Application"],
      caption: "Native ARM64 path — no emulation.",
    };
  }
  if (job.runtimeKind === "qemu") {
    return {
      nodes: [
        "AMD64 Container",
        "ARM64 Graviton",
        "QEMU/binfmt",
        job.qemu?.status === "FAILED" ? "Validation failed" : "Healthy Runtime",
        "Live Application",
      ],
      caption: "AMD64 image preserved and executed on Graviton through QEMU/binfmt.",
    };
  }
  if (job.runtimeKind === "fallback_x86") {
    return {
      nodes: [
        "AMD64 Container",
        "ARM64 Graviton",
        "QEMU/binfmt",
        "Validation failed",
        "ECS Fargate X86_64",
        "Live Application",
      ],
      caption: "QEMU was not viable. Policy fell back to native X86 infrastructure.",
    };
  }
  return {
    nodes: ["Repository", "Architecture Decision", "Build", "Runtime"],
    caption: "Awaiting architecture decision from the control plane.",
  };
}

export function errorCopy(job: Job): { title: string; detail: string } | null {
  const blob = `${job.error ?? ""} ${job.message ?? ""} ${job.buildStatus ?? ""}`.toLowerCase();
  if (job.status !== "FAILED" && !job.error) return null;
  if (blob.includes("qemu")) {
    return {
      title: "QEMU runtime validation failed.",
      detail: job.error ?? "The AMD64 image could not be validated on the Graviton host.",
    };
  }
  if (blob.includes("build")) {
    return {
      title: "Container build failed.",
      detail: job.error ?? "The image build did not complete successfully.",
    };
  }
  if (blob.includes("health") || blob.includes("unhealthy")) {
    return {
      title: "Deployment did not become healthy.",
      detail: job.error ?? "The runtime started but failed health checks.",
    };
  }
  if (blob.includes("repo") || blob.includes("github") || blob.includes("analy")) {
    return {
      title: "Repository could not be analyzed.",
      detail: job.error ?? "ArchPilot could not clone or scan this repository.",
    };
  }
  if (job.status === "FAILED") {
    return {
      title: "Deployment did not become healthy.",
      detail: job.error ?? job.message ?? "The job failed before a live runtime was established.",
    };
  }
  return null;
}
