import React, { useState, useCallback, useRef } from "react";
import { ArrowLeft, Camera, Loader2, ChevronDown } from "lucide-react";
import { useSignupStore } from "../../../../store/useSignupStore";
import { addProfile } from "../../../../services/auth.service";
import { countries } from "../../../../utils/countries";

interface StepSixProps {
	onNext: () => void;
	onBack: () => void;
}

const StepSix: React.FC<StepSixProps> = ({ onNext, onBack }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [country, setCountry] = useState("");
	const [phoneCode, setPhoneCode] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [profileFile, setProfileFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { isLoading, setLoading, error, setError, clearError } =
		useSignupStore();

	// When country changes, auto-select the phone code
	const handleCountryChange = (selectedCountry: string) => {
		setCountry(selectedCountry);
		const found = countries.find((c) => c.name === selectedCountry);
		if (found) {
			setPhoneCode(found.code);
		}
	};

	const handleImageChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				if (file.size > 5 * 1024 * 1024) {
					setError("File size must be less than 5MB");
					return;
				}
				setProfileFile(file);
				const reader = new FileReader();
				reader.onloadend = () => {
					setProfileImage(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		},
		[setError],
	);

	const handleImageClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const handleContinue = useCallback(async () => {
		if (
			!firstName ||
			!lastName ||
			!gender ||
			!dateOfBirth ||
			!country ||
			!phoneCode ||
			!phoneNumber
		)
			return;

		clearError();
		setLoading(true);

		try {
			await addProfile({
				first_name: firstName,
				last_name: lastName,
				gender,
				date_of_birth: dateOfBirth,
				country,
				code: phoneCode,
				phone_number: phoneNumber,
				profile_picture: profileFile,
			});

			onNext();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message || "Failed to save profile. Please try again.");
		} finally {
			setLoading(false);
		}
	}, [
		firstName,
		lastName,
		gender,
		dateOfBirth,
		country,
		phoneCode,
		phoneNumber,
		profileFile,
		onNext,
		clearError,
		setLoading,
		setError,
	]);

	const isValid =
		firstName.length > 0 &&
		lastName.length > 0 &&
		gender.length > 0 &&
		dateOfBirth.length > 0 &&
		country.length > 0 &&
		phoneCode.length > 0 &&
		phoneNumber.length > 0;

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

			<h1 className="text-3xl font-bold mb-2">Who's Joining Us Today?</h1>
			<p className="text-gray-600 mb-6">Let's personalize your profile.</p>

			{error && (
				<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
					{error}
				</div>
			)}

			{/* Profile Image Upload */}
			<div className="flex flex-col items-center mb-6">
				<button
					onClick={handleImageClick}
					className="w-20 h-20 rounded-full bg-purple-200 hover:bg-purple-300 transition flex items-center justify-center mb-2 overflow-hidden relative group"
					aria-label="Upload profile picture"
					disabled={isLoading}
				>
					{profileImage ? (
						<img
							src={profileImage}
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					) : (
						<Camera size={28} className="text-purple-600" />
					)}
					<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
						<Camera size={20} className="text-white" />
					</div>
				</button>
				<p className="text-xs text-gray-500">
					<button
						onClick={handleImageClick}
						className="text-[#6A0DAD] font-semibold hover:underline"
					>
						Select a photo
					</button>{" "}
					(Max 5MB)
				</p>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="hidden"
				/>
			</div>

			<div className="space-y-4 mb-6 overflow-y-auto max-h-[45vh] pr-1">
				{/* Name Fields */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							First Name
						</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="Enter your name"
							className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
							disabled={isLoading}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Last Name
						</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Enter your last name"
							className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
							disabled={isLoading}
						/>
					</div>
				</div>

				{/* Gender */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Gender
					</label>
					<select
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent appearance-none bg-white cursor-pointer"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "right 1rem center",
							backgroundSize: "12px",
						}}
						disabled={isLoading}
					>
						<option value="" disabled>
							Select your gender
						</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="non-binary">Non-binary</option>
						<option value="prefer-not-to-say">Prefer not to say</option>
					</select>
				</div>

				{/* Date of Birth */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Date of Birth
					</label>
					<input
						type="date"
						value={dateOfBirth}
						onChange={(e) => setDateOfBirth(e.target.value)}
						className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
						disabled={isLoading}
					/>
				</div>

				{/* Country */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Country
					</label>
					<select
						value={country}
						onChange={(e) => handleCountryChange(e.target.value)}
						className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent appearance-none bg-white cursor-pointer"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "right 1rem center",
							backgroundSize: "12px",
						}}
						disabled={isLoading}
					>
						<option value="" disabled>
							Select your country
						</option>
						{countries.map((c) => (
							<option key={c.name} value={c.name}>
								{c.name}
							</option>
						))}
					</select>
				</div>

				{/* Phone Number with Code */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Phone Number
					</label>
					<div className="flex gap-2">
						<select
							value={phoneCode}
							onChange={(e) => setPhoneCode(e.target.value)}
							className="w-28 px-2 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent appearance-none bg-white cursor-pointer text-sm"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
								backgroundRepeat: "no-repeat",
								backgroundPosition: "right 0.5rem center",
								backgroundSize: "10px",
							}}
							disabled={isLoading}
						>
							<option value="" disabled>
								Code
							</option>
							{countries.map((c) => (
								<option key={`${c.name}-${c.code}`} value={c.code}>
									{c.code} ({c.name.substring(0, 3)})
								</option>
							))}
						</select>
						<input
							type="tel"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							placeholder="Enter your phone number"
							className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
							disabled={isLoading}
						/>
					</div>
				</div>
			</div>

			<button
				onClick={handleContinue}
				disabled={!isValid || isLoading}
				className={`w-full py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
					isValid && !isLoading
						? "bg-[#6A0DAD] text-white hover:bg-[#5a0b92] cursor-pointer"
						: "bg-gray-200 text-gray-400 cursor-not-allowed"
				}`}
			>
				{isLoading && <Loader2 size={18} className="animate-spin" />}
				{isLoading ? "Saving profile..." : "Continue"}
			</button>
		</div>
	);
};

export default StepSix;
