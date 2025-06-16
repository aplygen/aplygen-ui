import * as React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BentoCard } from "@/components/BentoCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  {
    id: 3,
    name: "Senior Backend Engineer",
    criteria: "Backend, Node.js, $120k+",
  },
  {
    id: 4,
    name: "Full Stack Developer",
    criteria: "Full Stack, TypeScript, $110k+",
  },
  {
    id: 5,
    name: "UI/UX Designer",
    criteria: "Design, Figma, $85k+",
  },
  {
    id: 6,
    name: "DevOps Engineer",
    criteria: "AWS, Docker, $130k+",
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
  const [location, setLocation] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [jobType, setJobType] = React.useState("");
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
            {/* Enhanced Search and Filters Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BentoCard
                icon="search"
                title="Job Search"
                description="Use smart filters to search for your perfect job."
                className="w-full"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="mt-3 space-y-3"
                >
                  <div className="flex gap-2">
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
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="nyc">New York, NY</SelectItem>
                        <SelectItem value="sf">San Francisco, CA</SelectItem>
                        <SelectItem value="la">Los Angeles, CA</SelectItem>
                        <SelectItem value="chicago">Chicago, IL</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={salary} onValueChange={setSalary}>
                      <SelectTrigger>
                        <SelectValue placeholder="Salary Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60k-80k">$60k - $80k</SelectItem>
                        <SelectItem value="80k-100k">$80k - $100k</SelectItem>
                        <SelectItem value="100k-120k">$100k - $120k</SelectItem>
                        <SelectItem value="120k-150k">$120k - $150k</SelectItem>
                        <SelectItem value="150k+">$150k+</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={jobType} onValueChange={setJobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="fullstack">Full Stack</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </BentoCard>
              <BentoCard
                icon="save"
                title="Saved Filters"
                description="Quick access to your favorite job searches."
                className="w-full"
              >
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {savedFilters.map((filter) => (
                    <div key={filter.id} className="flex justify-between items-center p-2 hover:bg-accent rounded-md cursor-pointer transition-colors">
                      <span className="font-medium text-sm">{filter.name}</span>
                      <span className="text-xs text-muted-foreground">{filter.criteria}</span>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </div>

            {/* Parallel Job Results and Batch Processing */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <JobList jobs={jobResults} onApply={handleApply} />
              </div>
              <div className="xl:col-span-1">
                {jobBatches.length === 0 ? (
                  // Show empty state card
                  <Card className="h-fit">
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
                  <div className="space-y-4">
                    {jobBatches.map((batch, i) => (
                      <BackgroundJobBox
                        jobs={batch}
                        batchNumber={i}
                        key={i}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
