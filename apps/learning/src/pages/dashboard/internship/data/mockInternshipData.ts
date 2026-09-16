import type { InternshipStat, InternshipListing } from "../../../../shared/types/internship";

export const internshipStats: InternshipStat[] = [
  { id: "s1", value: "48", label: "Open Roles", trendText: "12 new this week" },
  { id: "s2", value: "3", label: "Application sent", trendText: "2 in review" },
  { id: "s3", value: "92%", label: "Hot Opportunity", trendText: "A great role to kickstart your tech career" },
];

export const internshipRoleOptions = ["All Roles", "Fronted", "Backend", "Fullstack", "Mobile", "Remote"];

const skillColorMap = {
  react: "border-blue-200 bg-blue-50 text-blue-600",
  css3: "border-orange-200 bg-orange-50 text-orange-600",
  git: "border-pink-200 bg-pink-50 text-pink-600",
  api: "border-[#7800B3]/30 bg-[#F1EFFF] text-[#7800B3]",
};

const baseListing: Omit<InternshipListing, "id" | "status"> = {
  title: "Fronted Developer Intern",
  companyName: "Stripe",
  location: "Remote",
  matchPercent: 78,
  skills: [
    { label: "React", colorClass: skillColorMap.react },
    { label: "css3", colorClass: skillColorMap.css3 },
    { label: "Git & GitHub", colorClass: skillColorMap.git },
    { label: "REST APIs", colorClass: skillColorMap.api },
  ],
  priceText: "$2,800/ months",
};

export const internshipPreviewListings: InternshipListing[] = [
  { ...baseListing, id: "int-1", status: "Open" },
  { ...baseListing, id: "int-2", status: "Closing soon" },
  { ...baseListing, id: "int-3", status: "Open" },
  { ...baseListing, id: "int-4", status: "Open" },
  { ...baseListing, id: "int-5", status: "Open" },
  { ...baseListing, id: "int-6", status: "Open" },
];

export const totalOpenRoles = 48;

// Full list (all 48) for the "See all" view - reuses the same shape, repeated to represent the full set
export const allInternshipListings: InternshipListing[] = Array.from({ length: totalOpenRoles }, (_, i) => ({
  ...baseListing,
  id: `int-all-${i + 1}`,
  status: i % 5 === 1 ? "Closing soon" : "Open",
}));
