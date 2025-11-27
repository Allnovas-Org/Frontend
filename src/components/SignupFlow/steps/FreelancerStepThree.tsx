import React, { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";

interface FreelancerStepThreeProps {
	onNext: () => void;
	onBack: () => void;
}

const FreelancerStepThree: React.FC<FreelancerStepThreeProps> = ({
	onNext,
	onBack,
}) => {
	const [code, setCode] = useState(["", "", "", ""]);
	const inputRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];

	const handleChange = (index: number, value: string) => {
		if (value.length > 1) return;

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		// Auto-focus next input
		if (value && index < 3) {
			inputRefs[index + 1].current?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs[index - 1].current?.focus();
		}
	};

	const handleVerify = () => {
		const fullCode = code.join("");
		if (fullCode.length === 4) {
			onNext();
		}
	};

	const isValid = code.every((digit) => digit !== "");

	return (
		<div className="flex flex-col h-full">
			<button
				onClick={onBack}
				className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900 transition w-fit"
			>
				<ArrowLeft size={20} />
				<span>Back</span>
			</button>

			<h1 className="text-3xl font-bold mb-2">
				Great, Let's verify your email
			</h1>
			<p className="text-gray-600 mb-8">
				We've sent a verification code to your email Please check enter the code
				below to continue.
			</p>

			{/* OTP Input */}
			<div className="flex gap-4 justify-center mb-8">
				{code.map((digit, index) => (
					<input
						key={index}
						ref={inputRefs[index]}
						type="text"
						maxLength={1}
						value={digit}
						onChange={(e) => handleChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
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
				<button className="text-[#6A0DAD] font-semibold hover:underline">
					Resend
				</button>
			</p>
		</div>
	);
};

export default FreelancerStepThree;
