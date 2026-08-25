import { Buildings, MapPin } from "@phosphor-icons/react";
import type { JobListing } from "../../../../shared/types/community";

interface OpportunityCardProps {
  job: JobListing;
}

export function OpportunityCard({ job }: OpportunityCardProps) {
  const { title, companyName, companyInitials, postedAt, description, location, salaryRange, employmentType, skills } = job;

  return (
    <div className="rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#7800B3] text-sm font-bold text-white">
            {companyInitials}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 sm:text-base">{title}</p>
            <p className="flex items-center gap-1 text-xs text-gray-400">
              <Buildings size={13} weight="regular" aria-hidden="true" />
              {companyName} &middot; Posted {postedAt}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="hidden flex-shrink-0 rounded-full bg-[#F1EFFF] px-4 py-1.5 text-xs font-medium text-[#7800B3] hover:bg-[#E6D2FF] sm:block"
        >
          Apply
        </button>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-600">
          <MapPin size={12} weight="regular" aria-hidden="true" />
          {location}
        </span>
        <span className="rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-600">{salaryRange}</span>
        <span className="rounded-full bg-[#F1EFFF] px-3 py-1 text-xs font-medium text-[#7800B3]">
          {employmentType}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="rounded bg-gray-50 px-2 py-1 text-[11px] text-gray-500">
            {skill}
          </span>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-full bg-[#F1EFFF] py-2 text-xs font-medium text-[#7800B3] hover:bg-[#E6D2FF] sm:hidden"
      >
        Apply
      </button>
    </div>
  );
}
