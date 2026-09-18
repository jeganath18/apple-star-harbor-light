import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Activity, a as Settings, d as LayoutGrid, g as FileText, l as Menu, r as Signal, t as X, v as Cpu, w as Boxes } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as unwrapData, d as asNumber, f as asString, g as pick, h as isRecord, i as AWS_REGION, l as Button, m as cn, o as AWS_REGION_LABEL, p as asStringArray, u as asBoolean } from "./router-Bg95u4OA.mjs";
import { t as ArchPilotLogo } from "./logo-BLEkoGMu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-CQ71g6o4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ApiError = class extends Error {
	shape;
	constructor(shape) {
		super(shape.detail);
		this.name = "ApiError";
		this.shape = shape;
	}
};
function getApiBase() {
	return null;
}
async function request(path, init) {
	const base = getApiBase();
	if (!base) throw new ApiError({
		title: "ArchPilot control plane is temporarily unavailable.",
		detail: "VITE_API_BASE_URL is not configured. The dashboard cannot reach the deployment API.",
		retryable: false
	});
	const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
	let response;
	try {
		response = await fetch(url, {
			...init,
			headers: {
				accept: "application/json",
				...init?.body ? { "content-type": "application/json" } : {},
				...init?.headers
			}
		});
	} catch (err) {
		throw new ApiError({
			title: "ArchPilot control plane is temporarily unavailable.",
			detail: err instanceof Error ? err.message : "Network request failed.",
			retryable: true
		});
	}
	const text = await response.text();
	let json = null;
	if (text) try {
		json = JSON.parse(text);
	} catch {
		json = { message: text };
	}
	if (!response.ok) {
		const record = isRecord(json) ? json : {};
		const message = asString(record.message) ?? asString(record.error) ?? asString(record.detail) ?? `Request failed with ${response.status}`;
		throw new ApiError({
			title: mapHttpTitle(response.status, message),
			detail: message,
			status: response.status,
			retryable: response.status >= 500 || response.status === 429
		});
	}
	return json;
}
function mapHttpTitle(status, message) {
	const lower = message.toLowerCase();
	if (status === 404) return "Deployment not found.";
	if (status === 400 && lower.includes("repo")) return "Repository could not be analyzed.";
	if (lower.includes("build")) return "Container build failed.";
	if (lower.includes("qemu")) return "QEMU runtime validation failed.";
	if (lower.includes("health") || lower.includes("deploy")) return "Deployment did not become healthy.";
	if (status >= 500) return "ArchPilot control plane is temporarily unavailable.";
	return "Request failed.";
}
async function createJob(repoUrl) {
	const json = await request("/jobs", {
		method: "POST",
		body: JSON.stringify({
			repoUrl,
			repositoryUrl: repoUrl,
			repository: repoUrl,
			githubUrl: repoUrl,
			region: AWS_REGION
		})
	});
	const data = unwrapData(json) ?? (isRecord(json) ? json : {});
	const jobId = asString(pick(data, "jobId", "job_id", "id")) ?? (isRecord(data.job) ? asString(pick(data.job, "jobId", "job_id", "id")) : void 0);
	if (!jobId) throw new ApiError({
		title: "Deployment could not be created.",
		detail: "The API did not return a jobId.",
		retryable: true
	});
	return {
		jobId,
		raw: data
	};
}
async function fetchJob(jobId) {
	return normalizeJob(await request(`/jobs/${encodeURIComponent(jobId)}`), jobId);
}
async function fetchJobs() {
	try {
		return extractJobList(await request("/jobs")).map((item, i) => normalizeJob(item, asString(isRecord(item) ? item.jobId : void 0) ?? `unknown-${i}`));
	} catch (err) {
		if (err instanceof ApiError && err.shape.status === 404) return [];
		throw err;
	}
}
async function probeConnection() {
	if (!getApiBase()) return "unconfigured";
	try {
		await request("/jobs");
		return "connected";
	} catch (err) {
		if (err instanceof ApiError && (err.shape.status === 404 || err.shape.status === 405)) return "connected";
		try {
			await request("/health");
			return "connected";
		} catch {
			return "unavailable";
		}
	}
}
function extractJobList(json) {
	if (Array.isArray(json)) return json;
	if (!isRecord(json)) return [];
	for (const key of [
		"jobs",
		"items",
		"data",
		"results"
	]) {
		const v = json[key];
		if (Array.isArray(v)) return v;
		if (isRecord(v) && Array.isArray(v.jobs)) return v.jobs;
	}
	return [];
}
function normalizeJob(raw, fallbackId) {
	const data = unwrapData(raw) ?? (isRecord(raw) ? raw : {});
	const nested = isRecord(data.architecture) ? data.architecture : isRecord(data.decision) ? data.decision : {};
	const jobId = asString(pick(data, "jobId", "job_id", "id")) ?? fallbackId;
	const status = normalizeStatus(asString(pick(data, "status", "state", "jobStatus", "job_status")));
	const verdict = normalizeVerdict(asString(pick(data, "verdict", "architectureVerdict", "architecture_verdict")) ?? asString(pick(nested, "verdict")));
	const decisionSource = normalizeDecisionSource(asString(pick(data, "decisionSource", "decision_source", "source")) ?? asString(pick(nested, "source", "decisionSource")));
	const runtimeMode = asString(pick(data, "runtimeMode", "runtime_mode", "runtime") ?? pick(nested, "runtimeMode", "runtime"));
	const recommendedRuntime = asString(pick(data, "recommendedRuntime", "recommended_runtime") ?? pick(nested, "recommendedRuntime"));
	const executionArchitecture = asString(pick(data, "executionArchitecture", "execution_architecture", "hostArchitecture", "host_architecture"));
	const containerArchitecture = asString(pick(data, "containerArchitecture", "container_architecture", "imageArchitecture", "image_architecture"));
	const hostArchitecture = asString(pick(data, "hostArchitecture", "host_architecture") ?? executionArchitecture);
	const liveUrl = asString(pick(data, "live_url", "liveUrl", "url", "applicationUrl", "application_url"));
	const fallback = detectFallback(data, runtimeMode, recommendedRuntime);
	const runtimeKind = inferRuntimeKind({
		verdict,
		runtimeMode,
		recommendedRuntime,
		fallback,
		containerArchitecture,
		hostArchitecture
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
		repository: asString(pick(data, "repository", "repoUrl", "repo_url", "githubUrl", "github_url", "url")),
		region: asString(pick(data, "region")) ?? "ap-south-1",
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
		raw: data
	};
}
function normalizeStatus(value) {
	if (!value) return "QUEUED";
	const v = value.toUpperCase().replace(/[\s-]/g, "_");
	return {
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
		FAILURE: "FAILED"
	}[v] ?? v;
}
function normalizeVerdict(value) {
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
function normalizeDecisionSource(value) {
	if (!value) return "unknown";
	const v = value.toLowerCase();
	if (v.includes("determin")) return "deterministic";
	if (v.includes("bedrock") || v.includes("ai") || v.includes("llm")) return "bedrock";
	if (v.includes("policy")) return "policy";
	return "unknown";
}
function detectFallback(data, runtimeMode, recommendedRuntime) {
	if (asBoolean(pick(data, "fallback", "fellBack", "fell_back", "usedFallback", "used_fallback")) === true) return true;
	const blob = `${runtimeMode ?? ""} ${recommendedRuntime ?? ""}`.toUpperCase();
	if (blob.includes("FALLBACK")) return true;
	if (blob.includes("FARGATE") && (blob.includes("X86") || blob.includes("AMD64"))) return true;
	return false;
}
function inferRuntimeKind(input) {
	const blob = `${input.runtimeMode ?? ""} ${input.recommendedRuntime ?? ""}`.toUpperCase();
	if (input.fallback || blob.includes("FALLBACK")) return "fallback_x86";
	if (blob.includes("QEMU") || blob.includes("BINFMT")) return "qemu";
	if (blob.includes("FARGATE") && (blob.includes("X86") || blob.includes("AMD64"))) return "fallback_x86";
	if (blob.includes("FARGATE") && blob.includes("ARM")) return "native_arm";
	if (input.verdict === "native_arm64") return "native_arm";
	const container = (input.containerArchitecture ?? "").toUpperCase();
	const host = (input.hostArchitecture ?? "").toUpperCase();
	if ((container.includes("AMD") || container.includes("X86")) && host.includes("ARM")) return "qemu";
	if (input.verdict === "x86_required" && blob.includes("FARGATE")) return "fallback_x86";
	return "unknown";
}
function normalizeLogs(value) {
	if (!value) return [];
	if (typeof value === "string") return value.split("\n").map((line) => line.trim()).filter(Boolean).map((message) => ({ message }));
	if (!Array.isArray(value)) return [];
	return value.map((item) => {
		if (typeof item === "string") return { message: item };
		if (!isRecord(item)) return null;
		const message = asString(pick(item, "message", "msg", "text", "line", "log")) ?? JSON.stringify(item);
		return {
			timestamp: asString(pick(item, "timestamp", "time", "ts", "at")),
			message,
			level: normalizeLogLevel(asString(pick(item, "level", "severity")))
		};
	}).filter((v) => Boolean(v));
}
function normalizeLogLevel(value) {
	if (!value) return "info";
	const v = value.toLowerCase();
	if (v.includes("err")) return "error";
	if (v.includes("warn")) return "warn";
	if (v.includes("debug")) return "debug";
	return "info";
}
function normalizeStages(value) {
	if (!Array.isArray(value)) return void 0;
	const stages = [];
	value.forEach((item, index) => {
		if (!isRecord(item)) return;
		const id = asString(pick(item, "id", "key", "name", "stage")) ?? `stage-${index}`;
		const stage = {
			id,
			title: asString(pick(item, "title", "name", "label")) ?? id,
			description: asString(pick(item, "description", "detail", "summary")) ?? "",
			state: normalizeStageState(asString(pick(item, "state", "status")))
		};
		const durationMs = asNumber(pick(item, "durationMs", "duration_ms", "duration"));
		const detail = asString(pick(item, "detail", "output", "message"));
		const startedAt = asString(pick(item, "startedAt", "started_at"));
		const completedAt = asString(pick(item, "completedAt", "completed_at"));
		if (durationMs !== void 0) stage.durationMs = durationMs;
		if (detail) stage.detail = detail;
		if (startedAt) stage.startedAt = startedAt;
		if (completedAt) stage.completedAt = completedAt;
		stages.push(stage);
	});
	return stages.length ? stages : void 0;
}
function normalizeStageState(value) {
	if (!value) return "QUEUED";
	const v = value.toUpperCase();
	if (v.includes("SKIP")) return "SKIPPED";
	if (v.includes("WARN")) return "WARNING";
	if (v.includes("FAIL") || v.includes("ERROR")) return "FAILED";
	if (v.includes("RUN") || v.includes("PROGRESS") || v.includes("ACTIVE")) return "RUNNING";
	if (v.includes("COMPLETE") || v.includes("SUCCESS") || v.includes("DONE") || v.includes("SUCCEEDED")) return "COMPLETED";
	if (v.includes("QUEUE") || v.includes("PEND") || v.includes("WAIT")) return "QUEUED";
	return "QUEUED";
}
function normalizeScanner(value) {
	if (!isRecord(value)) return void 0;
	return {
		verdict: asString(pick(value, "verdict", "result")),
		armCompatible: asBoolean(pick(value, "armCompatible", "arm_compatible", "nativeArm")),
		x86Required: asBoolean(pick(value, "x86Required", "x86_required")),
		evidence: asStringArray(pick(value, "evidence", "findings", "signals")),
		nativeDependencies: asStringArray(pick(value, "nativeDependencies", "native_dependencies", "dependencies")),
		notes: asStringArray(pick(value, "notes", "warnings"))
	};
}
function normalizeBedrock(data) {
	const raw = pick(data, "bedrock", "ai", "reasoning", "aiReasoning", "ai_reasoning");
	const invokedExplicit = asBoolean(isRecord(raw) ? pick(raw, "invoked", "used", "called") : void 0);
	if (!isRecord(raw) && invokedExplicit !== true) {
		const source = asString(pick(data, "decisionSource", "decision_source"));
		if (source && source.toLowerCase().includes("bedrock")) return {
			invoked: true,
			confidence: asNumber(pick(data, "confidence")),
			recommendation: asString(pick(data, "recommendation", "recommendedRuntime", "recommended_runtime")),
			explanation: asString(pick(data, "explanation", "reason", "reasoning")),
			evidence: asStringArray(pick(data, "evidence")),
			risks: asStringArray(pick(data, "risks"))
		};
		return;
	}
	const obj = isRecord(raw) ? raw : {};
	const explanation = asString(pick(obj, "explanation", "reason", "reasoning", "summary", "text") ?? pick(data, "explanation"));
	const recommendation = asString(pick(obj, "recommendation", "recommendedRuntime", "recommended_runtime"));
	const invoked = invokedExplicit ?? Boolean(explanation || recommendation);
	if (!invoked) return {
		invoked: false,
		evidence: [],
		risks: []
	};
	return {
		invoked,
		model: asString(pick(obj, "model", "modelId", "model_id")),
		confidence: asNumber(pick(obj, "confidence") ?? pick(data, "confidence")),
		recommendation,
		explanation,
		evidence: asStringArray(pick(obj, "evidence", "signals") ?? pick(data, "evidence")),
		risks: asStringArray(pick(obj, "risks") ?? pick(data, "risks"))
	};
}
function normalizeCost(value) {
	if (!isRecord(value)) return void 0;
	const actual = asNumber(pick(value, "actualMonthly", "actual_monthly", "gravitonMonthly", "monthly", "actual"));
	const comparison = asNumber(pick(value, "comparisonMonthly", "comparison_monthly", "x86Monthly", "x86_monthly", "comparison"));
	let difference = asNumber(pick(value, "differenceMonthly", "difference_monthly", "savings", "delta"));
	let percent = asNumber(pick(value, "differencePercent", "difference_percent", "percent", "savingsPercent"));
	if (difference === void 0 && actual !== void 0 && comparison !== void 0) difference = comparison - actual;
	if (percent === void 0 && difference !== void 0 && comparison) percent = difference / comparison * 100;
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
		disclaimer: asString(pick(value, "disclaimer"))
	};
}
function normalizeQemu(data, runtimeKind) {
	const raw = pick(data, "qemu", "emulation", "runtimeValidation", "runtime_validation");
	const obj = isRecord(raw) ? raw : {};
	if (!(runtimeKind === "qemu" || Boolean(asString(pick(obj, "status")) || asBoolean(pick(obj, "used", "enabled", "present"))))) return void 0;
	return {
		present: true,
		status: normalizeQemuStatus(asString(pick(obj, "status", "validation", "result")) ?? asString(pick(data, "qemuStatus", "qemu_status"))),
		containerArchitecture: asString(pick(obj, "containerArchitecture", "container_architecture") ?? pick(data, "containerArchitecture", "container_architecture")),
		hostArchitecture: asString(pick(obj, "hostArchitecture", "host_architecture") ?? pick(data, "hostArchitecture", "host_architecture")),
		host: asString(pick(obj, "host") ?? pick(data, "host")),
		instance: asString(pick(obj, "instance", "instanceType", "instance_type")),
		emulation: asString(pick(obj, "emulation")) ?? "QEMU/binfmt",
		message: asString(pick(obj, "message", "detail"))
	};
}
function normalizeQemuStatus(value) {
	if (!value) return "PENDING";
	const v = value.toUpperCase();
	if (v.includes("FAIL") || v.includes("ERROR")) return "FAILED";
	if (v.includes("VALID") || v.includes("SUCCESS") || v.includes("PASS") || v.includes("OK")) return "VALIDATED";
	if (v.includes("RUN") || v.includes("PROGRESS")) return "RUNNING";
	return "PENDING";
}
function normalizeHealth(data, liveUrl) {
	const raw = pick(data, "health", "healthCheck", "health_check");
	const obj = isRecord(raw) ? raw : {};
	const status = asString(pick(obj, "status", "state") ?? pick(data, "healthStatus", "health_status"));
	const healthy = asBoolean(pick(obj, "healthy")) ?? (status ? /healthy|ok|live|success/i.test(status) : void 0);
	const url = asString(pick(obj, "url", "liveUrl", "live_url")) ?? liveUrl;
	if (!status && healthy === void 0 && !url) return void 0;
	return {
		status,
		healthy,
		liveUrl: url,
		checkedAt: asString(pick(obj, "checkedAt", "checked_at"))
	};
}
function normalizeResources(value) {
	if (!isRecord(value)) return void 0;
	return {
		cluster: asString(pick(value, "cluster", "ecsCluster", "ecs_cluster")),
		service: asString(pick(value, "service", "ecsService", "ecs_service")),
		taskDefinition: asString(pick(value, "taskDefinition", "task_definition")),
		instanceId: asString(pick(value, "instanceId", "instance_id")),
		ecrImage: asString(pick(value, "ecrImage", "ecr_image", "imageUri", "image_uri")),
		logGroup: asString(pick(value, "logGroup", "log_group")),
		bucket: asString(pick(value, "bucket", "s3", "reportBucket")),
		table: asString(pick(value, "table", "dynamoTable", "dynamodb"))
	};
}
var NAV = [
	{
		to: "/overview",
		label: "Overview",
		icon: LayoutGrid
	},
	{
		to: "/deployments",
		label: "Deployments",
		icon: Activity
	},
	{
		to: "/projects",
		label: "Projects",
		icon: Boxes
	},
	{
		to: "/analysis",
		label: "Architecture Analysis",
		icon: Cpu
	},
	{
		to: "/reports",
		label: "Reports",
		icon: FileText
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function Sidebar({ connection, onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const api = getApiBase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-14 items-center px-4 shadow-[inset_0_-1px_0_0_var(--color-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "rounded-sm",
					onClick: onNavigate,
					"aria-label": "ArchPilot home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchPilotLogo, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-1 flex-col gap-0.5 p-3",
				"aria-label": "Console",
				children: NAV.map((item) => {
					const active = pathname === item.to || item.to !== "/overview" && pathname.startsWith(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: onNavigate,
						className: cn("flex min-h-10 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors duration-150", active ? "bg-card-elevated text-foreground shadow-border" : "text-muted hover:bg-card-elevated/60 hover:text-foreground"),
						"aria-current": active ? "page" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4 shrink-0",
							"aria-hidden": "true"
						}), item.label]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-3 shadow-[inset_0_1px_0_0_var(--color-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-background px-3 py-2.5 shadow-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xs tracking-wide text-subtle uppercase",
								children: "AWS Region"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xs text-foreground",
								children: AWS_REGION_LABEL
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs text-muted",
								children: AWS_REGION
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
							className: cn("size-3.5", connection === "connected" && "text-success", connection === "unavailable" && "text-danger", connection === "unconfigured" && "text-warning"),
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-foreground",
								children: [
									connection === "connected" && "Control plane connected",
									connection === "unavailable" && "Control plane unavailable",
									connection === "unconfigured" && "API not configured"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-mono text-2xs text-subtle",
								children: api ?? "VITE_API_BASE_URL unset"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 px-1 pb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 items-center justify-center rounded-md bg-card-elevated font-mono text-2xs text-muted shadow-border",
							"aria-hidden": "true",
							children: "AP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-foreground",
								children: "Operator"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-mono text-2xs text-subtle",
								children: "ap-south-1 · console"
							})]
						})]
					})
				]
			})
		]
	});
}
function Topbar({ title, context, status, action, onMenu }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex min-h-14 flex-wrap items-center gap-3 bg-background/80 px-4 py-2.5 backdrop-blur-sm shadow-[inset_0_-1px_0_0_var(--color-border)] lg:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				className: "lg:hidden",
				onClick: onMenu,
				"aria-label": "Open navigation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate text-sm font-medium tracking-tight",
					children: title
				}), context ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 truncate text-xs text-muted",
					children: context
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex flex-wrap items-center gap-2",
				children: [status, action]
			})
		]
	});
}
var Sheet = Dialog;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-background-deep/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-72 flex-col bg-card shadow-elevated", side === "left" ? "inset-y-0 left-0" : "inset-y-0 right-0", className),
		...props,
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "sr-only",
				children: "Navigation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "absolute top-3 right-3 rounded-sm p-2 text-muted hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})
		]
	})] });
}
function AppShell({ title, context, status, action, children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const apiConfigured = Boolean(getApiBase());
	const connection = useQuery({
		queryKey: ["connection"],
		queryFn: probeConnection,
		enabled: apiConfigured,
		refetchInterval: 2e4,
		staleTime: 1e4
	});
	const state = apiConfigured ? connection.data ?? "unavailable" : "unconfigured";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-60 shadow-[inset_-1px_0_0_0_var(--color-border)] lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { connection: state })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "left",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
						connection: state,
						onNavigate: () => setOpen(false)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Topbar, {
					title,
					context,
					status,
					action,
					onMenu: () => setOpen(true)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 py-5 lg:px-6 lg:py-6",
					children
				})]
			})
		]
	});
}
//#endregion
export { fetchJobs as a, fetchJob as i, AppShell as n, getApiBase as o, createJob as r, ApiError as t };
