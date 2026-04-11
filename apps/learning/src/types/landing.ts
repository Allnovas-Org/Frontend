import type { ReactNode } from 'react'

export interface Feature {
  id: number
  title: string
  description: string
  icon: ReactNode
}

export interface Step {
  id: string
  title: string
  description: string
  color: string
}

export interface Service {
  title: string
  description: string
  list: readonly string[]
}

export interface SkillProgress {
  name: string
  value: number
}

export interface GrowthData {
  readinessScore: number
  readinessDescription: string
  progressItems: readonly SkillProgress[]
  badges: readonly string[]
}

export interface ComparisonItem {
  text: string
  type: 'negative' | 'positive'
}

export interface LearningStep {
  title: string
  description: string
  icon: ReactNode
  iconBgClass: string
  iconColorClass: string
}

export interface CommunityTestimonial {
  name: string
  role: string
  quote: string
}

export interface ProblemItem {
  id: number
  text: string
}
