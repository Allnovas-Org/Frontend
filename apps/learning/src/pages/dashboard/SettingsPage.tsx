export function SettingsPage() {
  return (
    <section className="rounded-[20px] border border-subtle bg-surface-elevated p-6 shadow-soft">
      <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-primary">Settings</p>
      <h2 className="mb-3 mt-2 font-display text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.02em]">
        Preferences and profile
      </h2>
      <article className="rounded-[14px] border border-subtle bg-[linear-gradient(150deg,#ffffff,#fdf7ef)] p-4">
        <h3 className="m-0 font-display text-xl font-semibold">Notification cadence</h3>
        <p className="mt-1.5 text-secondary">
          Weekly recap emails are active. Add SMS or Slack reminders in your next
          iteration.
        </p>
      </article>
    </section>
  )
}
