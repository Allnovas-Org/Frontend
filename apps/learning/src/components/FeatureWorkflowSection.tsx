import { ArrowRight } from 'lucide-react'

const steps = [
  { id: 1, label: 'Learning Path' },
  { id: 2, label: 'Projects' },
  { id: 3, label: 'Portfolio' },
  { id: 4, label: 'Career Ready' },
] as const

export function FeatureWorkflowSection() {
  return (
		<section className="bg-white pt-20 pb-0 text-center">
			<h2 className="mb-12 text-[32px] font-bold text-gray-900">
				How Feature Work Together
			</h2>

			<div className="flex flex-wrap items-center justify-center gap-4 px-4">
				{steps.map((step, index) => (
					<div key={step.id} className="contents">
						<div className="h-40 w-48 rounded-xl border border-gray-200 bg-[#F9FAFB] shadow-sm flex flex-col items-center justify-center">
							<div className="mb-4 flex h-10 w-8 items-center justify-center rounded-2xl bg-[#6B21A8] text-xl font-bold text-white">
								{step.id}
							</div>
							<p className="text-lg font-semibold text-gray-900">
								{step.label}
							</p>
						</div>

						{index !== steps.length - 1 ? (
							<ArrowRight className="hidden h-6 w-6 text-[#6B21A8] md:block" />
						) : null}
					</div>
				))}
			</div>
		</section>
	);
}
