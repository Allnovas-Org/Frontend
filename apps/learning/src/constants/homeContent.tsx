import { Briefcase, CreditCard, FileText, Globe, ArrowDownToDot } from 'lucide-react'
import { VscTools } from "react-icons/vsc";
import awardIcon from '../assets/award.svg'
import usersIcon from "../assets/users-group-outline.svg";
import portfolioIcon from '../assets/portfolio.svg'
import realProjectsIcon from '../assets/real-proj.svg'
import hugeAwardIcon from '../assets/huge-award.svg'

import type {
  ComparisonItem,
  CommunityTestimonial,
  Feature,
  GrowthData,
  LearningStep,
  ProblemItem,
  Service,
  Step,
} from '../types/landing.ts'

export const heroContent = {
	title: "Learn Tech Skills. Build Real Experience. Become Job-Ready.",
	description:
		"Allnova helps you go from beginner to career-ready through structured learning paths, real-world practice, and portfolio-building projects.",
} as const;

export const dashboardPreviewFeatures = {
	left: [
		{
			title: "Thousands of Learners Growing Skills",
		},
		{
			title: "High Courses Completion Rate",
		},
	],
	right: [
		{
			title: "Structured Learning Path",
			description: "Step-by-step clarity from day one",
		},
		{
			title: "Learn Faster With Guided Roadmaps",
		},
	],
} as const;

export const highlights = [
  {
    title: 'Guided Learning Paths',
    body: 'Follow job-focused tracks with projects and checkpoints.',
  },
  {
    title: 'Weekly Sprints',
    body: 'Short, focused modules keep momentum and avoid burnout.',
  },
  {
    title: 'Mentor Feedback',
    body: 'Receive actionable feedback on submissions and milestones.',
  },
] as const

export const partners = [
	{ name: "Flutterwave", logo: "/flutterwave_logo.svg" },
	{ name: "Paystack", logo: "/paystack_logo.png" },
	{ name: "Chipper", logo: "/chipper_cash.png" },
	{ name: "OPay", logo: "/opay_logo.png" },
	{ name: "Kuda", logo: "/kuda_logo.png" },
	{ name: "Piggyvest", logo: "/piggyvest_logo.png" },
	{ name: "Cowrywise", logo: "/cowrywise_logo.png" },
	{ name: "Interswitch", logo: "/interswitch_logo.png" },
] as const;

export const coursePathFeatures: readonly Feature[] = [
	{
		id: 1,
		title: "Step by step modules",
		icon: <ArrowDownToDot size={20} />,
		description:
			"Clear structured lessons that build on each other progressily",
	},
	{
		id: 2,
		title: "Practical Challenges",
		icon: <img src={hugeAwardIcon} alt="Practical Challenges icon" className="h-8 w-8" />,
		description: "Hands on exercises to reinforce what you learn",
	},
	{
		id: 3,
		title: "Real portfolio projects",
		icon: <img src={realProjectsIcon} alt="Real portfolio projects icon" className="h-8 w-8" />,
		description: "Build actual projects you can showcase to employers",
	},
	{
		id: 4,
		title: "Skill readiness tracking",
		icon: <VscTools size={20} />,
		description: "Monitor your progress and see how job ready you’re",
	},
];

export const featureHighlights: readonly Feature[] = [
	{
		id: 1,
		title: "Skill Readiness Tracking",
		icon: <VscTools size={20} className="w-8 h-8" />,
		description:
			"See exactly where you stand and what's left to master before you're job-ready.",
	},
	{
		id: 2,
		title: "Practice Challenges",
		icon: <img src={awardIcon} alt="Award icon" className="h-8 w-8" />,
		description:
			"Daily coding challenges that build real problem-solving skills.",
	},
	{
		id: 3,
		title: "Flexible Payment",
		icon: <CreditCard size={24} className="w-8 h-8" />,
		description:
			"Start with 50% and complete payment as you progress. No barriers.",
	},
	{
		id: 4,
		title: "Community Support",
		icon: <img src={usersIcon} alt="Users icon" className="h-8 w-8" />,
		description: "Learn alongside peers, get help, and never feel stuck alone.",
	},
	{
		id: 5,
		title: "Project Portfolio Builder",
		icon: <img src={portfolioIcon} alt="Portfolio icon" className="h-8 w-8" />,
		description:
			"Every completed project becomes a showcase piece for employers.",
	},
];

