import React from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import StepSix from "./steps/StepSix";

interface LeftSideProps {
	currentStep: number;
	userType: "freelancer" | "client" | null;
	setUserType: (type: "freelancer" | "client" | null) => void;
	onNext: () => void;
	onBack: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({
	currentStep,
	userType,
	setUserType,
	onNext,
	onBack,
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

			{currentStep === 3 && <StepThree onNext={onNext} onBack={onBack} />}

			{currentStep === 4 && <StepFour onNext={onNext} onBack={onBack} />}

			{currentStep === 5 && <StepFive onNext={onNext} onBack={onBack} />}

			{currentStep === 6 && <StepSix onNext={onNext} onBack={onBack} />}
		</div>
	);
};

export default LeftSide;