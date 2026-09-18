const KEY = "archpilot.tracked-jobs";

export interface TrackedJob {
  jobId: string;
  repoUrl: string;
  createdAt: string;
}

function read(): TrackedJob[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is TrackedJob => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof (item as TrackedJob).jobId === "string"
      );
    });
  } catch {
    return [];
  }
}

function write(jobs: TrackedJob[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(jobs.slice(0, 100)));
}

export function listTrackedJobs(): TrackedJob[] {
  return read();
}

export function trackJob(job: TrackedJob) {
  const current = read().filter((item) => item.jobId !== job.jobId);
  write([job, ...current]);
}

export function untrackJob(jobId: string) {
  write(read().filter((item) => item.jobId !== jobId));
}
