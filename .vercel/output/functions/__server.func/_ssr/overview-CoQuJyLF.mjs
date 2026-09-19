import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Activity, b as Clock3, f as Landmark, v as Cpu } from "../_libs/lucide-react.mjs";
import { l as Button, m as cn } from "./router-Dd4e0Vxu.mjs";
import { a as formatUsd, n as formatDuration } from "./format-D-zwO8bu.mjs";
import { t as Skeleton } from "./skeleton-ByubNcEx.mjs";
import { n as useJobs, t as EmptyState } from "./use-jobs-D-iRYDmp.mjs";
import { t as ConsolePage } from "./console-page-VxMP8OMb.mjs";
import { n as RepositoryInput, t as DeploymentHistory } from "./repository-input-3-9NmxzH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/overview-CoQuJyLF.js
var import_jsx_runtime = require_jsx_runtime();
function MetricCard({ label, value, hint, icon, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-lg bg-card p-4 shadow-border", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs font-medium tracking-wide text-muted uppercase",
					children: label
				}), icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-subtle",
					children: icon
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-2xl tracking-tight text-foreground tabular",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
function OverviewPage() {
	const { data, isPending } = useJobs();
	const jobs = data ?? [];
	const active = jobs.filter((j) => !["COMPLETED", "FAILED"].includes(String(j.status).toUpperCase()));
	const completed = jobs.filter((j) => String(j.status).toUpperCase() === "COMPLETED");
	const durations = completed.map((j) => j.durationMs).filter((n) => typeof n === "number");
	const avg = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : void 0;
	const arm = jobs.filter((j) => j.runtimeKind === "native_arm" || j.verdict === "native_arm64").length;
	const qemu = jobs.filter((j) => j.runtimeKind === "qemu").length;
	const x86 = jobs.filter((j) => j.runtimeKind === "fallback_x86" || j.verdict === "x86_required").length;
	const savings = completed.map((j) => j.cost?.differenceMonthly).filter((n) => typeof n === "number");
	const savingsSum = savings.length ? savings.reduce((a, b) => a + b, 0) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePage, {
		title: "Overview",
		context: "Control plane",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/deployments",
				children: "View deployments"
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-card p-5 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xs font-medium tracking-wide text-muted uppercase",
							children: "Deploy a repository"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-lg font-medium tracking-tight",
							children: "Start an architecture-aware deployment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepositoryInput, { autoFocus: true })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Active deployments",
							value: isPending ? "—" : active.length,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Completed",
							value: isPending ? "—" : completed.length,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Avg duration",
							value: avg !== void 0 ? formatDuration(avg) : "—",
							hint: "Completed jobs only",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Estimated compute savings",
							value: savingsSum !== void 0 ? formatUsd(savingsSum) : "—",
							hint: "Sum of control-plane estimates · not a bill",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg bg-card p-4 shadow-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xs font-medium tracking-wide text-muted uppercase",
						children: "Architecture distribution"
					}), jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Distribution appears after the first real deployment."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-4 font-mono text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-infra",
								children: ["ARM64 native ", arm]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-warning",
								children: ["QEMU ", qemu]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: ["X86 required / fallback ", x86]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Recent deployments"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/deployments",
						className: "text-xs text-muted hover:text-foreground",
						children: "All deployments"
					})]
				}), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full rounded-lg" }) : jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No deployments yet.",
					description: "Deploy a GitHub repository to see your first architecture analysis."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeploymentHistory, { jobs: jobs.slice(0, 8) })] })
			]
		})
	});
}
//#endregion
export { OverviewPage as component };
