import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface Language {
	id: string;
	language: string;
	proficiency: string;
}

const LanguageStep: React.FC = () => {
	const [languages, setLanguages] = useState<Language[]>([
		{ id: "1", language: "", proficiency: "" },
	]);

	const proficiencyLevels = [
		"Basic",
		"Conversational",
		"Fluent",
		"Native/Bilingual",
	];

	const commonLanguages = [
		"English",
		"Spanish",
		"French",
		"German",
		"Chinese (Mandarin)",
		"Japanese",
		"Korean",
		"Arabic",
		"Portuguese",
		"Russian",
		"Italian",
		"Dutch",
		"Hindi",
		"Turkish",
	];

	const handleAddLanguage = () => {
		const newLanguage: Language = {
			id: Date.now().toString(),
			language: "",
			proficiency: "",
		};
		setLanguages([...languages, newLanguage]);
	};

	const handleRemoveLanguage = (id: string) => {
		if (languages.length > 1) {
			setLanguages(languages.filter((lang) => lang.id !== id));
		}
	};

	const handleLanguageChange = (id: string, field: "language" | "proficiency", value: string) => {
		setLanguages(
			languages.map((lang) =>
				lang.id === id ? { ...lang, [field]: value } : lang
			)
		);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
					What Languages Do You Speak?
				</h2>
				<p className="text-sm text-gray-600">
					Let clients know what languages you're comfortable working in.
				</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-base font-semibold text-gray-900">Language</h3>
					<button
						onClick={handleAddLanguage}
						className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
					>
						<Plus className="w-4 h-4" />
						Add Language
					</button>
				</div>

				{languages.map((lang, index) => (
					<div key={lang.id} className="grid grid-cols-2 gap-4">
						{/* Language Dropdown */}
						<div>
							{index === 0 && (
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Language
								</label>
							)}
							<div className="relative">
								<select
									value={lang.language}
									onChange={(e) => handleLanguageChange(lang.id, "language", e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white appearance-none cursor-pointer"
									style={{
										backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'right 1rem center',
										backgroundSize: '12px',
									}}
								>
									<option value="">Search & Select</option>
									{commonLanguages.map((language) => (
										<option key={language} value={language}>
											{language}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Proficiency Dropdown */}
						<div>
							{index === 0 && (
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Proficiency
								</label>
							)}
							<div className="relative flex gap-2">
								<select
									value={lang.proficiency}
									onChange={(e) => handleLanguageChange(lang.id, "proficiency", e.target.value)}
									className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white appearance-none cursor-pointer"
									style={{
										backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'right 1rem center',
										backgroundSize: '12px',
									}}
								>
									<option value="">My level is</option>
									{proficiencyLevels.map((level) => (
										<option key={level} value={level}>
											{level}
										</option>
									))}
								</select>
								{languages.length > 1 && (
									<button
										onClick={() => handleRemoveLanguage(lang.id)}
										className="p-3 text-gray-400 hover:text-red-500 transition"
										aria-label="Remove language"
									>
										<X className="w-5 h-5" />
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LanguageStep;