import { createContext } from "react";

export interface SavedJobsContextType {
  savedJobs: any[];
  addJob: (job: any) => void;
}

export const SavedJobsContext = createContext<SavedJobsContextType | undefined>(
  undefined
);
