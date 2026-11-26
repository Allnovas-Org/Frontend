import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ClientJob } from "../../services/client-jobs.service";
import Projects from "./index";
import ProjectDetailsPage from "./projectDetails";
import JobActionDialog from "./JobActionDialog";

const userId = undefined;
const summary = { total_posted: 4, total_completed: 0, total_open: 2, total_in_progress: 3, total_cancelled: 0 };
const draft: ClientJob = {
	id: "draft-1", title: "Synthetic draft", description: "", category: "", skills: [], status: "draft",
	budget: null, currency: "USD", freelancers_needed: null, budget_type: null, project_duration: null,
	experience_level: null, published_at: null, created_at: "2026-01-01", updated_at: "2026-01-01",
};

const client = () => new QueryClient({ defaultOptions: { queries: { retry: false } } });
const dashboard = (queryClient: QueryClient) => renderToStaticMarkup(
	<QueryClientProvider client={queryClient}><MemoryRouter><Projects /></MemoryRouter></QueryClientProvider>,
);
const details = (queryClient: QueryClient) => renderToStaticMarkup(
	<QueryClientProvider client={queryClient}><MemoryRouter initialEntries={["/clients/projects/draft-1"]}>
		<Routes><Route path="/clients/projects/:projectId" element={<ProjectDetailsPage />} /></Routes>
	</MemoryRouter></QueryClientProvider>,
);

test("dashboard loading and genuine empty states are distinct", () => {
	const queries = client();
	assert.match(dashboard(queries), /Loading your jobs/);
	queries.setQueryData(["client-job-summary", userId], summary);
	queries.setQueryData(["client-jobs", userId, "", 1], { count: 0, next: null, previous: null, results: [] });
	const html = dashboard(queries);
	assert.match(html, /You haven&#x27;t posted any jobs yet/);
	assert.match(html, /Total Applications/);
	assert.match(html, /Total Budget/);
	assert.match(html, /N\/A/);
});

test("dashboard displays real counts and draft records without mock applications", () => {
	const queries = client();
	queries.setQueryData(["client-job-summary", userId], summary);
	queries.setQueryData(["client-jobs", userId, "", 1], { count: 17, next: "next", previous: null, results: [draft] });
	const html = dashboard(queries);
	assert.match(html, />17<\/p><p[^>]*>Total Jobs/);
	assert.match(html, />5<\/p><p[^>]*>Active Jobs/);
	assert.match(html, /Synthetic draft/);
	assert.match(html, /N\/A applications/);
	assert.doesNotMatch(html, /Landing Page Design for Spotify/);
	assert.match(html, /Search and category filtering are not available yet/);
});

test("a newly published job returned by the API appears on the dashboard", () => {
	const queries = client();
	queries.setQueryData(["client-job-summary", userId], summary);
	queries.setQueryData(["client-jobs", userId, "", 1], { count: 0, next: null, previous: null, results: [] });
	assert.doesNotMatch(dashboard(queries), /Synthetic published job/);
	queries.setQueryData(["client-jobs", userId, "", 1], {
		count: 1, next: null, previous: null,
		results: [{ ...draft, title: "Synthetic published job", status: "open", published_at: "2026-01-01" }],
	});
	const html = dashboard(queries);
	assert.match(html, /Synthetic published job/);
	assert.match(html, />Open<\/span>/);
});

test("dashboard shows errors instead of false empty data and respects rate limits", () => {
	const queries = client();
	queries.setQueryData(["client-job-summary", userId], summary);
	queries.setQueryData(["client-jobs", userId, "", 1], { count: 0, next: null, previous: null, results: [] });
	const query = queries.getQueryCache().find({ queryKey: ["client-jobs", userId, "", 1], exact: true });
	assert.ok(query);
	query.setState({ status: "error", error: Object.assign(new Error("Rate limited"), { status: 429, retryAfterSeconds: 30 }), errorUpdatedAt: Date.now() });
	const html = dashboard(queries);
	assert.match(html, /Too many attempts/);
	assert.match(html, /Retry in \d+s/);
	assert.doesNotMatch(html, /You haven&#x27;t posted any jobs yet/);
});

test("owner-scoped draft details show draft-only deletion and disable unsupported actions", () => {
	const queries = client();
	queries.setQueryData(["client-job-detail", userId, "draft-1"], draft);
	const html = details(queries);
	assert.match(html, /Synthetic draft/);
	assert.match(html, /Edit job posting/);
	assert.match(html, /Delete draft/);
	assert.match(html, /Reuse job posting/);
	assert.match(html, /Applications are not available yet/);
	assert.doesNotMatch(html, /Cancel Job Posting/);
	assert.doesNotMatch(html, /Landing Page Design for Spotify|Shortlisted|100% hire rate/);
});

test("open job details allow cancellation but not permanent deletion", () => {
	const queries = client();
	queries.setQueryData(["client-job-detail", userId, "draft-1"], { ...draft, status: "open" });
	const html = details(queries);
	assert.match(html, /Cancel Job Posting/);
	assert.doesNotMatch(html, /Delete draft/);
	assert.match(html, /Reuse job posting/);
});

test("cancellation confirmation explains preservation and discovery consequences", () => {
	const queries = client();
	const html = renderToStaticMarkup(<QueryClientProvider client={queries}><JobActionDialog
		job={{ ...draft, status: "open" }} action="cancel" onClose={() => undefined} onSuccess={() => undefined}
	/></QueryClientProvider>);
	assert.match(html, /removes this job from freelancer discovery/);
	assert.match(html, /preserves job history and existing conversations/);
	assert.doesNotMatch(html, /Job posting cancelled/);
});

test("a rate-limited management action remains blocked when its dialog is reopened", () => {
	const queries = client();
	queries.setQueryData(["client-job-action-rate-limit", userId], {
		error: { status: 429, retryAfterSeconds: 30 }, errorUpdatedAt: Date.now(),
	});
	const html = renderToStaticMarkup(<QueryClientProvider client={queries}><JobActionDialog
		job={{ ...draft, status: "open" }} action="cancel" onClose={() => undefined} onSuccess={() => undefined}
	/></QueryClientProvider>);
	assert.match(html, /Too many attempts/);
	assert.match(html, /Try again in \d+s/);
	assert.match(html, /disabled=""[^>]*>Cancel Job Posting<\/button>/);
});

test("owner-scoped detail failures do not render another client's job", () => {
	const queries = client();
	queries.setQueryData(["client-job-detail", userId, "draft-1"], draft);
	const query = queries.getQueryCache().find({ queryKey: ["client-job-detail", userId, "draft-1"], exact: true });
	assert.ok(query);
	query.setState({ status: "error", error: Object.assign(new Error("Not found"), { status: 404 }), errorUpdatedAt: Date.now() });
	const html = details(queries);
	assert.match(html, /not found or is not available to your account/);
	assert.doesNotMatch(html, /Synthetic draft/);
});
