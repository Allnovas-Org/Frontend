import { useNavigate } from 'react-router-dom'
import dashboardPreviewImage from '../assets/about-hero.png'
import { HomeHeroSection } from '../components/HomeHeroSection.tsx'
import { AboutSection } from '../components/sections/AboutSection.tsx'
import { GetInTouchSection } from '../components/sections/GetInTouchSection.tsx'
import { FiArrowRight } from "react-icons/fi";


export function AboutPage() {
  const navigate = useNavigate()

  return (
		<>
			<HomeHeroSection
				title="Building a Better Way To Learn Tech"
				description="Allnova was created to help learners move beyond watching courses — into building real skills, real projects, and real confidence."
				imageSrc={dashboardPreviewImage}
				imageAlt="Allnova dashboard preview"
				actions={[
					{
						label: "Learn More",
						onClick: () => navigate("/courses"),
						variant: "primary",
						className: "rounded-none hover:text-white",
					},
					{
						label: "Get in Touch",
						onClick: () => navigate("/dashboard"),
						variant: "secondary",
						endIcon: <FiArrowRight className="text-primary" />,
						className: "rounded-none",
					},
				]}
				badgeClassName="border-neutral-500 text-primary uppercase"
				badgeText="Career-focused tech learning"
			/>

			<AboutSection />

			<GetInTouchSection />

			<div className="mt-8 rounded-3xl bg-neutral-975 p-12 text-neutral-50 md:p-8">
				<HomeHeroSection
					badgeText="Flexible Payment Options"
					title="Why we build Allnova?"
					description="Too many learners take courses but still feel unprepared.
          Allnova was built to close the gap between learning and being ready for the real tech world."
					imageSrc={dashboardPreviewImage}
					imageAlt="Allnova dashboard preview"
					showPreview={false}
					titleClassName="text-white"
					descriptionClassName="text-white"
					badgeClassName="border-white/15 bg-white"
					actions={[]}
				/>
			</div>
		</>
	);
}
