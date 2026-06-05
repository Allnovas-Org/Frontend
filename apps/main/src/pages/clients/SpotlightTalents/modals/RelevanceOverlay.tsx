import React, { useState } from "react";
import { Dialog, Checkbox, FormControlLabel } from "@mui/material";
import { TuneOutlined } from "@mui/icons-material";

interface RelevanceOverlayProps {
	open: boolean;
	onClose: () => void;
	selectedRelevance: string[];
	onApply: (selected: string[]) => void;
}

const relevanceOptions = [
	"Front-End Development",
	"Back-End Development",
	"Full-Stack Development",
	"E-commerce Development",
	"Web App Development",
	"Landing Page Development",
	"CMS Development",
	"Custom Website Development",
];

const RelevanceOverlay: React.FC<RelevanceOverlayProps> = ({
	open,
	onClose,
	selectedRelevance,
	onApply,
}) => {
	const [tempSelected, setTempSelected] = useState<string[]>(selectedRelevance);

	const handleToggle = (option: string) => {
		setTempSelected((prev) =>
			prev.includes(option)
				? prev.filter((item) => item !== option)
				: [...prev, option],
		);
	};

	const handleApply = () => {
		onApply(tempSelected);
		onClose();
	};

	const handleClear = () => {
		setTempSelected([]);
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					borderRadius: 2,
					minWidth: 320,
					maxWidth: 400,
				},
			}}
		>
			<div className="p-4">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold text-lg">Filter by Relevance</h3>
					<button
						onClick={handleClear}
						className="text-sm text-gray-500 hover:text-gray-700"
					>
						Clear all
					</button>
				</div>

				<div className="space-y-2 max-h-96 overflow-y-auto">
					{relevanceOptions.map((option) => (
						<FormControlLabel
							key={option}
							control={
								<Checkbox
									checked={tempSelected.includes(option)}
									onChange={() => handleToggle(option)}
									sx={{
										color: "#d1d5db",
										"&.Mui-checked": {
											color: "#6A0DAD",
										},
									}}
								/>
							}
							label={option}
							sx={{
								margin: 0,
								padding: "8px 12px",
								borderRadius: "8px",
								"&:hover": {
									backgroundColor: "#f9fafb",
								},
							}}
						/>
					))}
				</div>

				<div className="flex gap-3 mt-6">
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
					>
						Cancel
					</button>
					<button
						onClick={handleApply}
						className="flex-1 px-4 py-2 bg-[#6A0DAD] text-white rounded-lg font-medium hover:bg-[#5a0b92] transition"
					>
						Apply ({tempSelected.length})
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default RelevanceOverlay;
