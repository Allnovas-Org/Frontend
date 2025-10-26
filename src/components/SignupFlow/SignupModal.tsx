import React, { useState } from "react";
import { X } from "lucide-react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import SuccessPopup from "./SuccessPopup";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<"freelancer" | "client" | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [userName, setUserName] = useState("");

  if (!isOpen) return null;

  const handleNext = () => {
    // Check if this is the last step for freelancers
    if (currentStep === 7 && userType === "freelancer") {
      // Show success popup instead of moving to next step
      setShowSuccessPopup(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setUserType(null);
    setShowSuccessPopup(false);
    onClose();
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleClose();
    // Navigate to profile or dashboard
  };

  return (
    <>
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
                userType={userType}
                setUserType={setUserType}
                onNext={handleNext}
                onBack={handleBack}
                // setUserName={setUserName}
              />
            </div>

            {/* Right Side - Testimonials */}
            <RightSide />
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={handleSuccessClose}
        userName={userName}
      />
    </>
  );
};

export default SignupModal;