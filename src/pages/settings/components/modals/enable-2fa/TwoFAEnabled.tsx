import React from "react";
import { Dialog, IconButton, Alert } from "@mui/material";
import { Close, CheckCircle } from "@mui/icons-material";

interface TwoFAEnabledProps {
	open: boolean;
	onClose: () => void;
}

const TwoFAEnabled: React.FC<TwoFAEnabledProps> = ({ open, onClose }) => {
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
						Two-Factor Authentication Enabled
					</h2>
					<p className="text-sm text-gray-500">
						Your account is now more secure
					</p>
				</div>
				<IconButton onClick={onClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			<div className="px-6 pb-6 space-y-4">
				{/* Success Alert */}
				<Alert
					severity="success"
					icon={<CheckCircle />}
					sx={{
						borderRadius: "8px",
						backgroundColor: "#E8F5E9",
						color: "#2E7D32",
						"& .MuiAlert-icon": {
							color: "#4CAF50",
						},
					}}
				>
					2FA has been successfully enabled on your account. You'll be asked for
					a verification code when signing in from a new device.
				</Alert>

				{/* What's Next Section */}
				<div className="bg-gray-50 rounded-lg p-4">
					<h3 className="text-sm font-semibold text-gray-900 mb-3">
						What's next
					</h3>
					<ul className="space-y-2 text-sm text-gray-700">
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Keep your authenticator app installed and updated</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Store your backup codes in a secure location</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>
								You can disable 2FA anytime from your security settings
							</span>
						</li>
					</ul>
				</div>

				{/* Action Button */}
				<div className="flex justify-end pt-2">
					<button
						onClick={onClose}
						className="px-8 py-2 text-sm text-white rounded-lg transition w-full"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#d94446";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Done
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default TwoFAEnabled;
