import { NavLink, Outlet } from 'react-router-dom'

const dashboardLinks = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/my-courses', label: 'My Courses' },
  { to: '/dashboard/progress', label: 'Progress' },
  { to: '/dashboard/settings', label: 'Settings' },
]

export function DashboardLayout() {
  return (
    <div className="mx-auto my-6 grid w-[min(1220px,94vw)] grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-[20px] border border-subtle bg-[linear-gradient(180deg,#1e112f,#060609)] p-5 text-[#f3e9ff]">
        <p className="m-0 text-[0.78rem] uppercase tracking-[0.08em] text-[#dbc3ef]">Dashboard</p>
        <h1 className="mb-4.5 mt-2 font-display text-2xl font-bold">Learning Command Center</h1>

        <nav className="grid gap-2" aria-label="Dashboard navigation">
          {dashboardLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive
                  ? 'rounded-[10px] bg-[rgba(106,13,173,0.38)] px-2.75 py-2.5 font-semibold text-white'
                  : 'rounded-[10px] px-2.75 py-2.5 font-semibold text-[#dbc3ef] transition-colors duration-200 hover:bg-[rgba(251,251,251,0.1)] hover:text-white'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/" className="mt-4.5 inline-flex text-[0.88rem] text-[#fef4e7]">
          Back to marketing site
        </NavLink>
      </aside>

      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
