import type { Icon } from "@phosphor-icons/react";

export interface CommunityNavItem {
  label: string;
  path: string;
  icon: Icon;
}

export interface PostAuthor {
  name: string;
  role: string;
  avatarInitials: string;
  avatarColorClass: string;
}

export interface Post {
  id: string;
  author: PostAuthor;
  postedAt: string;
  body: string;
  images?: string[];
  tags: string[];
  likeCount: number;
  commentCount: number;
  repostCount: number;
}

export interface UpcomingEventSummary {
  id: string;
  title: string;
  date: string;
}

export interface TrendingTopic {
  id: string;
  rank: number;
  hashtag: string;
  postCount: number;
  changePercent?: number;
}

export interface SuggestedConnection {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  avatarColorClass: string;
}

export interface JobListing {
  id: string;
  title: string;
  companyName: string;
  companyInitials: string;
  postedAt: string;
  description: string;
  location: string;
  salaryRange: string;
  employmentType: string;
  skills: string[];
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  authorName: string;
  authorInitials: string;
  authorColorClass: string;
  likeCount: number;
  viewCount?: number;
}

export interface CommunityEvent {
  id: string;
  title: string;
  category: string;
  categoryColorClass: string;
  description: string;
  dateMonth: string;
  dateDay: string;
  dateWeekday: string;
  dateColorClass: string;
  timeRange: string;
  location: string;
  attendeeSummary: string;
  organizerName: string;
  organizerInitials: string;
  organizerColorClass: string;
  ctaLabel: "Register" | "Join" | "Attend";
}

export type PostType = "job" | "question" | "project" | "insight";
