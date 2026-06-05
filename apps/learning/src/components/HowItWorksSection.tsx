import type { ReactNode } from 'react'
import fullcircle from '../assets/circle1.svg'
import halfcircle from '../assets/circle2.svg'

type Step = {
	id: string
	title: string
	description: string
	icon: ReactNode
}

const steps: readonly Step[] = [
	{
		id: '01',
		title: 'Choose a career path',
		description: 'Pick from frontend, backend, data science, and more. We will guide you from day one.',
		icon: <img src={fullcircle} alt="Full circle icon" className="h-5 w-5" />,
	},
	{
		id: '02',
		title: 'Learn and practice with real tasks',
		description: 'Complete lessons and immediately apply them through coding challenges and projects.',
		icon: <img src={halfcircle} alt="Half circle icon" className="h-5 w-5" />,
	},
	{
		id: '03',
		title: 'Build projects and get career-ready',
		description: 'Graduate with a portfolio of real projects that prove your skills to employers.',
		icon: <img src={fullcircle} alt="Full circle icon" className="h-5 w-5" />,
	},
]

export function HowItWorksSection() {
	return (
		<section className="mt-8 px-4 py-14 font-sans sm:px-6 md:py-0 lg:px-0">
			<div className="mx-auto max-w-7xl">
				<div className="mb-12 text-center md:mb-16">
					<h2 className="m-0 font-display text-[32px] font-bold text-neutral-900">
						How it works
					</h2>
					<p className="mx-auto mt-3 max-w-2xl text-base text-secondary md:text-xl">
						Three simple steps to transform from beginner to job-ready
						professional.
					</p>
				</div>

				<div className="relative">
					<div className="relative mb-8 hidden md:block" aria-hidden="true">
						<div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border-subtle" />
						<div className="relative grid grid-cols-3 gap-8">
							{steps.map((step) => (
								<div key={`${step.id}-icon`} className="flex justify-start">
									<span className="inline-flex bg-surface p-1">
										{step.icon}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
						{steps.map((step) => (
							<article
								key={step.id}
								className="relative z-10 flex h-full flex-col"
							>
								<div className="mb-6 flex justify-center bg-transparent p-1 md:hidden">
									{step.icon}
								</div>

								<div className="flex-1 rounded-2xl border border-subtle bg-surface-elevated p-6 transition-shadow duration-300 hover:shadow-soft md:p-8">
									<span className="mb-4 block font-bold text-primary">
										{step.id}
									</span>
									<h3 className="mb-3 font-display text-2xl font-bold leading-tight text-neutral-900">
										{step.title}
									</h3>
									<p className="leading-relaxed text-sm text-secondary">
										{step.description}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
