import { Check, X } from 'lucide-react'
import whyImageOne from '../assets/why-1.png'
import whyImageTwo from '../assets/why-2.png'
import type { ComparisonItem } from '../types/landing.ts'

type WhyAllnovaSectionProps = {
  regularAppItems: readonly ComparisonItem[]
  allnovaItems: readonly ComparisonItem[]
}

function ComparisonCard({
  title,
  items,
  variant,
}: {
  title: string
  items: readonly ComparisonItem[]
  variant: 'negative' | 'positive'
}) {
  const iconClass = variant === 'positive' ? 'text-[#13a35f]' : 'text-[#cf3333]'
  const textClass = variant === 'positive' ? 'text-neutral-100' : 'text-neutral-300'

  return (
    <article className="rounded-3xl border border-neutral-800 bg-neutral-950 p-7 md:p-10">
      <div className="mb-7">
        <h3 className="m-0 font-display text-[32px] font-semibold text-white md:text-3xl">{title}</h3>
        <span className="mt-2 block h-1 w-16 rounded-full bg-primary" aria-hidden="true" />
      </div>

      <ul className="space-y-4 md:space-y-5">
        {items.map((item) => (
          <li key={item.text} className={`flex items-start gap-3.5 text-2xl ${textClass}`}>
            {variant === 'positive' ? (
              <Check className={`mt-0.5 h-8 w-8 shrink-0 ${iconClass}`} />
            ) : (
              <X className={`mt-0.5 h-8 w-8 shrink-0 ${iconClass}`} />
            )}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export function WhyAllnovaSection({ regularAppItems, allnovaItems }: WhyAllnovaSectionProps) {
  return (
		<section className="relative left-1/2 right-1/2 mt-28 w-screen -translate-x-1/2 overflow-hidden bg-black px-5 py-12 text-white md:px-24 md:py-16">
			<div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full bg-primary/20 blur-[95px]" />
			<div className="pointer-events-none absolute -bottom-14 -left-10 h-52 w-52 rounded-full bg-primary/20 blur-[95px]" />

			<div className="relative z-10 mb-10 text-center">
				<h2 className="m-0 font-display text-[32px] font-bold">
					Why Allnova is different
				</h2>
				<p className="mt-3 text-neutral-300">
					See how we compare to typical learning platforms.
				</p>
			</div>

			<div className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
				<div className="overflow-hidden rounded-3xl">
					<img
						src={whyImageOne}
						alt="Learner feeling stuck while studying alone"
						className="h-80 w-full object-cover grayscale-[0.15] md:h-full"
					/>
				</div>

				<ComparisonCard
					title="Regular Learning App"
					items={regularAppItems}
					variant="negative"
				/>

				<ComparisonCard
					title="Allnova Learning App"
					items={allnovaItems}
					variant="positive"
				/>

				<div className="overflow-hidden rounded-3xl">
					<img
						src={whyImageTwo}
						alt="Learners collaborating and building projects together"
						className="h-80 w-full object-cover md:h-full"
					/>
				</div>
			</div>
		</section>
	);
}