export interface JobBadge {
  type: string;
  value: string;
}

export interface Job {
  qualifications?: string[];
  responsibilities?: string[];
  skills?: string[];
  id: string;
  logo: string;
  company: string;
  position: string;
  applicants: number;
  badges: JobBadge[];
  description: string;
  price: string;
  postedDate: number;
  posted: string;
  founded?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  amountBudget?: string;
  deliveryPeriod?: string;
  services?: string[];
}
