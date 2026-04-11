import { Palette, Brain, PieChart, Code, Lightbulb } from 'lucide-react'
import type { ReactNode } from 'react'
import { TbProgressCheck } from "react-icons/tb";


type Badge = {
  text: string
  icon?: ReactNode
}

type StepData = {
  number: string
  title: string
  description: string
  badges: Badge[]
  footer: string
}

const steps: readonly StepData[] = [
  {
    number: '1',
    title: 'Choose Your Career',
    description: 'Pick a structured roadmap based on your goal.',
    badges: [
      { text: 'UI/UX Designer', icon: <Palette className="h-4 w-4 text-purple-600" /> },
      { text: 'AI Foundations', icon: <Brain className="h-4 w-4 text-purple-600" /> },
      { text: 'Data Analyst', icon: <PieChart className="h-4 w-4 text-pink-500" /> },
      { text: 'Frontend Developer', icon: <Code className="h-4 w-4 text-purple-600" /> },
    ],
    footer: "You don't guess what to learn — we guide you.",
  },
  {
    number: '2',
    title: 'Learn at Your Pace',
    description: 'Pick a structured roadmap based on your goal.',
    badges: [
      { text: 'Short Lessons' },
      { text: 'Clear progression' },
      { text: 'Beginner to Advanced' },
    ],
    footer: 'No Scattered Courses',
  },
  {
    number: '3',
    title: 'Practice Daily',
    description: 'Pick a structured roadmap based on your goal.',
    badges: [
      { text: 'Daily challenges' },
      { text: 'Real world exercise' },
      { text: 'Hands-on tasks' },
    ],
    footer: 'Skills grow through doing',
  },
  {
    number: '4',
    title: 'Build Portfolio',
    description: 'Pick a structured roadmap based on your goal.',
    badges: [
      { text: 'Complete real project' },
      { text: 'Save to your profile' },
      { text: 'Build a portfolio' },
    ],
    footer: 'You finish with experience, not theory',
  },
]

type StepCardProps = {
  data: StepData
}

function StepCard({ data }: StepCardProps) {
  return (
		<div className="relative flex h-full flex-col overflow-hidden rounded-4xl border-t border-primary bg-[#F9FAFB] p-6 sm:p-12">
			<div className="mb-6 flex gap-4">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B21A8] text-3xl font-bold text-white">
					{data.number}
				</div>
				<div>
					<h3 className="text-xl font-bold leading-tight text-gray-900 sm:text-[32px]">
						{data.title}
					</h3>
					<p className="mt-2 font-medium text-lg text-gray-500">
						{data.description}
					</p>
				</div>
			</div>

			<div className="mb-10 flex flex-wrap gap-3">
				{data.badges.map((badge, i) => (
					<div
						key={i}
						className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm sm:px-4"
					>
						{badge.icon ? (
							badge.icon
						) : (
							<TbProgressCheck className="h-5 w-5 text-purple-600" />
						)}
						<span className="font-medium text-gray-600">{badge.text}</span>
					</div>
				))}
			</div>

			<div className="mt-auto flex border-l border-neutral-300 items-center gap-2">
				<Lightbulb className="h-5 w-5 text-[#6B21A8]" />
				<p className=" font-medium italic text-[#6B21A8]">{data.footer}</p>
			</div>
		</div>
	);
}

export function ZeroToJobReadySection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-gray-900 sm:mb-16 md:text-4xl">
          From Zero to Job Ready
        </h2>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <StepCard key={index} data={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
