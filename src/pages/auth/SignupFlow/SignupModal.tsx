import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import SuccessPopup from "./SuccessPopup";
import { useSignupStore } from "../../../store/useSignupStore";

interface SignupModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
	// Use persisted state from store instead of local state
	const currentStep = useSignupStore((s) => s.currentStep);
	const setCurrentStep = useSignupStore((s) => s.setCurrentStep);
	const userType = useSignupStore((s) => s.userType);
	const setUserType = useSignupStore((s) => s.setUserType);
	const userName = useSignupStore((s) => s.userName);
	const resetSignupStore = useSignupStore((s) => s.reset);

	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const navigate = useNavigate();

	if (!isOpen) return null;

	const handleNext = () => {
		if (currentStep === 6) {
			setShowSuccessPopup(true);
		} else {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		// Clear any errors when going back
		useSignupStore.getState().clearError();
		setCurrentStep(currentStep - 1);
	};

	const handleClose = () => {
		setShowSuccessPopup(false);
		resetSignupStore();
		sessionStorage.removeItem("signup_password");
		onClose();
	};

	const handleContinueToProfile = () => {
		navigate("/profile-completion", {
			state: { userType },
		});

		setShowSuccessPopup(false);
		resetSignupStore();
		onClose();
	};

	return (
		<>
			<div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
				<div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
					<button
						onClick={handleClose}
						className="absolute top-6 right-6 z-110 p-2 rounded-full hover:bg-gray-100 transition-colors"
					>
						<X className="w-6 h-6 text-gray-700" />
					</button>

					<div className="flex flex-col lg:flex-row h-full lg:h-[650px]">
						<div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col overflow-y-auto">
							<LeftSide
								currentStep={currentStep}
								userType={userType}
								setUserType={setUserType}
								onNext={handleNext}
								onBack={handleBack}
							/>
						</div>
						<RightSide />
					</div>
				</div>
			</div>

			<SuccessPopup
				isOpen={showSuccessPopup}
				onClose={handleClose}
				onContinue={handleContinueToProfile}
				userName={userName}
			/>
		</>
	);
};

export default SignupModal;
