import React from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import StepSix from "./steps/StepSix";

interface LeftSideProps {
	currentStep: number;
	userType: "Freelancer" | "Client" | null;
	setUserType: (type: "Freelancer" | "Client" | null) => void;
	onNext: (method?: "email" | "google" | "linkedin") => void;
	onBack: () => void;
	resendAfterSeconds: number;
	onCodeSent: (seconds: number) => void;
}

const LeftSide: React.FC<LeftSideProps> = ({
	currentStep,
	userType,
	setUserType,
	onNext,
	onBack,
	resendAfterSeconds,
	onCodeSent,
}) => {
	return (
		<div className="w-full h-full flex flex-col">
			{currentStep === 1 && (
				<StepOne
					userType={userType}
					setUserType={setUserType}
					onNext={onNext}
				/>
			)}

			{currentStep === 2 && <StepTwo onNext={onNext} onBack={onBack} />}

			{currentStep === 3 && (
				<StepThree
					onNext={() => onNext()}
					onBack={onBack}
					onCodeSent={onCodeSent}
				/>
			)}

			{currentStep === 4 && (
				<StepFour
					onNext={() => onNext()}
					onBack={onBack}
					initialCooldownSeconds={resendAfterSeconds}
					onCooldownChange={onCodeSent}
				/>
			)}

			{currentStep === 5 && <StepFive onNext={onNext} onBack={onBack} />}

			{currentStep === 6 && <StepSix onNext={onNext} onBack={onBack} />}
		</div>
	);
};

export default LeftSide;