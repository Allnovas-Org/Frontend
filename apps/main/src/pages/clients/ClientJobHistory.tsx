import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
	getClientJobs,
	isClientJobStatus,
	jobBudget,
	jobDate,
	jobStatusLabel,
	type ClientJobStatus,
} from "../../services/client-jobs.service";
import { getApiErrorMessage, getRetryAfterSeconds, hasRetryAfter } from "../../utils/apiError";

const ClientJobHistory: React.FC<{ userId: string }> = ({ userId }) => {
	const [status, setStatus] = useState<ClientJobStatus | "">("");
	const [page, setPage] = useState(1);
	const [retryRemaining, setRetryRemaining] = useState(0);
	const jobs = useQuery({
		queryKey: ["client-jobs", userId, status, page],
		queryFn: () => getClientJobs(page, status),
		staleTime: 60_000,
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	const failure = jobs.error as { status?: number } | null;
	const limited = failure?.status === 429;
	const retryUnavailable = limited && !hasRetryAfter(jobs.error);
	const retrySeconds = getRetryAfterSeconds(jobs.error);

	useEffect(() => {
		if (!limited || !hasRetryAfter(jobs.error)) {
			setRetryRemaining(0);
			return;
		}
		const update = () => setRetryRemaining(Math.max(
			0,
			Math.ceil((jobs.errorUpdatedAt + retrySeconds * 1000 - Date.now()) / 1000),
		));
		update();
		const timer = window.setInterval(update, 1000);
		return () => window.clearInterval(timer);
	}, [limited, jobs.error, jobs.errorUpdatedAt, retrySeconds]);

	const retryBlocked = retryUnavailable || (limited && (
		retryRemaining > 0 ||
		Date.now() < jobs.errorUpdatedAt + retrySeconds * 1000
	));
	const controlsDisabled = jobs.isFetching || retryBlocked;
	const errorMessage = failure?.status === 404
		? "This page of job history is no longer available."
		: getApiErrorMessage(jobs.error, "Could not load your job history.");

	return (
		<div className='flex-1'>
			<div className='flex flex-wrap items-center justify-between gap-3 mb-4'>
				<div>
					<h2 className='text-base font-semibold text-gray-darker'>Job History</h2>
					<p className='text-xs text-gray-dark-20'>Your hiring history</p>
				</div>
				<label className='text-sm text-gray-600'>
					Status
					<select
						className='ml-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm'
						value={status}
						disabled={controlsDisabled}
						onChange={(event) => {
							const value = event.target.value;
							if (value === "" || isClientJobStatus(value)) {
								setStatus(value);
								setPage(1);
							}
						}}
					>
						<option value=''>All</option>
						<option value='draft'>Draft</option>
						<option value='open'>Open</option>
						<option value='in_progress'>In Progress</option>
						<option value='completed'>Completed</option>
						<option value='cancelled'>Cancelled</option>
					</select>
				</label>
			</div>
			{jobs.isPending ? (
				<p role='status' className='text-sm text-gray-500'>Loading your job history...</p>
			) : jobs.isError ? (
				<div role='alert' className='rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
					{errorMessage}
					{failure?.status !== 401 && failure?.status !== 403 && failure?.status !== 404 && (
						<button type='button' className='ml-2 underline' disabled={retryBlocked} onClick={() => void jobs.refetch()}>
							{retryRemaining > 0 ? `Retry in ${retryRemaining}s` : retryUnavailable ? "Retry unavailable" : "Retry"}
						</button>
					)}
				</div>
			) : jobs.data.results.length === 0 ? (
				<div className='rounded-lg overflow-hidden shadow-md bg-gray-50 p-6 text-sm text-gray-500'>
					{status ? "No jobs match this status." : "You haven't posted any jobs yet."}
					{!status && <Link to='/clients/post-a-job' className='ml-2 text-purple underline'>Post a Job</Link>}
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{jobs.data.results.map((job) => (
						<article key={job.id} className='rounded-lg border border-gray-100 bg-white p-4 shadow-sm'>
							<h3 className='text-base font-semibold text-gray-800 break-words'>{job.title}</h3>
							<p className='mt-2 text-sm text-gray-500 break-words'>{job.description}</p>
							<p className='mt-2 text-sm text-gray-600'>{jobStatusLabel(job.status)} · {jobBudget(job)}</p>
							<p className='mt-2 text-xs text-gray-500'>{job.status === "draft" ? "Created" : "Posted"} {jobDate(job.created_at)} · Updated {jobDate(job.updated_at)}</p>
							{job.category && <p className='mt-2 text-xs text-gray-500'>Category: {job.category}</p>}
							{Array.isArray(job.skills) && job.skills.length > 0 && (
								<p className='mt-2 text-xs text-gray-500'>Skills: {job.skills.filter((skill): skill is string => typeof skill === "string").join(", ")}</p>
							)}
							{job.status === "draft" && <Link className='mt-3 inline-block text-sm text-purple underline' to={`/clients/edit-job/${encodeURIComponent(job.id)}`}>Edit draft</Link>}
						</article>
					))}
				</div>
			)}
			<div className='flex items-center gap-3 mt-4 text-sm'>
				<button type='button' className='text-purple underline disabled:text-gray-400' disabled={controlsDisabled || page === 1 || (jobs.isSuccess && !jobs.data.previous)} onClick={() => setPage((current) => current - 1)}>Previous</button>
				<span>Page {page}</span>
				<button type='button' className='text-purple underline disabled:text-gray-400' disabled={controlsDisabled || !jobs.data?.next} onClick={() => setPage((current) => current + 1)}>Next</button>
			</div>
		</div>
	);
};

export default ClientJobHistory;
