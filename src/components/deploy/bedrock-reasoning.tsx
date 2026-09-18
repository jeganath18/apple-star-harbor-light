import { ArchitectureBadge } from "@/components/deploy/architecture-badge";
import { confidenceLabel } from "@/lib/format";
import type { Job } from "@/lib/types";

export function BedrockReasoning({ job }: { job: Job }) {
  const info = job.bedrock;
  if (!info?.invoked) {
    if (job.decisionSource === "deterministic") {
      return (
        <div className="rounded-lg bg-card p-4 shadow-border">
          <p className="text-2xs font-medium tracking-wide text-muted uppercase">AI architecture review</p>
          <p className="mt-3 text-sm text-foreground">Amazon Bedrock was not invoked.</p>
          <p className="mt-2 text-xs text-muted">
            The deterministic scanner produced a confident architecture verdict. Scanner evidence is treated
            as fact; Bedrock is reserved for ambiguous cases.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="rounded-lg bg-card p-4 glow-ai">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-2xs font-medium tracking-wide text-ai uppercase">AI architecture review</p>
          <p className="mt-1 font-mono text-xs text-muted">Amazon Bedrock · generated reasoning</p>
        </div>
        <ArchitectureBadge label="Bedrock" tone="ai" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Field label="Confidence" value={confidenceLabel(info.confidence ?? job.confidence)} />
        <Field label="Recommendation" value={info.recommendation ?? job.recommendedRuntime ?? "—"} />
        <Field label="Source" value="Amazon Bedrock" />
      </div>
      {info.explanation ? (
        <blockquote className="mt-4 border-l-2 border-ai/40 pl-3 text-sm leading-relaxed text-foreground">
          {info.explanation}
        </blockquote>
      ) : (
        <p className="mt-4 text-xs text-muted">No explanation payload was returned by the control plane.</p>
      )}
      {info.evidence.length > 0 ? (
        <List title="Evidence" items={info.evidence} />
      ) : null}
      {info.risks.length > 0 ? (
        <List title="Risks" items={info.risks} tone="warning" />
      ) : null}
      <p className="mt-4 text-2xs text-subtle">
        Scanner = evidence. Bedrock = reasoning. Policy = execution decision. This card is not a chatbot.
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xs tracking-wide text-subtle uppercase">{label}</p>
      <p className="mt-1 font-mono text-sm">{value}</p>
    </div>
  );
}

function List({ title, items, tone }: { title: string; items: string[]; tone?: "warning" }) {
  return (
    <div className="mt-4">
      <p className="text-2xs tracking-wide text-subtle uppercase">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className={tone === "warning" ? "text-xs text-warning" : "text-xs text-muted"}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
