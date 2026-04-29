import React, { useState } from "react";

interface BasicInfoStepProps {
	profileType: "individual" | "company" | null;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ profileType }) => {
	const [formData, setFormData] = useState({
		// Individual fields
		professionalTitle: "",
		website: "",
		about: "",
		// Company fields
		companyName: "",
		companySize: "",
		industry: "",
		companyWebsite: "",
		companyDescription: "",
	});

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	// Render Individual Client Form
	if (profileType === "individual") {
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
							value={formData.professionalTitle}
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
							value={formData.website}
							onChange={(e) => handleChange("website", e.target.value)}
							placeholder="https://www.yourbsite.com"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
						/>
					</div>

					{/* About You */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							About You
						</label>
						<textarea
							value={formData.about}
							onChange={(e) => handleChange("about", e.target.value)}
							placeholder="Tell freelancers about yourself, and what you are looking to achieve..."
							rows={6}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
						/>
					</div>
				</div>
			</div>
		);
	}

	// Render Company/Organization Form
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
					Tell us about your company
				</h2>
				<p className="text-sm text-gray-600">
					Help freelancers understand your company and projects
				</p>
			</div>

			<div className="space-y-5">
				{/* Company Name */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Company Name
					</label>
					<input
						type="text"
						value={formData.companyName}
						onChange={(e) => handleChange("companyName", e.target.value)}
						placeholder="e.g., Entrepreneur, Marketing Director"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
					/>
				</div>

				{/* Company Size and Industry */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Company Size
						</label>
						<select
							value={formData.companySize}
							onChange={(e) => handleChange("companySize", e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white appearance-none cursor-pointer"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'right 1rem center',
								backgroundSize: '12px',
							}}
						>
							<option value="">Select Company Size</option>
							<option value="1-10">1-10 employees</option>
							<option value="11-50">11-50 employees</option>
							<option value="51-200">51-200 employees</option>
							<option value="201-500">201-500 employees</option>
							<option value="501+">501+ employees</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Industry
						</label>
						<select
							value={formData.industry}
							onChange={(e) => handleChange("industry", e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white appearance-none cursor-pointer"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'right 1rem center',
								backgroundSize: '12px',
							}}
						>
							<option value="">Select your Industry</option>
							<option value="technology">Technology</option>
							<option value="finance">Finance</option>
							<option value="healthcare">Healthcare</option>
							<option value="education">Education</option>
							<option value="retail">Retail</option>
							<option value="manufacturing">Manufacturing</option>
							<option value="marketing">Marketing</option>
							<option value="consulting">Consulting</option>
							<option value="other">Other</option>
						</select>
					</div>
				</div>

				{/* Company Website */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Company Website <span className="text-gray-400">(optional)</span>
					</label>
					<input
						type="url"
						value={formData.companyWebsite}
						onChange={(e) => handleChange("companyWebsite", e.target.value)}
						placeholder="https://www.yourbsite.com"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
					/>
				</div>

				{/* Company Description */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Company Description
					</label>
					<textarea
						value={formData.companyDescription}
						onChange={(e) => handleChange("companyDescription", e.target.value)}
						placeholder="Tell freelancers about your company, mission, and what you do..."
						rows={6}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
					/>
				</div>
			</div>
		</div>
	);
};

export default BasicInfoStep;