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
  experience?: string;
  budget?: string;
  delivery?: string;
  about?: string;
  hearted?: boolean;
  category?: string;
  subcategory?: string;
}

export interface Step {
  id: number;
  label: string;
}

export interface WorkExperience {
  jobTitle: string;
  company: string;
  stillWorking: boolean;
  jobDescription: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
}

export interface Seller {
  name: string;
  avatarUrl: string;
  isAvailable: boolean;
  recommendations: number;
}

export interface PricingTier {
  name: string;
  deliveryTime: string;
  plugins: boolean;
  pages: string;
  responsive: boolean;
  revisions: number;
  designSystem: boolean;
  mockup: boolean;
  price: number;
}

export interface GigDetailsData {
  description: string;
  tools: string[];
  pricing: PricingTier[];
}

export interface RatingBreakdown {
  label: string;
  score: number;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CatalogueItem {
  id: string;
  image: string;
  title: string;
  deliveryTime: string;
  price: number;
  author: {
    name: string;
    avatar: string;
    rating: number;
    reviewsCount: number;
    isTopRated: boolean;
  };
}
