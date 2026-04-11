type FeatureCardProps = {
  title: string
  // description: string
}

export function FeatureCard({ title }: FeatureCardProps) {
  return (
    <article className="mx-auto w-full max-w-xs rounded-xl border border-subtle bg-white p-3 text-center shadow-sm md:p-4">
      <div
        className="mx-auto mb-2.5 h-7 w-7 rounded-full bg-[linear-gradient(150deg,#f5ece0,#ffffff)]"
        aria-hidden="true"
      >
      </div>
      <h3 className="m-0 font-display text-base font-semibold text-neutral-900">{title}</h3>
    </article>
  )
}
