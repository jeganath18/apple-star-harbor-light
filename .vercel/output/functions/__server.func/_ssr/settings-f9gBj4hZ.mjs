import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as AWS_REGION_FULL, i as AWS_REGION } from "./router-Dd4e0Vxu.mjs";
import { o as getApiBase } from "./app-shell-BKzqlqf6.mjs";
import { t as ConsolePage } from "./console-page-VxMP8OMb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-f9gBj4hZ.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const api = getApiBase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePage, {
		title: "Settings",
		context: "Control plane",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-3xl flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg bg-card p-5 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: "Region"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-sm",
							children: AWS_REGION_FULL
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-xs text-muted",
							children: AWS_REGION
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg bg-card p-5 shadow-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "API endpoint"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 break-all font-mono text-xs text-muted",
						children: api ?? "VITE_API_BASE_URL is not set. Deploy and job polling cannot reach the control plane."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg bg-card p-5 shadow-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Operator"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "This console is a control-plane client. It does not mint AWS resource IDs, cost figures, or runtime outcomes locally."
					})]
				})
			]
		})
	});
}
//#endregion
export { SettingsPage as component };
