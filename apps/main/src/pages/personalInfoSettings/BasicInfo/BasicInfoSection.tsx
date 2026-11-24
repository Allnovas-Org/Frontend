import React, { useEffect, useState } from "react";
import {
	FreelancerProfile,
	getCurrentUserSettings,
	getFreelancerProfile,
} from "../../../services/profile.service";
import { getApiErrorMessage } from "../../../utils/apiError";

const BasicInfoSection: React.FC = () => {
	const [country, setCountry] = useState("");
	const [profile, setProfile] = useState<FreelancerProfile | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		Promise.all([getCurrentUserSettings(), getFreelancerProfile()])
			.then(([account, freelancer]) => {
				if (!active) return;
				setCountry(account.country);
				setProfile(freelancer);
			})
			.catch((requestError: unknown) => {
				if (active) setError(getApiErrorMessage(requestError, "Unable to load profile details."));
			});
		return () => {
			active = false;
		};
	}, []);

	const languages = Array.isArray(profile?.lang)
		? profile.lang
				.map((language) => {
					if (typeof language === "string") return language;
					if (language && typeof language === "object" && "language" in language) {
						return String(language.language);
					}
					return "";
				})
				.filter(Boolean)
		: [];

	return (
		<div className="relative mb-6 w-full flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:mb-0 lg:w-full lg:border-r lg:border-gray-200 lg:pr-4">
			<div className="mb-4">
				<p className="text-xs text-gray-500">Location</p>
				<p className="text-sm font-medium text-gray-900">{country || "Not provided"}</p>
			</div>
			<div className="mb-4">
				<p className="text-xs text-gray-500">Languages</p>
				<p className="text-sm font-medium text-gray-900">
					{languages.length ? languages.join(", ") : "Not provided"}
				</p>
			</div>
			<div className="mb-4">
				<p className="text-xs text-gray-500">Experience</p>
				<p className="text-sm font-medium text-gray-900">
					{profile ? `${profile.yoe} ${profile.yoe === 1 ? "year" : "years"}` : "Loading…"}
				</p>
			</div>
			<div className="mb-4">
				<p className="text-xs text-gray-500">Specializations</p>
				<p className="text-sm font-medium text-gray-900">
					{profile?.spa?.length ? profile.spa.join(", ") : "Not provided"}
				</p>
			</div>
			<div className="mb-4">
				<p className="text-xs text-gray-500">Education</p>
				{profile?.education?.length ? (
					profile.education.map((education) => (
						<div key={education.id} className="mt-2">
							<p className="text-sm font-medium text-gray-900">{education.name || "Institution not provided"}</p>
							<p className="text-xs text-gray-500">{education.degree || "Degree not provided"}</p>
						</div>
					))
				) : (
					<p className="text-sm font-medium text-gray-900">Not provided</p>
				)}
			</div>
			{error && <p role="alert" className="text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default BasicInfoSection;