export const howItWorksSteps: readonly Step[] = [
  {
    id: '01',
    title: 'Choose a Career Path',
    color: 'bg-primary',
    description:
      "Pick from frontend, backend, data science, and more. We'll guide you from day one.",
  },
  {
    id: '02',
    title: 'Learn & Practice with Real Tasks',
    color: 'bg-secondary',
    description:
      'Complete lessons and immediately apply them through coding challenges and projects.',
  },
  {
    id: '03',
    title: 'Build Projects & Get Career-Ready',
    color: 'bg-neutral-900',
    description:
      'Graduate with a portfolio of real projects that prove your skills to employers.',
  },
]

export const services: readonly Service[] = [
	{
		title: "Structured learning Paths",
		description:
			"Follow step-by-step roadmaps designed for real tech careers — not scattered courses.",
		list: ["Daily challenges", "Practical tasks", "Hands-on experience"],
	},
	{
		title: "Real-World Practice",
		description:
			"Learning by doing is how skills stick and confidence compounds.",
		list: ["Daily challenges", "Practical tasks", "Hands-on experience"],
	},
	{
		title: "Project and Portfolio Builder",
		description: "Your work becomes visible proof of what you can actually do.",
		list: [
			"Build real projects",
			"Save work to your profile",
			"Create a ready-to-share portfolio",
		],
	},
	{
		title: "Skill Readiness Tracking",
		description:
			"Know how close you are to job-ready with clear signals and progress markers.",
		list: [
			"Progress tracking",
			"Skill readiness score",
			"Performance insights",
		],
	},
	{
		title: "Supportive Community",
		description:
			"You are not learning alone. Get support, feedback, and momentum from peers.",
		list: ["Ask questions", "Share projects", "Join study groups"],
	},
	{
		title: "Career Exposure",
		description:
			"We connect learning to real opportunities so progress leads somewhere concrete.",
		list: ["Internship listings", "Tech events", "Career tips"],
	},
];

export const growthData: GrowthData = {
  readinessScore: 78,
  readinessDescription: 'Your overall readiness score based on completed modules and practical submissions.',
  progressItems: [
    { name: 'HTML and CSS', value: 90 },
    { name: 'JavaScript', value: 60 },
    { name: 'React', value: 45 },
  ],
  badges: ['First Lesson', '7-Day Streak', 'Project Builder', 'Quiz Master'],
}

export const regularAppItems: readonly ComparisonItem[] = [
  { text: 'Watch videos', type: 'negative' },
  { text: 'Finish lessons', type: 'negative' },
  { text: 'Get certificate', type: 'negative' },
  { text: 'Learn alone', type: 'negative' },
  { text: 'Random courses', type: 'negative' },
]

export const allnovaItems: readonly ComparisonItem[] = [
  { text: 'Learn and practice', type: 'positive' },
  { text: 'Build real projects', type: 'positive' },
  { text: 'Become job-ready', type: 'positive' },
  { text: 'Community support', type: 'positive' },
  { text: 'Structured path', type: 'positive' },
]

export const learningSteps: readonly LearningStep[] = [
  {
    title: 'Structured Career Path',
    description:
      'Follow a clear roadmap, not scattered courses. Know exactly what to learn next.',
    icon: <Briefcase size={24} />,
    iconBgClass: 'bg-[#edf4ff]',
    iconColorClass: 'text-[#2563eb]',
  },
  {
    title: 'Real-World Practice',
    description:
      "Daily challenges and practical tasks that mirror what you'll do on the job.",
    icon: <Globe size={24} />,
    iconBgClass: 'bg-[#f3ecff]',
    iconColorClass: 'text-primary',
  },
  {
    title: 'Build a Portfolio',
    description:
      'Every project becomes proof of your skills. Show employers what you can do.',
    icon: <FileText size={24} />,
    iconBgClass: 'bg-[#ecfff3]',
    iconColorClass: 'text-[#16803c]',
  },
]

export const communityTestimonial: CommunityTestimonial = {
  name: 'Courtney Henry',
  role: 'Product Growth Lead',
  quote:
    "Thank you so much. I still cannot believe how much we packed into a short conversation. The team is friendly, deeply knowledgeable, and clearly passionate about helping learners grow into confident professionals.",
}

export const jobReadyProblems: readonly ProblemItem[] = [
  { id: 1, text: 'Too many random courses' },
  { id: 2, text: 'No portfolio after learning' },
  { id: 3, text: 'No real practice' },
  { id: 4, text: 'No clear career path' },
]
