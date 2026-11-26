import assert from "node:assert/strict";
import test from "node:test";
import { api } from "../../lib/axios";
import {
	cancelClientJob, createClientJob, createClientJobDraft, deleteClientJobDraft, getClientJob, getClientJobs,
	getOwnedEditableJob, getReusableClientJob, jobBudget, publishClientJobDraft, updateClientJob, type ClientJob,
} from "../../services/client-jobs.service";
import { draftJobSchema, formValues, jobPayload, openJobEditSchema, postJobSchema, publishedPayload, type PostJobFormValues } from "./postJobSchema";
import { getJobErrorMessage } from "./jobError";
import { submitJob } from "./jobSubmission";

const empty: PostJobFormValues = {
	title: "Draft", description: "", category: "", freelancers: null, budgetType: "",
	duration: "", totalBudget: "", skills: [], experienceLevel: "",
};
const complete: PostJobFormValues = {
	title: "Build a website", description: "Build a useful website for our company.",
	category: "Web Development", freelancers: 2, budgetType: "hourly",
	duration: "1_to_3_months", totalBudget: "25.50", skills: ["React"], experienceLevel: "intermediate",
};
const draft: ClientJob = {
	id: "draft-1", title: "Draft", description: "", category: "", skills: [], status: "draft",
	budget: null, currency: "USD", freelancers_needed: null, budget_type: null, project_duration: null,
	experience_level: null, published_at: null, created_at: "2026-01-01", updated_at: "2026-01-01",
};

test("drafts require only a nonblank title and preserve incomplete fields", async () => {
	await draftJobSchema.validate(empty, { abortEarly: false });
	await assert.rejects(() => draftJobSchema.validate({ ...empty, title: "  " }));
	assert.deepEqual(jobPayload(empty), {
		title: "Draft", description: "", category: "", skills: [], freelancers_needed: null,
		budget_type: null, budget: null, currency: "USD", project_duration: null, experience_level: null,
	});
	assert.deepEqual(formValues(draft), empty);
});

test("publication validates required fields and maps amounts and enum values", async () => {
	await postJobSchema.validate(complete, { abortEarly: false });
	await assert.rejects(() => postJobSchema.validate(empty, { abortEarly: false }));
	const payload = publishedPayload(complete);
	assert.equal(payload.budget_type, "hourly");
	assert.equal(payload.budget, "25.50");
	assert.equal(payload.currency, "USD");
	assert.equal(payload.project_duration, "1_to_3_months");
	assert.equal(payload.experience_level, "intermediate");
	assert.throws(() => publishedPayload(empty));
	for (const amount of ["0", "1.001", "10000000000"]) {
		await assert.rejects(() => postJobSchema.validate({ ...complete, totalBudget: amount }));
	}
});

test("open job edits accept valid existing zero budgets and empty skill lists", async () => {
	await openJobEditSchema.validate({ ...complete, totalBudget: "0", skills: [] }, { abortEarly: false });
	await assert.rejects(() => openJobEditSchema.validate({ ...complete, totalBudget: "1.001" }));
});

test("job service sends owner-scoped and write requests with the correct payload", async () => {
	const requests: { method: string | undefined; url: string | undefined; body: unknown }[] = [];
	const previous = api.defaults.adapter;
	Object.defineProperty(globalThis, "localStorage", {
		configurable: true,
		value: { getItem: () => null, removeItem: () => undefined },
	});
	api.defaults.adapter = async (config) => {
		requests.push({ method: config.method, url: config.url, body: config.data ? JSON.parse(config.data) : null });
		const published = config.url?.endsWith("/publish/") || config.url === "/jobs/jobs/";
		return { data: { ...draft, status: published ? "open" : "draft" }, status: 200, statusText: "OK", headers: {}, config };
	};
	try {
		await getOwnedEditableJob(draft.id);
		await createClientJobDraft(jobPayload(empty));
		await updateClientJob(draft.id, jobPayload(complete));
		await publishClientJobDraft(draft.id);
		await createClientJob(publishedPayload(complete));
		assert.deepEqual(requests.map(({ method, url }) => [method, url]), [
			["get", "/client/jobs/draft-1/"],
			["post", "/jobs/jobs/drafts/"], ["patch", "/jobs/jobs/draft-1/"],
			["post", "/jobs/jobs/draft-1/publish/"], ["post", "/jobs/jobs/"],
		]);
		assert.deepEqual(requests[2].body, jobPayload(complete));
		assert.deepEqual(requests[4].body, publishedPayload(complete));
	} finally {
		api.defaults.adapter = previous;
	}
});

