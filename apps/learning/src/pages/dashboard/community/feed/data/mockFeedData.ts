import type {
  Post,
  UpcomingEventSummary,
  TrendingTopic,
  SuggestedConnection,
} from "@/shared/types/community";


const author = {
  name: "Chisom Ibe . Freelancer",
  role: "UI Designer",
  avatarInitials: "CI",
  avatarColorClass: "bg-violet-100 text-[#7800B3]",
};

export const feedPosts: Post[] = [
  {
    id: "post-1",
    author,
    postedAt: "2h ago",
    body: "Just shipped a fintech dashboard for a Lagos-based startup. Dark mode, real-time data, full accessibility pass. Really proud of how the data viz came together.",
    images: ["https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=800"],
    tags: ["Figma", "Chart.js", "Fintech"],
    likeCount: 84,
    commentCount: 21,
    repostCount: 12,
  },
  {
    id: "post-2",
    author: { ...author, name: "Chisom Ibe . Founder" },
    postedAt: "2h ago",
    body: "Just shipped a fintech dashboard for a Lagos-based startup. Dark mode, real-time data, full accessibility pass. Really proud of how the data viz came together.",
    tags: ["Figma", "Chart.js", "Fintech"],
    likeCount: 84,
    commentCount: 21,
    repostCount: 12,
  },
  {
    id: "post-3",
    author: { ...author, name: "Chisom Ibe . student" },
    postedAt: "2h ago",
    body: "Just shipped a fintech dashboard for a Lagos-based startup. Dark mode, real-time data, full accessibility pass. Really proud of how the data viz came together.",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=600",
    ],
    tags: ["Figma", "Chart.js", "Fintech"],
    likeCount: 84,
    commentCount: 21,
    repostCount: 12,
  },
  {
    id: "post-4",
    author: { ...author, name: "Chisom Ibe" },
    postedAt: "2h ago",
    body: "Just shipped a fintech dashboard for a Lagos-based startup. Dark mode, real-time data, full accessibility pass. Really proud of how the data viz came together.",
    tags: ["Figma", "Chart.js", "Fintech"],
    likeCount: 84,
    commentCount: 21,
    repostCount: 12,
  },
];

export const upcomingEvents: UpcomingEventSummary[] = [
  { id: "e1", title: "UI Critique session", date: "Sat, May 24 . 3:00 PM" },
  { id: "e2", title: "Freelance Pricing AMA", date: "Sat, May 24 . 3:00 PM" },
];

export const trendingTopics: TrendingTopic[] = [
  { id: "t1", rank: 1, hashtag: "#AItools", postCount: 842 },
  { id: "t2", rank: 2, hashtag: "#RemoteWork", postCount: 541 },
  { id: "t3", rank: 3, hashtag: "#FreelanceTips", postCount: 319 },
  { id: "t4", rank: 4, hashtag: "#BuildInPublic", postCount: 208 },
];

export const suggestedConnections: SuggestedConnection[] = [
  { id: "c1", name: "Obinna Eze", role: "Frontend", avatarInitials: "OE", avatarColorClass: "bg-blue-100 text-blue-700" },
  { id: "c2", name: "Obinna Eze", role: "Founder", avatarInitials: "OE", avatarColorClass: "bg-blue-100 text-blue-700" },
  { id: "c3", name: "Obinna Eze", role: "Frontend", avatarInitials: "OE", avatarColorClass: "bg-blue-100 text-blue-700" },
  { id: "c4", name: "Obinna Eze", role: "Frontend", avatarInitials: "OE", avatarColorClass: "bg-blue-100 text-blue-700" },
];

export const hiringNowJobs = [
  { id: "j1", title: "Motion Designer", meta: "Remote . Contract" },
  { id: "j2", title: "Motion Designer", meta: "Remote . Contract" },
];

export const feedCategoryOptions = [
  "All",
  "Design",
  "Development",
  "AI",
  "Writing",
  "Freelancing",
  "Startups",
  "Remote",
  "Learning",
];
