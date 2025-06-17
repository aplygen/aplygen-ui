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
import { cn } from "@/lib/utils";

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
  const [isApplying, setIsApplying] = React.useState(false);

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

  const handleApply = async () => {
    setIsApplying(true);
    const selectedJobs = jobs.filter((job) => selectedIds.includes(job.id));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onApply(selectedJobs);
    setSelectedIds([]);
    setIsApplying(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full">
            <Filter className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-primary">Found {jobs.length} jobs</span>
          </div>
        </div>
        {displayJobs.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleSelectAll}
            className="hover:scale-105 transition-transform duration-200 border-primary/20 hover:border-primary/50"
          >
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
        <div className="text-muted-foreground text-center py-12 flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-3xl">🔍</span>
          </div>
          <div>
            <p className="font-medium mb-1">No jobs found</p>
            <p className="text-sm text-muted-foreground/60">Try adjusting your search filters!</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {displayJobs.map((job, index) => (
              <Card
                key={job.id}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg group border-2",
                  "hover:-translate-y-1 hover:border-primary/30",
                  selectedIds.includes(job.id) 
                    ? "ring-2 ring-primary/50 border-primary/50 bg-primary/5" 
                    : "border-border hover:border-primary/20",
                  "animate-in slide-in-from-bottom-4 duration-300"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleCheckbox(job.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <CardTitle className="text-base font-bold group-hover:text-primary transition-colors duration-200">
                        {job.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-medium">
                        {job.company} • {job.location}
                      </p>
                    </div>
                    <Checkbox
                      checked={selectedIds.includes(job.id)}
                      onCheckedChange={() => handleCheckbox(job.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="scale-110"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-green-200">
                      {job.salary}
                    </span>
                    <span className="text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded-md">
                      {new Date(job.posted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={cn(
                      "transition-all duration-200",
                      currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:scale-105"
                    )}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer hover:scale-105 transition-transform duration-200"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={cn(
                      "transition-all duration-200",
                      currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:scale-105"
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {selectedIds.length > 0 && (
        <div className="mt-6 flex justify-center animate-in slide-in-from-bottom-4 duration-300">
          <Button
            type="button"
            onClick={handleApply}
            variant="default"
            disabled={isApplying}
            className="px-8 py-3 text-base font-semibold hover:scale-105 transition-all duration-200 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
          >
            {isApplying ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Applying...
              </div>
            ) : (
              `Apply to selected (${selectedIds.length})`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
