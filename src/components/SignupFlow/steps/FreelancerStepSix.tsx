import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { countries, Country } from "../../../utils/countries";
import React, { useState } from "react";
import { X } from "lucide-react";

interface FreelancerStepSixProps {
	onNext: () => void;
	onBack: () => void;
}

const FreelancerStepSix: React.FC<FreelancerStepSixProps> = ({
	onNext,
	onBack,
}) => {
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [country, setCountry] = useState("");
	const [countryCode, setCountryCode] = useState("+234");
	const [phoneNumber, setPhoneNumber] = useState("");

	// Function to get country code by country name
	const getCountryCode = (countryName: string): string => {
		const foundCountry = countries.find(
			(c) => c.name.toLowerCase() === countryName.toLowerCase(),
		);
		return foundCountry ? foundCountry.code : "+234"; // Default to Nigeria's code
	};

	// Update country code when country changes
	useEffect(() => {
		if (country) {
			const code = getCountryCode(country);
			setCountryCode(code);
		}
	}, [country]);
// Mock data for demonstration
const profileCompletionsSkills = [
	{
		name: "Video Editing & Animation",
		subs: [
			"Motion Graphics",
			"Color Grading",
			"Video Production",
			"3D Animation",
		],
	},
	{
		name: "Graphic Design",
		subs: ["Logo Design", "Brand Identity", "UI/UX Design", "Illustration"],
	},
	{
		name: "Web Development",
		subs: ["Frontend", "Backend", "Full Stack", "Mobile Apps"],
	},
];

const SkillsStep = () => {
	const [selectedSkill, setSelectedSkill] = useState("");
	const [skills, setSkills] = useState<string[]>(["Video Editing & Animation"]);
	const [tempSkillStore, setTempSkillStore] = useState<
		{ skill: string; specialisations: string[] }[]
	>([]);
	const [selectedSpecializations, setSelectedSpecializations] = useState<
		string[]
	>(["Video Editing & Animation"]);
	const [experience, setExperience] = useState("Intermediate (2-5 years)");

	const currentCategory = profileCompletionsSkills.find(
		(cat) => cat.name === selectedSkill || skills.includes(cat.name),
	);

	const specializationOptions = currentCategory ? currentCategory.subs : [];

	const toggleSpecialization = (spec: string) => {
		if (selectedSpecializations.includes(spec)) {
			setSelectedSpecializations(
				selectedSpecializations.filter((s) => s !== spec),
			);
		} else {
			setSelectedSpecializations([...selectedSpecializations, spec]);
		}
	};

	const handleAddSkill = () => {
		if (!selectedSkill) return;

		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const year = String(date.getFullYear()).slice(-2);

		return `${month}/${day}/${year}`;
	};

	const isValid = dateOfBirth && country && phoneNumber;
		const newEntry = {
			skill: selectedSkill,
			specialisations: selectedSpecializations,
		};

		const updatedTempSkillStore = [...tempSkillStore, newEntry];
		setTempSkillStore(updatedTempSkillStore);

		// Console log the updated store
		console.log("tempSkillStore:", updatedTempSkillStore);

		if (!skills.includes(selectedSkill)) setSkills([...skills, selectedSkill]);
	};

	return (
		<div className="p-8 max-w-4xl">
			<h2 className="text-2xl font-bold mb-2">What Are You Great At</h2>
			<p className="text-gray-600 mb-8">
				Help clients understand your expertise and experience level
			</p>

			{/* Your Skills */}
			<div className="mb-6 max-lg:text-sm">
				<label className="block font-medium mb-3">Your Skills</label>
				<div className="flex gap-3">
					<select
						value={selectedSkill}
						onChange={(e) => setSelectedSkill(e.target.value)}
						className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
					>
						<option value="">Select country</option>
						{countries.map((countryObj) => (
							<option key={countryObj.name} value={countryObj.name}>
								{countryObj.name}
						<option value="">Select a skill category</option>
						{profileCompletionsSkills.map((cat) => (
							<option key={cat.name} value={cat.name}>
								{cat.name}
							</option>
						))}
					</select>
					<button
						onClick={handleAddSkill}
						className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
					>
						+
					</button>
				</div>

				{/* Phone Number */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Phone Number
					</label>
					<div className="grid grid-cols-3 gap-3">
						<div className="col-span-1">
							<select
								value={countryCode}
								onChange={(e) => setCountryCode(e.target.value)}
								className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent appearance-none bg-white"
							>
								{countries.map((countryObj) => (
									<option key={countryObj.code} value={countryObj.code}>
										{countryObj.code}
									</option>
								))}
							</select>
						</div>
						<div className="col-span-2">
				{/* Selected Skills */}
				<div className="flex flex-wrap gap-2 mt-3">
					{skills.map((skill, index) => (
						<span
							key={index}
							className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full flex items-center gap-2"
						>
							{skill}
							<X
								className="w-4 h-4 cursor-pointer"
								onClick={() => setSkills(skills.filter((_, i) => i !== index))}
							/>
						</span>
					))}
				</div>
			</div>

			{/* Years of Experience */}
			<div className="mb-8 max-lg:text-sm">
				<label className="block lg:font-medium mb-3">Years of Experience</label>
				<select
					value={experience}
					onChange={(e) => setExperience(e.target.value)}
					className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
				>
					<option>Entry Level (0-2 years)</option>
					<option>Intermediate (2-5 years)</option>
					<option>Expert (5+ years)</option>
				</select>
			</div>

			{/* Specialization Areas */}
			<div>
				<label className="block font-medium mb-3">Specialization Areas</label>
				<div className="grid lg:grid-cols-4 max-md:grid-cols-2 grid-cols-3 gap-3">
					{specializationOptions.map((spec) => (
						<label
							key={spec}
							className="flex items-center gap-2 cursor-pointer"
						>
							<input
								type="checkbox"
								checked={selectedSpecializations.includes(spec)}
								onChange={() => toggleSpecialization(spec)}
								className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
							/>
						</div>
					</div>
					{/* Display current country code info */}
					{country && (
						<p className="text-sm text-gray-500 mt-2">
							Country code for {country}: {countryCode}
						</p>
					)}
							<span className="text-sm">{spec}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};

export default SkillsStep;
