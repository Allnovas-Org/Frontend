import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthenticationError } from "../services/adminDashboardApi";
import {
  fetchAdminJobs,
  type AdminJob,
  type AdminJobsPage,
} from "../services/adminJobsApi";

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}

function formatBudget(job: AdminJob): string {
  return `${job.currency} ${job.budget}`;
}

export default function AdminJobs() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [status, setStatus] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [jobsPage, setJobsPage] = useState<AdminJobsPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
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
    const timer = window.setTimeout(() => {
      setStatus(statusInput.trim());
      setPageNumber(1);
      setPageUrl(null);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [statusInput]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadJobs() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchAdminJobs({
          search,
          status,
          page: pageNumber,
          pageUrl,
          signal: controller.signal,
        });
        if (active) {
          setJobsPage(result);
        }
      } catch (loadError) {
        if (loadError instanceof AdminAuthenticationError) {
          if (active) {
            navigate("/sign-in", { replace: true });
          }
          return;
        }

        if (active && !controller.signal.aborted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load jobs."
          );
          setJobsPage(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadJobs();

    return () => {
      active = false;
      controller.abort();
    };
  }, [navigate, pageNumber, pageUrl, retryCount, search, status]);

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

  const jobs = jobsPage?.results ?? [];

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Freelance Jobs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Read-only view of freelance jobs from the Allnova platform.
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="job-search">
          Search jobs
        </label>
        <input
          id="job-search"
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search jobs..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600 sm:max-w-md"
        />
        <label className="sr-only" htmlFor="job-status-filter">
          Filter jobs by status
        </label>
        <input
          id="job-status-filter"
          type="search"
          value={statusInput}
          onChange={(event) => setStatusInput(event.target.value)}
          placeholder="Filter by status..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600 sm:max-w-xs"
        />
      </div>

      {isLoading ? (
        <p
          role="status"
          className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500"
        >
          Loading freelance jobs...
        </p>
      ) : error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-white p-6"
        >
          <p className="text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-3 text-sm font-medium text-purple-700 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : !jobsPage || jobs.length === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          {search || status
            ? "No jobs match your search or status filter."
            : "No freelance jobs are available."}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-md bg-purple-700 px-2 py-1 text-xs font-medium capitalize text-white">
                    {job.status}
                  </span>
                  <span className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-600">
                    Job #{job.id}
                  </span>
                </div>

                <h2 className="text-base font-semibold text-gray-900">
                  {job.title}
                </h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-5 text-gray-600">
                  {job.description || "No description provided."}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-gray-500">Budget</dt>
                    <dd className="mt-1 font-medium text-gray-900">
                      {formatBudget(job)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Client ID</dt>
                    <dd className="mt-1 font-medium text-gray-900">
                      {job.client_id}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs text-gray-500">Category</dt>
                    <dd className="mt-1 text-gray-800">
                      {job.category || "—"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <p className="text-xs text-gray-500">Skills</p>
                  {job.skills.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-full bg-purple-50 px-2.5 py-1 text-xs text-purple-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">—</p>
                  )}
                </div>

                <dl className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                  <div className="flex justify-between gap-3">
                    <dt>Created</dt>
                    <dd className="text-right">{formatDate(job.created_at)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Updated</dt>
                    <dd className="text-right">{formatDate(job.updated_at)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              {jobsPage.count.toLocaleString()} job
              {jobsPage.count === 1 ? "" : "s"} total · Page {pageNumber}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={!jobsPage.previous}
                onClick={() => changePage("previous")}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={!jobsPage.next}
                onClick={() => changePage("next")}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        This view is read-only. Editing, deleting, approving, and changing job
        status are unavailable because the current API does not provide those
        operations.
      </p>
    </div>
  );
}
