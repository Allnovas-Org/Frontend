import React, { useState } from "react";
import { X } from "lucide-react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<"freelancer" | "client" | null>(null);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setUserType(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] lg:max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-110 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition-colors shadow-lg"
        >
          <X className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row h-full min-h-[500px] lg:min-h-[600px]">
          {/* Left Side - Steps */}
          <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col">
            <LeftSide
              currentStep={currentStep}
              userType={userType}
              setUserType={setUserType}
              onNext={handleNext}
              onBack={handleBack}
            />
          </div>

          {/* Right Side - Testimonials (Hidden on Mobile) */}
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default SignupModal;