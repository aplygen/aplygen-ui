
import * as React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BentoCard } from "@/components/BentoCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobList } from "@/components/JobList";
import { BackgroundJobBox, BackgroundJob } from "@/components/BackgroundJobBox";

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
  const [backgroundJobs, setBackgroundJobs] = React.useState<BackgroundJob[]>([]);

  // Simulate filtered jobs, for demo just static list
  const jobResults = React.useMemo(() => staticJobResults, []);

  // For demo: simulate background "apply" jobs that resolve after 3 seconds
  const handleApply = (selectedJobs: typeof jobResults) => {
    const newJobs: BackgroundJob[] = selectedJobs.map((job) => ({
      id: job.id,
      title: job.title,
      status: "running" as const,
    }));
    setBackgroundJobs((prev) => [...prev, ...newJobs]);

    // Simulate each job finishing after a timeout
    newJobs.forEach((job, i) => {
      setTimeout(() => {
        setBackgroundJobs((prev) =>
          prev.map((j) =>
            j.id === job.id ? { ...j, status: "completed" as const } : j
          )
        );
      }, 2000 + i * 1000); // stagger complete times for effect
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          {/* Sticky header */}
          <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors">
            <div className="h-16 flex items-center px-6 gap-4">
              {/* Show sidebar trigger button on mobile */}
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <h2 className="font-semibold text-lg">Smart Jobs Hub</h2>
            </div>
          </header>
          {/* Main content */}
          <main className="flex-1 w-full p-6 flex flex-col gap-6">
            {/* Top: Search and Filters */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search Bento */}
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
              {/* Saved Filters Bento */}
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
            {/* Job Results List with Select/Apply */}
            <JobList jobs={jobResults} onApply={handleApply} />
            {/* Background Jobs/Applications progress box */}
            <BackgroundJobBox jobs={backgroundJobs} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
