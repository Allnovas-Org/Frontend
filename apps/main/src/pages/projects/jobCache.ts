import type { QueryClient } from "@tanstack/react-query";

export const invalidateClientJobQueries = async (
	queryClient: QueryClient,
	userId: string | undefined,
	refetchType: "active" | "none" = "active",
): Promise<void> => {
	await Promise.all([
		"client-job-summary", "client-recent-jobs", "client-jobs",
		"client-job-detail", "client-job-draft", "client-job-reuse",
	].map((key) => queryClient.invalidateQueries({ queryKey: [key, userId], refetchType })));
};
