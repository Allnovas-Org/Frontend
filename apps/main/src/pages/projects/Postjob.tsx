import React, { useEffect, useRef, useState } from "react";
import { useFormik, yupToFormErrors } from "formik";
import { ValidationError } from "yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Minus, Bookmark } from "lucide-react";
import { draftJobSchema, formValues, openJobEditSchema, postJobSchema, type PostJobFormValues } from "./postJobSchema";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getOwnedEditableJob, getReusableClientJob,
} from "../../services/client-jobs.service";
import { useAuthStore } from "../../store/useAuthStore";
import { getRetryAfterSeconds, hasRetryAfter } from "../../utils/apiError";
import { getJobErrorMessage } from "./jobError";
import { invalidateClientJobQueries } from "./jobCache";
import { submitJob } from "./jobSubmission";

const FieldError = ({ error }: { error?: string }) => {
  if (!error) return null;

  return <p className='mt-1 text-xs text-primary'>{error}</p>;
};

const emptyValues: PostJobFormValues = {
  title: "", description: "", category: "", freelancers: 1, budgetType: "",
  duration: "", totalBudget: "", skills: [], experienceLevel: "",
};

const PostJob = () => {
  const { jobId } = useParams();
  const [searchParams] = useSearchParams();
  const reuseId = jobId ? null : searchParams.get("reuse");
  const sourceId = jobId || reuseId;
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user?.id);
  const queryClient = useQueryClient();
  const [skillInput, setSkillInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [uncertain, setUncertain] = useState(false);
  const [retryUntil, setRetryUntil] = useState<number | null>(null);
  const [retryRemaining, setRetryRemaining] = useState(0);
  const busyRef = useRef(false);
  const source = useQuery({
    queryKey: [jobId ? "client-job-draft" : "client-job-reuse", userId, sourceId],
    queryFn: () => {
      if (!sourceId) throw new Error("A job ID is required.");
      return jobId ? getOwnedEditableJob(sourceId) : getReusableClientJob(sourceId);
    },
    enabled: Boolean(userId && sourceId),
    staleTime: 60_000,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (retryUntil === null || retryUntil === Infinity) return;
    const update = () => setRetryRemaining(Math.max(0, Math.ceil((retryUntil - Date.now()) / 1000)));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [retryUntil]);
  const retryBlocked = retryUntil === Infinity || (retryUntil !== null && Date.now() < retryUntil);

  const addSkill = (skill: string) => {
    if (!skill.trim()) return;
    const trimmed = skill.trim();
    if (formik.values.skills.includes(trimmed)) return;
    formik.setFieldValue("skills", [...formik.values.skills, trimmed]);
  };

  const removeSkill = (skill: string) => {
    formik.setFieldValue(
      "skills",
      formik.values.skills.filter((s) => s !== skill),
    );
  };

  const formik = useFormik<PostJobFormValues>({
    enableReinitialize: true,
    initialValues: source.data ? formValues(source.data) : emptyValues,
    validationSchema: jobId && source.data?.status === "open" ? openJobEditSchema : postJobSchema,
    onSubmit: async (values) => { await saveJob(values, "publish"); },
  });

  const saveJob = async (values: PostJobFormValues, action: "draft" | "publish") => {
    if (busyRef.current || retryBlocked || uncertain) return;
    if (skillInput.trim()) {
      formik.setFieldError("skills", "Press Enter to add the pending skill.");
      formik.setFieldTouched("skills", true, false);
      return;
    }
    busyRef.current = true;
    setBusy(true);
    formik.setStatus(undefined);
    let writeMayHaveSucceeded = false;
    try {
      if (sourceId && !source.data) throw new Error("The job could not be loaded.");
      if (action === "draft") {
        await draftJobSchema.validate(values, { abortEarly: false });
      }
      const currency = source.data?.currency || "USD";
      const result = await submitJob({
        id: jobId, sourceStatus: source.data?.status, values, currency, action,
        onUpdated: () => invalidateClientJobQueries(queryClient, userId, "none"),
        onPostStart: () => { writeMayHaveSucceeded = true; },
      });
      if (!result || !result.id || (jobId && result.id !== jobId) || result.status !== (action === "draft" ? "draft" : "open")) {
        setUncertain(true);
        throw new Error("The server response could not confirm the job status. Check Job History before trying again.");
      }
      await invalidateClientJobQueries(queryClient, userId, "active");
      if (jobId && source.data?.status === "open") {
        navigate("/clients/projects", { state: { jobNotice: "Changes saved." } });
      } else {
        navigate("/clients/profile", { state: { activeTab: "Job History", jobNotice: action === "draft" ? "Draft saved." : "Job posted successfully." } });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        formik.setErrors(yupToFormErrors<PostJobFormValues>(error));
        void formik.setTouched({ title: true, description: true, category: true, freelancers: true, budgetType: true, duration: true, totalBudget: true, skills: true, experienceLevel: true }, false);
      } else {
        const failure = error && typeof error === "object" ? error as { status?: number; data?: unknown } : {};
        if (failure.status === 429) setRetryUntil(hasRetryAfter(error) ? Date.now() + getRetryAfterSeconds(error) * 1000 : Infinity);
        const ambiguous = writeMayHaveSucceeded && (!failure.status || failure.status >= 500);
        if (ambiguous) setUncertain(true);
        const fieldMap: Record<string, keyof PostJobFormValues> = {
          title: "title", description: "description", category: "category", skills: "skills",
          freelancers_needed: "freelancers", budget_type: "budgetType", budget: "totalBudget",
          project_duration: "duration", experience_level: "experienceLevel",
        };
        if (failure.data && typeof failure.data === "object") {
          for (const [field, value] of Object.entries(failure.data)) {
            const name = fieldMap[field];
            const message = typeof value === "string" ? value : Array.isArray(value) && typeof value[0] === "string" ? value[0] : "";
            if (name && message) {
              formik.setFieldError(name, message);
              void formik.setFieldTouched(name, true, false);
            }
          }
        }
        formik.setStatus(ambiguous
          ? "The result could not be confirmed. Check Job History before trying again."
          : getJobErrorMessage(error, "Could not save your job. Please try again."));
      }
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  if (sourceId && source.isPending) return <p role='status' className='p-8 text-sm text-gray-600'>Loading your job...</p>;
  if (sourceId && source.isError) return <div role='alert' className='p-8 text-sm text-red-700'>{getJobErrorMessage(source.error, "Could not load your job.")} <Link className='underline' to='/clients/projects'>My Projects</Link></div>;
  const editingOpen = Boolean(jobId && source.data?.status === "open");
  const currencyLabel = !source.data || source.data.currency === "USD" ? "$" : source.data.currency;

  return (
    <section className='mx-auto max-w-4xl py-20 md:py-20 lg:py-32 px-4 md:px-6'>
      {/* Header */}
      <header className='mb-6'>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            onClick={() => navigate(-1)}
            disabled={busy}
            className='rounded-full border border-input p-2'
            aria-label='Go back'
          >
            <ArrowLeft className='h-4 w-4' />
          </button>
          <h1 className='text-xl font-semibold'>{jobId ? "Edit job posting" : "Post a Job"}</h1>
        </div>
        <p className='mt-1 text-sm text-gray-dark'>
          {jobId
            ? "Update your job posting details"
            : "Your go-to platform to post jobs and connect with exceptional talent and visionary creatives!"}
        </p>
      </header>

      {formik.status && <div role='alert' className='mb-4 rounded-lg border border-input p-3 text-sm text-gray-dark'>
        {formik.status} {retryBlocked && retryRemaining > 0 && `Try again in ${retryRemaining}s.`} {uncertain && <Link className='underline' to='/clients/profile' state={{ activeTab: "Job History" }}>Job History</Link>}
      </div>}

      {/* Form */}
      <form
        onSubmit={formik.handleSubmit}
        className='rounded-xl border border-input bg-white p-6'
      >
        <fieldset disabled={busy}>
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
                onBlur={formik.handleBlur}
                rows={4}
                placeholder='Describe the project role, qualifications, responsibilities and any specific instructions'
                className='mt-1 w-full focus:outline-none rounded-lg border border-input px-4 py-2 text-sm'
              />
              <FieldError error={formik.touched.description ? formik.errors.description : undefined} />
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
                  {formik.values.category && !["Web Development", "Mobile App Development", "Writing & Translation"].includes(formik.values.category) && <option value={formik.values.category}>{formik.values.category}</option>}
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
                        Math.max(1, (formik.values.freelancers ?? 1) - 1),
                      )
                    }
                    className='rounded-lg border border-input p-2'
                  >
                    <Minus size={16} />
                  </button>

                  <span className='w-10 text-center text-sm'>
                    {formik.values.freelancers ?? "—"}
                  </span>

                  <button
                    type='button'
                    onClick={() =>
                      formik.setFieldValue(
                        "freelancers",
                        Math.min(2147483647, (formik.values.freelancers ?? 0) + 1),
                      )
                    }
                    className='rounded-lg border border-input p-2'
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <FieldError error={formik.touched.freelancers ? formik.errors.freelancers : undefined} />
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
                onBlur={formik.handleBlur}
                className='mt-1 w-full rounded-lg border border-input focus:outline-none px-4 py-2 text-sm'
              >
                <option value=''>Select budget type</option>
                <option value='fixed'>Fixed</option>
                <option value='hourly'>Hourly</option>
              </select>
              <FieldError error={formik.touched.budgetType ? formik.errors.budgetType : undefined} />
            </div>

            <div>
              <label className='text-sm font-medium'>Project Duration</label>
              <select
                name='duration'
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='mt-1 w-full rounded-lg border border-input focus:outline-none px-4 py-2 text-sm'
              >
                <option value=''>Select project duration</option>
                <option value='less_than_1_month'>Less than 1 month</option>
                <option value='1_to_3_months'>1 – 3 months</option>
                <option value='3_to_6_months'>3 – 6 months</option>
              </select>
              <FieldError error={formik.touched.duration ? formik.errors.duration : undefined} />
            </div>

            <div>
              <label className='text-sm font-medium'>{formik.values.budgetType === "hourly" ? `Hourly Rate (${currencyLabel})` : `Total Budget (${currencyLabel})`}</label>
              <input
                name='totalBudget'
                value={formik.values.totalBudget}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Input your total budget'
                className='mt-1 w-full rounded-lg border border-input focus:outline-none px-4 py-2 text-sm'
              />
              <FieldError error={formik.touched.totalBudget ? formik.errors.totalBudget : undefined} />
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

              {formik.touched.skills && typeof formik.errors.skills === "string" && (
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
                onBlur={formik.handleBlur}
                className='mt-1 w-full rounded-lg border border-input focus:outline-none px-4 py-2 text-sm'
              >
                <option value=''>Select experience level</option>
                <option value='entry'>Junior</option>
                <option value='intermediate'>Mid-level</option>
                <option value='expert'>Senior</option>
              </select>
              <FieldError error={formik.touched.experienceLevel ? formik.errors.experienceLevel : undefined} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className='mt-8 flex justify-end gap-3 border-t border-input pt-4'>
                    {!editingOpen && (
            <button
              type='button'
              onClick={() => void saveJob(formik.values, "draft")}
              disabled={busy || formik.isSubmitting || retryBlocked || uncertain}
              className='rounded-lg text-gray-dark border border-input px-4 py-2 text-sm inline-flex items-center gap-2'
            >
              <Bookmark size={16} />
              {busy ? "Saving..." : "Save as draft"}
            </button>
          )}


          <button
            type='submit'
            disabled={busy || formik.isSubmitting || retryBlocked || uncertain}
            className='rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-50'
          >
            {busy ? "Saving..." : editingOpen ? "Save changes" : "Post Job"}
          </button>
        </div>
        </fieldset>
      </form>
    </section>
  );
};

export default PostJob;
