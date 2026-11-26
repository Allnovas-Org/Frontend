/// <reference types="vite/client" />
import axios, { AxiosHeaders, type AxiosError } from "axios";

export const apiBaseURL = import.meta.env?.VITE_API_BASE_URL?.trim()
  || (typeof window === "undefined" ? "http://test.invalid" : undefined);

export const api = axios.create({
  baseURL: apiBaseURL || undefined,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const parseRetryAfterSeconds = (value: unknown): number | undefined => {
  if (typeof value !== "string" || !value.trim()) return undefined;

  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.ceil(seconds);
  }

  const retryAt = Date.parse(value);
  if (!Number.isFinite(retryAt)) return undefined;
  return Math.max(0, Math.ceil((retryAt - Date.now()) / 1000));
};

const publicAuthPath =
  /\/auth\/(?:login|signup\/email|signup\/verify-token|password\/)/;

// Request interceptor - Add auth token to every request
api.interceptors.request.use(
  (config) => {
    if (!apiBaseURL) {
      return Promise.reject({
        message: "VITE_API_BASE_URL is not configured.",
        status: 0,
      });
    }

    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      config.headers.delete("Content-Type");
    }

    const requestUrl = config.url || "";
    if (publicAuthPath.test(requestUrl)) {
      return config;
    }

    if (config.headers.has("Authorization")) {
      return config;
    }

    const token = localStorage.getItem("auth-token");
    const expiresAt = localStorage.getItem("auth-token-expires-at");
    if (token && expiresAt && Date.parse(expiresAt) <= Date.now()) {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-token-expires-at");
      window.dispatchEvent(new Event("auth:session-expired"));
      return Promise.reject({ message: "Your session has expired.", status: 401 });
    }

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; detail?: string; error?: string }>) => {
    const status = error.response?.status;
    const authorization = AxiosHeaders.from(error.config?.headers).get("Authorization");
    const responseHeaders = error.response?.headers;
    const retryAfter =
      responseHeaders instanceof AxiosHeaders
        ? responseHeaders.get("Retry-After")
        : responseHeaders?.["retry-after"] ??
          responseHeaders?.["Retry-After"];

    if (status === 401 && authorization) {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-token-expires-at");
      window.dispatchEvent(new Event("auth:session-expired"));
    }

    return Promise.reject({
      message: error.response?.data?.message ||
        error.response?.data?.detail ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong.",
      status,
      data: error.response?.data,
      retryAfterSeconds: parseRetryAfterSeconds(retryAfter),
    });
  },
);
