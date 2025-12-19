import React, { useEffect, useState } from "react";
import WithdrawModal from "./modal/WithdrawModal";
import ConfirmWithdrawModal from "./modal/ConfirmWithdrawModal";
import { useFormik, FormikValues } from "formik";
import {
  MagnifierIcon,
  TimeIcon,
  FilterIcon,
  BackArrowIcon,
} from "../../assets/applicants/customIcons";

import { SuccessBanner } from "./help";
import ApplicationDetails from "./ApplicationDetails";
import FormSubmission from "./FormSubmission";
import ProjectStructure from "./ProjectStructure";
import { FormContext } from "../../store/FormContext";

interface JobApplicationPanelProps {
  onClose: () => void;
  job?: import("./JobCard").Job;
}

interface FormValues {
  selectedOptions: string;
  coverLetter: string;
  attachments: any[];
  duration: { compensated: boolean; unifiedPayment: boolean };
  formRows: { description: string; dueDate: string; amount: string }[];
}

const tabs = [
  {
    key: "job-details",
    label: "Job Details",
    icon: "/images/applicants/global.svg",
    content: <ApplicationDetails />,
  },
  {
    key: "form-submission",
    label: "Form Submission",
    icon: "/images/applicants/tasksquare.svg",
    content: <FormSubmission />,
  },
  {
    key: "project-structure",
    label: "Project Structure",
    icon: "/images/applicants/calendar-2.svg",
    content: <ProjectStructure />,
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
    (!values.duration.compensated && !values.duration.unifiedPayment)
  ) {
    errors.duration = "Select at least one payment method.";
  }
  if (
    !values.formRows ||
    !Array.isArray(values.formRows) ||
    !values.formRows.every(
      (row) =>
        typeof row.description === "string" &&
        row.description.trim() !== "" &&
        typeof row.dueDate === "string" &&
        row.dueDate.trim() !== "" &&
        typeof row.amount === "string" &&
        row.amount.trim() !== ""
    )
  ) {
    errors.formRows = "Fill all fields in each compensation row.";
  }
  return errors;
};

const JobApplicationPanel: React.FC<JobApplicationPanelProps> = ({
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const saved = localStorage.getItem("jobApplicationForm");
  const [activeTab, setActiveTab] = React.useState(tabs[0].key);

  const formik = useFormik<FormValues>({
    initialValues: saved ? JSON.parse(saved) : initialValues,
    validate,
    onSubmit: (values) => {
      localStorage.setItem("jobApplicationForm", JSON.stringify(values));
      setSubmitted(true);
      console.log("Form submitted:", values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    localStorage.setItem("jobApplicationForm", JSON.stringify(formik.values));
  }, [formik.values]);

  const isFormFilled = Object.keys(validate(formik.values)).length === 0;

  return (
    <div className='min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-2'>
      <div className='max-w-6xl mx-auto'>
        {/* Success Banner */}
        {submitted ? <SuccessBanner /> : null}
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
                <FormSubmission />
              ) : activeTab === "project-structure" ? (
                <ProjectStructure />
              ) : (
                tabs.find((tab) => tab.key === activeTab)?.content
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
                    disabled={!isFormFilled}
                  >
                    Submit Proposal
                  </button>
                </>
              ) : (
                <>
                  <button
                    type='button'
                    onClick={() => setShowWithdrawModal(true)}
                    className='text-sm px-4 py-2  text-gray-darker rounded-lg  font-normal border border-input'
                  >
                    Withdraw proposal
                  </button>
                  <button
                    type='button'
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
              setShowConfirmModal(true);
            }}
          />
        )}
        {/* Confirm Modal */}
        {showConfirmModal && (
          <ConfirmWithdrawModal onClose={() => setShowConfirmModal(false)} />
        )}
      </div>
    </div>
  );
};

export default JobApplicationPanel;
