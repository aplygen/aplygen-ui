
import * as React from "react";
import { ChevronDown, ChevronRight, MapPin, DollarSign, Calendar, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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

export const JobList: React.FC<JobListProps> = ({ jobs, onApply }) => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [expandedRows, setExpandedRows] = React.useState<number[]>([]);
  const [isApplying, setIsApplying] = React.useState(false);

  const allSelected = jobs.length > 0 && jobs.every(job => selectedIds.includes(job.id));
  
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(jobs.map(j => j.id));
    }
  };

  const handleCheckbox = (jobId: number) => {
    setSelectedIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const toggleExpanded = (jobId: number) => {
    setExpandedRows(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleApply = async () => {
    setIsApplying(true);
    const selectedJobs = jobs.filter((job) => selectedIds.includes(job.id));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onApply(selectedJobs);
    setSelectedIds([]);
    setIsApplying(false);
  };

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <div className="text-center">
          <p className="font-medium mb-1">No jobs found</p>
          <p className="text-sm text-muted-foreground/60">Try adjusting your search filters!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleSelectAll}
          className="hover:scale-105 transition-transform duration-200"
        >
          <Checkbox
            checked={allSelected}
            className="mr-2"
            tabIndex={-1}
          />
          {allSelected ? "Unselect All" : "Select All"}
        </Button>
        
        {selectedIds.length > 0 && (
          <Button
            onClick={handleApply}
            disabled={isApplying}
            className="hover:scale-105 transition-transform duration-200"
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
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead className="w-8"></TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Posted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <React.Fragment key={job.id}>
                <TableRow 
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    selectedIds.includes(job.id) 
                      ? "bg-primary/5 border-primary/30" 
                      : "hover:bg-accent/50"
                  )}
                  onClick={() => handleCheckbox(job.id)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedIds.includes(job.id)}
                      onCheckedChange={() => handleCheckbox(job.id)}
                    />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(job.id)}
                      className="h-6 w-6 p-0"
                    >
                      {expandedRows.includes(job.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {job.salary}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(job.posted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </TableCell>
                </TableRow>
                
                {/* Expanded Row */}
                {expandedRows.includes(job.id) && (
                  <TableRow className="bg-accent/20">
                    <TableCell colSpan={6} className="py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Company</p>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-muted-foreground">{job.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Posted</p>
                            <p className="text-muted-foreground">
                              {new Date(job.posted).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-accent/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Click the checkbox to select this job for batch application, or use the "Apply to selected" button to apply to multiple jobs at once.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
