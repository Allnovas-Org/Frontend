import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

interface LoginStepTwoProps {
	onNext: () => void;
	onBack: () => void;
	onJoin?: () => void;
	onForgotPassword?: () => void;
}

const SignInStepTwo: React.FC<LoginStepTwoProps> = ({
	onNext,
	onBack,
	onJoin,
	onForgotPassword,
}) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isFormValid) {
			onNext();
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleForgotPassword = () => {
		if (onForgotPassword) {
			onForgotPassword();
		}
	};

	const handleJoin = () => {
		if (onJoin) {
			onJoin();
		}
	};

	const isFormValid = formData.email !== "" && formData.password !== "";

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
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Welcome! How would you like to join?
				</h1>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="flex-1 flex flex-col">
				<div className="flex-1 space-y-6">
					{/* Email Field */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email
						</label>
						<input
							type="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent text-gray-700 placeholder:text-gray-400"
							placeholder="Enter your Email"
							required
						/>
					</div>

					{/* Password Field */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent text-gray-700 placeholder:text-gray-400 pr-12"
								placeholder="Enter your Password"
								required
							/>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5" />
								) : (
									<Eye className="w-5 h-5" />
								)}
							</button>
						</div>

						{/* Forgot Password Link */}
						<button
							type="button"
							onClick={handleForgotPassword}
							className="text-[#6A0DAD] cursor-pointer text-sm font-medium hover:text-[#5a0b92] transition-colors mt-2"
						>
							Forgot Password?
						</button>
					</div>
				</div>

				{/* Sign In Button */}
				<div className="mt-8 space-y-4">
					<button
						type="submit"
						disabled={!isFormValid}
						className={`w-full py-4 rounded-full font-semibold text-white transition-all ${
							isFormValid
								? "bg-[#6A0DAD] hover:bg-[#5a0b92]"
								: "bg-gray-300 cursor-not-allowed"
						}`}
					>
						Sign in
					</button>

					{/* Join Link */}
					<p className="text-center text-sm text-gray-600">
						Don't have an account?{" "}
						<button
							type="button"
							onClick={handleJoin}
							className="text-[#6A0DAD] cursor-pointer font-semibold hover:text-[#5a0b92] transition-colors"
						>
							Join
						</button>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignInStepTwo;