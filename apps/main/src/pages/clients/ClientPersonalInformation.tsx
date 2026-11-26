import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Briefcase, Star, User as UserIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	getApiErrorMessage,
	getRetryAfterSeconds,
	hasRetryAfter,
} from "../../utils/apiError";
import {
	getClientLanguages,
	getClientProfileInfo,
	updateClientProfileInfo,
	type ClientLanguagePreference,
	type ClientProfileInfo,
} from "../../services/client-profile.service";
import {
	getClientJobSummary,
	getRecentClientJobs,
	jobBudget,
	jobDate,
	jobStatusLabel,
	type ClientJobSummary,
} from "../../services/client-jobs.service";
import { useClientProfilePhoto } from "../../hooks/useClientProfilePhoto";
import { useAuthStore, type User } from "../../store/useAuthStore";
import type { TabContent } from "../../types";
import BannerSection from "../personalInfoSettings/BannerSection";
import TipsSidebar from "../personalInfoSettings/TipsSidebar";
import ClientProfileEditModal from "./ClientProfileEditModal";
import ClientJobHistory from "./ClientJobHistory";

type ClientTab = "Profile" | "Job History" | "Reviews";

const TAB_DATA: Record<ClientTab, TabContent> = {
	Profile: {
		title: "Tips for your profile",
		tips: [
			{ id: 1, text: "Tell freelancers about yourself or your company" },
			{ id: 2, text: "Keep your language preferences up to date" },
			{ id: 3, text: "Describe your projects clearly when posting a job" },
		],
	},
	"Job History": {
		title: "Tips for hiring",
		tips: [{ id: 1, text: "Clear project details help attract the right talent" }],
	},
	Reviews: {
		title: "Reviews",
		tips: [{ id: 1, text: "Good communication helps build successful collaborations" }],
	},
};

const ClientTabNav: React.FC<{
	activeTab: ClientTab;
	setActiveTab: (tab: ClientTab) => void;
}> = ({ activeTab, setActiveTab }) => {
	const tabs: { name: ClientTab; icon: React.ReactNode }[] = [
		{ name: "Profile", icon: <UserIcon size={18} /> },
		{ name: "Job History", icon: <Briefcase size={18} /> },
		{ name: "Reviews", icon: <Star size={18} /> },
	];
	return (
		<nav className='flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 p-2 sm:p-3 bg-white border border-gray-100 rounded-xl shadow-sm mb-6'>
			{tabs.map((tab) => (
				<button
					key={tab.name}
					type='button'
					onClick={() => setActiveTab(tab.name)}
					className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-xs sm:text-sm font-medium whitespace-nowrap ${
						activeTab === tab.name ? "bg-purple text-white" : "text-gray-500 hover:bg-gray-50"
					}`}
				>
					{tab.icon}
					{tab.name}
				</button>
			))}
		</nav>
	);
};

const ClientBasicInfo: React.FC<{
	user: User | null;
	languages: ClientLanguagePreference[];
	languageLoading: boolean;
	languageError: boolean;
	profile: ClientProfileInfo | undefined;
	profileLoading: boolean;
	profileError: boolean;
	jobSummary: ClientJobSummary | undefined;
	jobSummaryLoading: boolean;
	jobSummaryError: boolean;
	verificationStatus: string | undefined;
	verificationLoading: boolean;
	verificationError: boolean;
}> = ({ user, languages, languageLoading, languageError, profile, profileLoading, profileError, jobSummary, jobSummaryLoading, jobSummaryError, verificationStatus, verificationLoading, verificationError }) => {
	const joined = user?.createdAt ? new Date(user.createdAt) : null;
	const memberSince = joined && !Number.isNaN(joined.getTime())
		? new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric", timeZone: "UTC" }).format(joined)
		: "Not available yet";
	const status = verificationStatus?.trim();
	const items = [
		{ label: "Location", value: user?.country || "Not provided" },
		{ label: "Language", value: languageLoading ? "Loading saved languages..." : languageError ? "Could not load saved languages" : languages.length ? languages.map((language) => `${language.language} (${language.proficiency_level})`).join(", ") : "No saved language preferences" },
		{ label: "Account type", value: profileLoading ? "Loading..." : profileError ? "Could not load profile" : profile?.clientType === "Individual_Client" ? "Individual" : profile?.clientType === "Company_Client" ? "Company" : "Not available yet" },
		{ label: "Member since", value: memberSince },
		{ label: "Jobs posted", value: jobSummaryLoading ? "Loading..." : jobSummaryError ? "Could not load" : jobSummary ? String(jobSummary.total_posted) : "Not available yet" },
		{ label: "Jobs completed", value: jobSummaryLoading ? "Loading..." : jobSummaryError ? "Could not load" : jobSummary ? String(jobSummary.total_completed) : "Not available yet" },
		{ label: "Client rating", value: "Not available yet" },
		{ label: "Verification status", value: verificationLoading ? "Loading..." : verificationError ? "Could not load status" : status ? status.replace(/[_-]+/g, " ").replace(/^\w/, (first) => first.toUpperCase()) : "Not available yet" },
	];
	return (
		<div className='w-full lg:w-full pr-0 border-none lg:border-r lg:border-gray-200 mb-6 lg:mb-0 flex-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-3 relative shadow-sm'>
			{items.map((item) => (
				<div className='mb-4' key={item.label}>
					<p className='text-xs text-gray-500'>{item.label}</p>
					<p className='text-sm text-gray-900 font-medium'>{item.value}</p>
				</div>
			))}
		</div>
	);
};

interface ClientAboutSectionProps {
	user: User | null;
	phoneNumber: string;
	languages: ClientLanguagePreference[];
	isLoading: boolean;
	languageError: boolean;
	profile: ClientProfileInfo | undefined;
	profileLoading: boolean;
	profileError: boolean;
}

const ClientAboutSection: React.FC<ClientAboutSectionProps> = ({
	user,
	phoneNumber,
	languages,
	isLoading,
	languageError,
	profile,
	profileLoading,
	profileError,
}) => (
	<div className='flex-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-3 relative shadow-sm'>
		<section className='mb-8 sm:mb-10'>
			<h2 className='text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 sm:mb-6'>
				About Me
			</h2>
			<div className='space-y-3 sm:space-y-4 text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl'>
				{profile?.clientType !== "Company_Client" && <p>Professional title: {profileLoading ? "Loading..." : profileError ? "Could not load profile" : profile?.clientType === "Individual_Client" ? profile.info.title || "Not provided" : "Not provided"}</p>}
				<p>{profile?.clientType === "Company_Client" ? "Company description" : "Biography"}: {profileLoading ? "Loading..." : profileError ? "Could not load profile" : (profile?.clientType === "Individual_Client" ? profile.info.about_you : profile?.info.company_description) || "Not provided"}</p>
				<p>{profile?.clientType === "Company_Client" ? "Company website" : "Website"}: {profileLoading ? "Loading..." : profileError ? "Could not load profile" : (profile?.clientType === "Individual_Client" ? profile.info.website : profile?.info.company_website) || "Not provided"}</p>
				{profile?.clientType === "Company_Client" && (
					<>
						<p>Company name: {profile.info.company_name || "Not provided"}</p>
						<p>Company size: {profile.info.company_size}</p>
						<p>Industry: {profile.info.company_industry || "Not provided"}</p>
					</>
				)}
				<p>Email: {user?.email || "Not provided"}</p>
				<p>Phone: {phoneNumber || "Not provided"}</p>
				<p>Country: {user?.country || "Not provided"}</p>
				<button
					type='button'
					disabled
					className='text-purple-700 font-semibold hover:underline'
					title='More biography details are unavailable'
				>
					Read More...
				</button>
			</div>
		</section>

		<div className='grid grid-cols-1 md:grid-cols-[minmax(0,75px)_1fr_minmax(0,80px)] gap-4 sm:gap-2 md:gap-3 pt-6 sm:pt-8 border-t border-gray-50 items-start'>
			<div className='w-20 sm:w-20'>
				<span className='text-xs text-gray-400 block mb-2'>Account type</span>
				<span className='text-base sm:text-sm font-bold text-gray-800'>
					{profileLoading ? "Loading..." : profileError ? "Could not load profile" : profile?.clientType === "Individual_Client" ? "Individual" : profile?.clientType === "Company_Client" ? "Company" : "Not available yet"}
				</span>
			</div>

			<div className='relative'>
				<div className='flex justify-between items-center'>
					<span className='text-xs text-gray-400 block mb-2 sm:mb-3'>
						Website
					</span>
				</div>
				<p className='text-xs text-gray-500'>
					{profileLoading ? "Loading..." : profileError ? "Could not load profile" : (profile?.clientType === "Individual_Client" ? profile.info.website : profile?.info.company_website) || "Not provided"}
				</p>
			</div>

			<div className='w-20 sm:w-20'>
				<span className='text-xs text-gray-400 block mb-2'>Language</span>
				{isLoading ? (
					<span className='text-xs text-gray-500'>Loading...</span>
				) : languageError ? (
					<span className='text-xs text-gray-500'>
						Could not load saved languages
					</span>
				) : languages.length > 0 ? (
					<div className='flex flex-wrap gap-1'>
						{languages.map((language) => (
							<span
								key={language.language}
								className='text-xs font-bold text-gray-800'
							>
								{language.language} ({language.proficiency_level})
							</span>
						))}
					</div>
				) : (
					<span className='text-xs text-gray-500'>
						No saved language preferences
					</span>
				)}
			</div>
		</div>
	</div>
);

interface UnavailableSectionProps {
	title: string;
	message: string;
}

const UnavailableSection: React.FC<UnavailableSectionProps> = ({
	title,
	message,
}) => (
	<div className='flex-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-3 relative shadow-sm'>
		<div className='flex items-center justify-between mb-2'>
			<h3 className='text-base font-semibold text-gray-800'>{title}</h3>
		</div>
		<p className='text-sm text-gray-500'>{message}</p>
	</div>
);

const isRetryableJobFailure = (error: unknown): boolean => {
	if (!error || typeof error !== "object") return Boolean(error);
	const status = (error as { status?: number }).status;
	return status !== 401 && status !== 403;
};

const ClientPersonalInformation: React.FC = () => {
	const user = useAuthStore((state) => state.user);
	const clientUserId = user?.userType === "Client" ? user.id : undefined;
	const queryClient = useQueryClient();
	const profileQuery = useQuery({
		queryKey: ["client-profile-info", clientUserId],
		queryFn: getClientProfileInfo,
		enabled: Boolean(clientUserId),
		staleTime: 60_000,
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	const { verification, photo } = useClientProfilePhoto(
		clientUserId,
		user?.avatar,
	);
	const languageQuery = useQuery({
		queryKey: ["client-languages", clientUserId],
		queryFn: getClientLanguages,
		enabled: Boolean(clientUserId),
		staleTime: 60_000,
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	const jobSummaryQuery = useQuery({
		queryKey: ["client-job-summary", clientUserId],
		queryFn: getClientJobSummary,
		enabled: Boolean(clientUserId),
		staleTime: 60_000,
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	const recentJobsQuery = useQuery({
		queryKey: ["client-recent-jobs", clientUserId],
		queryFn: getRecentClientJobs,
		enabled: Boolean(clientUserId),
		staleTime: 60_000,
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	const location = useLocation();
	const navigate = useNavigate();
	const navigationState = location.state as { activeTab?: unknown; jobNotice?: unknown } | null;
	const [activeTab, setActiveTab] = useState<ClientTab>(navigationState?.activeTab === "Job History" ? "Job History" : "Profile");
	const [jobNotice, setJobNotice] = useState<string | null>(
		navigationState?.jobNotice === "Draft saved." || navigationState?.jobNotice === "Job posted successfully."
			? navigationState.jobNotice : null,
	);
	useEffect(() => {
		if (navigationState?.activeTab === "Job History") {
			navigate(location.pathname, { replace: true, state: null });
		}
	}, [location.pathname, navigate, navigationState]);
	const [isEditing, setIsEditing] = useState(false);
	const saveInFlight = useRef(false);
	const saveProfile = useMutation({
		mutationFn: updateClientProfileInfo,
		retry: false,
		onSuccess: (updatedProfile) => {
			queryClient.setQueryData(["client-profile-info", clientUserId], updatedProfile);
			setIsEditing(false);
		},
		onSettled: () => { saveInFlight.current = false; },
	});
	const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
	const [retryAfterRemaining, setRetryAfterRemaining] = useState(0);
	const languages: ClientLanguagePreference[] =
		languageQuery.data?.languages ?? [];
	const verificationInfo = verification.data;
	const registeredPhone = verificationInfo?.phone ?? "";
	const isIdentityVerified =
		verificationInfo?.identity_verification_status
			.trim()
			.toLowerCase() === "verified";
	const isLoading =
		profileQuery.isPending ||
		languageQuery.isPending ||
		verification.isPending ||
		(Boolean(verificationInfo) && photo.isPending);
	const languageError = languageQuery.error
		? getApiErrorMessage(
				languageQuery.error,
				"Could not load your saved languages.",
			)
		: "";
	const verificationError = verification.error
		? getApiErrorMessage(
				verification.error,
				"Could not load your personal information.",
			)
		: "";
	const photoError = photo.error
		? getApiErrorMessage(
				photo.error,
				"Could not load your saved profile photo.",
			)
		: "";
	const profileError = profileQuery.error
		? getApiErrorMessage(profileQuery.error, "Could not load your profile details.")
		: "";
	const jobSummaryError = jobSummaryQuery.error
		? getApiErrorMessage(jobSummaryQuery.error, "Could not load your job statistics.")
		: "";
	const recentJobsError = recentJobsQuery.error
		? getApiErrorMessage(recentJobsQuery.error, "Could not load your recent jobs.")
		: "";
	const error = Array.from(
		new Set([profileError, languageError, verificationError, photoError, jobSummaryError, recentJobsError].filter(Boolean)),
	).join(" ");
	const retryAfterSeconds = Math.max(
		getRetryAfterSeconds(languageQuery.error),
		getRetryAfterSeconds(verification.error),
		getRetryAfterSeconds(photo.error),
		getRetryAfterSeconds(profileQuery.error),
		getRetryAfterSeconds(saveProfile.error),
		getRetryAfterSeconds(jobSummaryQuery.error),
		getRetryAfterSeconds(recentJobsQuery.error),
	);
	const rateLimitErrors = [
		languageQuery.error,
		verification.error,
		photo.error,
		profileQuery.error,
		saveProfile.error,
		jobSummaryQuery.error,
		recentJobsQuery.error,
	].filter((requestError) => {
		if (!requestError || typeof requestError !== "object") return false;
		return (requestError as { status?: number }).status === 429;
	});
	const retryUnavailable = rateLimitErrors.some(
		(requestError) => !hasRetryAfter(requestError),
	);
	const retryBlocked = retryAfterRemaining > 0 || retryUnavailable;

	useEffect(() => {
		const photoBlob = photo.data;
		if (!photoBlob) {
			setProfilePhoto(null);
			return;
		}
		const objectUrl = URL.createObjectURL(photoBlob);
		setProfilePhoto(objectUrl);
		return () => {
			URL.revokeObjectURL(objectUrl);
		};
	}, [photo.data]);

	useEffect(() => {
		if (retryAfterSeconds <= 0) {
			setRetryAfterRemaining(0);
			return;
		}
		setRetryAfterRemaining(retryAfterSeconds);
		const timer = window.setInterval(() => {
			setRetryAfterRemaining((remaining) => Math.max(0, remaining - 1));
		}, 1000);
		return () => window.clearInterval(timer);
	}, [
		languageQuery.errorUpdatedAt,
		photo.errorUpdatedAt,
		profileQuery.errorUpdatedAt,
		jobSummaryQuery.errorUpdatedAt,
		recentJobsQuery.errorUpdatedAt,
		saveProfile.submittedAt,
		retryAfterSeconds,
		verification.errorUpdatedAt,
	]);

	const retryRequests = () => {
		if (retryBlocked) return;
		if (languageQuery.isError) void languageQuery.refetch();
		if (profileQuery.isError) void profileQuery.refetch();
		if (verification.isError) void verification.refetch();
		if (verification.isSuccess && photo.isError) void photo.refetch();
		if (jobSummaryQuery.isError && isRetryableJobFailure(jobSummaryQuery.error)) void jobSummaryQuery.refetch();
		if (recentJobsQuery.isError && isRetryableJobFailure(recentJobsQuery.error)) void recentJobsQuery.refetch();
	};

	const fullName = [user?.firstName, user?.lastName]
		.filter(Boolean)
		.join(" ");
	const phoneNumber =
		[user?.countryCode, user?.phoneNumber].filter(Boolean).join(" ") ||
		registeredPhone;
	const profileCardClass = 'w-full sm:w-48 bg-white border border-gray-200 rounded-xl shadow p-2 flex items-center justify-between mb-3 sm:mb-0 text-left';
	const profileCardContent = (title: string, description: string) => (
		<>
			<div>
				<h2 className='text-sm font-semibold text-gray-900'>{title}</h2>
				<p className='text-gray-500 text-xs'>{description}</p>
			</div>
			<span className='text-purple bg-white rounded-full p-1 border border-purple w-5 h-5 flex items-center justify-center'>
				<ArrowRight className='w-5 h-5 text-center' />
			</span>
		</>
	);

	return (
		<div className='min-h-screen bg-white'>
			{jobNotice && <div role='status' className='fixed right-4 top-24 z-50 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800'>{jobNotice} <button type='button' className='ml-2 underline' onClick={() => setJobNotice(null)}>Dismiss</button></div>}
			<BannerSection
				profilePhotoSrc={profilePhoto}
				profilePhotoAlt={fullName || "Client profile"}
				profilePhotoFallback={[user?.firstName?.[0], user?.lastName?.[0]]
					.filter(Boolean)
					.join("")
					.toUpperCase()}
				showVerifiedBadge={isIdentityVerified}
			/>
			<div className='flex flex-col lg:flex-row gap-6 lg:gap-3 px-4 lg:px-20 pb-8 lg:pb-12'>
				<div className='w-full lg:w-1/5 mb-6 lg:mb-0'>
					<ClientBasicInfo
						user={user}
						languages={languages}
						languageLoading={languageQuery.isPending}
						languageError={Boolean(languageError)}
						profile={profileQuery.data}
						profileLoading={profileQuery.isPending}
						profileError={profileQuery.isError}
						jobSummary={jobSummaryQuery.data}
						jobSummaryLoading={jobSummaryQuery.isPending}
						jobSummaryError={jobSummaryQuery.isError}
						verificationStatus={verificationInfo?.identity_verification_status}
						verificationLoading={verification.isPending}
						verificationError={verification.isError}
					/>
				</div>
				<div className='w-full lg:w-4/5 flex flex-col gap-2'>
					<div className='flex sm:flex-row sm:items-center flex-col justify-between gap-4'>
						<div className='flex flex-col items-start gap-2'>
							<h1 className='text-xl sm:text-2xl font-bold text-gray-900'>
								{fullName || "Name not provided"}
							</h1>
							<p className='text-gray-500 text-sm'>
								Client{profileQuery.data?.clientType === "Individual_Client" && profileQuery.data.info.title ? ` · ${profileQuery.data.info.title}` : ""}
							</p>
						</div>
						<button
							type='button'
							disabled={!profileQuery.data}
							onClick={() => setIsEditing(true)}
							className='bg-transparent text-purple px-4 py-2 rounded-lg font-medium border border-purple transition mt-4 sm:mt-0'
						>
							Edit Profile
						</button>
					</div>

					{isLoading && (
						<p className='text-sm text-gray-600' role='status'>
							Loading your profile...
						</p>
					)}
					{error && (
						<div
							role='alert'
							className='rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700'
						>
							{error}
							{(profileError || languageError || verificationError || photoError ||
								(jobSummaryError && isRetryableJobFailure(jobSummaryQuery.error)) ||
								(recentJobsError && isRetryableJobFailure(recentJobsQuery.error))) && (
								<button
									type='button'
									onClick={retryRequests}
									disabled={retryBlocked}
									className='ml-2 underline'
								>
									{retryAfterRemaining > 0
										? `Retry in ${retryAfterRemaining}s`
										: retryUnavailable
											? "Retry unavailable"
											: "Retry"}
								</button>
							)}
						</div>
					)}
					<div className='flex flex-col sm:flex-row gap-4 mt-6'>
						<Link to='/clients/post-a-job' className={profileCardClass}>
							{profileCardContent("Post a Job", "Describe your next project")}
						</Link>
						<Link to='/clients' className={profileCardClass}>
							{profileCardContent("Find Talent", "Explore available talent")}
						</Link>
						<button type='button' className={profileCardClass} disabled={!profileQuery.data} onClick={() => setIsEditing(true)}>
							{profileCardContent("Update Profile", "Keep your details up to date")}
						</button>
					</div>

					<ClientTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

					<div className='flex flex-col'>
						<div className='flex-1'>
							{activeTab === "Profile" && (
								<>
									<div className='flex flex-col-reverse lg:flex-row gap-4 lg:gap-3'>
										<div className='w-full lg:w-auto order-1 lg:order-2'>
											<TipsSidebar
												title={TAB_DATA[activeTab].title}
												tips={TAB_DATA[activeTab].tips}
											/>
										</div>
										<ClientAboutSection
											user={user}
											phoneNumber={phoneNumber}
											languages={languages}
											isLoading={languageQuery.isPending}
											languageError={Boolean(languageError)}
											profile={profileQuery.data}
											profileLoading={profileQuery.isPending}
											profileError={profileQuery.isError}
										/>
									</div>
									<div className='mt-6'>
										<UnavailableSection
											title='Hiring Interests'
											message='Hiring interests are not available yet.'
										/>
									</div>
									<div className='mt-6'>
										<div className='flex-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-3 relative shadow-sm'>
											<div className='flex items-center justify-between mb-4'>
												<h3 className='text-base font-semibold text-gray-800'>
													Recent Jobs
												</h3>
											</div>
											<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
												{recentJobsQuery.isPending ? (
													<p role='status' className='text-sm text-gray-500'>Loading recent jobs...</p>
												) : recentJobsQuery.isError ? (
													<p className='text-sm text-gray-500'>Could not load recent jobs.</p>
												) : recentJobsQuery.data.length === 0 ? (
													<div className='bg-transparent border border-gray-light rounded-lg p-4 flex flex-col relative shadow-sm'>
														<p className='text-sm text-gray-500'>You haven't posted any jobs yet.</p>
														<Link to='/clients/post-a-job' className='mt-2 text-sm text-purple underline'>Post a Job</Link>
													</div>
												) : recentJobsQuery.data.map((job) => (
													<article key={job.id} className='bg-transparent border border-gray-light rounded-lg p-4 flex flex-col relative shadow-sm'>
														<h4 className='text-sm font-semibold text-gray-800 break-words'>{job.title}</h4>
														<p className='mt-2 text-sm text-gray-500'>{jobStatusLabel(job.status)}</p>
														<p className='mt-2 text-sm text-gray-500'>{jobBudget(job)}</p>
														<p className='mt-2 text-xs text-gray-500'>Posted {jobDate(job.created_at)}</p>
													</article>
												))}
											</div>
										</div>
									</div>
								</>
							)}
							{activeTab === "Job History" && (
								<div className='flex flex-col-reverse lg:flex-row gap-6 mt-6'>
									<div className='w-full lg:w-auto order-1 lg:order-2'>
										<TipsSidebar
											title={TAB_DATA[activeTab].title}
											tips={TAB_DATA[activeTab].tips}
										/>
									</div>
									{retryBlocked ? (
										<p role='status' className='flex-1 text-sm text-gray-500'>
											{retryAfterRemaining > 0 ? `Please wait ${retryAfterRemaining}s before loading job history.` : "Please wait before loading job history."}
										</p>
									) : clientUserId && <ClientJobHistory userId={clientUserId} />}
								</div>
							)}
							{activeTab === "Reviews" && (
								<div className='flex flex-col-reverse lg:flex-row gap-6 mt-6'>
									<div className='w-full lg:w-auto order-1 lg:order-2'>
										<TipsSidebar
											title={TAB_DATA[activeTab].title}
											tips={TAB_DATA[activeTab].tips}
										/>
									</div>
									<div className='flex-1 max-w-3xl bg-white font-sans border border-gray-100 rounded-2xl p-4 shadow-sm'>
										<p className='text-sm text-gray-500'>
											Client reviews are not available yet.
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				{isEditing && profileQuery.data && (
					<ClientProfileEditModal
						profile={profileQuery.data}
						onClose={() => setIsEditing(false)}
						onSave={(updatedProfile) => {
							if (saveInFlight.current || retryBlocked) return;
							saveInFlight.current = true;
							saveProfile.mutate(updatedProfile);
						}}
						isSaving={saveProfile.isPending}
						saveBlocked={retryBlocked}
						error={
							saveProfile.error
								? getApiErrorMessage(saveProfile.error, "Could not save your profile.")
								: retryBlocked
									? retryAfterRemaining > 0
										? `Too many attempts. Please try again in ${retryAfterRemaining} seconds.`
										: "Too many attempts. Please wait before trying again."
									: ""
						}
					/>
				)}
			</div>
		</div>
	);
};

export default ClientPersonalInformation;
