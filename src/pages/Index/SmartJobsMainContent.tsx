
import * as React from "react";
import { JobList } from "@/components/JobList";
import { BackgroundJobBox, BackgroundJob } from "@/components/BackgroundJobBox";

type StaticJob = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
};

interface SmartJobsMainContentProps {
  jobResults: StaticJob[];
  handleApply: (selectedJobs: StaticJob[]) => void;
  jobBatches: BackgroundJob[][];
}

export const SmartJobsMainContent: React.FC<SmartJobsMainContentProps> = ({
  jobResults,
  handleApply,
  jobBatches,
}) => {
  return (
    <main className="flex-1 w-full p-6 flex flex-col gap-6">
      <JobList jobs={jobResults} onApply={handleApply} />
      {jobBatches.length > 0 && (
        <div>
          {jobBatches.map((batch, i) => (
            <BackgroundJobBox jobs={batch} batchNumber={i} key={i} />
          ))}
        </div>
      )}
    </main>
  );
};
