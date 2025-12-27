import React from "react";
import { Dialog } from "@mui/material";

interface DeviceSignOutModalProps {
	open: boolean;
	onClose: () => void;
	deviceName: string;
	location: string;
	onConfirm: () => void;
}

const DeviceSignOutModal: React.FC<DeviceSignOutModalProps> = ({
	open,
	onClose,
	deviceName,
	location,
	onConfirm,
}) => {
	const handleSignOut = () => {
		onConfirm();
		onClose();
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
					padding: "24px",
				},
			}}
		>
			<div className="space-y-6">
				{/* Title */}
				<h2 className="text-2xl font-semibold text-gray-900">
					Sign out of this device?
				</h2>

				{/* Description */}
				<p className="text-base text-gray-600 leading-relaxed">
					You will be signed out of {deviceName} in {location}. You'll need to
					sign in again to access your account on this device.
				</p>

				{/* Action Buttons */}
				<div className="flex gap-3 pt-2">
					<button
						onClick={onClose}
						className="flex-1 px-4 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Cancel
					</button>
					<button
						onClick={handleSignOut}
						className="flex-1 px-4 py-3 text-base font-medium text-white rounded-lg transition"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#d94446";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Sign Out
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default DeviceSignOutModal;
