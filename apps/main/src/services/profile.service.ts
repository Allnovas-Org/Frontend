import { api } from "../lib/axios";
import type { Page } from "./jobs.service";

export interface CurrentUserSettings {
	id: string;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	created_at: string;
	user_role: "Client" | "Freelancer" | "admin";
	country_code: string;
	phone_number: string;
	date_of_birth: string | null;
	gender: string;
	country: string;
	profile_picture: string | null;
}

export interface FreelancerProfile {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	title: string | null;
	shbio: string | null;
	bio: string | null;
	skills: string[];
	yoe: number;
	spa: string[];
	tat: string[] | null;
	lang: unknown[] | null;
	profile_photo: string | null;
	education: {
		id: number;
		name: string;
		degree: string;
		cs: boolean;
		start_date: string;
		end_date: string;
	}[];
	hourly_rate?: string | null;
	currency?: string;
}

export interface ClientProfile {
	id: number;
	client_role: string;
	lang: unknown[];
	profile_photo: string | null;
	phone: number | null;
	company?: {
		company_name: string;
		company_size: number;
		company_industry: string;
		company_website: string;
		company_description: string;
	} | null;
	individual?: {
		title: string;
		website: string;
		about_you: string;
	} | null;
}

export interface PortfolioItem {
	id: number;
	title: string;
	description: string;
	url: string;
	skills: string[];
	created_at: string;
	updated_at: string;
}

export function getMediaUrl(path: string | null | undefined): string | null {
	if (!path) return null;
	try {
		return new URL(path, import.meta.env.VITE_API_BASE_URL || window.location.origin).toString();
	} catch {
		return path;
	}
}

export async function getCurrentUserSettings(): Promise<CurrentUserSettings> {
	const { data } = await api.get<CurrentUserSettings>("/auth/me/");
	return data;
}

export async function updateCurrentUserSettings(
	payload: Partial<
		Pick<
			CurrentUserSettings,
			"first_name" | "last_name" | "phone_number" | "country" | "profile_picture"
		>
	>,
): Promise<CurrentUserSettings> {
	const { data } = await api.patch<CurrentUserSettings>("/auth/me/", payload);
	return data;
}

export async function uploadCurrentUserPicture(file: File): Promise<CurrentUserSettings> {
	const formData = new FormData();
	formData.append("profile_picture", file);
	const { data } = await api.patch<CurrentUserSettings>("/auth/me/", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
}

export async function getFreelancerProfile(): Promise<FreelancerProfile> {
	const { data } = await api.get<FreelancerProfile>("/freelance/profile/");
	return data;
}

export async function updateFreelancerProfile(
	payload: Partial<
		Pick<FreelancerProfile, "title" | "shbio" | "bio" | "skills" | "yoe" | "spa" | "tat" | "hourly_rate" | "currency">
	>,
): Promise<FreelancerProfile> {
	const { data } = await api.patch<FreelancerProfile>("/freelance/profile/", payload);
	return data;
}

export async function uploadFreelancerProfilePicture(file: File): Promise<FreelancerProfile> {
	const formData = new FormData();
	formData.append("profile_photo", file);
	const { data } = await api.patch<FreelancerProfile>("/freelance/profile/", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
}

export async function getClientProfile(): Promise<ClientProfile> {
	const { data } = await api.get<ClientProfile>("/client/profile/");
	return data;
}

export async function uploadClientProfilePicture(file: File): Promise<ClientProfile> {
	const formData = new FormData();
	formData.append("profile_photo", file);
	const { data } = await api.patch<ClientProfile>("/client/profile/", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
}

export async function updateClientProfile(
	payload: Partial<Pick<ClientProfile, "company" | "individual">>,
): Promise<ClientProfile> {
	const { data } = await api.patch<ClientProfile>("/client/profile/", payload);
	return data;
}

export async function listPortfolioItems(): Promise<PortfolioItem[]> {
	const { data } = await api.get<Page<PortfolioItem> | PortfolioItem[]>(
		"/freelance/portfolio/",
		{ params: { page_size: 100 } },
	);
	return Array.isArray(data) ? data : data.results;
}

export async function createPortfolioItem(
	payload: Pick<PortfolioItem, "title" | "description" | "url" | "skills">,
): Promise<PortfolioItem> {
	const { data } = await api.post<PortfolioItem>("/freelance/portfolio/", payload);
	return data;
}

export async function updatePortfolioItem(
	id: number,
	payload: Partial<Pick<PortfolioItem, "title" | "description" | "url" | "skills">>,
): Promise<PortfolioItem> {
	const { data } = await api.patch<PortfolioItem>(`/freelance/portfolio/${id}/`, payload);
	return data;
}

export async function deletePortfolioItem(id: number): Promise<void> {
	await api.delete(`/freelance/portfolio/${id}/`);
}
