import React, { useState } from "react";
import { Upload, User, MapPin, Phone, CheckCircle } from "lucide-react";

const VerificationStep = () => {
	const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
	const [verificationStatus, setVerificationStatus] = useState({
		profilePhoto: false,
		governmentId: false,
		addressVerification: false,
		phoneVerification: false,
	});

	const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePhoto(reader.result as string);
				setVerificationStatus({ ...verificationStatus, profilePhoto: true });
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const verificationItems = [
		{
			id: "profilePhoto",
			icon: User,
			title: "Profile Photo",
			description: "Upload a professional photo of yourself",
			buttonText: "Upload Photo",
			buttonAction: () =>
				document.getElementById("profile-photo-upload")?.click(),
			fileInputId: "profile-photo-upload",
			note: "JPG, PNG up to 5MB",
			isCompleted: verificationStatus.profilePhoto,
		},
		{
			id: "governmentId",
			icon: User,
			title: "Government ID",
			description: "Upload a government-issued ID",
			buttonText: "Upload ID",
			buttonAction: () =>
				setVerificationStatus({ ...verificationStatus, governmentId: true }),
			note: null,
			isCompleted: verificationStatus.governmentId,
		},
		{
			id: "addressVerification",
			icon: MapPin,
			title: "Address Verification",
			description: "Verify your address with a utility bill",
			buttonText: "Upload Document",
			buttonAction: () =>
				setVerificationStatus({
					...verificationStatus,
					addressVerification: true,
				}),
			note: null,
			isCompleted: verificationStatus.addressVerification,
		},
		{
			id: "phoneVerification",
			icon: Phone,
			title: "Phone Verification",
			description: "Verify your phone number via SMS",
			buttonText: "Verify Phone",
			buttonAction: () =>
				setVerificationStatus({
					...verificationStatus,
					phoneVerification: true,
				}),
			note: null,
			isCompleted: verificationStatus.phoneVerification,
		},
	];

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">Verify your identity</h2>
			<p className="text-gray-600 mb-8">
				Complete verification to build trust and unlock premium features
			</p>

			{/* Profile Photo Section */}
			<div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
				<div className="flex items-start gap-4">
					<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
						<User className="w-6 h-6 text-gray-600" />
					</div>

					<div className="flex-1">
						<h3 className="font-semibold text-lg mb-1">Profile Photo</h3>
						<p className="text-gray-600 text-sm mb-4">
							Upload a professional photo of yourself
						</p>

						<div className="flex items-center gap-4">
							{/* Profile Preview */}
							<div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
								{profilePhoto ? (
									<img
										src={profilePhoto}
										alt="Profile"
										className="w-full h-full object-cover"
									/>
								) : (
									<User className="w-8 h-8 text-gray-400" />
								)}
							</div>

							{/* Upload Button */}
							<label className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50 flex items-center gap-2">
								<Upload className="w-4 h-4" />
								Upload Photo
								<input
									type="file"
									accept="image/*"
									onChange={handleProfilePhotoUpload}
									className="hidden"
									id="profile-photo-upload"
								/>
							</label>

							{verificationStatus.profilePhoto && (
								<CheckCircle className="w-5 h-5 text-green-500" />
							)}
						</div>

						<p className="text-xs text-gray-400 mt-2">JPG, PNG up to 5MB</p>
					</div>
				</div>
			</div>

			{/* Identity Verification Section */}
			<h3 className="font-semibold text-lg mb-4">Identity Verification</h3>

			<div className="space-y-4">
				{/* Government ID */}
				<div className="bg-white border border-gray-200 rounded-xl p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
								<User className="w-5 h-5 text-gray-600" />
							</div>
							<div>
								<h4 className="font-semibold">Government ID</h4>
								<p className="text-sm text-gray-600">
									Upload a government-issued ID
								</p>
							</div>
						</div>
						<button
							onClick={() =>
								setVerificationStatus({
									...verificationStatus,
									governmentId: true,
								})
							}
							className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
						>
							Upload ID
						</button>
					</div>
				</div>

				{/* Address Verification */}
				<div className="bg-white border border-gray-200 rounded-xl p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
								<MapPin className="w-5 h-5 text-gray-600" />
							</div>
							<div>
								<h4 className="font-semibold">Address Verification</h4>
								<p className="text-sm text-gray-600">
									Verify your address with a utility bill
								</p>
							</div>
						</div>
						<button
							onClick={() =>
								setVerificationStatus({
									...verificationStatus,
									addressVerification: true,
								})
							}
							className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
						>
							Upload Document
						</button>
					</div>
				</div>

				{/* Phone Verification */}
				<div className="bg-white border border-gray-200 rounded-xl p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
								<Phone className="w-5 h-5 text-gray-600" />
							</div>
							<div>
								<h4 className="font-semibold">Phone Verification</h4>
								<p className="text-sm text-gray-600">
									Verify your phone number via SMS
								</p>
							</div>
						</div>
						<button
							onClick={() =>
								setVerificationStatus({
									...verificationStatus,
									phoneVerification: true,
								})
							}
							className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
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
