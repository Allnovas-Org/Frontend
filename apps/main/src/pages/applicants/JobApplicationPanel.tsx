import React, { useEffect, useState } from "react";
import WithdrawModal from "./modal/WithdrawModal";
import ConfirmWithdrawModal from "./modal/ConfirmWithdrawModal";
import { useFormik } from "formik";
import { BackArrowIcon } from "../../assets/applicants/customIcons";

import { SuccessBanner } from "./help";
import ApplicationDetails from "./ApplicationDetails";
import FormSubmission from "./FormSubmission";
import ProjectStructure from "./ProjectStructure";
import { FormContext, FormValues } from "../../store/FormContext";
import { Job } from "../../types";
import {
  ProposalPayload,
  getMyJobProposal,
  submitProposal,
  updateProposal,
  updateProposalStatus,
} from "../../services/jobs.service";
import { getApiErrorMessage } from "../../utils/apiError";

interface JobApplicationPanelProps {
  onClose: () => void;
  job?: Job;
}

const tabs = [
  {
    key: "job-details",
    label: "Job Details",
    icon: "/images/applicants/global.svg",
  },
  {
    key: "form-submission",
    label: "Form Submission",
    icon: "/images/applicants/tasksquare.svg",
  },
  {
    key: "project-structure",
    label: "Project Structure",
    icon: "/images/applicants/calendar-2.svg",
  },
];

const initialValues: FormValues = {
  selectedOptions: "",
  coverLetter: "",
  attachments: [],
  duration: { compensated: false, unifiedPayment: false },
  formRows: [{ description: "", dueDate: "", amount: "" }],
};

const validate = (values: FormValues) => {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (
    !values.selectedOptions ||
    typeof values.selectedOptions !== "string" ||
    values.selectedOptions.trim() === ""
  ) {
    errors.selectedOptions = "Select a duration.";
  }
  if (
    !values.coverLetter ||
    typeof values.coverLetter !== "string" ||
    values.coverLetter.trim() === ""
  ) {
    errors.coverLetter = "Cover letter is required.";
  }
  if (
    !values.duration ||
    typeof values.duration !== "object" ||
    values.duration.compensated === values.duration.unifiedPayment
  ) {
    errors.duration = "Select one project structure.";
  }
  if (
    !values.formRows ||
    !Array.isArray(values.formRows) ||
    !values.formRows.every((row) => {
      const amountValid = Number(row.amount) > 0;
      if (!amountValid) return false;
      return values.duration.compensated
        ? Boolean(row.description.trim() && row.dueDate.trim())
        : true;
    })
  ) {
    errors.formRows = "Enter a valid proposal amount and complete each milestone.";
  }
  return errors;
};

