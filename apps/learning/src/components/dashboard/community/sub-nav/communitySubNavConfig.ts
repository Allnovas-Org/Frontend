import {
  SquaresFour,
  TrendUp,
  Briefcase,
  PaintBrush,
  BookmarkSimple,
  CalendarBlank,
  Compass,
} from "@phosphor-icons/react";
import type { CommunityNavItem } from "../../../../shared/types/community";

export const communitySubNavItems: CommunityNavItem[] = [
  { label: "Feed", path: "/dashboard/community/feed", icon: SquaresFour },
  { label: "Trending", path: "/dashboard/community/trending", icon: TrendUp },
  { label: "Opportunities", path: "/dashboard/community/opportunities", icon: Briefcase },
  { label: "Showcase", path: "/dashboard/community/showcase", icon: PaintBrush },
  { label: "Saved", path: "/dashboard/community/saved", icon: BookmarkSimple },
  { label: "Events", path: "/dashboard/community/events", icon: CalendarBlank },
  { label: "Mentorship", path: "/dashboard/community/mentorship", icon: Compass },
];
