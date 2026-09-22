import { Outlet } from "react-router-dom";
import { CommunitySubNav } from "../../../components/dashboard/community/sub-nav/CommunitySubNav";

export function CommunityLayout() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <CommunitySubNav />
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
