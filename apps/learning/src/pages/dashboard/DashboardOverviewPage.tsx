const stats = [
  { label: 'Courses in progress', value: '4' },
  { label: 'Lessons completed', value: '27' },
  { label: 'Current streak', value: '16 days' },
]

export function DashboardOverviewPage() {
  return (
    <section className="rounded-[20px] border border-subtle bg-surface-elevated p-6 shadow-soft">
      <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-primary">Overview</p>
      <h2 className="mb-3 mt-2 font-display text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.02em]">
        Your weekly momentum
      </h2>
      <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[14px] border border-subtle bg-[linear-gradient(150deg,#ffffff,#fdf7ef)] p-4"
          >
            <p className="m-0 text-secondary">{stat.label}</p>
            <h3 className="mt-2 text-[2rem] leading-none font-semibold">{stat.value}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