const JobApplicationPanel: React.FC<JobApplicationPanelProps> = ({
  onClose,
  job,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [proposalStatus, setProposalStatus] = useState<
    "submitted" | "shortlisted" | "hired" | "rejected" | "withdrawn" | null
  >(null);
  const [loadingProposal, setLoadingProposal] = useState(Boolean(job));
  const [activeTab, setActiveTab] = React.useState(tabs[0].key);

  const formik = useFormik<FormValues>({
    initialValues,
    validate,
    onSubmit: async (values) => {
      if (!job) {
        setSubmitError("The selected job is unavailable.");
        return;
      }
      const total = values.formRows.reduce(
        (sum, row) => sum + Number(row.amount || 0),
        0,
      );
      const durationDays: Record<string, number> = {
        "Less than 1 month": 14,
        "1 to 3 months": 60,
        "3 to 6 months": 120,
        "More than 6 months": 180,
      };
      const proposedDurationDays = durationDays[values.selectedOptions];
      if (!proposedDurationDays) {
        setSubmitError("Select a valid proposal duration.");
        return;
      }
      const proposal: ProposalPayload = {
        job_id: job.id,
        cover_letter: values.coverLetter,
        proposed_budget: total.toFixed(2),
        proposed_duration_days: proposedDurationDays,
        proposal_details: {
          compensation_type: values.duration.compensated ? "milestone" : "fixed",
          milestones: values.duration.compensated
            ? values.formRows.map((row) => ({
                title: row.description,
                due_date: row.dueDate,
                amount: Number(row.amount).toFixed(2),
              }))
            : [],
        },
      };
      try {
        setSubmitError("");
        const result =
          editing && proposalId
            ? await updateProposal(proposalId, proposal)
            : await submitProposal(proposal);
        setProposalId(result.id || proposalId);
        setProposalStatus(result.status);
        setSubmitted(true);
        setEditing(false);
      } catch (error) {
        setSubmitError(getApiErrorMessage(error, "Unable to submit proposal."));
      }
    },
  });
  const { setValues, resetForm } = formik;
  const jobId = job?.id;

  useEffect(() => {
    if (!jobId) return;
    let active = true;
    setLoadingProposal(true);
    getMyJobProposal(jobId)
      .then((proposal) => {
        if (!active || !proposal) return;
        const duration =
          proposal.proposed_duration_days < 30
            ? "Less than 1 month"
            : proposal.proposed_duration_days <= 90
              ? "1 to 3 months"
              : proposal.proposed_duration_days <= 180
                ? "3 to 6 months"
                : "More than 6 months";
        const milestones = proposal.proposal_details.milestones || [];
        setValues({
          selectedOptions: duration,
          coverLetter: proposal.cover_letter,
          attachments: [],
          duration: {
            compensated:
              proposal.proposal_details.compensation_type === "milestone",
            unifiedPayment:
              proposal.proposal_details.compensation_type !== "milestone",
          },
          formRows:
            milestones.length > 0
              ? milestones.map((milestone) => ({
                  description: milestone.title,
                  dueDate: milestone.due_date,
                  amount: milestone.amount,
                }))
              : [
                  {
                    description: "",
                    dueDate: "",
                    amount: proposal.proposed_budget,
                  },
                ],
        });
        setProposalId(proposal.id);
        setProposalStatus(proposal.status);
        setSubmitted(true);
      })
      .catch((error: unknown) => {
        if (active) {
          setSubmitError(
            getApiErrorMessage(error, "Unable to load your proposal."),
          );
        }
      })
      .finally(() => {
        if (active) setLoadingProposal(false);
      });
    return () => {
      active = false;
    };
  }, [jobId, setValues]);

  const isFormFilled = Object.keys(validate(formik.values)).length === 0;
  const handleWithdraw = async () => {
    if (!proposalId) return;
    try {
      await updateProposalStatus(proposalId, "withdrawn");
      setShowConfirmModal(false);
      setSubmitted(false);
      setProposalId(null);
      setProposalStatus(null);
      resetForm();
      setShowConfirmModal(true);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, "Unable to withdraw proposal."));
      setShowConfirmModal(false);
    }
  };

  return (
    <div className='min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-2'>
      <div className='max-w-6xl mx-auto'>
        {/* Success Banner */}
        {submitted ? <SuccessBanner /> : null}
        {submitError ? (
          <p role='alert' className='mb-4 text-sm text-red-600'>
            {submitError}
          </p>
        ) : null}
        {loadingProposal ? (
          <p className='mb-4 text-sm text-gray-500'>Loading your proposal…</p>
        ) : null}
        {proposalStatus ? (
          <p className='mb-4 text-sm text-gray-600'>
            Proposal status: {proposalStatus}
          </p>
        ) : null}
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-heading'>Submit a Proposal</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 focus:outline-none'
          >
            <BackArrowIcon className='w-6 h-6' />
          </button>
        </div>
        <div className='flex gap-3 mb-6'>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-base border border-gray-lighter focus:outline-none transition-colors shadow-sm
                ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : " text-gray-700 hover:bg-primary/10 hover:text-primary"
                }
              `}
              onClick={() => setActiveTab(tab.key)}
            >
              <img src={tab.icon} alt='' className='w-5 h-5 text-gray-light' />
              {tab.label}
            </button>
          ))}
        </div>
        <FormContext.Provider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className='min-h-[120px]'>
              {activeTab === "form-submission" ? (
                <FormSubmission job={job} />
              ) : activeTab === "project-structure" ? (
                <ProjectStructure />
              ) : (
                <ApplicationDetails job={job} />
              )}
            </div>
            <div className='flex justify-end gap-4 mt-4'>
              {!submitted || editing ? (
                <>
                  <button
                    type='button'
                    onClick={() => {
                      setEditing(false);
                      setSubmitted(false);
                      setActiveTab(tabs[0].key);
                    }}
                    className='text-sm px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className={`text-sm px-4 py-2 rounded-lg font-semibold transition-colors
                      ${
                        isFormFilled
                          ? "bg-primary text-white hover:bg-primary-dark"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    disabled={!isFormFilled || loadingProposal}
                  >
                    Submit Proposal
                  </button>
                </>
              ) : (
                <>
                  <button
                    type='button'
                    onClick={() => setShowWithdrawModal(true)}
                    disabled={!["submitted", "shortlisted"].includes(proposalStatus || "")}
                    className='text-sm px-4 py-2  text-gray-darker rounded-lg  font-normal border border-input'
                  >
                    Withdraw proposal
                  </button>
                  <button
                    type='button'
                    disabled={proposalStatus !== "submitted"}
                    onClick={() => {
                      setEditing(true);
                      setActiveTab("form-submission");
                      setSubmitted(false); // Hide SuccessBanner
                      console.log("submitted state after click:", submitted);
                    }}
                    className='text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary font-normal border border-primary'
                  >
                    Edit proposal
                  </button>
                </>
              )}
            </div>
          </form>
        </FormContext.Provider>
        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <WithdrawModal
            onCancel={() => setShowWithdrawModal(false)}
            onContinue={() => {
              setShowWithdrawModal(false);
              void handleWithdraw();
            }}
          />
        )}
        {/* Confirm Modal */}
        {showConfirmModal && (
          <ConfirmWithdrawModal
            onClose={() => {
              setShowConfirmModal(false);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default JobApplicationPanel;
