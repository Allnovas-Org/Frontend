import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthenticationError } from "../services/adminDashboardApi";
import {
  fetchAdminClients,
  type AdminClient,
  type AdminClientsPage,
} from "../services/adminClientsApi";

function displayName(client: AdminClient): string {
  return [client.first_name, client.last_name]
    .filter((name): name is string => Boolean(name?.trim()))
    .join(" ");
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

function formatClientType(value: string | null | undefined): string {
  if (!value?.trim()) {
    return "Not specified";
  }
  const normalized = value.trim().toLowerCase();
  if (normalized === "individual") {
    return "Individual";
  }
  if (normalized === "company") {
    return "Company";
  }
  return value;
}

function initials(client: AdminClient): string {
  const name = displayName(client);
  if (name) {
    return name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  return client.username?.trim().charAt(0).toUpperCase() || "?";
}

export default function RecruitersClients() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [clientsPage, setClientsPage] = useState<AdminClientsPage | null>(null);
  const [selectedClient, setSelectedClient] = useState<AdminClient | null>(null);
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

    async function loadClients() {
      setIsLoading(true);
      setError("");

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
              : "Could not load clients."
          );
          setClientsPage(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadClients();

    return () => {
      active = false;
      controller.abort();
    };
  }, [navigate, pageNumber, pageUrl, retryCount, search]);

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

  const clients = clientsPage?.results ?? [];

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <p className="mt-2 text-sm text-gray-500">
          Client accounts and company profile information.
        </p>
      </div>

      <section
        aria-label="Client account statistics"
        className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total clients</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {isLoading || error || !clientsPage
              ? "—"
              : clientsPage.count.toLocaleString()}
          </p>
          <p className="mt-3 text-xs text-gray-500">
            {isLoading
              ? "Loading client count..."
              : "Total returned by the client directory API"}
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Client Directory
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Search and view client account details.
            </p>
          </div>

          <label className="sr-only" htmlFor="client-search">
            Search clients by name, username, or email
          </label>
          <input
            id="client-search"
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search name, username, or email..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600 sm:max-w-sm"
          />
        </div>

        {isLoading ? (
          <p role="status" className="p-6 text-sm text-gray-500">
            Loading clients...
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
        ) : clients.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            {search
              ? "No clients match your search."
              : "No client accounts are available."}
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-purple-50 text-gray-700">
                  <tr>
                    <th className="px-5 py-4 font-medium">Client</th>
                    <th className="px-5 py-4 font-medium">Type</th>
                    <th className="px-5 py-4 font-medium">Company</th>
                    <th className="px-5 py-4 font-medium">Title</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Joined</th>
                    <th className="px-5 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
                            {initials(client)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {displayName(client) || "Name unavailable"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {client.email?.trim() || "Email unavailable"}
                            </p>
                            {client.username?.trim() && (
                              <p className="text-xs text-gray-400">
                                @{client.username}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {formatClientType(client.client_type)}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {client.company_name?.trim() || "—"}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {client.title?.trim() || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            client.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {client.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(client.created_at)}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedClient(client)}
                          className="text-sm font-medium text-purple-700 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
              <p className="text-sm text-gray-500">
                {clientsPage?.count.toLocaleString()} clients · Page {pageNumber}
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

      <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Client management is read-only. Adding freelancers or projects,
        editing client profiles, and changing account status are unavailable
        without dedicated secure backend endpoints.
      </p>

      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="client-details-heading"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <h2
                id="client-details-heading"
                className="text-xl font-bold text-gray-900"
              >
                Client Details
              </h2>
              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="text-2xl text-gray-500 hover:text-gray-900"
                aria-label="Close client details"
              >
                ×
              </button>
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-gray-500">Name</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {displayName(selectedClient) || "Name unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Username</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedClient.username?.trim() || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-gray-500">Email</dt>
                <dd className="mt-1 break-all font-medium text-gray-900">
                  {selectedClient.email?.trim() || "Email unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Client type</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {formatClientType(selectedClient.client_type)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Title</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedClient.title?.trim() || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Company</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedClient.company_name?.trim() || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Industry</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedClient.company_industry?.trim() || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-gray-500">Company website</dt>
                <dd className="mt-1 break-all font-medium text-gray-900">
                  {selectedClient.company_website?.trim() || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Account status</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {selectedClient.is_active ? "Active" : "Inactive"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Date joined</dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {formatDate(selectedClient.created_at)}
                </dd>
              </div>
            </dl>

            <p className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500">
              Client details are read-only. Profile edits and account status
              changes require dedicated secure backend endpoints.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
