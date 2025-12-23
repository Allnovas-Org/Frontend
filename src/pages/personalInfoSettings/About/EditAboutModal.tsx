import React from "react";
import EditModal from "../modal/EditsModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { aboutMeSchema } from "./validation";

type AvailabilityType =
  | "Full-Time"
  | "Part-Time"
  | "Contract"
  | "Freelance"
  | "Not Available";

type ExperienceLevel =
  | "Less than 1 years"
  | "1-2 Years"
  | "3-5 Years"
  | "4-7 Years"
  | "7-9 Years";

type AboutMeFormData = {
  bio: string;
  experience: ExperienceLevel | "";
  primaryRole: string;
  availability: AvailabilityType | "";
};

const EXPERIENCE_OPTIONS: ExperienceLevel[] = [
  "Less than 1 years",
  "1-2 Years",
  "3-5 Years",
  "4-7 Years",
  "7-9 Years",
];
const AVAILABILITY_OPTIONS: AvailabilityType[] = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Freelance",
  "Not Available",
];

export const EditAboutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  initialBio?: string;
  onSave?: (values: AboutMeFormData) => void;
}> = ({ isOpen, onClose, initialBio, onSave }) => {
  const CHARACTER_LIMIT = 1000;

  return (
    <Formik
      initialValues={{
        bio: initialBio || "",
        experience: "",
        primaryRole: "",
        availability: "",
      }}
      validationSchema={aboutMeSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        if (onSave)
          onSave({
            ...values,
            experience: values.experience as ExperienceLevel | "",
            availability: values.availability as AvailabilityType | "",
          });
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <EditModal
          isOpen={isOpen}
          onClose={onClose}
          title='Edit About Me'
          subtitle='Tell clients who you are, what you do, and why they should hire you.'
          onSave={() =>
            document
              .getElementById("aboutMeForm")
              ?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              )
          }
        >
          <Form id='aboutMeForm' className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700'>
                About Me
              </label>
              <div className='rounded-xl border border-gray-200 p-4 focus-within:ring-2 focus-within:ring-purple-500'>
                <Field
                  as='textarea'
                  name='bio'
                  className='h-48 w-full resize-none border-none text-sm text-gray-600 outline-none'
                  maxLength={CHARACTER_LIMIT}
                />
                <ErrorMessage
                  name='bio'
                  component='div'
                  className='text-xs text-red-500 mt-1'
                />
                <div className='mt-2 flex justify-between text-[10px] text-gray-400'>
                  <span>
                    {values.bio.length}/{CHARACTER_LIMIT} Character
                  </span>
                  <span>{CHARACTER_LIMIT - values.bio.length} Remaining</span>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-bold text-gray-900'>Quick Info</h3>
              <p className='text-xs text-gray-500'>
                Help Client find you faster with key details.
              </p>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {/* Experience Dropdown */}
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-gray-700'>
                    Year of experience
                  </label>
                  <Field
                    as='select'
                    name='experience'
                    className='w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-500 focus:ring-2 focus:ring-purple-500'
                  >
                    <option value=''>select of experience</option>
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name='experience'
                    component='div'
                    className='text-xs text-red-500 mt-1'
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-gray-700'>
                    Primary Role
                  </label>
                  <Field
                    type='text'
                    name='primaryRole'
                    placeholder='Select role'
                    className='w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-purple-500'
                  />
                  <ErrorMessage
                    name='primaryRole'
                    component='div'
                    className='text-xs text-red-500 mt-1'
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-gray-700'>
                    Availability
                  </label>
                  <Field
                    as='select'
                    name='availability'
                    className='w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-500 focus:ring-2 focus:ring-purple-500'
                  >
                    <option value=''>Select time</option>
                    {AVAILABILITY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name='availability'
                    component='div'
                    className='text-xs text-red-500 mt-1'
                  />
                </div>
              </div>
            </div>
          </Form>
        </EditModal>
      )}
    </Formik>
  );
};
