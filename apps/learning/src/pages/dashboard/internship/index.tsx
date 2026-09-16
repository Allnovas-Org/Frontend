import { useState } from "react";
import { Link } from "react-router-dom";
import { StatsRow } from "../../../components/dashboard/internship/StatsRow";
import { FilterPills } from "../../../components/dashboard/internship/FilterPills";
import { InternshipCard } from "../../../components/dashboard/internship/InternshipCard";
import {
  internshipStats,
  internshipRoleOptions,
  internshipPreviewListings,
  totalOpenRoles,
} from "./data/mockInternshipData";

export function InternshipPage() {
  const [activeRole, setActiveRole] = useState("All Roles");

  return (
    <div className="flex flex-col gap-4">
      <StatsRow stats={internshipStats} />

      <FilterPills
        options={internshipRoleOptions}
        activeOption={activeRole}
        onSelect={setActiveRole}
      />

      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-gray-900">More opportunity</p>
        <Link to="/dashboard/internship/all" className="text-sm font-medium text-[#7800B3] hover:underline">
          See all {totalOpenRoles}
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {internshipPreviewListings.map((listing) => (
          <InternshipCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
