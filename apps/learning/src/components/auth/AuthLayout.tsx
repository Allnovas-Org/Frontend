import { useEffect, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import signinImage from '../../assets/man-yellow.png'
import learningImage from '../../assets/learn.png'

type AuthLayoutProps = {
  children: ReactNode
}

const testimonials = [
  {
    image: signinImage,
    alt: 'Student using Allnova',
    quote:
      'Allnova has saved us thousands of hours of learning time. We are able to build real skills faster and take on bigger opportunities with confidence.',
    name: 'Jaden Ballow',
    role: 'Graphic Designer, Figma',
  },
  {
    image: learningImage,
    alt: 'Learner building projects',
    quote:
      'I moved from tutorials to portfolio projects in months. The mentorship and structure made the biggest difference for me.',
    name: 'Kehinde Ayo',
    role: 'Product Designer',
  },
] as const

export function AuthLayout({ children }: AuthLayoutProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  const activeTestimonial = testimonials[activeIndex]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900">
      <div className="flex w-full items-center justify-center p-4 sm:p-6 lg:w-1/2 lg:p-8">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </div>

      <div className="relative hidden h-screen w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={activeTestimonial.image}
            alt={activeTestimonial.alt}
            className="h-full rounded-2xl w-full object-cover object-center"
          />

          <div className="absolute bottom-10 left-1/2 w-[90%] -translate-x-1/2 rounded-3xl border border-white/20 bg-white/10 p-8 text-white backdrop-blur-xl">
            <p className="mb-6 text-lg font-medium leading-relaxed">
              "{activeTestimonial.quote}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold">{activeTestimonial.name}</h4>
                <p className="text-sm opacity-80">{activeTestimonial.role}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="white" className="text-white" />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-white/40 p-2 transition hover:bg-white/20"
                    aria-label="Previous testimonial"
                    onClick={handlePrev}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/40 p-2 transition hover:bg-white/20"
                    aria-label="Next testimonial"
                    onClick={handleNext}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
