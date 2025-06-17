
import * as React from "react";
import { BentoCard } from "@/components/BentoCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobList } from "@/components/JobList";
import { BackgroundJobBox, BackgroundJob } from "@/components/BackgroundJobBox";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

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
  const [jobBatches, setJobBatches] = React.useState<BackgroundJob[][]>([]);

  // Mock user data - in real app this would come from auth/settings
  const user = {
    name: "Vishwas",
    tagline: "P.S. I write colourful text on a black screen for a living.",
    jobTitle: "Software Engineer",
    avatar: ""
  };

  const jobResults = React.useMemo(() => staticJobResults, []);

  const allBatchJobs = React.useMemo(() => {
    return jobBatches.flat();
  }, [jobBatches]);

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 pb-32">
      <main className="w-full max-w-7xl mx-auto p-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-8rem)]">
          {/* Left Column - Profile & Metrics */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl font-bold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                  <p className="text-muted-foreground mt-1">{user.tagline}</p>
                </div>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Applications Sent</p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">42</p>
                    </div>
                    <div className="text-blue-500">📤</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Interviews</p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">8</p>
                    </div>
                    <div className="text-green-500">💬</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Response Rate</p>
                      <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">19%</p>
                    </div>
                    <div className="text-purple-500">📊</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Bento Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Enhanced Search and Filters Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <BentoCard
                icon="search"
                title="Job Search"
                description="Use smart filters to search for your perfect job."
                className="w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-primary/20"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="mt-4 space-y-4"
                >
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Search for jobs (e.g., React remote)..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    />
                    <Button type="submit" variant="default" className="px-6 hover:scale-105 transition-transform duration-200">
                      Search
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
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
                      <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
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
                      <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
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
                className="w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-primary/20"
              >
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {savedFilters.map((filter) => (
                    <div key={filter.id} className="flex justify-between items-center p-3 hover:bg-accent/50 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] border border-transparent hover:border-primary/20">
                      <span className="font-medium text-sm">{filter.name}</span>
                      <span className="text-xs text-muted-foreground bg-accent/30 px-2 py-1 rounded-md">{filter.criteria}</span>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </div>

            {/* Job Results and Application Batches */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <BentoCard
                icon="file-check"
                title="Job Search Results"
                description="Browse and apply to matching opportunities."
                className="w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-green-200/30"
              >
                <div className="mt-4">
                  <JobList jobs={jobResults} onApply={handleApply} />
                </div>
              </BentoCard>
              
              <BentoCard
                icon="chart-bar"
                title="ApplyGen Application Batches"
                description="Track your job application progress in real-time."
                className="w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-blue-200/30"
              >
                <div className="mt-4">
                  {allBatchJobs.length === 0 ? (
                    <div className="text-muted-foreground text-center py-12 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                      </div>
                      <p className="text-sm">No jobs applied yet.</p>
                      <p className="text-xs text-muted-foreground/60">Select jobs from the search results to start applying!</p>
                    </div>
                  ) : (
                    <BackgroundJobBox jobs={allBatchJobs} />
                  )}
                </div>
              </BentoCard>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <FloatingNavbar />
    </div>
  );
};

export default Index;
