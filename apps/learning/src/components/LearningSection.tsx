import type { LearningStep } from '../types/landing.ts'

type LearningSectionProps = {
  steps: readonly LearningStep[]
  imageSrc: string
  imageAlt: string
}

export function LearningSection({ steps, imageSrc, imageAlt }: LearningSectionProps) {
  return (
		<section className="mt-8 md:p-8">
			<div className="text-center">
				<h2 className="m-0 font-display text-[32px] font-bold text-neutral-900">
					Allnova turns learning into real skill
				</h2>
				<p className="mx-auto mt-3 max-w-3xl text-secondary">
					We combine structured learning with hands-on practice so you graduate
					with skills employers actually want.
				</p>
			</div>

			<div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(280px,450px)_1fr] lg:gap-12">
				<div className="relative mx-auto w-full h-full max-w-lg">
					<div className="relative z-10 rounded-xl bg-primary p-2 h-full">
						<div className="overflow-hidden h-full rounded-lg">
							<img
								src={imageSrc}
								alt={imageAlt}
								className="h-full w-full object-cover"
							/>
						</div>
					</div>

					<span
						className="pointer-events-none absolute -bottom-4 -right-4 z-0 h-16 w-16 rounded-2xl bg-primary md:-bottom-6 md:-right-6 md:h-24 md:w-24"
						aria-hidden="true"
					/>
				</div>

				<div className="flex flex-col gap-4">
					{steps.map((step) => (
						<article
							key={step.title}
							className="flex items-start gap-4 rounded-2xl border border-secondary bg-surface p-5 shadow-soft"
						>
							<div
								className={`mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-subtle ${step.iconBgClass} ${step.iconColorClass}`}
							>
								{step.icon}
							</div>

							<div>
								<h3 className="m-0 font-display text-xl font-semibold text-neutral-900">
									{step.title}
								</h3>
								<p className="mt-1.5 text-sm leading-relaxed text-secondary">
									{step.description}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}