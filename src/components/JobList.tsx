
import * as React from "react";
import { Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
};

interface JobListProps {
  jobs: Job[];
  onApply: (selectedJobs: Job[]) => void;
}

export const JobList: React.FC<JobListProps> = ({ jobs, onApply }) => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const numPages = Math.ceil(jobs.length / pageSize);

  const startIdx = (page - 1) * pageSize;
  const pageJobs = jobs.slice(startIdx, startIdx + pageSize);

  const allOnPageSelected = pageJobs.length > 0 && pageJobs.every(job => selectedIds.includes(job.id));
  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedIds(selectedIds.filter(id => !pageJobs.find(j => j.id === id)));
    } else {
      setSelectedIds([
        ...selectedIds,
        ...pageJobs.map(j => j.id).filter(id => !selectedIds.includes(id)),
      ]);
    }
  };

  const handleCheckbox = (jobId: number) => {
    setSelectedIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApply = () => {
    const selectedJobs = jobs.filter((job) => selectedIds.includes(job.id));
    onApply(selectedJobs);
    setSelectedIds([]); // Reset selection after applying
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-2 p-4 pt-6 pb-2">
        <Filter className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-semibold flex-1">Job Search Results</CardTitle>
        {jobs.length > 0 && (
          <Button variant="outline" size="sm" onClick={toggleSelectAll}>
            <Checkbox
              checked={allOnPageSelected}
              className="mr-2"
              tabIndex={-1}
              onCheckedChange={toggleSelectAll}
            />
            {allOnPageSelected ? "Unselect All" : "Select All"}
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-2">
        {pageJobs.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">No jobs found. Try a different filter!</div>
        ) : (
          <div className="flex flex-col gap-3">
            {pageJobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedIds.includes(job.id)}
                    onCheckedChange={() => handleCheckbox(job.id)}
                  />
                  <div>
                    <div className="font-bold">{job.title}</div>
                    <div className="text-muted-foreground text-sm">{job.company} • {job.location}</div>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs">{job.salary}</span>
                  <span className="text-xs text-muted-foreground">
                    Posted {new Date(job.posted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {pageJobs.length > 0 && (
        <CardFooter className="flex flex-col md:flex-row items-center justify-between gap-3 py-3">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  // Removed asChild prop to fix type error.
                  aria-disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  tabIndex={page === 1 ? -1 : 0}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: numPages }, (_, idx) => (
                <PaginationItem key={idx + 1}>
                  <PaginationLink
                    isActive={page === idx + 1}
                    onClick={() => setPage(idx + 1)}
                    href="#"
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  // Removed asChild prop to fix type error.
                  aria-disabled={page === numPages}
                  onClick={() => setPage((p) => Math.min(numPages, p + 1))}
                  tabIndex={page === numPages ? -1 : 0}
                  className={page === numPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <Button
            type="button"
            onClick={handleApply}
            variant="default"
            disabled={selectedIds.length === 0}
          >
            Apply to selected ({selectedIds.length})
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
