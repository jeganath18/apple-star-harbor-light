import { DeploymentStage } from "@/components/deploy/deployment-stage";
import type { StageInfo } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DeploymentTimeline({ stages }: { stages: StageInfo[] }) {
  return (
    <ol className="relative flex flex-col gap-2">
      <span
        className="absolute top-4 bottom-4 left-[25px] w-px bg-border"
        aria-hidden="true"
      />
      {stages.map((stage) => (
        <li key={stage.id} className={cn("relative z-10")}>
          <DeploymentStage stage={stage} defaultOpen={stage.state === "RUNNING" || stage.state === "FAILED"} />
        </li>
      ))}
    </ol>
  );
}
