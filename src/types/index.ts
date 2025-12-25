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
  gigTitle: string;
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

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
}

export type TabType = "Profile" | "Portfolio" | "Catalogue" | "Review";

export interface TipItem {
  id: number;
  text: string;
}

export interface TabContent {
  title: string;
  tips: TipItem[];
}

export interface Service {
  id: string;
  image: string;
  title: string;
  deliveryTime: string;
  price: number;
}
export interface FAQ {
  question: string;
  answer: string;
}

export interface ProjectData {
  title: string;
  description: string;
  skills: string[];
  publishDate: string;
  link: string;
  author: string;
  images: {
    dashboard: string;
    gig: string;
    others: string[];
  };
}

export interface RatingStat {
  stars: number;
  percentage: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  package: string;
  date: string;
  comment: string;
  response?: string;
}

export type StepId =
  | "basic"
  | "pricing"
  | "description"
  | "requirements"
  | "gallery"
  | "publish";

export interface CatalogueData {
  serviceTitle: string;
  category: string;
  subCategory: string;
  serviceType: "one-time" | "over-time";
  pricing: {
    basic: PricingTier;
    standard: PricingTier;
    premium: PricingTier;
  };
  faqs: Array<{ question: string; answer: string }>;
}

export interface PricingTier {
  deliveryTime: string;
  // pages: number;
  revisions: number;
  features: string[];
  price: number;
}
