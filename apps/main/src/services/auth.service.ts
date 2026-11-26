import { api } from "../lib/axios";

// ─── Request Types ───

export type UserRole = "Freelancer" | "Client";

export interface AuthUser {
	id: string;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	created_at: string;
	user_role: UserRole;
	country_code?: string;
	phone_number?: string;
	date_of_birth?: string;
	gender?: string;
	country?: string;
	profile_picture?: string | null;
}

// Login
export interface LoginPayload {
	email: string;
	password: string;
}

// Signup
export interface SignupEmailPayload {
	email: string;
	user_type: UserRole;
}

export interface VerifyTokenPayload {
	email: string;
	token: string;
}

export interface CreatePasswordPayload {
	password: string;
	confirm_password: string;
}

export interface AddProfilePayload {
	first_name: string;
	last_name: string;
	gender: "male" | "female" | "other" | "non-binary" | "prefer-not-to-say";
	date_of_birth: string;
	country: string;
	code: string;
	phone_number: string;
	profile_picture?: File | null;
}

// ─── Response Types ───

// Current User
export type CurrentUserResponse = AuthUser;

// Logout
export interface LogoutResponse {
	message: string;
}

// Login
export interface LoginResponse {
	message: string;
	user: AuthUser;
	token: string;
	expires_at: string;
	user_role: UserRole;
}

// Signup
export interface SignupEmailResponse {
	message: string;
	info: {
		expires_in_seconds: number;
		resend_after_seconds: number;
	};
}

export interface VerifyTokenResponse {
	message: string;
	token: string;
	expire_at: string;
}

export interface CreatePasswordResponse {
	message: string;
}

export interface AddProfileResponse {
	message: string;
}

export interface PasswordResetVerificationResponse {
	message: string;
	reset_url: string;
}

export interface PasswordResetPayload {
	password: string;
	confirm_password: string;
}

export interface CurrentUserUpdatePayload {
	first_name?: string;
	last_name?: string;
	country_code?: string;
	phone_number?: string;
	date_of_birth?: string;
	gender?: AddProfilePayload["gender"];
	country?: string;
	profile_picture?: string | null;
}

// ─── API Calls ───

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (token?: string): Promise<CurrentUserResponse> => {
	const response = await api.get<CurrentUserResponse>("/auth/me/", {
		headers: token ? { Authorization: `Bearer ${token}` } : undefined,
	});
	return response.data;
};

export const updateCurrentUser = async (
	payload: CurrentUserUpdatePayload,
): Promise<CurrentUserResponse> => {
	const response = await api.patch<CurrentUserResponse>("/auth/me/", payload);
	return response.data;
};

/**
 * Logout current user
 */
export const logoutUser = async (): Promise<LogoutResponse> => {
	const response = await api.post<LogoutResponse>("/auth/logout/");
	return response.data;
};

/**
 * Login with email/username and password
 */
export const login = async (
	payload: LoginPayload,
): Promise<LoginResponse> => {
	const response = await api.post<LoginResponse>("/auth/login/", payload);
	return response.data;
};

/**
 * Step 1: Send email to receive OTP token
 */
export const signupWithEmail = async (
	payload: SignupEmailPayload,
): Promise<SignupEmailResponse> => {
	const response = await api.post<SignupEmailResponse>(
		"/auth/signup/email/",
		payload,
	);
	return response.data;
};

/**
 * Step 2: Verify the OTP token sent to email
 */
export const verifySignupToken = async (
	payload: VerifyTokenPayload,
): Promise<VerifyTokenResponse> => {
	const response = await api.post<VerifyTokenResponse>(
		"/auth/signup/verify-token/",
		payload,
	);
	return response.data;
};

/**
 * Step 3: Create password (requires auth token from verify step)
 */
export const createPassword = async (
	payload: CreatePasswordPayload,
	token: string,
): Promise<CreatePasswordResponse> => {
	const response = await api.post<CreatePasswordResponse>(
		"/auth/signup/create-password/",
		payload,
		{ headers: { Authorization: `Bearer ${token}` } },
	);
	return response.data;
};

/**
 * Step 4: Add profile information (requires auth token)
 */
export const addProfile = async (
	payload: AddProfilePayload,
	token: string,
): Promise<AddProfileResponse> => {
	const formData = new FormData();

	formData.append("first_name", payload.first_name);
	formData.append("last_name", payload.last_name);
	formData.append("gender", payload.gender);
	formData.append("date_of_birth", payload.date_of_birth);
	formData.append("country", payload.country);
	formData.append("code", payload.code);
	formData.append("phone_number", payload.phone_number);

	if (payload.profile_picture) {
		formData.append("profile_picture", payload.profile_picture);
	}

	const response = await api.post<AddProfileResponse>(
		"/auth/signup/add-profile/",
		formData,
		{ headers: { Authorization: `Bearer ${token}` } },
	);
	return response.data;
};

export const requestPasswordReset = async (email: string): Promise<void> => {
	await api.post("/auth/password/send-email-token/", { email });
};

export const verifyPasswordResetCode = async (
	email: string,
	code: string,
): Promise<string> => {
	const response = await api.post<PasswordResetVerificationResponse>(
		"/auth/password/verify-email-token/",
		{ email, code },
	);

	if (!response.data.reset_url || !api.defaults.baseURL) {
		throw new Error("The password-reset response was incomplete.");
	}

	const trustedOrigin = new URL(api.defaults.baseURL);
	const resetUrl = new URL(response.data.reset_url, trustedOrigin);
	if (
		resetUrl.origin !== trustedOrigin.origin ||
		resetUrl.username ||
		resetUrl.password
	) {
		throw new Error("The password-reset URL is outside the configured backend origin.");
	}

	return resetUrl.toString();
};

export const resetPassword = async (
	resetUrl: string,
	payload: PasswordResetPayload,
): Promise<void> => {
	await api.post(resetUrl, payload, {
		headers: { Authorization: "" },
	});
};

export const toAuthUser = (user: CurrentUserResponse) => ({
	id: user.id,
	username: user.username,
	firstName: user.first_name,
	lastName: user.last_name,
	email: user.email,
	userType: user.user_role,
	avatar: user.profile_picture || undefined,
	createdAt: user.created_at,
	countryCode: user.country_code,
	phoneNumber: user.phone_number,
	dateOfBirth: user.date_of_birth,
	gender: user.gender,
	country: user.country,
});
