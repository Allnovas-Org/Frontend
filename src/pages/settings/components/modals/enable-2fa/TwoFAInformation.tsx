import React from "react";
import { Dialog, IconButton, Alert } from "@mui/material";
import { Close, CheckCircleOutline } from "@mui/icons-material";

interface TwoFAInformationProps {
	open: boolean;
	onClose: () => void;
	onContinue: () => void;
}

const TwoFAInformation: React.FC<TwoFAInformationProps> = ({
	open,
	onClose,
	onContinue,
}) => {
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
						Enable Two-Factor Authentication
					</h2>
					<p className="text-sm text-gray-500">
						Add an extra layer of security to your account with 2FA
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
					icon={<CheckCircleOutline />}
					sx={{
						borderRadius: "8px",
						backgroundColor: "#E3F2FD",
						color: "#1976D2",
						"& .MuiAlert-icon": {
							color: "#1976D2",
						},
					}}
				>
					Two-factor authentication significantly improves your account security
					by requiring a second verification method when signing in.
				</Alert>

				{/* What you'll need */}
				<div className="bg-gray-50 rounded-lg p-4">
					<h3 className="text-sm font-semibold text-gray-900 mb-3">
						What you'll need:
					</h3>
					<ul className="space-y-2 text-sm text-gray-700">
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>
								A smartphone with an authenticator app (Google Authenticator,
								Authy, Microsoft Authenticator, etc.)
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>A safe place to store backup codes</span>
						</li>
					</ul>
				</div>

				{/* How it works */}
				<div className="bg-gray-50 rounded-lg p-4">
					<h3 className="text-sm font-semibold text-gray-900 mb-3">
						How it works:
					</h3>
					<ul className="space-y-2 text-sm text-gray-700">
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Scan a QR code with your authenticator app</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Verify the setup with a 6-digit code</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Save your backup codes in a secure location</span>
						</li>
					</ul>
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
						onClick={onContinue}
						className="px-6 py-2 text-sm text-white rounded-lg transition"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#d94446";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Get Started
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default TwoFAInformation;
