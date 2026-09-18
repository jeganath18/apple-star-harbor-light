import { Box, Cpu, FileText, GitBranch, HeartPulse, Scale, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Connect Repository",
    copy: "Point ArchPilot at a public GitHub URL. The control plane clones the tree and fingerprints the build surface.",
    icon: GitBranch,
  },
  {
    n: "02",
    title: "Analyze Architecture",
    copy: "A deterministic scanner inspects Dockerfiles, native deps, lockfiles, and documented build targets.",
    icon: Cpu,
  },
  {
    n: "03",
    title: "Reason About Ambiguity",
    copy: "When evidence conflicts, Amazon Bedrock is asked to reason — never to invent a platform.",
    icon: Scale,
  },
  {
    n: "04",
    title: "Build Correct Image",
    copy: "linux/arm64 when the workload is native. linux/amd64 when x86 is required. The image is pushed to ECR.",
    icon: Box,
  },
  {
    n: "05",
    title: "Validate Runtime",
    copy: "AMD64 images attempted on Graviton go through QEMU/binfmt. Success is measured, not assumed.",
    icon: ShieldCheck,
  },
  {
    n: "06",
    title: "Deploy",
    copy: "Native ARM lands on ECS Fargate ARM64. Failed QEMU paths fall back to ECS Fargate X86_64.",
    icon: HeartPulse,
  },
  {
    n: "07",
    title: "Generate Report",
    copy: "Every decision, resource, runtime path, and compute estimate is written into an explainable report.",
    icon: FileText,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-2xs font-medium tracking-wide text-infra uppercase">How it works</p>
      <h2 className="mt-2 max-w-xl text-3xl font-medium tracking-tight">
        Seven steps from repository to a runtime that actually fits.
      </h2>
      <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <article key={step.n} className="rounded-lg bg-card p-5 shadow-border">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-infra">{step.n}</span>
                <Icon className="size-4 text-subtle" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-md font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
