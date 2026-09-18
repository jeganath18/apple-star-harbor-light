import { useQuery } from "@tanstack/react-query";
import { fetchJob } from "@/lib/api";
import { isTerminal } from "@/lib/job-derive";
import { POLL_INTERVAL_MS } from "@/lib/constants";

export function useJob(jobId: string) {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJob(jobId),
    enabled: Boolean(jobId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (isTerminal(String(status))) return false;
      return POLL_INTERVAL_MS;
    },
  });
}
