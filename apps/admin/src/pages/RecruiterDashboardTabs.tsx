import { Link, useLocation } from "react-router-dom";

const tabs = [
  {
    label: "Job & Vacancy",
    to: "/admin/job-vacancy",
    paths: ["/admin/job-vacancy"],
  },
  {
    label: "Recruiters & Companies",
    to: "/admin/recruiters-clients",
    paths: ["/admin/recruiters-clients", "/admin/recruiters-companies"],
  },
  {
    label: "Active Talent Pool",
    to: "/admin/available-job",
    paths: ["/admin/available-job"],
  },
] as const;

export default function RecruiterDashboardTabs() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Recruiter and company pages"
      className="mb-5 overflow-x-auto rounded-xl border border-gray-200 bg-white p-2 shadow-sm"
    >
      <div className="flex min-w-max gap-2">
        {tabs.map((tab) => {
          const isActive = tab.paths.some((path) => path === pathname);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-purple-700 text-white"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
