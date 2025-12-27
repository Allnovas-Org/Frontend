import React, { useState } from "react";
import {
	Dialog,
	IconButton,
	TextField,
	Alert,
	InputAdornment,
} from "@mui/material";
import { Close, Info, Visibility, VisibilityOff } from "@mui/icons-material";

interface CloseAccountModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: (password: string, confirmText: string) => void;
	onBack: () => void;
}

const CloseAccountModal: React.FC<CloseAccountModalProps> = ({
	open,
	onClose,
	onConfirm,
	onBack,
}) => {
	const [password, setPassword] = useState("");
	const [confirmText, setConfirmText] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const isValid =
		password.trim() !== "" && confirmText.toUpperCase() === "CLOSE";

	const handleConfirm = () => {
		if (isValid) {
			onConfirm(password, confirmText);
			// Reset fields
			setPassword("");
			setConfirmText("");
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
						Final Confirmation
					</h2>
					<p className="text-sm text-gray-500">
						Enter your password and type "CLOSE" to permanently close your
						account
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
					icon={<Info />}
					sx={{
						borderRadius: "8px",
						backgroundColor: "#FEE",
						color: "#C62828",
						"& .MuiAlert-icon": {
							color: "#C62828",
						},
					}}
				>
					This is your last chance. Once confirmed, your account will be
					permanently closed.
				</Alert>

				{/* Password Field */}
				<div>
					<label className="block text-sm font-medium text-gray-900 mb-2">
						Password
					</label>
					<TextField
						fullWidth
						type={showPassword ? "text" : "password"}
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						size="small"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => setShowPassword(!showPassword)}
										edge="end"
										size="small"
									>
										{showPassword ? (
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

				{/* Confirmation Text Field */}
				<div>
					<label className="block text-sm font-medium text-gray-900 mb-2">
						Type "CLOSE" to confirm
					</label>
					<TextField
						fullWidth
						placeholder=""
						value={confirmText}
						onChange={(e) => setConfirmText(e.target.value)}
						size="small"
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
						onClick={onBack}
						className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Cancel
					</button>
					<button
						onClick={handleConfirm}
						disabled={!isValid}
						className="px-6 py-2 text-sm text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							if (isValid) {
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

export default CloseAccountModal;
