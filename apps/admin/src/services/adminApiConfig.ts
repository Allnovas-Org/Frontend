const DEFAULT_ADMIN_API_BASE_URL = "https://backend.allnovas.com";
const configuredApiBaseUrl = import.meta.env.VITE_ADMIN_API_BASE_URL?.trim();
const adminApiBaseUrl = (
  configuredApiBaseUrl || DEFAULT_ADMIN_API_BASE_URL
).replace(/\/+$/, "");

export function adminApiUrl(path: string): string {
  return `${adminApiBaseUrl}/${path.replace(/^\/+/, "")}`;
}
