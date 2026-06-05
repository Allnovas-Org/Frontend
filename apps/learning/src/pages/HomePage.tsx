import { useNavigate } from 'react-router-dom'
import dashboardPreviewImage from '../assets/home-hero.png'
import AvatarImage from '../assets/commu.png'
import learningPreviewImage from '../assets/learn.png'
import jobReadyImage from '../assets/why-1.png'
import overlayOneImage from '../assets/overlay1.svg'
import overlaySixImage from '../assets/overlay11.svg'
import overlayTwoImage from '../assets/overlay2.svg'
import overlayNineImage from '../assets/overlay9.svg'
import overlayTenImage from '../assets/overlay10.svg'
import overlayFiveImage from '../assets/overlay5.svg'
import overlayFourImage from "../assets/overlay4.svg";
import overlaySevenImage from "../assets/overlay7.svg";
import overlayFt from "../assets/overlay14.svg";
import { FiArrowRight } from 'react-icons/fi'
import {
	allnovaItems,
	communityTestimonial,
  featureHighlights,
  heroContent,
  // highlights,
	jobReadyProblems,
	learningSteps,
  partners,
	regularAppItems,
} from '../constants/homeContent.tsx'
import { CommunitySection } from '../components/CommunitySection.tsx'
import { FeatureHighlightsSection } from '../components/FeatureHighlightsSection.tsx'
import { HomeHeroSection } from '../components/HomeHeroSection.tsx'
import { HowItWorksSection } from '../components/HowItWorksSection.tsx'
import { JobReadySection } from '../components/JobReadySection.tsx'
import { LearningSection } from '../components/LearningSection.tsx'
import { PartnerLogosSection } from '../components/PartnerLogosSection.tsx'
import { WhyAllnovaSection } from '../components/WhyAllnovaSection.tsx'
import { StatsSection } from '../components/StatsSection.tsx'

export function HomePage() {
  const navigate = useNavigate()

  return (
		<>
			<HomeHeroSection
				title={heroContent.title}
				description={heroContent.description}
				imageSrc={dashboardPreviewImage}
				imageAlt="Allnova dashboard preview"
				onExploreCourses={() => navigate("/courses")}
				onOpenDashboard={() => navigate("/dashboard")}
			/>

			<PartnerLogosSection partners={partners} />

			<div className="relative">
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
					features={featureHighlights}
					paddingClassName="px-2 py-10 sm:px-3 md:px-4 lg:px-5 lg:pt-32 lg:pb-48"
					fullBleed
				/>

				<div className="pointer-events-none absolute -top-28 inset-0 z-10 hidden flex-col items-center justify-center md:flex md:-space-y-4 lg:-space-y-10">
					<img
						src={overlaySevenImage}
						alt=""
						aria-hidden="true"
						className="h-30 lg:h-64"
					/>
				</div>

				<div className="pointer-events-none absolute top-3/4 inset-0 z-10 hidden flex-col items-center justify-center md:flex md:-space-y-4 lg:-space-y-10">
					<img
						src={overlaySevenImage}
						alt=""
						aria-hidden="true"
						className="h-28 lg:h-40"
					/>
					<img
						src={overlayFourImage}
						alt=""
						aria-hidden="true"
						className="h-28 lg:h-28"
					/>
				</div>
			</div>
			<HowItWorksSection />

			<div className="relative">
				<div className="pointer-events-none absolute -right-40 top-0 z-10 hidden md:flex">
					<div className="relative">
						<img
							src={overlayTenImage}
							alt=""
							aria-hidden="true"
							className="h-12 w-auto lg:h-52"
						/>
						<img
							src={overlayNineImage}
							alt=""
							aria-hidden="true"
							className="absolute right-0 top-0 h-10 w-auto lg:h-40"
						/>
					</div>
				</div>

				<div className="pointer-events-none absolute inset-y-72 -left-16 top-3/4  z-10 hidden -translate-x-1/4 flex-col items-center justify-center gap-10 md:flex lg:gap-14 lg:-translate-x-4/5">
					<img
						src={overlayFiveImage}
						alt=""
						aria-hidden="true"
						className="h-20 lg:h-80"
					/>
					<img
						src={overlaySevenImage}
						alt=""
						aria-hidden="true"
						className="h-20 lg:h-36"
					/>
				</div>

				<div className="pointer-events-none absolute right-0 top-8/12 z-10 hidden -translate-y-1/2 flex-col items-end justify-center gap-4 md:flex md:right-2 md:gap-5 lg:right-8 lg:gap-20 xl:-right-40">
					<img
						src={overlayFt}
						alt=""
						aria-hidden="true"
						className="h-12 w-auto md:h-16 lg:h-24 xl:h-32"
					/>
					<img
						src={overlaySixImage}
						alt=""
						aria-hidden="true"
						className="h-20 w-auto md:h-28 lg:h-48 xl:h-64"
					/>
					<img
						src={overlayTwoImage}
						alt=""
						aria-hidden="true"
						className="h-12 w-auto md:h-16 lg:h-24 xl:h-32"
					/>
				</div>

				<WhyAllnovaSection
					regularAppItems={regularAppItems}
					allnovaItems={allnovaItems}
				/>
			</div>
			<LearningSection
				steps={learningSteps}
				imageSrc={learningPreviewImage}
				imageAlt="Learner developing practical tech skills"
			/>
			<CommunitySection
				testimonial={communityTestimonial}
				imageSrc={AvatarImage}
				imageAlt="Allnova learners collaborating as a community"
			/>
			<JobReadySection
				problems={jobReadyProblems}
				imageSrc={jobReadyImage}
				imageAlt="Learner preparing for job-ready skills"
			/>

			<div className="mt-8 rounded-3xl bg-neutral-975 p-12 text-neutral-50 md:p-8">
				<HomeHeroSection
					title={heroContent.title}
					description={heroContent.description}
					imageSrc={dashboardPreviewImage}
					imageAlt="Allnova dashboard preview"
					showPreview={false}
					titleClassName="text-white"
					descriptionClassName="text-white/90"
					badgeClassName="border-white/15 bg-white"
					actions={[
						{
							label: "Start Learning",
							onClick: () => navigate("/courses"),
							variant: "primary",
							className: "rounded-none hover:text-white",
						},
						{
							label: "Explore Dashboard",
							onClick: () => navigate("/dashboard"),
							variant: "secondary",
							endIcon: <FiArrowRight className="text-white" />,
							className: "rounded-none",
						},
					]}
				/>
			</div>

			<StatsSection />
		</>
	);
}
