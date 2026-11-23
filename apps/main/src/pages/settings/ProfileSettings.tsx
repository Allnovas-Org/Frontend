import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import userPlaceholder from "../../assets/applicants/user.png";
import {
	ClientProfile,
	getClientProfile,
	getCurrentUserSettings,
	getFreelancerProfile,
	getMediaUrl,
	updateClientProfile,
	updateCurrentUserSettings,
	updateFreelancerProfile,
	uploadClientProfilePicture,
	uploadCurrentUserPicture,
	uploadFreelancerProfilePicture,
} from "../../services/profile.service";
import { useAuthStore } from "../../store/useAuthStore";
import { getApiErrorMessage } from "../../utils/apiError";

interface ProfileData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	location: string;
	title: string;
	website: string;
	bio: string;
	profilePicture: string;
}

const emptyProfile: ProfileData = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	location: "",
	title: "",
	website: "",
	bio: "",
	profilePicture: userPlaceholder,
};

const ProfileSettings: React.FC = () => {
	const user = useAuthStore((state) => state.user);
	const authLoading = useAuthStore((state) => state.isLoading);
	const updateUser = useAuthStore((state) => state.updateUser);
	const [profileData, setProfileData] = useState<ProfileData>(emptyProfile);
	const [savedProfileData, setSavedProfileData] = useState<ProfileData>(emptyProfile);
	const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
	const [pictureFile, setPictureFile] = useState<File | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		let active = true;
		if (!user) {
			if (authLoading || localStorage.getItem("auth-token")) {
				setLoading(true);
			} else {
				setLoading(false);
				setError("Sign in to manage your profile.");
			}
			return () => {
				active = false;
			};
		}
		setLoading(true);
		setError("");
		const loadProfile = async () => {
			const account = await getCurrentUserSettings();
			if (user?.userType === "Freelancer") {
				const profile = await getFreelancerProfile();
				if (!active) return;
				const loadedProfile: ProfileData = {
					firstName: account.first_name,
					lastName: account.last_name,
					email: account.email,
					phone: account.phone_number,
					location: account.country,
					title: profile.title || "",
					website: "",
					bio: profile.bio || "",
					profilePicture:
						getMediaUrl(account.profile_picture) ||
						getMediaUrl(profile.profile_photo) ||
						userPlaceholder,
				};
				setProfileData(loadedProfile);
				setSavedProfileData(loadedProfile);
			} else {
				const profile = await getClientProfile();
				if (!active) return;
				const loadedProfile: ProfileData = {
					firstName: account.first_name,
					lastName: account.last_name,
					email: account.email,
					phone: account.phone_number,
					location: account.country,
					title: "",
					website:
						profile.company?.company_website ||
						profile.individual?.website ||
						"",
					bio:
						profile.company?.company_description ||
						profile.individual?.about_you ||
						"",
					profilePicture:
						getMediaUrl(account.profile_picture) ||
						getMediaUrl(profile.profile_photo) ||
						userPlaceholder,
				};
				setProfileData(loadedProfile);
				setSavedProfileData(loadedProfile);
				setClientProfile(profile);
			}
		};
		loadProfile()
			.catch((requestError: unknown) => {
				if (active) setError(getApiErrorMessage(requestError, "Unable to load your profile."));
			})
			.finally(() => {
				if (active) setLoading(false);
			});
		return () => {
			active = false;
		};
	}, [authLoading, user, user?.userType]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setProfileData((current) => ({ ...current, [name]: value }));
	};

	const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		if (!["image/jpeg", "image/png", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
			setError("Choose a JPG, PNG, or GIF image no larger than 5MB.");
			event.target.value = "";
			return;
		}
		setError("");
		if (profileData.profilePicture.startsWith("blob:")) {
			URL.revokeObjectURL(profileData.profilePicture);
		}
		setPictureFile(file);
		setProfileData((current) => ({
			...current,
			profilePicture: URL.createObjectURL(file),
		}));
	};

	const handleSave = async () => {
		setSaving(true);
		setError("");
		setMessage("");
		let accountSaved = false;
		let profileSaved = false;
		try {
			const account = await updateCurrentUserSettings({
				first_name: profileData.firstName.trim(),
				last_name: profileData.lastName.trim(),
				phone_number: profileData.phone.trim(),
				country: profileData.location.trim(),
			});
			accountSaved = true;
			updateUser({
				firstName: account.first_name,
				lastName: account.last_name,
				email: account.email,
			});
			if (user?.userType === "Freelancer") {
				await updateFreelancerProfile({
					title: profileData.title.trim(),
					bio: profileData.bio.trim(),
				});
			} else if (clientProfile?.company) {
				await updateClientProfile({
					company: {
						...clientProfile.company,
						company_website: profileData.website.trim(),
						company_description: profileData.bio.trim(),
					},
				});
			} else if (clientProfile?.individual) {
				await updateClientProfile({
					individual: {
						...clientProfile.individual,
						website: profileData.website.trim(),
						about_you: profileData.bio.trim(),
					},
				});
			} else {
				throw new Error("Your client profile type is not configured.");
			}
			profileSaved = true;
			let savedAccount = account;
			let savedProfilePicture: string | null = null;
			if (pictureFile) {
				savedAccount = await uploadCurrentUserPicture(pictureFile);
				if (user?.userType === "Freelancer") {
					savedProfilePicture = (await uploadFreelancerProfilePicture(pictureFile)).profile_photo;
				} else {
					savedProfilePicture = (await uploadClientProfilePicture(pictureFile)).profile_photo;
				}
			}
			const savedProfile: ProfileData = {
				...profileData,
				profilePicture:
					getMediaUrl(savedProfilePicture) ||
					getMediaUrl(savedAccount.profile_picture) ||
					userPlaceholder,
			};
			setProfileData(savedProfile);
			setSavedProfileData(savedProfile);
			if (profileData.profilePicture.startsWith("blob:")) {
				URL.revokeObjectURL(profileData.profilePicture);
			}
			setPictureFile(null);
			const avatar =
				getMediaUrl(savedProfilePicture) ||
				getMediaUrl(savedAccount.profile_picture);
			updateUser({
				firstName: savedAccount.first_name,
				lastName: savedAccount.last_name,
				email: savedAccount.email,
				...(avatar ? { avatar } : {}),
			});
			setMessage("Your profile was saved.");
			setIsEditing(false);
		} catch (requestError) {
			const detail = getApiErrorMessage(requestError, "Unable to save your profile.");
			setError(
				profileSaved
					? `Your text details were saved, but the profile photo update failed: ${detail}`
					: accountSaved
					? `Your account details were saved, but the profile update failed: ${detail}`
					: detail,
			);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return <p className="py-8 text-center text-gray-500">Loading profile…</p>;
	}

	return (
		<div className="w-full">
			<div className="mb-6">
				<h2 className="mb-1 text-2xl font-semibold text-gray-900">Profile</h2>
				<p className="text-sm text-gray-500">Manage your personal information here</p>
			</div>

			<div className="mb-8">
				<h3 className="mb-4 text-base font-medium text-gray-900">Profile Picture</h3>
				<div className="flex flex-row items-center gap-6 max-md:flex-col">
					<div className="relative">
						<img
							src={profileData.profilePicture}
							alt="Profile"
							className="h-20 w-20 rounded-full border-2 border-gray-200 object-cover"
						/>
						<label
							htmlFor="profile-photo-upload"
							className="absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black transition hover:bg-gray-800"
						>
							<CameraAlt className="text-white" style={{ fontSize: 14 }} />
							<input
								id="profile-photo-upload"
								type="file"
								accept="image/jpeg,image/png,image/gif"
								className="hidden"
								disabled={!isEditing}
								onChange={handlePhotoUpload}
							/>
						</label>
					</div>
					<p className="flex-1 text-sm text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
				</div>
			</div>

			<div className="mb-8">
				<h3 className="mb-4 text-base font-medium text-gray-900">Personal Information</h3>
				<div className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<ProfileField label="First Name" name="firstName" value={profileData.firstName} onChange={handleInputChange} disabled={!isEditing} />
						<ProfileField label="Last Name" name="lastName" value={profileData.lastName} onChange={handleInputChange} disabled={!isEditing} />
					</div>
					<ProfileField label="Email Address" name="email" value={profileData.email} disabled />
					<ProfileField label="Phone Number" name="phone" value={profileData.phone} onChange={handleInputChange} disabled={!isEditing} />
					<ProfileField label="Country" name="location" value={profileData.location} onChange={handleInputChange} disabled={!isEditing} />
				</div>
			</div>

			<div className="mb-8 space-y-4">
				<h3 className="text-base font-medium text-gray-900">Professional Information</h3>
				{user?.userType === "Freelancer" ? (
					<ProfileField label="Professional Title" name="title" value={profileData.title} onChange={handleInputChange} disabled={!isEditing} />
				) : (
					<ProfileField label="Website" name="website" value={profileData.website} onChange={handleInputChange} disabled={!isEditing} />
				)}
				<label className="block text-sm font-medium text-gray-700">
					{user?.userType === "Freelancer" ? "Bio" : "About"}
					<TextField
						fullWidth
						name="bio"
						value={profileData.bio}
						onChange={handleInputChange}
						disabled={!isEditing}
						multiline
						rows={4}
						size="small"
						sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
					/>
				</label>
			</div>

			{error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
			{message && <p role="status" className="mb-4 text-sm text-green-700">{message}</p>}
			<div className="flex flex-row items-center justify-end gap-4 border-t border-gray-200 pt-6 max-md:flex-col">
				<button
					onClick={() => {
						if (profileData.profilePicture.startsWith("blob:")) {
							URL.revokeObjectURL(profileData.profilePicture);
						}
						setProfileData(savedProfileData);
						setPictureFile(null);
						setIsEditing(false);
						setError("");
					}}
					disabled={saving || !isEditing}
					className="rounded-lg px-4 py-2 text-sm text-gray-700 shadow transition hover:text-gray-900 disabled:opacity-50"
				>
					Cancel
				</button>
				<button
					onClick={isEditing ? handleSave : () => setIsEditing(true)}
					disabled={saving}
					className="rounded-lg px-6 py-2 text-sm text-white transition disabled:opacity-50"
					style={{ backgroundColor: "#F05658" }}
				>
					{saving ? "Saving…" : isEditing ? "Save Changes" : "Edit Information"}
				</button>
			</div>
		</div>
	);
};

function ProfileField({
	label,
	name,
	value,
	onChange,
	disabled,
}: {
	label: string;
	name: string;
	value: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled: boolean;
}) {
	return (
		<label className="block text-sm font-medium text-gray-700">
			{label}
			<TextField
				fullWidth
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
				size="small"
				sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
			/>
		</label>
	);
}

export default ProfileSettings;
