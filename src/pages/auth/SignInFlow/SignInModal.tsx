import React, { useState } from "react";
import { X } from "lucide-react";
import LeftSide from "./LeftSide";
import RightSide from "../SignupFlow/RightSide";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp?: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignUp,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      handleClose();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setShowForgotPassword(false);
    onClose();
  };

  const handleJoin = () => {
    handleClose();
    if (onSwitchToSignUp) {
      onSwitchToSignUp();
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordBack = () => {
    setShowForgotPassword(false);
  };

  const handleForgotPasswordComplete = () => {
    // Password reset complete - go back to sign in
    setShowForgotPassword(false);
    setCurrentStep(2);
    // Optionally show a success message
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-110 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex flex-col lg:flex-row h-full lg:h-[650px]">
          {/* Left Side - Steps */}
          <div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col overflow-y-auto">
            <LeftSide
              currentStep={currentStep}
              showForgotPassword={showForgotPassword}
              onNext={handleNext}
              onBack={handleBack}
              onJoin={handleJoin}
              onForgotPassword={handleForgotPassword}
              onForgotPasswordBack={handleForgotPasswordBack}
              onForgotPasswordComplete={handleForgotPasswordComplete}
            />
          </div>

          {/* Right Side - Testimonials */}
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default SignInModal;