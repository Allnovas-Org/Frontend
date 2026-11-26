import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import ProjectCard from "./ProjectCard";
import StatsCard from "./StatsCard";
import EmptyState from "./EmptyState";
import { useJobRateLimit } from "./hook/useJobRateLimit";
import {
  getClientJobs, getClientJobSummary, isClientJobStatus, jobStatusLabel,
  type ClientJobStatus,
} from "../../services/client-jobs.service";
import { useAuthStore } from "../../store/useAuthStore";
import { getApiErrorMessage } from "../../utils/apiError";

const queryOptions = {
  staleTime: 60_000,
  retry: false,
  retryOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

const Projects = () => {
  const [status, setStatus] = useState<ClientJobStatus | "">("");
  const [page, setPage] = useState(1);
  const userId = useAuthStore((state) => state.user?.id);
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState = location.state as { jobNotice?: unknown } | null;
  const [notice, setNotice] = useState<string | null>(
    navigationState?.jobNotice === "Changes saved." || navigationState?.jobNotice === "Draft deleted." ? navigationState.jobNotice : null,
  );
  useEffect(() => {
    if (navigationState?.jobNotice === "Changes saved." || navigationState?.jobNotice === "Draft deleted.") {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, navigate, navigationState]);
  const jobs = useQuery({
    queryKey: ["client-jobs", userId, status, page],
    queryFn: () => getClientJobs(page, status),
    enabled: Boolean(userId),
    ...queryOptions,
  });
  const allJobs = useQuery({
    queryKey: ["client-jobs", userId, "", 1],
    queryFn: () => getClientJobs(1, ""),
    enabled: Boolean(userId),
    ...queryOptions,
  });
  const summary = useQuery({
    queryKey: ["client-job-summary", userId],
    queryFn: getClientJobSummary,
    enabled: Boolean(userId),
    ...queryOptions,
  });
  const limit = useJobRateLimit([jobs, allJobs, summary]);
  const controlsDisabled = jobs.isFetching || limit.blocked;
  const retryLabel = limit.remaining > 0 ? `Retry in ${limit.remaining}s` : limit.unavailable ? "Retry unavailable" : "Retry";
  const failureStatus = (error: unknown) =>
    error && typeof error === "object" && "status" in error ? error.status : undefined;
  const canRetry = (error: unknown) => ![401, 403, 404].includes(Number(failureStatus(error)));
  const handleActionSuccess = (message: string) => {
    setNotice(message);
    if (message === "Draft deleted." && page > 1 && jobs.data?.results.length === 1) setPage((current) => current - 1);
  };

  return (
    <section className='max-w-6xl mx-auto min-h-screen bg-white py-20 md:py-20 lg:py-32 px-4 md:px-6'>
      {notice && <div role='status' className='mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800'>{notice} <button type='button' className='ml-2 underline' onClick={() => setNotice(null)}>Dismiss</button></div>}
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>My Projects</h1>
          <p className='text-sm text-gray-dark'>Manage and track all your freelance projects in one place</p>
        </div>
        <button className='rounded-lg bg-primary px-4 py-2 flex gap-2 text-sm text-white' onClick={() => navigate("/clients/post-a-job")}>
          <Plus className='w-4 h-4' /> Post New Job
        </button>
      </div>

      <div className='w-full mb-6 flex gap-4'>
        <input disabled placeholder='Search jobs...' title='Search is not available yet' className='flex-1 w-full rounded-lg border border-input px-4 py-2 text-sm' aria-label='Search projects' />
        <fieldset className='flex-1' disabled={controlsDisabled}>
          <Dropdown
            label={status ? jobStatusLabel(status) : "All Status"}
            value={status}
            onChange={(value) => {
              if (value === "" || isClientJobStatus(value)) {
                setStatus(value);
                setPage(1);
              }
            }}
            options={[
              { label: "All Status", value: "" },
              { label: "Draft", value: "draft" },
              { label: "Open", value: "open" },
              { label: "In Progress", value: "in_progress" },
              { label: "Completed", value: "completed" },
              { label: "Cancelled", value: "cancelled" },
            ]}
          />
        </fieldset>
        <div className='flex-1'>
          <button type='button' disabled title='Category filtering is not available yet' className='w-full rounded-lg border border-input px-4 py-2 text-left text-sm bg-white'>All Categories</button>
        </div>
      </div>
      <p className='-mt-4 mb-6 text-xs text-gray-dark'>Search and category filtering are not available yet.</p>

      <div className='mb-6 grid grid-cols-4 p-7 rounded-md gap-4 border border-input'>
        <StatsCard label='Total Jobs' value={allJobs.isPending ? "Loading..." : allJobs.isError ? "Could not load" : allJobs.data.count} />
        <StatsCard label='Active Jobs' value={summary.isPending ? "Loading..." : summary.isError ? "Could not load" : summary.data.total_open + summary.data.total_in_progress} />
        <StatsCard label='Total Applications' value='N/A' />
        <StatsCard label='Total Budget' value='N/A' />
      </div>

      {summary.isError && <div role='alert' className='mb-4 text-sm text-red-700'>
        {getApiErrorMessage(summary.error, "Could not load job statistics.")}
        {canRetry(summary.error) && <button type='button' className='ml-2 underline' disabled={limit.blocked || summary.isFetching} onClick={() => void summary.refetch()}>{retryLabel}</button>}
      </div>}
      {allJobs.isError && (status !== "" || page !== 1) && <div role='alert' className='mb-4 text-sm text-red-700'>
        {getApiErrorMessage(allJobs.error, "Could not load the total number of jobs.")}
        {canRetry(allJobs.error) && <button type='button' className='ml-2 underline' disabled={limit.blocked || allJobs.isFetching} onClick={() => void allJobs.refetch()}>{retryLabel}</button>}
      </div>}
      <div className='space-y-4'>
        {jobs.isPending ? <p role='status' className='text-sm text-gray-dark'>Loading your jobs...</p>
          : jobs.isError ? <div role='alert' className='text-sm text-red-700'>
            {getApiErrorMessage(jobs.error, "Could not load your jobs.")}
            {canRetry(jobs.error) && <button type='button' className='ml-2 underline' disabled={limit.blocked || jobs.isFetching} onClick={() => void jobs.refetch()}>{retryLabel}</button>}
          </div>
          : jobs.data.results.length === 0 ? <EmptyState
            icon={<BriefcaseBusiness />}
            title={status ? "No jobs match this status." : "You haven't posted any jobs yet."}
            description={status ? "Choose another status to see more jobs." : "Post a job to connect with talented freelancers."}
            actionLabel='Post New Job'
            onAction={() => navigate("/clients/post-a-job")}
          /> : jobs.data.results.map((job) => <ProjectCard key={job.id} project={job} onActionSuccess={handleActionSuccess} />)}
      </div>
      <div className='flex items-center gap-3 mt-4 text-sm'>
        <button type='button' className='text-primary underline disabled:text-gray-400' disabled={controlsDisabled || page === 1 || (jobs.isSuccess && !jobs.data.previous)} onClick={() => setPage((current) => current - 1)}>Previous</button>
        <span>Page {page}</span>
        <button type='button' className='text-primary underline disabled:text-gray-400' disabled={controlsDisabled || !jobs.data?.next} onClick={() => setPage((current) => current + 1)}>Next</button>
      </div>
    </section>
  );
};

export default Projects;
