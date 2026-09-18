import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Check, c as Minus, n as TriangleAlert, u as LoaderCircle, x as CircleAlert } from "../_libs/lucide-react.mjs";
import { m as cn } from "./router-Bg95u4OA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-Z54TO3dD.js
var import_jsx_runtime = require_jsx_runtime();
var TONE = {
	success: "text-success bg-success/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-success)_28%,transparent)]",
	warning: "text-warning bg-warning/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-warning)_28%,transparent)]",
	danger: "text-danger bg-danger/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-danger)_28%,transparent)]",
	infra: "text-infra bg-infra/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-infra)_28%,transparent)]",
	ai: "text-ai bg-ai/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ai)_28%,transparent)]",
	muted: "text-muted bg-card-elevated shadow-border"
};
function StatusBadge({ label, tone = "muted", pulse = false, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-2xs tracking-wide uppercase", TONE[tone], className),
		children: [pulse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative flex size-1.5",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-pulse-dot rounded-full bg-current" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-1.5 rounded-full bg-current",
			"aria-hidden": "true"
		}), label]
	});
}
function StageIcon({ state }) {
	if (state === "COMPLETED") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
		className: "size-3.5 text-success",
		"aria-hidden": "true"
	});
	if (state === "RUNNING") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		className: "size-3.5 animate-spin text-infra",
		"aria-hidden": "true"
	});
	if (state === "FAILED") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
		className: "size-3.5 text-danger",
		"aria-hidden": "true"
	});
	if (state === "WARNING") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
		className: "size-3.5 text-warning",
		"aria-hidden": "true"
	});
	if (state === "SKIPPED") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
		className: "size-3.5 text-subtle",
		"aria-hidden": "true"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block size-2 rounded-full bg-subtle/50",
		"aria-hidden": "true"
	});
}
function jobStatusTone(status) {
	const s = (status ?? "").toUpperCase();
	if (s === "COMPLETED" || s === "SUCCEEDED") return "success";
	if (s === "FAILED" || s === "ERROR") return "danger";
	if (s.includes("VALIDAT") || s.includes("FALLBACK") || s === "DECIDED") return "warning";
	if (s === "AI_ANALYSIS") return "ai";
	if (s === "QUEUED") return "muted";
	return "infra";
}
//#endregion
export { StatusBadge as n, jobStatusTone as r, StageIcon as t };
