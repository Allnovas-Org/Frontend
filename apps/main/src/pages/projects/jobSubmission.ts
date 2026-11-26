import {
	createClientJob, createClientJobDraft, publishClientJobDraft, updateClientJob,
	type ClientJob, type ClientJobStatus,
} from "../../services/client-jobs.service";
import { jobPayload, publishedPayload, type PostJobFormValues } from "./postJobSchema";

export const submitJob = async ({
	id, sourceStatus, values, currency, action, onUpdated, onPostStart,
}: {
	id?: string;
	sourceStatus?: ClientJobStatus;
	values: PostJobFormValues;
	currency: string;
	action: "draft" | "publish";
	onUpdated: () => Promise<void>;
	onPostStart: () => void;
}): Promise<ClientJob> => {
	if (id) {
		if (sourceStatus !== "draft" && sourceStatus !== "open") throw new Error("Only draft and open jobs can be edited.");
		if (sourceStatus === "open" && action === "draft") throw new Error("An open job cannot be saved as a draft.");
		const payload = sourceStatus === "open" ? publishedPayload(values, currency) : jobPayload(values, currency);
		const result = await updateClientJob(id, payload);
		if (!result || result.id !== id || result.status !== sourceStatus) throw new Error("The job update could not be confirmed.");
		await onUpdated();
		if (sourceStatus === "draft" && action === "publish") {
			onPostStart();
			return publishClientJobDraft(id);
		}
		return result;
	}

	if (action === "draft") {
		const payload = jobPayload(values, currency);
		onPostStart();
		return createClientJobDraft(payload);
	}
	const payload = publishedPayload(values, currency);
	onPostStart();
	return createClientJob(payload);
};
