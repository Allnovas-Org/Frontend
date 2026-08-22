import type { LucideIcon } from "lucide-react";

export type UserStatus = "active" | "inactive";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface CourseBuildItem {
  order: number;
  label: string;
}

export interface Course {
  id: string;
  thumbnailUrl?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructorName: string;
  instructorTitle: string;
  instructorAvatarUrl?: string;
  rating: number;
  reviews: number;
  students: string;
  title: string;
  description: string;
  tags?: string[];
  learnPoints?: string[];
  buildItems?: CourseBuildItem[];
  milestones?: string[];
  meta?: {
    milestoneCount: number;
    volume: number;
    durationMonths: number;
  };
  price: number;
  discountPrice?: number;
  progress?: number; // 0-100, present only for enrolled/active courses
}

export interface Badge {
  id: string;
  label: string;
  icon: LucideIcon;
  colorClass: string; // tailwind bg/text pairing
}

export interface Project {
  id: string;
  name: string;
  team: string;
  progress: number;
  memberAvatars: string[];
  icon: LucideIcon;
  iconColorClass: string;
}

export interface ActivityDataPoint {
  day: string;
  hours: number;
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  dueInDays: number;
  memberAvatars: string[];
  icon: LucideIcon;
  iconColorClass: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  provider: string;
  logoUrl?: string;
}
