import { clearAdminSession, getAdminSession } from "../auth/adminAuth";
import { AdminAuthenticationError } from "./adminDashboardApi";

const USERS_URL = "https://allnovas.com/api/v1/admin/users/";

export type AdminUser = {
  id: number | string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_role: string;
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
};

export type AdminUsersPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUser[];
};

export type FetchAdminUsersOptions = {
  search: string;
  role: string;
  page: number;
  pageUrl?: string | null;
  signal?: AbortSignal;
};

export class AdminUserStatusError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "AdminUserStatusError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAdminUser(value: unknown): value is AdminUser {
  return (
    isRecord(value) &&
    (typeof value.id === "number" || typeof value.id === "string") &&
    typeof value.username === "string" &&
    typeof value.email === "string" &&
    typeof value.first_name === "string" &&
    typeof value.last_name === "string" &&
    typeof value.user_role === "string" &&
    typeof value.is_active === "boolean" &&
    typeof value.is_staff === "boolean" &&
    typeof value.created_at === "string"
  );
}

function buildRequestUrl(options: FetchAdminUsersOptions): URL {
  const url = options.pageUrl
    ? new URL(options.pageUrl, USERS_URL)
    : new URL(USERS_URL);

  if (
    url.origin !== new URL(USERS_URL).origin ||
    url.pathname !== new URL(USERS_URL).pathname
  ) {
    throw new Error("The users service returned an invalid pagination link.");
  }

  if (!options.pageUrl) {
    url.searchParams.set("page", String(options.page));
  }

  if (options.search.trim()) {
    url.searchParams.set("search", options.search.trim());
  } else {
    url.searchParams.delete("search");
  }

  if (options.role) {
    url.searchParams.set("user_role", options.role);
  } else {
    url.searchParams.delete("user_role");
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
    // Use the status-based message when the response body is empty or not JSON.
  }

  return `Could not load users (HTTP ${response.status}).`;
}

async function getStatusErrorDetail(response: Response): Promise<string | undefined> {
  try {
    const payload: unknown = await response.json();
    if (isRecord(payload)) {
      const detail = payload.detail ?? payload.message;
      if (typeof detail === "string" && detail.trim()) {
        return detail;
      }

      for (const value of Object.values(payload)) {
        if (typeof value === "string" && value.trim()) {
          return value;
        }
        if (Array.isArray(value) && typeof value[0] === "string") {
          return value[0];
        }
      }
    }
  } catch {
    // The status-specific message below is used if the response has no readable detail.
  }

  return undefined;
}

export async function fetchAdminUsers(
  options: FetchAdminUsersOptions
): Promise<AdminUsersPage> {
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
    throw new Error("The users service returned an invalid response.");
  }

  if (
    !isRecord(payload) ||
    typeof payload.count !== "number" ||
    !Number.isInteger(payload.count) ||
    payload.count < 0 ||
    !(typeof payload.next === "string" || payload.next === null) ||
    !(typeof payload.previous === "string" || payload.previous === null) ||
    !Array.isArray(payload.results) ||
    !payload.results.every(isAdminUser)
  ) {
    throw new Error("The users service returned an invalid response.");
  }

  return {
    count: payload.count,
    next: payload.next,
    previous: payload.previous,
    results: payload.results,
  };
}

export async function updateAdminUserStatus(
  userId: AdminUser["id"],
  isActive: boolean
): Promise<void> {
  const accessToken = getAdminSession()?.accessToken;
  if (!accessToken) {
    clearAdminSession();
    throw new AdminAuthenticationError();
  }

  let response: Response;
  try {
    response = await fetch(
      `${USERS_URL}${encodeURIComponent(String(userId))}/status/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: isActive }),
      }
    );
  } catch {
    throw new AdminUserStatusError(
      "Network error: the account status could not be updated. Check your connection and try again.",
      0
    );
  }

  if (response.status === 401) {
    clearAdminSession();
    throw new AdminAuthenticationError();
  }

  if (!response.ok) {
    const detail = await getStatusErrorDetail(response);
    const message =
      response.status === 400
        ? `The status change was rejected.${detail ? ` ${detail}` : " Check the request and try again."}`
        : response.status === 403
          ? `You are not allowed to change this account.${detail ? ` ${detail}` : " Staff and protected accounts cannot be changed."}`
          : response.status === 404
            ? "This user could not be found. The user list will be refreshed."
            : detail ?? `Could not update account status (HTTP ${response.status}).`;
    throw new AdminUserStatusError(message, response.status);
  }
}
