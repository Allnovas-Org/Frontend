import React, { useState, useCallback, useRef } from "react";
import { ArrowLeft, Camera } from "lucide-react";

interface StepSixProps {
	onNext: () => void;
	onBack: () => void;
}

const StepSix: React.FC<StepSixProps> = ({ onNext, onBack }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("");
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				alert("File size must be less than 5MB");
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}, []);

	const handleImageClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const handleContinue = useCallback(() => {
		if (firstName && lastName && gender) {
			onNext();
		}
	}, [firstName, lastName, gender, onNext]);

	const isValid = firstName.length > 0 && lastName.length > 0 && gender.length > 0;

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
				Who's Joining Us Today?
			</h1>
			<p className="text-gray-600 mb-8">
				Let's personalize your profile.
			</p>

			{/* Profile Image Upload */}
			<div className="flex flex-col items-center mb-8">
				<button
					onClick={handleImageClick}
					className="w-24 h-24 rounded-full bg-purple-200 hover:bg-purple-300 transition flex items-center justify-center mb-3 overflow-hidden relative group"
					aria-label="Upload profile picture"
				>
					{profileImage ? (
						<img 
							src={profileImage} 
							alt="Profile" 
							className="w-full h-full object-cover"
						/>
					) : (
						<Camera size={32} className="text-purple-600" />
					)}
					<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
						<Camera size={24} className="text-white" />
					</div>
				</button>
				<p className="text-sm text-gray-600">
					Take a picture or{" "}
					<button
						onClick={handleImageClick}
						className="text-[#6A0DAD] font-semibold hover:underline"
					>
						select a photo
					</button>
				</p>
				<p className="text-xs text-gray-500 mt-1">Max 5MB</p>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="hidden"
				/>
			</div>

			<div className="space-y-6 mb-8">
				{/* Name Fields */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							First Name
						</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="Enter your name"
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
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
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
						/>
					</div>
				</div>

				{/* Gender Dropdown */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Gender
					</label>
					<select
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent appearance-none bg-white cursor-pointer"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'right 1rem center',
							backgroundSize: '12px',
						}}
					>
						<option value="" disabled>Select your gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="non-binary">Non-binary</option>
						<option value="prefer-not-to-say">Prefer not to say</option>
					</select>
				</div>
			</div>

			<button
				onClick={handleContinue}
				disabled={!isValid}
				className={`w-full py-4 rounded-full font-semibold transition-all mt-16 ${
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

export default StepSix;	