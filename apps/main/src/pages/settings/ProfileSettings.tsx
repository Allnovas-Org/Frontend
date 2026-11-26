import React, { useEffect, useRef, useState } from "react";
import {
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	SelectChangeEvent,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import userPlaceholder from "../../assets/applicants/user.png";
import { updateCurrentUser, toAuthUser } from "../../services/auth.service";
import { useAuthStore } from "../../store/useAuthStore";
import { getApiErrorMessage } from "../../utils/apiError";

interface ProfileData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	location: string;
	availability: string;
	website: string;
	bio: string;
	profilePicture: string;
}

const ProfileSettings: React.FC = () => {
	const user = useAuthStore((state) => state.user);
	const updateUser = useAuthStore((state) => state.updateUser);
	const [profileData, setProfileData] = useState<ProfileData>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		location: "",
		availability: "",
		website: "",
		bio: "",
		profilePicture: userPlaceholder,
	});

	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState("");
	const initialProfileData = useRef(profileData);

	useEffect(() => {
		if (!user) return;
		const accountProfile = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: [user.countryCode, user.phoneNumber].filter(Boolean).join(" "),
			location: user.country || "",
			availability: "",
			website: "",
			bio: "",
			profilePicture: user.avatar || userPlaceholder,
		};
		initialProfileData.current = accountProfile;
		setProfileData(accountProfile);
	}, [user]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSelectChange = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({
			...prev,
			[name as string]: value,
		}));
	};

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileData((prev) => ({
					...prev,
					profilePicture: reader.result as string,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = async () => {
		if (!profileData.firstName.trim() || !profileData.lastName.trim()) {
			setError("First and last name are required.");
			return;
		}
		setIsSaving(true);
		setError("");
		const nonAccountFields: (keyof ProfileData)[] = [
			"phone",
			"location",
			"availability",
			"website",
			"bio",
			"profilePicture",
		];
		const unsupportedChanges = nonAccountFields.some(
			(field) => profileData[field] !== initialProfileData.current[field],
		);

		try {
			const updatedUser = await updateCurrentUser({
				first_name: profileData.firstName.trim(),
				last_name: profileData.lastName.trim(),
			});
			const mappedUser = toAuthUser(updatedUser);
			updateUser(mappedUser);
			initialProfileData.current = {
				...initialProfileData.current,
				firstName: mappedUser.firstName,
				lastName: mappedUser.lastName,
			};
			setProfileData((current) => ({
				...current,
				firstName: mappedUser.firstName,
				lastName: mappedUser.lastName,
			}));

			if (unsupportedChanges) {
				setError(
					"Only first and last name are saved through the current account API. Other edited fields were not saved because their update mappings are unavailable.",
				);
			} else {
				setIsEditing(false);
			}
		} catch (saveError) {
			setError(getApiErrorMessage(saveError, "Unable to save profile changes."));
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-900 mb-1">Profile</h2>
				<p className="text-sm text-gray-500">
					Manage your personal information here
				</p>
			</div>
			{error && (
				<div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
					{error}
				</div>
			)}

			{/* Profile Picture Section */}
			<div className="mb-8">
				<h3 className="text-base font-medium text-gray-900 mb-4">
					Profile Picture
				</h3>
				<div className="flex max-md:flex-col flex-row items-center gap-6">
					<div className="relative">
						<img
							src={profileData.profilePicture}
							alt="Profile"
							className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
						/>
						<label
							htmlFor="profile-photo-upload"
							className="absolute bottom-0 right-0 w-6 h-6 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
						>
							<CameraAlt className="text-white" style={{ fontSize: 14 }} />
							<input
								id="profile-photo-upload"
								type="file"
								accept="image/jpeg,image/png,image/gif"
								className="hidden"
								onChange={handlePhotoUpload}
								disabled={!isEditing || isSaving}
							/>
						</label>
					</div>
					<div className="flex-1">
						<p className="text-sm text-gray-500 mb-2">
							JPG, PNG or GIF. Max 5MB.
						</p>
						<label
							htmlFor="profile-photo-upload-btn"
							className="inline-block px-4 py-2 text-sm border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
						>
							Upload New Photo
							<input
								id="profile-photo-upload-btn"
								type="file"
								accept="image/jpeg,image/png,image/gif"
								className="hidden"
								onChange={handlePhotoUpload}
							/>
						</label>
					</div>
				</div>
			</div>

			{/* Personal Information */}
			<div className="mb-8">
				<h3 className="text-base font-medium text-gray-900 mb-4">
					Personal Information
				</h3>
				<div className="space-y-4">
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								First Name
							</label>
							<TextField
								fullWidth
								name="firstName"
								value={profileData.firstName}
								onChange={handleInputChange}
								disabled={!isEditing || isSaving}
								placeholder="Alex"
								size="small"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Last Name
							</label>
							<TextField
								fullWidth
								name="lastName"
								value={profileData.lastName}
								onChange={handleInputChange}
								disabled={!isEditing || isSaving}
								placeholder="Johnson"
								size="small"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<TextField
							fullWidth
							name="email"
							type="email"
							value={profileData.email}
							onChange={handleInputChange}
							disabled
							placeholder="alex.johnson@example.com"
							size="small"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "8px",
								},
							}}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Phone Number
						</label>
						<TextField
							fullWidth
							name="phone"
							value={profileData.phone}
							onChange={handleInputChange}
							disabled={!isEditing || isSaving}
							placeholder="+1 (555) 123-4567"
							size="small"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "8px",
								},
							}}
						/>
					</div>
				</div>
			</div>

			{/* Professional Information */}
			<div className="mb-8">
				<h3 className="text-base font-medium text-gray-900 mb-4">
					Professional Information
				</h3>
				<div className="space-y-4">
					<div className="grid max-md:gap-8 md:grid-cols-2 gap-4">
						<FormControl fullWidth size="small">
							<InputLabel>Location</InputLabel>
							<Select
								name="location"
								value={profileData.location}
								onChange={handleSelectChange}
								disabled={!isEditing || isSaving}
								label="Location"
								sx={{
									borderRadius: "8px",
								}}
							>
								<MenuItem value="San Francisco, CA">San Francisco, CA</MenuItem>
								<MenuItem value="New York, NY">New York, NY</MenuItem>
								<MenuItem value="Los Angeles, CA">Los Angeles, CA</MenuItem>
								<MenuItem value="Chicago, IL">Chicago, IL</MenuItem>
								{profileData.location &&
									![
										"San Francisco, CA",
										"New York, NY",
										"Los Angeles, CA",
										"Chicago, IL",
									].includes(profileData.location) && (
										<MenuItem value={profileData.location}>
											{profileData.location}
										</MenuItem>
									)}
							</Select>
						</FormControl>

						<FormControl fullWidth size="small">
							<InputLabel>Availability Status</InputLabel>
							<Select
								name="availability"
								value={profileData.availability}
								onChange={handleSelectChange}
								disabled={!isEditing || isSaving}
								label="Availability Status"
								sx={{
									borderRadius: "8px",
								}}
							>
								<MenuItem value="Available for work">
									Available for work
								</MenuItem>
								<MenuItem value="Busy">Not available</MenuItem>
								<MenuItem value="Not available">Available soon</MenuItem>
							</Select>
						</FormControl>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Website
						</label>
						<TextField
							fullWidth
							name="website"
							value={profileData.website}
							onChange={handleInputChange}
							disabled={!isEditing || isSaving}
							placeholder="Could be your social handle/personal portfolio"
							size="small"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "8px",
								},
							}}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Bio
						</label>
						<TextField
							fullWidth
							name="bio"
							value={profileData.bio}
							onChange={handleInputChange}
							disabled={!isEditing || isSaving}
							placeholder="Full-stack developer specializing in React and Node.js"
							multiline
							rows={4}
							size="small"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "8px",
								},
							}}
						/>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex max-md:flex-col flex-row justify-between items-center max-md:gap-4 pt-6 border-t border-gray-200">
				<button className="shadow rounded-lg px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition">
					Back to Find Jobs
				</button>
				<button
					onClick={isEditing ? () => void handleSave() : () => {
						setError("");
						setIsEditing(true);
					}}
					disabled={isSaving}
					className="px-6 py-2 text-sm text-white rounded-lg transition"
					style={{ backgroundColor: "#F05658" }}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = "#d94446";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = "#F05658";
					}}
				>
					{isSaving ? "Saving..." : isEditing ? "Save Changes" : "Edit Information"}
				</button>
			</div>
		</div>
	);
};

export default ProfileSettings;
