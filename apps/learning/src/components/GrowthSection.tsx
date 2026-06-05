import { Award } from 'lucide-react'
import type { GrowthData } from '../types/landing.ts'

type GrowthSectionProps = {
  growth: GrowthData
}

export function GrowthSection({ growth }: GrowthSectionProps) {
  return (
		<section className="mt-8 p-6 md:p-0">
			<div className="text-center">
				<h2 className="mb-0 mt-2 font-display text-[32px] font-semibold text-neutral-900">
					See Your Growth
				</h2>
				<p className="mx-auto mt-3 max-w-2xl text-secondary">
					Always know how close you are to job-ready with clear progress
					signals, performance snapshots, and milestone badges.
				</p>
			</div>

			<div className="mt-8 grid gap-4 md:grid-cols-3">
				<article className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200  p-8 text-center">
					<div className="mb-4 flex h-36 w-36 items-center justify-center rounded-full border-4 border-primary text-3xl font-bold text-primary">
						{growth.readinessScore}%
					</div>
					<h3 className="m-0 font-display text-xl font-semibold text-neutral-900">
						Skill Readiness
					</h3>
					<p className="mt-2 text-sm text-secondary">
						{growth.readinessDescription}
					</p>
				</article>

				<article className="rounded-2xl border border-neutral-200 p-6">
					<h3 className="m-0 font-display text-xl font-semibold text-neutral-900">
						Progress Tracking
					</h3>
					<div className="mt-5 space-y-4">
						{growth.progressItems.map((item) => (
							<div key={item.name}>
								<div className="mb-1.5 flex items-center justify-between text-sm font-medium text-neutral-900">
									<span>{item.name}</span>
									<span>{item.value}%</span>
								</div>
								<div className="h-4 w-full rounded-full bg-[#ece4f5]">
									<div
										className="h-4 rounded-full bg-primary"
										style={{ width: `${item.value}%` }}
										aria-hidden="true"
									/>
								</div>
							</div>
						))}
					</div>
				</article>

				<article className="rounded-2xl border border-neutral-200 p-6">
					<h3 className="m-0 font-display text-xl font-semibold text-neutral-900">
						Badges and Milestones
					</h3>
					<div className="mt-5 space-y-2.5">
						{growth.badges.map((badge) => (
							<div
								key={badge}
								className="flex items-center w-fit gap-2 rounded-xl border border-neutral-200 bg-surface-elevated px-3.5 py-1 text-sm text-primary"
							>
								<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
									<Award size={15} />
								</span>
								<span>{badge}</span>
							</div>
						))}
					</div>
				</article>
			</div>
		</section>
	);
}