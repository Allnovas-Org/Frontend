import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, IconButton } from "@mui/material";
import { Close, Star, Message, WorkOutline } from "@mui/icons-material";
import { ApiReview, listReviews } from "../../../../services/feedback.service";
import { getApiErrorMessage } from "../../../../utils/apiError";

interface FreelancerInformationOverlayProps {
	open: boolean;
	onClose: () => void;
	freelancer: {
		id: string;
		name: string;
		title: string;
		profileImage: string;
		rating: number | null;
		jobCount: number;
		hourlyRate: number | null;
		currency?: string | null;
		yearsExperience?: number;
		about: string;
		skills: string[];
		portfolio?: {
			id: string;
			title: string;
			description: string;
			url: string;
			skills: string[];
		}[];
	};
	isSaved?: boolean;
	onToggleSave?: (id: string) => void;
}

const FreelancerInformationOverlay: React.FC<
	FreelancerInformationOverlayProps
> = ({ open, onClose, freelancer, isSaved = false, onToggleSave }) => {
	const portfolio = freelancer.portfolio ?? [];
	const [activeTab, setActiveTab] = useState<
		"about" | "portfolio" | "experience" | "reviews"
	>("about");
	const [reviews, setReviews] = useState<ApiReview[]>([]);
	const [reviewError, setReviewError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!open || activeTab !== "reviews") return;
		let active = true;
		listReviews(freelancer.id)
			.then((items) => {
				if (active) setReviews(items);
			})
			.catch((error: unknown) => {
				if (active) {
					setReviewError(
						getApiErrorMessage(error, "Unable to load reviews."),
					);
				}
			});
		return () => {
			active = false;
		};
	}, [activeTab, freelancer.id, open]);

	const tabs = [
		{ id: "about", label: "About" },
		{ id: "portfolio", label: "Portfolio" },
		{ id: "experience", label: "Experience" },
		{ id: "reviews", label: "Reviews" },
	] as const;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			PaperProps={{ sx: { borderRadius: 3, maxHeight: "90vh" } }}
		>
			<div className="p-8">
				<div className="mb-6 flex items-start justify-between">
					<div className="flex items-start gap-4">
						{freelancer.profileImage ? (
							<img
								src={freelancer.profileImage}
								alt={freelancer.name}
								className="h-20 w-20 rounded-full object-cover"
							/>
						) : (
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl font-semibold">
								{freelancer.name.slice(0, 1).toUpperCase()}
							</div>
						)}
						<div>
							<h2 className="mb-1 text-2xl font-semibold">{freelancer.name}</h2>
							<p className="mb-2 text-gray-600">{freelancer.title || "Freelancer"}</p>
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<Star sx={{ fontSize: 16, color: "#fbbf24" }} />
								<span>
									{freelancer.rating === null
										? "No reviews yet"
										: `${freelancer.rating}/5 (${freelancer.jobCount} reviews)`}
								</span>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<IconButton
							onClick={() => onToggleSave?.(freelancer.id)}
							aria-label={isSaved ? "Unsave freelancer" : "Save freelancer"}
						>
							<span className={isSaved ? "text-red-500" : "text-gray-400"}>
								{isSaved ? "♥" : "♡"}
							</span>
						</IconButton>
						<IconButton onClick={onClose} aria-label="Close profile">
							<Close />
						</IconButton>
					</div>
				</div>

				<div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
					<div className="rounded-lg bg-gray-50 p-4">
						<h3 className="mb-1 text-xl font-bold">
							{freelancer.hourlyRate === null
								? "Not provided"
								: `${freelancer.currency || "USD"} ${freelancer.hourlyRate.toFixed(2)}`}
						</h3>
						<p className="text-sm text-gray-600">Hourly rate</p>
					</div>
					<div className="rounded-lg bg-gray-50 p-4">
						<h3 className="mb-1 text-xl font-bold">{freelancer.yearsExperience ?? "Not provided"}</h3>
						<p className="text-sm text-gray-600">Years of experience</p>
					</div>
					<div className="rounded-lg bg-gray-50 p-4">
						<h3 className="mb-1 text-xl font-bold">{freelancer.portfolio ? portfolio.length : "Not provided"}</h3>
						<p className="text-sm text-gray-600">Portfolio items</p>
					</div>
				</div>

				<div className="mb-6 border-b border-gray-200">
					<div className="flex gap-8">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`relative pb-4 font-medium transition-colors ${
									activeTab === tab.id
										? "text-gray-900"
										: "text-gray-500 hover:text-gray-700"
								}`}
							>
								{tab.label}
								{activeTab === tab.id ? (
									<span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900" />
								) : null}
							</button>
						))}
					</div>
				</div>

				<div className="mb-8 max-h-96 overflow-y-auto">
					{activeTab === "about" ? (
						<div>
							<h3 className="mb-4 text-xl font-semibold">About {freelancer.name}</h3>
							<p className="mb-6 whitespace-pre-wrap leading-relaxed text-gray-700">
								{freelancer.about || "No profile summary provided."}
							</p>
							<h4 className="mb-3 font-semibold">Skills</h4>
							<div className="flex flex-wrap gap-2">
								{freelancer.skills.map((skill) => (
									<span key={skill} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
										{skill}
									</span>
								))}
							</div>
						</div>
					) : null}
					{activeTab === "portfolio" ? (
						portfolio.length ? (
							<div className="space-y-4">
								{portfolio.map((item) => (
									<article key={item.id} className="rounded-lg border border-gray-200 p-4">
										<h3 className="font-semibold">{item.title}</h3>
										<p className="mt-2 text-sm text-gray-600">{item.description}</p>
										<a
											href={item.url}
											target="_blank"
											rel="noreferrer"
											className="mt-2 inline-block text-sm text-red-600 underline"
										>
											View portfolio item
										</a>
									</article>
								))}
							</div>
						) : (
							<p className="py-12 text-center text-gray-500">No portfolio items yet.</p>
						)
					) : null}
					{activeTab === "experience" ? (
						<p className="py-12 text-center text-gray-500">
							{freelancer.yearsExperience === undefined
								? "Experience not provided"
								: `${freelancer.yearsExperience} years of experience`}
						</p>
					) : null}
					{activeTab === "reviews" ? (
						reviewError ? (
							<p role="alert" className="py-8 text-center text-red-600">{reviewError}</p>
						) : reviews.length ? (
							<div className="space-y-4">
								{reviews.map((review) => (
									<article key={review.id} className="rounded-lg border border-gray-200 p-4">
										<p className="font-medium">{review.reviewer_name} · {review.rating}/5</p>
										<p className="mt-2 text-sm text-gray-700">{review.comment}</p>
									</article>
								))}
							</div>
						) : (
							<p className="py-12 text-center text-gray-500">No reviews yet.</p>
						)
					) : null}
				</div>

				<div className="inline-flex w-full justify-between gap-4">
					<button
						onClick={onClose}
						className="rounded-lg border-2 border-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
					>
						Close
					</button>
					<div className="flex gap-4">
						<button
							disabled
							title="Start a conversation from an open job"
							className="flex items-center justify-center gap-2 rounded-lg border-2 border-red-500 px-6 py-3 font-medium text-red-500 disabled:opacity-50"
						>
							<Message sx={{ fontSize: 20 }} />
							Message
						</button>
						<button
							onClick={() => {
								onClose();
								navigate("/clients/post-a-job");
							}}
							className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-6 py-3 font-medium text-white hover:bg-red-600"
						>
							<WorkOutline sx={{ fontSize: 20 }} />
							Post a Job
						</button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default FreelancerInformationOverlay;
