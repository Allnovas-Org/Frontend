import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { ArrowRight, X } from "lucide-react";
import ProfileModal from "../ProfileModal";
import AppButton from "../../../components/button/GlobalButton";
import StepTracker from "./StepTracker";
import { Step } from "../../../types";
import DetailsStep from "./steps/DetailsStep";
import TagsStep from "./steps/TagsStep";
import ImagesStep from "./steps/ImagesStep";
import ReviewStep from "./steps/ReviewStep";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const years = Array.from({ length: 30 }, (_, i) => `${2025 - i}`);

const DetailsSchema = Yup.object().shape({
  title: Yup.string().required("Project title is required"),
  description: Yup.string()
    .max(500, "Max 500 characters")
    .required("Project description is required"),
  startMonth: Yup.string().required("Start month is required"),
  startYear: Yup.string().required("Start year is required"),
  endMonth: Yup.string().required("End month is required"),
  endYear: Yup.string().required("End year is required"),
});

const TagsSchema = Yup.object().shape({
  tags: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one tag required"),
});

const ImagesSchema = Yup.object().shape({
  images: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Image title is required"),
      file: Yup.mixed().required("Image is required"),
    })
  ),
});

const steps: Step[] = [
  { id: 1, label: "Details" },
  { id: 2, label: "Tags" },
  { id: 3, label: "Images" },
  { id: 4, label: "Review" },
];

const initialValues = {
  title: "",
  description: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  tags: [],
  images: [
    { title: "", file: null },
    { title: "", file: null },
  ],
};

type ProjectModalStepsProps = {
  open: boolean;
  onClose: () => void;
  onSave: (values: typeof initialValues) => void;
};

const ProjectModalSteps: React.FC<ProjectModalStepsProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [step, setStep] = useState(0);
  const [uploading, setUploading] = useState([false, false]);
  const [uploadProgress, setUploadProgress] = useState([25, 25]);

  interface HandleFileUploadParams {
    file: File;
    idx: number;
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void;
  }

  const handleFileUpload = (
    file: HandleFileUploadParams["file"],
    idx: HandleFileUploadParams["idx"],
    setFieldValue: HandleFileUploadParams["setFieldValue"]
  ): void => {
    setUploading((prev: boolean[]) =>
      prev.map((u, i) => (i === idx ? true : u))
    );
    setUploadProgress((prev: number[]) =>
      prev.map((p, i) => (i === idx ? 25 : p))
    );
    // Simulate upload
    let progress = 25;
    const interval = setInterval(() => {
      progress += 15;
      setUploadProgress((prev: number[]) =>
        prev.map((p, i) => (i === idx ? Math.min(progress, 100) : p))
      );
      if (progress >= 100) {
        clearInterval(interval);
        setUploading((prev: boolean[]) =>
          prev.map((u, i) => (i === idx ? false : u))
        );
      }
    }, 400);
    setFieldValue(`images[${idx}].file`, file);
  };

  interface HandleCancelUploadParams {
    idx: number;
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void;
  }

  const handleCancelUpload = (
    idx: HandleCancelUploadParams["idx"],
    setFieldValue: HandleCancelUploadParams["setFieldValue"]
  ): void => {
    setUploading((prev: boolean[]) =>
      prev.map((u, i) => (i === idx ? false : u))
    );
    setUploadProgress((prev: number[]) =>
      prev.map((p, i) => (i === idx ? 25 : p))
    );
    setFieldValue(`images[${idx}].file`, null);
  };

  const getValidationSchema = () => {
    if (step === 0) return DetailsSchema;
    if (step === 1) return TagsSchema;
    if (step === 2) return ImagesSchema;
    return null;
  };

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      title={`STEP ${step + 1} OF 4`}
      subtitle=''
    >
      {/* Step indicator and tracker */}
      <div className='mb-4'>
        {/* <div className='text-xs text-gray-500 font-medium mb-2'>
          Step {step + 1} of 4
        </div> */}
        <StepTracker steps={steps} currentStep={step + 1} />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema()}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          if (step < 3) {
            setStep(step + 1);
          } else {
            onSave(values);
            onClose();
          }
        }}
      >
        {({
          values,
          errors,
          _touched,
          setFieldValue,
          handleSubmit,
          _handleChange,
          _resetForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            {step === 0 && <DetailsStep values={values} errors={errors} />}
            {step === 1 && (
              <FieldArray name='tags'>
                {({ push, remove }) => (
                  <TagsStep
                    values={values}
                    errors={errors}
                    push={push}
                    remove={remove}
                  />
                )}
              </FieldArray>
            )}
            {step === 2 && (
              <ImagesStep
                values={values}
                errors={errors}
                uploading={uploading}
                uploadProgress={uploadProgress}
                handleFileUpload={handleFileUpload}
                handleCancelUpload={handleCancelUpload}
                setFieldValue={setFieldValue}
              />
            )}
            {step === 3 && <ReviewStep values={values} />}
            <div className='flex justify-end gap-2 mt-8'>
              {step > 0 && (
                <button
                  type='button'
                  className='bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-300 transition'
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type='submit'
                  className='bg-primary text-white px-4 py-2 rounded font-medium flex items-center hover:bg-primary/90 transition'
                >
                  Continue <ArrowRight className='w-4 h-4 ml-1' />
                </button>
              ) : (
                <button
                  type='submit'
                  className='bg-primary text-white px-4 py-2 rounded font-medium flex items-center hover:bg-primary/90 transition'
                >
                  Save <ArrowRight className='w-4 h-4 ml-1' />
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </ProfileModal>
  );
};

export default ProjectModalSteps;
