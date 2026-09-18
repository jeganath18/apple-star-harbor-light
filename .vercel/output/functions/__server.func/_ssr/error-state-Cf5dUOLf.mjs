import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as CircleAlert } from "../_libs/lucide-react.mjs";
import { l as Button, m as cn } from "./router-Bg95u4OA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/error-state-Cf5dUOLf.js
var import_jsx_runtime = require_jsx_runtime();
function ErrorState({ title, detail, onRetry, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: cn("flex flex-col gap-3 rounded-lg bg-card px-5 py-5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-danger)_28%,transparent)]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
				className: "mt-0.5 size-4 text-danger",
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-foreground",
					children: title
				}), detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-xs leading-relaxed text-muted",
					children: detail
				}) : null]
			})]
		}), onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			size: "sm",
			variant: "secondary",
			onClick: onRetry,
			children: "Retry"
		}) }) : null]
	});
}
//#endregion
export { ErrorState as t };
