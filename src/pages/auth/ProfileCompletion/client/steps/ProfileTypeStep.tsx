import React from "react";
import { User, Building2 } from "lucide-react";

interface ProfileTypeStepProps {
	onNext: () => void;
	setProfileType: (type: "individual" | "company") => void;
	selectedType: "individual" | "company" | null;
}

const ProfileTypeStep: React.FC<ProfileTypeStepProps> = ({
	onNext,
	setProfileType,
	selectedType,
}) => {
	const handleSelect = (type: "individual" | "company") => {
		setProfileType(type);
	};

	const handleNext = () => {
		if (selectedType) {
			onNext();
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
					What type of client are you?
				</h2>
				<p className="text-sm text-gray-600">
					This helps us customise your experience
				</p>
			</div>

			<div className="w-full md:w-3/5 space-y-4">
				{/* Individual Client */}
				<button
					onClick={() => handleSelect("individual")}
					className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
						selectedType === "individual"
							? "border-purple-500 bg-gray-50"
							: "border-gray-200 hover:border-gray-300"
					}`}
				>
					<div className="flex items-start gap-3">
						<div className={`p-1.5 rounded-lg ${
							selectedType === "individual" ? "bg-purple-900" : "bg-gray-100"
						}`}>
							<User className={`w-5 h-5 ${
								selectedType === "individual" ? "text-white" : "text-gray-600"
							}`} />
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between mb-1.5">
								<h3 className="text-sm md:text-base font-semibold text-gray-900">
									Individual Client
								</h3>
								{selectedType === "individual" && (
									<div className="w-5 h-5 rounded-full bg-[#A78BFA] flex items-center justify-center flex-shrink-0">
										<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
										</svg>
									</div>
								)}
							</div>
							<p className="text-xs text-gray-600 mb-2">
								I'm an individual looking to hire freelancers for personal projects, side businesses, or small ventures.
							</p>
							<div className="flex flex-wrap gap-1.5">
								<span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[0.65rem] font-medium">
									Personal Project
								</span>
								<span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[0.65rem] font-medium">
									Solo Businesses
								</span>
								<span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[0.65rem] font-medium">
									Start-up Founder
								</span>
								<span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[0.65rem] font-medium">
									Solopreneur
								</span>
							</div>
						</div>
					</div>
				</button>

				{/* Company/Organization */}
				<button
					onClick={() => handleSelect("company")}
					className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
						selectedType === "company"
							? "border-purple-500 bg-gray-50"
							: "border-gray-200 hover:border-gray-300"
					}`}
				>
					<div className="flex items-start gap-3">
						<div className={`p-1.5 rounded-lg ${
							selectedType === "company" ? "bg-purple-900" : "bg-gray-100"
						}`}>
							<Building2 className={`w-5 h-5 ${
								selectedType === "company" ? "text-white" : "text-gray-600"
							}`} />
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between mb-1.5">
								<h3 className="text-sm md:text-base font-semibold text-gray-900">
									Company/Organization
								</h3>
								{selectedType === "company" && (
									<div className="w-5 h-5 rounded-full bg-[#A78BFA] flex items-center justify-center flex-shrink-0">
										<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
										</svg>
									</div>
								)}
							</div>
							<p className="text-xs text-gray-600 mb-2">
								I represent a company, organization, or agency looking to hire freelancers for business projects.
							</p>
							<div className="flex flex-wrap gap-1.5">
								<span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[0.65rem] font-medium">
									Small Business
								</span>
								<span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[0.65rem] font-medium">
									Enterprise
								</span>
								<span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[0.65rem] font-medium">
									Agency
								</span>
								<span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[0.65rem] font-medium">
									Non-profit
								</span>
							</div>
						</div>
					</div>
				</button>
			</div>
		</div>
	);
};

export default ProfileTypeStep;