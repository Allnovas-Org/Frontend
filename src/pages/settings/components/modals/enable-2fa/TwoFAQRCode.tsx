import React, { useState } from "react";
import { Dialog, IconButton, Alert } from "@mui/material";
import { Close, Info, ContentCopy } from "@mui/icons-material";

interface TwoFAQRCodeProps {
	open: boolean;
	onClose: () => void;
	onContinue: () => void;
	onBack: () => void;
	qrCodeUrl?: string;
	manualCode?: string;
}

const TwoFAQRCode: React.FC<TwoFAQRCodeProps> = ({
	open,
	onClose,
	onContinue,
	onBack,
	qrCodeUrl = "",
	manualCode = "JBSWY3DPEBLW64TMMQ======",
}) => {
	const [copied, setCopied] = useState(false);

	const handleCopyCode = () => {
		navigator.clipboard.writeText(manualCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
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
						Scan QR Code
					</h2>
					<p className="text-sm text-gray-500">
						Open your authenticator app and scan this QR code
					</p>
				</div>
				<IconButton onClick={onClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			<div className="px-6 pb-6 space-y-4">
				{/* QR Code Display */}
				<div className="flex justify-center p-6 bg-gray-50 rounded-lg">
					{qrCodeUrl ? (
						<img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
					) : (
						<div className="w-64 h-64 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
							<div className="text-center">
								<div
									className="w-48 h-48 bg-black mx-auto mb-2"
									style={{
										backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23fff'/%3E%3Crect x='30' y='10' width='10' height='10' fill='%23fff'/%3E%3C/svg%3E")`,
										backgroundSize: "cover",
									}}
								/>
								<span className="text-xs text-gray-400">
									QR Code Placeholder
								</span>
							</div>
						</div>
					)}
				</div>

				{/* Manual Code */}
				<div>
					<p className="text-sm text-gray-700 mb-2 text-center">
						Can't scan? Enter this code manually in your authenticator app:
					</p>
					<div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
						<span className="flex-1 text-sm font-mono text-gray-900 text-center">
							{manualCode}
						</span>
						<IconButton
							size="small"
							onClick={handleCopyCode}
							sx={{ color: "#F05658" }}
						>
							<ContentCopy fontSize="small" />
						</IconButton>
					</div>
					{copied && (
						<p className="text-xs text-green-600 text-center mt-1">
							Code copied to clipboard!
						</p>
					)}
				</div>

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
					Keep this code safe. You'll need it if you lose access to your
					authenticator app.
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
						I've scanned the code
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default TwoFAQRCode;
