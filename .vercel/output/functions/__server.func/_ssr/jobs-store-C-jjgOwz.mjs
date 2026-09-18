//#region node_modules/.nitro/vite/services/ssr/assets/jobs-store-C-jjgOwz.js
var KEY = "archpilot.tracked-jobs";
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((item) => {
			return typeof item === "object" && item !== null && typeof item.jobId === "string";
		});
	} catch {
		return [];
	}
}
function write(jobs) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY, JSON.stringify(jobs.slice(0, 100)));
}
function listTrackedJobs() {
	return read();
}
function trackJob(job) {
	write([job, ...read().filter((item) => item.jobId !== job.jobId)]);
}
//#endregion
export { trackJob as n, listTrackedJobs as t };
