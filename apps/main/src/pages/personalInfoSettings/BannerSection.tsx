import React, { useEffect, useState } from "react";
import {
	getCurrentUserSettings,
	getFreelancerProfile,
	getMediaUrl,
} from "../../services/profile.service";
import { getApiErrorMessage } from "../../utils/apiError";
import userPlaceholder from "../../assets/applicants/user.png";

const BannerSection: React.FC = () => {
	const [profilePicture, setProfilePicture] = useState(userPlaceholder);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		Promise.all([getCurrentUserSettings(), getFreelancerProfile()])
			.then(([account, freelancer]) => {
				if (!active) return;
				setProfilePicture(
					getMediaUrl(account.profile_picture) ||
						getMediaUrl(freelancer.profile_photo) ||
						userPlaceholder,
				);
			})
			.catch((requestError: unknown) => {
				if (active) setError(getApiErrorMessage(requestError, "Unable to load your profile photo."));
			});
		return () => {
			active = false;
		};
	}, []);

	return (
		<div className="w-full">
			<div className="relative w-full">
				<img
					src="/images/applicants/prof-banner.png"
					alt="Profile banner"
					className="h-40 w-full object-cover sm:h-60"
				/>
			</div>
			<div className="-mt-16 flex flex-col gap-6 px-4 md:flex-row md:gap-8 md:px-20">
				<div className="mb-4 flex w-full min-w-[8rem] flex-col items-center md:mb-0 md:w-1/5">
					<img
						src={profilePicture}
						alt="Profile"
						className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover shadow sm:h-32 sm:w-32"
					/>
				</div>
			</div>
			{error && <p role="alert" className="sr-only">{error}</p>}
		</div>
	);
};

export default BannerSection;
