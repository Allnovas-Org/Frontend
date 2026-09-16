import { cn } from "../../../shared/utils/cn";
import type { InternshipListing } from "../../../shared/types/internship";
import { SkillTag } from "./SkillTag";

interface InternshipCardProps {
  listing: InternshipListing;
}

export function InternshipCard({ listing }: InternshipCardProps) {
  const { title, companyName, location, matchPercent, skills, priceText, status } = listing;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-base font-bold text-gray-900">{title}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7800B3]" aria-hidden="true" />
            {companyName}. {location}
          </p>
        </div>
        <span className="w-fit flex-shrink-0 rounded-lg border border-[#7800B3] px-3 py-1 text-xs font-medium text-[#7800B3]">
          {matchPercent}% Match
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill.label} tag={skill} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-sm font-medium text-gray-900">{priceText}</span>
        <span
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium",
            status === "Open" ? "text-emerald-600" : "text-amber-600"
          )}
        >
          <span
            className={cn("h-1.5 w-1.5 rounded-full", status === "Open" ? "bg-emerald-500" : "bg-amber-500")}
            aria-hidden="true"
          />
          {status}
        </span>
      </div>
    </div>
  );
}
