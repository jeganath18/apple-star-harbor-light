export function AiSection() {
  return (
    <section id="ai" className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-2xs font-medium tracking-wide text-ai uppercase">Reasoning</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight">
        AI reasoning where deterministic rules stop.
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        ArchPilot first uses deterministic scanning. Amazon Bedrock is used only when the evidence is
        ambiguous. The model never overrides a confident scanner verdict, and it never silently decides
        infrastructure.
      </p>
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        <article className="rounded-lg bg-card p-5 shadow-border">
          <p className="font-mono text-2xs tracking-wide text-infra uppercase">Scanner</p>
          <h3 className="mt-2 text-md font-medium">Deterministic evidence</h3>
          <p className="mt-2 text-sm text-muted">
            Dockerfiles, native modules, Go/CGO, documented platforms, lockfiles. Evidence is listed, not
            summarized away.
          </p>
        </article>
        <article className="rounded-lg bg-card p-5 glow-ai">
          <p className="font-mono text-2xs tracking-wide text-ai uppercase">Amazon Bedrock</p>
          <h3 className="mt-2 text-md font-medium">Ambiguity reasoning</h3>
          <p className="mt-2 text-sm text-muted">
            When signals conflict, Bedrock explains the risk of native ARM versus preserving AMD64. The
            explanation is labeled as AI-generated.
          </p>
        </article>
        <article className="rounded-lg bg-card p-5 shadow-border">
          <p className="font-mono text-2xs tracking-wide text-warning uppercase">Policy</p>
          <h3 className="mt-2 text-md font-medium">Explainable decision</h3>
          <p className="mt-2 text-sm text-muted">
            Policy maps the verdict onto a runtime: Fargate ARM64, Graviton + QEMU, or Fargate X86_64
            fallback.
          </p>
        </article>
      </div>
    </section>
  );
}
