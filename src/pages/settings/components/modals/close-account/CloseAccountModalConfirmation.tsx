import React, { useState } from "react";
import { Dialog, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import { Close } from "@mui/icons-material";

interface CloseAccountModalConfirmationProps {
	open: boolean;
	onClose: () => void;
	onContinue: () => void;
	onBack: () => void;
}

const CloseAccountModalConfirmation: React.FC<
	CloseAccountModalConfirmationProps
> = ({ open, onClose, onContinue, onBack }) => {
	const [checks, setChecks] = useState({
		understand: false,
		completedProjects: false,
		withdrawnFunds: false,
		downloadedData: false,
	});

	const handleCheckChange =
		(key: keyof typeof checks) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setChecks((prev) => ({
				...prev,
				[key]: event.target.checked,
			}));
		};

	const allChecked = Object.values(checks).every((value) => value);

	const handleContinue = () => {
		if (allChecked) {
			onContinue();
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
						Confirm Account Deletion
					</h2>
					<p className="text-sm text-gray-500">
						Please acknowledge the following before proceeding
					</p>
				</div>
				<IconButton onClick={onClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			<div className="px-6 pb-6 space-y-4">
				{/* Checklist */}
				<div className="space-y-3">
					<FormControlLabel
						control={
							<Checkbox
								checked={checks.understand}
								onChange={handleCheckChange("understand")}
								sx={{
									color: "#D1D5DB",
									"&.Mui-checked": {
										color: "#F05658",
									},
								}}
							/>
						}
						label={
							<span className="text-sm text-gray-700">
								I understand that deleting my account is permanent and cannot be
								undone
							</span>
						}
						sx={{
							marginLeft: 0,
							alignItems: "flex-start",
							"& .MuiCheckbox-root": {
								paddingTop: 0,
							},
						}}
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={checks.completedProjects}
								onChange={handleCheckChange("completedProjects")}
								sx={{
									color: "#D1D5DB",
									"&.Mui-checked": {
										color: "#F05658",
									},
								}}
							/>
						}
						label={
							<span className="text-sm text-gray-700">
								I have completed or cancelled all active projects
							</span>
						}
						sx={{
							marginLeft: 0,
							alignItems: "flex-start",
							"& .MuiCheckbox-root": {
								paddingTop: 0,
							},
						}}
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={checks.withdrawnFunds}
								onChange={handleCheckChange("withdrawnFunds")}
								sx={{
									color: "#D1D5DB",
									"&.Mui-checked": {
										color: "#F05658",
									},
								}}
							/>
						}
						label={
							<span className="text-sm text-gray-700">
								I have withdrawn all funds from my account
							</span>
						}
						sx={{
							marginLeft: 0,
							alignItems: "flex-start",
							"& .MuiCheckbox-root": {
								paddingTop: 0,
							},
						}}
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={checks.downloadedData}
								onChange={handleCheckChange("downloadedData")}
								sx={{
									color: "#D1D5DB",
									"&.Mui-checked": {
										color: "#F05658",
									},
								}}
							/>
						}
						label={
							<span className="text-sm text-gray-700">
								I have downloaded any data I want to keep
							</span>
						}
						sx={{
							marginLeft: 0,
							alignItems: "flex-start",
							"& .MuiCheckbox-root": {
								paddingTop: 0,
							},
						}}
					/>
				</div>

				{/* Action Buttons */}
				<div className="flex justify-end gap-3 pt-2">
					<button
						onClick={onBack}
						className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Back
					</button>
					<button
						onClick={handleContinue}
						disabled={!allChecked}
						className="px-6 py-2 text-sm text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							if (allChecked) {
								e.currentTarget.style.backgroundColor = "#d94446";
							}
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Continue
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default CloseAccountModalConfirmation;
