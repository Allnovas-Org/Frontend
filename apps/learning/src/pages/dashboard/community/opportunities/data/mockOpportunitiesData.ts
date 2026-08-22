import type { JobListing } from "../../../../../shared/types/community";

export const opportunityTypeOptions = [
  "All Types",
  "Full-time",
  "Contract",
  "Freelance",
  "Remote",
  "Paid",
  "Collaboration",
];

export const featuredOpportunities = [
  { id: "f1", companyName: "TechCorp", title: "Senior Product Designer", salaryRange: "$120k-$150k" },
  { id: "f2", companyName: "StartupXYZ", title: "React Developer", salaryRange: "$5k-$8k/mo" },
];

const baseJob: Omit<JobListing, "id"> = {
  title: "Senior Product Designer",
  companyName: "TechCorp",
  companyInitials: "TC",
  postedAt: "2h ago",
  description:
    "We're looking for a senior product designer to lead design for our B2B SaaS platform. You'll work closely with engineering and product to ship delightful experiences.",
  location: "Remote (US)",
  salaryRange: "$120k-$150k",
  employmentType: "Full-time",
  skills: ["Figma", "Product Design", "UX Research", "B2B"],
};

export const recentOpportunities: JobListing[] = [
  { ...baseJob, id: "job-1" },
  { ...baseJob, id: "job-2" },
  { ...baseJob, id: "job-3" },
  { ...baseJob, id: "job-4" },
];

export const activeOpportunitiesCount = 247;
