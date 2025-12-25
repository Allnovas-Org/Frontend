import { createContext } from "react";
import { Job } from "../types";

export interface SavedJobsContextType {
  savedJobs: Job[];
  addJob: (job: Job) => void;
}

export const SavedJobsContext = createContext<SavedJobsContextType | undefined>(
  undefined
);
