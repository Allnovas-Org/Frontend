import pathWalkImage from '../assets/walk.png'

type Step = {
  number: string
  title: string
  description: string
}

const steps: readonly Step[] = [
  {
    number: '01',
    title: 'Choose a career path',
    description: 'Pick the direction that matches your goals, current level, and the kind of work you want to do.',
  },
  {
    number: '02',
    title: 'Complete lessons and practice',
    description: 'Work through structured learning, then apply each concept with guided tasks and hands-on exercises.',
  },
  {
    number: '03',
    title: 'Build portfolio projects',
    description: 'Create practical, real-world projects that demonstrate your skills and show what you can actually ship.',
  },
  {
    number: '04',
    title: 'Become job-ready',
    description: 'Finish with stronger execution, proof of work, and the confidence to apply for roles and interviews.',
  },
]

export function HowPathsWorksSection() {
  return (
		<section className="mt-8 px-4 sm:px-6 lg:px-16 lg:mt-28">
			<div className="mx-auto max-w-7xl rounded-3xl border border-neutral-300 p-6 md:p-8 lg:p-0">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="mt-3 font-display text-[32px] font-bold tracking-[-0.02em] text-neutral-900">
						How paths work
					</h2>
				</div>

				<div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-5">
					<div className="">
						{steps.map((step) => (
							<article key={step.number} className=" p-5 md:p-6">
								<div className="inline-flex rounded-md bg-primary/10 px-3 py-1.5 text-base font-bold text-primary">
									{step.number}
								</div>
								<h3 className="mt-2 font-display text-2xl font-semibold text-neutral-900 md:text-2xl">
									{step.title}
								</h3>
								<p className="mt-1 text-xl leading-relaxed text-secondary md:text-base">
									{step.description}
								</p>
							</article>
						))}
					</div>

					<div className="lg:sticky lg:top-10">
						<div className="overflow-hidden ">
							<img
								src={pathWalkImage}
								alt="Learner following a guided career path"
								className="h-80 w-full rounded-3xl object-cover sm:h-105 lg:h-140"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}