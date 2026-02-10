import React, { useState } from "react";
import { User, Briefcase, Globe, ShieldCheck } from "lucide-react";
import ProfileTypeStep from "./steps/ProfileTypeStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import LanguageStep from "./steps/LanguageStep";
import VerificationStep from "./steps/VerificationStep";

const ProfileCompletion = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [profileType, setProfileType] = useState<"individual" | "company" | null>(null);

	const steps = [
		{ id: 1, icon: User, label: "Profile Type" },
		{ id: 2, icon: Briefcase, label: "Basic Info" },
		{ id: 3, icon: Globe, label: "Language" },
		{ id: 4, icon: ShieldCheck, label: "Verification" },
	];

	const handleNext = () => {
		if (currentStep < 4) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleSaveAndContinueLater = () => {
		// Save progress and redirect
		console.log("Saving progress...");
		window.location.href = "/dashboard";
	};

	const handleComplete = () => {
		// Complete profile and redirect
		console.log("Profile completed!");
		window.location.href = "/dashboard";
	};

	const progressPercentage = (currentStep / steps.length) * 100;

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
				{/* Header */}
				<div className="mb-8 md:mb-12">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-lg md:text-xl font-semibold">
							Complete Your Profile
						</h1>
						<span className="text-xs text-gray-600">
							{currentStep} of {steps.length}
						</span>
					</div>

					{/* Progress Bar */}
					<div className="w-full h-1.5 bg-gray-200 rounded-full mb-8">
						<div
							className="h-full bg-gray-800 rounded-full transition-all duration-500"
							style={{ width: `${progressPercentage}%` }}
						/>
					</div>

					{/* Step Icons */}
					<div className="flex justify-between items-center">
						{steps.map((step) => {
							const Icon = step.icon;
							const isCompleted = step.id < currentStep;
							const isActive = step.id === currentStep;

							return (
								<div key={step.id} className="flex flex-col items-center">
									<div
										className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
											isCompleted || isActive ? "bg-gray-700" : "bg-gray-300"
										}`}
									>
										<Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
									</div>
									<span
										className={`text-xs md:text-sm text-center ${
											isActive ? "font-semibold text-gray-900" : "text-gray-500"
										}`}
									>
										{step.label}
									</span>
								</div>
							);
						})}
					</div>
				</div>

				{/* Step Content */}
				<div className="mb-8">
					{currentStep === 1 && (
						<ProfileTypeStep 
							onNext={handleNext}
							setProfileType={setProfileType}
							selectedType={profileType}
						/>
					)}
					{currentStep === 2 && (
						<BasicInfoStep 
							profileType={profileType}
						/>
					)}
					{currentStep === 3 && <LanguageStep />}
					{currentStep === 4 && <VerificationStep />}
				</div>

				{/* Navigation Buttons */}
				<div className="w-full flex justify-between items-center pt-6 md:pt-8">
					<button
						onClick={handleBack}
						disabled={currentStep === 1}
						className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-xs md:text-sm ${
							currentStep === 1
								? "text-gray-400 cursor-not-allowed"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Previous
					</button>

					<div className="flex gap-3">
						{currentStep < 4 && (
							<button
								onClick={handleSaveAndContinueLater}
								className="px-3 md:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-xs md:text-sm"
							>
								Save & Continue Later
							</button>
						)}

						{currentStep === 4 ? (
							<button
								onClick={handleComplete}
								className="px-4 md:px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition flex items-center gap-2 text-xs md:text-sm"
							>
								Complete Profile
							</button>
						) : (
							<button
								onClick={handleNext}
								className="px-4 md:px-5 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 text-xs md:text-sm"
							>
								Next
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCompletion;