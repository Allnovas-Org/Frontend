import React, { useState } from "react";
import {
	Dialog,
	TextField,
	IconButton,
	InputAdornment,
	Alert,
} from "@mui/material";
import {
	Close,
	Visibility,
	VisibilityOff,
	CheckCircle,
} from "@mui/icons-material";

interface ChangePasswordModalProps {
	open: boolean;
	onClose: () => void;
	userEmail?: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
	open,
	onClose,
	userEmail = "a...i@gmail.com",
}) => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = () => {
		// Clear previous errors
		setError("");

		// Validation
		if (!currentPassword || !newPassword || !confirmPassword) {
			setError("All fields are required");
			return;
		}

		if (newPassword !== confirmPassword) {
			setError("New passwords do not match");
			return;
		}

		if (newPassword.length < 8) {
			setError("New password must be at least 8 characters");
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setIsSuccess(true);
		}, 500);
	};

	const handleClose = () => {
		// Reset all states
		setCurrentPassword("");
		setNewPassword("");
		setConfirmPassword("");
		setError("");
		setIsSuccess(false);
		onClose();
	};

	const handleSuccessClose = () => {
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
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
						Change Password
					</h2>
					<p className="text-sm text-gray-500">
						Enter your current password and choose a new secure password
					</p>
				</div>
				<IconButton onClick={handleClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			{isSuccess ? (
				/* Success State */
				<div className="px-6 py-12 flex flex-col items-center justify-center">
					<div className="mb-6">
						<CheckCircle sx={{ fontSize: 64, color: "#4CAF50" }} />
					</div>
					<h3 className="text-xl font-semibold text-gray-900 mb-2">
						Password changed successfully!
					</h3>
					<p className="text-sm text-gray-500 text-center mb-8">
						You can now use your new password to sign in
					</p>
					<button
						onClick={handleSuccessClose}
						className="px-6 py-2 text-sm text-white rounded-lg transition"
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
			) : (
				/* Form State */
				<div className="px-6 pb-6">
					<div className="space-y-4">
						{/* Email Display */}
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								Email
							</label>
							<div className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
								{userEmail}
							</div>
						</div>

						{/* Error Alert */}
						{error && (
							<Alert
								severity="error"
								sx={{
									borderRadius: "8px",
									backgroundColor: "#FEE",
									color: "#C62828",
									"& .MuiAlert-icon": {
										color: "#C62828",
									},
								}}
							>
								{error}
							</Alert>
						)}

						{/* Current Password */}
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								Current Password
							</label>
							<TextField
								fullWidth
								type={showCurrentPassword ? "text" : "password"}
								placeholder="Enter your Password"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								size="small"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() =>
													setShowCurrentPassword(!showCurrentPassword)
												}
												edge="end"
												size="small"
											>
												{showCurrentPassword ? (
													<VisibilityOff fontSize="small" />
												) : (
													<Visibility fontSize="small" />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>

						{/* New Password */}
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								New Password
							</label>
							<TextField
								fullWidth
								type={showNewPassword ? "text" : "password"}
								placeholder="Enter your Password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								size="small"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => setShowNewPassword(!showNewPassword)}
												edge="end"
												size="small"
											>
												{showNewPassword ? (
													<VisibilityOff fontSize="small" />
												) : (
													<Visibility fontSize="small" />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>

						{/* Confirm New Password */}
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								Confirm New Password
							</label>
							<TextField
								fullWidth
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Enter your Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								size="small"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
												edge="end"
												size="small"
											>
												{showConfirmPassword ? (
													<VisibilityOff fontSize="small" />
												) : (
													<Visibility fontSize="small" />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end gap-3 mt-6">
						<button
							onClick={handleClose}
							className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
						>
							Cancel
						</button>
						<button
							onClick={handleSubmit}
							className="px-6 py-2 text-sm text-white rounded-lg transition"
							style={{ backgroundColor: "#F05658" }}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = "#d94446";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = "#F05658";
							}}
						>
							Change Password
						</button>
					</div>
				</div>
			)}
		</Dialog>
	);
};

export default ChangePasswordModal;
