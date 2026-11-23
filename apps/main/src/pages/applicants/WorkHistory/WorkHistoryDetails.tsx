import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, FileText, Star } from "lucide-react";
import {
	ApiMilestone,
	ApiProject,
	getProject,
	updateMilestoneStatus,
} from "../../../services/projects.service";
import {
	ApiReview,
	createDispute,
	createReview,
	listReviews,
} from "../../../services/feedback.service";
import { useAuthStore } from "../../../store/useAuthStore";
import { getApiErrorMessage } from "../../../utils/apiError";

const WorkHistoryDetails: React.FC = () => {
	const { id = "" } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.user);
	const [project, setProject] = useState<ApiProject | null>(null);
	const [review, setReview] = useState<ApiReview | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [busyMilestone, setBusyMilestone] = useState<number | null>(null);
	const [reviewRating, setReviewRating] = useState(5);
	const [reviewComment, setReviewComment] = useState("");
	const [disputeReason, setDisputeReason] = useState("");
	const [disputeDescription, setDisputeDescription] = useState("");
	const [feedbackMessage, setFeedbackMessage] = useState("");
	const [feedbackError, setFeedbackError] = useState("");

	useEffect(() => {
		let active = true;
		setLoading(true);
		setError("");
		getProject(id)
			.then(async (result) => {
				if (!active) return;
				setProject(result);
				if (result.status === "completed" && user?.id) {
					const reviews = await listReviews(result.client);
					if (active) {
						setReview(
							reviews.find(
								(item) => item.project === result.id && item.reviewer === user.id,
							) || null,
						);
					}
				}
			})
			.catch((requestError: unknown) => {
				if (active) setError(getApiErrorMessage(requestError, "Unable to load this project."));
			})
			.finally(() => {
				if (active) setLoading(false);
			});
		return () => {
			active = false;
		};
	}, [id, user?.id]);

	const changeMilestoneStatus = async (
		milestone: ApiMilestone,
		status: ApiMilestone["status"],
	) => {
		setBusyMilestone(milestone.id);
		setFeedbackError("");
		try {
			const updated = await updateMilestoneStatus(milestone.id, status);
			setProject((current) =>
				current?.contract
					? {
							...current,
							contract: {
								...current.contract,
								milestones: current.contract.milestones.map((item) =>
									item.id === updated.id ? updated : item,
								),
							},
						}
					: current,
			);
		} catch (requestError) {
			setFeedbackError(
				getApiErrorMessage(requestError, "Unable to update the milestone."),
			);
		} finally {
			setBusyMilestone(null);
		}
	};

	const submitReview = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!project) return;
		setFeedbackError("");
		setFeedbackMessage("");
		try {
			const result = await createReview({
				project: project.id,
				rating: reviewRating,
				comment: reviewComment,
			});
			setReview(result);
			setFeedbackMessage("Your review was submitted.");
		} catch (requestError) {
			setFeedbackError(getApiErrorMessage(requestError, "Unable to submit your review."));
		}
	};

	const submitDispute = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!project) return;
		setFeedbackError("");
		setFeedbackMessage("");
		try {
			await createDispute({
				project: project.id,
				reason: disputeReason,
				description: disputeDescription,
			});
			setDisputeReason("");
			setDisputeDescription("");
			setFeedbackMessage("Your dispute report was submitted.");
		} catch (requestError) {
			setFeedbackError(getApiErrorMessage(requestError, "Unable to report this dispute."));
		}
	};

	if (loading) {
		return <div className="min-h-screen bg-white p-8 text-center text-gray-500">Loading project…</div>;
	}

	if (error || !project) {
		return (
			<div className="min-h-screen bg-white p-8">
				<button
					onClick={() => navigate("/applicants/work-history")}
					className="mb-6 flex items-center gap-2 text-red-500 hover:text-red-600"
				>
					<ArrowLeft className="h-5 w-5" />
					Back to work history
				</button>
				<p role="alert" className="text-red-600">{error || "Project not found."}</p>
			</div>
		);
	}

	const milestones = project.contract?.milestones || [];
	const canReportDispute = !["completed", "cancelled"].includes(project.status);

	return (
		<div className="mt-20 min-h-screen bg-white px-8 py-8 md:px-16">
			<button
				onClick={() => navigate("/applicants/work-history")}
				className="mb-8 ml-2 flex items-center gap-2 text-red-500 transition-colors hover:text-red-600 md:ml-10"
			>
				<ArrowLeft className="h-4 w-4" />
				<span className="text-sm">Back to work history</span>
			</button>

			<div className="mx-auto max-w-6xl space-y-6">
				<section className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
					<div className="mb-6 flex flex-wrap items-start justify-between gap-3">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
							<p className="mt-2 text-sm text-gray-600">Client: {project.client_name}</p>
						</div>
						<span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium capitalize text-gray-700">
							{project.status.replace("_", " ")}
						</span>
					</div>
					<div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						<Info label="Contract amount">
							{project.contract
								? `${project.contract.currency} ${Number(project.contract.total_amount).toLocaleString()}`
								: "Not provided"}
						</Info>
						<Info label="Started">{formatDate(project.created_at)}</Info>
						<Info label="Last updated">{formatDate(project.updated_at)}</Info>
					</div>
					<div className="mb-6">
						<div className="mb-3 flex items-center gap-2">
							<FileText className="h-4 w-4 text-gray-700" />
							<h2 className="text-base font-semibold text-gray-900">Project description</h2>
						</div>
						<p className="whitespace-pre-wrap rounded-lg bg-gray-50 p-5 text-sm leading-relaxed text-gray-700">
							{project.description || "No project description provided."}
						</p>
					</div>
					{project.contract && (
						<div>
							<h2 className="mb-3 text-base font-semibold text-gray-900">Contract terms</h2>
							<p className="whitespace-pre-wrap text-sm text-gray-700">
								{project.contract.terms || "No contract terms provided."}
							</p>
						</div>
					)}
				</section>

				<section className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
					<div className="mb-4 flex items-center gap-2">
						<CalendarDays className="h-4 w-4 text-gray-700" />
						<h2 className="text-base font-semibold text-gray-900">Project milestones</h2>
					</div>
					{milestones.length ? (
						<div className="space-y-4">
							{milestones.map((milestone) => (
								<div
									key={milestone.id}
									className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gray-50 p-4"
								>
									<div className="flex items-start gap-3">
										<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
										<div>
											<p className="font-medium text-gray-800">{milestone.title}</p>
											<p className="mt-1 text-sm text-gray-500">
												{milestone.description || "No description"}
												{" · "}
												{project.contract?.currency}{" "}
												{Number(milestone.amount).toLocaleString()}
												{milestone.due_date ? ` · Due ${formatDate(milestone.due_date)}` : ""}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<span className="text-sm capitalize text-gray-600">
											{milestone.status.replace("_", " ")}
										</span>
										{nextMilestoneStatus(milestone) && project.status === "active" && (
											<button
												disabled={busyMilestone === milestone.id}
												onClick={() =>
													changeMilestoneStatus(milestone, nextMilestoneStatus(milestone)!)
												}
												className="rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white disabled:opacity-50"
											>
												{busyMilestone === milestone.id
													? "Updating…"
													: milestone.status === "pending"
														? "Start work"
														: "Submit work"}
											</button>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-gray-500">No milestones have been added to this contract.</p>
					)}
				</section>

				{project.status === "completed" && (
					<section className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
						<div className="mb-4 flex items-center gap-2">
							<Star className="h-4 w-4 text-gray-700" />
							<h2 className="text-base font-semibold text-gray-900">Client review</h2>
						</div>
						{review ? (
							<div className="rounded-lg bg-gray-50 p-4">
								<p className="font-medium text-gray-800">
									Your rating: {review.rating}/5
								</p>
								<p className="mt-2 whitespace-pre-wrap text-sm text-gray-600">{review.comment}</p>
							</div>
						) : (
							<form onSubmit={submitReview} className="space-y-4">
								<label className="block text-sm font-medium text-gray-700">
									Rating
									<select
										value={reviewRating}
										onChange={(event) => setReviewRating(Number(event.target.value))}
										className="mt-1 block w-full rounded-md border border-gray-300 p-2"
									>
										{[5, 4, 3, 2, 1].map((rating) => (
											<option key={rating} value={rating}>{rating} / 5</option>
										))}
									</select>
								</label>
								<label className="block text-sm font-medium text-gray-700">
									Comment
									<textarea
										required
										maxLength={2000}
										value={reviewComment}
										onChange={(event) => setReviewComment(event.target.value)}
										className="mt-1 block w-full rounded-md border border-gray-300 p-2"
										rows={4}
									/>
								</label>
								<button className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white">
									Submit review
								</button>
							</form>
						)}
					</section>
				)}

				{canReportDispute && (
					<section className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
						<h2 className="mb-4 text-base font-semibold text-gray-900">Report a project dispute</h2>
						<form onSubmit={submitDispute} className="space-y-4">
							<label className="block text-sm font-medium text-gray-700">
								Reason
								<input
									required
									maxLength={200}
									value={disputeReason}
									onChange={(event) => setDisputeReason(event.target.value)}
									className="mt-1 block w-full rounded-md border border-gray-300 p-2"
								/>
							</label>
							<label className="block text-sm font-medium text-gray-700">
								Details
								<textarea
									required
									maxLength={5000}
									value={disputeDescription}
									onChange={(event) => setDisputeDescription(event.target.value)}
									className="mt-1 block w-full rounded-md border border-gray-300 p-2"
									rows={4}
								/>
							</label>
							<button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800">
								Submit dispute report
							</button>
						</form>
					</section>
				)}

				{feedbackError && <p role="alert" className="text-sm text-red-600">{feedbackError}</p>}
				{feedbackMessage && <p role="status" className="text-sm text-green-700">{feedbackMessage}</p>}
			</div>
		</div>
	);
};

function Info({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div>
			<p className="text-xs text-gray-500">{label}</p>
			<p className="mt-1 text-sm font-semibold text-gray-900">{children}</p>
		</div>
	);
}

function formatDate(value: string) {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? "Not available" : date.toLocaleDateString();
}

function nextMilestoneStatus(
	milestone: ApiMilestone,
): ApiMilestone["status"] | null {
	if (milestone.status === "pending") return "in_progress";
	if (milestone.status === "in_progress" || milestone.status === "revision_requested") {
		return "submitted";
	}
	return null;
}

export default WorkHistoryDetails;
