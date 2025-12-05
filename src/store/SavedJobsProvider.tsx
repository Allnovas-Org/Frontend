import React, { useState, useCallback } from "react";
import { SavedJobsContext } from "./SavedJobsContext";

export const SavedJobsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedJobs, setSavedJobs] = useState<any[]>([]); // Replace any[] with Job[] if you have a Job type
  const addJob = useCallback(
    (job: any) => setSavedJobs((prev) => [...prev, job]), // Replace any with Job if you have a Job type
    []
  );

  return (
    <SavedJobsContext.Provider value={{ addJob, savedJobs }}>
      {children}
    </SavedJobsContext.Provider>
  );
};
