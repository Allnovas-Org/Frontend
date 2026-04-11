import type { ReactNode } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { BsDot } from 'react-icons/bs'
import overlayImage from '../assets/overlay.png'
import { Button } from '../shared/ui/index.ts'
import type { ButtonProps, ButtonVariant } from '../shared/ui/button/Button.tsx'
import { cn } from '../shared/utils/cn.ts'

type HomeHeroAction = {
	label: string
	onClick: () => void
	variant?: ButtonVariant
	size?: ButtonProps['size']
	startIcon?: ReactNode
	endIcon?: ReactNode
	className?: string
}

type HomeHeroSectionProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
	showPreview?: boolean
	badgeText?: string
	titleClassName?: string
	descriptionClassName?: string
	badgeClassName?: string
	previewClassName?: string
	actions?: readonly HomeHeroAction[]
	onExploreCourses?: () => void
	onOpenDashboard?: () => void
}

export function HomeHeroSection({
  title,
  description,
  imageSrc,
  imageAlt,
  showPreview = true,
  badgeText = '100.00+ learners getting job-ready',
  titleClassName,
  descriptionClassName,
  badgeClassName,
  previewClassName,
  actions,
  onExploreCourses,
  onOpenDashboard,
}: HomeHeroSectionProps) {
	const defaultActions: Array<HomeHeroAction | null> = [
		onExploreCourses
			? {
				label: 'Start Learning',
				onClick: onExploreCourses,
				variant: 'primary',
				className: 'hover:text-white rounded-none p-4',
			}
			: null,
		onOpenDashboard
			? {
				label: 'Explorer Path',
				onClick: onOpenDashboard,
				variant: 'secondary',
				endIcon: <FiArrowRight />,
				className: 'rounded-none',
			}
			: null,
	]

	const actionItems =
		actions ?? defaultActions.filter((action): action is HomeHeroAction => action !== null)

  return (
		<section className="flex flex-col items-center text-center justify-center p-6">
			<p
				className={cn(
					' mb-4 flex items-center gap-1 rounded-4xl border border-secondary bg-white px-5 text-sm tracking-[0.08em] text-neutral-975',
					badgeClassName,
				)}
			>
				<BsDot className="h-12 w-12 text-primary" />
				{badgeText}
			</p>

			<h1
				className={cn(
					'mb-3 mt-2 font-display text-5xl font-bold tracking-[-0.02em]',
					titleClassName,
				)}
			>
				{title}
			</h1>
			<p className={cn('m-0 max-w-[68ch] text-xl text-secondary', descriptionClassName)}>
				{description}
			</p>

			{actionItems.length > 0 ? (
				<div className="my-5 flex flex-wrap gap-3">
					{actionItems.map((action) => (
						<Button
							key={action.label}
							variant={action.variant ?? 'primary'}
							size={action.size ?? 'lg'}
							startIcon={action.startIcon}
							endIcon={action.endIcon}
							onClick={action.onClick}
							className={action.className}
						>
							{action.label}
						</Button>
					))}
				</div>
			) : null}

			{showPreview ? (
				<div
					className={cn(
						'mx-auto max-w-6xl overflow-hidden rounded-2xl p-8 shadow-soft',
						previewClassName,
					)}
					style={{ backgroundImage: `url(${overlayImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
				>
					<img
						src={imageSrc}
						alt={imageAlt}
						className="h-full w-full object-cover"
					/>
				</div>
			) : null}
		</section>
	);
}
