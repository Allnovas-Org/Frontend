import React, { useState, useRef, useCallback } from "react";
import { ArrowLeft } from "lucide-react";

interface StepFourProps {
	onNext: () => void;
	onBack: () => void;
	onResend?: () => void;
}

const StepFour: React.FC<StepFourProps> = ({ onNext, onBack, onResend }) => {
	const [code, setCode] = useState(["", "", "", ""]);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const handleChange = useCallback((index: number, value: string) => {
		// Only allow single digit
		if (value.length > 1) return;
		
		// Only allow numbers
		if (value && !/^\d$/.test(value)) return;

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		// Auto-focus next input
		if (value && index < 3) {
			inputRefs.current[index + 1]?.focus();
		}
	}, [code]);

	const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	}, [code]);

	const handlePaste = useCallback((e: React.ClipboardEvent) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").slice(0, 4);
		
		if (!/^\d+$/.test(pastedData)) return;

		const newCode = pastedData.split("").concat(["", "", "", ""]).slice(0, 4);
		setCode(newCode);

		// Focus the next empty input or last input
		const nextEmptyIndex = newCode.findIndex(digit => !digit);
		const focusIndex = nextEmptyIndex === -1 ? 3 : nextEmptyIndex;
		inputRefs.current[focusIndex]?.focus();
	}, []);

	const handleVerify = () => {
		if (isValid) {
			onNext();
		}
	};

	const handleResend = () => {
		setCode(["", "", "", ""]);
		inputRefs.current[0]?.focus();
		onResend?.();
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
				We’ve sent a verification code to your email. Please enter the code below to continue.
			</p>

			{/* OTP Input */}
			<div className="flex gap-4 justify-center mb-8">
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
						className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent transition"
						aria-label={`Digit ${index + 1}`}
					/>
				))}
			</div>

			<button
				onClick={handleVerify}
				disabled={!isValid}
				className={`w-full py-4 rounded-full font-semibold transition-all mb-4 ${
					isValid
						? "bg-[#6A0DAD] text-white hover:bg-[#5a0b92] cursor-pointer"
						: "bg-gray-200 text-gray-400 cursor-not-allowed"
				}`}
			>
				Verify
			</button>

			<p className="text-center text-sm text-gray-600">
				Did not receive code?{" "}
				<button 
					onClick={handleResend}
					className="text-[#6A0DAD] font-semibold hover:underline"
				>
					Resend
				</button>
			</p>
		</div>
	);
};

export default StepFour;