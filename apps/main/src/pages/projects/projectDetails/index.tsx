import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircleX, PencilLine, Plus, Undo2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getClientJob, jobBudget, jobDate, jobDuration, jobStatusLabel } from "../../../services/client-jobs.service";
import { useAuthStore } from "../../../store/useAuthStore";
import { getApiErrorMessage } from "../../../utils/apiError";
import { useJobRateLimit } from "../hook/useJobRateLimit";
import JobActionDialog from "../JobActionDialog";

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const userId = useAuthStore((state) => state.user?.id);
  const navigate = useNavigate();
  const [action, setAction] = useState<"cancel" | "delete" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const job = useQuery({
    queryKey: ["client-job-detail", userId, projectId],
    queryFn: () => {
      if (!projectId) throw new Error("A job ID is required.");
      return getClientJob(projectId);
    },
    enabled: Boolean(userId && projectId),
    staleTime: 60_000,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const limit = useJobRateLimit([job]);
  const failure = job.error && typeof job.error === "object" && "status" in job.error ? job.error.status : undefined;

  if (job.isPending) return <div role='status' className='mx-auto max-w-6xl px-4 py-20 text-sm text-gray-600'>Loading project details...</div>;
  if (job.isError) return <div role='alert' className='mx-auto max-w-6xl px-4 py-20 text-sm text-red-700'>
    {failure === 404 ? "This job was not found or is not available to your account." : getApiErrorMessage(job.error, "Could not load this job.")}
    {failure !== 401 && failure !== 403 && failure !== 404 && <button type='button' className='ml-2 underline' disabled={limit.blocked || job.isFetching} onClick={() => void job.refetch()}>{limit.remaining > 0 ? `Retry in ${limit.remaining}s` : limit.unavailable ? "Retry unavailable" : "Retry"}</button>}
    {" "}<Link to='/clients/projects' className='underline'>My Projects</Link>
  </div>;

  const project = job.data;
  const skills = Array.isArray(project.skills) ? project.skills.filter((skill): skill is string => typeof skill === "string") : [];

  return (
    <div className='mx-auto max-w-6xl px-4 py-20 md:py-20 lg:py-32'>
      {notice && <div role='status' className='mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800'>{notice} <button type='button' className='ml-2 underline' onClick={() => setNotice(null)}>Dismiss</button></div>}
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-xl font-semibold'>{project.title}</h1>
          <p className='text-sm text-gray-500'>{jobStatusLabel(project.status)}</p>
        </div>
        <button onClick={() => navigate("/clients/post-a-job")} className='rounded-lg bg-primary px-4 py-2 text-sm text-white flex items-center'>
          <Plus className='w-4 h-4 mr-1' /> Post New Job
        </button>
      </div>

      <div className='mt-6 flex gap-2'>
        <button type='button' className='rounded-lg px-4 py-2 text-sm bg-primary text-white'>Job Post Overview</button>
        <button type='button' disabled title='Applications are not available yet' className='rounded-lg px-4 py-2 text-sm border border-input text-gray-dark disabled:opacity-50'>Review Applications</button>
        <button type='button' disabled title='Hiring is not available yet' className='rounded-lg px-4 py-2 text-sm border border-input text-gray-dark disabled:opacity-50'>Hire</button>
      </div>
      <div className='mt-8 grid grid-cols-1 gap-10 lg:grid-cols-4'>
        <div className='lg:col-span-3 space-y-6'>
          <div className='flex gap-4 text-sm text-gray-500'>
            <span className='text-input'>{project.status === "draft" ? "Created" : "Posted"} {jobDate(project.published_at || project.created_at)}</span>
          </div>
          <section>
            <h3 className='font-semibold'>About the role</h3>
            <p className='mt-2 text-sm text-gray-400 leading-relaxed whitespace-pre-wrap'>{project.description || "No description provided."}</p>
          </section>
          <section>
            <h3 className='font-semibold'>Qualification</h3>
            <p className='mt-2 text-sm text-gray-400'>Not available.</p>
          </section>
          <section>
            <h3 className='font-semibold'>Required Skills</h3>
            <div className='mt-2 flex flex-wrap gap-2'>
              {skills.length ? skills.map((skill) => <span key={skill} className='px-1 py-1 rounded-lg border border-input text-[8px] text-gray-700 bg-gray-50'>{skill}</span>) : <span className='text-sm text-gray-400'>No skills provided.</span>}
            </div>
          </section>
          <section className='space-y-2 text-sm text-gray-600'>
            <p>Budget: {jobBudget(project)}</p>
            <p>Duration: {jobDuration(project.project_duration)}</p>
            {project.category && <p>Category: {project.category}</p>}
            {project.freelancers_needed !== null && <p>Freelancers needed: {project.freelancers_needed}</p>}
          </section>
        </div>
        <aside className='space-y-6'>
          <div className='flex flex-col gap-3 text-sm'>
            <button type='button' disabled={project.status !== "draft" && project.status !== "open"} title={project.status !== "draft" && project.status !== "open" ? "Only draft and open jobs can be edited" : undefined} onClick={() => navigate(`/clients/edit-job/${encodeURIComponent(project.id)}`)} className='flex items-center gap-2 rounded px-3 py-2 text-left text-primary hover:bg-primary/10 transition disabled:opacity-50'><PencilLine size={16} /> Edit job posting</button>
            <button type='button' onClick={() => navigate(`/clients/post-a-job?reuse=${encodeURIComponent(project.id)}`)} className='flex items-center gap-2 rounded px-3 py-2 text-left text-primary hover:bg-primary/10 transition'><Undo2 size={16} /> Reuse job posting</button>
            {project.status === "open" && <button type='button' onClick={() => setAction("cancel")} className='flex items-center gap-2 rounded px-3 py-2 text-left text-primary hover:bg-primary/10 transition'><CircleX size={16} /> Cancel Job Posting</button>}
            {project.status === "draft" && <button type='button' onClick={() => setAction("delete")} className='flex items-center gap-2 rounded px-3 py-2 text-left text-primary hover:bg-primary/10 transition'><CircleX size={16} /> Delete draft</button>}
          </div>
          <div>
            <h4 className='flex items-center gap-2 font-semibold'>About the client</h4>
            <p className='mt-3 text-sm text-gray-600'>Client statistics are not available yet.</p>
          </div>
        </aside>
      </div>
      {action && <JobActionDialog job={project} action={action} onClose={() => setAction(null)} onSuccess={(completed) => {
        setAction(null);
        if (completed === "delete") navigate("/clients/projects", { state: { jobNotice: "Draft deleted." } });
        else setNotice("Job posting cancelled.");
      }} />}
    </div>
  );
};

export default ProjectDetailsPage;
