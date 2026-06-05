/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useCallback } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSignupStore } from "../../../../store/useSignupStore";
import {
	verifySignupToken,
	signupWithEmail,
} from "../../../../services/auth.service";

interface StepFourProps {
	onNext: () => void;
	onBack: () => void;
	onResend?: () => void;
}

const StepFour: React.FC<StepFourProps> = ({ onNext, onBack }) => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const [resendLoading, setResendLoading] = useState(false);
	const [resendMessage, setResendMessage] = useState("");

	const {
		email,
		userType,
		isLoading,
		setLoading,
		error,
		setError,
		clearError,
	} = useSignupStore();

	const handleChange = useCallback(
		(index: number, value: string) => {
			if (value.length > 1) return;
			if (value && !/^\d$/.test(value)) return;

			const newCode = [...code];
			newCode[index] = value;
			setCode(newCode);

			// Auto-focus next input (for 6-digit code)
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		},
		[code],
	);

	const handleKeyDown = useCallback(
		(index: number, e: React.KeyboardEvent) => {
			if (e.key === "Backspace" && !code[index] && index > 0) {
				inputRefs.current[index - 1]?.focus();
			}
		},
		[code],
	);

	const handlePaste = useCallback((e: React.ClipboardEvent) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").slice(0, 6);

		if (!/^\d+$/.test(pastedData)) return;

		const newCode = pastedData
			.split("")
			.concat(["", "", "", "", "", ""])
			.slice(0, 6);
		setCode(newCode);

		const nextEmptyIndex = newCode.findIndex((digit) => !digit);
		const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
		inputRefs.current[focusIndex]?.focus();
	}, []);

	const handleVerify = async () => {
		if (!isValid) return;

		const verificationCode = code.join("");
		clearError();
		setLoading(true);

		try {
			const response = await verifySignupToken({
				email,
				token: verificationCode,
			});

			// Store the auth token for subsequent authenticated requests
			localStorage.setItem("auth-token", response.token);

			console.log("Token verified, expires at:", response.expire_at);
			onNext();
		} catch (err: any) {
			setError(err.message || "Invalid verification code. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleResend = async () => {
		setResendLoading(true);
		setResendMessage("");
		clearError();
		setCode(["", "", "", "", "", ""]);
		inputRefs.current[0]?.focus();

		try {
			await signupWithEmail({ email, user_type: userType });
			setResendMessage("A new code has been sent to your email.");
		} catch (err: any) {
			setError(err.message || "Failed to resend code. Please try again.");
		} finally {
			setResendLoading(false);
		}
	};

	const isValid = code.every((digit) => digit !== "");

	return (
		<div className="flex flex-col h-full">
			<button
				onClick={onBack}
				className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900 transition w-fit"
				aria-label="Go back"
			>
				<ArrowLeft size={20} />
				<span>Back</span>
			</button>

			<h1 className="text-3xl font-bold mb-2">
				Great, Let's verify your email
			</h1>
			<p className="text-gray-600 mb-8">
				We've sent a verification code to{" "}
				<span className="font-medium text-gray-800">{email}</span>. Please enter
				the code below to continue.
			</p>

			{error && (
				<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
					{error}
				</div>
			)}

			{resendMessage && (
				<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
					{resendMessage}
				</div>
			)}

			{/* OTP Input - Now 6 digits */}
			<div className="flex gap-4 justify-center mb-8">
				{code.map((digit, index) => (
					<input
						key={index}
						ref={(el) => {
							inputRefs.current[index] = el;
						}}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={digit}
						onChange={(e) => handleChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						onPaste={handlePaste}
						className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent transition"
						aria-label={`Digit ${index + 1}`}
						disabled={isLoading}
					/>
				))}
			</div>

			<button
				onClick={handleVerify}
				disabled={!isValid || isLoading}
				className={`w-full py-4 rounded-full font-semibold transition-all mb-4 flex items-center justify-center gap-2 ${
					isValid && !isLoading
						? "bg-[#6A0DAD] text-white hover:bg-[#5a0b92] cursor-pointer"
						: "bg-gray-200 text-gray-400 cursor-not-allowed"
				}`}
			>
				{isLoading && <Loader2 size={18} className="animate-spin" />}
				{isLoading ? "Verifying..." : "Verify"}
			</button>

			<p className="text-center text-sm text-gray-600">
				Did not receive code?{" "}
				<button
					onClick={handleResend}
					disabled={resendLoading}
					className="text-[#6A0DAD] font-semibold hover:underline disabled:opacity-50"
				>
					{resendLoading ? "Sending..." : "Resend"}
				</button>
			</p>
		</div>
	);
};

export default StepFour;
