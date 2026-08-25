import type { Post, TrendingTopic } from "../../../../../shared/types/community";

const author = {
  name: "Chisom Ibe . Freelancer",
  role: "UI Designer",
  avatarInitials: "CI",
  avatarColorClass: "bg-violet-100 text-[#7800B3]",
};

export const trendingCategoryOptions = [
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

export const trendingFeedPosts: Post[] = [
  {
    id: "trend-post-1",
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
    id: "trend-post-2",
    author: { ...author, name: "Chisom Ibe . Founder" },
    postedAt: "2h ago",
    body: "Just shipped a fintech dashboard for a Lagos-based startup. Dark mode, real-time data, full accessibility pass. Really proud of how the data viz came together.",
    tags: ["Figma", "Chart.js", "Fintech"],
    likeCount: 84,
    commentCount: 21,
    repostCount: 12,
  },
  {
    id: "trend-post-3",
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
    id: "trend-post-4",
    author: { ...author, name: "Chisom Ibe" },
    postedAt: "2h ago",
    body: "Just shipped a fintech dashboard for a Lagos-based startup. Dark mode, real-time data, full accessibility pass. Really proud of how the data viz came together.",
    tags: ["Figma", "Chart.js", "Fintech"],
    likeCount: 84,
    commentCount: 21,
    repostCount: 12,
  },
];

export const topTrendingTopics: TrendingTopic[] = [
  { id: "tt1", rank: 1, hashtag: "#AItools", postCount: 842, changePercent: 127 },
  { id: "tt2", rank: 2, hashtag: "#RemoteWork", postCount: 541, changePercent: 89 },
  { id: "tt3", rank: 3, hashtag: "#FreelanceTips", postCount: 319, changePercent: 56 },
  { id: "tt4", rank: 4, hashtag: "#BuildInPublic", postCount: 208, changePercent: 43 },
];

export const hottestPosts: Post[] = [
  {
    id: "hot-post-1",
    author,
    postedAt: "2h ago",
    body: "Just shipped a fintech dashboard for a Lagos-based startup. Dark mode, real-time data, full accessibility pass. Really proud of how the data viz came together.",
    tags: ["Figma", "Chart.js", "Fintech"],
    likeCount: 84,
    commentCount: 21,
    repostCount: 12,
  },
];
