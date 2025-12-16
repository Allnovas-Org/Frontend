import React, { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";

interface FreelancerStepFiveProps {
	onNext: () => void;
	onBack: () => void;
}

const FreelancerStepFive: React.FC<FreelancerStepFiveProps> = ({
	onNext,
	onBack,
}) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("");
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleContinue = () => {
		if (firstName && lastName && gender) {
			onNext();
		}
	};

	const isValid = firstName && lastName && gender;

	return (
		<div className="flex flex-col h-full">
			<button
				onClick={onBack}
				className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900 transition w-fit"
			>
				<ArrowLeft size={20} />
				<span>Back</span>
			</button>

			<h1 className="text-3xl font-bold mb-2">Who's Joining Us Today?</h1>
			<p className="text-gray-600 mb-8">Let's personalize your profile.</p>

			{/* Profile Picture Upload */}
			<div className="flex flex-col items-center mb-6">
				<div className="relative">
					<div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
						{profileImage ? (
							<img
								src={profileImage}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						) : (
							<Camera className="w-8 h-8 text-[#6A0DAD]" />
						)}
					</div>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						className="hidden"
						id="profile-upload"
					/>
				</div>
				<label
					htmlFor="profile-upload"
					className="mt-3 text-sm text-gray-600 cursor-pointer"
				>
					Take a picture or{" "}
					<span className="text-[#6A0DAD] font-semibold">select a photo</span>
				</label>
				<p className="text-xs text-gray-400 mt-1">Max 5MB</p>
			</div>

			{/* Name Fields */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						First Name
					</label>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="Enter your name"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Last Name
					</label>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Enter your last name"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
					/>
				</div>
			</div>

			{/* Gender Field */}
			<div className="mb-8">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Gender
				</label>
				<select
					value={gender}
					onChange={(e) => setGender(e.target.value)}
					className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent appearance-none bg-white"
				>
					<option value="">Select your gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
					<option value="prefer-not-to-say">Prefer not to say</option>
				</select>
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

export default FreelancerStepFive;
