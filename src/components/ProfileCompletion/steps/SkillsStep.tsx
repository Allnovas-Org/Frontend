import React, { useState } from "react";
import { X } from "lucide-react";

const SkillsStep = () => {
	const [selectedSkill, setSelectedSkill] = useState("");
	const [skills, setSkills] = useState<string[]>(["Video Editing & Animation"]);
	const [experience, setExperience] = useState("Intermediate (2-5 years)");

	const specializationOptions = [
		"Video Editing",
		"Motion Graphics",
		"2D Animation",
		"3D Animation",
		"Explainer Videos",
		"Whiteboard Animation",
		"Video Ads & Promos",
		"Logo Animation",
		"Intros & Outros",
		"Subtitling & Captioning",
		"Visual Effects (VFX)",
		"Animated Presentations",
		"Slideshow Videos",
		"Cinematic Video Editing",
		"Music Video Editing",
		"Social Media Video Content",
	];

	const [selectedSpecializations, setSelectedSpecializations] = useState<
		string[]
	>([]);

	const toggleSpecialization = (spec: string) => {
		if (selectedSpecializations.includes(spec)) {
			setSelectedSpecializations(
				selectedSpecializations.filter((s) => s !== spec),
			);
		} else {
			setSelectedSpecializations([...selectedSpecializations, spec]);
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">What Are You Great At</h2>
			<p className="text-gray-600 mb-8">
				Help clients understand your expertise and experience level
			</p>

			{/* Your Skills */}
			<div className="mb-6 max-lg:text-sm">
				<label className="block font-medium mb-3">Your Skills</label>
				<div className="flex gap-3">
					<input
						type="text"
						value={selectedSkill}
						onChange={(e) => setSelectedSkill(e.target.value)}
						placeholder="Video Editing & Animation"
						className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
					/>
					<button className="px-6 py-3 bg-[#6A0DAD] text-white rounded-lg font-semibold hover:bg-[#5a0b92]">
						+
					</button>
				</div>

				{/* Selected Skills */}
				<div className="flex flex-wrap gap-2 mt-3">
					{skills.map((skill, index) => (
						<span
							key={index}
							className="px-4 py-2 bg-purple-100 text-[#6A0DAD] rounded-full flex items-center gap-2"
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
					className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
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
								className="w-4 h-4 text-[#6A0DAD] border-gray-300 rounded focus:ring-[#6A0DAD]"
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
