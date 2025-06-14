
import * as React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BentoCard } from "@/components/BentoCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

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

const jobResults = [
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
];

const Index = () => {
  const [search, setSearch] = React.useState("");
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
                    // No real search; static demo
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

            {/* Job Results List */}
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center gap-2 p-4 pt-6 pb-2">
                <Filter className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Job Search Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex flex-col gap-3">
                  {jobResults.length === 0 ? (
                    <div className="text-muted-foreground text-center py-8">No jobs found. Try a different filter!</div>
                  ) : (
                    jobResults.map((job) => (
                      <div
                        key={job.id}
                        className="border rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 hover:shadow-md transition"
                      >
                        <div>
                          <div className="font-bold">{job.title}</div>
                          <div className="text-muted-foreground text-sm">{job.company} • {job.location}</div>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                          <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs">{job.salary}</span>
                          <span className="text-xs text-muted-foreground">
                            Posted {new Date(job.posted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                          {/* Could add Apply button here */}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
