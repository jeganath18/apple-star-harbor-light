import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as cn } from "./router-Dd4e0Vxu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/architecture-badge-Cmr4BUuw.js
var import_jsx_runtime = require_jsx_runtime();
function ArchitectureBadge({ label, tone = "muted", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-2xs tracking-wide uppercase", {
			arm: "text-infra bg-infra/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-infra)_30%,transparent)]",
			x86: "text-warning bg-warning/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-warning)_30%,transparent)]",
			qemu: "text-warning bg-warning/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-warning)_30%,transparent)]",
			fargate: "text-foreground bg-card-elevated shadow-border",
			muted: "text-muted bg-card-elevated shadow-border",
			ai: "text-ai bg-ai/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ai)_30%,transparent)]"
		}[tone], className),
		children: label
	});
}
//#endregion
export { ArchitectureBadge as t };
