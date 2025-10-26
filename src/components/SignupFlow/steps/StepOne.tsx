import React from "react";
import { Users, Briefcase } from "lucide-react";

interface StepOneProps {
  userType: "freelancer" | "client" | null;
  setUserType: (type: "freelancer" | "client") => void;
  onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ userType, setUserType, onNext }) => {
  const handleContinue = () => {
    if (userType) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Welcome to Allnovas
        </h1>
        <p className="text-gray-600 text-base">
          Let's get you started with the right setup.
        </p>
      </div>

      {/* Selection Cards - Side by Side */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Freelancer Card */}
          <button
            onClick={() => setUserType("freelancer")}
            className={`p-8 rounded-2xl border-2 transition-all ${
              userType === "freelancer"
                ? "border-[#6A0DAD] bg-purple-50"
                : "border-transparent bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-5">
              {/* Icon */}
              <div
                className={`p-4 rounded-xl transition-colors ${
                  userType === "freelancer" ? "bg-[#6A0DAD]" : "bg-gray-400"
                }`}
              >
                <Users
                  className={`w-7 h-7 ${
                    userType === "freelancer" ? "text-white" : "text-white"
                  }`}
                />
              </div>

              {/* Text */}
              <h3 className="font-semibold text-base text-gray-900 leading-snug">
                Continue as a<br />freelancer
              </h3>
              
              {/* Radio Button */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  userType === "freelancer"
                    ? "border-[#6A0DAD]"
                    : "border-gray-400"
                }`}
              >
                {userType === "freelancer" && (
                  <div className="w-3.5 h-3.5 bg-[#6A0DAD] rounded-full" />
                )}
              </div>
            </div>
          </button>

          {/* Client Card */}
          <button
            onClick={() => setUserType("client")}
            className={`p-8 rounded-2xl border-2 transition-all ${
              userType === "client"
                ? "border-[#6A0DAD] bg-purple-50"
                : "border-transparent bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-5">
              {/* Icon */}
              <div
                className={`p-4 rounded-xl transition-colors ${
                  userType === "client" ? "bg-[#6A0DAD]" : "bg-gray-400"
                }`}
              >
                <Briefcase
                  className={`w-7 h-7 ${
                    userType === "client" ? "text-white" : "text-white"
                  }`}
                />
              </div>

              {/* Text */}
              <h3 className="font-semibold text-base text-gray-900 leading-snug">
                Continue as a<br />client
              </h3>
              
              {/* Radio Button */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  userType === "client"
                    ? "border-[#6A0DAD]"
                    : "border-gray-400"
                }`}
              >
                {userType === "client" && (
                  <div className="w-3.5 h-3.5 bg-[#6A0DAD] rounded-full" />
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleContinue}
          disabled={!userType}
          className={`w-full py-4 rounded-2xl font-medium text-base transition-all ${
            userType
              ? "bg-[#6A0DAD] hover:bg-[#6A0DAD] text-white cursor-pointer shadow-sm"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepOne;