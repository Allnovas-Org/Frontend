
import { clearAdminSession, getAdminSession } from "../auth/adminAuth";
import { AdminAuthenticationError } from "./adminDashboardApi";
import { adminApiUrl } from "./adminApiConfig";

const PROJECTS_URL = adminApiUrl("/api/v1/admin/student-projects/");

export type AdminStudentProject = {
  id: number | string;
  student: number | string;
  student_name: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  created_at: string;
  updated_at: string;
};

export type AdminStudentProjectsPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminStudentProject[];
};

export type FetchStudentProjectsOptions = {
  status: string;
  page: number;
  signal?: AbortSignal;
};

export async function fetchAdminStudentProjects(
  options: FetchStudentProjectsOptions
): Promise<AdminStudentProjectsPage> {
  const accessToken = getAdminSession()?.accessToken;

  if (!accessToken) {
    clearAdminSession();
    throw new AdminAuthenticationError();
  }

  const url = new URL(PROJECTS_URL);
  url.searchParams.set("page", String(options.page));

  if (options.status) {
    url.searchParams.set("status", options.status);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    signal: options.signal,
  });

  if (response.status === 401) {
    clearAdminSession();
    throw new AdminAuthenticationError();
  }

  if (!response.ok) {
    throw new Error(
      `Could not load student projects (HTTP ${response.status}).`
    );
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("results" in data) ||
    !Array.isArray(data.results) ||
    !("count" in data) ||
    typeof data.count !== "number"
  ) {
    throw new Error("Invalid student projects API response.");
  }

  return data as AdminStudentProjectsPage;
}
