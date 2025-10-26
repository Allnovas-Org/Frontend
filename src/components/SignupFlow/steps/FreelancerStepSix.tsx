import React, { useState, useRef } from "react";
import { ArrowLeft, Camera, ChevronDown } from "lucide-react";

interface FreelancerStepSixProps {
  onNext: () => void;
  onBack: () => void;
}

const FreelancerStepSix: React.FC<FreelancerStepSixProps> = ({
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile data:", formData, profileImage);
    onNext();
  };

  const isFormValid = 
    formData.firstName.trim() !== "" && 
    formData.lastName.trim() !== "" && 
    formData.gender !== "";

  return (
    <div className="flex flex-col h-full">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors w-fit"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Who's Joining Us Today?
        </h1>
        <p className="text-gray-600 text-base">
          Let's personalize your profile.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-2">
            <div
              onClick={handleImageClick}
              className="relative w-12 h-12 border-8 border-purple-500 rounded-full bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors mb-3 overflow-hidden"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-6 h-6 text-purple-600" />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-gray-700 text-sm">
              Take a picture or{" "}
              <button
                type="button"
                onClick={handleImageClick}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                select a photo
              </button>
            </p>
            <p className="text-gray-500 text-xs mt-1">Max 5MB</p>
          </div>

          {/* Name Fields - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 placeholder:text-gray-400"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 placeholder:text-gray-400"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* Gender Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 appearance-none cursor-pointer bg-white"
                required
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all shadow-lg ${
              isFormValid
                ? "bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default FreelancerStepSix;