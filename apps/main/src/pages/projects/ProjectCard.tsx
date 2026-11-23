import React, { useState } from "react";
import {
	MoreVertical,
	Clock,
	UsersRound,
	CircleDollarSign,
} from "lucide-react";
import { Project } from "../../types";
import { formatPostedDate } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { deleteJob } from "../../services/jobs.service";
import { getApiErrorMessage } from "../../utils/apiError";
import ActionConfirmModal from "./modal/ActionConfirmModal";
import ActionResultModal from "./modal/ActionResultModal";

interface Props {
	project: Project;
	onDeleted: () => void;
}

const ProjectCard = ({ project, onDeleted }: Props) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDeletedModal, setShowDeletedModal] = useState(false);
	const [deleteError, setDeleteError] = useState("");

	const navigate = useNavigate();

	const handleViewDetails = () => {
		setMenuOpen(false);
		navigate(`/clients/projects/${project.id}`);
	};

	const handleDeleteProject = () => {
		setMenuOpen(false);
		setShowDeleteModal(true);
	};

	const confirmDeleteProject = async () => {
		setDeleteError("");
		try {
			await deleteJob(project.id);
			setShowDeleteModal(false);
			setShowDeletedModal(true);
			onDeleted();
		} catch (error) {
			setDeleteError(getApiErrorMessage(error, "Unable to delete this job."));
		}
	};

	const handleGoToJobPostings = () => {
		setShowDeletedModal(false);
		onDeleted();
		navigate("/clients/projects");
	};

	const handlePostNewJob = () => {
		setShowDeletedModal(false);
		onDeleted();
		navigate("/clients/post-a-job");
	};

	const handleEditProject = () => {
		setMenuOpen(false);
		navigate(`/clients/edit-job/${project.id}`, {
			state: { reuseProject: project },
		});
	};

	return (
		<>
			<div className=" group border-t border-input p-5">
				<div className="flex items-start justify-between">
					<div className="flex gap-4">
						<h3 className="font-semibold group-hover:text-primary">
							{project.title}
						</h3>
						<span
							className={`mt-1 inline-block rounded-full  px-3 py-0.5 text-xs  ${
								["Active", "Open", "In Progress"].includes(project.status)
									? "bg-green-100/50 text-green-700"
									: project.status === "On hold"
									? "bg-blue-100/50 text-blue-700"
									: "bg-gray-100/50 text-gray-700"
							}`}
						>
							{project.status}
						</span>
					</div>

					<div className="relative">
						<button onClick={() => setMenuOpen(!menuOpen)}>
							<MoreVertical size={18} />
						</button>

						{menuOpen && (
							<div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow">
								<button
									className="block w-full px-4 py-1 text-left text-sm hover:bg-gray-50"
									onClick={handleViewDetails}
								>
									View Project Details
								</button>
								<button
									onClick={handleEditProject}
									className="block w-full px-4 py-1 text-left text-sm hover:bg-gray-50"
								>
									Edit Project
								</button>

								<button
									onClick={handleDeleteProject}
									className="block w-full px-4 py-1 text-left text-sm hover:bg-gray-50"
								>
									Delete Project
								</button>
							</div>
						)}
					</div>
				</div>
				<p className="mt-3 text-sm text-gray-600">{project.description}</p>
				<div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
					<span className="flex items-center gap-2">
						<CircleDollarSign className="w-5 h-5" />
						{project.budget.toLocaleString()}
					</span>
					<span className="flex gap-2">
						<Clock className="w-5 h-5" />
						{project.duration}
					</span>
					<span className="flex gap-2">
						<UsersRound className="w-5 h-5" />
						{project.applications} applications
					</span>
				</div>
				<div className="mt-3 flex flex-wrap gap-2">
					{project.categories.map((cat) => (
						<span
							key={cat}
							className="rounded-md  px-2 py-1 text-xs border border-input text-gray-dark"
						>
							{cat}
						</span>
					))}
				</div>
				<p className="mt-4 text-xs text-gray-400">
					{formatPostedDate(project.postedAt)}
				</p>
			</div>

			<ActionConfirmModal
				open={showDeleteModal}
				title="Delete project"
				description="Are you sure you want to delete this project?"
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={() => void confirmDeleteProject()}
			/>
			{deleteError ? (
				<p role='alert' className='mt-2 text-sm text-red-600'>
					{deleteError}
				</p>
			) : null}

			<ActionResultModal
				open={showDeletedModal}
				title="Selected project has been deleted."
				description="Landing page design for spotify was deleted. You can post new jobs to connect with skilled professionals!"
				secondaryLabel="Go to job postings"
				primaryLabel="Post new job"
				onSecondaryClick={handleGoToJobPostings}
				onPrimaryClick={handlePostNewJob}
			/>
		</>
	);
};

export default ProjectCard;
