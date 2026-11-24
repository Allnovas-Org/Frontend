import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Building2, UsersRound } from "lucide-react";
import { AdminAuthenticationError } from "../services/adminDashboardApi";
import {
  fetchAdminClients,
  type AdminClient,
  type AdminClientsPage,
} from "../services/adminClientsApi";
import {
  fetchAdminJobs,
  type AdminJobsPage,
} from "../services/adminJobsApi";
import {
  companyStatusFilters,
  getClientJobs,
  getClientName,
  getCompanyStatus,
  type CompanyStatus,
  type CompanyStatusFilter,
} from "./recruiterDashboardUtils";
import RecruiterDashboardTabs from "./RecruiterDashboardTabs";

function companyName(client: AdminClient): string {
  return client.company_name?.trim() || getClientName(client) || "Company";
}

function initials(client: AdminClient): string {
  return companyName(client)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function statusClassName(status: CompanyStatus): string {
  switch (status) {
    case "Verified":
      return "bg-green-100 text-green-700";
    case "Hiring":
      return "bg-purple-100 text-purple-700";
    case "Pending":
      return "bg-amber-100 text-amber-700";
    case "Inactive":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-blue-50 text-blue-700";
  }
}

function isCompanyAccount(client: AdminClient): boolean {
  return Boolean(
    client.company_name?.trim() ||
      client.client_type?.trim().toLowerCase() === "company"
  );
}

export default function AvailableJob() {
  const [statusFilter, setStatusFilter] =
    useState<CompanyStatusFilter>("All");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [clientsPage, setClientsPage] = useState<AdminClientsPage | null>(null);
  const [jobsPage, setJobsPage] = useState<AdminJobsPage | null>(null);
  const [selectedClient, setSelectedClient] = useState<AdminClient | null>(null);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [clientsError, setClientsError] = useState("");
  const [jobsError, setJobsError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadClients() {
      setIsLoadingClients(true);
      setClientsError("");
      try {
        const result = await fetchAdminClients({
          search: "",
          page: pageNumber,
          pageUrl,
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
          setClientsError("Company accounts could not be loaded.");
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
  }, [navigate, pageNumber, pageUrl, retryCount]);

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
          page: 1,
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
          setJobsError("Job information could not be loaded.");
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
  }, [navigate, retryCount]);

  const clients = clientsPage?.results ?? [];
  const jobs = jobsPage?.results ?? [];
  const companyAccounts = clients.filter(isCompanyAccount);
  const filteredCompanies = useMemo(
    () =>
      companyAccounts.filter(
        (client) =>
          statusFilter === "All" ||
          getCompanyStatus(client, jobs) === statusFilter
      ),
    [companyAccounts, jobs, statusFilter]
  );
  const activeCompanies = companyAccounts.filter(
    (client) => client.is_active
  ).length;

  function changePage(direction: "next" | "previous") {
    if (!clientsPage) {
      return;
    }
    const target =
      direction === "next" ? clientsPage.next : clientsPage.previous;
    if (!target) {
      return;
    }
    setPageUrl(target);
    setPageNumber((current) =>
      direction === "next" ? current + 1 : Math.max(1, current - 1)
    );
    setSelectedClient(null);
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Talent Pool</h1>
          <p className="mt-1 text-sm text-gray-500">
            Explore companies, recruiters, and their opportunities.
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
        aria-label="Talent pool statistics"
        className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-gray-500">Company accounts</p>
            <span className="rounded-xl bg-purple-50 p-3 text-purple-700">
              <Building2 size={21} />
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {isLoadingClients || clientsError ? "—" : companyAccounts.length}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Company accounts on this page
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-gray-500">Active companies</p>
            <span className="rounded-xl bg-sky-50 p-3 text-sky-600">
              <UsersRound size={21} />
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {isLoadingClients || clientsError ? "—" : activeCompanies}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Active accounts on this page
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

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Active Talent Pool
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse company accounts by status.
            </p>
          </div>
          <label className="flex items-center gap-3 text-sm text-gray-600">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as CompanyStatusFilter)
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-600"
            >
              {companyStatusFilters.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoadingClients ? (
          <p role="status" className="p-6 text-sm text-gray-500">
            Loading company accounts...
          </p>
        ) : clientsError ? (
          <div role="alert" className="p-6">
            <p className="text-sm text-red-600">{clientsError}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-3 text-sm font-medium text-purple-700 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            {companyAccounts.length === 0
              ? "No company accounts are available on this page."
              : statusFilter === "All"
                ? "No company accounts are available."
                : `No company accounts match “${statusFilter}” on this page.`}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 2xl:grid-cols-3">
              {filteredCompanies.map((client) => {
                const status = getCompanyStatus(client, jobs);
                const clientJobs = getClientJobs(client, jobs);
                const skills = Array.from(
                  new Set(clientJobs.flatMap((job) => job.skills))
                ).slice(0, 6);
                return (
                  <article
                    key={client.id}
                    className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-purple-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-700 text-sm font-bold text-white">
                          {initials(client)}
                        </span>
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-gray-900">
                            {companyName(client)}
                          </h3>
                          <p className="truncate text-sm text-gray-500">
                            {getClientName(client) || "Recruiter unavailable"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusClassName(status)}`}
                      >
                        {status}
                      </span>
                    </div>

                    <p className="mt-4 truncate text-sm text-gray-500">
                      {client.email?.trim() || "Email unavailable"}
                    </p>
                    {client.company_industry?.trim() && (
                      <p className="mt-1 truncate text-xs text-gray-400">
                        {client.company_industry}
                      </p>
                    )}

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-gray-200 px-3 py-2">
                        <p className="text-xs text-gray-500">
                          Related opportunities
                        </p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {jobsPage ? clientJobs.length : "—"}
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 px-3 py-2">
                        <p className="text-xs text-gray-500">Account</p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {client.is_active ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 min-h-12">
                      <p className="text-xs text-gray-500">Related skills</p>
                      {skills.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2 text-xs text-gray-400">
                          {isLoadingJobs
                            ? "Loading job details..."
                            : jobsPage
                              ? "No related skills listed"
                              : "Job information unavailable"}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-end border-t border-gray-100 pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedClient(client)}
                        className="text-sm font-medium text-purple-700 hover:underline"
                      >
                        View details
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
              <p className="text-sm text-gray-500">
                {clientsPage?.count.toLocaleString()} client accounts · Page{" "}
                {pageNumber}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={!clientsPage?.previous}
                  onClick={() => changePage("previous")}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={!clientsPage?.next}
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

      {jobsError && (
        <div
          role="alert"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
        >
          <p className="text-sm text-red-700">
            Job information could not be loaded. Please try again.
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

      <p className="mt-4 text-xs text-gray-500">
        Opportunity counts and skills reflect the listings currently shown.
      </p>

      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="talent-details-heading"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <h2
                id="talent-details-heading"
                className="text-xl font-bold text-gray-900"
              >
                Company details
              </h2>
              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="text-2xl text-gray-500 hover:text-gray-900"
                aria-label="Close company details"
              >
                ×
              </button>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-gray-500">Company</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {companyName(selectedClient)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Recruiter</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {getClientName(selectedClient) || "Recruiter unavailable"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-gray-500">Email</dt>
                <dd className="mt-1 break-all font-medium text-gray-900">
                  {selectedClient.email?.trim() || "Email unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Industry</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedClient.company_industry?.trim() || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Account status</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {getCompanyStatus(selectedClient, jobs)}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-gray-500">Company website</dt>
                <dd className="mt-1 break-all font-medium text-gray-900">
                  {selectedClient.company_website?.trim() || "—"}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </div>
  );
}
