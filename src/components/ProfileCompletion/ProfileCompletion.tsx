import React, { useState } from "react";
import {
	User,
	Wrench,
	GraduationCap,
	Globe,
	CreditCard,
	ShieldCheck,
} from "lucide-react";
import SkillsStep from "./steps/SkillsStep";
import ToolsStep from "./steps/ToolsStep";
import EducationStep from "./steps/EducationStep";
import LanguageStep from "./steps/LanguageStep";
import PaymentStep from "./steps/PaymentStep";
import VerificationStep from "./steps/VerificationStep";

// import ToolsStep from "./steps/ToolsStep";
// import EducationStep from "./steps/EducationStep";
// import LanguageStep from "./steps/LanguageStep";
// import PaymentStep from "./steps/PaymentStep";
// import VerificationStep from "./steps/VerificationStep";

const ProfileCompletion = () => {
	const [currentStep, setCurrentStep] = useState(1);

	const steps = [
		{ id: 1, icon: User, label: "Skills" },
		{ id: 2, icon: Wrench, label: "Tools" },
		{ id: 3, icon: GraduationCap, label: "Education" },
		{ id: 4, icon: Globe, label: "Language" },
		{ id: 5, icon: CreditCard, label: "Payment" },
		{ id: 6, icon: ShieldCheck, label: "Verification" },
	];

	const handleNext = () => {
		if (currentStep < 6) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleSaveAndContinueLater = () => {
		window.location.href = "/jobs";
	};

	const progressPercentage = (currentStep / steps.length) * 100;

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-4xl mx-auto md:px-8 px-4 py-12">
				{/* Header */}
				<div className="mb-12">
					<div className="flex justify-between items-center mb-4">
						<h1 className="lg:text-2xl text-xl font-semibold">
							Complete Your Profile
						</h1>
						<span className="text-gray-600">
							{currentStep} of {steps.length}
						</span>
					</div>

					{/* Progress Bar */}
					<div className="w-full h-2 bg-gray-200 rounded-full mb-8">
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
										className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
											isCompleted || isActive ? "bg-gray-700" : "bg-gray-300"
										}`}
									>
										<Icon className="w-6 h-6 text-white" />
									</div>
									<span
										className={`text-xs max-[400px]:text-[0.6rem] ${
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
					{currentStep === 1 && <SkillsStep />}
					{currentStep === 2 && <ToolsStep />}
					{currentStep === 3 && <EducationStep />}
					{currentStep === 4 && <LanguageStep />}
					{currentStep === 5 && <PaymentStep />}
					{currentStep === 6 && <VerificationStep />}
				</div>

				{/* Navigation Buttons */}
				<div className="w-full flex justify-between items-center pt-8 border-t max-lg:text-xs">
					<button
						onClick={handleBack}
						disabled={currentStep === 1}
						className={`flex items-center gap-2 pr-5 py-2 rounded-lg transition ${
							currentStep === 1
								? "text-gray-400 cursor-not-allowed"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<svg
							className="w-5 h-5"
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

					<div className="flex gap-4">
						<button
							onClick={handleSaveAndContinueLater}
							className="max-lg:text-[0.6rem] px-5 py-2 border-2 border-[#6A0DAD] text-[#6A0DAD] rounded-full font-semibold hover:bg-purple-50 transition"
						>
							Save & Continue Later
						</button>

						{currentStep === 6 ? (
							<button
								onClick={() => window.location.href = "/jobs"}
								className="px-5 py-2 bg-[#6A0DAD] text-white rounded-full font-semibold hover:bg-[#5a0b92] transition flex items-center gap-2"
							>
								<ShieldCheck className="w-5 h-5" />
								Complete Profile
							</button>
						) : (
							<button
								onClick={handleNext}
								className="px-5 py-2 bg-[#6A0DAD] text-white rounded-full font-semibold hover:bg-[#5a0b92] transition flex items-center gap-2"
							>
								Next
								<svg
									className="w-5 h-5"
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
