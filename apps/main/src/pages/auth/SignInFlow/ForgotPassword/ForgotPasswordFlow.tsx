import React, { useState } from "react";
import ForgotPasswordStepOne from "./steps/ForgotPasswordStepOne";
import ForgotPasswordStepTwo from "./steps/ForgotPasswordStepTwo";
import ForgotPasswordStepThree from "./steps/ForgotPasswordStepThree";

interface ForgotPasswordFlowProps {
  onBack: () => void;
  onComplete: () => void;
}

const ForgotPasswordFlow: React.FC<ForgotPasswordFlowProps> = ({
  onBack,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  const handleNext = () => {
    if (currentStep === 3) {
      // Last step - password reset complete
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <>
      {currentStep === 1 && (
        <ForgotPasswordStepOne
          onNext={handleNext}
          onBack={handleBack}
          setEmail={setEmail}
        />
      )}

      {currentStep === 2 && (
        <ForgotPasswordStepTwo
          onNext={handleNext}
          onBack={handleBack}
          email={email}
          setResetUrl={setResetUrl}
        />
      )}

      {currentStep === 3 && (
        <ForgotPasswordStepThree
          onNext={handleNext}
          onBack={handleBack}
          resetUrl={resetUrl}
        />
      )}
    </>
  );
};

export default ForgotPasswordFlow;