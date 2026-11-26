import React, { useState } from "react";
import { MoreVertical, Clock, UsersRound, CircleDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jobBudget, jobDate, jobDuration, jobStatusLabel, type ClientJob } from "../../services/client-jobs.service";
import JobActionDialog from "./JobActionDialog";

const ProjectCard = ({ project, onActionSuccess }: { project: ClientJob; onActionSuccess: (message: string) => void }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [action, setAction] = useState<"cancel" | "delete" | null>(null);
	const navigate = useNavigate();

	return (
		<div className="group border-t border-input p-5">
			<div className="flex items-start justify-between">
				<div className="flex gap-4">
					<h3 className="font-semibold group-hover:text-primary">{project.title}</h3>
					<span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs ${
						project.status === "open" ? "bg-green-100/50 text-green-700"
							: project.status === "in_progress" ? "bg-blue-100/50 text-blue-700"
							: "bg-gray-100/50 text-gray-700"
					}`}>{jobStatusLabel(project.status)}</span>
				</div>
				<div className="relative">
					<button type="button" aria-label={`Actions for ${project.title}`} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><MoreVertical size={18} /></button>
					{menuOpen && <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow z-10">
						<button type="button" className="block w-full px-4 py-1 text-left text-sm hover:bg-gray-50" onClick={() => navigate(`/clients/projects/${encodeURIComponent(project.id)}`)}>View Project Details</button>
						<button type="button" disabled={project.status !== "draft" && project.status !== "open"} title={project.status !== "draft" && project.status !== "open" ? "Only draft and open jobs can be edited" : undefined} onClick={() => navigate(`/clients/edit-job/${encodeURIComponent(project.id)}`)} className="block w-full px-4 py-1 text-left text-sm hover:bg-gray-50 disabled:opacity-50">Edit Project</button>
						<button type="button" onClick={() => navigate(`/clients/post-a-job?reuse=${encodeURIComponent(project.id)}`)} className="block w-full px-4 py-1 text-left text-sm hover:bg-gray-50">Reuse job posting</button>
						{project.status === "open" && <button type="button" onClick={() => { setMenuOpen(false); setAction("cancel"); }} className="block w-full px-4 py-1 text-left text-sm hover:bg-gray-50">Cancel Job Posting</button>}
						{project.status === "draft" && <button type="button" onClick={() => { setMenuOpen(false); setAction("delete"); }} className="block w-full px-4 py-1 text-left text-sm hover:bg-gray-50">Delete draft</button>}
					</div>}
				</div>
			</div>
			<p className="mt-3 text-sm text-gray-600">{project.description}</p>
			<div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
				<span className="flex items-center gap-2"><CircleDollarSign className="w-5 h-5" />{jobBudget(project)}</span>
				<span className="flex gap-2"><Clock className="w-5 h-5" />{jobDuration(project.project_duration)}</span>
				<span className="flex gap-2"><UsersRound className="w-5 h-5" />N/A applications</span>
			</div>
			<div className="mt-3 flex flex-wrap gap-2">
				{project.category && <span className="rounded-md px-2 py-1 text-xs border border-input text-gray-dark">{project.category}</span>}
			</div>
			<p className="mt-4 text-xs text-gray-400">{project.status === "draft" ? "Created" : "Posted"} {jobDate(project.published_at || project.created_at)}</p>
			{action && <JobActionDialog job={project} action={action} onClose={() => setAction(null)} onSuccess={(completed) => {
				setAction(null);
				onActionSuccess(completed === "cancel" ? "Job posting cancelled." : "Draft deleted.");
			}} />}
		</div>
	);
};

export default ProjectCard;
