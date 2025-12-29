import React, { useState } from "react";
import {
	Dialog,
	IconButton,
	Radio,
	RadioGroup,
	FormControlLabel,
} from "@mui/material";
import { Close, PhoneAndroid, Lock } from "@mui/icons-material";

interface TwoFAMethodSelectionProps {
	open: boolean;
	onClose: () => void;
	onSelectAuthenticator: () => void;
	onSelectBackupCodes: () => void;
}

type TwoFAMethod = "authenticator" | "backup-codes";

const TwoFAMethodSelection: React.FC<TwoFAMethodSelectionProps> = ({
	open,
	onClose,
	onSelectAuthenticator,
	onSelectBackupCodes,
}) => {
	const [selectedMethod, setSelectedMethod] =
		useState<TwoFAMethod>("authenticator");

	const handleContinue = () => {
		if (selectedMethod === "authenticator") {
			onSelectAuthenticator();
		} else {
			onSelectBackupCodes();
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
						Choose Your 2FA Method
					</h2>
					<p className="text-sm text-gray-500">
						Select how you'd like to secure your account
					</p>
				</div>
				<IconButton onClick={onClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			<div className="px-6 pb-6 space-y-4">
				{/* Method Selection */}
				<RadioGroup
					value={selectedMethod}
					onChange={(e) => setSelectedMethod(e.target.value as TwoFAMethod)}
					className="space-y-2"
				>
					{/* Authenticator App */}
					<div
						className={`border-2 rounded-lg p-4 cursor-pointer transition ${
							selectedMethod === "authenticator"
								? "border-[#F05658] bg-red-50"
								: "border-gray-200 hover:border-gray-300"
						}`}
						onClick={() => setSelectedMethod("authenticator")}
					>
						<FormControlLabel
							value="authenticator"
							control={
								<Radio
									sx={{
										color: "#D1D5DB",
										"&.Mui-checked": {
											color: "#F05658",
										},
									}}
								/>
							}
							label={
								<div className="flex items-start gap-3 ml-2">
									<PhoneAndroid className="text-gray-600 mt-1" />
									<div>
										<h3 className="text-sm font-semibold text-gray-900 mb-1">
											Authenticator App
										</h3>
										<p className="text-sm text-gray-600">
											Use an app like Google Authenticator or Authy to generate
											verification codes. This is the most secure option.
										</p>
									</div>
								</div>
							}
							sx={{
								margin: 0,
								alignItems: "flex-start",
								width: "100%",
							}}
						/>
					</div>

					{/* Backup Codes */}
					<div
						className={`border-2 rounded-lg p-4 cursor-pointer transition ${
							selectedMethod === "backup-codes"
								? "border-[#F05658] bg-red-50"
								: "border-gray-200 hover:border-gray-300"
						}`}
						onClick={() => setSelectedMethod("backup-codes")}
					>
						<FormControlLabel
							value="backup-codes"
							control={
								<Radio
									sx={{
										color: "#D1D5DB",
										"&.Mui-checked": {
											color: "#F05658",
										},
									}}
								/>
							}
							label={
								<div className="flex items-start gap-3 ml-2">
									<Lock className="text-gray-600 mt-1" />
									<div>
										<h3 className="text-sm font-semibold text-gray-900 mb-1">
											Backup Codes
										</h3>
										<p className="text-sm text-gray-600">
											Generate one-time use backup codes. Keep them safe and use
											them if you lose access to your authenticator app.
										</p>
									</div>
								</div>
							}
							sx={{
								margin: 0,
								alignItems: "flex-start",
								width: "100%",
							}}
						/>
					</div>
				</RadioGroup>

				{/* Action Buttons */}
				<div className="flex justify-end gap-3 pt-2">
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Cancel
					</button>
					<button
						onClick={handleContinue}
						className="px-6 py-2 text-sm text-white rounded-lg transition"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#d94446";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Continue
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default TwoFAMethodSelection;
