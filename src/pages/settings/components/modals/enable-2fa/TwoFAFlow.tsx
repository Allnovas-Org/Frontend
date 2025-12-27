import React, { useState } from "react";
import TwoFAInformation from "./TwoFAInformation";
import TwoFAMethodSelection from "./TwoFAMethodSelection";
import TwoFAQRCode from "./TwoFAQRCode";
import TwoFAVerifyCode from "./TwoFAVerifyCode";
import TwoFABackupCodes from "./TwoFABackupCodes";
import TwoFAEnabled from "./TwoFAEnabled";

interface TwoFAFlowProps {
	open: boolean;
	onClose: () => void;
	on2FAEnabled: () => void;
}

type FlowStep =
	| "information"
	| "method-selection"
	| "qr-code"
	| "verify-code"
	| "backup-codes"
	| "enabled";

const TwoFAFlow: React.FC<TwoFAFlowProps> = ({
	open,
	onClose,
	on2FAEnabled,
}) => {
	const [currentStep, setCurrentStep] = useState<FlowStep>("information");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectedMethod, setSelectedMethod] = useState<
		"authenticator" | "backup-codes"
	>("authenticator");

	const handleClose = () => {
		// Reset to first step when closing
		setCurrentStep("information");
		setSelectedMethod("authenticator");
		onClose();
	};

	// Step 1: Information
	const handleInformationContinue = () => {
		setCurrentStep("method-selection");
	};

	// Step 2: Method Selection
	const handleSelectAuthenticator = () => {
		setSelectedMethod("authenticator");
		setCurrentStep("qr-code");
	};

	const handleSelectBackupCodes = () => {
		setSelectedMethod("backup-codes");
		setCurrentStep("backup-codes");
	};

	// Step 3a: QR Code (Authenticator path)
	const handleQRCodeContinue = () => {
		setCurrentStep("verify-code");
	};

	const handleQRCodeBack = () => {
		setCurrentStep("method-selection");
	};

	// Step 4a: Verify Code (Authenticator path)
	const handleVerifyCode = (code: string) => {
		console.log("Verifying code:", code);
		// Simulate verification
		// In real app, verify with backend
		setCurrentStep("backup-codes");
	};

	const handleVerifyCodeBack = () => {
		setCurrentStep("qr-code");
	};

	// Step 5: Backup Codes (Both paths converge here)
	const handleBackupCodesComplete = () => {
		setCurrentStep("enabled");
	};

	// Step 6: Enabled (Success)
	const handleEnabledClose = () => {
		on2FAEnabled();
		handleClose();
	};

	return (
		<>
			<TwoFAInformation
				open={open && currentStep === "information"}
				onClose={handleClose}
				onContinue={handleInformationContinue}
			/>

			<TwoFAMethodSelection
				open={open && currentStep === "method-selection"}
				onClose={handleClose}
				onSelectAuthenticator={handleSelectAuthenticator}
				onSelectBackupCodes={handleSelectBackupCodes}
			/>

			<TwoFAQRCode
				open={open && currentStep === "qr-code"}
				onClose={handleClose}
				onContinue={handleQRCodeContinue}
				onBack={handleQRCodeBack}
			/>

			<TwoFAVerifyCode
				open={open && currentStep === "verify-code"}
				onClose={handleClose}
				onVerify={handleVerifyCode}
				onBack={handleVerifyCodeBack}
			/>

			<TwoFABackupCodes
				open={open && currentStep === "backup-codes"}
				onClose={handleClose}
				onComplete={handleBackupCodesComplete}
			/>

			<TwoFAEnabled
				open={open && currentStep === "enabled"}
				onClose={handleEnabledClose}
			/>
		</>
	);
};

export default TwoFAFlow;
