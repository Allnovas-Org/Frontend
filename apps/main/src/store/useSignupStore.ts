import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SignupState {
	// Collected data across steps
	email: string;
	userType: "Freelancer" | "Client" | null;
	userName: string;
	currentStep: number;

	// Loading & error state
	isLoading: boolean;
	error: string;

	// Actions
	setEmail: (email: string) => void;
	setUserType: (type: "Freelancer" | "Client" | null) => void;
	setUserName: (name: string) => void;
	setCurrentStep: (step: number) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string) => void;
	clearError: () => void;
	reset: () => void;
}

export const useSignupStore = create<SignupState>()(
	persist(
		(set) => ({
			email: "",
			userType: null,
			userName: "",
			currentStep: 1,
			isLoading: false,
			error: "",

			setEmail: (email) => set({ email }),
			setUserType: (type) => set({ userType: type }),
			setUserName: (name) => set({ userName: name }),
			setCurrentStep: (step) => set({ currentStep: step }),
			setLoading: (loading) => set({ isLoading: loading }),
			setError: (error) => set({ error }),
			clearError: () => set({ error: "" }),
			reset: () =>
				set({
					email: "",
					userType: null,
					userName: "",
					currentStep: 1,
					isLoading: false,
					error: "",
				}),
		}),
		{
			name: "signup-storage", // localStorage key
			version: 1,
			partialize: ({ email, userType, userName, currentStep }) => ({
				email,
				userType,
				userName,
				currentStep,
			}),
			migrate: (persistedState) => {
				if (typeof persistedState !== "object" || persistedState === null) {
					return {};
				}
				const state = { ...persistedState } as Record<string, unknown>;
				delete state.signupToken;
				return state;
			},
		},
	),
);
