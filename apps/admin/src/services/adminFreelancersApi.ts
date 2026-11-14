import { clearAdminSession, getAdminSession } from "../auth/adminAuth";
import { AdminAuthenticationError } from "./adminDashboardApi";

const FREELANCERS_URL = "https://allnovas.com/api/v1/admin/freelancers/";

export type AdminFreelancer = {
  id: number | string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  is_active: boolean;
  skills: string[] | string | null;
  title: string | null;
  shbio: string | null;
  bio: string | null;
};

export type AdminFreelancersPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminFreelancer[];
};

export type FetchAdminFreelancersOptions = {
  search: string;
  active: "" | "true" | "false";
  page: number;
  pageUrl?: string | null;
  signal?: AbortSignal;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOptionalText(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isAdminFreelancer(value: unknown): value is AdminFreelancer {
  return (
    isRecord(value) &&
    (typeof value.id === "number" || typeof value.id === "string") &&
    isOptionalText(value.first_name) &&
    isOptionalText(value.last_name) &&
    isOptionalText(value.email) &&
    typeof value.is_active === "boolean" &&
    (value.skills === null ||
      typeof value.skills === "string" ||
      (Array.isArray(value.skills) &&
        value.skills.every((skill) => typeof skill === "string"))) &&
    isOptionalText(value.title) &&
    isOptionalText(value.shbio) &&
    isOptionalText(value.bio)
  );
}

function buildRequestUrl(options: FetchAdminFreelancersOptions): URL {
  const baseUrl = new URL(FREELANCERS_URL);
  const url = options.pageUrl
    ? new URL(options.pageUrl, baseUrl)
    : new URL(baseUrl);

  if (url.origin !== baseUrl.origin || url.pathname !== baseUrl.pathname) {
    throw new Error("The freelancers service returned an invalid pagination link.");
  }

  if (!options.pageUrl) {
    url.searchParams.set("page", String(options.page));
  }

  if (options.search.trim()) {
    url.searchParams.set("search", options.search.trim());
  } else {
    url.searchParams.delete("search");
  }

  if (options.active) {
    url.searchParams.set("is_active", options.active);
  } else {
    url.searchParams.delete("is_active");
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

  return `Could not load freelancers (HTTP ${response.status}).`;
}

export async function fetchAdminFreelancers(
  options: FetchAdminFreelancersOptions
): Promise<AdminFreelancersPage> {
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
    throw new Error("The freelancers service returned an invalid response.");
  }

  if (
    !isRecord(payload) ||
    typeof payload.count !== "number" ||
    !Number.isInteger(payload.count) ||
    payload.count < 0 ||
    !(typeof payload.next === "string" || payload.next === null) ||
    !(typeof payload.previous === "string" || payload.previous === null) ||
    !Array.isArray(payload.results) ||
    !payload.results.every(isAdminFreelancer)
  ) {
    throw new Error("The freelancers service returned an invalid response.");
  }

  return {
    count: payload.count,
    next: payload.next,
    previous: payload.previous,
    results: payload.results,
  };
}
