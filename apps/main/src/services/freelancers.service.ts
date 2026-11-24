import { api } from "../lib/axios";
import { Page } from "./jobs.service";

export interface FreelancerDirectoryEntry {
  id: string;
  user_id: string;
  name: string;
  title: string;
  shbio: string;
  bio: string;
  skills: string[];
  yoe: number;
  spa: string[];
  lang: unknown[];
  profile_photo: string | null;
  portfolio: {
    id: string;
    title: string;
    description: string;
    url: string;
    skills: string[];
  }[];
  rating: number | null;
  review_count: number;
  hourly_rate: string | null;
  currency: string | null;
}

export async function listFreelancers(
  search: string,
  page = 1,
): Promise<Page<FreelancerDirectoryEntry>> {
  const { data } = await api.get<Page<FreelancerDirectoryEntry>>(
    "/freelance/freelancers/",
    { params: { search: search || undefined, page, page_size: 20 } },
  );
  return data;
}
