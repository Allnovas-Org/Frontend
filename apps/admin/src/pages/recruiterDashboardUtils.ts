import type { AdminClient } from "../services/adminClientsApi";
import type { AdminJob } from "../services/adminJobsApi";

export const companyStatusFilters = [
  "All",
  "Pending",
  "Hiring",
  "Verified",
  "Active",
  "Inactive",
] as const;

export type CompanyStatusFilter = (typeof companyStatusFilters)[number];
export type CompanyStatus = Exclude<CompanyStatusFilter, "All">;

export const jobRoleFilters = [
  "All Role",
  "Remote",
  "Hybrid",
  "On-site",
  "Internship",
] as const;

export type JobRoleFilter = (typeof jobRoleFilters)[number];

const companyStatusFields = new Set([
  "status",
  "company_status",
  "recruiter_status",
  "verification_status",
]);

const openJobStatuses = new Set(["active", "hiring", "open", "published"]);

function belongsToClient(job: AdminJob, client: AdminClient): boolean {
  if (String(job.client_id) === String(client.id)) {
    return true;
  }

  const jobEmail = job.client_email?.trim().toLowerCase();
  const clientEmail = client.email?.trim().toLowerCase();
  return Boolean(jobEmail && clientEmail && jobEmail === clientEmail);
}

function getApiCompanyStatus(client: AdminClient): CompanyStatus | undefined {
  for (const [field, value] of Object.entries(client)) {
    if (!companyStatusFields.has(field) || typeof value !== "string") {
      continue;
    }

    const normalized = value.trim().toLowerCase();
    if (normalized === "pending") {
      return "Pending";
    }
    if (normalized === "hiring") {
      return "Hiring";
    }
    if (normalized === "verified") {
      return "Verified";
    }
    if (normalized === "inactive") {
      return "Inactive";
    }
    if (normalized === "active") {
      return "Active";
    }
  }

  return undefined;
}

export function getClientJobs(
  client: AdminClient,
  jobs: AdminJob[]
): AdminJob[] {
  return jobs.filter((job) => belongsToClient(job, client));
}

export function getJobClient(
  job: AdminJob,
  clients: AdminClient[]
): AdminClient | undefined {
  return clients.find((client) => belongsToClient(job, client));
}

export function getCompanyStatus(
  client: AdminClient,
  jobs: AdminJob[]
): CompanyStatus {
  const apiStatus = getApiCompanyStatus(client);
  if (apiStatus) {
    return apiStatus;
  }

  if (!client.is_active) {
    return "Inactive";
  }

  if (
    getClientJobs(client, jobs).some((job) =>
      openJobStatuses.has(job.status.trim().toLowerCase())
    )
  ) {
    return "Hiring";
  }

  return "Active";
}

function jobSearchableText(job: AdminJob): string {
  return [job.title, job.description, job.category, ...job.skills]
    .join(" ")
    .toLowerCase();
}

export function getJobRoleLabels(job: AdminJob): string[] {
  const text = jobSearchableText(job);
  const labels: string[] = [];

  if (/\bremote\b/.test(text)) {
    labels.push("Remote");
  }
  if (/\bhybrid\b/.test(text)) {
    labels.push("Hybrid");
  }
  if (/\bon[\s-]?site\b/.test(text)) {
    labels.push("On-site");
  }
  if (/\bintern(ship)?\b/.test(text)) {
    labels.push("Internship");
  }

  return labels;
}

export function matchesJobRole(job: AdminJob, filter: JobRoleFilter): boolean {
  return filter === "All Role" || getJobRoleLabels(job).includes(filter);
}

export function getClientName(client: AdminClient): string {
  return [client.first_name, client.last_name]
    .filter((name): name is string => Boolean(name?.trim()))
    .join(" ");
}
