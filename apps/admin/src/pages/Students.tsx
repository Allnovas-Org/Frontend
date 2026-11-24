import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthenticationError } from "../services/adminDashboardApi";
import {
  AdminUserStatusError,
  fetchAdminUsers,
  updateAdminUserStatus,
  type AdminUser,
  type AdminUsersPage,
} from "../services/adminUsersApi";

const roles = ["admin", "student", "freelancer", "client"];

function formatCreatedAt(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

function displayName(user: AdminUser): string {
  return [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username;
}

type StatusConfirmation = {
  user: AdminUser;
  isActive: boolean;
};

function isProtectedUser(user: AdminUser): boolean {
  return user.is_staff || user.user_role.toLowerCase() === "admin";
}

export default function AdminStudents() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [usersPage, setUsersPage] = useState<AdminUsersPage | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [statusConfirmation, setStatusConfirmation] =
    useState<StatusConfirmation | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [statusError, setStatusError] = useState("");
  const [statusNotice, setStatusNotice] = useState("");
  const statusRequestInProgress = useRef(false);
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

    async function loadUsers() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchAdminUsers({
          search,
          role,
          page: pageNumber,
          pageUrl,
          signal: controller.signal,
        });
        if (active) {
          setUsersPage(result);
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
              : "Could not load users."
          );
          setUsersPage(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      active = false;
      controller.abort();
    };
  }, [navigate, pageNumber, pageUrl, retryCount, role, search]);

  function changeRole(nextRole: string) {
    setRole(nextRole);
    setPageNumber(1);
    setPageUrl(null);
    setSelectedUser(null);
  }

  function changePage(direction: "next" | "previous") {
    if (!usersPage) {
      return;
    }
    const target = direction === "next" ? usersPage.next : usersPage.previous;
    if (!target) {
      return;
    }
    setPageUrl(target);
    setPageNumber((current) =>
      direction === "next" ? current + 1 : Math.max(1, current - 1)
    );
    setSelectedUser(null);
  }

  async function confirmStatusChange() {
    if (!statusConfirmation || statusRequestInProgress.current) {
      return;
    }

    const { user, isActive } = statusConfirmation;
    if (isProtectedUser(user)) {
      return;
    }

    statusRequestInProgress.current = true;
    setUpdatingUserId(String(user.id));
    setStatusError("");
    setStatusNotice("");

    try {
      await updateAdminUserStatus(user.id, isActive);
      setStatusConfirmation(null);
      setSelectedUser(null);
      setStatusNotice(
        `${displayName(user)}'s account was ${isActive ? "activated" : "deactivated"}.`
      );
      setRetryCount((count) => count + 1);
    } catch (updateError) {
      if (updateError instanceof AdminAuthenticationError) {
        navigate("/sign-in", { replace: true });
        return;
      }

      const message =
        updateError instanceof AdminUserStatusError
          ? updateError.message
          : updateError instanceof Error
            ? updateError.message
            : "Could not update account status. Please try again.";
      setStatusError(message);

      if (
        updateError instanceof AdminUserStatusError &&
        updateError.status === 404
      ) {
        setStatusConfirmation(null);
        setRetryCount((count) => count + 1);
      }
    } finally {
      statusRequestInProgress.current = false;
      setUpdatingUserId(null);
    }
  }

  const users = usersPage?.results ?? [];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      <p className="mt-2 text-sm text-gray-500">
        View platform accounts and their current access status.
      </p>

      {statusNotice && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {statusNotice}
        </p>
      )}

      <section
        aria-label="User list filters"
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <label className="sr-only" htmlFor="user-search">
          Search users
        </label>
        <input
          id="user-search"
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search by name, username, or email..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600 sm:max-w-md"
        />
        <label className="sr-only" htmlFor="user-role-filter">
          Filter by role
        </label>
        <select
          id="user-role-filter"
          value={role}
          onChange={(event) => changeRole(event.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600"
        >
          <option value="">All roles</option>
          {roles.map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </section>

      {isLoading ? (
        <p role="status" className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Loading users...
        </p>
      ) : error ? (
        <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-white p-6">
          <p className="text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-3 text-sm font-medium text-purple-700 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : !usersPage || users.length === 0 ? (
        <p className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          {search || role
            ? "No users match your search or role filter."
            : "No users are available."}
        </p>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full border-collapse text-left">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-4 py-4 text-sm font-semibold">User</th>
                  <th className="px-4 py-4 text-sm font-semibold">Email</th>
                  <th className="px-4 py-4 text-sm font-semibold">Role</th>
                  <th className="px-4 py-4 text-sm font-semibold">Account status</th>
                  <th className="px-4 py-4 text-sm font-semibold">Staff</th>
                  <th className="px-4 py-4 text-sm font-semibold">Joined</th>
                  <th className="px-4 py-4 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold uppercase text-purple-700">
                          {user.username.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {displayName(user)}
                          </p>
                          <p className="text-xs text-gray-500">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{user.email || "—"}</td>
                    <td className="px-4 py-4 text-sm capitalize text-gray-600">
                      {user.user_role || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          user.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.is_active ? "bg-green-600" : "bg-gray-400"
                          }`}
                        />
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {user.is_staff ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {formatCreatedAt(user.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="text-sm font-medium text-purple-700 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              {usersPage.count.toLocaleString()} user
              {usersPage.count === 1 ? "" : "s"} total · Page {pageNumber}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={!usersPage.previous}
                onClick={() => changePage("previous")}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={!usersPage.next}
                onClick={() => changePage("next")}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="selected-user-heading"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 id="selected-user-heading" className="text-lg font-semibold text-gray-900">
                User details
              </h2>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                aria-label="Close user details"
                className="text-xl text-gray-500 hover:text-gray-900"
              >
                ×
              </button>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-gray-500">Name</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {displayName(selectedUser)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Username</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  @{selectedUser.username}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-gray-500">Email</dt>
                <dd className="mt-1 break-all text-sm font-medium text-gray-900">
                  {selectedUser.email || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Role</dt>
                <dd className="mt-1 text-sm font-medium capitalize text-gray-900">
                  {selectedUser.user_role || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">User ID</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {selectedUser.id}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Account status</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {selectedUser.is_active ? "Active" : "Inactive"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Staff account</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {selectedUser.is_staff ? "Yes" : "No"}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-gray-500">Date joined</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {formatCreatedAt(selectedUser.created_at)}
                </dd>
              </div>
            </dl>
            <div className="mt-6 border-t border-gray-100 pt-4">
              {isProtectedUser(selectedUser) ? (
                <p className="text-sm text-gray-500">
                  Account status changes are disabled for staff and administrator accounts.
                </p>
              ) : (
                <button
                  type="button"
                  disabled={updatingUserId !== null}
                  onClick={() => {
                    setStatusError("");
                    setStatusConfirmation({
                      user: selectedUser,
                      isActive: !selectedUser.is_active,
                    });
                  }}
                  className={`rounded-md px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 ${
                    selectedUser.is_active
                      ? "bg-gray-700 hover:bg-gray-800"
                      : "bg-purple-700 hover:bg-purple-800"
                  }`}
                >
                  {selectedUser.is_active ? "Deactivate Account" : "Activate Account"}
                </button>
              )}
              {statusError && (
                <p role="alert" className="mt-3 text-sm text-red-600">
                  {statusError}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Status changes are available only for ordinary, non-staff accounts.
              </p>
            </div>
          </section>
        </div>
      )}

      {statusConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="status-confirmation-heading"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2
              id="status-confirmation-heading"
              className="text-lg font-semibold text-gray-900"
            >
              Confirm {statusConfirmation.isActive ? "activation" : "deactivation"}
            </h2>
            <p className="mt-4 text-sm text-gray-700">
              {statusConfirmation.isActive ? "Activate" : "Deactivate"} the account
              for{" "}
              <strong>{displayName(statusConfirmation.user)}</strong>
              {" "}({statusConfirmation.user.email || "no email address"})?
            </p>
            {statusError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {statusError}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={updatingUserId !== null}
                onClick={() => {
                  setStatusConfirmation(null);
                  setStatusError("");
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={updatingUserId !== null}
                onClick={() => void confirmStatusChange()}
                className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updatingUserId !== null
                  ? "Updating..."
                  : statusConfirmation.isActive
                    ? "Confirm activation"
                    : "Confirm deactivation"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
