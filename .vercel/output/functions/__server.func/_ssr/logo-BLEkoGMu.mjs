import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as cn } from "./router-Bg95u4OA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-BLEkoGMu.js
var import_jsx_runtime = require_jsx_runtime();
function ArchPilotMark({ className, title = "ArchPilot" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-7", className),
		role: "img",
		"aria-label": title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "1.25",
				y: "1.25",
				width: "29.5",
				height: "29.5",
				rx: "7",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.5 20.5 16 8.5 23.5 20.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinejoin: "round",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11.4 16.2h9.2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.25",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16.2",
				r: "1.35",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10.2 20.5h11.6",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.25",
				strokeLinecap: "round",
				opacity: "0.7"
			})
		]
	});
}
function ArchPilotLogo({ className, markClassName, wordmark = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5 text-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchPilotMark, { className: markClassName }), wordmark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-semibold tracking-[-0.04em]",
			children: "ArchPilot"
		}) : null]
	});
}
//#endregion
export { ArchPilotLogo as t };
