import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface Tool {
	name: string;
	proficiency: string;
}

const ToolsStep = () => {
	const [toolInput, setToolInput] = useState("");
	const [tools, setTools] = useState<Tool[]>([
		{ name: "Figma", proficiency: "Intermediate" },
		{ name: "Adobe", proficiency: "" },
	]);

	const addTool = () => {
		if (toolInput.trim()) {
			setTools([...tools, { name: toolInput, proficiency: "" }]);
			setToolInput("");
		}
	};

	const removeTool = (index: number) => {
		setTools(tools.filter((_, i) => i !== index));
	};

	const updateProficiency = (index: number, proficiency: string) => {
		const newTools = [...tools];
		newTools[index].proficiency = proficiency;
		setTools(newTools);
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">What tools do you use?</h2>
			<p className="text-gray-600 mb-8">
				List the software, frameworks, and technologies you're proficient with
			</p>

			{/* Add Tools Input */}
			<div className="mb-6">
				<label className="block font-medium mb-3">
					Add Tools & Technologies
				</label>
				<div className="flex gap-3">
					<input
						type="text"
						value={toolInput}
						onChange={(e) => setToolInput(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && addTool()}
						placeholder="e.g., Figma, Adobe Creative Suite, AWS"
						className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
					/>
					<button
						onClick={addTool}
						className="px-6 py-3 bg-[#6A0DAD] text-white rounded-lg font-semibold hover:bg-[#5a0b92]"
					>
						+
					</button>
				</div>
			</div>

			{/* Tools List */}
			<div className="space-y-4">
				{tools.map((tool, index) => (
					<div key={index} className="p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center justify-between mb-3">
							<h3 className="font-semibold text-lg">{tool.name}</h3>
							<button
								onClick={() => removeTool(index)}
								className="text-gray-400 hover:text-gray-600"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Proficiency Level
							</label>
							<div className="relative">
								<select
									value={tool.proficiency}
									onChange={(e) => updateProficiency(index, e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] appearance-none bg-white"
								>
									<option value="">Select proficiency</option>
									<option value="Beginner">Beginner</option>
									<option value="Intermediate">Intermediate</option>
									<option value="Advanced">Advanced</option>
									<option value="Expert">Expert</option>
								</select>
								<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ToolsStep;
