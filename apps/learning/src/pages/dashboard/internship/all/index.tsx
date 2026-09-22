import { StatsRow } from "../../../../components/dashboard/internship/StatsRow";
import { InternshipCard } from "../../../../components/dashboard/internship/InternshipCard";
import { internshipStats, allInternshipListings } from "../data/mockInternshipData";

export function InternshipAllPage() {
  return (
    <div className="flex flex-col gap-4">
      <StatsRow stats={internshipStats} />

      <div className="flex flex-col gap-4">
        {allInternshipListings.map((listing) => (
          <InternshipCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
