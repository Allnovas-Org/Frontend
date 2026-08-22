import { Briefcase } from "@phosphor-icons/react";

interface HiringNowJob {
  id: string;
  title: string;
  meta: string;
}

interface HiringNowCardProps {
  jobs: HiringNowJob[];
}

export function HiringNowCard({ jobs }: HiringNowCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)]">
      <div className="mb-3 flex items-center gap-2">
        <Briefcase size={18} weight="regular" className="text-[#00CA83]" aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">Hiring now</p>
      </div>
      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <div key={job.id}>
            <p className="text-sm font-semibold text-gray-900">{job.title}</p>
            <p className="mb-2 text-xs text-gray-400">{job.meta}</p>
            <button
              type="button"
              className="rounded-full bg-[#F1EFFF] px-4 py-1.5 text-xs font-medium text-[#7800B3] hover:bg-[#E6D2FF]"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
