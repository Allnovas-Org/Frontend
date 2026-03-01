import React, { useState, useRef } from "react";
import { Upload, User, CheckCircle } from "lucide-react";

const VerificationStep: React.FC = () => {
	const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
	const [verificationStatus, setVerificationStatus] = useState({
		governmentId: false,
		addressVerification: false,
		phoneVerification: false,
	});
	const photoInputRef = useRef<HTMLInputElement>(null);

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				alert("File size must be less than 5MB");
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePhoto(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handlePhotoClick = () => {
		photoInputRef.current?.click();
	};

	const handleVerification = (type: "governmentId" | "addressVerification" | "phoneVerification") => {
		// In real app, this would trigger the verification flow
		console.log(`Initiating ${type} verification`);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
					Verify your identity
				</h2>
				<p className="text-sm text-gray-600">
					Complete verification to build trust and unlock premium features
				</p>
			</div>

			{/* Profile Photo Section */}
			<div className="w-full md:w-1/2">
				<div className="p-5 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition">
					<div className="flex items-start gap-2 mb-4">
						<User className="w-4 h-4 text-gray-700 mt-0.5" />
						<div>
							<h3 className="text-sm font-semibold text-gray-900">
								Profile Photo
							</h3>
							<p className="text-xs text-gray-600">
								Upload a professional photo of yourself
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<button
							onClick={handlePhotoClick}
							className="w-20 h-20 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center overflow-hidden relative group"
						>
							{profilePhoto ? (
								<img 
									src={profilePhoto} 
									alt="Profile" 
									className="w-full h-full object-cover"
								/>
							) : (
								<User className="w-8 h-8 text-gray-400" />
							)}
							<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
								<Upload className="w-5 h-5 text-white" />
							</div>
						</button>

						<div>
							<button
								onClick={handlePhotoClick}
								className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-xs flex items-center gap-2"
							>
								<Upload className="w-3.5 h-3.5" />
								Upload Photo
							</button>
							<p className="text-[0.65rem] text-gray-500 mt-1.5">
								JPG, PNG up to 5MB
							</p>
						</div>

						<input
							ref={photoInputRef}
							type="file"
							accept="image/*"
							onChange={handlePhotoUpload}
							className="hidden"
						/>
					</div>
				</div>
			</div>

			{/* Identity Verification Section */}
			<div className="w-full md:w-1/2">
				<h3 className="text-sm font-semibold text-gray-900 mb-3">
					Identity Verification
				</h3>

				<div className="space-y-3">
					{/* Government ID */}
					<div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition">
						<div className="flex items-start gap-3">
							<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
								verificationStatus.governmentId 
									? "border-[#A78BFA] bg-[#A78BFA]" 
									: "border-gray-300"
							}`}>
								{verificationStatus.governmentId && (
									<svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
									</svg>
								)}
							</div>
							<div>
								<h4 className="text-xs font-medium text-gray-900">
									Government ID
								</h4>
								<p className="text-[0.65rem] text-gray-600">
									Upload a government-issued ID
								</p>
							</div>
						</div>
						<button
							onClick={() => handleVerification("governmentId")}
							className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition"
						>
							Upload ID
						</button>
					</div>

					{/* Address Verification */}
					<div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition">
						<div className="flex items-start gap-3">
							<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
								verificationStatus.addressVerification 
									? "border-[#A78BFA] bg-[#A78BFA]" 
									: "border-gray-300"
							}`}>
								{verificationStatus.addressVerification && (
									<svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
									</svg>
								)}
							</div>
							<div>
								<h4 className="text-xs font-medium text-gray-900">
									Address Verification
								</h4>
								<p className="text-[0.65rem] text-gray-600">
									Verify your address with a utility bill
								</p>
							</div>
						</div>
						<button
							onClick={() => handleVerification("addressVerification")}
							className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition"
						>
							Upload Document
						</button>
					</div>

					{/* Phone Verification */}
					<div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition">
						<div className="flex items-start gap-3">
							<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
								verificationStatus.phoneVerification 
									? "border-[#A78BFA] bg-[#A78BFA]" 
									: "border-gray-300"
							}`}>
								{verificationStatus.phoneVerification && (
									<svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
									</svg>
								)}
							</div>
							<div>
								<h4 className="text-xs font-medium text-gray-900">
									Phone Verification
								</h4>
								<p className="text-[0.65rem] text-gray-600">
									Verify your phone number via SMS
								</p>
							</div>
						</div>
						<button
							onClick={() => handleVerification("phoneVerification")}
							className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition"
						>
							Verify Phone
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerificationStep;