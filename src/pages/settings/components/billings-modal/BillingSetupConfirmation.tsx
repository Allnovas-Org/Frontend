import React from "react";
import { Dialog, Alert } from "@mui/material";
import {
	CheckCircle,
	Info,
	CreditCard,
	ArrowForward,
} from "@mui/icons-material";

interface BillingSetupConfirmationProps {
	open: boolean;
	onClose: () => void;
	cardData?: {
		cardType: string;
		lastFourDigits: string;
		expiryDate: string;
	};
}

const BillingSetupConfirmation: React.FC<BillingSetupConfirmationProps> = ({
	open,
	onClose,
	cardData = {
		cardType: "Visa Card",
		lastFourDigits: "4242",
		expiryDate: "12/2027",
	},
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
					padding: "32px",
				},
			}}
		>
			<div className="space-y-6">
				{/* Success Icon */}
				<div className="flex justify-center">
					<div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
						<CheckCircle sx={{ fontSize: 48, color: "#4CAF50" }} />
					</div>
				</div>

				{/* Title and Description */}
				<div className="text-center">
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">
						Payment method added successfully
					</h2>
					<p className="text-sm text-gray-600">
						Your payment method was successfully added and will be billed if you
						need to perform an action like Go Pro on Allnova
					</p>
				</div>

				{/* Card Details */}
				<div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
					<div className="flex items-start gap-3">
						<div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
							<CreditCard sx={{ color: "white", fontSize: 24 }} />
						</div>
						<div className="flex-1">
							<h3 className="text-sm font-semibold text-gray-900 mb-1">
								{cardData.cardType}
							</h3>
							<p className="text-sm text-gray-700">
								•••• •••• •••• {cardData.lastFourDigits}
							</p>
						</div>
						<button
							className="text-sm font-medium hover:underline"
							style={{ color: "#9333EA" }}
						>
							Change Card
						</button>
					</div>
					<div className="mt-3 pt-3 border-t border-gray-200">
						<div className="flex items-center justify-between text-sm">
							<span className="text-gray-600">Expires</span>
							<span className="text-gray-900 font-medium">
								{cardData.expiryDate}
							</span>
						</div>
					</div>
				</div>

				{/* Security Info */}
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
					<div className="text-sm">
						<p className="font-semibold mb-1">
							Your payment information is secure
						</p>
						<p>
							Upwork uses bank-level security and encryption to protect your
							financial data. You'll only be charged when you approve payments
							for work.
						</p>
					</div>
				</Alert>

				{/* Ready to get started */}
				<div className="text-center">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Ready to get started?
					</h3>
					<div className="flex gap-3">
						<button
							className="flex-1 px-6 py-3 text-base text-white rounded-lg transition flex items-center justify-center gap-2"
							style={{ backgroundColor: "#F05658" }}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = "#d94446";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = "#F05658";
							}}
						>
							Browse jobs
							<ArrowForward fontSize="small" />
						</button>
						<button className="flex-1 px-6 py-3 text-base text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
							Go to your profile
							<ArrowForward fontSize="small" />
						</button>
					</div>
				</div>

				{/* What happens next */}
				<div className="bg-gray-50 rounded-lg p-4">
					<h4 className="text-sm font-semibold text-gray-900 mb-3">
						What happens next?
					</h4>
					<ul className="space-y-2">
						<li className="flex items-start text-sm text-gray-700">
							<span className="text-green-600 mr-2">•</span>
							<span>Browse jobs and send proposals with no attached costs</span>
						</li>
						<li className="flex items-start text-sm text-gray-700">
							<span className="text-green-600 mr-2">•</span>
							<span>Review and approve contracts before they're processed</span>
						</li>
						<li className="flex items-start text-sm text-gray-700">
							<span className="text-green-600 mr-2">•</span>
							<span>Get invoices and payment confirmations via email</span>
						</li>
					</ul>
				</div>

				{/* Footer Links */}
				<div className="flex items-center justify-center gap-6 text-sm">
					<button
						className="font-medium hover:underline"
						style={{ color: "#F05658" }}
					>
						Manage Billing Settings
					</button>
					<span className="text-gray-300">•</span>
					<button className="text-gray-700 hover:underline">
						View Payment Methods
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default BillingSetupConfirmation;
