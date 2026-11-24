import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Building2,
  Clock3,
  UsersRound,
} from "lucide-react";
import { AdminAuthenticationError } from "../services/adminDashboardApi";
import {
  fetchAdminClients,
  type AdminClient,
  type AdminClientsPage,
} from "../services/adminClientsApi";
import {
  fetchAdminJobs,
  type AdminJob,
  type AdminJobsPage,
} from "../services/adminJobsApi";
import {
  getClientName,
  getJobClient,
  getJobRoleLabels,
  jobRoleFilters,
  matchesJobRole,
  type JobRoleFilter,
} from "./recruiterDashboardUtils";
import RecruiterDashboardTabs from "./RecruiterDashboardTabs";

function companyLabel(job: AdminJob, client: AdminClient | undefined): string {
  return (
    job.company_name?.trim() ||
    client?.company_name?.trim() ||
    job.client_name?.trim() ||
    (client ? getClientName(client) : "") ||
    `Client #${job.client_id}`
  );
}

function initials(value: string): string {
  return (
    value
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
}

function formatBudget(job: AdminJob): string {
  return `${job.currency} ${job.budget}`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

function jobStatusClass(status: string): string {
  const normalized = status.trim().toLowerCase();
  if (["open", "active", "published"].includes(normalized)) {
    return "bg-green-100 text-green-700";
  }
  if (["pending", "draft"].includes(normalized)) {
    return "bg-amber-100 text-amber-700";
  }
  if (["closed", "inactive", "cancelled", "canceled"].includes(normalized)) {
    return "bg-gray-100 text-gray-600";
  }
  return "bg-purple-50 text-purple-700";
}

export default function JobVacancy() {
  const [roleFilter, setRoleFilter] = useState<JobRoleFilter>("All Role");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [jobsPage, setJobsPage] = useState<AdminJobsPage | null>(null);
  const [clientsPage, setClientsPage] = useState<AdminClientsPage | null>(null);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [clientsError, setClientsError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadJobs() {
      setIsLoadingJobs(true);
      setJobsError("");
      try {
        const result = await fetchAdminJobs({
          search: "",
          status: "",
          page: pageNumber,
          pageUrl,
          signal: controller.signal,
        });
        if (active) {
          setJobsPage(result);
        }
      } catch (error) {
        if (error instanceof AdminAuthenticationError) {
          if (active) {
            navigate("/sign-in", { replace: true });
          }
          return;
        }
        if (active && !controller.signal.aborted) {
          setJobsPage(null);
          setJobsError("Opportunities could not be loaded.");
        }
      } finally {
        if (active) {
          setIsLoadingJobs(false);
        }
      }
    }

    void loadJobs();
    return () => {
      active = false;
      controller.abort();
    };
  }, [navigate, pageNumber, pageUrl, retryCount]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadClients() {
      setIsLoadingClients(true);
      setClientsError("");
      try {
        const result = await fetchAdminClients({
          search: "",
          page: 1,
          signal: controller.signal,
        });
        if (active) {
          setClientsPage(result);
        }
      } catch (error) {
        if (error instanceof AdminAuthenticationError) {
          if (active) {
            navigate("/sign-in", { replace: true });
          }
          return;
        }
        if (active && !controller.signal.aborted) {
          setClientsPage(null);
          setClientsError("Recruiter details could not be loaded.");
        }
      } finally {
        if (active) {
          setIsLoadingClients(false);
        }
      }
    }

    void loadClients();
    return () => {
      active = false;
      controller.abort();
    };
  }, [navigate, retryCount]);

  const jobs = jobsPage?.results ?? [];
  const clients = clientsPage?.results ?? [];
  const filteredJobs = useMemo(
    () => jobs.filter((job) => matchesJobRole(job, roleFilter)),
    [jobs, roleFilter]
  );
  const activeCompanies = clients.filter(
    (client) => client.is_active && Boolean(client.company_name?.trim())
  ).length;

  function changePage(direction: "next" | "previous") {
    if (!jobsPage) {
      return;
    }
    const target = direction === "next" ? jobsPage.next : jobsPage.previous;
    if (!target) {
      return;
    }
    setPageUrl(target);
    setPageNumber((current) =>
      direction === "next" ? current + 1 : Math.max(1, current - 1)
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job &amp; Vacancy</h1>
          <p className="mt-1 text-sm text-gray-500">
            Explore opportunities and filter by work arrangement or internship.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/freelancers/add")}
            className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
          >
            + Add freelancer
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/post-project")}
            className="rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-purple-50"
          >
            + Post project
          </button>
        </div>
      </div>

      <RecruiterDashboardTabs />

      <section
        aria-label="Job and recruiter statistics"
        className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-gray-500">Recruiters / clients</p>
            <span className="rounded-xl bg-purple-50 p-3 text-purple-700">
              <UsersRound size={21} />
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {isLoadingClients || clientsError || !clientsPage
              ? "—"
              : clientsPage.count.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            All recruiter and client accounts
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-gray-500">Active companies</p>
            <span className="rounded-xl bg-sky-50 p-3 text-sky-600">
              <Building2 size={21} />
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {isLoadingClients || clientsError ? "—" : activeCompanies}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Active companies on this page
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-gray-500">Job opportunities</p>
            <span className="rounded-xl bg-green-50 p-3 text-green-600">
              <BriefcaseBusiness size={21} />
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {isLoadingJobs || jobsError || !jobsPage
              ? "—"
              : jobsPage.count.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Total opportunities
          </p>
        </div>
      </section>

      <section className="relative mb-5 overflow-hidden rounded-xl bg-slate-900 p-6 text-white">
        <div className="pointer-events-none absolute -bottom-24 left-0 h-40 w-full rounded-[50%] bg-white/10" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-purple-200">Live opportunities</p>
            <h2 className="mt-2 text-2xl font-bold">
              Job listings from the platform
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-300">
              Filter the current listings by work arrangement or internship.
            </p>
          </div>
          <p className="rounded-lg bg-white/10 px-4 py-2 text-sm">
            {filteredJobs.length} matching this page
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Job &amp; Vacancy
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {jobsPage?.count.toLocaleString() ?? "—"} total job records ·
              page {pageNumber}
            </p>
          </div>
          <label className="flex items-center gap-3 text-sm text-gray-600">
            <span>Opportunity type</span>
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value as JobRoleFilter)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-600"
            >
              {jobRoleFilters.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoadingJobs ? (
          <p role="status" className="p-6 text-sm text-gray-500">
            Loading job opportunities...
          </p>
        ) : jobsError ? (
          <div role="alert" className="p-6">
            <p className="text-sm text-red-600">{jobsError}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-3 text-sm font-medium text-purple-700 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : filteredJobs.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            {jobs.length === 0
              ? "No job records are available."
              : `No jobs on this page match “${roleFilter}”.`}
          </p>
        ) : (
          <>
            <div className="divide-y divide-gray-100">
              {filteredJobs.map((job) => {
                const client = getJobClient(job, clients);
                const name = companyLabel(job, client);
                const clientEmail =
                  job.client_email?.trim() || client?.email?.trim();
                const roleLabels = getJobRoleLabels(job);
                return (
                  <article
                    key={job.id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 md:flex-row md:items-center"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                        {initials(name)}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-gray-900">
                          {job.title}
                        </h3>
                        <p className="mt-1 truncate text-sm text-gray-600">
                          {name}
                          {clientEmail ? ` · ${clientEmail}` : ""}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          {roleLabels.length ? (
                            roleLabels.map((label) => (
                              <span
                                key={label}
                                className="rounded-full bg-purple-50 px-2.5 py-1 text-purple-700"
                              >
                                {label}
                              </span>
                            ))
                          ) : (
                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600">
                              Role details not specified
                            </span>
                          )}
                          {job.category && (
                            <span className="rounded-full border border-gray-200 px-2.5 py-1">
                              {job.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm md:justify-end">
                      <div className="min-w-28">
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {formatBudget(job)}
                        </p>
                      </div>
                      <div className="min-w-24">
                        <p className="text-xs text-gray-500">Posted</p>
                        <p className="mt-1 flex items-center gap-1 font-medium text-gray-700">
                          <Clock3 size={13} />
                          {formatDate(job.created_at)}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${jobStatusClass(job.status)}`}
                      >
                        {job.status}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
              <p className="text-sm text-gray-500">
                Showing {filteredJobs.length} of {jobs.length} opportunities on
                this page
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={!jobsPage?.previous}
                  onClick={() => changePage("previous")}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={!jobsPage?.next}
                  onClick={() => changePage("next")}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {clientsError && (
        <div
          role="alert"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
        >
          <p className="text-sm text-amber-800">
            Recruiter details could not be loaded. Please try again.
          </p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="text-sm font-medium text-purple-700 hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
