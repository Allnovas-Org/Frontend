import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SuccessPopupProps {
	isOpen: boolean;
	onClose: () => void;
	userName?: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
	isOpen,
	onClose,
	userName = "User",
}) => {
	if (!isOpen) return null;

	const navigate = useNavigate();

	const handleContinue = () => {
		// Navigate to profile completion or dashboard
		navigate("/profile-completion");
		onClose();
	};

	return (
		<div className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
			<div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
				>
					<X className="w-5 h-5 text-gray-600" />
				</button>

				{/* Illustration */}
				<div className="mb-8 flex justify-center">
					<div className="w-64 h-64 flex items-center justify-center">
						{/* Replace this div with your actual image */}
						<img
							src="/images/welcome.png"
							alt="Welcome illustration"
							className="w-full h-full object-contain"
						/>
					</div>
				</div>

				{/* Welcome Message */}
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Welcome, John!
				</h1>
				<h2 className="text-xl font-semibold text-gray-900 mb-4">
					Let's Complete Your Profile
				</h2>

				{/* Description */}
				<p className="text-gray-600 text-base leading-relaxed mb-8 px-4">
					You're just a few steps away from getting matched with top design
					jobs.
				</p>

				{/* Continue Button */}
				<button
					onClick={handleContinue}
					className="w-full py-4 rounded-2xl font-semibold bg-linear-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white transition-all shadow-lg"
				>
					Continue to Profile
				</button>
			</div>
		</div>
	);
};

export default SuccessPopup;
