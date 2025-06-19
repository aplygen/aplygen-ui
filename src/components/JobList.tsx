
import * as React from "react";
import { Filter, ChevronDown, ChevronUp, MapPin, DollarSign, Calendar, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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

const JOBS_PER_PAGE = 4;

export const JobList: React.FC<JobListProps> = ({ jobs, onApply }) => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isApplying, setIsApplying] = React.useState(false);
  const [expandedJobs, setExpandedJobs] = React.useState<Set<number>>(new Set());

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

  const toggleJobExpansion = (jobId: number) => {
    setExpandedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleApply = async () => {
    setIsApplying(true);
    const selectedJobs = jobs.filter((job) => selectedIds.includes(job.id));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onApply(selectedJobs);
    setSelectedIds([]);
    setIsApplying(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (jobs.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
          <span className="text-3xl">🔍</span>
        </div>
        <div>
          <p className="font-medium mb-1">No jobs found</p>
          <p className="text-sm text-muted-foreground/60">All jobs have been applied to or try adjusting your search filters!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full">
          <Filter className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm text-primary">Found {jobs.length} jobs</span>
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

      {/* Job Cards - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {displayJobs.map((job, index) => (
          <Card
            key={job.id}
            className={cn(
              "transition-all duration-300 border-2",
              selectedIds.includes(job.id) 
                ? "ring-2 ring-primary/50 border-primary/50 bg-primary/5" 
                : "border-border hover:border-primary/20",
              "animate-in slide-in-from-bottom-4 duration-300"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-bold hover:text-primary transition-colors duration-200">
                      {job.title}
                    </CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {job.salary}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(job.posted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedIds.includes(job.id)}
                    onCheckedChange={() => handleCheckbox(job.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="scale-110"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleJobExpansion(job.id)}
                  >
                    {expandedJobs.has(job.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedJobs.has(job.id) && (
              <CardContent className="pt-0 space-y-3 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-muted-foreground">Job Type</p>
                    <p>Full-time</p>
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">Experience</p>
                    <p>3-5 years</p>
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">Remote</p>
                    <p>{job.location.toLowerCase().includes('remote') ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">Benefits</p>
                    <p>Health, Dental, 401k</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground mb-1">Skills Required</p>
                  <div className="flex flex-wrap gap-1">
                    {['React', 'TypeScript', 'Node.js', 'AWS'].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 space-y-4">
        {/* Apply Button */}
        {selectedIds.length > 0 && (
          <div className="flex justify-center">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
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
      </div>
    </div>
  );
};
