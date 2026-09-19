import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { T as Box, g as FileText, h as GitBranch, i as ShieldCheck, o as Scale, p as HeartPulse, v as Cpu } from "../_libs/lucide-react.mjs";
import { l as Button, m as cn } from "./router-Dd4e0Vxu.mjs";
import { t as ArchPilotLogo } from "./logo-DcoYVMvW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-4_vlATwN.js
var import_jsx_runtime = require_jsx_runtime();
function AiSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "ai",
		className: "mx-auto max-w-6xl px-4 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-ai uppercase",
				children: "Reasoning"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 max-w-2xl text-3xl font-medium tracking-tight",
				children: "AI reasoning where deterministic rules stop."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-sm leading-relaxed text-muted",
				children: "ArchPilot first uses deterministic scanning. Amazon Bedrock is used only when the evidence is ambiguous. The model never overrides a confident scanner verdict, and it never silently decides infrastructure."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg bg-card p-5 shadow-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wide text-infra uppercase",
								children: "Scanner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-md font-medium",
								children: "Deterministic evidence"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Dockerfiles, native modules, Go/CGO, documented platforms, lockfiles. Evidence is listed, not summarized away."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg bg-card p-5 glow-ai",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wide text-ai uppercase",
								children: "Amazon Bedrock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-md font-medium",
								children: "Ambiguity reasoning"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "When signals conflict, Bedrock explains the risk of native ARM versus preserving AMD64. The explanation is labeled as AI-generated."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg bg-card p-5 shadow-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xs tracking-wide text-warning uppercase",
								children: "Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-md font-medium",
								children: "Explainable decision"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Policy maps the verdict onto a runtime: Fargate ARM64, Graviton + QEMU, or Fargate X86_64 fallback."
							})
						]
					})
				]
			})
		]
	});
}
function Path({ title, steps, note, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `rounded-lg bg-card p-5 ${tone === "arm" ? "glow-infra" : tone === "qemu" ? "glow-warning" : "shadow-border"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-muted uppercase",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 space-y-0",
				children: steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-sm bg-background px-2.5 py-1 font-mono text-xs shadow-border",
						children: step
					}), i < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-3 h-4 w-px bg-border",
						"aria-hidden": "true"
					}) : null]
				}, step))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs leading-relaxed text-muted",
				children: note
			})
		]
	});
}
function ArchitectureSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "architecture",
		className: "mx-auto max-w-6xl px-4 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-infra uppercase",
				children: "Runtime paths"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 max-w-2xl text-3xl font-medium tracking-tight",
				children: "Three honest paths. QEMU is an attempt, not a guarantee."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Path, {
						tone: "arm",
						title: "ARM64 native",
						steps: [
							"Repository",
							"ARM64-compatible",
							"linux/arm64",
							"ECS Fargate ARM64",
							"Live"
						],
						note: "When the scanner can prove ARM64 compatibility, ArchPilot builds and deploys natively. No emulation."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Path, {
						tone: "qemu",
						title: "X86 on Graviton via QEMU",
						steps: [
							"Repository",
							"x86_64 required",
							"linux/amd64",
							"Graviton ARM64",
							"QEMU/binfmt",
							"Runtime Validation",
							"Live"
						],
						note: "The AMD64 image is preserved and executed on a Graviton host through QEMU/binfmt. Validation must succeed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Path, {
						tone: "fallback",
						title: "QEMU failure fallback",
						steps: [
							"QEMU failure",
							"ECS Fargate X86_64",
							"Live"
						],
						note: "If QEMU runtime validation fails, policy automatically places the same AMD64 image on ECS Fargate X86_64."
					})
				]
			})
		]
	});
}
var LAYERS = [
	{
		title: "Ingress",
		items: ["API Gateway", "AWS Lambda"]
	},
	{
		title: "Orchestration",
		items: ["AWS Step Functions", "Amazon Bedrock"]
	},
	{
		title: "Build & registry",
		items: ["Amazon ECR", "Amazon S3"]
	},
	{
		title: "Compute",
		items: [
			"Amazon ECS",
			"AWS Fargate",
			"Amazon EC2 Graviton",
			"QEMU/binfmt"
		]
	},
	{
		title: "State",
		items: ["Amazon DynamoDB", "Amazon S3 reports"]
	}
];
function AwsStack() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "aws",
		className: "mx-auto max-w-6xl px-4 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-infra uppercase",
				children: "AWS-native control plane"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 max-w-2xl text-3xl font-medium tracking-tight",
				children: "The path is orchestrated on AWS, not wrapped in a black box."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-3",
				children: LAYERS.map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 rounded-lg bg-card p-4 shadow-border md:grid-cols-[160px_1fr] md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xs tracking-wide text-subtle uppercase",
						children: layer.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: layer.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-sm bg-background px-2.5 py-1 font-mono text-xs shadow-border",
							children: item
						}, item))
					})]
				}, layer.title))
			})
		]
	});
}
function CostSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "cost",
		className: "mx-auto max-w-6xl px-4 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-infra uppercase",
				children: "Cost intelligence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 max-w-2xl text-3xl font-medium tracking-tight",
				children: "Runtime-aware compute estimates, labeled as estimates."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-card p-6 glow-infra",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xs tracking-wide text-muted uppercase",
							children: "Graviton + QEMU"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-mono text-5xl tracking-tight tabular",
							children: "$8.18"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "/ month"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-subtle",
							children: "Illustrative compute estimate · t4g.small class"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-card p-6 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xs tracking-wide text-muted uppercase",
							children: "Equivalent X86 infrastructure"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-mono text-5xl tracking-tight text-muted tabular",
							children: "$16.35"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "/ month"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-subtle",
							children: "Illustrative compute estimate · comparable x86 class"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-mono text-sm text-infra",
				children: "50% estimated compute difference"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-xs leading-relaxed text-subtle",
				children: "Illustrative compute estimate. Not a guaranteed AWS bill. Excludes load balancer, storage, data transfer, public IPv4, monitoring, and other AWS charges. Live deployments only show figures the control plane returns."
			})
		]
	});
}
function FinalCta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-6xl px-4 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-card px-6 py-14 text-center shadow-elevated md:px-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-medium tracking-tight md:text-4xl",
					children: "Your code shouldn't have to care which CPU runs it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-xl text-sm text-muted",
					children: "Analyze the repository, choose the honest runtime, validate it, and keep the AMD64 image when that is the correct answer."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/overview",
							children: "Deploy your first repository"
						})
					})
				})
			]
		})
	});
}
var STEPS$1 = [
	{
		n: "01",
		title: "Connect Repository",
		copy: "Point ArchPilot at a public GitHub URL. The control plane clones the tree and fingerprints the build surface.",
		icon: GitBranch
	},
	{
		n: "02",
		title: "Analyze Architecture",
		copy: "A deterministic scanner inspects Dockerfiles, native deps, lockfiles, and documented build targets.",
		icon: Cpu
	},
	{
		n: "03",
		title: "Reason About Ambiguity",
		copy: "When evidence conflicts, Amazon Bedrock is asked to reason — never to invent a platform.",
		icon: Scale
	},
	{
		n: "04",
		title: "Build Correct Image",
		copy: "linux/arm64 when the workload is native. linux/amd64 when x86 is required. The image is pushed to ECR.",
		icon: Box
	},
	{
		n: "05",
		title: "Validate Runtime",
		copy: "AMD64 images attempted on Graviton go through QEMU/binfmt. Success is measured, not assumed.",
		icon: ShieldCheck
	},
	{
		n: "06",
		title: "Deploy",
		copy: "Native ARM lands on ECS Fargate ARM64. Failed QEMU paths fall back to ECS Fargate X86_64.",
		icon: HeartPulse
	},
	{
		n: "07",
		title: "Generate Report",
		copy: "Every decision, resource, runtime path, and compute estimate is written into an explainable report.",
		icon: FileText
	}
];
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "how",
		className: "mx-auto max-w-6xl px-4 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs font-medium tracking-wide text-infra uppercase",
				children: "How it works"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 max-w-xl text-3xl font-medium tracking-tight",
				children: "Seven steps from repository to a runtime that actually fits."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3",
				children: STEPS$1.map((step) => {
					const Icon = step.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg bg-card p-5 shadow-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-infra",
									children: step.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4 text-subtle",
									"aria-hidden": "true"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-md font-medium tracking-tight",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: step.copy
							})
						]
					}, step.n);
				})
			})
		]
	});
}
function LandingNav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "ArchPilot",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchPilotLogo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-6 text-sm text-muted md:flex",
					"aria-label": "Product",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#how",
							className: "hover:text-foreground",
							children: "How it works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#architecture",
							className: "hover:text-foreground",
							children: "Architecture"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#ai",
							className: "hover:text-foreground",
							children: "Reasoning"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#cost",
							className: "hover:text-foreground",
							children: "Cost"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/overview",
							children: "Open console"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/overview",
							children: "Deploy a Repository"
						})
					})]
				})
			]
		})
	});
}
var STEPS = [
	"GitHub Repository",
	"Architecture Scanner",
	"Amazon Bedrock",
	"Architecture Decision",
	"Build",
	"Graviton / Fargate",
	"Runtime Validation",
	"Live Application"
];
function PipelineVisual() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-xl bg-card p-5 shadow-elevated",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-grid-fine opacity-60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative text-2xs font-medium tracking-wide text-muted uppercase",
				children: "Deployment pipeline"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative mt-4 space-y-0",
				children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-0.5 flex size-6 items-center justify-center rounded-sm font-mono text-2xs", i === STEPS.length - 1 ? "bg-success/15 text-success" : i === 2 ? "bg-ai/15 text-ai" : "bg-infra/10 text-infra"),
							children: String(i + 1).padStart(2, "0")
						}), i < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "2",
							height: "22",
							className: "my-1 overflow-visible text-border",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "1",
								y1: "0",
								x2: "1",
								y2: "22",
								stroke: "currentColor",
								strokeWidth: "1",
								className: "animate-flow text-infra/50"
							})
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-0.5 pb-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-foreground",
								children: step
							}),
							i === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xs text-ai",
								children: "Invoked only when evidence is ambiguous"
							}) : null,
							i === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xs text-muted",
								children: "QEMU/binfmt or native health"
							}) : null
						]
					})]
				}, step))
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-wash pointer-events-none absolute inset-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-grid pointer-events-none absolute inset-0 opacity-70" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-[0.18em] text-infra uppercase",
								children: "ArchPilot"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-3 max-w-xl text-4xl font-medium tracking-tight md:text-5xl",
								children: [
									"Deploy anywhere.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Run on the architecture that makes sense."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-md",
								children: "AI-assisted multi-architecture deployment for AWS. Analyze your repository, understand its architecture requirements, and deploy it to the most appropriate runtime."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/overview",
										children: "Deploy a Repository"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#architecture",
										children: "Explore Architecture"
									})
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineVisual, {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwsStack, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCta, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchPilotLogo, { markClassName: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono",
						children: "ap-south-1 · AWS-native control plane"
					})]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
