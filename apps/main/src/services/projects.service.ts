import { api } from "../lib/axios";
import { Page } from "./jobs.service";

export interface ApiMilestone {
  id: number;
  title: string;
  description: string;
  amount: string;
  due_date: string | null;
  status: "pending" | "in_progress" | "submitted" | "approved" | "revision_requested";
}

export interface ApiContract {
  id: number;
  project: string;
  terms: string;
  total_amount: string;
  currency: string;
  status: "active" | "completed" | "cancelled";
  milestones: ApiMilestone[];
}

export interface ApiProject {
  id: string;
  job: string | null;
  client: string;
  client_name: string;
  freelancer: string;
  freelancer_name: string;
  title: string;
  description: string;
  status: "active" | "on_hold" | "completed" | "cancelled";
  contract: ApiContract | null;
  created_at: string;
  updated_at: string;
}

export async function listProjects(
  page = 1,
  pageSize = 20,
): Promise<Page<ApiProject>> {
  const { data } = await api.get<Page<ApiProject>>("/projects/projects/", {
    params: { page, page_size: pageSize },
  });
  return data;
}

export async function getProject(id: string): Promise<ApiProject> {
  const { data } = await api.get<ApiProject>(`/projects/projects/${id}/`);
  return data;
}

export async function updateProjectStatus(
  id: string,
  status: ApiProject["status"],
): Promise<ApiProject> {
  const { data } = await api.patch<ApiProject>(
    `/projects/projects/${id}/status/`,
    { status },
  );
  return data;
}

export async function updateMilestoneStatus(
  id: number,
  status: ApiMilestone["status"],
): Promise<ApiMilestone> {
  const { data } = await api.patch<ApiMilestone>(
    `/projects/milestones/${id}/`,
    { status },
  );
  return data;
}
