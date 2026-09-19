import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as formatRelative, s as repoDisplay } from "./format-D-zwO8bu.mjs";
import { n as StatusBadge, r as jobStatusTone } from "./status-badge-TLtOGgl3.mjs";
import { t as Skeleton } from "./skeleton-ByubNcEx.mjs";
import { n as useJobs, t as EmptyState } from "./use-jobs-D-iRYDmp.mjs";
import { t as ConsolePage } from "./console-page-VxMP8OMb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-Bqyo5Cue.js
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const { data, isPending } = useJobs();
	const reports = (data ?? []).filter((j) => [
		"COMPLETED",
		"FAILED",
		"REPORTING"
	].includes(String(j.status).toUpperCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePage, {
		title: "Reports",
		context: "Explainable deployment reports",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 rounded-lg" }) : null,
				!isPending && reports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Deployment reports will appear here.",
					description: "Completed jobs publish an explainable report covering scanner evidence, Bedrock reasoning, runtime, and cost."
				}) : null,
				reports.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border overflow-hidden rounded-lg bg-card shadow-border",
					children: reports.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/reports/$jobId",
						params: { jobId: job.jobId },
						className: "flex flex-col gap-1 px-4 py-3 hover:bg-card-elevated sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm",
							children: repoDisplay(job.repository)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs text-muted",
							children: job.jobId
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
								label: String(job.status),
								tone: jobStatusTone(String(job.status))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-2xs text-subtle",
								children: formatRelative(job.completedAt ?? job.createdAt)
							})]
						})]
					}) }, job.jobId))
				}) : null
			]
		})
	});
}
//#endregion
export { ReportsPage as component };
