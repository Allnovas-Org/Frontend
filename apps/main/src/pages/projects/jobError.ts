import { getApiErrorMessage } from "../../utils/apiError";

export const getJobErrorMessage = (error: unknown, fallback: string): string => {
	const failure = error && typeof error === "object" ? error as { status?: number; data?: unknown } : {};
	if (failure.status === 401) return "Your session has expired. Please sign in again.";
	if (failure.status === 403) return "You are not allowed to manage this job.";
	if (failure.status === 404) return "This job was not found or is not available to your account.";
	if (failure.status === 409) {
		if (failure.data && typeof failure.data === "object") {
			const data = failure.data as { detail?: unknown; status?: unknown };
			if (typeof data.detail === "string" && data.detail.trim()) return data.detail;
			if (Array.isArray(data.status) && typeof data.status[0] === "string") return data.status[0];
		}
		return "This job has changed and the action cannot be completed. Refresh and try again.";
	}
	return getApiErrorMessage(error, fallback);
};
