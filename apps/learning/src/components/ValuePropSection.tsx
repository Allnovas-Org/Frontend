import type { ReactNode } from 'react'
import learningImage from '../assets/learn.png'
import { Briefcase, FileText, Monitor, Sparkles } from 'lucide-react'

type Benefit = {
  icon: ReactNode
  text: string
}

const benefits: readonly Benefit[] = [
  {
    icon: <Briefcase className="h-6 w-6 text-[#926247]" aria-hidden="true" />,
    text: 'Practical experience with real-world application',
  },
  {
    icon: <FileText className="h-6 w-6 text-[#FFD43B]" aria-hidden="true" />,
    text: 'A project portfolio that showcases your abilities',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-[#E67E22]" aria-hidden="true" />,
    text: 'Confidence to apply for professional roles',
  },
  {
    icon: <Monitor className="h-6 w-6 text-[#2C3E50]" aria-hidden="true" />,
    text: 'Career-ready skills employers are looking for',
  },
]

export function ValuePropSection() {
  return (
    <section className="mx-auto mt-8 w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="grid items-center gap-8 rounded-3xl p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
        <div className="overflow-hidden rounded-4xl bg-neutral-975/90">
          <img
            src={learningImage}
            alt="Learner using a laptop while building practical projects"
            className="h-72 w-full object-cover sm:h-96 lg:h-112"
          />
        </div>

        <div>
          <h2 className="font-display text-[32px] font-bold tracking-[-0.02em] text-neutral-900">
            What you will walk away with
          </h2>

          <ul className="mt-8 space-y-5">
            {benefits.map((benefit) => (
              <li key={benefit.text} className="flex items-start gap-4 md:gap-5">
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-soft">
                  {benefit.icon}
                </span>
                <span className="text-base font-medium leading-relaxed text-secondary md:text-lg">
                  {benefit.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}