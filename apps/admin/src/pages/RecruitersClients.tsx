
import { UsersRound, BriefcaseBusiness, TrendingUp } from "lucide-react";
export default function RecruitersClients() {
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Recruiters/Clients
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage recruiters, companies, and job opportunities.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white"
          >
            + Add freelancer
          </button>

          <button
            type="button"
            className="rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-gray-900"
          >
            + Post project
          </button>
        </div>
      </div>
      
{/* Statistics cards */}
<div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
  {[
    {
      title: "Recruiters",
      value: "12,450",
      growth: "1.3%",
      period: "Up from past week",
      Icon: UsersRound,
      iconStyle: "bg-purple-100 text-purple-600",
    },
    {
      title: "Active Company",
      value: "48",
      growth: "1.3%",
      period: "Up from past week",
      Icon: BriefcaseBusiness,
      iconStyle: "bg-sky-100 text-cyan-500",
    },
    {
      title: "Open Opportunities",
      value: "1,240",
      growth: "1.8%",
      period: "Up from yesterday",
      Icon: BriefcaseBusiness,
      iconStyle: "bg-green-100 text-green-700",
    },
  ].map((stat) => (
    <div
      key={stat.title}
      className="relative min-h-[170px] rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconStyle}`}>
        <stat.Icon size={23} strokeWidth={1.8} />
      </div>

      <p className="text-sm font-medium text-gray-500">
        {stat.title}
      </p>

      <h2 className="mt-4 text-3xl font-bold text-gray-900">
        {stat.value}
      </h2>

      <div className="mt-5 flex items-center gap-2 text-sm">
        <TrendingUp size={16} className="text-teal-500" />
        <span className="font-semibold text-teal-500">
          {stat.growth}
        </span>
        <span className="text-gray-500">{stat.period}</span>
      </div>
    </div>
  ))}
</div>

{/* Top Hiring Partner */}
<div className="relative mt-5 min-h-[220px] overflow-hidden rounded-xl bg-slate-900 p-6 text-white">
  <div className="relative z-10">
    <p className="text-sm text-gray-200">
      <span className="mr-2 text-yellow-400">★</span>
      Top Hiring Partner
    </p>

    <h2 className="mt-3 text-3xl font-bold">
      Stripe
    </h2>

    <p className="mt-2 max-w-md text-sm text-gray-300">
      Actively hiring frontend and backend talents through the
      Allnova ecosystem.
    </p>

    <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-200">
      <span>♙ 10 hires this month</span>
      <span>◷ 18 hires this month</span>
    </div>
  </div>

  <div className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-full rounded-[50%] bg-white/10" />
</div>

{/* Recruiters action buttons */}
<div className="mt-5 flex flex-wrap gap-3">
  <button
    type="button"
    className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
  >
    View opportunities
  </button>

  <button
    type="button"
    className="rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
  >
    Company details
  </button>
</div>


{/* Recruiters and Companies Table */}
<div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
  <div className="flex items-center justify-between p-5">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Recruiters & Companies
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Manage platform hiring partners
      </p>
    </div>

    <button
      type="button"
      className="text-sm font-medium text-purple-700"
    >
      View all
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead className="bg-purple-50 text-gray-700">
        <tr>
          <th className="px-5 py-4 font-medium">Company</th>
          <th className="px-5 py-4 font-medium">Recruiters</th>
          <th className="px-5 py-4 font-medium">Opportunities</th>
          <th className="px-5 py-4 font-medium">Performance</th>
          <th className="px-5 py-4 font-medium">Status</th>
          <th className="px-5 py-4 font-medium">Action</th>
        </tr>
      </thead>
      
<tbody className="divide-y divide-gray-100">
  {[
    { company: "Stripe", hires: 18, recruiter: "James Bond", email: "james.bond@example.com", roles: 12, category: "UI/UX, Frontend...", performance: 100, status: "Pending" },
    { company: "PayPal", hires: 25, recruiter: "Tony Stark", email: "tony.stark@example.com", roles: 10, category: "Backend, DevOps...", performance: 85, status: "Active" },
    { company: "Square", hires: 15, recruiter: "Bruce Wayne", email: "bruce.wayne@example.com", roles: 8, category: "Mobile, UI/UX...", performance: 100, status: "Verified" },
    { company: "Amazon", hires: 30, recruiter: "Clark Kent", email: "clark.kent@example.com", roles: 14, category: "Frontend, Backend...", performance: 100, status: "Inactive" },
    { company: "Apple", hires: 22, recruiter: "Diana Prince", email: "diana.prince@example.com", roles: 9, category: "UX Research, Design...", performance: 100, status: "Verified" },
    { company: "Google", hires: 28, recruiter: "Peter Parker", email: "peter.parker@example.com", roles: 11, category: "Data Science, AI...", performance: 58, status: "Verified" },
  ].map((company) => (
    <tr key={company.company} className="hover:bg-gray-50">
      <td className="px-5 py-4">
        <p className="font-medium text-gray-900">{company.company}</p>
        <p className="text-xs text-gray-500">{company.hires} hires</p>
      </td>

      <td className="px-5 py-4">
        <p className="font-medium text-gray-900">{company.recruiter}</p>
        <p className="text-xs text-gray-500">{company.email}</p>
      </td>

      <td className="px-5 py-4">
        <p className="font-medium text-gray-900">{company.roles} Roles</p>
        <p className="text-xs text-gray-500">{company.category}</p>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-20 rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${company.performance < 70 ? "bg-yellow-400" : "bg-green-500"}`}
              style={{ width: `${company.performance}%` }}
            />
          </div>
          <span className="text-xs font-medium text-green-600">
            {company.performance}%
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
          company.status === "Verified" ? "bg-green-100 text-green-700" :
          company.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
          company.status === "Active" ? "bg-purple-100 text-purple-700" :
          "bg-gray-100 text-gray-500"
        }`}>
          • {company.status}
        </span>
      </td>

      <td className="px-5 py-4">
        <button type="button" className="text-sm font-medium text-purple-700">
          View
        </button>
      </td>
    </tr>
  ))}
