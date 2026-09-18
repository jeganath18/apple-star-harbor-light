import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as ArrowRight, m as Github, u as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as Button, m as cn, s as GITHUB_REPO_PATTERN } from "./router-Bg95u4OA.mjs";
import { r as createJob, t as ApiError } from "./app-shell-CQ71g6o4.mjs";
import { i as formatRelative, n as formatDuration, s as repoDisplay } from "./format-D-zwO8bu.mjs";
import { t as ArchitectureBadge } from "./architecture-badge-no06e0ju.mjs";
import { n as StatusBadge, r as jobStatusTone } from "./status-badge-Z54TO3dD.mjs";
import { n as trackJob } from "./jobs-store-C-jjgOwz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/repository-input-53NqagRV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeploymentHistory({ jobs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-lg bg-card shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden grid-cols-12 gap-3 px-4 py-2.5 text-2xs tracking-wide text-subtle uppercase md:grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "col-span-3",
					children: "Repository"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "col-span-2",
					children: "Job ID"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "col-span-1",
					children: "Arch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "col-span-2",
					children: "Runtime"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "col-span-1",
					children: "Status"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "col-span-1",
					children: "Duration"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "col-span-1",
					children: "Created"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "col-span-1",
					children: "Live"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border",
			children: jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/deployments/$jobId",
				params: { jobId: job.jobId },
				className: "grid grid-cols-1 gap-2 px-4 py-3 transition-colors duration-150 hover:bg-card-elevated md:grid-cols-12 md:items-center md:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-mono text-xs md:col-span-3",
						children: repoDisplay(job.repository)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-mono text-2xs text-muted md:col-span-2",
						children: job.jobId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "md:col-span-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureBadge, {
							label: job.containerArchitecture ?? (job.verdict === "native_arm64" ? "ARM64" : job.verdict === "x86_required" ? "AMD64" : "—"),
							tone: job.verdict === "native_arm64" ? "arm" : job.verdict === "x86_required" ? "x86" : "muted"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-2xs text-muted md:col-span-2",
						children: job.runtimeMode ?? job.recommendedRuntime ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "md:col-span-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
							label: String(job.status),
							tone: jobStatusTone(String(job.status))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-2xs text-muted tabular md:col-span-1",
						children: formatDuration(job.durationMs)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-2xs text-muted md:col-span-1",
						children: formatRelative(job.createdAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-2xs md:col-span-1",
						children: job.liveUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-success",
							children: "Live"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle",
							children: "—"
						})
					})
				]
			}) }, job.jobId))
		})]
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		ref,
		className: cn("flex h-11 w-full rounded-md bg-card-elevated px-3.5 font-mono text-sm text-foreground shadow-border", "placeholder:text-subtle", "transition-[box-shadow] duration-150", "hover:shadow-border-hover", "focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-infra)_70%,transparent),0_0_0_4px_color-mix(in_oklab,var(--color-infra)_18%,transparent)]", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
});
Input.displayName = "Input";
function RepositoryInput({ size = "default", className, autoFocus }) {
	const navigate = useNavigate();
	const [value, setValue] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const url = value.trim();
		if (!GITHUB_REPO_PATTERN.test(url)) {
			setError("Enter a GitHub repository URL, for example https://github.com/user/project");
			return;
		}
		setError(null);
		setPending(true);
		try {
			const created = await createJob(url);
			trackJob({
				jobId: created.jobId,
				repoUrl: url,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			toast.success("Deployment queued");
			await navigate({
				to: "/deployments/$jobId",
				params: { jobId: created.jobId }
			});
		} catch (err) {
			const shape = err instanceof ApiError ? err.shape : null;
			setError(shape?.detail ?? (err instanceof Error ? err.message : "The control plane rejected this repository."));
			toast.error(shape?.title ?? "Repository could not be analyzed.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: cn("w-full", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex flex-col gap-2 sm:flex-row sm:items-center", size === "hero" && "sm:gap-3"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "GitHub repository URL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {
						className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value,
						onChange: (e) => setValue(e.target.value),
						placeholder: "https://github.com/user/project",
						autoFocus,
						autoComplete: "off",
						spellCheck: false,
						className: cn("pl-10", size === "hero" && "h-12 text-sm"),
						"aria-invalid": Boolean(error)
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				size: size === "hero" ? "lg" : "default",
				disabled: pending,
				children: [pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" }), "Deploy Repository"]
			})]
		}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-mono text-xs text-danger",
			role: "alert",
			children: error
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-subtle",
			children: "ArchPilot clones the repository, scans architecture requirements, then deploys to the runtime that actually fits."
		})]
	});
}
//#endregion
export { RepositoryInput as n, DeploymentHistory as t };
