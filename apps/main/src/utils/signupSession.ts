const TOKEN_KEY = "signup-session-token";
const EXPIRY_KEY = "signup-session-expiry";
const RESEND_AT_KEY = "signup-resend-at";

export interface SignupSession {
	token: string;
	expiresAt: string;
}

export const storeSignupSession = (session: SignupSession): void => {
	sessionStorage.setItem(TOKEN_KEY, session.token);
	sessionStorage.setItem(EXPIRY_KEY, session.expiresAt);
};

export const getSignupSession = (): SignupSession | null => {
	const token = sessionStorage.getItem(TOKEN_KEY);
	const expiresAt = sessionStorage.getItem(EXPIRY_KEY);

	if (!token || !expiresAt || Date.parse(expiresAt) <= Date.now()) {
		clearSignupSession();
		return null;
	}

	return { token, expiresAt };
};

export const clearSignupSession = (): void => {
	sessionStorage.removeItem(TOKEN_KEY);
	sessionStorage.removeItem(EXPIRY_KEY);
	sessionStorage.removeItem(RESEND_AT_KEY);
};

export const storeSignupResendCooldown = (seconds: number): void => {
	sessionStorage.setItem(RESEND_AT_KEY, String(Date.now() + seconds * 1000));
};

export const getSignupResendCooldown = (): number | null => {
	const resendAt = Number(sessionStorage.getItem(RESEND_AT_KEY));
	if (!Number.isFinite(resendAt) || resendAt <= 0) return null;
	return Math.max(0, Math.ceil((resendAt - Date.now()) / 1000));
};
