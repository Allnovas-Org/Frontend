import React from "react";
import { candidates } from "../candidates/data/candidateData";
import { CandidateCard } from "./candidateCard";

export const HireCandidates = () => {
  const hiredCandidates = candidates.filter((c) => c.status === "hired");

  return (
    <section className='space-y-6'>
      {hiredCandidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} isHireView />
      ))}
    </section>
  );
};
