export function ProgressPage() {
  return (
    <section className="rounded-[20px] border border-subtle bg-surface-elevated p-6 shadow-soft">
      <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-primary">Progress</p>
      <h2 className="mb-3 mt-2 font-display text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.02em]">
        Track consistency and outcomes
      </h2>
      <article className="rounded-[14px] border border-subtle bg-[linear-gradient(150deg,#ffffff,#fdf7ef)] p-4">
        <h3 className="m-0 font-display text-xl font-semibold">Completion trend</h3>
        <p className="mt-1.5 text-secondary">
          You are on pace to finish your current path in 5 weeks. Keep your
          learning streak above 5 sessions per week for best results.
        </p>
      </article>
    </section>
  )
}
