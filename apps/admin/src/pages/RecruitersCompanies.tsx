import { BriefcaseBusiness, TrendingUp, UsersRound } from "lucide-react";

const companies = [
  { name: "Stripe", hires: 18, recruiter: "James Bond", email: "james.bond@mi6.co.uk", roles: 12, category: "UI/UX, Frontend...", performance: 100, status: "Pending" },
  { name: "PayPal", hires: 25, recruiter: "Tony Stark", email: "tony.stark@starkindustries.com", roles: 10, category: "Backend, DevOps...", performance: 85, status: "Hiring" },
  { name: "Square", hires: 15, recruiter: "Bruce Wayne", email: "bruce.wayne@wayneenterprise.com", roles: 8, category: "Mobile, UI/UX...", performance: 100, status: "Verified" },
  { name: "Amazon", hires: 30, recruiter: "Clark Kent", email: "clark.kent@dailyplanet.com", roles: 14, category: "Frontend, Backend...", performance: 100, status: "Inactive" },
  { name: "Apple", hires: 22, recruiter: "Diana Prince", email: "diana.prince@themyscira.com", roles: 9, category: "UX Research, Design...", performance: 100, status: "Verified" },
  ...Array.from({ length: 4 }, () => ({
    name: "Google", hires: 28, recruiter: "Peter Parker",
    email: "peter.parker@dailybugle.com", roles: 11,
    category: "Data Science, AI...", performance: 58, status: "Verified"
  }))
];

const stats = [
  { title: "Recruiters", value: "12,450", growth: "1.3%", period: "Up from past week", icon: UsersRound, iconColor: "text-purple-600", iconBg: "bg-purple-50" },
  { title: "Active Company", value: "48", growth: "1.3%", period: "Up from past week", icon: BriefcaseBusiness, iconColor: "text-cyan-500", iconBg: "bg-sky-50" },
  { title: "Open Opportunities", value: "1,240", growth: "1.8%", period: "Up from yesterday", icon: BriefcaseBusiness, iconColor: "text-green-600", iconBg: "bg-green-50" }
];

export default function RecruitersCompanies() {
  return (
    <div className="p-6">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Recruiters &amp; companies</h1>
        <div className="flex gap-2">
          <button className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white">+ Add freelancer</button>
          <button className="rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-gray-900">+ Post project</button>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.title} className="relative rounded-xl bg-white p-5 shadow-sm">
            <div className={`absolute right-5 top-5 rounded-xl p-3 ${stat.iconBg} ${stat.iconColor}`}>
              <stat.icon size={23} />
            </div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">{stat.value}</h2>
            <div className="mt-5 flex items-center gap-2 text-sm">
              <TrendingUp size={16} className="text-teal-500" />
              <span className="font-semibold text-teal-500">{stat.growth}</span>
              <span className="text-gray-500">{stat.period}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mb-5 overflow-hidden rounded-xl bg-slate-900 p-6 text-white">
        <div className="pointer-events-none absolute -bottom-24 left-0 h-44 w-full rounded-[50%] bg-white/10" />
        <div className="relative">
          <p className="text-sm"><span className="text-yellow-400">★</span> Top Hiring Partner</p>
          <h2 className="mt-3 text-3xl font-bold">Stripe</h2>
          <p className="mt-2 max-w-md text-sm text-gray-300">Actively hiring frontend and backend talents through the Allnova ecosystem.</p>
          <div className="mt-6 flex gap-5 text-xs">
            <span>♧ 10 hires this month</span>
            <span>◷ 18 hires this month</span>
          </div>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button className="rounded-md bg-purple-700 px-4 py-2 text-sm text-white">View opportunities</button>
          <button className="rounded-md border border-purple-300 bg-white px-4 py-2 text-sm text-purple-700">Company details</button>
        </div>
        <select className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
          <option>All</option>
          <option>Verified</option>
          <option>Pending</option>
          <option>Hiring</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="font-semibold text-gray-900">Recruiters &amp; companies</h2>
            <p className="mt-1 text-xs text-gray-500">Manage platform hiring partners</p>
          </div>
          
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-purple-50 text-gray-800">
              <tr>
                {["Company", "Recruiters", "Opportunities", "Performance", "Status", "Action"].map((heading) => (
                  <th key={heading} className="px-4 py-4 font-medium">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-700 text-xs font-bold text-white">G</span>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-xs text-gray-400">{company.hires} hires</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{company.recruiter}</p>
                    <p className="text-xs text-gray-400">{company.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{company.roles} Roles</p>
                    <p className="text-xs text-gray-400">{company.category}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-100">
                        <div className={`h-full rounded-full ${company.performance < 60 ? "bg-yellow-400" : company.performance < 100 ? "bg-teal-500" : "bg-green-500"}`} style={{ width: `${company.performance}%` }} />
                      </div>
                      <span className={`text-xs font-medium ${company.performance < 60 ? "text-yellow-500" : "text-green-600"}`}>{company.performance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs ${company.status === "Verified" ? "bg-green-100 text-green-700" : company.status === "Pending" ? "bg-yellow-100 text-yellow-700" : company.status === "Hiring" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-500"}`}>
                      • {company.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-sm font-medium text-purple-700">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}