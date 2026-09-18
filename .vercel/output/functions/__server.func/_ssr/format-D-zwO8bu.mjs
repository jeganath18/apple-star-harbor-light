import { n as formatDistanceToNowStrict, t as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-D-zwO8bu.js
function formatJobId(id) {
	if (!id) return "—";
	return id;
}
function repoDisplay(url) {
	if (!url) return "unknown repository";
	try {
		return new URL(url).pathname.replace(/^\//, "").replace(/\.git$/, "").replace(/\/$/, "");
	} catch {
		return url.replace(/^https?:\/\//, "").replace(/\.git$/, "");
	}
}
function formatDuration(ms) {
	if (ms === void 0 || !Number.isFinite(ms) || ms < 0) return "—";
	if (ms < 1e3) return `${Math.round(ms)}ms`;
	const seconds = ms / 1e3;
	if (seconds < 60) return `${seconds.toFixed(seconds < 10 ? 1 : 0)}s`;
	const m = Math.floor(seconds / 60);
	const s = Math.round(seconds % 60);
	return s ? `${m}m ${s}s` : `${m}m`;
}
function formatRelative(iso) {
	if (!iso) return "—";
	try {
		const d = parseISO(iso);
		if (Number.isNaN(d.getTime())) return iso;
		return formatDistanceToNowStrict(d, { addSuffix: true });
	} catch {
		return iso;
	}
}
function formatPercent(value) {
	if (value === void 0 || !Number.isFinite(value)) return "—";
	const pct = value <= 1 ? value * 100 : value;
	return `${Math.round(pct)}%`;
}
function formatUsd(value, digits = 2) {
	if (value === void 0 || !Number.isFinite(value)) return "—";
	return `$${value.toFixed(digits)}`;
}
function lastUpdatedLabel(updatedAt) {
	const delta = Math.max(0, Math.round((Date.now() - updatedAt) / 1e3));
	if (delta <= 1) return "Last updated just now";
	return `Last updated ${delta}s ago`;
}
function confidenceLabel(value) {
	return formatPercent(value);
}
//#endregion
export { formatUsd as a, formatRelative as i, formatDuration as n, lastUpdatedLabel as o, formatJobId as r, repoDisplay as s, confidenceLabel as t };
