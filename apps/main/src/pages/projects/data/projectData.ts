import { Project } from "../../../types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Landing Page Design for Spotify",
    subtitle: "Craft a stunning landing page to boost conversions",
    description: `
We are looking for a Freelance Product Designer to join our dynamic team and help craft seamless,
engaging experiences for millions of users worldwide. You’ll collaborate with cross-functional
teams to design intuitive interfaces, solve complex UX challenges, and bring innovative features to life.
    `,
    budget: 2500,
    budgetType: "Fixed",
    duration: "3 months",
    experienceLevel: "Intermediate",
    freelancersNeeded: 1,
    applications: 12,
    status: "Active",
    categories: ["Web Development", "Presentation Design"],
    skills: ["Figma", "React", "Tailwind CSS", "UX Research"],
    qualifications: [
      "Strong knowledge of prototyping",
      "Experience with Figma and FigJam",
      "Ability to collaborate with cross-functional teams",
    ],
    responsibilities: [
      "Design and prototype user interfaces for web and mobile applications",
      "Conduct user research and usability testing to inform design decisions",
      "Collaborate with developers to ensure accurate implementation",
      "Create and maintain design systems and component libraries",
      "Present design concepts and rationale to stakeholders",
    ],
    location: "Worldwide",
    postedAt: "2024-12-02T10:30:00Z",
    client: {
      country: "United States",
      city: "Dallas",
      localTime: "10:30 AM",
      rating: 5.0,
      reviews: 10,
      paymentVerified: true,
      identityVerified: true,
      phoneVerified: true,
      jobsPosted: 15,
      hireRate: "100%",
      openJobs: 1,
    },
  },

  {
    id: "2",
    title: "Mobile App UI Redesign",
    subtitle:
      "Redesign an existing mobile application with improved UX and accessibility",
    description: `
Redesign an existing mobile application with improved UX, accessibility, and modern design principles.
The goal is to enhance user engagement and usability across iOS and Android platforms.
    `,
    budget: 1800,
    budgetType: "Fixed",
    duration: "2 months",
    experienceLevel: "Junior",
    freelancersNeeded: 2,
    applications: 8,
    status: "On hold",
    categories: ["Mobile App Development"],
    skills: ["Figma", "Adobe XD", "UX Design"],
    qualifications: [
      "Experience designing mobile applications",
      "Strong understanding of accessibility principles",
    ],
    responsibilities: [
      "Redesign mobile app screens with focus on user experience",
      "Ensure designs meet WCAG accessibility standards",
      "Create interactive prototypes for user testing",
      "Work closely with mobile development team",
    ],
    location: "Worldwide",
    postedAt: "2024-12-01T08:15:00Z",
    client: {
      country: "Canada",
      city: "Toronto",
      localTime: "9:15 AM",
      rating: 4.8,
      reviews: 6,
      paymentVerified: true,
      identityVerified: false,
      phoneVerified: true,
      jobsPosted: 6,
      hireRate: "85%",
      openJobs: 2,
    },
  },
];
