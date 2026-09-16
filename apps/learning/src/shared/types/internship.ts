export interface InternshipStat {
  id: string;
  value: string;
  label: string;
  trendText: string;
}

export interface InternshipSkillTag {
  label: string;
  colorClass: string;
}

export interface InternshipListing {
  id: string;
  title: string;
  companyName: string;
  location: string;
  matchPercent: number;
  skills: InternshipSkillTag[];
  priceText: string;
  status: "Open" | "Closing soon";
}
