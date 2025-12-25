import React from "react";
import { FC } from "react";
import StepItem from "./StepItem";
import { Step } from "../../../types";

interface StepTrackerProps {
  steps: Step[];
  currentStep: number;
}

const StepTracker: FC<StepTrackerProps> = ({ steps, currentStep }) => {
  return (
    <nav aria-label='Progress' className='w-full'>
      <ol className='flex items-center justify-between'>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <li key={step.id} className='flex-1 last:flex-none'>
              <StepItem
                label={step.label}
                isActive={isActive}
                isCompleted={isCompleted}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default StepTracker;
