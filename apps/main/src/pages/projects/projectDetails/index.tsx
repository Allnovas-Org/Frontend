import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  ApiJob,
  JobApplication,
  getJob,
  listJobApplications,
  setApplicationStatus,
} from "../../../services/jobs.service";
import { getApiErrorMessage } from "../../../utils/apiError";

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [job, setJob] = useState<ApiJob | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [savingApplicationId, setSavingApplicationId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!projectId) return;
    let active = true;
    setLoading(true);
    setLoadError("");
    Promise.all([getJob(projectId), listJobApplications(projectId)])
      .then(([jobResult, applicationPage]) => {
        if (!active) return;
        setJob(jobResult);
        setApplications(applicationPage.results);
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadError(
            getApiErrorMessage(error, "Unable to load this job and its proposals."),
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [projectId]);

  const handleApplicationStatus = async (
    application: JobApplication,
    nextStatus: "shortlisted" | "hired" | "rejected",
  ) => {
    setSavingApplicationId(application.id);
    setLoadError("");
    try {
      const updated = await setApplicationStatus(application.id, nextStatus);
      setApplications((current) =>
        current.map((item) => {
          if (item.id === updated.id) return updated;
          if (nextStatus === "hired" && item.status !== "withdrawn") {
            return { ...item, status: "rejected" };
          }
          return item;
        }),
      );
      if (nextStatus === "hired" && projectId) setJob(await getJob(projectId));
    } catch (error) {
      setLoadError(
        getApiErrorMessage(error, "Unable to update this proposal."),
      );
    } finally {
      setSavingApplicationId(null);
    }
  };

  if (!projectId) return <Navigate to="/clients/projects" replace />;
  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-center text-gray-500">Loading job…</p>
      </main>
    );
  }
  if (loadError && !job) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20">
        <p role="alert" className="text-center text-red-600">{loadError}</p>
      </main>
    );
  }
  if (!job) return <Navigate to="/clients/projects" replace />;

  return (
    <main className="mx-auto max-w-6xl px-4 py-20 md:py-24">
      <section className="rounded-xl border border-input bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Job posting</p>
            <h1 className="mt-1 text-2xl font-semibold text-heading">
              {job.title}
            </h1>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm capitalize">
            {job.status.replace("_", " ")}
          </span>
        </div>
        <p className="mt-5 whitespace-pre-wrap text-sm text-gray-700">
          {job.description}
        </p>
        <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="block text-gray-500">Budget</span>
            <span className="font-medium">
              {job.currency} {Number(job.budget).toLocaleString()} ({job.budget_type})
            </span>
          </div>
          <div>
            <span className="block text-gray-500">Category</span>
            <span className="font-medium">{job.category || "Not specified"}</span>
          </div>
          <div>
            <span className="block text-gray-500">Experience</span>
            <span className="font-medium">{job.experience_level || "Not specified"}</span>
          </div>
          <div>
            <span className="block text-gray-500">Duration</span>
            <span className="font-medium">{job.duration || "Not specified"}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-input px-3 py-1 text-xs">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Proposals</h2>
          <span className="text-sm text-gray-500">{applications.length} shown</span>
        </div>
        {loadError ? (
          <p role="alert" className="mb-4 text-sm text-red-600">{loadError}</p>
        ) : null}
        {job.status !== "open" ? (
          <p className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            This job is not accepting proposals. Hiring creates a project and contract record; payments, escrow, and withdrawals are disabled.
          </p>
        ) : (
          <p className="mb-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
            Hiring creates a project and contract record. Payments, escrow, and withdrawals are disabled.
          </p>
        )}
        {applications.length === 0 ? (
          <div className="rounded-xl border border-input p-8 text-center text-sm text-gray-500">
            No proposals have been submitted yet.
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <article key={application.id} className="rounded-xl border border-input bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{application.freelancer_name}</h3>
                    <p className="mt-1 text-xs capitalize text-gray-500">
                      {application.status}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    Proposal: {job.currency} {Number(application.proposed_budget).toLocaleString()} · {application.proposed_duration_days} days
                  </p>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm text-gray-700">
                  {application.cover_letter}
                </p>
                {application.proposal_details.milestones?.length ? (
                  <ul className="mt-4 space-y-1 text-sm text-gray-600">
                    {application.proposal_details.milestones.map((milestone) => (
                      <li key={`${milestone.title}-${milestone.due_date}`}>
                        {milestone.title} — {milestone.due_date} — {job.currency} {milestone.amount}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {["submitted", "shortlisted"].includes(application.status) &&
                job.status === "open" ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {application.status === "submitted" ? (
                      <button
                        disabled={savingApplicationId === application.id}
                        onClick={() => void handleApplicationStatus(application, "shortlisted")}
                        className="rounded-lg border border-input px-4 py-2 text-sm disabled:opacity-50"
                      >
                        Shortlist
                      </button>
                    ) : null}
                    <button
                      disabled={savingApplicationId === application.id}
                      onClick={() => void handleApplicationStatus(application, "hired")}
                      className="rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-50"
                    >
                      Hire
                    </button>
                    <button
                      disabled={savingApplicationId === application.id}
                      onClick={() => void handleApplicationStatus(application, "rejected")}
                      className="rounded-lg border border-input px-4 py-2 text-sm disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ProjectDetailsPage;
