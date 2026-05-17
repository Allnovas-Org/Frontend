import { api } from "../lib/axios";

// ─── Request Types ───

export interface ClientTypePayload {
	client_type: "individual" | "company";
}

export interface CompanyInfoPayload {
	company_name: string;
	company_size: number;
	company_industry: string;
	company_website: string;
	company_description: string;
}

export interface LanguageItem {
	language: string;
	proficiency_level: string;
}

export interface LanguagePayload {
	languages: LanguageItem[];
}

export interface VerificationPayload {
	profile_photo?: File;
	gov_id?: File;
	add_ver?: File; // address verification
	phone: string;
}

// ─── Response Types ───

export interface GenericSuccessResponse {
	message?: string;
}

// ─── API Calls ───

/**
 * Step 1: Submit client type (individual or company)
 */
export const submitClientType = async (
	payload: ClientTypePayload,
): Promise<GenericSuccessResponse> => {
	const response = await api.post<GenericSuccessResponse>(
		"/client/signin-flow/type-of-client/",
		payload,
	);
	return response.data;
};

/**
 * Step 2: Submit company/basic information
 */
export const submitCompanyInfo = async (
	payload: CompanyInfoPayload,
): Promise<GenericSuccessResponse> => {
	const response = await api.post<GenericSuccessResponse>(
		"/client/signin-flow/company-info/",
		payload,
	);
	return response.data;
};

/**
 * Step 3: Submit language preferences
 */
export const submitLanguages = async (
	payload: LanguagePayload,
): Promise<GenericSuccessResponse> => {
	const response = await api.post<GenericSuccessResponse>(
		"/client/signin-flow/language/",
		payload,
	);
	return response.data;
};

/**
 * Step 4: Submit verification documents and phone
 */
export const submitVerification = async (
	payload: VerificationPayload,
): Promise<GenericSuccessResponse> => {
	const formData = new FormData();

	// Add files if they exist
	if (payload.profile_photo) {
		formData.append("profile_photo", payload.profile_photo);
	}
	if (payload.gov_id) {
		formData.append("gov_id", payload.gov_id);
	}
	if (payload.add_ver) {
		formData.append("add_ver", payload.add_ver);
	}

	// Add phone number
	formData.append("phone", payload.phone);

	const response = await api.post<GenericSuccessResponse>(
		"/client/signin-flow/verification/",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		},
	);
	return response.data;
};