</tbody>

    </table>
  </div>
</div>

 
{/* Job & Vacancy Section */}
<div className="mt-8">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-lg font-semibold text-gray-900">
      Job & Vacancy
    </h2>
    <button
      type="button"
      className="text-sm font-medium text-purple-700"
    >
      View all
    </button>
  </div>

  <div className="divide-y divide-gray-200">
    {[
      { company: "Stripe", location: "Remote", type: "Full-time", status: "Hiring" },
      { company: "Airbnb", location: "On-site", type: "Full-time", status: "Hiring" },
      { company: "GitHub", location: "Hybrid", type: "Contract", status: "Closed" },
      { company: "Notion", location: "Remote", type: "Part-time", status: "Hiring" },
    ].map((job) => (
      <div
        key={job.company}
        className="flex items-center justify-between gap-4 py-4"
      >
        <div>
          <p className="text-sm font-medium text-gray-900">
            Senior Frontend Engineer
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {job.company} · {job.location} · {job.type}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-700">
            $120K–150K
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              job.status === "Hiring"
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            • {job.status}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Available Job Section */}
<div className="mt-10">
  <div className="mb-5 flex items-center justify-between">
    <h2 className="text-lg font-semibold text-gray-900">
      Available Job
    </h2>
    <button type="button" className="text-sm font-medium text-purple-700">
      View all
    </button>
  </div>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 6 }, (_, index) => (
      <div
        key={index}
        className="rounded-xl border border-gray-200 bg-white p-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
              N
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Notion</h3>
              <p className="text-xs text-gray-500">Bessie Cooper</p>
            </div>
          </div>

          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
            index === 2 || index === 4
              ? "bg-yellow-50 text-yellow-600"
              : "bg-green-50 text-green-600"
          }`}>
            {index === 2 || index === 4 ? "Pending" : "Verified"}
          </span>
        </div>

        <div className="mt-5 flex gap-3">
          <div className="rounded-md border border-gray-200 px-3 py-2">
            <p className="text-xs text-gray-500">Hires</p>
            <p className="text-sm font-semibold">18</p>
          </div>
          <div className="rounded-md border border-gray-200 px-3 py-2">
            <p className="text-xs text-gray-500">Roles</p>
            <p className="text-sm font-semibold">12</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["React", "Node.js", "Figma", "Next.js"].map((skill) => (
            <span
              key={skill}
              className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-500"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
  
   
    </div>
  );
}
