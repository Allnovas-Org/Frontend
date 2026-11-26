export interface ApiFailure {
	message?: string;
	status?: number;
	data?: unknown;
	retryAfterSeconds?: number;
}

export const hasRetryAfter = (error: unknown): boolean => {
	const failure =
		error && typeof error === "object" ? (error as ApiFailure) : {};
	return (
		typeof failure.retryAfterSeconds === "number" &&
		Number.isFinite(failure.retryAfterSeconds) &&
		failure.retryAfterSeconds >= 0
	);
};

export const getRetryAfterSeconds = (error: unknown): number => {
	const failure =
		error && typeof error === "object" ? (error as ApiFailure) : {};
	return typeof failure.retryAfterSeconds === "number" &&
		Number.isFinite(failure.retryAfterSeconds)
		? Math.max(0, Math.ceil(failure.retryAfterSeconds))
		: 0;
};

export const getApiErrorMessage = (
	error: unknown,
	fallback: string,
): string => {
	const failure =
		error && typeof error === "object" ? (error as ApiFailure) : {};
	if (failure.status === 429) {
		const retryAfter = getRetryAfterSeconds(error);
		return retryAfter
			? `Too many attempts. Please try again in ${retryAfter} seconds.`
			: "Too many attempts. Please wait before trying again.";
	}
	if (failure.status === 400) {
		return failure.message || "Please check the information and try again.";
	}
	if (failure.status === 401) {
		return failure.message || "The code or credentials are invalid or expired.";
	}
	if (failure.status === 403) {
		return failure.message || "You are not allowed to perform this action.";
	}
	return failure.message || fallback;
};

export const getGenericAuthErrorMessage = (
	error: unknown,
	fallback: string,
): string => {
	const failure =
		error && typeof error === "object" ? (error as ApiFailure) : {};
	if (failure.status === 429) {
		return getApiErrorMessage(error, fallback);
	}
	return fallback;
};
