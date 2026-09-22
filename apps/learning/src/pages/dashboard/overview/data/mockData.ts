import {
  Flame,
  GraduationCap,
  Layers,
  Palette,
  Beaker,
  ShieldCheck,
} from "lucide-react";
import courseThumbnail from "../../../../assets/learningcourse.png";
import type {
  Course,
  Badge,
  Project,
  ActivityDataPoint,
  Challenge,
  UpcomingEvent,
} from "../../../../shared/types/dashboard";

export const suggestedCourses: Course[] = [
  {
    id: "fullstack-1",
    thumbnailUrl: courseThumbnail,
    level: "Beginner",
    instructorName: "Adebayo",
    instructorTitle: "Senior Frontend Engineer, Robot Specialist",
    rating: 4.9,
    reviews: 2340,
    students: "150k",
    title: "Full-stack web development",
    description:
      "From your first HTML tag to deploying a complete web app. You'll build frontend, backend and database then ship it live for the world to see.",
    milestones: [
      "UI Foundations: Build a landing page",
      "Frontend logic (js): dynamic quiz app",
      "Frontend logic (js): dynamic quiz app",
      "Frontend logic (js): dynamic quiz app",
      "Frontend logic (js): dynamic quiz app",
    ],
    meta: { milestoneCount: 7, volume: 30, durationMonths: 5 },
    price: 200,
    discountPrice: 100,
  },
  {
    id: "fullstack-2",
    thumbnailUrl: courseThumbnail,
    level: "Beginner",
    instructorName: "Adebayo",
    instructorTitle: "Senior Frontend Engineer, Robot Specialist",
    rating: 4.9,
    reviews: 2340,
    students: "150k",
    title: "Full-stack web development",
    description:
      "From your first HTML tag to deploying a complete web app. You'll build frontend, backend and database then ship it live for the world to see.",
    milestones: [
      "UI Foundations: Build a landing page",
      "Frontend logic (js): dynamic quiz app",
      "Frontend logic (js): dynamic quiz app",
      "Frontend logic (js): dynamic quiz app",
      "Frontend logic (js): dynamic quiz app",
    ],
    meta: { milestoneCount: 7, volume: 30, durationMonths: 5 },
    price: 200,
    discountPrice: 100,
  },
  {
    id: "fullstack-3",
    thumbnailUrl: courseThumbnail,
    level: "Beginner",
    instructorName: "Adebayo",
    instructorTitle: "Senior Frontend Engineer, Robot Specialist",
    rating: 4.9,
    reviews: 2340,
    students: "150k",
    title: "Full-stack web development",
    description:
      "From your first HTML tag to deploying a complete web app. You'll build frontend, backend and database then ship it live for the world to see.",
    milestones: [
      "UI Foundations: Build a landing page",
      "Frontend logic (js): dynamic quiz app",
      "Frontend logic (js): dynamic quiz app",
      "Frontend logic (js): dynamic quiz app",
      "Frontend logic (js): dynamic quiz app",
    ],
    meta: { milestoneCount: 7, volume: 30, durationMonths: 5 },
    price: 200,
    discountPrice: 100,
  },
];

