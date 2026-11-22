import { clearAdminSession, getAdminSession } from "../auth/adminAuth";
import { AdminAuthenticationError } from "./adminDashboardApi";
import { adminApiUrl } from "./adminApiConfig";

const JOBS_URL = adminApiUrl("/api/v1/admin/jobs/");

export type AdminJob = {
  id: number | string;
  client_id: number | string;
  client_name?: string | null;
  client_email?: string | null;
  company_name?: string | null;
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

function isIdentifier(value: unknown): value is number | string {
  return typeof value === "number" || typeof value === "string";
}

function isOptionalText(value: unknown): value is string | null | undefined {
  return value === undefined || value === null || typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item): item is string => typeof item === "string")
  );
}

function parseAdminJob(value: unknown): AdminJob | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const clientId = value.client_id ?? value.client;
  if (
    !isIdentifier(value.id) ||
    !isIdentifier(clientId) ||
    typeof value.title !== "string" ||
    typeof value.description !== "string" ||
    (typeof value.budget !== "number" && typeof value.budget !== "string") ||
    typeof value.currency !== "string" ||
    typeof value.category !== "string" ||
    !isStringArray(value.skills) ||
    typeof value.status !== "string" ||
    typeof value.created_at !== "string" ||
    typeof value.updated_at !== "string" ||
    !isOptionalText(value.client_name) ||
    !isOptionalText(value.client_email) ||
    !isOptionalText(value.company_name)
  ) {
    return undefined;
  }

  return {
    id: value.id,
    client_id: clientId,
    client_name: value.client_name,
    client_email: value.client_email,
    company_name: value.company_name,
    title: value.title,
    description: value.description,
    budget: value.budget,
    currency: value.currency,
    category: value.category,
    skills: value.skills,
    status: value.status,
    created_at: value.created_at,
    updated_at: value.updated_at,
  };
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
    !Array.isArray(payload.results)
  ) {
    throw new Error("The jobs service returned an invalid response.");
  }

  const results = payload.results.map(parseAdminJob);
  if (!results.every((job): job is AdminJob => job !== undefined)) {
    throw new Error("The jobs service returned an invalid response.");
  }

  return {
    count: payload.count,
    next: payload.next,
    previous: payload.previous,
    results,
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
