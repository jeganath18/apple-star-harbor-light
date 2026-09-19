import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as ArchitectureBadge } from "./architecture-badge-Cmr4BUuw.mjs";
import { s as repoDisplay, t as confidenceLabel } from "./format-D-zwO8bu.mjs";
import { n as useJobs, t as EmptyState } from "./use-jobs-D-iRYDmp.mjs";
import { t as ConsolePage } from "./console-page-VxMP8OMb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analysis-Cpo6zgrj.js
var import_jsx_runtime = require_jsx_runtime();
function AnalysisPage() {
	const { data } = useJobs();
	const jobs = data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePage, {
		title: "Architecture Analysis",
		context: "Scanner evidence and Bedrock reasoning",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
						title: "Deterministic scanner",
						body: "Evidence from Dockerfiles, native dependencies, and declared platforms. Treated as fact."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
						title: "Amazon Bedrock",
						body: "Invoked only when the scanner cannot establish a confident architecture. Labeled as AI reasoning."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
						title: "Deployment policy",
						body: "Maps the verdict onto Fargate ARM64, Graviton + QEMU, or Fargate X86_64 fallback."
					})
				]
			}), jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No architecture analyses yet.",
				description: "Deploy a GitHub repository to run the scanner and, if needed, Bedrock reasoning."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border overflow-hidden rounded-lg bg-card shadow-border",
				children: jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/deployments/$jobId",
					params: { jobId: job.jobId },
					className: "flex flex-col gap-2 px-4 py-3 hover:bg-card-elevated sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm",
						children: repoDisplay(job.repository)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [job.decisionSource === "bedrock" ? "Bedrock reasoning" : job.decisionSource === "deterministic" ? "Deterministic scanner" : "Source pending", job.confidence !== void 0 ? ` · ${confidenceLabel(job.confidence)}` : ""]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
							label: job.verdict,
							tone: job.verdict === "native_arm64" ? "arm" : "x86"
						}), job.runtimeKind !== "unknown" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
							label: job.runtimeKind.replace("_", " "),
							tone: job.runtimeKind === "native_arm" ? "arm" : "qemu"
						}) : null]
					})]
				}) }, job.jobId))
			})]
		})
	});
}
function Note({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg bg-card p-4 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs leading-relaxed text-muted",
			children: body
		})]
	});
}
//#endregion
export { AnalysisPage as component };
