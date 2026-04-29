import { Star } from 'lucide-react'
import { IoMdBookmark } from "react-icons/io";
import courseBanner from '../../assets/path-1.png'
import { Button } from '../../shared/ui/index.ts'
import students from '../../assets/students.png'

type Milestone = {
  id: number
  text: string
}

type Course = {
  id: number
  level: string
  author: string
  authorRole: string
  title: string
  description: string
  rating: number
  reviews: string
  students: string
  priceMain: string
  payNow: string
  payToday: string
  milestones: readonly Milestone[]
  tags: readonly string[]
}

const courses: readonly Course[] = [
  {
    id: 1,
    level: 'Beginner',
    author: 'Adebayo',
    authorRole: 'Senior Frontend Engineer, Robot Specialist',
    title: 'Full-Stack Web Development',
    description:
      "From your first HTML tag to deploying a complete web app. Build frontend, backend, and database, then ship it live.",
    rating: 4.9,
    reviews: '2,340 reviews',
    students: '150k Students',
    priceMain: 'N40,000',
    payNow: 'Start with 50%',
    payToday: 'N20,000 Today',
    milestones: [
      { id: 1, text: 'Milestone 1 - UI foundations: build a landing page' },
      { id: 2, text: 'Milestone 2 - Frontend logic: dynamic quiz app' },
      { id: 3, text: 'Milestone 3 - API integration and state flow' },
      { id: 4, text: 'Milestone 4 - Backend fundamentals and auth' },
      { id: 5, text: 'Milestone 5 - Deployment and portfolio polish' },
    ],
    tags: ['7 Milestones', '30 Videos', '5 months'],
  },
  {
    id: 2,
    level: 'Intermediate',
    author: 'Mariam',
    authorRole: 'Product Engineer, Frontend Mentor',
    title: 'Frontend Product Engineering',
    description:
      'Learn architecture, accessibility, and performance patterns that production teams expect from frontend engineers.',
    rating: 4.8,
    reviews: '1,950 reviews',
    students: '98k Students',
    priceMain: 'N35,000',
    payNow: 'Start with 50%',
    payToday: 'N17,500 Today',
    milestones: [
      { id: 1, text: 'Milestone 1 - Design systems and component thinking' },
      { id: 2, text: 'Milestone 2 - Routing, forms, and validation patterns' },
      { id: 3, text: 'Milestone 3 - Performance budgets and optimization' },
      { id: 4, text: 'Milestone 4 - Testing user-facing workflows' },
      { id: 5, text: 'Milestone 5 - Team-ready capstone project' },
    ],
    tags: ['6 Milestones', '24 Videos', '4 months'],
  },
  {
    id: 3,
    level: 'Beginner',
    author: 'Daniel',
    authorRole: 'Data and AI Product Builder',
    title: 'AI App and Data Workflow',
    description:
      'Build practical AI features, evaluate outputs, and integrate data workflows into real product experiences.',
    rating: 4.7,
    reviews: '1,420 reviews',
    students: '72k Students',
    priceMain: 'N45,000',
    payNow: 'Start with 50%',
    payToday: 'N22,500 Today',
    milestones: [
      { id: 1, text: 'Milestone 1 - Prompt design basics and guardrails' },
      { id: 2, text: 'Milestone 2 - Data shaping and retrieval flow' },
      { id: 3, text: 'Milestone 3 - Feature prototyping with evaluations' },
      { id: 4, text: 'Milestone 4 - Production readiness and monitoring' },
      { id: 5, text: 'Milestone 5 - Portfolio project with demo walkthrough' },
    ],
    tags: ['8 Milestones', '28 Videos', '5 months'],
  },
]

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="overflow-hidden border border-neutral-200">
      <div className="p-3">
        <div className="relative h-38 w-full overflow-hidden rounded-2xl bg-[#1a0b2e]">
          <img src={courseBanner} alt={`${course.title} banner`} className="h-full w-full object-cover opacity-85" />
          <div className="absolute bottom-4 left-4">
            <span className="rounded-md border border-neutral-600 bg-[#2d2d2d] px-4 py-1 text-sm text-white">
              {course.level}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 md:px-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-neutral-400" />
            <div>
              <h3 className="m-0 text-sm font-bold text-neutral-800">{course.author}</h3>
              <p className="m-0 text-[10px] text-neutral-500">{course.authorRole}</p>
            </div>
          </div>
          <IoMdBookmark className="h-5 w-5 shrink-0 text-primary " />
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="flex text-[#f59e0b]">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-neutral-700">{course.rating}</span>
            <span className="text-[10px] text-neutral-400">{course.reviews}</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1">
            {/* <Users size={14} className="text-neutral-600" /> */}
            <img src={students} alt="Students icon" className="h-4 w-8" />
            <span className="text-[8px] font-bold text-neutral-600">{course.students}</span>
          </div>
        </div>

        <h2 className="mb-2 text-sm font-black uppercase leading-tight tracking-tight text-neutral-900">
          {course.title}
        </h2>
        <p className="mb-5 text-xs leading-relaxed text-neutral-500">{course.description}</p>

        <div className="mb-6 space-y-2.5">
          {course.milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-3 border-b border-neutral-100 pb-2">
              <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span className="text-xs font-medium text-neutral-700">{milestone.text}</span>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <span key={tag} className="rounded border border-neutral-300 px-3 py-1 text-[8px] text-neutral-500">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex rounded-xl items-center justify-between gap-3 pt-1 border border-neutral-200 px-4 py-2">
          <p className="m-0 text-sm font-bold leading-none text-neutral-900">{course.priceMain}</p>

          <Button variant="ghost" className="flex-col text-[10px] items-start rounded-xl border border-neutral-200 px-2 py-2 text-left">
            <span className=" font-semibold text-neutral-700">{course.payNow}</span>
            <span className=" font-medium text-neutral-400">{course.payToday}</span>
          </Button>
        </div>
      </div>
    </article>
  )
}

export function CareerSection() {
  return (
    <section className="mt-8 md:p-8">
      <h2 className="mb-0 text-center font-display text-[clamp(1.7rem,3.5vw,2.5rem)] font-bold text-neutral-900">
        Explore Career Path
      </h2>
      <p className="mx-auto mt-2 max-w-[64ch] text-center text-secondary">
        Choose a track, follow practical milestones, and build work-ready confidence through guided projects.
      </p>

      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
