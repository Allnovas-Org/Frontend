import React from "react";
import SignInStepOne from "./steps/SignInStepOne";
import SignInStepTwo from "./steps/SignInStepTwo";
import ForgotPasswordFlow from "./ForgotPassword/ForgotPasswordFlow";

interface LeftSideProps {
  currentStep: number;
  showForgotPassword: boolean;
  onNext: () => void;
  onBack: () => void;
  onJoin?: () => void;
  onForgotPassword?: () => void;
  onForgotPasswordBack?: () => void;
  onForgotPasswordComplete?: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({
  currentStep,
  showForgotPassword,
  onNext,
  onBack,
  onJoin,
  onForgotPassword,
  onForgotPasswordBack,
  onForgotPasswordComplete,
}) => {
  if (showForgotPassword) {
    return (
      <ForgotPasswordFlow
        onNext={onNext}
        onBack={onForgotPasswordBack || onBack}
        onComplete={onForgotPasswordComplete || onNext}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {currentStep === 1 && <SignInStepOne onNext={onNext} onBack={onBack} />}

      {currentStep === 2 && (
        <SignInStepTwo
          onNext={onNext}
          onBack={onBack}
          onJoin={onJoin}
          onForgotPassword={onForgotPassword}
        />
      )}
    </div>
  );
};

export default LeftSide;