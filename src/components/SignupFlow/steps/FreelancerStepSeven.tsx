import React, { useState } from "react";
import { ArrowLeft, Calendar, ChevronDown } from "lucide-react";

interface FreelancerStepSevenProps {
  onNext: () => void;
  onBack: () => void;
}

const FreelancerStepSeven: React.FC<FreelancerStepSevenProps> = ({
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    country: "",
    countryCode: "+234",
    phoneNumber: "",
  });

  const countryCodes = [
    { code: "+1", country: "US", flag: "🇺🇸" },
    { code: "+44", country: "GB", flag: "🇬🇧" },
    { code: "+234", country: "NG", flag: "🇳🇬" },
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+86", country: "CN", flag: "🇨🇳" },
    { code: "+81", country: "JP", flag: "🇯🇵" },
    { code: "+49", country: "DE", flag: "🇩🇪" },
    { code: "+33", country: "FR", flag: "🇫🇷" },
    { code: "+39", country: "IT", flag: "🇮🇹" },
    { code: "+61", country: "AU", flag: "🇦🇺" },
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Nigeria",
    "India",
    "China",
    "Japan",
    "Germany",
    "France",
    "Italy",
    "Australia",
    "Canada",
    "Brazil",
    "Mexico",
    "South Africa",
    "Kenya",
    "Ghana",
    "Egypt",
  ].sort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Additional profile data:", formData);
    onNext();
  };

  const isFormValid =
    formData.dateOfBirth !== "" &&
    formData.country !== "" &&
    formData.phoneNumber.length >= 8;

  return (
    <div className="flex flex-col h-full">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors w-fit"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Almost there</h1>
        <p className="text-gray-600 text-base">
          Let's personalize your profile.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 placeholder:text-gray-400"
                placeholder="mm / dd / yy"
                required
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <div className="relative">
              <select
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 appearance-none cursor-pointer bg-white"
                required
              >
                <option value="" disabled>
                  Select country
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Phone Number with Country Code */}
          <div className="grid grid-cols-[120px_1fr] gap-3">
            {/* Country Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code
              </label>
              <div className="relative">
                <select
                  value={formData.countryCode}
                  onChange={(e) =>
                    setFormData({ ...formData, countryCode: e.target.value })
                  }
                  className="w-full px-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 appearance-none cursor-pointer bg-white"
                  required
                >
                  {countryCodes.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} {item.flag}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 placeholder:text-gray-400"
                placeholder="81*********"
                required
              />
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

export default FreelancerStepSeven;