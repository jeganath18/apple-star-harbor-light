function Path({ title, steps, note, tone }: { title: string; steps: string[]; note: string; tone: "arm" | "qemu" | "fallback" }) {
  const ring =
    tone === "arm" ? "glow-infra" : tone === "qemu" ? "glow-warning" : "shadow-border";
  return (
    <article className={`rounded-lg bg-card p-5 ${ring}`}>
      <p className="text-2xs font-medium tracking-wide text-muted uppercase">{title}</p>
      <ol className="mt-4 space-y-0">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col items-start">
            <span className="rounded-sm bg-background px-2.5 py-1 font-mono text-xs shadow-border">
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span className="ml-3 h-4 w-px bg-border" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-muted">{note}</p>
    </article>
  );
}

export function ArchitectureSection() {
  return (
    <section id="architecture" className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-2xs font-medium tracking-wide text-infra uppercase">Runtime paths</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight">
        Three honest paths. QEMU is an attempt, not a guarantee.
      </h2>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <Path
          tone="arm"
          title="ARM64 native"
          steps={["Repository", "ARM64-compatible", "linux/arm64", "ECS Fargate ARM64", "Live"]}
          note="When the scanner can prove ARM64 compatibility, ArchPilot builds and deploys natively. No emulation."
        />
        <Path
          tone="qemu"
          title="X86 on Graviton via QEMU"
          steps={[
            "Repository",
            "x86_64 required",
            "linux/amd64",
            "Graviton ARM64",
            "QEMU/binfmt",
            "Runtime Validation",
            "Live",
          ]}
          note="The AMD64 image is preserved and executed on a Graviton host through QEMU/binfmt. Validation must succeed."
        />
        <Path
          tone="fallback"
          title="QEMU failure fallback"
          steps={["QEMU failure", "ECS Fargate X86_64", "Live"]}
          note="If QEMU runtime validation fails, policy automatically places the same AMD64 image on ECS Fargate X86_64."
        />
      </div>
    </section>
  );
}
