import { api } from "../lib/axios";

export type ClientJobStatus = "draft" | "open" | "in_progress" | "completed" | "cancelled";
export type JobBudgetType = "fixed" | "hourly";
export type JobDuration = "less_than_1_month" | "1_to_3_months" | "3_to_6_months";
export type JobExperience = "entry" | "intermediate" | "expert";

export interface ClientJob {
	id: string;
	title: string;
	description: string;
	budget: string | null;
	currency: string;
	category: string;
	skills: unknown;
	status: ClientJobStatus;
	created_at: string;
	updated_at: string;
	freelancers_needed: number | null;
	budget_type: JobBudgetType | null;
	project_duration: JobDuration | null;
	experience_level: JobExperience | null;
	published_at: string | null;
}

export interface DraftJobPayload {
	title: string;
	description: string;
	category: string;
	skills: string[];
	freelancers_needed: number | null;
	budget_type: JobBudgetType | null;
	budget: string | null;
	currency: string;
	project_duration: JobDuration | null;
	experience_level: JobExperience | null;
}

export interface PublishedJobPayload extends DraftJobPayload {
	freelancers_needed: number;
	budget_type: JobBudgetType;
	budget: string;
	project_duration: JobDuration;
	experience_level: JobExperience;
}

export interface ClientJobSummary {
	total_posted: number;
	total_completed: number;
	total_open: number;
	total_in_progress: number;
	total_cancelled: number;
}

export interface ClientJobPage {
	count: number;
	next: string | null;
	previous: string | null;
	results: ClientJob[];
}

const summaryFields: (keyof ClientJobSummary)[] = [
	"total_posted", "total_completed", "total_open", "total_in_progress", "total_cancelled",
];

const statusLabels: Record<ClientJobStatus, string> = {
	draft: "Draft",
	open: "Open",
	in_progress: "In Progress",
	completed: "Completed",
	cancelled: "Cancelled",
};

export const isClientJobStatus = (value: string): value is ClientJobStatus =>
	Object.hasOwn(statusLabels, value);

export const jobStatusLabel = (status: ClientJobStatus): string =>
	statusLabels[status] || status.replace(/_/g, " ");

export const jobDate = (value: string): string => {
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? "Date unavailable"
		: new Intl.DateTimeFormat(undefined, {
				day: "numeric",
				month: "short",
				year: "numeric",
				timeZone: "UTC",
			}).format(date);
};

export const jobBudget = (job: ClientJob): string =>
	job.budget === null ? "Budget not provided" : `${job.currency} ${job.budget}${job.budget_type === "hourly" ? " / hour" : ""}`;

export const jobDuration = (duration: JobDuration | null): string => {
	switch (duration) {
		case "less_than_1_month": return "Less than 1 month";
		case "1_to_3_months": return "1 – 3 months";
		case "3_to_6_months": return "3 – 6 months";
		default: return "Duration not provided";
	}
};

export const getClientJob = async (id: string): Promise<ClientJob> => {
	const { data } = await api.get<ClientJob>(`/client/jobs/${encodeURIComponent(id)}/`);
	if (!data || data.id !== id) {
		throw new Error("Could not read this job.");
	}
	return data;
};

const ensureJobCanPrefill = (job: ClientJob): ClientJob => {
	if (!/^[A-Z]{3}$/.test(job.currency)) {
		throw new Error("This job's currency could not be read safely.");
	}
	if (!Array.isArray(job.skills) || !job.skills.every((skill) => typeof skill === "string")) {
		throw new Error("This job's skills could not be read safely.");
	}
	if ((job.budget_type !== null && !["fixed", "hourly"].includes(job.budget_type)) ||
		(job.project_duration !== null && !["less_than_1_month", "1_to_3_months", "3_to_6_months"].includes(job.project_duration)) ||
		(job.experience_level !== null && !["entry", "intermediate", "expert"].includes(job.experience_level))) {
		throw new Error("This job contains values that cannot be edited in this form.");
	}
	return job;
};

export const getOwnedEditableJob = async (id: string): Promise<ClientJob> => {
	const job = await getClientJob(id);
	if (job.status !== "draft" && job.status !== "open") {
		throw new Error("Only draft and open jobs can be edited.");
	}
	return ensureJobCanPrefill(job);
};

export const getReusableClientJob = async (id: string): Promise<ClientJob> =>
	ensureJobCanPrefill(await getClientJob(id));

export const createClientJob = async (payload: PublishedJobPayload): Promise<ClientJob> =>
	(await api.post<ClientJob>("/jobs/jobs/", payload)).data;

export const createClientJobDraft = async (payload: DraftJobPayload): Promise<ClientJob> =>
	(await api.post<ClientJob>("/jobs/jobs/drafts/", payload)).data;

export const updateClientJob = async (id: string, payload: DraftJobPayload): Promise<ClientJob> =>
	(await api.patch<ClientJob>(`/jobs/jobs/${encodeURIComponent(id)}/`, payload)).data;

export const publishClientJobDraft = async (id: string): Promise<ClientJob> =>
	(await api.post<ClientJob>(`/jobs/jobs/${encodeURIComponent(id)}/publish/`)).data;

export const cancelClientJob = async (id: string): Promise<ClientJob> => {
	const { data } = await api.post<ClientJob>(`/jobs/jobs/${encodeURIComponent(id)}/cancel/`);
	if (!data || data.id !== id || data.status !== "cancelled") {
		throw new Error("The cancellation could not be confirmed.");
	}
	return data;
};

export const deleteClientJobDraft = async (id: string): Promise<void> => {
	const response = await api.delete(`/jobs/jobs/${encodeURIComponent(id)}/`);
	if (response.status !== 204) throw new Error("The deletion could not be confirmed.");
};

export const getClientJobSummary = async (): Promise<ClientJobSummary> => {
	const { data } = await api.get<ClientJobSummary>("/client/jobs/summary/");
	if (
		!data ||
		!summaryFields.every((key) => Number.isInteger(data[key]) && data[key] >= 0)
	) {
		throw new Error("Could not read your job statistics.");
	}
	return data;
};

export const getClientJobs = async (
	page: number,
	status: ClientJobStatus | "",
): Promise<ClientJobPage> => {
	const { data } = await api.get<ClientJobPage>("/client/jobs/", {
		params: { page, page_size: 10, ...(status ? { status } : {}) },
	});
	if (
		!data ||
		!Array.isArray(data.results) ||
		!Number.isInteger(data.count) ||
		data.count < 0 ||
		(data.next !== null && typeof data.next !== "string") ||
		(data.previous !== null && typeof data.previous !== "string")
	) {
		throw new Error("Could not read your job history.");
	}
	return data;
};

export const getRecentClientJobs = async (): Promise<ClientJob[]> => {
	const { data } = await api.get<ClientJob[]>("/client/jobs/recent/");
	if (!Array.isArray(data) || data.length > 5) {
		throw new Error("Could not read your recent jobs.");
	}
	return data;
};
