import React, { ChangeEvent } from "react";
import { SectionTitle } from "./help";
import { FormContext } from "../../store/FormContext";

const howLongOptions = [
  "Less than 1 month",
  "1 to 3 months",
  "3 to 6 months",
  "More than 6 months",
];

const job = {
  position: "Frontend Developer",
  company: "Company Name",
  experience: "2+ years",
  budget: "$1,400 - $2,000",
  delivery: "2-4 weeks",
  about:
    "We are looking for a talented frontend developer to join our remote team. You will work on exciting projects and collaborate with a global team.",
  qualifications: [
    "Bachelor's degree in Computer Science or related field",
    "2+ years experience in frontend development",
    "Proficiency in React and JavaScript",
  ],
  responsibilities: [
    "Develop and maintain web applications",
    "Collaborate with designers and backend developers",
    "Write clean, scalable code",
  ],
  skills: ["React", "JavaScript", "CSS", "HTML", "Git"],
};

const FormSubmission: React.FC = () => {
  const formik = React.useContext(FormContext) as any;
  const selectedOptions = formik.values.selectedOptions;
  const coverLetter = formik.values.coverLetter;
  const attachments = formik.values.attachments;
  const setSelectedOptions = (value: string) =>
    formik.setFieldValue("selectedOptions", value);
  const setCoverLetter = (letter: string) =>
    formik.setFieldValue("coverLetter", letter);
  const setAttachments = (files: File[]) =>
    formik.setFieldValue("attachments", files);

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions(selectedOptions === option ? "" : option);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <div className='p-4 border border-input rounded-lg '>
      <div>
        {/* Position at Company */}
        <SectionTitle>
          {job.position} at {job.company}
        </SectionTitle>
        <p className='text-gray-600 mb-6'>
          Apply for this exciting opportunity and join our team!
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <div className='flex flex-col '>
            <span className='font-semibold text-gray-700'>Experience</span>
            <span className='text-base text-gray-500 mt-2'>
              {job.experience}
            </span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='font-semibold text-gray-700'>Budget</span>
            <span className='text-base text-gray-500 mt-2'>{job.budget}</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='font-semibold text-gray-700'>
              Delivery Timeline
            </span>
            <span className='text-base text-gray-500 mt-2'>{job.delivery}</span>
          </div>
        </div>
      </div>
      <div>
        <SectionTitle>How long will this project take?</SectionTitle>
        <div className='text-sm text-gray-500'>Select a duration</div>
      </div>
      <section className='border border-input rounded-lg p-4 mb-6'>
        <div className='flex flex-col gap-3 mb-4'>
          {howLongOptions.map((option) => (
            <label
              key={option}
              className='flex items-center gap-2 cursor-pointer'
            >
              <input
                type='checkbox'
                checked={selectedOptions === option}
                onChange={() => handleCheckboxChange(option)}
                className='accent-primary w-4 h-4 rounded border border-primary outline-primary'
              />
              <span className='text-gray-700 text-sm'>{option}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Cover Letter Section */}
      <div>
        <SectionTitle>Cover Letter</SectionTitle>
      </div>
      <section className='border border-input rounded px-3 py-2 mb-2'>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder='Write your cover letter here...'
          rows={8}
          className=' w-full text-sm resize-none h-56 focus:outline-none '
        />
      </section>

      {/* Attachment Section */}
      <section className='p-4 mb-6'>
        <SectionTitle>Attachment</SectionTitle>
        <div className='text-sm text-gray-700 mb-1'>
          To enhance your proposal, consider including relevant work samples
          that showcase your expertise. Kindly ensure all contact details are
          removed prior to submission, as sharing personal information before
          contract execution violates our policy
        </div>
        <div className='text-xs text-gray-400 mb-3'>
          Upload up to 10 files (each of which should be 26mb max)
        </div>
        <label className='inline-flex border border-primary rounded-lg p-2.5 items-center gap-2 cursor-pointer'>
          <img
            src='/images/applicants/link.svg'
            alt='attach'
            className='w-5 h-5'
          />
          <span className='text-primary font-medium text-sm'>Attach files</span>
          <input
            type='file'
            multiple
            onChange={handleFileChange}
            className='hidden'
          />
        </label>
        {attachments.length > 0 && (
          <ul className='mt-2 text-xs text-gray-600'>
            {attachments.map((file: File, idx: number) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default FormSubmission;
