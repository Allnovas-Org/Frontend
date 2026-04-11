import type React from 'react'

interface StatItem {
  value: string
  label: string
}

const stats: StatItem[] = [
  { value: '100K', label: 'Active Learner' },
  { value: '95%', label: 'Completion Rate' },
  { value: '4.9/5', label: 'Average Rate' },
]

export const StatsSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-row items-center justify-center gap-16 md:gap-24">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              {/* Stat Value */}
              <span className="mb-2 font-display text-3xl font-bold text-neutral-900 md:text-4xl">
                {stat.value}
              </span>
              {/* Stat Label */}
              <span className="font-sans text-sm font-medium text-secondary md:text-base">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
