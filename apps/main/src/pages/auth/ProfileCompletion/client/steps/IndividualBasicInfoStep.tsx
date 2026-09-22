import React from "react";

interface BasicInfoData {
	companyName: string;
	companySize: string;
	industry: string;
	companyWebsite: string;
	companyDescription: string;
	professionalTitle: string;
	personalWebsite: string;
	aboutYou: string;
}

interface IndividualBasicInfoStepProps {
	data: BasicInfoData;
	setData: React.Dispatch<React.SetStateAction<BasicInfoData>>;
}

const IndividualBasicInfoStep: React.FC<IndividualBasicInfoStepProps> = ({ data, setData }) => {
	const handleChange = (field: keyof BasicInfoData, value: string) => {
		setData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
					Tell us about yourself
				</h2>
				<p className="text-sm text-gray-600">
					Help freelancers understand who they'll be working with
				</p>
			</div>

			<div className="space-y-5">
				{/* Professional Title */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Professional Title
					</label>
					<input
						type="text"
						value={data.professionalTitle}
						onChange={(e) => handleChange("professionalTitle", e.target.value)}
						placeholder="e.g., Entrepreneur, Marketing Director"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
					/>
				</div>

				{/* Personal/Business Website */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Personal/Business Website <span className="text-gray-400">(optional)</span>
					</label>
					<input
						type="url"
						value={data.personalWebsite}
						onChange={(e) => handleChange("personalWebsite", e.target.value)}
						placeholder="https://www.yourebsite.com"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
					/>
				</div>

				{/* About You */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						About You
					</label>
					<textarea
						value={data.aboutYou}
						onChange={(e) => handleChange("aboutYou", e.target.value)}
						placeholder="Tell freelancers about yourself, and what you are looking to achieve..."
						rows={6}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
					/>
				</div>
			</div>
		</div>
	);
};

export default IndividualBasicInfoStep;