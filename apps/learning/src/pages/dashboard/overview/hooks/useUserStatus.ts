import type { UserStatus } from "../../../../shared/types/dashboard";

interface UserStatusResult {
  status: UserStatus;
  userName: string;
}

// TODO: Replace this hook with real user/auth data from the API or auth store.
export function useUserStatus(): UserStatusResult {
  // Development only: change this value to preview different dashboard states.
  const mockStatus: UserStatus = "active";
  // const mockStatus: UserStatus = "inactive";

  return {
    status: mockStatus,
    userName: "Elijah",
  };
}