test("only owner-scoped draft and open jobs can be opened for editing", async () => {
	const previous = api.defaults.adapter;
	let requests = 0;
	let status: ClientJob["status"] = "open";
	api.defaults.adapter = async (config) => {
		requests += 1;
		return { data: { ...draft, status }, status: 200, statusText: "OK", headers: {}, config };
	};
	try {
		assert.equal((await getOwnedEditableJob(draft.id)).status, "open");
		status = "completed";
		await assert.rejects(() => getOwnedEditableJob(draft.id), /Only draft and open/);
		assert.equal(requests, 2);
	} finally {
		api.defaults.adapter = previous;
	}
});

test("job retrieval preserves valid currencies and rejects unreadable skills", async () => {
	const previous = api.defaults.adapter;
	let result: ClientJob = { ...draft, currency: "EUR" };
	api.defaults.adapter = async (config) => ({
		data: result, status: 200, statusText: "OK", headers: {}, config,
	});
	try {
		assert.equal((await getOwnedEditableJob(draft.id)).currency, "EUR");
		result = { ...draft, skills: [123] };
		await assert.rejects(() => getOwnedEditableJob(draft.id), /skills could not be read/);
	} finally {
		api.defaults.adapter = previous;
	}
});

test("reuse copies posting fields from the owner endpoint without copying the original identity", async () => {
	const previous = api.defaults.adapter;
	const original = { ...draft, ...publishedPayload(complete, "EUR"), status: "completed" as const };
	api.defaults.adapter = async (config) => {
		assert.equal(config.url, "/client/jobs/draft-1/");
		return { data: original, status: 200, statusText: "OK", headers: {}, config };
	};
	try {
		const source = await getReusableClientJob(draft.id);
		const payload = publishedPayload(formValues(source), source.currency);
		assert.deepEqual(payload, publishedPayload(complete, "EUR"));
		assert.equal(Object.hasOwn(payload, "id"), false);
		assert.equal(Object.hasOwn(payload, "status"), false);
		assert.equal(Object.hasOwn(payload, "created_at"), false);
	} finally {
		api.defaults.adapter = previous;
	}
});

test("cancellation sends no body and draft deletion requires a confirmed 204", async () => {
	const previous = api.defaults.adapter;
	const calls: { method: string | undefined; url: string | undefined; body: unknown }[] = [];
	let deleteStatus = 204;
	api.defaults.adapter = async (config) => {
		calls.push({ method: config.method, url: config.url, body: config.data });
		return {
			data: config.method === "post" ? { ...draft, status: "cancelled" } : null,
			status: config.method === "delete" ? deleteStatus : 200,
			statusText: "OK", headers: {}, config,
		};
	};
	try {
		assert.equal((await cancelClientJob(draft.id)).status, "cancelled");
		await deleteClientJobDraft(draft.id);
		assert.deepEqual(calls, [
			{ method: "post", url: "/jobs/jobs/draft-1/cancel/", body: undefined },
			{ method: "delete", url: "/jobs/jobs/draft-1/", body: undefined },
		]);
		deleteStatus = 200;
		await assert.rejects(() => deleteClientJobDraft(draft.id), /could not be confirmed/);
	} finally {
		api.defaults.adapter = previous;
	}
});

test("job conflict responses show backend status and dependency errors", () => {
	assert.equal(getJobErrorMessage({ status: 409, data: { status: ["Only open jobs can be cancelled."] } }, ""), "Only open jobs can be cancelled.");
	assert.equal(getJobErrorMessage({ status: 409, data: { detail: "Draft has conversations." } }, ""), "Draft has conversations.");
});

