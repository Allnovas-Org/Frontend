import React, { useState } from "react";
import {
	Dialog,
	IconButton,
	Alert,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import { Close, Info, ContentCopy } from "@mui/icons-material";

interface TwoFABackupCodesProps {
	open: boolean;
	onClose: () => void;
	onComplete: () => void;
	backupCodes?: string[];
}

const TwoFABackupCodes: React.FC<TwoFABackupCodesProps> = ({
	open,
	onClose,
	onComplete,
	backupCodes = [
		"8F4K-9L2M-3N5P",
		"7Q6R-8S9T-2U3V",
		"4W5X-6Y7Z-1A2B",
		"3C4D-5E6F-7G8H",
		"9I0J-1K2L-3M4N",
	],
}) => {
	const [hasSaved, setHasSaved] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopyAll = () => {
		const codesText = backupCodes.join("\n");
		navigator.clipboard.writeText(codesText);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleComplete = () => {
		if (hasSaved) {
			onComplete();
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
						Save Your Backup Codes
					</h2>
					<p className="text-sm text-gray-500">
						Store these codes in a safe place. Use them if you lose access to
						your authenticator app
					</p>
				</div>
				<IconButton onClick={onClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			<div className="px-6 pb-6 space-y-4">
				{/* Info Alert */}
				<Alert
					severity="info"
					icon={<Info />}
					sx={{
						borderRadius: "8px",
						backgroundColor: "#E3F2FD",
						color: "#1976D2",
						"& .MuiAlert-icon": {
							color: "#1976D2",
						},
					}}
				>
					Each code can only be used once. Keep them private and secure.
				</Alert>

				{/* Backup Codes Display */}
				<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
					<div className="flex items-center justify-between mb-3">
						<h3 className="text-sm font-semibold text-gray-900">
							Your Backup Codes
						</h3>
						<IconButton
							size="small"
							onClick={handleCopyAll}
							sx={{ color: "#F05658" }}
						>
							<ContentCopy fontSize="small" />
						</IconButton>
					</div>
					<div className="space-y-2">
						{backupCodes.map((code, index) => (
							<div
								key={index}
								className="bg-white border border-gray-200 rounded px-3 py-2 font-mono text-sm text-gray-900"
							>
								{code}
							</div>
						))}
					</div>
					{copied && (
						<p className="text-xs text-green-600 mt-2">
							All codes copied to clipboard!
						</p>
					)}
				</div>

				{/* Confirmation Checkbox */}
				<FormControlLabel
					control={
						<Checkbox
							checked={hasSaved}
							onChange={(e) => setHasSaved(e.target.checked)}
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
							I have saved my backup codes in a secure location
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

				{/* Action Buttons */}
				<div className="flex justify-end gap-3 pt-2">
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Cancel
					</button>
					<button
						onClick={handleComplete}
						disabled={!hasSaved}
						className="px-6 py-2 text-sm text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							if (hasSaved) {
								e.currentTarget.style.backgroundColor = "#d94446";
							}
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Complete Setup
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default TwoFABackupCodes;
