import { useNavigate } from 'react-router-dom'
import dashboardPreviewImage from '../assets/path-hero.png'
import overlayOneImage from "../assets/overlay1.svg";
import overlaySixImage from "../assets/overlay11.svg";
// import teamPreviewImage from '../assets/dash-pre.png'
// import { DashboardPreviewSection } from '../components/DashboardPreviewSection.tsx'
import { HomeHeroSection } from '../components/HomeHeroSection.tsx'
import { HowPathsWorksSection } from '../components/HowPathsWorksSection.tsx'
import { ValuePropSection } from '../components/ValuePropSection.tsx'
import { CareerSection } from '../components/sections/CareerSection.tsx'
import { FeatureHighlightsSection } from '../components/FeatureHighlightsSection.tsx'
import { coursePathFeatures } from '../constants/homeContent.tsx'


export function CoursesPage() {
  const navigate = useNavigate()

  return (
		<>
			<HomeHeroSection
				badgeText="Career-focused learning paths"
				title="Choose a career path, Not just a Course."
				description="Every Allnova path is designed to take you from beginner to job-ready with lessons, practice, and real projects."
				imageSrc={dashboardPreviewImage}
				imageAlt="Allnova dashboard preview"
				showPreview={true}
				titleClassName="text-black"
				descriptionClassName="text-secondary"
				badgeClassName="border-secondary bg-white"
				actions={[
					{
						label: "Start Learning",
						onClick: () => navigate("/courses"),
						variant: "primary",
						className: "rounded-none hover:text-white",
					},
				]}
			/>
			{/* <DashboardPreviewSection
				imageSrc={teamPreviewImage}
				imageAlt="Learners collaborating and tracking progress"
				leftFeatures={dashboardPreviewFeatures.left}
				rightFeatures={dashboardPreviewFeatures.right}
			/> */}

			<CareerSection />
			<div className="relative mt-32">
				<div className="pointer-events-none absolute -top-4/5 inset-0 z-10 hidden items-center justify-center md:flex md:-space-x-10 lg:-space-x-[169px]">
					<img
						src={overlaySixImage}
						alt=""
						aria-hidden="true"
						className="h-36 w-36 object-contain lg:h-[310px] lg:w-[295px]"
					/>
					<img
						src={overlayOneImage}
						alt=""
						aria-hidden="true"
						className="h-36 w-36 object-contain lg:h-72 lg:w-72"
					/>
				</div>
				<FeatureHighlightsSection
					features={coursePathFeatures}
					title="Every Path Comes With"
					description=""
					twoColumn
					paddingClassName="px-6 py-10 md:px-64 "
					fullBleed
				/>
			</div>
			<HowPathsWorksSection />

			<ValuePropSection />
			<div className="mt-8 rounded-3xl w-full bg-neutral-975 p-12 text-neutral-50 md:p-8">
				<HomeHeroSection
					badgeText="Flexible Payment Options"
					title="Your tech journey starts with one deecision."
					description=""
					imageSrc={dashboardPreviewImage}
					imageAlt="Allnova dashboard preview"
					showPreview={false}
					titleClassName="text-white"
					descriptionClassName="text-white"
					badgeClassName="border-white/15 bg-white"
					previewClassName="w-full"
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
