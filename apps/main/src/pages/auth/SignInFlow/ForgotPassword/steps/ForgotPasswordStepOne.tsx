import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { requestPasswordReset } from "../../../../../services/auth.service";
import { getApiErrorMessage } from "../../../../../utils/apiError";

interface ForgotPasswordStepOneProps {
  onNext: () => void;
  onBack: () => void;
  setEmail?: (email: string) => void;
}

const ForgotPasswordStepOne: React.FC<ForgotPasswordStepOneProps> = ({
  onNext,
  onBack,
  setEmail,
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await requestPasswordReset(emailInput.trim());
      setEmail?.(emailInput.trim());
      onNext();
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to send the verification code."));
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = emailInput !== "" && emailInput.includes("@");

  return (
    <div className="flex flex-col justify-center h-full">
      {/* Back Button */}
      <button
        onClick={onBack}
        disabled={loading}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors w-fit"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-base">
          Please enter your registered email ID
        </p>
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-700 placeholder:text-gray-400"
              placeholder="Enter your Email"
              required
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all shadow-lg ${
              isFormValid
                ? "bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Sending…" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordStepOne;