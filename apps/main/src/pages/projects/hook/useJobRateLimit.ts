import { useEffect, useState } from "react";
import { getRetryAfterSeconds, hasRetryAfter } from "../../../utils/apiError";

type QueryFailure = { error: unknown; errorUpdatedAt: number };

export const useJobRateLimit = (queries: QueryFailure[]) => {
	const deadline = Math.max(0, ...queries.map(({ error, errorUpdatedAt }) => {
		if (!error || typeof error !== "object" || !("status" in error) || error.status !== 429) return 0;
		return hasRetryAfter(error) ? errorUpdatedAt + getRetryAfterSeconds(error) * 1000 : Infinity;
	}));
	const [, setNow] = useState(Date.now);
	useEffect(() => {
		if (!deadline || deadline === Infinity || deadline <= Date.now()) return;
		const timer = window.setInterval(() => {
			const current = Date.now();
			setNow(current);
			if (current >= deadline) window.clearInterval(timer);
		}, 1000);
		return () => window.clearInterval(timer);
	}, [deadline]);
	const remaining = deadline === Infinity ? 0 : Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
	return { blocked: deadline === Infinity || deadline > Date.now(), remaining, unavailable: deadline === Infinity };
};
