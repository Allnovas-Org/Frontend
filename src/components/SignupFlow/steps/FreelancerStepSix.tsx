import React, { useState } from "react";
import { X } from "lucide-react";

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
							<span className="text-sm">{spec}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};

export default SkillsStep;
