import { useNavigate } from 'react-router-dom'
import dashboardPreviewImage from '../assets/how-hero.png'
import { coursePathFeatures, growthData } from '../constants/homeContent.tsx'
import { GrowthSection } from '../components/GrowthSection.tsx'
import { HomeHeroSection } from '../components/HomeHeroSection.tsx'
import { ZeroToJobReadySection } from '../components/ZeroToJobReadySection.tsx'
// import { HowItWorksSection } from '../components/HowItWorksSection.tsx'
import { FeatureHighlightsSection } from '../components/FeatureHighlightsSection.tsx'

export function HowItWorksPage() {
  const navigate = useNavigate()

  return (
		<>
			<HomeHeroSection
				title="Your Tech Journey Made Simple"
				description="AllNova guides you step bt step- from learnin fundamentals to building real projects and becoming job-ready."
				imageSrc={dashboardPreviewImage}
				imageAlt="Allnova learning process preview"
				actions={[
									{
										label: "Start Learning",
										onClick: () => navigate("/courses"),
										variant: "primary",
										className: "rounded-none hover:text-white",
									}
								]}
				badgeClassName="border-neutral-500 text-primary uppercase"
				badgeText="Guided Tech learning"
			/>

			{/* <HowItWorksSection /> */}

			<ZeroToJobReadySection />

			<FeatureHighlightsSection
				features={coursePathFeatures.slice(0, 3)}
				title="Feature Highlights"
				description="Every tool and feature designed to accelerate your journey from learner to professional"
				threeColumn
				fullBleed
				paddingClassName="px-2 py-10 sm:px-3 md:px-4 lg:px-5"
			/>
			<GrowthSection growth={growthData} />

			<div className="mt-8 rounded-3xl bg-neutral-975 p-12 text-neutral-50 md:p-8">
				<HomeHeroSection
					badgeText=""
					title="Your tech career dosen’t have to be confuseing"
					description="Join Allnova and follow a clear path from beginner to professional — with guidance every step of the way"
					imageSrc={dashboardPreviewImage}
					imageAlt="Allnova dashboard preview"
					showPreview={false}
					titleClassName="text-white"
					descriptionClassName="text-white"
					badgeClassName="hidden border-white/15 bg-white"
					actions={[]}
				/>
			</div>
		</>
	);
}