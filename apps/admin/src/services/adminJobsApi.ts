import { clearAdminSession, getAdminSession } from "../auth/adminAuth";
import { AdminAuthenticationError } from "./adminDashboardApi";
import { adminApiUrl } from "./adminApiConfig";

const JOBS_URL = adminApiUrl("/api/v1/admin/jobs/");

export type AdminJob = {
  id: number | string;
  client_id: number | string;
  title: string;
  description: string;
  budget: number | string;
  currency: string;
  category: string;
  skills: string[];
  status: string;
  created_at: string;
  updated_at: string;
};

export type AdminJobsPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminJob[];
};

export type FetchAdminJobsOptions = {
  search: string;
  status: string;
  page: number;
  pageUrl?: string | null;
  signal?: AbortSignal;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAdminJob(value: unknown): value is AdminJob {
  return (
    isRecord(value) &&
    (typeof value.id === "number" || typeof value.id === "string") &&
    (typeof value.client_id === "number" || typeof value.client_id === "string") &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    (typeof value.budget === "number" || typeof value.budget === "string") &&
    typeof value.currency === "string" &&
    typeof value.category === "string" &&
    Array.isArray(value.skills) &&
    value.skills.every((skill) => typeof skill === "string") &&
    typeof value.status === "string" &&
    typeof value.created_at === "string" &&
    typeof value.updated_at === "string"
  );
}

function buildRequestUrl(options: FetchAdminJobsOptions): URL {
  const baseUrl = new URL(JOBS_URL);
  const url = options.pageUrl
    ? new URL(options.pageUrl, baseUrl)
    : new URL(baseUrl);

  if (url.origin !== baseUrl.origin || url.pathname !== baseUrl.pathname) {
    throw new Error("The jobs service returned an invalid pagination link.");
  }

  if (!options.pageUrl) {
    url.searchParams.set("page", String(options.page));
  }

  if (options.search.trim()) {
    url.searchParams.set("search", options.search.trim());
  } else {
    url.searchParams.delete("search");
  }

  if (options.status.trim()) {
    url.searchParams.set("status", options.status.trim());
  } else {
    url.searchParams.delete("status");
  }

  return url;
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const payload: unknown = await response.json();
    if (isRecord(payload)) {
      const message = payload.detail ?? payload.message;
      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  } catch {
    // Use the status-based message if the response body is empty or not JSON.
  }

  return `Could not load jobs (HTTP ${response.status}).`;
}

export async function fetchAdminJobs(
  options: FetchAdminJobsOptions
): Promise<AdminJobsPage> {
  const accessToken = getAdminSession()?.accessToken;
  if (!accessToken) {
    clearAdminSession();
    throw new AdminAuthenticationError();
  }

  const response = await fetch(buildRequestUrl(options), {
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
    throw new Error(await getErrorMessage(response));
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error("The jobs service returned an invalid response.");
  }

  if (
    !isRecord(payload) ||
    typeof payload.count !== "number" ||
    !Number.isInteger(payload.count) ||
    payload.count < 0 ||
    !(typeof payload.next === "string" || payload.next === null) ||
    !(typeof payload.previous === "string" || payload.previous === null) ||
    !Array.isArray(payload.results) ||
    !payload.results.every(isAdminJob)
  ) {
    throw new Error("The jobs service returned an invalid response.");
  }

  return {
    count: payload.count,
    next: payload.next,
    previous: payload.previous,
    results: payload.results,
  };
}
export type CreateAdminJobInput = {
  client: number;
  title: string;
  description: string;
  budget: number;
  currency: string;
  category: string;
  skills: string[];
};

export async function createAdminJob(
  data: CreateAdminJobInput
): Promise<void> {
  const accessToken = getAdminSession()?.accessToken;

  if (!accessToken) {
    clearAdminSession();
    throw new AdminAuthenticationError();
  }

  const response = await fetch(JOBS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    clearAdminSession();
    throw new AdminAuthenticationError();
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}
