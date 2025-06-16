
import * as React from "react";
import { Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
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

const JOBS_PER_PAGE = 6;

export const JobList: React.FC<JobListProps> = ({ jobs, onApply }) => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const displayJobs = jobs.slice(startIndex, endIndex);

  const allSelected = displayJobs.length > 0 && displayJobs.every(job => selectedIds.includes(job.id));
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(selectedIds.filter(id => !displayJobs.find(j => j.id === id)));
    } else {
      setSelectedIds([
        ...selectedIds,
        ...displayJobs.map(j => j.id).filter(id => !selectedIds.includes(id)),
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
    setSelectedIds([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">Found {jobs.length} jobs</span>
        </div>
        {displayJobs.length > 0 && (
          <Button variant="outline" size="sm" onClick={toggleSelectAll}>
            <Checkbox
              checked={allSelected}
              className="mr-2"
              tabIndex={-1}
              onCheckedChange={toggleSelectAll}
            />
            {allSelected ? "Unselect All" : "Select All"}
          </Button>
        )}
      </div>

      {displayJobs.length === 0 ? (
        <div className="text-muted-foreground text-center py-8">No jobs found. Try a different filter!</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {displayJobs.map((job) => (
              <Card
                key={job.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedIds.includes(job.id) ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleCheckbox(job.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm font-semibold">{job.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">{job.company} • {job.location}</p>
                    </div>
                    <Checkbox
                      checked={selectedIds.includes(job.id)}
                      onCheckedChange={() => handleCheckbox(job.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                      {job.salary}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(job.posted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {selectedIds.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Button
            type="button"
            onClick={handleApply}
            variant="default"
          >
            Apply to selected ({selectedIds.length})
          </Button>
        </div>
      )}
    </div>
  );
};
