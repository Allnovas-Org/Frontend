import React, { useState } from "react";
import { ChevronDown, Minus } from "lucide-react";

interface Language {
	language: string;
	proficiency: string;
}

const LanguageStep = () => {
	const [languages, setLanguages] = useState<Language[]>([
		{ language: "", proficiency: "" },
		{ language: "", proficiency: "" },
	]);

	const languageOptions = [
		"English",
		"Spanish",
		"French",
		"German",
		"Chinese",
		"Japanese",
		"Korean",
		"Arabic",
		"Portuguese",
		"Russian",
		"Italian",
		"Hindi",
		"Yoruba",
		"Igbo",
		"Hausa",
		"Swahili",
	];

	const proficiencyLevels = [
		"Basic",
		"Conversational",
		"Fluent",
		"Native/Bilingual",
	];

	const addLanguage = () => {
		setLanguages([...languages, { language: "", proficiency: "" }]);
	};

	const removeLanguage = (index: number) => {
		if (languages.length > 1) {
			const newLanguages = languages.filter((_, i) => i !== index);
			setLanguages(newLanguages);
		}
	};

	const updateLanguage = (
		index: number,
		field: "language" | "proficiency",
		value: string,
	) => {
		const newLanguages = [...languages];
		newLanguages[index][field] = value;
		setLanguages(newLanguages);
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">What Languages Do You Speak?</h2>
			<p className="text-gray-600 mb-8 max-md:text-sm">
				Let clients know what languages you're comfortable working in. This
				helps improve communication and matching with international projects.
			</p>

			{/* Language Section */}
			<div className="mb-6">
				<div className="flex justify-between items-center mb-4">
					<h3 className="font-semibold text-lg">Language</h3>
					<button
						onClick={addLanguage}
						className="flex items-center gap-2 text-[#6A0DAD] font-medium hover:underline"
					>
						<span>+</span> Add Language
					</button>
				</div>

				{/* Language Entries */}
				<div className="space-y-6">
					{languages.map((lang, index) => (
						<div key={index} className="relative">
							{/* Remove Button - positioned at top right */}
							{languages.length > 1 && (
								<button
									onClick={() => removeLanguage(index)}
									className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md z-10"
									title="Remove language"
								>
									<Minus size={16} />
								</button>
							)}

							<div className="grid grid-cols-2 gap-4">
								{/* Language Select */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Language
									</label>
									<div className="relative">
										<select
											value={lang.language}
											onChange={(e) =>
												updateLanguage(index, "language", e.target.value)
											}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] appearance-none bg-white"
										>
											<option value="">Search & Select</option>
											{languageOptions.map((language) => (
												<option key={language} value={language}>
													{language}
												</option>
											))}
										</select>
										<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
									</div>
								</div>

								{/* Proficiency Select */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Proficiency
									</label>
									<div className="relative">
										<select
											value={lang.proficiency}
											onChange={(e) =>
												updateLanguage(index, "proficiency", e.target.value)
											}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] appearance-none bg-white"
										>
											<option value="">My level is</option>
											{proficiencyLevels.map((level) => (
												<option key={level} value={level}>
													{level}
												</option>
											))}
										</select>
										<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LanguageStep;
