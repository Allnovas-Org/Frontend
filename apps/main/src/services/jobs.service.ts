import { api } from "../lib/axios";

export interface ApiJob {
  id: string;
  title: string;
  description: string;
  budget: string;
  currency: string;
  category: string;
  budget_type: "fixed" | "hourly";
  duration: string;
  experience_level: string;
  freelancers_needed: number;
  skills: string[];
  status: "open" | "in_progress" | "completed" | "cancelled";
  client_name: string;
  company_name: string | null;
  applications_count: number;
  created_at: string;
}

export interface Page<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface JobQuery {
  search?: string;
  category?: string;
  min_budget?: number;
  max_budget?: number;
  page?: number;
  page_size?: number;
  experience_level?: string;
  budget_type?: string;
}

export interface ProposalPayload {
  job_id: string;
  cover_letter: string;
  proposed_budget: string;
  proposed_duration_days: number;
  proposal_details: {
    compensation_type: "fixed" | "milestone";
    milestones: { title: string; due_date: string; amount: string }[];
  };
}

export interface JobApplication {
  id: string;
  job: string;
  freelancer_id: string;
  freelancer_name: string;
  cover_letter: string;
  proposed_budget: string;
  proposed_duration_days: number;
  proposal_details: {
    compensation_type?: "fixed" | "milestone";
    milestones?: { title: string; due_date: string; amount: string }[];
  };
  status: "submitted" | "shortlisted" | "hired" | "rejected" | "withdrawn";
  created_at: string;
  updated_at: string;
}

export const listJobs = async (
  query: JobQuery = {},
  signal?: AbortSignal,
): Promise<Page<ApiJob>> => {
  const { data } = await api.get<Page<ApiJob>>("/jobs/jobs/", {
    params: { page_size: 16, ...query },
    signal,
  });
  return data;
};

export const getJob = async (id: string): Promise<ApiJob> => {
  const { data } = await api.get<ApiJob>(`/jobs/jobs/${id}/`);
  return data;
};

export const submitProposal = async (
  proposal: ProposalPayload,
): Promise<JobApplication> => {
  const { data } = await api.post<JobApplication>("/jobs/applications/", proposal);
  return data;
};

export const listJobApplications = async (
  jobId: string,
): Promise<Page<JobApplication>> => {
  const { data } = await api.get<Page<JobApplication>>("/jobs/applications/", {
    params: { job_id: jobId, page_size: 100 },
  });
  return data;
};

export const getMyJobProposal = async (
  jobId: string,
): Promise<JobApplication | null> => {
  const { results } = await listJobApplications(jobId);
  return results[0] || null;
};

export const setApplicationStatus = async (
  id: string,
  status: JobApplication["status"],
) => {
  const { data } = await api.patch<JobApplication>(
    `/jobs/applications/${id}/status/`,
    { status },
  );
  return data;
};

export const updateProposal = async (
  id: string,
  proposal: Partial<ProposalPayload>,
): Promise<JobApplication> => {
  const { data } = await api.patch<JobApplication>(
    `/jobs/applications/${id}/`,
    proposal,
  );
  return data;
};

export const updateProposalStatus = async (
  id: string,
  status: "withdrawn" | "shortlisted" | "hired" | "rejected",
) => {
  const { data } = await api.patch(`/jobs/applications/${id}/status/`, { status });
  return data;
};

export const deleteJob = async (id: string) => {
  await api.delete(`/jobs/jobs/${id}/`);
};

export const updateJob = async (
  id: string,
  patch: Partial<
    Pick<
      ApiJob,
      | "title"
      | "description"
      | "budget"
      | "budget_type"
      | "duration"
      | "experience_level"
      | "freelancers_needed"
      | "category"
      | "skills"
    >
  >,
) => {
  const { data } = await api.patch(`/jobs/jobs/${id}/`, patch);
  return data as ApiJob;
};

export const createJob = async (job: {
  title: string;
  description: string;
  budget: string;
  currency: string;
  budget_type: "fixed" | "hourly";
  duration: string;
  experience_level: string;
  freelancers_needed: number;
  category: string;
  skills: string[];
}) => {
  const { data } = await api.post("/jobs/jobs/", job);
  return data as ApiJob;
};
