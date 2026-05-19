import React, { useRef } from "react";
import { Upload, User } from "lucide-react";

interface VerificationData {
	profilePhoto: File | null;
	govId: File | null;
	addressVerification: File | null;
	phone: string;
}

interface VerificationStepProps {
	data: VerificationData;
	setData: React.Dispatch<React.SetStateAction<VerificationData>>;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ data, setData }) => {
	const photoInputRef = useRef<HTMLInputElement>(null);
	const govIdInputRef = useRef<HTMLInputElement>(null);
	const addressVerInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: "profilePhoto" | "govId" | "addressVerification"
	) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				alert("File size must be less than 5MB");
				return;
			}

			setData((prev) => ({ ...prev, [field]: file }));
		}
	};

	const handlePhotoClick = () => {
		photoInputRef.current?.click();
	};

	const handleGovIdClick = () => {
		govIdInputRef.current?.click();
	};

	const handleAddressVerClick = () => {
		addressVerInputRef.current?.click();
	};

	const getProfilePhotoPreview = () => {
		if (data.profilePhoto) {
			return URL.createObjectURL(data.profilePhoto);
		}
		return null;
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
							type="button"
							className="w-20 h-20 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center overflow-hidden relative group"
						>
							{getProfilePhotoPreview() ? (
								<img
									src={getProfilePhotoPreview()!}
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
								type="button"
								className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-xs flex items-center gap-2"
							>
								<Upload className="w-3.5 h-3.5" />
								{data.profilePhoto ? "Change Photo" : "Upload Photo"}
							</button>
							<p className="text-[0.65rem] text-gray-500 mt-1.5">
								JPG, PNG up to 5MB
								{data.profilePhoto && ` • ${data.profilePhoto.name}`}
							</p>
						</div>

						<input
							ref={photoInputRef}
							type="file"
							accept="image/*"
							onChange={(e) => handleFileUpload(e, "profilePhoto")}
							className="hidden"
						/>
					</div>
				</div>
			</div>

			{/* Documents Section */}
			<div className="w-full md:w-1/2">
				<h3 className="text-sm font-semibold text-gray-900 mb-3">
					Identity Verification
				</h3>

				<div className="space-y-3">
					{/* Government ID */}
					<div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition">
						<div className="flex items-start gap-3">
							<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
								data.govId
									? "border-[#A78BFA] bg-[#A78BFA]"
									: "border-gray-300"
							}`}>
								{data.govId && (
									<svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
									</svg>
								)}
							</div>
							<div>
								<h4 className="text-xs font-medium text-gray-900">
									Government ID <span className="text-gray-400">(optional)</span>
								</h4>
								<p className="text-[0.65rem] text-gray-600">
									{data.govId ? data.govId.name : "Upload a government-issued ID"}
								</p>
							</div>
						</div>
						<button
							type="button"
							onClick={handleGovIdClick}
							className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition"
						>
							{data.govId ? "Change" : "Upload ID"}
						</button>
						<input
							ref={govIdInputRef}
							type="file"
							accept="image/*,.pdf"
							onChange={(e) => handleFileUpload(e, "govId")}
							className="hidden"
						/>
					</div>

					{/* Address Verification */}
					<div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition">
						<div className="flex items-start gap-3">
							<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
								data.addressVerification
									? "border-[#A78BFA] bg-[#A78BFA]"
									: "border-gray-300"
							}`}>
								{data.addressVerification && (
									<svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
									</svg>
								)}
							</div>
							<div>
								<h4 className="text-xs font-medium text-gray-900">
									Address Verification <span className="text-gray-400">(optional)</span>
								</h4>
								<p className="text-[0.65rem] text-gray-600">
									{data.addressVerification ? data.addressVerification.name : "Utility bill or bank statement"}
								</p>
							</div>
						</div>
						<button
							type="button"
							onClick={handleAddressVerClick}
							className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition"
						>
							{data.addressVerification ? "Change" : "Upload Doc"}
						</button>
						<input
							ref={addressVerInputRef}
							type="file"
							accept="image/*,.pdf"
							onChange={(e) => handleFileUpload(e, "addressVerification")}
							className="hidden"
						/>
					</div>
				</div>
			</div>

			{/* Phone Number Section */}
			<div className="w-full md:w-1/2">
				<h3 className="text-sm font-semibold text-gray-900 mb-3">
					Contact Information
				</h3>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Phone Number
					</label>
					<input
						type="tel"
						value={data.phone}
						onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
						placeholder="+1 (555) 123-4567"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
					/>
					<p className="text-xs text-gray-500 mt-1.5">
						We'll use this to contact you about important updates
					</p>
				</div>
			</div>
		</div>
	);
};

export default VerificationStep;