import React, { useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";

interface FreelancerStepSixProps {
	onNext: () => void;
	onBack: () => void;
}

const FreelancerStepSix: React.FC<FreelancerStepSixProps> = ({
	onNext,
	onBack,
}) => {
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [country, setCountry] = useState("");
	const [countryCode, setCountryCode] = useState("+234");
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleContinue = () => {
		if (dateOfBirth && country && phoneNumber) {
			onNext();
		}
	};

	const formatDateToMMDDYY = (dateString: string): string => {
		if (!dateString) return "";

		const date = new Date(dateString);

		// Check if the date is valid
		if (isNaN(date.getTime())) return "";

		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const year = String(date.getFullYear()).slice(-2);

		return `${month}/${day}/${year}`;
	};

	const isValid = dateOfBirth && country && phoneNumber;

	const countries = [
		"Nigeria",
		"United States",
		"United Kingdom",
		"Canada",
		"Ghana",
		"Kenya",
		"South Africa",
	];

	return (
		<div className="flex flex-col h-full">
			<button
				onClick={onBack}
				className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900 transition w-fit"
			>
				<ArrowLeft size={20} />
				<span>Back</span>
			</button>

			<h1 className="text-3xl font-bold mb-2">Almost there</h1>
			<p className="text-gray-600 mb-8">Let's personalize your profile.</p>

			<div className="space-y-6 mb-8">
				{/* Date of Birth */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Date of Birth
					</label>
					<div className="relative">
						<input
							type="date"
							value={dateOfBirth}
							onChange={(e) => setDateOfBirth(e.target.value)}
							placeholder="mm / dd / yy"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent pr-12"
						/>
					</div>
					{/* Display formatted date below the input */}
					{dateOfBirth && (
						<p className="text-sm text-gray-500 mt-2">
							Formatted: {formatDateToMMDDYY(dateOfBirth)}
						</p>
					)}
				</div>

				{/* Country */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Country
					</label>
					<select
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent appearance-none bg-white"
					>
						<option value="">Select country</option>
						{countries.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>

				{/* Phone Number */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Phone Number
					</label>
					<div className="grid grid-cols-3 gap-3">
						<div className="col-span-1">
							<select
								value={countryCode}
								onChange={(e) => setCountryCode(e.target.value)}
								className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent appearance-none bg-white"
							>
								<option value="+234">+234 🇳🇬</option>
								<option value="+1">+1 🇺🇸</option>
								<option value="+44">+44 🇬🇧</option>
								<option value="+254">+254 🇰🇪</option>
							</select>
						</div>
						<div className="col-span-2">
							<input
								type="tel"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								placeholder="81*********"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent"
							/>
						</div>
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
				Join
			</button>
		</div>
	);
};

export default FreelancerStepSix;
