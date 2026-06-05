import type { CommunityTestimonial } from '../types/landing.ts'

type CommunitySectionProps = {
  testimonial: CommunityTestimonial
  imageSrc: string
  imageAlt: string
}

export function CommunitySection({ testimonial, imageSrc, imageAlt }: CommunitySectionProps) {
 

  return (
		<section className="mt-8 text-center md:px-8">
			<h2 className="m-0 font-display text-[32px] font-bold text-neutral-900">
				Hear From Our <span className="text-primary">Community</span>
			</h2>
			<p className="mx-auto mt-3 max-w-2xl text-secondary">
				Join thousands of learners who have transformed their careers with
				Allnova.
			</p>

			<div className="mx-auto mt-10 grid max-w-6xl items-center bg-black px-5 py-20 gap-6 lg:grid-cols-1 lg:text-left">
				<div className="relative mx-auto w-full max-w-4xl">
					<div className="absolute inset-0 translate-y-4 scale-[0.98] border border-secondary/50 rounded-3xl bg-[#18181b]/70" />
					<div className="absolute inset-0 translate-y-2 scale-[0.99] border border-secondary/50 rounded-3xl bg-[#18181b]/85" />

					<article className="relative rounded-3xl bg-[#18181b] border border-secondary p-8 text-left text-white shadow-2xl md:p-12">
						<div className="mb-8 flex items-center gap-4">
							
							<img src={imageSrc} alt={imageAlt} className="" />

							<div>
								<h3 className="m-0 text-lg font-bold">{testimonial.name}</h3>
								<p className="m-0 text-sm text-slate-400">{testimonial.role}</p>
							</div>
						</div>

						<p className="m-0 text-lg italic leading-relaxed text-slate-300 md:text-xl">
							&quot;{testimonial.quote}&quot;
						</p>
					</article>
				</div>

			</div>
		</section>
	);
}