import { FeatureCard } from './FeatureCard.tsx'

type FeatureItem = {
  title: string
}

type DashboardPreviewSectionProps = {
  title?: string
  imageSrc: string
  imageAlt: string
  leftFeatures: readonly FeatureItem[]
  rightFeatures: readonly FeatureItem[]
}

export function DashboardPreviewSection({
  title = '',
  imageSrc,
  imageAlt,
  leftFeatures,
  rightFeatures,
}: DashboardPreviewSectionProps) {
  return (
		<section className="relative left-1/2 right-1/2 mt-8 w-full -translate-x-1/2 bg-black px-[3vw] py-8 shadow-soft md:py-10">
			<div className="mx-auto">
				<h2 className="mb-6 font-display text-[32px] font-semibold text-neutral-50">
					{title}
				</h2>

				<div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,3.5fr)_minmax(0,0.9fr)] md:items-center">
					<div className="flex flex-col justify-center gap-6">
						{leftFeatures.map((item) => (
							<FeatureCard key={item.title} title={item.title} />
						))}
					</div>

					<div className="overflow-hidden rounded-2xl shadow-soft">
						<img
							src={imageSrc}
							alt={imageAlt}
							className="h-80 w-full object-cover md:h-full"
						/>
					</div>

					<div className="flex flex-col justify-center gap-6">
						{rightFeatures.map((item) => (
							<FeatureCard key={item.title} title={item.title} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
