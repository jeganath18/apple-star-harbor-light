export function CostSection() {
  return (
    <section id="cost" className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-2xs font-medium tracking-wide text-infra uppercase">Cost intelligence</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight">
        Runtime-aware compute estimates, labeled as estimates.
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-card p-6 glow-infra">
          <p className="text-2xs tracking-wide text-muted uppercase">Graviton + QEMU</p>
          <p className="mt-4 font-mono text-5xl tracking-tight tabular">$8.18</p>
          <p className="mt-1 text-sm text-muted">/ month</p>
          <p className="mt-4 text-xs text-subtle">Illustrative compute estimate · t4g.small class</p>
        </div>
        <div className="rounded-lg bg-card p-6 shadow-border">
          <p className="text-2xs tracking-wide text-muted uppercase">Equivalent X86 infrastructure</p>
          <p className="mt-4 font-mono text-5xl tracking-tight text-muted tabular">$16.35</p>
          <p className="mt-1 text-sm text-muted">/ month</p>
          <p className="mt-4 text-xs text-subtle">Illustrative compute estimate · comparable x86 class</p>
        </div>
      </div>
      <p className="mt-6 font-mono text-sm text-infra">50% estimated compute difference</p>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-subtle">
        Illustrative compute estimate. Not a guaranteed AWS bill. Excludes load balancer, storage, data
        transfer, public IPv4, monitoring, and other AWS charges. Live deployments only show figures the
        control plane returns.
      </p>
    </section>
  );
}
