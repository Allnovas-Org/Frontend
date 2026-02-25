import React, { useState } from "react";
import { X, Upload, GraduationCap, ChevronDown } from "lucide-react";

interface Education {
	institution: string;
	degree: string;
	isCurrentlyStudying: boolean;
	startMonth: string;
	startYear: string;
	endMonth: string;
	endYear: string;
	certificate?: File | null;
}

const EducationStep = () => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [educations, setEducations] = useState<Education[]>([]);
	const [currentEducation, setCurrentEducation] = useState<Education>({
		institution: "",
		degree: "",
		isCurrentlyStudying: false,
		startMonth: "",
		startYear: "",
		endMonth: "",
		endYear: "",
		certificate: null,
	});

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const years = Array.from({ length: 50 }, (_, i) =>
		(new Date().getFullYear() - i).toString(),
	);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setCurrentEducation({
				...currentEducation,
				certificate: e.target.files[0],
			});
		}
	};

	const handleAddEducation = () => {
		setEducations([...educations, currentEducation]);
		setShowAddModal(false);
		setCurrentEducation({
			institution: "",
			degree: "",
			isCurrentlyStudying: false,
			startMonth: "",
			startYear: "",
			endMonth: "",
			endYear: "",
			certificate: null,
		});
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">Education & Certifications</h2>
			<p className="text-gray-600 mb-8">
				Add your educational background and professional certifications
			</p>

			{/* Education Section */}
			<div className="mb-8">
				<div className="flex justify-between items-center mb-4">
					<h3 className="font-semibold text-lg">Education</h3>
					<button
						onClick={() => setShowAddModal(true)}
						className="flex items-center gap-2 text-[#6A0DAD] font-medium hover:underline"
					>
						<span>+</span> Add Education
					</button>
				</div>

				{educations.length === 0 ? (
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
						<GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
						<p className="text-gray-600 font-medium mb-1">No education added</p>
						<p className="text-gray-400 text-sm">
							Add your degrees and educational background
						</p>
					</div>
				) : (
					<div className="space-y-4">
						{educations.map((edu, index) => (
							<div
								key={index}
								className="p-4 border border-gray-200 rounded-lg"
							>
								<div className="flex justify-between">
									<div>
										<h4 className="font-semibold">{edu.degree}</h4>
										<p className="text-gray-600">{edu.institution}</p>
										<p className="text-sm text-gray-500">
											{edu.startMonth} {edu.startYear} -{" "}
											{edu.isCurrentlyStudying
												? "Present"
												: `${edu.endMonth} ${edu.endYear}`}
										</p>
									</div>
									<button
										onClick={() =>
											setEducations(educations.filter((_, i) => i !== index))
										}
										className="text-gray-400 hover:text-gray-600"
									>
										<X className="w-5 h-5" />
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Add Education Modal */}
			{showAddModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-2xl font-bold">Add your Education History</h3>
							<button onClick={() => setShowAddModal(false)}>
								<X className="w-6 h-6" />
							</button>
						</div>

						<div className="space-y-4">
							{/* Institution Name */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Institution Name
								</label>
								<input
									type="text"
									value={currentEducation.institution}
									onChange={(e) =>
										setCurrentEducation({
											...currentEducation,
											institution: e.target.value,
										})
									}
									placeholder="Enter Institution Name"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
								/>
							</div>

							{/* Degree */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Degree / Certification Title
								</label>
								<input
									type="text"
									value={currentEducation.degree}
									onChange={(e) =>
										setCurrentEducation({
											...currentEducation,
											degree: e.target.value,
										})
									}
									placeholder="Enter Degree/ Certification Title"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
								/>
							</div>

							{/* Currently Studying */}
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									checked={currentEducation.isCurrentlyStudying}
									onChange={(e) =>
										setCurrentEducation({
											...currentEducation,
											isCurrentlyStudying: e.target.checked,
										})
									}
									className="w-4 h-4 text-[#6A0DAD] border-gray-300 rounded focus:ring-[#6A0DAD]"
								/>
								<span className="text-sm font-medium">Currently Studying?</span>
							</label>

							{/* Start Date */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Start Date
								</label>
								<div className="grid grid-cols-2 gap-3">
									<select
										value={currentEducation.startMonth}
										onChange={(e) =>
											setCurrentEducation({
												...currentEducation,
												startMonth: e.target.value,
											})
										}
										className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
									>
										<option value="">Month</option>
										{months.map((m) => (
											<option key={m} value={m}>
												{m}
											</option>
										))}
									</select>
									<select
										value={currentEducation.startYear}
										onChange={(e) =>
											setCurrentEducation({
												...currentEducation,
												startYear: e.target.value,
											})
										}
										className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
									>
										<option value="">Year</option>
										{years.map((y) => (
											<option key={y} value={y}>
												{y}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* End Date */}
							{!currentEducation.isCurrentlyStudying && (
								<div>
									<label className="block text-sm font-medium mb-2">
										End Date
									</label>
									<div className="grid grid-cols-2 gap-3">
										<select
											value={currentEducation.endMonth}
											onChange={(e) =>
												setCurrentEducation({
													...currentEducation,
													endMonth: e.target.value,
												})
											}
											className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
										>
											<option value="">Month</option>
											{months.map((m) => (
												<option key={m} value={m}>
													{m}
												</option>
											))}
										</select>
										<select
											value={currentEducation.endYear}
											onChange={(e) =>
												setCurrentEducation({
													...currentEducation,
													endYear: e.target.value,
												})
											}
											className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
										>
											<option value="">Year</option>
											{years.map((y) => (
												<option key={y} value={y}>
													{y}
												</option>
											))}
										</select>
									</div>
								</div>
							)}

							{/* Upload Certificate */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Upload Certificate (Optional)
								</label>
								<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
									<Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
									<p className="text-gray-600 mb-1">
										Drag your file here, or{" "}
										<label className="text-[#6A0DAD] font-semibold cursor-pointer hover:underline">
											browse
											<input
												type="file"
												onChange={handleFileUpload}
												className="hidden"
												accept=".pdf,.jpg,.jpeg,.png"
											/>
										</label>
									</p>
									<p className="text-xs text-gray-400">supports: (PDF, JPG)</p>
								</div>
							</div>

							{/* Add Button */}
							<button
								onClick={handleAddEducation}
								disabled={
									!currentEducation.institution || !currentEducation.degree
								}
								className={`w-full py-3 rounded-lg font-semibold ${
									currentEducation.institution && currentEducation.degree
										? "bg-[#6A0DAD] text-white hover:bg-[#5a0b92]"
										: "bg-gray-200 text-gray-400 cursor-not-allowed"
								}`}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EducationStep;
