import React, { useState } from "react";
import { Dialog, IconButton, TextField, Alert } from "@mui/material";
import { Close, Info } from "@mui/icons-material";

interface TwoFAVerifyCodeProps {
	open: boolean;
	onClose: () => void;
	onVerify: (code: string) => void;
	onBack: () => void;
}

const TwoFAVerifyCode: React.FC<TwoFAVerifyCodeProps> = ({
	open,
	onClose,
	onVerify,
	onBack,
}) => {
	const [code, setCode] = useState("");
	const [error, setError] = useState("");

	const handleVerify = () => {
		setError("");

		if (code.length !== 6) {
			setError("Please enter a 6-digit code");
			return;
		}

		if (!/^\d+$/.test(code)) {
			setError("Code must contain only numbers");
			return;
		}

		// Simulate verification
		onVerify(code);
	};

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "").slice(0, 6);
		setCode(value);
		setError("");
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
						Verify Your Setup
					</h2>
					<p className="text-sm text-gray-500">
						Enter the 6-digit code from your authenticator app
					</p>
				</div>
				<IconButton onClick={onClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			<div className="px-6 pb-6 space-y-4">
				{/* Verification Code Input */}
				<div>
					<label className="block text-sm font-medium text-gray-900 mb-2">
						Verification Code
					</label>
					<TextField
						fullWidth
						placeholder="000000"
						value={code}
						onChange={handleCodeChange}
						inputProps={{
							maxLength: 6,
							style: {
								fontSize: "24px",
								letterSpacing: "8px",
								textAlign: "center",
								fontFamily: "monospace",
							},
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "8px",
							},
						}}
					/>
				</div>

				{/* Error Message */}
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
					Make sure the code is from your authenticator app, not a text message.
				</Alert>

				{/* Action Buttons */}
				<div className="flex justify-end gap-3 pt-2">
					<button
						onClick={onBack}
						className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Back
					</button>
					<button
						onClick={handleVerify}
						disabled={code.length !== 6}
						className="px-6 py-2 text-sm text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							if (code.length === 6) {
								e.currentTarget.style.backgroundColor = "#d94446";
							}
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Verify & Continue
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default TwoFAVerifyCode;
