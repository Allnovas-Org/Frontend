import { clearAdminSession, getAdminSession } from "../auth/adminAuth";
import { AdminAuthenticationError } from "./adminDashboardApi";

const CLIENTS_URL = "https://allnovas.com/api/v1/admin/clients/";

export type AdminClient = {
  id: number | string;
  username?: string | null;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  is_active: boolean;
  created_at?: string | null;
  client_type?: string | null;
  company_name?: string | null;
  company_industry?: string | null;
  company_website?: string | null;
  title?: string | null;
};

export type AdminClientsPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminClient[];
};

export type FetchAdminClientsOptions = {
  search: string;
  page: number;
  pageUrl?: string | null;
  signal?: AbortSignal;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOptionalText(value: unknown): value is string | null | undefined {
  return value === undefined || value === null || typeof value === "string";
}

function isAdminClient(value: unknown): value is AdminClient {
  return (
    isRecord(value) &&
    (typeof value.id === "number" || typeof value.id === "string") &&
    isOptionalText(value.username) &&
    isOptionalText(value.email) &&
    isOptionalText(value.first_name) &&
    isOptionalText(value.last_name) &&
    typeof value.is_active === "boolean" &&
    isOptionalText(value.created_at) &&
    isOptionalText(value.client_type) &&
    isOptionalText(value.company_name) &&
    isOptionalText(value.company_industry) &&
    isOptionalText(value.company_website) &&
    isOptionalText(value.title)
  );
}

function buildRequestUrl(options: FetchAdminClientsOptions): URL {
  const baseUrl = new URL(CLIENTS_URL);
  const url = options.pageUrl
    ? new URL(options.pageUrl, baseUrl)
    : new URL(baseUrl);

  if (url.origin !== baseUrl.origin || url.pathname !== baseUrl.pathname) {
    throw new Error("The clients service returned an invalid pagination link.");
  }

  if (!options.pageUrl) {
    url.searchParams.set("page", String(options.page));
  }

  if (options.search.trim()) {
    url.searchParams.set("search", options.search.trim());
  } else {
    url.searchParams.delete("search");
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

  return `Could not load clients (HTTP ${response.status}).`;
}

export async function fetchAdminClients(
  options: FetchAdminClientsOptions
): Promise<AdminClientsPage> {
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
    throw new Error("The clients service returned an invalid response.");
  }

  if (
    !isRecord(payload) ||
    typeof payload.count !== "number" ||
    !Number.isInteger(payload.count) ||
    payload.count < 0 ||
    !(typeof payload.next === "string" || payload.next === null) ||
    !(typeof payload.previous === "string" || payload.previous === null) ||
    !Array.isArray(payload.results) ||
    !payload.results.every(isAdminClient)
  ) {
    throw new Error("The clients service returned an invalid response.");
  }

  return {
    count: payload.count,
    next: payload.next,
    previous: payload.previous,
    results: payload.results,
  };
}
