import React from "react";
import { Plus, Trash2 } from "lucide-react";
import AppButton from "../../../components/button/GlobalButton";
import { Formik, Form, Field, FieldArray } from "formik";
import { workExperienceValidationSchema } from "./workExperienceValidation";
import ProfileModal from "../ProfileModal";
import { WorkExperience } from "../../../types";

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

export interface WorkExperienceModalProps {
  open: boolean;
  onClose: () => void;
  experiences: WorkExperience[];
  setExperiences: (exps: WorkExperience[]) => void;
}

const initialExp = {
  jobTitle: "",
  company: "",
  stillWorking: false,
  jobDescription: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
};

const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({
  open,
  onClose,
  experiences,
  setExperiences,
}) => {
  if (!open) return null;

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      title='Edit Work Experience'
      subtitle=''
    >
      <Formik
        initialValues={{
          work: experiences.length ? experiences : [initialExp],
        }}
        validationSchema={workExperienceValidationSchema}
        onSubmit={(values) => {
          setExperiences(values.work);
          onClose();
        }}
      >
        {({ values, handleReset }) => (
          <Form>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-base font-semibold'>Work Experience</h3>
              <FieldArray name='work'>
                {({ push }) => (
                  <button
                    type='button'
                    className='flex items-center gap-1 text-gray-darker px-3 py-1 text-xs font-medium'
                    onClick={() => push(initialExp)}
                  >
                    <Plus className='w-4 h-4' />
                  </button>
                )}
              </FieldArray>
            </div>
            <FieldArray name='work'>
              {({ remove }) => (
                <div className='flex flex-col gap-6'>
                  {values.work.map((exp, idx) => (
                    <div
                      key={idx}
                      className='relative border border-gray-light rounded-lg p-5'
                    >
                      {values.work.length > 1 && (
                        <button
                          type='button'
                          className='absolute top-3 right-3 text-gray-darker cursor-pointer'
                          onClick={() => remove(idx)}
                        >
                          <Trash2 className='w-3 h-3' />
                        </button>
                      )}
                      <div className='mb-3'>
                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                          Job Title
                        </label>
                        <Field
                          name={`work[${idx}].jobTitle`}
                          className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
                        />
                      </div>
                      <div className='mb-3'>
                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                          Company's Name
                        </label>
                        <Field
                          name={`work[${idx}].company`}
                          className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
                        />
                        <div className='flex items-center mt-2'>
                          <Field
                            type='checkbox'
                            name={`work[${idx}].stillWorking`}
                            className='mr-2'
                          />
                          <span className='text-xs text-gray-600'>
                            Still working here
                          </span>
                        </div>
                      </div>
                      <div className='mb-3'>
                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                          Job Description
                        </label>
                        <Field
                          as='textarea'
                          name={`work[${idx}].jobDescription`}
                          className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[60px]'
                        />
                      </div>
                      <div className='flex gap-4 mb-3'>
                        <div className='flex-1'>
                          <label className='block text-xs font-medium text-gray-700 mb-1'>
                            Start Month
                          </label>
                          <Field
                            as='select'
                            name={`work[${idx}].startMonth`}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
                          >
                            <option value=''>Month</option>
                            {months.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className='flex-1'>
                          <label className='block text-xs font-medium text-gray-700 mb-1'>
                            Start Year
                          </label>
                          <Field
                            as='select'
                            name={`work[${idx}].startYear`}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
                          >
                            <option value=''>Year</option>
                            {years.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className='flex-1'>
                          <label className='block text-xs font-medium text-gray-700 mb-1'>
                            End Month
                          </label>
                          <Field
                            as='select'
                            name={`work[${idx}].endMonth`}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
                            disabled={exp.stillWorking}
                          >
                            <option value=''>Month</option>
                            {months.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className='flex-1'>
                          <label className='block text-xs font-medium text-gray-700 mb-1'>
                            End Year
                          </label>
                          <Field
                            as='select'
                            name={`work[${idx}].endYear`}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
                            disabled={exp.stillWorking}
                          >
                            <option value=''>Year</option>
                            {years.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <div className='flex justify-end gap-2 mt-8'>
              {/* <AppButton
                color='bg-gray-200'
                textColor='text-gray-700'
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                hideArrow
              >
                Cancel
              </AppButton>
              <AppButton
                color='bg-primary'
                textColor='text-white'
                type='submit'
                hideArrow
              >
                Save
                </AppButton> */}
              <button
                className='bg-input rounded-lg px-3 py-2 text-white font-semibold '
                onClick={() => {
                  handleReset();
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                className='bg-primary rounded-lg px-3 py-2 text-white font-semibold '
                type='submit'
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ProfileModal>
  );
};

export default WorkExperienceModal;
