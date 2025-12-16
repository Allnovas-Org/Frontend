import React from "react";
import { Users, Briefcase } from "lucide-react";

interface StepOneProps {
	userType: "freelancer" | "client" | null;
	setUserType: (type: "freelancer" | "client" | null) => void;
	onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ userType, setUserType, onNext }) => {
	const handleContinue = () => {
		if (userType) {
			onNext();
		}
	};

	return (
		<div className="flex flex-col h-full">
			<h1 className="text-3xl font-bold mb-2">Welcome to Allnovas</h1>
			<p className="text-gray-600 mb-8">
				Let's get you started with the right setup.
			</p>

			<div className="grid grid-cols-2 gap-4 mb-8">
				{/* Freelancer Option */}
				<button
					onClick={() => setUserType("freelancer")}
					className={`relative p-6 rounded-2xl border-2 transition-all ${
						userType === "freelancer"
							? "border-[#6A0DAD] bg-purple-50"
							: "border-gray-200 hover:border-gray-300"
					}`}
				>
					<div className="flex flex-col items-center text-center">
						<div
							className={`mb-3 ${
								userType === "freelancer" ? "text-[#6A0DAD]" : "text-gray-400"
							}`}
						>
							<Users size={32} />
						</div>
						<span className="font-medium">Continue as a freelancer</span>
					</div>
					{userType === "freelancer" && (
						<div className="absolute top-4 right-4 w-5 h-5 bg-[#6A0DAD] rounded-full flex items-center justify-center">
							<div className="w-2 h-2 bg-white rounded-full"></div>
						</div>
					)}
				</button>

				{/* Client Option */}
				<button
					onClick={() => setUserType("client")}
					className={`relative p-6 rounded-2xl border-2 transition-all ${
						userType === "client"
							? "border-[#6A0DAD] bg-purple-50"
							: "border-gray-200 hover:border-gray-300"
					}`}
				>
					<div className="flex flex-col items-center text-center">
						<div
							className={`mb-3 ${
								userType === "client" ? "text-[#6A0DAD]" : "text-gray-400"
							}`}
						>
							<Briefcase size={32} />
						</div>
						<span className="font-medium">Continue as a client</span>
					</div>
					{userType === "client" && (
						<div className="absolute top-4 right-4 w-5 h-5 bg-[#6A0DAD] rounded-full flex items-center justify-center">
							<div className="w-2 h-2 bg-white rounded-full"></div>
						</div>
					)}
				</button>
			</div>

			<button
				onClick={handleContinue}
				disabled={!userType}
				className={`w-full py-4 rounded-full font-semibold transition-all ${
					userType
						? "bg-[#6A0DAD] text-white hover:bg-[#5a0b92] cursor-pointer"
						: "bg-gray-200 text-gray-400 cursor-not-allowed"
				}`}
			>
				Continue
			</button>
		</div>
	);
};

export default StepOne;
