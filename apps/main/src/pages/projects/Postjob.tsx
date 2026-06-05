import React, { useState, useMemo } from "react";
import { ProjectCategory } from "../../types";

import { useFormik } from "formik";
import { ArrowLeft, Plus, Minus, CircleCheck, X, Bookmark } from "lucide-react";
import { postJobSchema } from "./postJobSchema";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { getProjectById, updateProject } from "./store/project.store";

interface PostJobFormValues {
  title: string;
  description: string;
  category: ProjectCategory | "";
  freelancers: number;
  budgetType: string;
  duration: string;
  totalBudget: string;
  skills: string[];
  experienceLevel: string;
}

const FieldError = ({ error }: { error?: string }) => {
  if (!error) return null;

  return <p className='mt-1 text-xs text-primary'>{error}</p>;
};

const PostJob = () => {
  const { jobId } = useParams();
  const [showPostSuccessAlert, setShowPostSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [skillInput, setSkillInput] = useState("");

  // Autofill support for reuse
  const reuseProject = location.state?.reuseProject;
  const isEditMode = Boolean(jobId);
  const isReuseMode = Boolean(reuseProject) && !isEditMode;
  const isEditableFlow = isEditMode || isReuseMode;

  const addSkill = (skill: string) => {
    if (!skill.trim()) return;
    if (formik.values.skills.includes(skill)) return;

    formik.setFieldValue("skills", [...formik.values.skills, skill.trim()]);
  };

  const removeSkill = (skill: string) => {
    formik.setFieldValue(
      "skills",
      formik.values.skills.filter((s) => s !== skill),
    );
  };

  const existingJob = useMemo(() => {
    if (reuseProject) return reuseProject;
    if (!jobId) return null;
    return getProjectById(jobId);
  }, [jobId, reuseProject]);

  const formik = useFormik<PostJobFormValues>({
    enableReinitialize: true,

    initialValues: {
      title: existingJob?.title ?? "",
      description: existingJob?.description ?? "",
      category: existingJob?.categories?.[0] ?? "",
      freelancers: 1,
      budgetType: "",
      duration: existingJob?.duration ?? "",
      totalBudget: existingJob?.budget?.toString() ?? "",
      skills: existingJob?.skills ?? [],
      experienceLevel: "",
    },

    validationSchema: isEditableFlow ? undefined : postJobSchema,

    onSubmit: (values) => {
      if (isEditMode && jobId) {
        updateProject(jobId, {
          title: values.title,
          description: values.description,
          categories: values.category ? [values.category] : [],
          skills: values.skills,
          budget: Number(values.totalBudget),
          duration: values.duration,
        });
        setShowPostSuccessAlert(true);
        return;
      }

      if (isReuseMode && formik.dirty) {
        setShowPostSuccessAlert(true);
        return;
      }

      navigate("/applicants/projects", { state: { newJob: values } });
    },
  });

  const hasStartedEditing = formik.dirty;
  const secondaryButtonLabel =
    isEditableFlow && !hasStartedEditing ? "Cancel" : "Save as draft";
  const primaryButtonLabel = isEditableFlow
    ? hasStartedEditing
      ? "Post Job"
      : isEditMode
        ? "Save changes"
        : "Continue"
    : "Post Job";

  return (
    <section className='mx-auto max-w-4xl py-20 md:py-20 lg:py-32 px-4 md:px-6'>
      {/* Header */}
      <header className='mb-6'>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='rounded-full border border-input p-2'
            aria-label='Go back'
          >
            <ArrowLeft className='h-4 w-4' />
          </button>
          <h1 className='text-xl font-semibold'>Post a Job</h1>
        </div>
        <p className='mt-1 text-sm text-gray-dark'>
          {isEditMode
            ? "Update your job posting details"
            : "Your go-to platform to post jobs and connect with exceptional talent and visionary creatives!"}
        </p>
      </header>

      {showPostSuccessAlert && (
        <div className='mb-4 flex items-start justify-between gap-3 rounded-lg border border-input p-3 bg-green-100'>
          <div className='flex items-start gap-2 '>
            <CircleCheck className='mt-0.5 h-5 w-5 text-green-600' />
            <p className='text-xs text-gray-dark'>
              Your new job post is now live and visible to freelancers. Get
              ready to receive proposals from skilled hands!{" "}
              <Link
                to='/applicants/projects'
                className='font-medium text-primary underline'
              >
                job posting dashboard
              </Link>
            </p>
          </div>

          <button
            type='button'
            onClick={() => setShowPostSuccessAlert(false)}
            aria-label='Close success alert'
            className='text-gray-dark'
          >
            <X className='h-4 w-4' />
          </button>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={formik.handleSubmit}
        className='rounded-xl border border-input bg-white p-6'
      >
        {/* Project Details */}
        <section className='mb-8'>
          <h2 className='font-semibold'>Project Details</h2>
          <p className='text-sm text-gray-dark'>
            Provide the basic information about your job posting
          </p>

          <div className='mt-4 space-y-4'>
            <div>
              <label className='text-sm font-medium'>Project Title</label>
              <input
                name='title'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 w-full rounded-lg border border-input px-4 py-2 text-sm focus:outline-none ${
                  formik.touched.title && formik.errors.title
                    ? "border-primary"
                    : ""
                }`}
                placeholder='e.g Senior product designer'
              />
              <FieldError
                error={formik.touched.title ? formik.errors.title : undefined}
              />
            </div>

            <div>
              <label className='text-sm font-medium'>Project Description</label>
              <textarea
                name='description'
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={4}
                placeholder='Describe the project role, qualifications, responsibilities and any specific instructions'
                className='mt-1 w-full focus:outline-none rounded-lg border border-input px-4 py-2 text-sm'
              />
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <label className='text-sm font-medium'>Category</label>
                <select
                  name='category'
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 focus:outline-none w-full rounded-lg border border-input px-4 py-2 text-sm ${
                    formik.touched.category && formik.errors.category
                      ? "border-primary"
                      : ""
                  }`}
                >
                  <option value=''>Select a category</option>
                  <option>Web Development</option>
                  <option>Mobile App Development</option>
                  <option>Writing & Translation</option>
                </select>

                <FieldError
                  error={
                    formik.touched.category ? formik.errors.category : undefined
                  }
                />
              </div>

              <div>
                <label className='text-sm font-medium'>
                  Freelancers Needed
                </label>

                <div className='mt-1 flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={() =>
                      formik.setFieldValue(
                        "freelancers",
                        Math.max(1, formik.values.freelancers - 1),
                      )
                    }
                    className='rounded-lg border border-input p-2'
                  >
                    <Minus size={16} />
                  </button>

                  <span className='w-10 text-center text-sm'>
                    {formik.values.freelancers}
                  </span>

                  <button
                    type='button'
                    onClick={() =>
                      formik.setFieldValue(
                        "freelancers",
                        formik.values.freelancers + 1,
                      )
                    }
                    className='rounded-lg border border-input p-2'
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Budget & Timeline */}
        <section className='mb-8'>
          <h2 className='font-semibold'>Budget and Timeline</h2>
          <p className='text-sm text-gray-dark'>
            Set your budget and project timeline
          </p>

          <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label className='text-sm font-medium'>Budget Type</label>
              <select
                name='budgetType'
                value={formik.values.budgetType}
                onChange={formik.handleChange}
                className='mt-1 w-full rounded-lg border border-input focus:outline-none px-4 py-2 text-sm'
              >
                <option value=''>Select budget type</option>
                <option>Fixed</option>
                <option>Hourly</option>
              </select>
            </div>

            <div>
              <label className='text-sm font-medium'>Project Duration</label>
              <select
                name='duration'
                value={formik.values.duration}
                onChange={formik.handleChange}
                className='mt-1 w-full rounded-lg border border-input focus:outline-none px-4 py-2 text-sm'
              >
                <option value=''>Select project duration</option>
                <option>Less than 1 month</option>
                <option>1 – 3 months</option>
                <option>3 – 6 months</option>
              </select>
            </div>

            <div>
              <label className='text-sm font-medium'>Total Budget ($)</label>
              <input
                name='totalBudget'
                value={formik.values.totalBudget}
                onChange={formik.handleChange}
                placeholder='Input your total budget'
                className='mt-1 w-full rounded-lg border border-input focus:outline-none px-4 py-2 text-sm'
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className='font-semibold'>Skills and Requirements</h2>
          <p className='text-sm text-gray-dark'>
            Specify the skills and experience level required
          </p>

          <div className='mt-4 space-y-4'>
            <div>
              <label className='text-sm font-medium'>Required Skills</label>

              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addSkill(skillInput);
                    setSkillInput("");
                  }
                }}
                placeholder='Type a skill and press enter'
                className='mt-1 w-full rounded-lg border border-input focus:outline-none px-4 py-2 text-sm'
              />

              <div className='mt-2 flex flex-wrap gap-2'>
                {formik.values.skills.map((skill) => (
                  <span
                    key={skill}
                    className='flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs'
                  >
                    {skill}
                    <button
                      type='button'
                      onClick={() => removeSkill(skill)}
                      className='text-gray-dark hover:text-primary'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {formik.touched.skills && formik.errors.skills && (
                <p className='mt-1 text-xs text-primary'>
                  {formik.errors.skills}
                </p>
              )}
            </div>

            <div>
              <label className='text-sm font-medium'>Experience Level</label>
              <select
                name='experienceLevel'
                value={formik.values.experienceLevel}
                onChange={formik.handleChange}
                className='mt-1 w-full rounded-lg border border-input focus:outline-none px-4 py-2 text-sm'
              >
                <option value=''>Select experience level</option>
                <option>Junior</option>
                <option>Mid-level</option>
                <option>Senior</option>
              </select>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className='mt-8 flex justify-end gap-3 border-t border-input pt-4'>
          <button
            type='button'
            onClick={
              secondaryButtonLabel === "Cancel" ? () => navigate(-1) : undefined
            }
            className='rounded-lg text-gray-dark border border-input px-4 py-2 text-sm inline-flex items-center gap-2'
          >
            {secondaryButtonLabel === "Save as draft" && <Bookmark size={16} />}
            {secondaryButtonLabel}
          </button>

          <button
            type='submit'
            disabled={
              isEditableFlow && hasStartedEditing
                ? formik.isSubmitting
                : !formik.isValid || formik.isSubmitting
            }
            className='rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-50'
          >
            {primaryButtonLabel}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostJob;
