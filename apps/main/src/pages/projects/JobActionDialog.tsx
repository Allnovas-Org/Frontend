import React, { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { cancelClientJob, deleteClientJobDraft, type ClientJob } from "../../services/client-jobs.service";
import { useAuthStore } from "../../store/useAuthStore";
import { getRetryAfterSeconds, hasRetryAfter } from "../../utils/apiError";
import { getJobErrorMessage } from "./jobError";
import { invalidateClientJobQueries } from "./jobCache";
import { useJobRateLimit } from "./hook/useJobRateLimit";

type Action = "cancel" | "delete";
type Failure = { error: unknown; errorUpdatedAt: number };

const JobActionDialog = ({ job, action, onClose, onSuccess }: {
	job: ClientJob;
	action: Action;
	onClose: () => void;
	onSuccess: (action: Action) => void;
}) => {
	const userId = useAuthStore((state) => state.user?.id);
	const queryClient = useQueryClient();
	const busyRef = useRef(false);
	const [busy, setBusy] = useState(false);
	const rateLimitKey = ["client-job-action-rate-limit", userId];
	const [failure, setFailure] = useState<Failure | null>(() => {
		const cached = queryClient.getQueryData<Failure>(rateLimitKey);
		if (!cached) return null;
		if (hasRetryAfter(cached.error) && cached.errorUpdatedAt + getRetryAfterSeconds(cached.error) * 1000 <= Date.now()) return null;
		return cached;
	});
	const [uncertain, setUncertain] = useState(false);
	const limit = useJobRateLimit(failure ? [failure] : []);
	const status = failure?.error && typeof failure.error === "object" && "status" in failure.error ? failure.error.status : undefined;
	const blocked = busy || limit.blocked || uncertain || [401, 403, 404, 409].includes(Number(status));

	const close = () => {
		if (busyRef.current) return;
		onClose();
		if (uncertain || status === 404 || status === 409) void invalidateClientJobQueries(queryClient, userId);
	};

	const confirm = async () => {
		if (busyRef.current || blocked) return;
		if ((action === "cancel" && job.status !== "open") || (action === "delete" && job.status !== "draft")) {
			setFailure({ error: new Error("This action is not available for the current job status."), errorUpdatedAt: Date.now() });
			return;
		}
		busyRef.current = true;
		setBusy(true);
		setFailure(null);
		try {
			if (action === "cancel") await cancelClientJob(job.id);
			else await deleteClientJobDraft(job.id);
			queryClient.removeQueries({ queryKey: rateLimitKey, exact: true });
			onSuccess(action);
			await invalidateClientJobQueries(queryClient, userId);
		} catch (error) {
			const requestStatus = error && typeof error === "object" && "status" in error ? error.status : undefined;
			setUncertain(typeof requestStatus !== "number" || requestStatus === 0 || requestStatus >= 500);
			const nextFailure = { error, errorUpdatedAt: Date.now() };
			if (requestStatus === 429) queryClient.setQueryData(rateLimitKey, nextFailure);
			setFailure(nextFailure);
		} finally {
			busyRef.current = false;
			setBusy(false);
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
			<div role='dialog' aria-modal='true' aria-labelledby='job-action-title' className='w-full max-w-sm rounded-xl bg-white p-6'>
				<h3 id='job-action-title' className='font-semibold'>{action === "cancel" ? "Cancel Job Posting" : "Delete draft"}</h3>
				<p className='mt-2 text-sm text-gray-500'>
					{action === "cancel"
						? "Cancelling removes this job from freelancer discovery but preserves job history and existing conversations. Are you sure?"
						: "Permanently delete this draft? This cannot be undone."}
				</p>
				{failure && <p role='alert' className='mt-2 text-sm text-red-700'>
					{uncertain ? "The result could not be confirmed. Close this dialog and check the job before trying again." : getJobErrorMessage(failure.error, "Could not complete this action.")}
					{limit.remaining > 0 && ` Try again in ${limit.remaining}s.`}
				</p>}
				<div className='mt-6 flex justify-end gap-3'>
					<button type='button' disabled={busy} onClick={close} className='rounded-lg border border-input px-4 py-2 text-sm'>Close</button>
					<button type='button' disabled={blocked} onClick={() => void confirm()} className='rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-50'>
						{busy ? "Saving..." : action === "cancel" ? "Cancel Job Posting" : "Delete draft"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default JobActionDialog;
