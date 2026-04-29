const items = [
  {
    title: 'Guided Learning Paths',
    desc: 'Structured curricula that take you from beginner to job-ready, step by step.',
  },
  {
    title: 'Hands-on Practice',
    desc: 'Learn by doing with interactive exercises and practical coding challenges.',
  },
  {
    title: 'Project Building',
    desc: 'Build portfolio-worthy projects that showcase your skills to employers.',
  },
  {
    title: 'Progress Tracking',
    desc: 'See how far you have come and what to focus on next.',
  },
] as const

export function Timeline() {
  return (
    <div className="relative  p-6 ">
      <div className="absolute bottom-6 left-9 top-6 w-2 bg-[linear-gradient(180deg,#6d11ae,#af6add)]" />

      <div className="space-y-24 pl-12 pt-16">
        {items.map((item) => (
          <article key={item.title} className="relative">
            <span className="absolute -left-11 top-2 h-6 w-6 rounded-full bg-white" />
            <h3 className="m-0 font-display text-2xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-xl text-white">{item.desc}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
