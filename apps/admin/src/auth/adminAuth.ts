const LOGIN_URL = "https://allnovas.com/api/v1/auth/login/";
const SESSION_KEY = "allnova-admin-auth.v1";

export type AdminSession = {
  user_role: string;
  accessToken?: string;
  refreshToken?: string;
};

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(record: JsonRecord, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return undefined;
}

function getApiError(payload: unknown): string | undefined {
  if (!isRecord(payload)) {
    return undefined;
  }

  const message = getString(payload, "detail", "message", "error");
  if (message) {
    return message;
  }

  const errors = payload.non_field_errors;
  if (Array.isArray(errors) && typeof errors[0] === "string") {
    return errors[0];
  }

  return undefined;
}

async function readResponse(response: Response): Promise<unknown> {
  const body = await response.text();
  if (!body) {
    return undefined;
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    if (!response.ok) {
      return body;
    }
    throw new Error("The sign-in service returned an invalid response.");
  }
}

function getSessionFromResponse(payload: unknown): AdminSession | undefined {
  if (!isRecord(payload)) {
    return undefined;
  }

  const data = isRecord(payload.data) ? payload.data : payload;
  const user = isRecord(data.user)
    ? data.user
    : isRecord(payload.user)
      ? payload.user
      : data;
  const userRole = getString(user, "user_role");

  if (!userRole) {
    return undefined;
  }

  return {
    user_role: userRole,
    accessToken:
      getString(data, "access", "access_token", "token") ??
      getString(payload, "access", "access_token", "token"),
    refreshToken:
      getString(data, "refresh", "refresh_token") ??
      getString(payload, "refresh", "refresh_token"),
  };
}

export async function signInAdmin(
  identifier: string,
  password: string,
  rememberMe: boolean
): Promise<void> {
  const trimmedIdentifier = identifier.trim();
  const credentials = trimmedIdentifier.includes("@")
    ? { email: trimmedIdentifier, password }
    : { username: trimmedIdentifier, password };

  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const payload = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      getApiError(payload) ?? "Unable to sign in. Check your credentials and try again."
    );
  }

  const session = getSessionFromResponse(payload);
  if (session?.user_role !== "admin") {
    clearAdminSession();
    throw new Error("Only administrator accounts can access this dashboard.");
  }

  const storage = rememberMe ? window.localStorage : window.sessionStorage;
  const otherStorage = rememberMe ? window.sessionStorage : window.localStorage;
  otherStorage.removeItem(SESSION_KEY);
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getAdminSession(): AdminSession | undefined {
  for (const storage of [window.sessionStorage, window.localStorage]) {
    const saved = storage.getItem(SESSION_KEY);
    if (!saved) {
      continue;
    }

    try {
      const session: unknown = JSON.parse(saved);
      if (isRecord(session) && session.user_role === "admin") {
        return {
          user_role: "admin",
          accessToken: getString(session, "accessToken"),
          refreshToken: getString(session, "refreshToken"),
        };
      }
    } catch {
      storage.removeItem(SESSION_KEY);
    }
  }

  return undefined;
}

export function clearAdminSession(): void {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}
