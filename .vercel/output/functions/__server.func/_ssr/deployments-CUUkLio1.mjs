import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Button } from "./router-Bg95u4OA.mjs";
import { t as ErrorState } from "./error-state-Cf5dUOLf.mjs";
import { t as Skeleton } from "./skeleton-CUIN_GkB.mjs";
import { n as useJobs, t as EmptyState } from "./use-jobs-Sjdyr_9p.mjs";
import { t as ConsolePage } from "./console-page-W5JbJTaI.mjs";
import { n as RepositoryInput, t as DeploymentHistory } from "./repository-input-53NqagRV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deployments-CUUkLio1.js
var import_jsx_runtime = require_jsx_runtime();
function DeploymentsPage() {
	const { data, isPending, isError, error, refetch } = useJobs();
	const jobs = data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePage, {
		title: "Deployments",
		context: "Job history",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			variant: "secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/overview",
				children: "New deployment"
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepositoryInput, {}),
				isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full rounded-lg" }) : null,
				isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					title: "ArchPilot control plane is temporarily unavailable.",
					detail: error instanceof Error ? error.message : "Could not load deployments.",
					onRetry: () => refetch()
				}) : null,
				!isPending && !isError && jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No deployments yet.",
					description: "Deploy a GitHub repository to see your first architecture analysis."
				}) : null,
				jobs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeploymentHistory, { jobs }) : null
			]
		})
	});
}
//#endregion
export { DeploymentsPage as component };