export const recommendedCourses: Course[] = [
  {
    id: "recommended-1",
    thumbnailUrl: courseThumbnail,
    level: "Beginner",
    instructorName: "Adebayo",
    instructorTitle: "Senior Frontend Engineer, Robot Specialist",
    rating: 4.9,
    reviews: 2340,
    students: "150k",
    title: "Full-stack web development",
    description:
      "Learn design principles, layout, and typography basics for modern interfaces.",
    tags: ["HTML5", "CSS3", "Git & GitHub"],
    learnPoints: [
      "Understand the core concepts and principles of the subject",
      "Build real world projects to practice your skills",
      "Use industry standard tools and workflows",
    ],
    progress: 70,
    buildItems: [
      { order: 1, label: "Responsive portfolio website" },
      { order: 2, label: "Interactive JavaScript components" },
    ],
    price: 200,
    discountPrice: 100,
  },
  {
    id: "recommended-2",
    thumbnailUrl: courseThumbnail,
    level: "Beginner",
    instructorName: "Adebayo",
    instructorTitle: "Senior Frontend Engineer, Robot Specialist",
    rating: 4.9,
    reviews: 2340,
    students: "150k",
    title: "Full-stack web development",
    description:
      "Learn design principles, layout, and typography basics for modern interfaces.",
    tags: ["HTML5", "CSS3", "Git & GitHub"],
    learnPoints: [
      "Understand the core concepts and principles of the subject",
      "Build real world projects to practice your skills",
      "Use industry standard tools and workflows",
    ],
    progress: 70,
    buildItems: [
      { order: 1, label: "Responsive portfolio website" },
      { order: 2, label: "Interactive JavaScript components" },
    ],
    price: 200,
    discountPrice: 100,
  },
  {
    id: "recommended-3",
    thumbnailUrl: courseThumbnail,
    level: "Beginner",
    instructorName: "Adebayo",
    instructorTitle: "Senior Frontend Engineer, Robot Specialist",
    rating: 4.9,
    reviews: 2340,
    students: "150k",
    title: "Full-stack web development",
    description:
      "Learn design principles, layout, and typography basics for modern interfaces.",
    tags: ["HTML5", "CSS3", "Git & GitHub"],
    learnPoints: [
      "Understand the core concepts and principles of the subject",
      "Build real world projects to practice your skills",
      "Use industry standard tools and workflows",
    ],
    progress: 70,
    buildItems: [
      { order: 1, label: "Responsive portfolio website" },
      { order: 2, label: "Interactive JavaScript components" },
    ],
    price: 200,
  },
];

export const badges: Badge[] = [
  {
    id: "b1",
    label: "7 Days Streak",
    icon: Flame,
    colorClass: "bg-amber-50 text-amber-600",
  },
  {
    id: "b2",
    label: "10 lesson completed",
    icon: GraduationCap,
    colorClass: "bg-violet-50 text-violet-600",
  },
  {
    id: "b3",
    label: "Completed first module",
    icon: Layers,
    colorClass: "bg-amber-50 text-amber-600",
  },
  {
    id: "b4",
    label: "Design four screens",
    icon: Palette,
    colorClass: "bg-indigo-50 text-indigo-600",
  },
];

export const currentProjects: Project[] = [
  {
    id: "p1",
    name: "App Development",
    team: "Creative Hub",
    progress: 75,
    memberAvatars: [],
    icon: Layers,
    iconColorClass: "bg-violet-100 text-violet-600",
  },
  {
    id: "p2",
    name: "Software Testing",
    team: "D3 Testing",
    progress: 75,
    memberAvatars: [],
    icon: Beaker,
    iconColorClass: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "p3",
    name: "Quality Assurance",
    team: "Q2 Technologies",
    progress: 75,
    memberAvatars: [],
    icon: ShieldCheck,
    iconColorClass: "bg-emerald-100 text-emerald-600",
  },
];

export const weeklyActivity: ActivityDataPoint[] = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 3.5 },
  { day: "Wed", hours: 4 },
  { day: "Thu", hours: 4.2 },
  { day: "Fri", hours: 5.2 },
  { day: "Sat", hours: 3.8 },
  { day: "Sun", hours: 2.8 },
];

export const challenges: Challenge[] = [
  {
    id: "c1",
    title: "Bear Build-a-Bear Hackathon",
    subtitle: "Deep Trade",
    price: 5,
    dueInDays: 4,
    memberAvatars: [],
    icon: Layers,
    iconColorClass: "bg-violet-100 text-violet-600",
  },
  {
    id: "c2",
    title: "Bear Build-a-Bear Hackathon",
    subtitle: "Deep Trade",
    price: 5,
    dueInDays: 4,
    memberAvatars: [],
    icon: Layers,
    iconColorClass: "bg-violet-100 text-violet-600",
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  { id: "e1", title: "How to navigate tech world", provider: "Google meet" },
  { id: "e2", title: "How to navigate tech world", provider: "Google meet" },
  { id: "e3", title: "How to navigate tech world", provider: "Google meet" },
  { id: "e4", title: "Blockdag Hackathon", provider: "Google meet" },
];
