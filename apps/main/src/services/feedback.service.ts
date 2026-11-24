import { api } from "../lib/axios";
import { Page } from "./jobs.service";

export interface ApiReview {
  id: string;
  project: string;
  reviewer: string;
  reviewer_name: string;
  reviewee: string;
  reviewee_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ApiDispute {
	id: string;
	project: string;
	reporter: string;
	reason: string;
	description: string;
	status: "open" | "in_review" | "resolved" | "rejected";
	resolution: string;
	created_at: string;
	updated_at: string;
}

export async function listReviews(revieweeId: string): Promise<ApiReview[]> {
  const { data } = await api.get<Page<ApiReview> | ApiReview[]>(
    "/feedback/reviews/",
    { params: { reviewee: revieweeId, page_size: 100 } },
  );
  return Array.isArray(data) ? data : data.results;
}

export async function createReview(payload: {
	project: string;
	rating: number;
	comment: string;
}): Promise<ApiReview> {
	const { data } = await api.post<ApiReview>("/feedback/reviews/", payload);
	return data;
}

export async function createDispute(payload: {
	project: string;
	reason: string;
	description: string;
}): Promise<ApiDispute> {
	const { data } = await api.post<ApiDispute>("/feedback/disputes/", payload);
	return data;
}
