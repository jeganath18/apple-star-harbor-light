import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { C as Check, S as ChevronDown, g as FileText, m as Github, s as RefreshCw, u as LoaderCircle } from "./_libs/lucide-react.mjs";
import { a as AWS_REGION_FULL, l as Button, m as cn, r as Route$2 } from "./_ssr/router-Dd4e0Vxu.mjs";
import { t as ArchitectureBadge } from "./_ssr/architecture-badge-Cmr4BUuw.mjs";
import { n as AppShell, t as ApiError } from "./_ssr/app-shell-BKzqlqf6.mjs";
import { t as listTrackedJobs } from "./_ssr/jobs-store-C-jjgOwz.mjs";
import { n as formatDuration, o as lastUpdatedLabel, r as formatJobId, s as repoDisplay, t as confidenceLabel } from "./_ssr/format-D-zwO8bu.mjs";
import { n as StatusBadge, r as jobStatusTone, t as StageIcon } from "./_ssr/status-badge-TLtOGgl3.mjs";
import { a as RuntimeCard, c as errorCopy, i as LiveDeployment, l as useJob, n as BedrockReasoning, r as CostComparison, s as deriveStages, t as ArchitectureCard } from "./_ssr/use-job-Cmxk5Paw.mjs";
import { t as ErrorState } from "./_ssr/error-state-BcJABxoJ.mjs";
import { t as Skeleton } from "./_ssr/skeleton-ByubNcEx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_jobId-BVXUUVEX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NODES = [
	{
		id: "github",
		label: "GitHub",
		match: ["QUEUED"]
	},
	{
		id: "scanner",
		label: "Scanner",
		match: ["ANALYZING"]
	},
	{
		id: "decision",
		label: "Architecture Decision",
		match: ["AI_ANALYSIS", "DECIDED"]
	},
	{
		id: "build",
		label: "Build",
		match: ["BUILDING"]
	},
	{
		id: "runtime",
		label: "Runtime",
		match: ["DEPLOYING", "VALIDATING"]
	},
	{
		id: "health",
		label: "Health Check",
		match: ["REPORTING"]
	},
	{
		id: "live",
		label: "Live Application",
		match: ["COMPLETED"]
	}
];
function nodeState(job, index) {
	const status = String(job.status).toUpperCase();
	if (status === "FAILED") {
		const current = NODES.findIndex((n) => n.match.includes(status));
		if (index === Math.max(current, 0)) return "failed";
	}
	if (status === "COMPLETED") return "done";
	const activeIndex = NODES.findIndex((n) => n.match.includes(status));
	const idx = activeIndex === -1 ? 0 : activeIndex;
	if (index < idx) return "done";
	if (index === idx) return job.runtimeKind === "fallback_x86" && nIsRuntime(index) ? "warn" : "active";
	return "pending";
}
function nIsRuntime(index) {
	return NODES[index]?.id === "runtime";
}
function ArchitectureFlow({ job }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card p-4 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-muted uppercase",
				children: "Infrastructure flow"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-col gap-0 md:flex-row md:items-stretch md:gap-0",
				children: NODES.map((node, index) => {
					const state = nodeState(job, index);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 items-stretch md:flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center md:flex-col md:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex size-8 shrink-0 items-center justify-center rounded-md", state === "done" && "bg-success/10 text-success", state === "active" && "glow-infra bg-infra/10 text-infra", state === "warn" && "glow-warning bg-warning/10 text-warning", state === "failed" && "glow-danger bg-danger/10 text-danger", state === "pending" && "bg-card-elevated text-subtle shadow-border"),
								children: node.id === "github" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-3.5" }) : state === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current" })
							}), index < NODES.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-2 h-px flex-1 bg-border md:mx-0 md:my-2 md:h-auto md:w-px md:flex-none md:min-h-6" }) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("ml-3 self-center font-mono text-2xs tracking-wide uppercase md:mt-2 md:ml-0 md:self-auto md:text-center", state === "pending" ? "text-subtle" : "text-foreground"),
							children: node.label
						})]
					}, node.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted",
				children: "Active path is driven by live job status. ArchPilot does not animate ahead of the control plane."
			})
		]
	});
}
function DeploymentSummary({ job }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card p-4 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-2xs font-medium tracking-wide text-muted uppercase",
			children: "Deployment summary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Repository",
					value: repoDisplay(job.repository),
					mono: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Job",
					value: formatJobId(job.jobId),
					mono: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs tracking-wide text-subtle uppercase",
					children: "Status"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						label: String(job.status),
						tone: jobStatusTone(String(job.status)),
						pulse: !["COMPLETED", "FAILED"].includes(String(job.status).toUpperCase())
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Health Status",
					value: job.raw.qemuStatus || job.status == "COMPLETED" ? "Healthy" : "",
					mono: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Verdict",
					value: job.verdict,
					mono: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Confidence",
					value: confidenceLabel(job.confidence),
					mono: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs tracking-wide text-subtle uppercase",
					children: "Runtime"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex flex-wrap gap-1.5",
					children: [job.targetPlatform ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
						label: job.targetPlatform,
						tone: "muted"
					}) : null, job.runtimeMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
						label: job.runtimeMode,
						tone: job.runtimeKind === "native_arm" ? "arm" : job.runtimeKind === "qemu" ? "qemu" : "x86"
					}) : null]
				})] })
			]
		})]
	});
}
function Field({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-2xs tracking-wide text-subtle uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: mono ? "mt-1 font-mono text-sm" : "mt-1 text-sm",
		children: value
	})] });
}
function DeploymentStage({ stage, defaultOpen }) {
	const [open, setOpen] = (0, import_react.useState)(Boolean(defaultOpen));
	const active = stage.state === "RUNNING";
	const failed = stage.state === "FAILED";
	const warn = stage.state === "WARNING";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-md bg-card transition-[box-shadow] duration-200", active && "glow-infra", failed && "glow-danger", warn && "glow-warning", !active && !failed && !warn && "shadow-border"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex w-full items-start gap-3 px-3.5 py-3 text-left",
			onClick: () => setOpen((v) => !v),
			"aria-expanded": open,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-sm", active && "bg-infra/15 text-infra", stage.state === "COMPLETED" && "bg-success/10 text-success", failed && "bg-danger/10 text-danger", warn && "bg-warning/10 text-warning", (stage.state === "QUEUED" || stage.state === "SKIPPED") && "bg-card-elevated text-subtle"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageIcon, { state: stage.state })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: stage.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-2xs tracking-wide text-subtle uppercase",
								children: stage.state
							}),
							stage.durationMs !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-2xs text-muted tabular",
								children: formatDuration(stage.durationMs)
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-xs text-muted",
						children: stage.description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("mt-1 size-4 shrink-0 text-subtle transition-transform duration-150", open && "rotate-180"),
					"aria-hidden": "true"
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border px-3.5 py-3",
			children: stage.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs leading-relaxed text-muted",
				children: stage.detail
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: "No additional technical detail from the control plane yet."
			})
		}) : null]
	});
}
function DeploymentTimeline({ stages }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
		className: "relative flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute top-4 bottom-4 left-[25px] w-px bg-border",
			"aria-hidden": "true"
		}), stages.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: cn("relative z-10"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeploymentStage, {
				stage,
				defaultOpen: stage.state === "RUNNING" || stage.state === "FAILED"
			})
		}, stage.id))]
	});
}
function DeploymentPage() {
	const { jobId } = Route$2.useParams();
	const query = useJob(jobId);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	const job = query.data;
	const tracked = listTrackedJobs().find((j) => j.jobId === jobId);
	const repo = job?.repository ?? tracked?.repoUrl;
	const fail = job ? errorCopy(job) : null;
	const apiErr = query.error instanceof ApiError ? query.error.shape : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Deployment",
		context: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-mono",
			children: [
				repoDisplay(repo),
				" · ",
				jobId,
				" · ",
				job?.region ? `AWS · ${job.region}` : AWS_REGION_FULL
			]
		}),
		status: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [job ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
				label: String(job.status),
				tone: jobStatusTone(String(job.status)),
				pulse: !["COMPLETED", "FAILED"].includes(String(job.status).toUpperCase())
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden font-mono text-2xs text-subtle sm:inline",
				children: query.dataUpdatedAt ? lastUpdatedLabel(query.isFetching ? now : query.dataUpdatedAt) : "Waiting"
			})]
		}),
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: "ghost",
				onClick: () => query.refetch(),
				"aria-label": "Refresh",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/reports/$jobId",
					params: { jobId },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), "Report"]
				})
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-4",
			children: [
				query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96 rounded-lg" })]
				}) : null,
				query.isError && !job ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					title: apiErr?.title ?? "Deployment not found.",
					detail: apiErr?.detail ?? (query.error instanceof Error ? query.error.message : "Missing job"),
					onRetry: apiErr?.retryable === false ? void 0 : () => query.refetch()
				}) : null,
				job ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					fail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
						title: fail.title,
						detail: fail.detail,
						onRetry: () => query.refetch()
					}) : null,
					query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-2xs text-warning",
						children: ["Live updates interrupted. Showing last known state. ", apiErr?.detail]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeploymentSummary, { job }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-start gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeploymentTimeline, { stages: deriveStages(job) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostComparison, { job }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureCard, { job })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureFlow, { job }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedrockReasoning, { job }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeCard, { job }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveDeployment, { job })
								]
							})
						]
					})
				] }) : null
			]
		})
	});
}
//#endregion
export { DeploymentPage as component };
