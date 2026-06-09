import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SignupState {
	// Collected data across steps
	email: string;
	userType: "freelancer" | "client" | null;
	userName: string;
	currentStep: number;

	// Loading & error state
	isLoading: boolean;
	error: string;

	// Actions
	setEmail: (email: string) => void;
	setUserType: (type: "freelancer" | "client" | null) => void;
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
			setUserType: (type) => {
				if (type) {
					localStorage.setItem("user-type", type);
				} else {
					localStorage.removeItem("user-type");
				}
				set({ userType: type });
			},
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
		},
	),
);
