import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { l as Button, m as cn, n as Route } from "./_ssr/router-Bg95u4OA.mjs";
import { n as AppShell, t as ApiError } from "./_ssr/app-shell-CQ71g6o4.mjs";
import { r as formatJobId, s as repoDisplay, t as confidenceLabel } from "./_ssr/format-D-zwO8bu.mjs";
import { n as StatusBadge, r as jobStatusTone } from "./_ssr/status-badge-Z54TO3dD.mjs";
import { a as RuntimeCard, i as LiveDeployment, l as useJob, n as BedrockReasoning, o as architecturePath, r as CostComparison, t as ArchitectureCard } from "./_ssr/use-job-ADXQZ7Ul.mjs";
import { t as ErrorState } from "./_ssr/error-state-Cf5dUOLf.mjs";
import { t as Skeleton } from "./_ssr/skeleton-CUIN_GkB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_jobId-CfUHJiIV.js
var import_jsx_runtime = require_jsx_runtime();
function ReportSection({ title, eyebrow, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-lg bg-card p-5 shadow-border", className),
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-muted uppercase",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 text-md font-medium tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children
			})
		]
	});
}
function ReportVisual({ nodes }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex flex-col gap-0",
		children: nodes.map((node, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-col items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-md bg-card-elevated px-3 py-1.5 font-mono text-xs shadow-border",
				children: node
			}), i < nodes.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-4 h-5 w-px bg-border",
				"aria-hidden": "true"
			}) : null]
		}, `${node}-${i}`))
	});
}
function ReportPage() {
	const { jobId } = Route.useParams();
	const query = useJob(jobId);
	const job = query.data;
	const apiErr = query.error instanceof ApiError ? query.error.shape : null;
	const path = job ? architecturePath(job) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Deployment report",
		context: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono",
			children: formatJobId(jobId)
		}),
		status: job ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
			label: String(job.status),
			tone: jobStatusTone(String(job.status))
		}) : null,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			variant: "secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/deployments/$jobId",
				params: { jobId },
				children: "Open pipeline"
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-4xl flex-col gap-4",
			children: [
				query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-lg" }) : null,
				query.isError && !job ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					title: apiErr?.title ?? "Report unavailable.",
					detail: apiErr?.detail ?? "The control plane did not return this job.",
					onRetry: () => query.refetch()
				}) : null,
				job ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportSection, {
						title: "Deployment summary",
						eyebrow: "Report",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Repository",
									v: repoDisplay(job.repository)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Job",
									v: job.jobId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Decision",
									v: job.verdict
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Confidence",
									v: confidenceLabel(job.confidence)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Source",
									v: job.decisionSource === "deterministic" ? "Deterministic Scanner" : job.decisionSource === "bedrock" ? "Amazon Bedrock" : job.decisionSource
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Build",
									v: job.targetPlatform ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Image",
									v: job.imageUri ?? job.resources?.ecrImage ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Runtime",
									v: job.runtimeMode ?? "—"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReportSection, {
						title: "Architecture decision",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureCard, { job }), path ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-xs text-muted",
								children: path.caption
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportVisual, { nodes: path.nodes })]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportSection, {
						title: "Scanner findings",
						children: job.scanner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-1.5 font-mono text-xs text-muted",
							children: [
								job.scanner.verdict ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Verdict: ", job.scanner.verdict] }) : null,
								job.scanner.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: e }, e)),
								job.scanner.nativeDependencies.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Native dependency: ", d] }, d)),
								job.scanner.evidence.length === 0 && job.scanner.nativeDependencies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Scanner payload present, no evidence list returned." }) : null
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No scanner payload on this job."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedrockReasoning, { job }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeCard, { job }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportSection, {
						title: "Health",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm",
							children: job.health?.status ?? (job.health?.healthy ? "HEALTHY" : "—")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostComparison, { job }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportSection, {
						title: "AWS resources",
						children: job.resources && Object.values(job.resources).some(Boolean) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								job.resources.cluster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Cluster",
									v: job.resources.cluster
								}) : null,
								job.resources.service ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Service",
									v: job.resources.service
								}) : null,
								job.resources.taskDefinition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Task definition",
									v: job.resources.taskDefinition
								}) : null,
								job.resources.instanceId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Instance",
									v: job.resources.instanceId
								}) : null,
								job.resources.ecrImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "ECR",
									v: job.resources.ecrImage
								}) : null,
								job.resources.logGroup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Logs",
									v: job.resources.logGroup
								}) : null
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "AWS resource identifiers are shown only when the control plane returns them."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveDeployment, { job })
				] }) : null
			]
		})
	});
}
function Item({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-2xs tracking-wide text-subtle uppercase",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 break-all font-mono text-xs",
		children: v
	})] });
}
//#endregion
export { ReportPage as component };