test("editing an open job patches it without creating or publishing another job", async () => {
	const previous = api.defaults.adapter;
	const calls: { method: string | undefined; url: string | undefined; body: unknown }[] = [];
	let updated = 0;
	api.defaults.adapter = async (config) => {
		calls.push({ method: config.method, url: config.url, body: JSON.parse(config.data) });
		return { data: { ...draft, status: "open" }, status: 200, statusText: "OK", headers: {}, config };
	};
	try {
		const result = await submitJob({
			id: draft.id, sourceStatus: "open", values: complete, currency: "EUR", action: "publish",
			onUpdated: async () => { updated += 1; }, onPostStart: () => { throw new Error("Unexpected POST"); },
		});
		assert.equal(result.status, "open");
		assert.equal(updated, 1);
		assert.deepEqual(calls, [{ method: "patch", url: "/jobs/jobs/draft-1/", body: publishedPayload(complete, "EUR") }]);
	} finally {
		api.defaults.adapter = previous;
	}
});

test("draft edits are saved before publishing, and a failed patch does not publish", async () => {
	const previous = api.defaults.adapter;
	const calls: string[] = [];
	let failPatch = false;
	api.defaults.adapter = async (config) => {
		calls.push(`${config.method} ${config.url}`);
		if (failPatch && config.method === "patch") throw new Error("Patch failed");
		return { data: { ...draft, status: config.method === "post" ? "open" : "draft" }, status: 200, statusText: "OK", headers: {}, config };
	};
	let updated = 0;
	let posts = 0;
	const options = {
		id: draft.id, sourceStatus: "draft" as const, values: complete, currency: "USD", action: "publish" as const,
		onUpdated: async () => { updated += 1; }, onPostStart: () => { posts += 1; },
	};
	try {
		await submitJob(options);
		assert.deepEqual(calls, ["patch /jobs/jobs/draft-1/", "post /jobs/jobs/draft-1/publish/"]);
		assert.equal(updated, 1);
		assert.equal(posts, 1);
		calls.length = 0;
		failPatch = true;
		await assert.rejects(() => submitJob(options));
		assert.deepEqual(calls, ["patch /jobs/jobs/draft-1/"]);
		assert.equal(posts, 1);
	} finally {
		api.defaults.adapter = previous;
	}
});

test("reusing a job creates a new record without patching the source", async () => {
	const previous = api.defaults.adapter;
	const calls: { method: string | undefined; url: string | undefined; body: unknown }[] = [];
	api.defaults.adapter = async (config) => {
		calls.push({ method: config.method, url: config.url, body: JSON.parse(config.data) });
		return { data: { ...draft, id: "new-job", status: "draft" }, status: 201, statusText: "Created", headers: {}, config };
	};
	try {
		const result = await submitJob({
			values: formValues({ ...draft, ...publishedPayload(complete, "EUR") }), currency: "EUR", action: "draft",
			onUpdated: async () => { throw new Error("Unexpected update"); }, onPostStart: () => undefined,
		});
		assert.equal(result.id, "new-job");
		assert.deepEqual(calls, [{ method: "post", url: "/jobs/jobs/drafts/", body: jobPayload(complete, "EUR") }]);
	} finally {
		api.defaults.adapter = previous;
	}
});

test("history requests include draft filters and pagination without inventing budgets", async () => {
	const previous = api.defaults.adapter;
	api.defaults.adapter = async (config) => {
		assert.equal(config.url, "/client/jobs/");
		assert.deepEqual(config.params, { page: 2, page_size: 10, status: "draft" });
		return { data: { count: 1, next: null, previous: "previous", results: [draft] }, status: 200, statusText: "OK", headers: {}, config };
	};
	try {
		const page = await getClientJobs(2, "draft");
		assert.equal(page.results[0].status, "draft");
		assert.equal(jobBudget(page.results[0]), "Budget not provided");
		assert.equal(jobBudget({ ...draft, budget: "25.50", budget_type: "hourly" }), "USD 25.50 / hour");
	} finally {
		api.defaults.adapter = previous;
	}
});

test("project details only use the owner-scoped endpoint and reject mismatched responses", async () => {
	const previous = api.defaults.adapter;
	let responseId = draft.id;
	api.defaults.adapter = async (config) => {
		assert.equal(config.url, "/client/jobs/draft-1/");
		return { data: { ...draft, id: responseId }, status: 200, statusText: "OK", headers: {}, config };
	};
	try {
		assert.equal((await getClientJob(draft.id)).id, draft.id);
		responseId = "other-job";
		await assert.rejects(() => getClientJob(draft.id), /Could not read this job/);
	} finally {
		api.defaults.adapter = previous;
	}
});
