import React, { useState, useCallback } from "react";
import { SavedJobsContext } from "./SavedJobsContext";
import { Job } from "../types";

export const SavedJobsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const addJob = useCallback((job: Job) => {
    setSavedJobs((prev) => {
      if (prev.some((j) => j.id === job.id)) return prev;
      return [...prev, job];
    });
  }, []);

  return (
    <SavedJobsContext.Provider value={{ savedJobs, addJob }}>
      {children}
    </SavedJobsContext.Provider>
  );
};
