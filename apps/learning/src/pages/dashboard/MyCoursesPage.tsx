const activeCourses = [
  { title: 'Frontend Engineering', progress: '68%' },
  { title: 'AI Application Builder', progress: '42%' },
]

export function MyCoursesPage() {
  return (
    <section className="rounded-[20px] border border-subtle bg-surface-elevated p-6 shadow-soft">
      <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-primary">My Courses</p>
      <h2 className="mb-3 mt-2 font-display text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.02em]">
        Active enrollments
      </h2>
      <div className="mt-3 grid gap-3">
        {activeCourses.map((course) => (
          <article
            key={course.title}
            className="flex items-center justify-between gap-4 rounded-[14px] border border-subtle bg-[linear-gradient(150deg,#ffffff,#fdf7ef)] p-4"
          >
            <h3 className="m-0 font-display text-xl font-semibold">{course.title}</h3>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1.5 text-[0.8rem] font-bold text-primary">
              {course.progress}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
