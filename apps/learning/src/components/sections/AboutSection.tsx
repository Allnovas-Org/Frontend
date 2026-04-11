import { Card } from '../ui/Card.tsx'
import { Timeline } from './Timeline.tsx'

export function AboutSection() {
  return (
		<section className="relative left-1/2 right-1/2 mt-8 w-screen -translate-x-1/2 bg-black shadow-soft">
			<div className="mx-auto w-[min(1120px,94vw)] p-6 md:p-8">
				<div className="grid gap-6 md:grid-cols-2 md:gap-8">
				<div className="space-y-5">
					<Card>
						<h2 className="m-0 font-display text-4xl font-semibold text-white">
							About Allnova
						</h2>
						<p className="mt-3 text-2xl text-white">
							Allnova Learning is a career-focused tech learning platform
							designed to guide beginners into becoming job-ready professionals.
							We believe learning should be structured, practical, and connected
							to real-world skills.
						</p>
					</Card>

					<Card>
						<h2 className="m-0 font-display text-4xl font-semibold text-white">
							Our Mission
						</h2>
						<p className="mt-3 text-2xl text-white">
							To make tech learning clear, practical, and accessible — helping
							more people gain skills that create real opportunities.
						</p>
					</Card>
				</div>

					<Timeline />
				</div>

				<p className="m-0 mt-8 text-center text-3xl text-white md:text-lg">
					So learners don't just finish lessons — they grow into capable tech
					professionals.
				</p>
			</div>
		</section>
	);
}
