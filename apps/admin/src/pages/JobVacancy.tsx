
import { BriefcaseBusiness, MapPin, Clock3 } from "lucide-react";

const jobs = [
  { company: "Stripe", letter: "S", color: "bg-indigo-100 text-indigo-600", location: "Remote", type: "Full-time", status: "On-site" },
  { company: "Airbnb", letter: "A", color: "bg-red-100 text-red-500", location: "On-site", type: "Full-time", status: "Internship" },
  { company: "GitHub", letter: "G", color: "bg-gray-200 text-gray-700", location: "Hybrid", type: "Contract", status: "Internship" },
  ...Array.from({ length: 5 }, () => ({
    company: "Notion",
    letter: "N",
    color: "bg-gray-900 text-white",
    location: "Remote",
    type: "Part-time",
    status: "Internship",
  })),
];

export default function JobVacancy() {
  return (
    <div className="p-6">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Job & Vacancy
        </h1>

        <div className="flex gap-2">
          <button className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white">
            + Add freelancer
          </button>
          <button className="rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-gray-900">
            + Post project
          </button>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          ["Recruiters", "12,450", "1.3%", "Up from past week"],
          ["Active Company", "48", "1.3%", "Up from past week"],
          ["Open Opportunities", "1,240", "1.8%", "Up from yesterday"],
        ].map(([title, value, growth, period], index) => (
          <div key={title} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-start justify-between">
              <p className="text-sm text-gray-500">{title}</p>
              <div className={`rounded-xl p-3 ${
                index === 0 ? "bg-purple-50 text-purple-600" :
                index === 1 ? "bg-sky-50 text-sky-500" :
                "bg-green-50 text-green-600"
              }`}>
                <BriefcaseBusiness size={22} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
            <p className="mt-4 text-sm text-gray-500">
              <span className="font-semibold text-teal-500">↗ {growth}</span>{" "}
              {period}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mb-5 overflow-hidden rounded-xl bg-slate-900 p-6 text-white">
        <div className="pointer-events-none absolute -bottom-24 left-0 h-40 w-full rounded-[50%] bg-white/10" />
        <div className="relative">
          <p className="text-sm">
            <span className="text-yellow-400">★</span> Top Hiring Partner
          </p>
          <h2 className="mt-3 text-3xl font-bold">Stripe</h2>
          <p className="mt-2 max-w-md text-sm text-gray-300">
            Actively hiring frontend and backend talents through the Allnova ecosystem.
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-xs">
            <span>♙ 10 hires this month</span>
            <span>◷ 18 hires this month</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Job & Vacancy
          </h2>
          <select className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
            <option>All Role</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <div className="divide-y divide-gray-100">
          {jobs.map((job, index) => (
            <div key={index} className="flex flex-wrap items-center gap-4 py-5">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${job.color}`}>
                {job.letter}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Senior Frontend Engineer
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span>{job.company}</span>
                  <span>·</span>
                  <MapPin size={12} />
                  <span>{job.location}</span>
                  <span>·</span>
                  <Clock3 size={12} />
                  <span>{job.type}</span>
                </div>
              </div>

              <span className="text-sm font-medium text-gray-900">
                $120K–150K
              </span>

              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                job.status === "On-site"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-blue-50 text-blue-600"
              }`}>
                • {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
