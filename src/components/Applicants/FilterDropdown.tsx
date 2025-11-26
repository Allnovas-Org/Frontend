import React, { useState, RefObject } from "react";
import { FrontArrowIcon } from "../../assets/applicants/customIcons";

interface BudgetOption {
  label: string;
  min?: number;
  max?: number;
  custom?: boolean;
}

interface FilterDropdownProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: {
    budget: string;
    customBudget: [number, number] | null;
    experience: string[];
    payment: string[];
  }) => void;
  onReset?: () => void;
  anchorRef?: RefObject<HTMLElement>;
  initialFilters?: {
    budget?: string;
    customBudget?: [number, number] | null;
    experience?: string[];
    payment?: string[];
  };
}

const BUDGET_OPTIONS: BudgetOption[] = [
  { label: "Less than $1,000", min: 10, max: 50 },
  { label: "$1,000 - 16,000", min: 51, max: 100 },
  { label: "More than $16,000", min: 101, max: 150 },
  { label: "Custom", custom: true },
];

const EXPERIENCE_OPTIONS = [
  { label: "Entry level" },
  { label: "Intermediate" },
  { label: "Expert" },
];

const PAYMENT_OPTIONS = [{ label: "Fixed" }, { label: "Milestones" }];

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  open,
  onClose,
  onApply,
  onReset,
  anchorRef,
  initialFilters = {},
}) => {
  const [budget, setBudget] = useState<string>(initialFilters.budget || "");
  const [customBudget, setCustomBudget] = useState<[number, number]>(
    initialFilters.customBudget || [20000, 120000]
  );
  const [experience, setExperience] = useState<string[]>(
    initialFilters.experience || []
  );
  const [payment, setPayment] = useState<string[]>(
    initialFilters.payment || []
  );

  const handleCheckbox = (group: string, value: string) => {
    if (group === "budget") {
      setBudget(value);
      if (value !== "Custom") setCustomBudget([10, 200]);
    } else if (group === "experience") {
      setExperience((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else if (group === "payment") {
      setPayment((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  const handleCustomBudgetChange = (idx: number, val: string) => {
    const newRange = [...customBudget];
    newRange[idx] = Number(val);
    setCustomBudget(newRange as [number, number]);
  };

  const handleApply = () => {
    onApply({
      budget,
      customBudget: budget === "Custom" ? customBudget : null,
      experience,
      payment,
    });
    onClose();
  };

  const handleReset = () => {
    setBudget("");
    setCustomBudget([10, 200]);
    setExperience([]);
    setPayment([]);
    if (onReset) onReset();
  };

  if (!open) return null;

  return (
    <div
      className='absolute right-0 mt-2 w-80 bg-white shadow-lg z-30 p-7'
      style={{ minWidth: 320 }}
    >
      {/* Title and Reset */}
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-xl font-semibold'>Filters</h3>
        <button
          className='text-primary text-sm font-normal hover:underline'
          onClick={handleReset}
        >
          Reset all
        </button>
      </div>
      {/* Budget */}
      <div className='mb-4'>
        <div className='font-medium text-base mb-2'>Budget</div>
        {BUDGET_OPTIONS.map((opt) => (
          <div key={opt.label} className='flex items-center mb-2'>
            <input
              type='checkbox'
              checked={budget === opt.label}
              onChange={() => handleCheckbox("budget", opt.label)}
              id={`budget-${opt.label}`}
              className='accent-primary w-4 h-4 rounded border border-primary outline-primary mr-2'
            />
            <label htmlFor={`budget-${opt.label}`} className='text-sm'>
              {opt.label}
            </label>
          </div>
        ))}

        {budget === "Custom" && (
          <div className='flex flex-col items-center w-full mt-4'>
            <div className='flex px-7 justify-between w-[300px] mb-2'>
              <span className='text-xs font-semibold text-primary'>
                ${customBudget[0]}k
              </span>
              {/* <span className='text-xs font-semibold text-primary'>
                ${customBudget[1] / 1000}k
              </span> */}
            </div>
            <div className='flex items-center w-full justify-center'>
              <span className='text-xs mr-2'>$20k</span>
              <input
                type='range'
                min={20000}
                max={120000}
                value={customBudget[0]}
                onChange={(e) => handleCustomBudgetChange(0, e.target.value)}
                className='mx-1 h-1 bg-gray-300 rounded-full accent-primary'
                style={{
                  width: "300px",
                  appearance: "none",
                  background: "#e5e7eb",
                  height: "4px",
                  borderRadius: "2px",
                }}
              />

              <span className='text-xs ml-2'>$120k</span>
            </div>
          </div>
        )}
      </div>
      {/* Experience Level */}
      <div className='mb-4'>
        <div className='font-medium text-base mb-2'>Experience level</div>
        {EXPERIENCE_OPTIONS.map((opt) => (
          <div key={opt.label} className='flex items-center mb-2'>
            <input
              type='checkbox'
              checked={experience.includes(opt.label)}
              onChange={() => handleCheckbox("experience", opt.label)}
              id={`exp-${opt.label}`}
              className='accent-primary w-4 h-4 rounded border border-primary outline-primary mr-2'
            />
            <label htmlFor={`exp-${opt.label}`} className='text-sm'>
              {opt.label}
            </label>
          </div>
        ))}
      </div>
      {/* Payment Type */}
      <div className='mb-4'>
        <div className='font-medium text-base mb-2'>Payment type</div>
        {PAYMENT_OPTIONS.map((opt) => (
          <div key={opt.label} className='flex items-center mb-2'>
            <input
              type='checkbox'
              checked={payment.includes(opt.label)}
              onChange={() => handleCheckbox("payment", opt.label)}
              id={`pay-${opt.label}`}
              className='accent-primary w-4 h-4 rounded border border-primary outline-primary mr-2'
            />
            <label htmlFor={`pay-${opt.label}`} className='text-sm'>
              {opt.label}
            </label>
          </div>
        ))}
      </div>
      {/* Apply Selected */}
      <div className='flex justify-end mt-4'>
        <button
          className='flex items-center text-primary font-normal text-base hover:underline'
          onClick={handleApply}
        >
          Apply selected <FrontArrowIcon className='ml-2' />
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;
