import React from "react";
import StepOne from "./steps/StepOne";
import FreelancerStepTwo from "./steps/FreelancerStepTwo";
import FreelancerStepThree from "./steps/FreelancerStepThree";

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

      {currentStep === 2 && userType === "freelancer" && (
        <FreelancerStepTwo onNext={onNext} onBack={onBack} />
      )}

      {currentStep === 3 && userType === "freelancer" && (
        <FreelancerStepThree onNext={onNext} onBack={onBack} />
      )}

      {/* Add more steps as needed */}
    </div>
  );
};

export default LeftSide;