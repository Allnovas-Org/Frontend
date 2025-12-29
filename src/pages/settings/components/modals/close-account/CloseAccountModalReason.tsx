import React, { useState } from "react";
import {
	Dialog,
	IconButton,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface CloseAccountModalReasonProps {
	open: boolean;
	onClose: () => void;
	onContinue: (reason: string, additionalFeedback?: string) => void;
}

const CloseAccountModalReason: React.FC<CloseAccountModalReasonProps> = ({
	open,
	onClose,
	onContinue,
}) => {
	const [selectedReason, setSelectedReason] = useState<string>("");
	const [additionalFeedback, setAdditionalFeedback] = useState<string>("");

	const reasons = [
		"Found a better platform",
		"Not enough work opportunities",
		"Low earnings or rate",
		"Poor user experience",
		"Privacy or security concerns",
		"No longer freelancing",
		"Other",
	];

	const handleContinue = () => {
		if (selectedReason) {
			onContinue(selectedReason, additionalFeedback);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="sm"
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: "12px",
					padding: "8px",
				},
			}}
		>
			{/* Header */}
			<div className="flex items-start justify-between p-4 pb-2">
				<div>
					<h2 className="text-xl font-semibold text-gray-900 mb-1">
						We'd like to know why
					</h2>
					<p className="text-sm text-gray-500">
						Your feedback helps us improve. Please tell us why you're closing
						your account
					</p>
				</div>
				<IconButton onClick={onClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			<div className="px-6 pb-6 space-y-4">
				{/* Reason Selection */}
				<RadioGroup
					value={selectedReason}
					onChange={(e) => setSelectedReason(e.target.value)}
				>
					{reasons.map((reason) => (
						<FormControlLabel
							key={reason}
							value={reason}
							control={
								<Radio
									sx={{
										color: "#D1D5DB",
										"&.Mui-checked": {
											color: "#F05658",
										},
									}}
								/>
							}
							label={<span className="text-sm text-gray-700">{reason}</span>}
							sx={{
								marginLeft: 0,
								marginRight: 0,
								"& .MuiFormControlLabel-label": {
									marginLeft: "8px",
								},
							}}
						/>
					))}
				</RadioGroup>

				{/* Additional Feedback */}
				<div className="pt-2">
					<label className="block text-sm font-medium text-gray-900 mb-2">
						Please tell us more (optional)
					</label>
					<TextField
						fullWidth
						multiline
						rows={4}
						placeholder="Your feedback helps us improve..."
						value={additionalFeedback}
						onChange={(e) => setAdditionalFeedback(e.target.value)}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "8px",
							},
						}}
					/>
				</div>

				{/* Action Buttons */}
				<div className="flex justify-end gap-3 pt-2">
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Cancel
					</button>
					<button
						onClick={handleContinue}
						disabled={!selectedReason}
						className="px-6 py-2 text-sm text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							if (selectedReason) {
								e.currentTarget.style.backgroundColor = "#d94446";
							}
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Close Account
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default CloseAccountModalReason;
