import React, { useState, useRef, KeyboardEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { requestPasswordReset, verifyPasswordResetCode } from "../../../../../services/auth.service";
import { getApiErrorMessage } from "../../../../../utils/apiError";

interface ForgotPasswordStepTwoProps {
  onNext: () => void;
  onBack: () => void;
  email: string;
  setResetToken: (token: string) => void;
}

const ForgotPasswordStepTwo: React.FC<ForgotPasswordStepTwoProps> = ({
  onNext,
  onBack,
  email,
  setResetToken,
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = pastedData.split("").slice(0, 6);
    
    const updatedCode = [...code];
    newCode.forEach((char, index) => {
      if (/^\d$/.test(char)) {
        updatedCode[index] = char;
      }
    });
    
    setCode(updatedCode);
    
    const nextEmptyIndex = updatedCode.findIndex(val => !val);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    setLoading(true);
    setError("");
    try {
      const token = await verifyPasswordResetCode(verificationCode);
      setResetToken(token);
      onNext();
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to verify the code."));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError("");
    try {
      await requestPasswordReset(email);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to resend the code."));
    } finally {
      setLoading(false);
    }
  };

  const isCodeComplete = code.every(digit => digit !== "");

  return (
    <div className="flex flex-col h-full">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-600 text-base leading-relaxed">
          If the email is registered, we've sent a verification code to {email}.
          <br />
          Please enter the code below to continue.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleVerify} className="flex-1 flex flex-col mx-auto">
        <div>
          {/* OTP Input Boxes */}
          <div className="flex gap-2 sm:gap-4 justify-start mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-10 h-16 sm:w-16 text-center text-2xl font-semibold rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                autoFocus={index === 0}
              />
            ))}
          </div>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        </div>

        {/* Verify Button */}
        <div className="mt-8 space-y-4">
          <button
            type="submit"
            disabled={!isCodeComplete || loading}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all shadow-lg ${
              isCodeComplete
                ? "bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Verifying…" : "Verify"}
          </button>

          {/* Resend Link */}
          <p className="text-center text-sm text-gray-600">
            Did not receive code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Resend
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordStepTwo;