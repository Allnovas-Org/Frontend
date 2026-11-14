import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthenticationError } from "../services/adminDashboardApi";
import {
  fetchAdminFreelancers,
  type AdminFreelancer,
  type AdminFreelancersPage,
} from "../services/adminFreelancersApi";

function displayName(freelancer: AdminFreelancer): string {
  return [freelancer.first_name, freelancer.last_name]
    .filter((name): name is string => Boolean(name?.trim()))
    .join(" ");
}

function getSkills(skills: AdminFreelancer["skills"]): string[] {
  if (Array.isArray(skills)) {
    return skills.filter((skill) => skill.trim().length > 0);
  }
  return typeof skills === "string" && skills.trim() ? [skills.trim()] : [];
}

function initials(freelancer: AdminFreelancer): string {
  const name = displayName(freelancer);
  if (name) {
    return name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  return freelancer.email?.trim().charAt(0).toUpperCase() || "?";
}

export default function Freelancers() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"" | "true" | "false">("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [freelancersPage, setFreelancersPage] =
    useState<AdminFreelancersPage | null>(null);
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<AdminFreelancer | null>(null);
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
    const controller = new AbortController();
    let active = true;

    async function loadFreelancers() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchAdminFreelancers({
          search,
          active: activeFilter,
          page: pageNumber,
          pageUrl,
          signal: controller.signal,
        });
        if (active) {
          setFreelancersPage(result);
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
              : "Could not load freelancers."
          );
          setFreelancersPage(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadFreelancers();

    return () => {
      active = false;
      controller.abort();
    };
  }, [activeFilter, navigate, pageNumber, pageUrl, retryCount, search]);

  function changePage(direction: "next" | "previous") {
    if (!freelancersPage) {
      return;
    }

    const target =
      direction === "next" ? freelancersPage.next : freelancersPage.previous;
    if (!target) {
      return;
    }

    setPageUrl(target);
    setPageNumber((current) =>
      direction === "next" ? current + 1 : Math.max(1, current - 1)
    );
    setSelectedFreelancer(null);
  }

  function changeActiveFilter(value: "" | "true" | "false") {
    setActiveFilter(value);
    setPageNumber(1);
    setPageUrl(null);
    setSelectedFreelancer(null);
  }

  const freelancers = freelancersPage?.results ?? [];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Freelancers</h1>
          <p className="mt-2 text-sm text-gray-500">
            Read-only freelancer profiles from the Allnova platform.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled
            title="Adding freelancers requires a secure backend endpoint."
            className="cursor-not-allowed rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white opacity-50"
          >
            + Add freelancer
          </button>
          <button
            type="button"
            disabled
            title="Posting projects requires a secure backend endpoint."
            className="cursor-not-allowed rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 opacity-60"
          >
            + Post project
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Freelancers matching current filters
        </p>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {isLoading ? "—" : error ? "—" : (freelancersPage?.count ?? 0).toLocaleString()}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <label className="sr-only" htmlFor="freelancer-search">
          Search freelancers
        </label>
        <input
          id="freelancer-search"
          type="search"
          placeholder="Search freelancers by name, email, title, or skill..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600"
        />
        <label className="sr-only" htmlFor="freelancer-status">
          Filter freelancers by account status
        </label>
        <select
          id="freelancer-status"
          value={activeFilter}
          onChange={(event) =>
            changeActiveFilter(event.target.value as "" | "true" | "false")
          }
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700"
        >
          <option value="">All statuses</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <section className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Freelancer Directory
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Profile information and account status
            </p>
          </div>
        </div>

        {isLoading ? (
          <p role="status" className="p-6 text-sm text-gray-500">
            Loading freelancers...
          </p>
        ) : error ? (
          <div role="alert" className="p-6">
            <p className="text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-3 text-sm font-medium text-purple-700 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : freelancers.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            {search || activeFilter
              ? "No freelancers match your search or status filter."
              : "No freelancers are available."}
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-purple-50 text-gray-700">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Freelancer</th>
                    <th className="px-5 py-4 font-semibold">Title</th>
                    <th className="px-5 py-4 font-semibold">Skills</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {freelancers.map((freelancer) => {
                    const name = displayName(freelancer);
                    const skills = getSkills(freelancer.skills);
                    return (
                      <tr
                        key={freelancer.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
                              {initials(freelancer)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {name || "Name unavailable"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {freelancer.email || "Email unavailable"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {freelancer.title?.trim() || "—"}
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {skills.length > 0 ? skills.join(", ") : "—"}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              freelancer.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {freelancer.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => setSelectedFreelancer(freelancer)}
                            className="text-sm font-medium text-purple-700 hover:underline"
                          >
                            View profile
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
                {freelancersPage?.count.toLocaleString()} freelancers · Page{" "}
                {pageNumber}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={!freelancersPage?.previous}
                  onClick={() => changePage("previous")}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={!freelancersPage?.next}
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

      <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        This page is read-only. Adding freelancers, posting projects, and
        changing freelancer accounts are unavailable because the current API
        does not provide those operations.
      </p>

      {selectedFreelancer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="freelancer-profile-heading"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <h2
                id="freelancer-profile-heading"
                className="text-xl font-bold text-gray-900"
              >
                Freelancer Profile
              </h2>
              <button
                type="button"
                onClick={() => setSelectedFreelancer(null)}
                className="text-2xl text-gray-500 hover:text-gray-900"
                aria-label="Close freelancer profile"
              >
                ×
              </button>
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-xs text-gray-500">Name</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {displayName(selectedFreelancer) || "Name unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Email</dt>
                <dd className="mt-1 break-all font-medium text-gray-900">
                  {selectedFreelancer.email || "Email unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Title</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedFreelancer.title?.trim() || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Skills</dt>
                <dd className="mt-1 text-gray-800">
                  {getSkills(selectedFreelancer.skills).join(", ") || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Short bio</dt>
                <dd className="mt-1 whitespace-pre-wrap text-gray-800">
                  {selectedFreelancer.shbio?.trim() || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Bio</dt>
                <dd className="mt-1 whitespace-pre-wrap text-gray-800">
                  {selectedFreelancer.bio?.trim() || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Account status</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedFreelancer.is_active ? "Active" : "Inactive"}
                </dd>
              </div>
            </dl>

            <p className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500">
              Profile details are read-only. Account-management actions require
              dedicated secure backend endpoints.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
