import type { Feature } from '../types/landing.ts'
import { cn } from '../shared/utils/cn.ts'

type FeatureHighlightsSectionProps = {
  features: readonly Feature[]
  title?: string
  description?: string
  twoColumn?: boolean
  threeColumn?: boolean
  fullBleed?: boolean
  paddingClassName?: string
}

function FeatureHighlightCard({ title, description, icon }: Feature) {
  return (
    <article className="mx-auto w-full max-w-sm border border-subtle px-6 py-12 text-neutral-50 transition-colors hover:border-strong">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-primary">
        {icon}
      </div>
      <h3 className="m-0 font-display text-xl font-semibold text-neutral-50">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-100">{description}</p>
    </article>
  )
}

export function FeatureHighlightsSection({
  features,
  title = 'Feature Highlights',
  description = 'Every tool and feature designed to accelerate your journey from learner to professional',
  twoColumn = false,
  threeColumn = false,
  fullBleed = false,
  paddingClassName = 'p-16',
}: FeatureHighlightsSectionProps) {
  const gridClassName = threeColumn
    ? 'grid grid-cols-1 justify-items-center gap-4 md:grid-cols-12 md:[&>*]:col-span-4'
    : twoColumn
      ? 'grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2'
      : 'grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 xl:grid-cols-12 xl:[&>*]:col-span-4'

  const incompleteRowCenterClassName = threeColumn
    ? 'md:[&>*:nth-last-child(2):nth-child(3n+1)]:col-start-3 md:[&>*:last-child:nth-child(3n+2)]:col-start-7'
    : !twoColumn
      ? 'xl:[&>*:nth-last-child(2):nth-child(3n+1)]:col-start-3 xl:[&>*:last-child:nth-child(3n+2)]:col-start-7'
      : ''

  return (
		<section
			className={cn(
				"mt-8 bg-black shadow-soft px-8",
				fullBleed ? "relative left-1/2 right-1/2 w-345 -translate-x-1/2" : "",
			)}
		>
			<div className={cn(paddingClassName, fullBleed ? " " : "")}>
				<div className="mb-8 text-center">
					<h2 className="m-0 font-display text-[32px] font-bold text-neutral-50">
						{title}
					</h2>
					{description ? (
						<p className="mx-auto mt-2 max-w-2xl text-neutral-100">
							{description}
						</p>
					) : null}
				</div>

				<div className={cn(gridClassName, incompleteRowCenterClassName)}>
					{features.map((feature) => (
						<FeatureHighlightCard key={feature.id} {...feature} />
					))}
				</div>
			</div>
		</section>
	);
}
