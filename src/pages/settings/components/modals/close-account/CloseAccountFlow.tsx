import React, { useState } from "react";
import CloseAccountModalInformation from "./CloseAccountModalInformation";
import CloseAccountModalReason from "./CloseAccountModalReason";
import CloseAccountModalConfirmation from "./CloseAccountModalConfirmation";
import CloseAccountModal from "./CloseAccountModal";

interface CloseAccountFlowProps {
	open: boolean;
	onClose: () => void;
	onAccountClosed: () => void;
}

type FlowStep = "information" | "reason" | "confirmation" | "final";

const CloseAccountFlow: React.FC<CloseAccountFlowProps> = ({
	open,
	onClose,
	onAccountClosed,
}) => {
	const [currentStep, setCurrentStep] = useState<FlowStep>("information");
	const [reason, setReason] = useState<string>("");
	const [additionalFeedback, setAdditionalFeedback] = useState<string>("");

	const handleClose = () => {
		// Reset to first step when closing
		setCurrentStep("information");
		setReason("");
		setAdditionalFeedback("");
		onClose();
	};

	const handleInformationContinue = () => {
		setCurrentStep("reason");
	};

	const handleReasonContinue = (selectedReason: string, feedback?: string) => {
		setReason(selectedReason);
		setAdditionalFeedback(feedback || "");
		setCurrentStep("confirmation");
	};

	const handleConfirmationBack = () => {
		setCurrentStep("reason");
	};

	const handleConfirmationContinue = () => {
		setCurrentStep("final");
	};

	const handleFinalBack = () => {
		setCurrentStep("confirmation");
	};

	const handleFinalConfirm = (password: string, confirmText: string) => {
		// Here you would make the API call to close the account
		console.log("Closing account with:", {
			reason,
			additionalFeedback,
			password,
			confirmText,
		});

		// Call the success callback
		onAccountClosed();

		// Reset and close
		handleClose();
	};

	return (
		<>
			<CloseAccountModalInformation
				open={open && currentStep === "information"}
				onClose={handleClose}
				onContinue={handleInformationContinue}
			/>

			<CloseAccountModalReason
				open={open && currentStep === "reason"}
				onClose={handleClose}
				onContinue={handleReasonContinue}
			/>

			<CloseAccountModalConfirmation
				open={open && currentStep === "confirmation"}
				onClose={handleClose}
				onContinue={handleConfirmationContinue}
				onBack={handleConfirmationBack}
			/>

			<CloseAccountModal
				open={open && currentStep === "final"}
				onClose={handleClose}
				onConfirm={handleFinalConfirm}
				onBack={handleFinalBack}
			/>
		</>
	);
};

export default CloseAccountFlow;
