import React from "react";
import { Dialog } from "@mui/material";

interface ChangeDefaultBillingProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const ChangeDefaultBilling: React.FC<ChangeDefaultBillingProps> = ({
	open,
	onClose,
	onConfirm,
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
				{/* Title */}
				<div>
					<h2 className="text-xl font-semibold text-gray-900 mb-2">
						Set as default
					</h2>
					<p className="text-sm text-gray-600">
						Do you want to set updated card as your default means of payment?
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 px-6 py-3 text-base text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						No
					</button>
					<button
						onClick={onConfirm}
						className="flex-1 px-6 py-3 text-base text-white rounded-lg transition"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#d94446";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Yes, continue
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default ChangeDefaultBilling;
