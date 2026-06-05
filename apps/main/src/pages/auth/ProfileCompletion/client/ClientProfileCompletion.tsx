import React, { useState } from "react";
import { User, Briefcase, Globe, ShieldCheck } from "lucide-react";
import {
	submitClientType,
	submitCompanyInfo,
	submitLanguages,
	submitVerification,
	LanguageItem,
} from "../../../../services/client-profile.service";
import ProfileTypeStep from "./steps/ProfileTypeStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import LanguageStep from "./steps/LanguageStep";
import VerificationStep from "./steps/VerificationStep";

interface BasicInfoData {
	companyName: string;
	companySize: string;
	industry: string;
	companyWebsite: string;
	companyDescription: string;
}

interface VerificationData {
	profilePhoto: File | null;
	govId: File | null;
	addressVerification: File | null;
	phone: string;
}

const ClientProfileCompletion = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [profileType, setProfileType] = useState<"individual" | "company" | null>(null);
	const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
		companyName: "",
		companySize: "",
		industry: "",
		companyWebsite: "",
		companyDescription: "",
	});
	const [languages, setLanguages] = useState<LanguageItem[]>([
		{ language: "", proficiency_level: "" },
	]);
	const [verification, setVerification] = useState<VerificationData>({
		profilePhoto: null,
		govId: null,
		addressVerification: null,
		phone: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const steps = [
		{ id: 1, icon: User, label: "Profile Type" },
		{ id: 2, icon: Briefcase, label: "Basic Info" },
		{ id: 3, icon: Globe, label: "Language" },
		{ id: 4, icon: ShieldCheck, label: "Verification" },
	];

	const handleNext = async () => {
		setIsSubmitting(true);
		setError("");

		try {
			// Submit current step data
			if (currentStep === 1) {
				if (!profileType) {
					setError("Please select a client type");
					setIsSubmitting(false);
					return;
				}
				await submitClientType({ client_type: profileType });
			} else if (currentStep === 2) {
				// Validate company info
				if (!basicInfo.companyName.trim()) {
					setError("Company name is required");
					setIsSubmitting(false);
					return;
				}
				if (!basicInfo.companySize) {
					setError("Company size is required");
					setIsSubmitting(false);
					return;
				}
				if (!basicInfo.industry) {
					setError("Industry is required");
					setIsSubmitting(false);
					return;
				}
				if (!basicInfo.companyDescription.trim()) {
					setError("Company description is required");
					setIsSubmitting(false);
					return;
				}

				await submitCompanyInfo({
					company_name: basicInfo.companyName,
					company_size: parseInt(basicInfo.companySize.split("-")[0]) || 0,
					company_industry: basicInfo.industry,
					company_website: basicInfo.companyWebsite,
					company_description: basicInfo.companyDescription,
				});
			} else if (currentStep === 3) {
				// Validate languages
				const validLanguages = languages.filter(
					(lang) => lang.language && lang.proficiency_level
				);

				if (validLanguages.length === 0) {
					setError("Please add at least one language");
					setIsSubmitting(false);
					return;
				}

				await submitLanguages({ languages: validLanguages });
			} else if (currentStep === 4) {
				// Validate verification
				if (!verification.phone.trim()) {
					setError("Phone number is required");
					setIsSubmitting(false);
					return;
				}

				await submitVerification({
					profile_photo: verification.profilePhoto || undefined,
					gov_id: verification.govId || undefined,
					add_ver: verification.addressVerification || undefined,
					phone: verification.phone,
				});
			}

			// Advance to next step
			if (currentStep < 4) {
				setCurrentStep((prev) => prev + 1);
			}
		} catch (err) {
			const errorMessage =
				(err as { message?: string })?.message ||
				"Failed to save. Please try again.";
			setError(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleSaveAndContinueLater = () => {
		console.log("Saving progress...");
		window.location.href = "/clients";
	};

	const handleComplete = () => {
		console.log("Profile completed!");
		window.location.href = "/clients";
	};

	const progressPercentage = (currentStep / steps.length) * 100;

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
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

				{/* Error Display */}
				{error && (
					<div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
						{error}
					</div>
				)}

				{/* Step Content */}
				<div className="mb-8">
					{currentStep === 1 && (
						<ProfileTypeStep
							setProfileType={setProfileType}
							selectedType={profileType}
						/>
					)}
					{currentStep === 2 && (
						<BasicInfoStep
							profileType={profileType}
							data={basicInfo}
							setData={setBasicInfo}
						/>
					)}
					{currentStep === 3 && (
						<LanguageStep
							languages={languages}
							setLanguages={setLanguages}
						/>
					)}
					{currentStep === 4 && (
						<VerificationStep
							data={verification}
							setData={setVerification}
						/>
					)}
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
								disabled={isSubmitting}
								className="px-4 md:px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition flex items-center gap-2 text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Submitting..." : "Complete Profile"}
							</button>
						) : (
							<button
								onClick={handleNext}
								disabled={isSubmitting}
								className="px-4 md:px-5 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Saving..." : "Next"}
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

export default ClientProfileCompletion;
