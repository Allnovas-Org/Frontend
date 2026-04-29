import { useNavigate } from 'react-router-dom'
import dashboardPreviewImage from '../assets/feat-hero.png'
// import teamPreviewImage from '../assets/commu.png'
import {
  allnovaItems,
  regularAppItems,
  // featureHighlights,
  // highlights,
  services,
} from '../constants/homeContent.tsx'
import { WhyAllnovaSection } from "../components/WhyAllnovaSection.tsx";
 
// import { DashboardPreviewSection } from '../components/DashboardPreviewSection.tsx'
// import { FeatureHighlightsSection } from '../components/FeatureHighlightsSection.tsx'
import { HomeHeroSection } from '../components/HomeHeroSection.tsx'
import { ServicesSection } from '../components/ServicesSection.tsx'
import { FeatureWorkflowSection } from '../components/FeatureWorkflowSection.tsx'

export function FeaturesPage() {
  const navigate = useNavigate()

  return (
		<>
			<HomeHeroSection
				title="Everything You Need to Become Job-Ready in Tech"
				description="Allnova combines structured learning, real-world practice, and career-focused tools to help you build skills that matter"
				imageSrc={dashboardPreviewImage}
				imageAlt="Allnova features preview"
				actions={[
					{
						label: "Start Learning",
						onClick: () => navigate("/courses"),
						variant: "primary",
						className: "rounded-none hover:text-white",
					},
				]}
			/>

			<ServicesSection services={services} />
			<FeatureWorkflowSection />

			<WhyAllnovaSection
				regularAppItems={regularAppItems}
				allnovaItems={allnovaItems}
			/>

			<div className="mt-8 rounded-3xl bg-neutral-975 p-12 text-neutral-50 md:p-8">
				<HomeHeroSection
					badgeText=""
					title="Flexible Payment Option"
					description="Pay 50% and start immediately. Complete payment later as you grow. No barriers to starting your tech career"
					imageSrc={dashboardPreviewImage}
					imageAlt="Allnova dashboard preview"
					showPreview={false}
					titleClassName="text-white"
					descriptionClassName="text-white"
					badgeClassName="hidden border-white/15 bg-white"
					actions={[
						{
							label: "Choose Path",
							onClick: () => navigate("/courses"),
							variant: "primary",
							className: "rounded-none hover:text-white",
						},
					]}
				/>
			</div>
		</>
	);
}
