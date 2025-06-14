import * as React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BentoCard } from "@/components/BentoCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobList } from "@/components/JobList";
import { BackgroundJobBox, BackgroundJob } from "@/components/BackgroundJobBox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  // This state is an array of batches. Each batch is an array of BackgroundJob.
  const [jobBatches, setJobBatches] = React.useState<BackgroundJob[][]>([]);

  // Simulate filtered jobs, for demo just static list
  const jobResults = React.useMemo(() => staticJobResults, []);

  // For demo: simulate background "apply" jobs that resolve after 3 seconds
  const handleApply = (selectedJobs: typeof staticJobResults) => {
    if (selectedJobs.length === 0) return;
    // Each batch is max 10 jobs per user apply.
    const newBatch: BackgroundJob[] = selectedJobs.map((job) => ({
      id: job.id,
      title: job.title,
      status: "running" as const,
    }));

    setJobBatches((prev) => [...prev, newBatch]);

    // Simulate job finish
    newBatch.forEach((job, i) => {
      setTimeout(() => {
        setJobBatches((prev) => {
          // Find last batch and update the relevant job
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
          <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors">
            <div className="h-16 flex items-center px-6 gap-4">
              {/* Show sidebar trigger button on mobile */}
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <h2 className="font-semibold text-lg">Smart Jobs Hub</h2>
            </div>
          </header>
          <main className="flex-1 w-full p-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <BentoCard
                icon="search"
                title="Job Search"
                description="Use a smart filter to search for jobs."
                className="w-full md:w-1/2"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="mt-3 flex gap-2"
                >
                  <Input
                    type="text"
                    placeholder="Search for jobs (e.g., React remote)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="default">
                    Search
                  </Button>
                </form>
              </BentoCard>
              <BentoCard
                icon="save"
                title="Saved Filters"
                description="Quick access to your favorite searches."
                className="w-full md:w-1/2"
              >
                <ul className="mt-2 space-y-2">
                  {savedFilters.map((filter) => (
                    <li key={filter.id} className="flex justify-between items-center">
                      <span className="font-medium">{filter.name}</span>
                      <span className="text-xs text-muted-foreground">{filter.criteria}</span>
                    </li>
                  ))}
                </ul>
              </BentoCard>
            </div>
            <JobList jobs={jobResults} onApply={handleApply} />
            {/* Always show the Background Job Groups card under results */}
            <div>
              {jobBatches.length === 0 ? (
                // Show empty state card
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base">
                      ApplyGen Application Batches
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground text-center py-4">
                      No jobs applied yet.
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // Show all job batches as before
                jobBatches.map((batch, i) => (
                  <BackgroundJobBox
                    jobs={batch}
                    batchNumber={i}
                    key={i}
                  />
                ))
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
