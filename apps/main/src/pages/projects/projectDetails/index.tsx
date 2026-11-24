import React, { useEffect, useRef, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  ApiJob,
  JobApplication,
  Page,
  getJob,
  listJobApplications,
  setApplicationStatus,
} from "../../../services/jobs.service";
import { getApiErrorMessage } from "../../../utils/apiError";
import {
  ApiProject,
  listProjects,
  updateMilestoneStatus,
  updateProjectStatus,
} from "../../../services/projects.service";

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [job, setJob] = useState<ApiJob | null>(null);
  const [applicationPage, setApplicationPage] = useState<Page<JobApplication> | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const pageRequest = useRef(0);
  const [project, setProject] = useState<ApiProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [savingApplicationId, setSavingApplicationId] = useState<string | null>(
    null,
  );
  const [savingProject, setSavingProject] = useState(false);
  const [savingMilestoneId, setSavingMilestoneId] = useState<number | null>(null);

  useEffect(() => {
    if (!projectId) return;
    let active = true;
    setLoading(true);
    setLoadingApplications(false);
    setLoadError("");
    Promise.all([
      getJob(projectId),
      listJobApplications(projectId),
      listProjects(1, 100),
    ])
      .then(([jobResult, applicationPage, projectPage]) => {
        if (!active) return;
        setJob(jobResult);
        setApplicationPage(applicationPage);
        setPageNumber(1);
        setProject(projectPage.results.find((item) => item.job === projectId) || null);
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
      pageRequest.current += 1;
    };
  }, [projectId]);

  const changeApplicationPage = async (page: number) => {
    if (!projectId || loadingApplications || savingApplicationId) return;
    const requestId = ++pageRequest.current;
    setLoadingApplications(true);
    setLoadError("");
    try {
      const result = await listJobApplications(projectId, page);
      if (requestId !== pageRequest.current) return;
      setApplicationPage(result);
      setPageNumber(page);
    } catch (error) {
      if (requestId === pageRequest.current) {
        setLoadError(getApiErrorMessage(error, "Unable to load proposals."));
      }
    } finally {
      if (requestId === pageRequest.current) setLoadingApplications(false);
    }
  };

  const handleApplicationStatus = async (
    application: JobApplication,
    nextStatus: "shortlisted" | "hired" | "rejected",
  ) => {
    setSavingApplicationId(application.id);
    setLoadError("");
    try {
      const updated = await setApplicationStatus(application.id, nextStatus);
      setApplicationPage((current) =>
        current && {
          ...current,
          results: current.results.map((item) => {
            if (item.id === updated.id) return updated;
            if (nextStatus === "hired" && item.status !== "withdrawn") {
              return { ...item, status: "rejected" };
            }
            return item;
          }),
        },
      );
      if (nextStatus === "hired") {
        setJob((current) => current && { ...current, status: "in_progress" });
        if (!updated.project) {
          throw new Error("Hiring succeeded, but the project details were not returned.");
        }
        setProject(updated.project);
      }
    } catch (error) {
      setLoadError(
        getApiErrorMessage(error, "Unable to update this proposal."),
      );
    } finally {
      setSavingApplicationId(null);
    }
  };

  const handleProjectStatus = async (
    nextStatus: "active" | "on_hold" | "completed" | "cancelled",
  ) => {
    if (!project) return;
    setSavingProject(true);
    setLoadError("");
    try {
      setProject(await updateProjectStatus(project.id, nextStatus));
    } catch (error) {
      setLoadError(getApiErrorMessage(error, "Unable to update project status."));
    } finally {
      setSavingProject(false);
    }
  };

  const handleMilestoneStatus = async (
    milestoneId: number,
    nextStatus: "approved" | "revision_requested",
  ) => {
    if (!project) return;
    setSavingMilestoneId(milestoneId);
    setLoadError("");
    try {
      const updated = await updateMilestoneStatus(milestoneId, nextStatus);
      setProject((current) =>
        current?.contract
          ? {
              ...current,
              contract: {
                ...current.contract,
                milestones: current.contract.milestones.map((milestone) =>
                  milestone.id === updated.id ? updated : milestone,
                ),
              },
            }
          : current,
      );
    } catch (error) {
      setLoadError(getApiErrorMessage(error, "Unable to update milestone."));
    } finally {
      setSavingMilestoneId(null);
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

      {project ? (
        <section className="mt-8 rounded-xl border border-input bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Hired project</p>
              <h2 className="mt-1 text-xl font-semibold">{project.title}</h2>
              <p className="mt-1 text-sm text-gray-600">
                Freelancer: {project.freelancer_name}
              </p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm capitalize">
              {project.status.replace("_", " ")}
            </span>
          </div>

          {project.contract ? (
            <div className="mt-5">
              <p className="text-sm text-gray-700">
                Contract: {project.contract.currency}{" "}
                {Number(project.contract.total_amount).toLocaleString()}
              </p>
              {project.contract.milestones.length ? (
                <div className="mt-4 space-y-3">
                  {project.contract.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-50 p-4"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{milestone.title}</p>
                        <p className="text-sm text-gray-500">
                          {milestone.status.replace("_", " ")} · {project.contract?.currency}{" "}
                          {Number(milestone.amount).toLocaleString()}
                        </p>
                      </div>
                      {project.status === "active" && milestone.status === "submitted" ? (
                        <div className="flex gap-2">
                          <button
                            disabled={savingMilestoneId === milestone.id}
                            onClick={() => void handleMilestoneStatus(milestone.id, "approved")}
                            className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            disabled={savingMilestoneId === milestone.id}
                            onClick={() =>
                              void handleMilestoneStatus(milestone.id, "revision_requested")
                            }
                            className="rounded-lg border border-input px-3 py-2 text-sm disabled:opacity-50"
                          >
                            Request revision
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">No milestones have been added.</p>
              )}
            </div>
          ) : (
            <p className="mt-5 text-sm text-gray-500">No contract is attached to this project.</p>
          )}

          {project.status !== "completed" && project.status !== "cancelled" ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.status === "active" ? (
                <button
                  disabled={savingProject}
                  onClick={() => void handleProjectStatus("on_hold")}
                  className="rounded-lg border border-input px-4 py-2 text-sm disabled:opacity-50"
                >
                  Put on hold
                </button>
              ) : (
                <button
                  disabled={savingProject}
                  onClick={() => void handleProjectStatus("active")}
                  className="rounded-lg border border-input px-4 py-2 text-sm disabled:opacity-50"
                >
                  Resume
                </button>
              )}
              <button
                disabled={
                  savingProject ||
                  !!project.contract?.milestones.some(
                    (milestone) => milestone.status !== "approved",
                  )
                }
                onClick={() => void handleProjectStatus("completed")}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                Complete project
              </button>
              <button
                disabled={savingProject}
                onClick={() => void handleProjectStatus("cancelled")}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 disabled:opacity-50"
              >
                Cancel project
              </button>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Proposals</h2>
          <span className="text-sm text-gray-500">
            {applicationPage?.count ?? 0} proposals
          </span>
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
        {applicationPage?.results.length === 0 ? (
          <div className="rounded-xl border border-input p-8 text-center text-sm text-gray-500">
            No proposals have been submitted yet.
          </div>
        ) : (
          <div className="space-y-4">
            {applicationPage?.results.map((application) => (
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
                        disabled={savingApplicationId !== null || loadingApplications}
                        onClick={() => void handleApplicationStatus(application, "shortlisted")}
                        className="rounded-lg border border-input px-4 py-2 text-sm disabled:opacity-50"
                      >
                        Shortlist
                      </button>
                    ) : null}
                    <button
                      disabled={savingApplicationId !== null || loadingApplications}
                      onClick={() => void handleApplicationStatus(application, "hired")}
                      className="rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-50"
                    >
                      Hire
                    </button>
                    <button
                      disabled={savingApplicationId !== null || loadingApplications}
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
        {applicationPage && (applicationPage.previous || applicationPage.next) ? (
          <div className="mt-4 flex items-center justify-between text-sm">
            <button
              disabled={!applicationPage.previous || loadingApplications || savingApplicationId !== null}
              onClick={() => void changeApplicationPage(pageNumber - 1)}
              className="rounded-lg border border-input px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span>{loadingApplications ? "Loading proposals…" : `Page ${pageNumber}`}</span>
            <button
              disabled={!applicationPage.next || loadingApplications || savingApplicationId !== null}
              onClick={() => void changeApplicationPage(pageNumber + 1)}
              className="rounded-lg border border-input px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default ProjectDetailsPage;
