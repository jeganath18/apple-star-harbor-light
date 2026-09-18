import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as repoDisplay } from "./format-D-zwO8bu.mjs";
import { t as ArchitectureBadge } from "./architecture-badge-no06e0ju.mjs";
import { t as Skeleton } from "./skeleton-CUIN_GkB.mjs";
import { n as useJobs, t as EmptyState } from "./use-jobs-Sjdyr_9p.mjs";
import { t as ConsolePage } from "./console-page-W5JbJTaI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-CNfU6GQe.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	const { data, isPending } = useJobs();
	const jobs = data ?? [];
	const groups = /* @__PURE__ */ new Map();
	for (const job of jobs) {
		const key = repoDisplay(job.repository);
		const list = groups.get(key) ?? [];
		list.push(job);
		groups.set(key, list);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePage, {
		title: "Projects",
		context: "Repositories observed by ArchPilot",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 rounded-lg" }) : null, !isPending && groups.size === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No projects yet.",
				description: "Deploy a GitHub repository to register it as a project in this console."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [...groups.entries()].map(([repo, list]) => {
					const latest = list[0];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/deployments/$jobId",
						params: { jobId: latest.jobId },
						className: "rounded-lg bg-card p-4 shadow-border transition-[box-shadow] duration-150 hover:shadow-border-hover",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm",
								children: repo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [
									list.length,
									" deployment",
									list.length === 1 ? "" : "s"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
									label: latest.verdict === "unknown" ? "undecided" : latest.verdict,
									tone: latest.verdict === "native_arm64" ? "arm" : "x86"
								}), latest.runtimeMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
									label: latest.runtimeMode,
									tone: "muted"
								}) : null]
							})
						]
					}, repo);
				})
			})]
		})
	});
}
//#endregion
export { ProjectsPage as component };
