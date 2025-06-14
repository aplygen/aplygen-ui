import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BentoCard } from "@/components/BentoCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobList } from "@/components/JobList";
import { BackgroundJobBox, BackgroundJob } from "@/components/BackgroundJobBox";
import { SmartJobsHeader } from "./Index/SmartJobsHeader";
import { JobSearchAndFilters } from "./Index/JobSearchAndFilters";
import { SmartJobsMainContent } from "./Index/SmartJobsMainContent";

const savedFilters = [
  {
    id: 1,
    name: "Remote React Jobs",
    criteria: "Remote, React, $90k+",
  },
  {
    id: 2,
    name: "Frontend (Remote or NYC)",
    criteria: "Frontend, NYC/Remote, $100k+",
  },
];

const staticJobResults = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "InnovateX",
    location: "Remote",
    salary: "$120,000",
    posted: "2025-06-10",
  },
  {
    id: 2,
    title: "React Developer",
    company: "Acme Corp.",
    location: "New York, NY",
    salary: "$110,000",
    posted: "2025-06-12",
  },
  {
    id: 3,
    title: "UI Engineer",
    company: "BrightTech",
    location: "Remote",
    salary: "$125,000",
    posted: "2025-06-13",
  },
  // ... add at least 12 jobs for demo
  {
    id: 4,
    title: "Product Designer",
    company: "DesignLoose",
    location: "NYC",
    salary: "$105,000",
    posted: "2025-06-12",
  },
  {
    id: 5,
    title: "Fullstack Engineer",
    company: "CodeBase",
    location: "Remote",
    salary: "$130,000",
    posted: "2025-06-11",
  },
  {
    id: 6,
    title: "Frontend Developer",
    company: "WebGen",
    location: "Remote",
    salary: "$100,000",
    posted: "2025-06-11",
  },
  {
    id: 7,
    title: "Senior UI Engineer",
    company: "BloomLogic",
    location: "Remote",
    salary: "$130,000",
    posted: "2025-06-10",
  },
  {
    id: 8,
    title: "Junior React Dev",
    company: "QuickApps",
    location: "Remote",
    salary: "$85,000",
    posted: "2025-06-09",
  },
  {
    id: 9,
    title: "Frontend Architect",
    company: "CoreSystems",
    location: "NYC",
    salary: "$145,000",
    posted: "2025-06-08",
  },
  {
    id: 10,
    title: "UI/UX Designer",
    company: "PixelPush",
    location: "NYC",
    salary: "$102,000",
    posted: "2025-06-10",
  },
  {
    id: 11,
    title: "Web Engineer",
    company: "SkyForge",
    location: "Remote",
    salary: "$110,000",
    posted: "2025-06-13",
  },
  {
    id: 12,
    title: "Frontend Lead",
    company: "AppPilot",
    location: "Remote",
    salary: "$135,000",
    posted: "2025-06-09",
  },
];

const Index = () => {
  const [search, setSearch] = React.useState("");
  const [jobBatches, setJobBatches] = React.useState<BackgroundJob[][]>([]);

  const jobResults = React.useMemo(() => staticJobResults, []);

  const handleApply = (selectedJobs: typeof staticJobResults) => {
    if (selectedJobs.length === 0) return;
    const newBatch: BackgroundJob[] = selectedJobs.map((job) => ({
      id: job.id,
      title: job.title,
      status: "running" as const,
    }));

    setJobBatches((prev) => [...prev, newBatch]);

    newBatch.forEach((job, i) => {
      setTimeout(() => {
        setJobBatches((prev) => {
          const batches = [...prev];
          const lastBatchIdx = batches.length - 1;
          if (lastBatchIdx < 0) return batches;
          const batch = batches[lastBatchIdx].map((j) =>
            j.id === job.id ? { ...j, status: "completed" as const } : j
          );
          batches[lastBatchIdx] = batch;
          return batches;
        });
      }, 2000 + i * 1000);
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <SmartJobsHeader />
          <JobSearchAndFilters search={search} setSearch={setSearch} />
          <SmartJobsMainContent
            jobResults={jobResults}
            handleApply={handleApply}
            jobBatches={jobBatches}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
