import { clearAdminSession, getAdminSession } from "../auth/adminAuth";

const OVERVIEW_URL = "https://allnovas.com/api/v1/admin/dashboard/overview/";

export type PlatformOverview = {
  total_users: number;
  active_users: number;
  total_freelancers: number;
  total_clients: number;
  total_jobs: number;
  total_conversations: number;
  total_messages: number;
};

export class AdminAuthenticationError extends Error {
  constructor() {
    super("Your administrator session has expired. Please sign in again.");
    this.name = "AdminAuthenticationError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCount(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function parseOverview(payload: unknown): PlatformOverview | null {
  if (payload === null) {
    return null;
  }

  if (!isRecord(payload)) {
    throw new Error("The dashboard service returned an invalid response.");
  }

  const {
    total_users,
    active_users,
    total_freelancers,
    total_clients,
    total_jobs,
    total_conversations,
    total_messages,
  } = payload;
  if (
    !isCount(total_users) ||
    !isCount(active_users) ||
    !isCount(total_freelancers) ||
    !isCount(total_clients) ||
    !isCount(total_jobs) ||
    !isCount(total_conversations) ||
    !isCount(total_messages)
  ) {
    throw new Error("The dashboard service returned invalid platform statistics.");
  }

  return {
    total_users,
    active_users,
    total_freelancers,
    total_clients,
    total_jobs,
    total_conversations,
    total_messages,
  };
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
    // Use the standard status-based message if the error body is empty or not JSON.
  }

  return `Could not load platform statistics (HTTP ${response.status}).`;
}

export async function fetchPlatformOverview(): Promise<PlatformOverview | null> {
  const accessToken = getAdminSession()?.accessToken;
  if (!accessToken) {
    clearAdminSession();
    throw new AdminAuthenticationError();
  }

  const response = await fetch(OVERVIEW_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (response.status === 401) {
    clearAdminSession();
    throw new AdminAuthenticationError();
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  if (response.status === 204) {
    return null;
  }

  const body = await response.text();
  if (!body.trim()) {
    return null;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as unknown;
  } catch {
    throw new Error("The dashboard service returned an invalid response.");
  }

  return parseOverview(payload);
}
