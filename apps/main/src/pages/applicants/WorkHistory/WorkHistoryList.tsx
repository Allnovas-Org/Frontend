import React, { useEffect, useState } from "react";
import WorkHistoryCard from "./WorkHistoryCard";
import { listProjects } from "../../../services/projects.service";
import type { ApiProject } from "../../../services/projects.service";
import { getApiErrorMessage } from "../../../utils/apiError";

interface WorkHistoryItem {
	id: string;
	title: string;
	category: string;
	status: "Completed" | "Active" | "Pending";
	price: string;
	client: string;
	rating: number | null;
	description: string;
	tools: string[];
	duration: string;
	completedDate: string;
}

const WorkHistoryList: React.FC = () => {
	const [projects, setProjects] = useState<WorkHistoryItem[]>([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		setLoading(true);
		listProjects(page)
			.then((result) => {
				if (active) {
					setProjects(result.results.map(mapProject));
					setCount(result.count);
				}
			})
			.catch((requestError: unknown) => {
				if (active) {
					setError(getApiErrorMessage(requestError, "Unable to load work history."));
				}
			})
			.finally(() => {
				if (active) setLoading(false);
			});
		return () => {
			active = false;
		};
	}, [page]);

	return (
		<div className="mt-16 min-h-screen w-full bg-gray-50 p-8">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900">Work History</h1>
				<span className="text-sm text-gray-500">
					Showing {projects.length} of {count} projects
				</span>
			</div>
			{loading ? (
				<p className="py-12 text-center text-gray-500">Loading projects…</p>
			) : error ? (
				<p role="alert" className="py-12 text-center text-red-600">{error}</p>
			) : projects.length ? (
				<div className="space-y-6">
					{projects.map((project) => (
						<WorkHistoryCard key={project.id} {...project} />
					))}
					<div className="flex items-center justify-between pt-4">
						<button
							disabled={page <= 1}
							onClick={() => setPage((current) => current - 1)}
							className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:opacity-50"
						>
							Previous
						</button>
						<span className="text-sm text-gray-500">Page {page}</span>
						<button
							disabled={page * 20 >= count}
							onClick={() => setPage((current) => current + 1)}
							className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</div>
			) : (
				<p className="py-12 text-center text-gray-500">
					Projects will appear here after a client hires you.
				</p>
			)}
		</div>
	);
};

function mapProject(project: ApiProject): WorkHistoryItem {
	return {
		id: project.id,
		title: project.title,
		category: "Freelance project",
		status:
			project.status === "completed"
				? "Completed"
				: project.status === "active"
					? "Active"
					: "Pending",
		price: project.contract
			? `${project.contract.currency} ${Number(project.contract.total_amount).toLocaleString()}`
			: "Not provided",
		client: project.client_name,
		rating: null,
		description: project.description || "No project description provided.",
		tools: [],
		duration: "Not specified",
		completedDate:
			project.status === "completed"
				? new Date(project.updated_at).toLocaleDateString()
				: "In progress",
	};
}

export default WorkHistoryList;
