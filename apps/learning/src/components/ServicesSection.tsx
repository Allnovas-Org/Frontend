import { Check, Globe } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Service } from '../types/landing.ts'
import fileIcon from '../assets/file.svg'
import heartIcon from '../assets/heart-rate.svg'
import briefcaseIcon from '../assets/briefcase-thin.svg'
import penIcon from '../assets/pen.svg'
import usersIcon from '../assets/userss.svg'

type ServicesSectionProps = {
  services: readonly Service[]
}

const serviceIcons: readonly ReactNode[] = [
	<img key="pen-icon" src={penIcon} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />,
	<Globe key="world-icon" className="h-8 w-8 text-gray-400" />,
	<img key="file-icon" src={fileIcon} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />,
	<img key="heart-icon" src={heartIcon} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />,
	<img key="users-icon" src={usersIcon} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />,
	<img key="briefcase-icon" src={briefcaseIcon} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />,
]

export function ServicesSection({ services }: ServicesSectionProps) {
	const uniqueServices = Array.from(
		new Map(services.map((service) => [service.title, service])).values(),
	)

  return (
		<section className="mt-5 p-6 md:p-0">
			<div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{uniqueServices.map((service, index) => (
					<article
						key={service.title}
						className="rounded-2xl border border-neutral-300 bg-neutral-50 p-5 shadow-soft"
					>
							<span className="inline-flex h-14 w-14 shrink-0 items-center justify-center">
								{serviceIcons[index % serviceIcons.length]}
							</span>
						<div className="flex items-start gap-4">
							<div>
								<h3 className="m-0 font-display text-[32px] font-semibold text-neutral-900">
									{service.title}
								</h3>
								<p className="mt-2 text-lg leading-relaxed text-secondary">
									{service.description}
								</p>
							</div>
						</div>

						<ul className="mt-4 space-y-2.5">
							<p className="text-2xl text-neutral-900">Includes : </p>
							{service.list.map((item) => (
								<li
									key={item}
									className="flex items-start gap-2.5 text-xl text-neutral-900"
								>
									<span className="mt-0.5 inline-flex shrink-0 items-center justify-center text-primary">
										<Check size={24} />
									</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</section>
	);
}