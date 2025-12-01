import React from "react";
import StepOne from "./steps/StepOne";
import FreelancerStepTwo from "./steps/FreelancerStepTwo";
import FreelancerStepThree from "./steps/FreelancerStepThree";
import FreelancerStepFour from "./steps/FreelancerStepFour";
import FreelancerStepFive from "./steps/FreelancerStepFive";
import FreelancerStepSix from "./steps/FreelancerStepSix";
import FreelancerStepSeven from "./steps/FreelancerStepSeven";

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

			{currentStep === 2 && (
				<FreelancerStepTwo onNext={onNext} onBack={onBack} />
			)}

			{currentStep === 3 && (
				<FreelancerStepThree onNext={onNext} onBack={onBack} />
			)}

			{currentStep === 4 && (
				<FreelancerStepFour onNext={onNext} onBack={onBack} />
			)}

			{currentStep === 5 && (
				<FreelancerStepFive onNext={onNext} onBack={onBack} />
			)}

			{currentStep === 6 && (
				<FreelancerStepSix onNext={onNext} onBack={onBack} />
			)}

			{/* {currentStep === 7 && userType === "freelancer" && (
				<FreelancerStepSeven onNext={onNext} onBack={onBack} />
			)} */}
		</div>
	);
};

export default LeftSide;
