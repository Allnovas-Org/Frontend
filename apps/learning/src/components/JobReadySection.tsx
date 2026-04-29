import { IoCloseOutline } from "react-icons/io5";

import type { ProblemItem } from '../types/landing.ts'

type JobReadySectionProps = {
  problems: readonly ProblemItem[]
  imageSrc: string
  imageAlt: string
}

export function JobReadySection({ problems, imageSrc, imageAlt }: JobReadySectionProps) {
  return (
		<section className="mt-8 lg:my-20">
			<div className="mx-auto max-w-5xl text-center">
				<h2 className="m-0 font-display text-[32px] font-bold tracking-tight text-neutral-900">
					Learning online is not the problem,{" "}
					<span className="text-primary">becoming job-ready is.</span>
				</h2>
				<p className="mx-auto mt-3 max-w-3xl text-secondary md:text-lg">
					Most platforms give you videos and quizzes, but when it is time to
					apply for jobs, you are stuck without real skills or proof of work.
				</p>
			</div>

			<div className="mt-8 grid items-center gap-6 lg:grid-cols-[1fr_minmax(280px,460px)] lg:gap-10">
				<div className="space-y-3 md:space-y-4">
					{problems.map((problem) => (
						<article
							key={problem.id}
							className="flex items-center gap-4 rounded-xl border border-[#FB8181] bg-white p-4 lg:p-6 transition-transform duration-200 hover:-translate-y-0.5"
						>
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F9C4BF]">
								<IoCloseOutline
									className="h-5 w-5 text-[#C32417]"
									strokeWidth={3}
								/>
							</div>
							<p className="m-0 text-base font-semibold text-neutral-900 md:text-lg">
								{problem.text}
							</p>
						</article>
					))}
				</div>

				<div className="overflow-hidden rounded-3xl border border-subtle bg-surface-soft shadow-soft">
					<img
						src={imageSrc}
						alt={imageAlt}
						className="h-80 w-full object-cover md:h-115"
					/>
				</div>
			</div>
		</section>
	);
}
