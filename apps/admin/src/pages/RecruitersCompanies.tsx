import { useEffect, useState } from "react";
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
  return client.company_name?.trim() || "Company not specified";
}

function clientInitials(client: AdminClient): string {
  const name = client.company_name?.trim() || getClientName(client);
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    client.username?.trim().charAt(0).toUpperCase() ||
    "?"
  );
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

function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "—";
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

export default function RecruitersCompanies() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] =
    useState<CompanyStatusFilter>("All");
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
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPageNumber(1);
      setPageUrl(null);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadClients() {
      setIsLoadingClients(true);
      setClientsError("");

      try {
        const result = await fetchAdminClients({
          search,
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
          setClientsError("Recruiter and company accounts could not be loaded.");
          setClientsPage(null);
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
  }, [navigate, pageNumber, pageUrl, retryCount, search]);

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
          setJobsError("Opportunity details could not be loaded.");
          setJobsPage(null);
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
  const filteredClients = clients.filter(
    (client) =>
      statusFilter === "All" ||
      getCompanyStatus(client, jobs) === statusFilter
  );
  const activeCompanyCount = clients.filter(
    (client) => client.is_active && Boolean(client.company_name?.trim())
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
          <h1 className="text-2xl font-bold text-gray-900">
            Recruiters &amp; companies
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review recruiter accounts and company hiring activity.
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
        aria-label="Recruiter and company statistics"
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
            {isLoadingClients || clientsError ? "—" : activeCompanyCount}
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
        <div className="pointer-events-none absolute -bottom-24 left-0 h-44 w-full rounded-[50%] bg-white/10" />
        <div className="relative">
          <p className="text-sm text-purple-200">Live directory</p>
          <h2 className="mt-2 text-2xl font-bold">
            Recruiters and company accounts
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-300">
            Review recruiter accounts and current hiring activity.
          </p>
        </div>
      </section>

      <div className="mb-5 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/admin/job-vacancy")}
          className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
        >
          View opportunities
        </button>
        <button
          type="button"
          disabled={clients.length === 0}
          onClick={() => setSelectedClient(clients[0] ?? null)}
          className="rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Company details
        </button>
      </div>

      <section
        id="recruiters-table"
        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recruiters &amp; companies
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Search accounts, review status, and view profile details.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="recruiter-search">
              Search recruiters or companies
            </label>
            <input
              id="recruiter-search"
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search name, company, or email..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-purple-600 sm:w-72"
            />
            <label className="sr-only" htmlFor="company-status-filter">
              Filter by company status
            </label>
            <select
              id="company-status-filter"
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
          </div>
        </div>

        {isLoadingClients ? (
          <p role="status" className="p-6 text-sm text-gray-500">
            Loading recruiter and company accounts...
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
        ) : filteredClients.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            {clients.length === 0
              ? search
                ? "No recruiter or company accounts match your search."
                : "No recruiter or company accounts are available."
              : statusFilter === "All"
                ? "No accounts match your search."
                : `No accounts match the “${statusFilter}” status${search ? " and your search" : ""}.`}
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-purple-50 text-gray-800">
                  <tr>
                    <th className="px-4 py-4 font-medium">Company</th>
                    <th className="px-4 py-4 font-medium">Recruiter</th>
                    <th className="px-4 py-4 font-medium">
                      Opportunities
                    </th>
                    <th className="px-4 py-4 font-medium">
                      Performance
                    </th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredClients.map((client) => {
                    const status = getCompanyStatus(client, jobs);
                    const opportunities = getClientJobs(client, jobs).length;
                    return (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-700 text-xs font-bold text-white">
                              {clientInitials(client)}
                            </span>
                            <div>
                              <p className="font-medium text-gray-900">
                                {companyName(client)}
                              </p>
                              {client.company_industry?.trim() && (
                                <p className="text-xs text-gray-500">
                                  {client.company_industry}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-900">
                            {getClientName(client) || "Name unavailable"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {client.email?.trim() || "Email unavailable"}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          <span className="font-medium">
                            {jobsPage ? opportunities : "—"}
                          </span>
                          <p className="text-xs text-gray-400">
                            {isLoadingJobs
                              ? "Loading"
                              : jobsPage
                                ? "listings shown"
                                : "not available"}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-gray-500">
                          <span>Not available</span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${statusClassName(status)}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            onClick={() => setSelectedClient(client)}
                            className="text-sm font-medium text-purple-700 hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
              <p className="text-sm text-gray-500">
                {clientsPage?.count.toLocaleString()} recruiter/client accounts
                · Page {pageNumber}
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
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
        >
          <p className="text-sm text-amber-800">
            Opportunity details could not be loaded. Please try again.
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

      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruiter-details-heading"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <h2
                id="recruiter-details-heading"
                className="text-xl font-bold text-gray-900"
              >
                Recruiter / company details
              </h2>
              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="text-2xl text-gray-500 hover:text-gray-900"
                aria-label="Close recruiter details"
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
                  {getClientName(selectedClient) || "Name unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Username</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedClient.username?.trim() || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Client type</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedClient.client_type?.trim() || "Not specified"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-gray-500">Email</dt>
                <dd className="mt-1 break-all font-medium text-gray-900">
                  {selectedClient.email?.trim() || "Email unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Title</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedClient.title?.trim() || "—"}
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
              <div>
                <dt className="text-xs text-gray-500">Joined</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {formatDate(selectedClient.created_at)}
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
