import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

interface FreelancerStepFourProps {
	onNext: () => void;
	onBack: () => void;
}

const FreelancerStepFour: React.FC<FreelancerStepFourProps> = ({
	onNext,
	onBack,
}) => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleContinue = () => {
		if (password && confirmPassword && password === confirmPassword) {
			onNext();
		}
	};

	const isValid = password && confirmPassword && password === confirmPassword;

	return (
		<div className="flex flex-col h-full">
			<button
				onClick={onBack}
				className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900 transition w-fit"
			>
				<ArrowLeft size={20} />
				<span>Back</span>
			</button>

			<h1 className="text-3xl font-bold mb-8">Create a Secure Password</h1>

			<div className="space-y-6 mb-8">
				{/* Password Field */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your Password"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent pr-12"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
						>
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					</div>
				</div>

				{/* Confirm Password Field */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Confirm Password
					</label>
					<div className="relative">
						<input
							type={showConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Re-enter your Password"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent pr-12"
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
						>
							{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					</div>
				</div>
			</div>

			<button
				onClick={handleContinue}
				disabled={!isValid}
				className={`w-full py-4 rounded-full font-semibold transition-all ${
					isValid
						? "bg-[#6A0DAD] text-white hover:bg-[#5a0b92] cursor-pointer"
						: "bg-gray-200 text-gray-400 cursor-not-allowed"
				}`}
			>
				Continue
			</button>
		</div>
	);
};

export default FreelancerStepFour;
