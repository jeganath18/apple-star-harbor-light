import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Check, _ as ExternalLink, y as Copy } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as AWS_REGION_FULL, c as POLL_INTERVAL_MS, l as Button } from "./router-Bg95u4OA.mjs";
import { i as fetchJob } from "./app-shell-CQ71g6o4.mjs";
import { a as formatUsd, t as confidenceLabel } from "./format-D-zwO8bu.mjs";
import { t as ArchitectureBadge } from "./architecture-badge-no06e0ju.mjs";
import { n as StatusBadge } from "./status-badge-Z54TO3dD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-job-ADXQZ7Ul.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArchitectureCard({ job }) {
	const kind = job.runtimeKind;
	const container = job.containerArchitecture ?? (kind === "native_arm" ? "ARM64" : kind === "unknown" ? "—" : "AMD64");
	const host = job.hostArchitecture ?? (kind === "native_arm" ? "ARM64" : kind === "qemu" ? "ARM64" : kind === "fallback_x86" ? "X86_64" : "—");
	const runtime = kind === "native_arm" ? "ECS Fargate" : kind === "qemu" ? "QEMU/binfmt" : kind === "fallback_x86" ? "ECS Fargate" : job.runtimeMode ?? "Pending";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card p-4 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs font-medium tracking-wide text-muted uppercase",
					children: "Architecture"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
					label: kind === "native_arm" ? "Native ARM" : kind === "qemu" ? "QEMU path" : kind === "fallback_x86" ? "X86 fallback" : "Undecided",
					tone: kind === "native_arm" ? "arm" : kind === "unknown" ? "muted" : "x86"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta$2, {
						label: "Container",
						value: container
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta$2, {
						label: "Host",
						value: host
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta$2, {
						label: "Runtime",
						value: runtime
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta$2, {
						label: "Architecture",
						value: kind === "native_arm" ? "ARM64 → ARM64" : kind === "qemu" ? "AMD64 → ARM64" : kind === "fallback_x86" ? "AMD64 → AMD64" : "Awaiting decision"
					})
				]
			}),
			kind === "qemu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted",
				children: "AMD64 image preserved. Execution is attempted on an ARM64 Graviton host through QEMU/binfmt, then validated. This does not mean every x86 workload will run."
			}) : null,
			kind === "fallback_x86" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-warning",
				children: "QEMU runtime validation was not viable. Policy placed the AMD64 image on ECS Fargate X86_64."
			}) : null,
			kind === "native_arm" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted",
				children: "Workload is ARM64-compatible. Image built as linux/arm64 and deployed to ECS Fargate ARM64."
			}) : null
		]
	});
}
function Meta$2({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-2xs tracking-wide text-subtle uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 font-mono text-sm text-foreground",
		children: value
	})] });
}
function BedrockReasoning({ job }) {
	const info = job.bedrock;
	if (!info?.invoked) {
		if (job.decisionSource === "deterministic") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg bg-card p-4 shadow-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs font-medium tracking-wide text-muted uppercase",
					children: "AI architecture review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-foreground",
					children: "Amazon Bedrock was not invoked."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "The deterministic scanner produced a confident architecture verdict. Scanner evidence is treated as fact; Bedrock is reserved for ambiguous cases."
				})
			]
		});
		return null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card p-4 glow-ai",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs font-medium tracking-wide text-ai uppercase",
					children: "AI architecture review"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-xs text-muted",
					children: "Amazon Bedrock · generated reasoning"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
					label: "Bedrock",
					tone: "ai"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Confidence",
						value: confidenceLabel(info.confidence ?? job.confidence)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Recommendation",
						value: info.recommendation ?? job.recommendedRuntime ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Source",
						value: "Amazon Bedrock"
					})
				]
			}),
			info.explanation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "mt-4 border-l-2 border-ai/40 pl-3 text-sm leading-relaxed text-foreground",
				children: info.explanation
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted",
				children: "No explanation payload was returned by the control plane."
			}),
			info.evidence.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
				title: "Evidence",
				items: info.evidence
			}) : null,
			info.risks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
				title: "Risks",
				items: info.risks,
				tone: "warning"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-2xs text-subtle",
				children: "Scanner = evidence. Bedrock = reasoning. Policy = execution decision. This card is not a chatbot."
			})
		]
	});
}
function Field({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-2xs tracking-wide text-subtle uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 font-mono text-sm",
		children: value
	})] });
}
function List({ title, items, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-2xs tracking-wide text-subtle uppercase",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 space-y-1.5",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: tone === "warning" ? "text-xs text-warning" : "text-xs text-muted",
				children: item
			}, item))
		})]
	});
}
function CostComparison({ job }) {
	const cost = job.cost;
	if (!cost || cost.actualMonthly === void 0 && cost.comparisonMonthly === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card p-4 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-muted uppercase",
				children: "Cost intelligence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-foreground",
				children: "Compute estimate not yet available."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "ArchPilot only renders cost figures returned by the control plane. Values are never invented in the client."
			})
		]
	});
	const actualLabel = cost.actualLabel ?? (job.runtimeKind === "qemu" ? "Graviton + QEMU" : job.runtimeKind === "native_arm" ? "ARM64 Fargate" : "Selected runtime");
	const comparisonLabel = cost.comparisonLabel ?? (job.runtimeKind === "qemu" ? "Equivalent X86 EC2" : "X86 Fargate");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card p-4 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-muted uppercase",
				children: "Cost intelligence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-background px-3 py-3 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xs tracking-wide text-subtle uppercase",
							children: "Actual runtime"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: actualLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xl tabular",
							children: formatUsd(cost.actualMonthly)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xs text-subtle",
							children: "/ month"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-background px-3 py-3 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xs tracking-wide text-subtle uppercase",
							children: "Comparison"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: comparisonLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xl text-muted tabular",
							children: formatUsd(cost.comparisonMonthly)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xs text-subtle",
							children: "/ month"
						})
					]
				})]
			}),
			cost.differenceMonthly !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-sm text-infra",
				children: [
					"Estimated difference ",
					formatUsd(cost.differenceMonthly),
					cost.differencePercent !== void 0 ? ` · ${Math.round(cost.differencePercent)}%` : ""
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: [
					cost.vcpu !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tiny, {
						label: "vCPU",
						value: String(cost.vcpu)
					}) : null,
					cost.memoryGb !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tiny, {
						label: "Memory",
						value: `${cost.memoryGb} GB`
					}) : null,
					cost.hoursPerMonth !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tiny, {
						label: "Hours/month",
						value: String(cost.hoursPerMonth)
					}) : null,
					cost.cpuPrice !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tiny, {
						label: "CPU price",
						value: formatUsd(cost.cpuPrice, 4)
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-2xs leading-relaxed text-subtle",
				children: "Compute-only estimate. Excludes load balancer, storage, data transfer, public IPv4, monitoring, and other AWS charges. Not a guaranteed bill."
			})
		]
	});
}
function Tiny({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-2xs text-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-xs",
		children: value
	})] });
}
function LiveDeployment({ job }) {
	const url = job.liveUrl ?? job.health?.liveUrl;
	const healthy = job.health?.healthy === true || job.status === "COMPLETED" && Boolean(url);
	const [copied, setCopied] = (0, import_react.useState)(false);
	if (!url && job.status !== "COMPLETED") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card p-4 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-2xs font-medium tracking-wide text-muted uppercase",
			children: "Live application"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "No live URL yet. This card populates when the control plane publishes an endpoint."
		})]
	});
	async function copy() {
		if (!url) return;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			toast.success("Live URL copied");
			window.setTimeout(() => setCopied(false), 1500);
		} catch {
			toast.error("Could not copy URL");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: healthy ? "rounded-lg bg-card p-4 glow-success" : "rounded-lg bg-card p-4 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs font-medium tracking-wide text-muted uppercase",
					children: "Live application"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
					label: healthy ? "LIVE · Healthy" : url ? "Published" : "Unavailable",
					tone: healthy ? "success" : "muted",
					pulse: healthy
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 break-all font-mono text-sm text-infra",
				children: url ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta$1, {
						label: "Region",
						value: job.region ? `AWS · ${job.region}` : AWS_REGION_FULL
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta$1, {
						label: "Runtime",
						value: job.runtimeMode ?? job.recommendedRuntime ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta$1, {
						label: "Container",
						value: job.containerArchitecture ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta$1, {
						label: "Host",
						value: job.hostArchitecture ?? "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: url,
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), "Open Application"]
					})
				}) : null, url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					onClick: copy,
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Copy URL"]
				}) : null]
			})
		]
	});
}
function Meta$1({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-2xs tracking-wide text-subtle uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 font-mono text-xs text-foreground",
		children: value
	})] });
}
function RuntimeCard({ job }) {
	if (job.runtimeKind !== "qemu" && !job.qemu?.present) return null;
	const qemu = job.qemu;
	const status = qemu?.status ?? (job.status === "COMPLETED" ? "VALIDATED" : "PENDING");
	const failed = status === "FAILED" || job.runtimeKind === "fallback_x86";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: failed ? "rounded-lg bg-card p-4 glow-warning" : "rounded-lg bg-card p-4 glow-infra",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs font-medium tracking-wide text-muted uppercase",
					children: "QEMU runtime validation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
					label: failed ? "FAILED" : status,
					tone: failed ? "danger" : status === "VALIDATED" ? "success" : "infra",
					pulse: status === "RUNNING" || status === "PENDING"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Container architecture",
						value: qemu?.containerArchitecture ?? job.containerArchitecture ?? "AMD64"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Host architecture",
						value: qemu?.hostArchitecture ?? job.hostArchitecture ?? "ARM64"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Host",
						value: qemu?.host ?? "AWS Graviton"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Instance",
						value: qemu?.instance ?? job.instanceType ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Emulation",
						value: qemu?.emulation ?? "QEMU/binfmt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
							label: "AMD64 → ARM64",
							tone: "qemu"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-foreground",
				children: failed ? "QEMU runtime validation failed. ArchPilot automatically switched to native X86 infrastructure." : status === "VALIDATED" ? "AMD64 container successfully executed on ARM64 Graviton." : qemu?.message ?? "Waiting for runtime validation from the control plane."
			})
		]
	});
}
function Meta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-2xs tracking-wide text-subtle uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 font-mono text-sm",
		children: value
	})] });
}
var PIPELINE_STAGES = [
	{
		id: "analysis",
		title: "Repository Analysis",
		description: "Deterministic scan of the GitHub repository for architecture signals."
	},
	{
		id: "decision",
		title: "Architecture Decision",
		description: "Scanner evidence combined with Bedrock reasoning when the verdict is ambiguous."
	},
	{
		id: "build",
		title: "Container Build",
		description: "Build and push the image for the selected target platform."
	},
	{
		id: "deploy",
		title: "Deployment",
		description: "Place the workload on Fargate or a Graviton host according to policy."
	},
	{
		id: "validate",
		title: "Runtime Validation",
		description: "Confirm the process is actually runnable on the chosen host architecture."
	},
	{
		id: "health",
		title: "Health Check",
		description: "Probe the live endpoint until the service reports healthy — or it does not."
	},
	{
		id: "report",
		title: "Report Generation",
		description: "Assemble the explainable deployment report and cost comparison."
	}
];
var STATUS_INDEX = {
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
	FAILED: -1
};
function isTerminal(status) {
	const s = (status ?? "").toUpperCase();
	return s === "COMPLETED" || s === "FAILED";
}
function deriveStages(job) {
	if (job.stages && job.stages.length > 0) return job.stages;
	const status = String(job.status).toUpperCase();
	const failed = status === "FAILED";
	const complete = status === "COMPLETED";
	const current = failed ? resolveFailedIndex(job) : STATUS_INDEX[status] ?? 0;
	const skipAi = job.decisionSource === "deterministic" && status !== "AI_ANALYSIS";
	const skipQemu = job.runtimeKind === "native_arm";
	return PIPELINE_STAGES.map((meta, index) => {
		let state = "QUEUED";
		let detail;
		if (complete) state = "COMPLETED";
		else if (failed) {
			if (index < current) state = "COMPLETED";
			else if (index === current) state = "FAILED";
			else state = "QUEUED";
		} else if (status === "QUEUED" && index === 0) state = "QUEUED";
		else if (index < current) state = "COMPLETED";
		else if (index === current) state = status === "QUEUED" ? "QUEUED" : "RUNNING";
		if (meta.id === "decision" && skipAi && (state === "COMPLETED" || complete)) detail = "Deterministic scanner produced a confident verdict. Amazon Bedrock was not invoked.";
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
		if (meta.id === "decision" && job.decisionSource === "bedrock") detail = "Amazon Bedrock reasoned over ambiguous scanner evidence.";
		if (failed && index === current) detail = job.error ?? job.message ?? "Stage failed.";
		return {
			id: meta.id,
			title: meta.title,
			description: meta.description,
			state,
			detail
		};
	});
}
function resolveFailedIndex(job) {
	const stage = String(job.stage ?? "").toUpperCase().replace(/[\s-]/g, "_");
	if (stage && STATUS_INDEX[stage] !== void 0 && STATUS_INDEX[stage] >= 0) return STATUS_INDEX[stage];
	const blob = `${job.error ?? ""} ${job.buildStatus ?? ""} ${job.message ?? ""}`.toLowerCase();
	if (blob.includes("report")) return 6;
	if (blob.includes("health")) return 5;
	if (blob.includes("qemu") || blob.includes("valid")) return 4;
	if (blob.includes("deploy")) return 3;
	if (blob.includes("build")) return 2;
	if (blob.includes("bedrock") || blob.includes("decision")) return 1;
	return 0;
}
function architecturePath(job) {
	if (job.runtimeKind === "native_arm") return {
		nodes: [
			"ARM64 Container",
			"ARM64 Fargate",
			"Healthy Runtime",
			"Live Application"
		],
		caption: "Native ARM64 path — no emulation."
	};
	if (job.runtimeKind === "qemu") return {
		nodes: [
			"AMD64 Container",
			"ARM64 Graviton",
			"QEMU/binfmt",
			job.qemu?.status === "FAILED" ? "Validation failed" : "Healthy Runtime",
			"Live Application"
		],
		caption: "AMD64 image preserved and executed on Graviton through QEMU/binfmt."
	};
	if (job.runtimeKind === "fallback_x86") return {
		nodes: [
			"AMD64 Container",
			"ARM64 Graviton",
			"QEMU/binfmt",
			"Validation failed",
			"ECS Fargate X86_64",
			"Live Application"
		],
		caption: "QEMU was not viable. Policy fell back to native X86 infrastructure."
	};
	return {
		nodes: [
			"Repository",
			"Architecture Decision",
			"Build",
			"Runtime"
		],
		caption: "Awaiting architecture decision from the control plane."
	};
}
function errorCopy(job) {
	const blob = `${job.error ?? ""} ${job.message ?? ""} ${job.buildStatus ?? ""}`.toLowerCase();
	if (job.status !== "FAILED" && !job.error) return null;
	if (blob.includes("qemu")) return {
		title: "QEMU runtime validation failed.",
		detail: job.error ?? "The AMD64 image could not be validated on the Graviton host."
	};
	if (blob.includes("build")) return {
		title: "Container build failed.",
		detail: job.error ?? "The image build did not complete successfully."
	};
	if (blob.includes("health") || blob.includes("unhealthy")) return {
		title: "Deployment did not become healthy.",
		detail: job.error ?? "The runtime started but failed health checks."
	};
	if (blob.includes("repo") || blob.includes("github") || blob.includes("analy")) return {
		title: "Repository could not be analyzed.",
		detail: job.error ?? "ArchPilot could not clone or scan this repository."
	};
	if (job.status === "FAILED") return {
		title: "Deployment did not become healthy.",
		detail: job.error ?? job.message ?? "The job failed before a live runtime was established."
	};
	return null;
}
function useJob(jobId) {
	return useQuery({
		queryKey: ["job", jobId],
		queryFn: () => fetchJob(jobId),
		enabled: Boolean(jobId),
		refetchInterval: (query) => {
			const status = query.state.data?.status;
			if (isTerminal(String(status))) return false;
			return POLL_INTERVAL_MS;
		}
	});
}
//#endregion
export { RuntimeCard as a, errorCopy as c, LiveDeployment as i, useJob as l, BedrockReasoning as n, architecturePath as o, CostComparison as r, deriveStages as s, ArchitectureCard as t };
