import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { m as cn } from "./router-Bg95u4OA.mjs";
import { a as fetchJobs, i as fetchJob } from "./app-shell-CQ71g6o4.mjs";
import { t as listTrackedJobs } from "./jobs-store-C-jjgOwz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-jobs-Sjdyr_9p.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ title, description, action, icon, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-start gap-3 rounded-lg bg-card px-5 py-8 shadow-border", className),
		children: [
			icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-subtle",
				children: icon
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-md font-medium tracking-tight",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-md text-sm text-muted",
				children: description
			}) : null] }),
			action
		]
	});
}
function useJobs() {
	return useQuery({
		queryKey: ["jobs"],
		queryFn: async () => {
			let remote = [];
			try {
				remote = await fetchJobs();
			} catch {
				remote = [];
			}
			const missing = listTrackedJobs().filter((t) => !remote.some((j) => j.jobId === t.jobId));
			const merged = [...(await Promise.all(missing.map(async (item) => {
				try {
					const job = await fetchJob(item.jobId);
					return {
						...job,
						repository: job.repository ?? item.repoUrl,
						createdAt: job.createdAt ?? item.createdAt
					};
				} catch {
					return null;
				}
			}))).filter((j) => j !== null), ...remote];
			const seen = /* @__PURE__ */ new Set();
			return merged.filter((job) => {
				if (seen.has(job.jobId)) return false;
				seen.add(job.jobId);
				return true;
			});
		},
		refetchInterval: 8e3
	});
}
//#endregion
export { useJobs as n, EmptyState as t };
