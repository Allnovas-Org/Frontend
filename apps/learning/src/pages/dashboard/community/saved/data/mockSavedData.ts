import type { Post } from "../../../../../shared/types/community";

const author = {
  name: "Chisom Ibe . Freelancer",
  role: "UI Designer",
  avatarInitials: "CI",
  avatarColorClass: "bg-violet-100 text-[#7800B3]",
};

export const savedCategoryOptions = [
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

export const savedPosts: Post[] = [
  {
    id: "saved-post-1",
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
    id: "saved-post-2",
    author: { ...author, name: "Chisom Ibe . Founder" },
    postedAt: "2h ago",
    body: "Just shipped a fintech dashboard for a Lagos-based startup. Dark mode, real-time data, full accessibility pass. Really proud of how the data viz came together.",
    tags: ["Figma", "Chart.js", "Fintech"],
    likeCount: 84,
    commentCount: 21,
    repostCount: 12,
  },
  {
    id: "saved-post-3",
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
    id: "saved-post-4",
    author: { ...author, name: "Chisom Ibe" },
    postedAt: "2h ago",
    body: "Just shipped a fintech dashboard for a Lagos-based startup. Dark mode, real-time data, full accessibility pass. Really proud of how the data viz came together.",
    tags: ["Figma", "Chart.js", "Fintech"],
    likeCount: 84,
    commentCount: 21,
    repostCount: 12,
  },
];
