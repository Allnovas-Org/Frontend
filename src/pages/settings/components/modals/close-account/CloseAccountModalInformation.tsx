import React from "react";
import { Dialog, IconButton, Alert } from "@mui/material";
import { Close, Warning } from "@mui/icons-material";

interface CloseAccountModalInformationProps {
	open: boolean;
	onClose: () => void;
	onContinue: () => void;
}

const CloseAccountModalInformation: React.FC<
	CloseAccountModalInformationProps
> = ({ open, onClose, onContinue }) => {
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
						Close Account
					</h2>
					<p className="text-sm text-gray-500">
						This action cannot be undone. Please read carefully before
						proceeding.
					</p>
				</div>
				<IconButton onClick={onClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			<div className="px-6 pb-6 space-y-4">
				{/* Warning Alert */}
				<Alert
					severity="error"
					icon={<Warning />}
					sx={{
						borderRadius: "8px",
						backgroundColor: "#FEE",
						color: "#C62828",
						"& .MuiAlert-icon": {
							color: "#C62828",
						},
					}}
				>
					Closing your account is permanent and cannot be reversed
				</Alert>

				{/* What will be deleted */}
				<div className="bg-gray-50 rounded-lg p-4">
					<h3 className="text-sm font-semibold text-gray-900 mb-3">
						What will be deleted:
					</h3>
					<ul className="space-y-2 text-sm text-gray-700">
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Your profile and all personal information</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>All your projects, proposals, and work history</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Your portfolio, reviews, and ratings</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>All messages and communication history</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Payment methods and transaction history</span>
						</li>
					</ul>
				</div>

				{/* Before you delete */}
				<div className="bg-gray-50 rounded-lg p-4">
					<h3 className="text-sm font-semibold text-gray-900 mb-3">
						Before you delete your account:
					</h3>
					<ul className="space-y-2 text-sm text-gray-700">
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Complete or cancel all active projects</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Withdraw any remaining balance from your account</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2">•</span>
							<span>Download any data you want to keep</span>
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
						Close Account
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default CloseAccountModalInformation;
