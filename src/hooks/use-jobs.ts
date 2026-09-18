import { useQuery } from "@tanstack/react-query";
import { fetchJob, fetchJobs } from "@/lib/api";
import { listTrackedJobs } from "@/lib/jobs-store";
import type { Job } from "@/lib/types";

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async (): Promise<Job[]> => {
      let remote: Job[] = [];
      try {
        remote = await fetchJobs();
      } catch {
        remote = [];
      }
      const tracked = listTrackedJobs();
      const missing = tracked.filter((t) => !remote.some((j) => j.jobId === t.jobId));
      const extras: Array<Job | null> = await Promise.all(
        missing.map(async (item) => {
          try {
            const job = await fetchJob(item.jobId);
            return {
              ...job,
              repository: job.repository ?? item.repoUrl,
              createdAt: job.createdAt ?? item.createdAt,
            } satisfies Job;
          } catch {
            return null;
          }
        }),
      );
      const merged = [...extras.filter((j): j is Job => j !== null), ...remote];
      const seen = new Set<string>();
      return merged.filter((job) => {
        if (seen.has(job.jobId)) return false;
        seen.add(job.jobId);
        return true;
      });
    },
    refetchInterval: 8_000,
  });
}
