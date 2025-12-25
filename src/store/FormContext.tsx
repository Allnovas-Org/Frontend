import { createContext } from "react";
import { FormikContextType } from "formik";

export interface FormValues {
  selectedOptions: string;
  coverLetter: string;
  attachments: File[];
  duration: { compensated: boolean; unifiedPayment: boolean };
  formRows: { description: string; dueDate: string; amount: string }[];
}

export const FormContext = createContext<
  FormikContextType<FormValues> | undefined
>(undefined);
