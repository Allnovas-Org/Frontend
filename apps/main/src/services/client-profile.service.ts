import { api } from "../lib/axios";

// ─── Request Types ───

export interface ClientTypePayload {
	client_type: "individual" | "company";
}

export interface CompanyInfoPayload {
	company_name: string;
	company_size: number;
	company_industry: string;
	company_description: string;
	company_website?: string;
}

export interface IndividualInfoPayload {
	title: string;
	about_you: string;
	website?: string;
}

export interface IndividualClientInfo {
	title: string;
	about_you: string;
	website: string | null;
}

export interface CompanyClientInfo {
	company_name: string;
	company_size: number;
	company_industry: string;
	company_description: string;
	company_website: string | null;
}

export type ClientProfileInfo =
	| { clientType: "Individual_Client"; info: IndividualClientInfo }
	| { clientType: "Company_Client"; info: CompanyClientInfo };

export const getClientProfileInfo = async (): Promise<ClientProfileInfo> => {
	const { data } = await api.get<{ client_type: string }>(
		"/client/signin-flow/type-of-client/",
	);
	if (data.client_type === "Individual_Client") {
		const response = await api.get<IndividualClientInfo>(
			"/client/signin-flow/individual-info/",
		);
		return { clientType: data.client_type, info: response.data };
	}
	if (data.client_type === "Company_Client") {
		const response = await api.get<CompanyClientInfo>(
			"/client/signin-flow/company-info/",
		);
		return { clientType: data.client_type, info: response.data };
	}
	throw new Error("The server returned an invalid client profile type.");
};

export const updateClientProfileInfo = async (
	profile: ClientProfileInfo,
): Promise<ClientProfileInfo> => {
	if (profile.clientType === "Individual_Client") {
		const response = await api.patch<IndividualClientInfo>(
			"/client/signin-flow/individual-info/",
			profile.info,
		);
		return { clientType: profile.clientType, info: response.data };
	}
	const response = await api.patch<CompanyClientInfo>(
		"/client/signin-flow/company-info/",
		profile.info,
	);
	return { clientType: profile.clientType, info: response.data };
};

export const clientLanguageProficiencyLevels = [
	"Basic",
	"Conversational",
	"Fluent",
	"Native/Bilingual",
	"Native",
	"Intermediate",
] as const;

export type ClientLanguageProficiency =
	(typeof clientLanguageProficiencyLevels)[number];

export interface LanguageItem {
	language: string;
	proficiency_level: ClientLanguageProficiency | "";
}

export interface ClientLanguagePreference {
	language: string;
	proficiency_level: ClientLanguageProficiency;
}

export interface ClientLanguagesResponse {
	languages: ClientLanguagePreference[];
	message?: string;
}

export interface ClientVerificationPayload {
	profile_photo?: File;
	gov_id?: File;
	add_ver?: File;
	phone?: string;
}

export interface ClientVerificationResponse {
	message?: string;
	profile_completed: boolean;
	phone: string;
	profile_photo_url: string | null;
	has_government_id: boolean;
	has_address_document: boolean;
	identity_verification_status: string;
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
 * Step 2 (company path): Submit company/basic information
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
 * Step 2 (individual path): Submit individual basic information
 */
export const submitIndividualInfo = async (
	payload: IndividualInfoPayload,
): Promise<GenericSuccessResponse> => {
	const response = await api.post<GenericSuccessResponse>(
		"/client/signin-flow/individual-info/",
		payload,
	);
	return response.data;
};

/**
 * Retrieve the authenticated client's saved language preferences.
 */
export const getClientLanguages =
	async (): Promise<ClientLanguagesResponse> => {
		const response = await api.get<ClientLanguagesResponse>(
			"/client/signin-flow/language/",
		);
		return response.data;
	};

/**
 * Replace the authenticated client's complete language preference list.
 */
export const replaceClientLanguages = async (
	languages: ClientLanguagePreference[],
): Promise<ClientLanguagesResponse> => {
	const response = await api.put<ClientLanguagesResponse>(
		"/client/signin-flow/language/",
		{ languages },
	);
	return response.data;
};

/**
 * Retrieve the authenticated client's verification/profile completion data.
 */
export const getClientVerification =
	async (): Promise<ClientVerificationResponse> => {
		const response = await api.get<ClientVerificationResponse>(
			"/client/signin-flow/verification/",
		);
		return response.data;
	};

/**
 * Retrieve the authenticated client's saved profile photo.
 */
export const getClientProfilePhoto = async (): Promise<Blob> => {
	const response = await api.get<Blob>(
		"/client/signin-flow/verification-photo/",
		{
			responseType: "blob",
		},
	);
	return response.data;
};

export const getAuthenticatedProfilePicture = async (
	profilePictureUrl: string,
): Promise<Blob> => {
	const baseURL = api.defaults.baseURL;
	if (!baseURL) {
		throw new Error("The API base URL is not configured.");
	}

	const backendOrigin = new URL(baseURL).origin;
	const imageURL = new URL(profilePictureUrl, backendOrigin);
	if (
		imageURL.origin !== backendOrigin ||
		imageURL.username ||
		imageURL.password
	) {
		throw new Error("The profile picture is outside the configured API origin.");
	}

	const response = await api.get<Blob>(imageURL.toString(), {
		responseType: "blob",
	});
	return response.data;
};

export const getClientAvatarPhoto = async (
	verificationPhotoUrl: string | null,
	profilePictureUrl?: string,
): Promise<Blob | null> => {
	if (verificationPhotoUrl) {
		return getClientProfilePhoto();
	}
	if (profilePictureUrl) {
		return getAuthenticatedProfilePicture(profilePictureUrl);
	}
	return null;
};

/**
 * Submit the authenticated client's optional verification documents and phone.
 */
export const completeClientProfile = async (
	payload: ClientVerificationPayload,
): Promise<ClientVerificationResponse> => {
	const formData = new FormData();
	if (payload.profile_photo) {
		formData.append("profile_photo", payload.profile_photo);
	}
	if (payload.gov_id) {
		formData.append("gov_id", payload.gov_id);
	}
	if (payload.add_ver) {
		formData.append("add_ver", payload.add_ver);
	}
	if (payload.phone) {
		formData.append("phone", payload.phone);
	}

	const response = await api.post<ClientVerificationResponse>(
		"/client/signin-flow/verification/",
		formData,
	);
	return response.data;
};
