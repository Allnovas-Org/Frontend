import React, { ChangeEvent } from "react";
import { useFormik } from "formik";
import { SectionTitle } from "../Applicants/help";
import { FormContext } from "../../store/FormContext";
import { Plus } from "lucide-react";

const selectHowOptions = [
  {
    label: "Progress-Based Compensation",
    subtext:
      "Divide into key milestones, each representing a major phase of work. You’ll receive pay as each milestone is completed and approved.",
  },
  {
    label: "Unified Project Payment",
    subtext:
      "Payment is rendered in full upon project completion and final delivery.",
  },
];

const ProjectStructure: React.FC = () => {
  const formik = React.useContext(FormContext)!;
  const duration = formik.values.duration || {
    compensated: false,
    unifiedPayment: false,
  };
  const formRows = formik.values.formRows;
  // Calculate total amount from formRows
  const totalAmount = formRows.reduce((sum: number, row: any) => {
    const val = parseFloat(row.amount);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const setduration = (how: typeof duration) =>
    formik.setFieldValue("duration", how);
  const setFormRows = (rows: typeof formRows) =>
    formik.setFieldValue("formRows", rows);

  const handleHowChange = (option: keyof typeof duration) => {
    setduration({ ...duration, [option]: !duration[option] });
  };

  const handleFormChange = (idx: number, field: string, value: string) => {
    const updated = formRows.map((row: any, i: number) =>
      i === idx ? { ...row, [field]: value } : row
    );
    setFormRows(updated);
  };

  const addFormRow = () => {
    setFormRows([...formRows, { description: "", dueDate: "", amount: "" }]);
  };

  const removeFormRow = (idx: number) => {
    setFormRows(formRows.filter((_: any, i: number) => i !== idx));
  };

  return (
    <div className='p-4 border border-input rounded-lg'>
      {/* Select how section */}
      <SectionTitle>Select how you want to be paid</SectionTitle>
      <div className='flex flex-col gap-4 mb-6'>
        <label className='flex items-start gap-3 p-3'>
          <input
            type='checkbox'
            checked={duration.compensated}
            onChange={() => handleHowChange("compensated")}
            className='accent-primary w-4 h-4 mt-1'
          />
          <div className='flex flex-col'>
            <span className='font-medium text-gray-700'>
              Progress-Based Compensation
            </span>
            <span className='text-sm text-gray-500'>
              Divide into key milestones, each representing a major phase of
              work. You’ll receive pay as each milestone is completed and
              approved.
            </span>
          </div>
        </label>
        <label className='flex items-start gap-3 p-3'>
          <input
            type='checkbox'
            checked={duration.unifiedPayment}
            onChange={() => handleHowChange("unifiedPayment")}
            className='accent-primary w-4 h-4 mt-1'
          />
          <div className='flex flex-col'>
            <span className='font-medium text-gray-700'>
              Unified Project Payment
            </span>
            <span className='text-sm text-gray-500'>
              Payment is rendered in full upon project completion and final
              delivery.
            </span>
          </div>
        </label>
      </div>

      {/* How many section */}
      <SectionTitle>
        How many progress-based compensation level do you want to include?
      </SectionTitle>
      <div className='overflow-x-auto mb-6'>
        {formRows.map((row: any, idx: number) => (
          <div
            key={idx}
            className='grid grid-cols-[20px_2fr_1fr_1fr_1fr] gap-4 items-center mb-2'
          >
            <span className='font-medium text-gray-600 pt-7'>{idx + 1}</span>
            <div className='flex flex-col w-full'>
              <label className='text-xs text-gray-500 mb-1'>Description</label>
              <input
                type='text'
                value={row.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange(idx, "description", e.target.value)
                }
                placeholder='Description'
                className='border border-input rounded px-2 py-2 text-sm w-full'
              />
            </div>
            <div className='flex flex-col w-full'>
              <label className='text-xs text-gray-500 mb-1'>Due date</label>
              <div className='relative w-full'>
                <input
                  type='date'
                  value={row.dueDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange(idx, "dueDate", e.target.value)
                  }
                  className='border border-input rounded px-2 py-2 text-sm w-full appearance-none pr-8 custom-date-input'
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    appearance: "none",
                    background: "none",
                  }}
                />
                {/* <span className='absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none'>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7 10l5 5 5-5'
                      stroke='#9CA3AF'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span> */}
              </div>
            </div>
            <div className='flex flex-col w-full'>
              <label className='text-xs text-gray-500 mb-1'>Amount</label>
              <div className='relative w-full'>
                <input
                  type='text'
                  value={row.amount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange(idx, "amount", e.target.value)
                  }
                  placeholder=''
                  className='border border-input rounded px-2 py-2 text-sm w-full pr-10'
                />
                <span className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none'>
                  $0.00
                </span>
              </div>
            </div>
            {formRows.length > 1 && idx > 0 ? (
              <button
                type='button'
                onClick={() => removeFormRow(idx)}
                className='ml-2 flex items-center justify-center w-8 h-8 mt-7'
              >
                <img
                  src='/images/applicants/remove.svg'
                  alt='remove'
                  className='w-4 h-4'
                />
              </button>
            ) : (
              <span></span>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={addFormRow}
          className='flex items-center gap-2 mt-2 text-primary font-semibold text-sm focus:outline-none'
          style={{ background: "none", border: "none" }}
        >
          <Plus className='w-4 h-4' />
          Plan next phase
        </button>
      </div>

      <hr className='my-8 border-gray-300' />

      <div className='grid grid-cols-[2fr_2fr_1fr] gap-6 items-center'>
        <div className='flex items-center justify-center'>
          <img
            src='/images/applicants/pricetag.png'
            alt='price'
            className='w-full h-full rounded-lg'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <SectionTitle>Total price of project</SectionTitle>
          <span className='text-sm text-gray-500'>
            This is a sum total of all the project-based compensation figures
            you filled in.
          </span>
          <span className='text-xs text-gray-400'>
            NB: The amount shown above does not include the agreed 10% policy
            fee.
          </span>
        </div>
        <div className='flex items-center justify-end'>
          <span className='text-2xl font-medium text-gray-dark'>
            $
            {totalAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectStructure;
