
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Filter,
  Clock, 
  CheckCircle, 
  XCircle,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { JobBatch, BatchJob } from "@/types/batch";

interface BatchManagerProps {
  batches: JobBatch[];
  onPauseBatch: (batchId: string) => void;
  onResumeBatch: (batchId: string) => void;
  onRetryBatch: (batchId: string) => void;
}

export const BatchManager: React.FC<BatchManagerProps> = ({
  batches,
  onPauseBatch,
  onResumeBatch,
  onRetryBatch
}) => {
  const [filterStatus, setFilterStatus] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("newest");
  const [expandedBatches, setExpandedBatches] = React.useState<string[]>([]);

  const filteredBatches = React.useMemo(() => {
    let filtered = [...batches];

    if (filterStatus !== "all") {
      filtered = filtered.filter(batch => batch.status === filterStatus);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "progress":
          return b.successRate - a.successRate;
        default:
          return 0;
      }
    });

    return filtered;
  }, [batches, filterStatus, sortBy]);

  const toggleExpanded = (batchId: string) => {
    setExpandedBatches(prev => 
      prev.includes(batchId) 
        ? prev.filter(id => id !== batchId)
        : [...prev, batchId]
    );
  };

  const getStatusIcon = (status: BatchJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'applying':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: JobBatch['status']) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      processing: "bg-blue-100 text-blue-800 border-blue-300",
      completed: "bg-green-100 text-green-800 border-green-300",
      paused: "bg-gray-100 text-gray-800 border-gray-300",
      failed: "bg-red-100 text-red-800 border-red-300"
    };

    return (
      <Badge variant="outline" className={cn("capitalize", variants[status])}>
        {status}
      </Badge>
    );
  };

  if (batches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-4">
          <Package className="w-8 h-8" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold mb-1">No application batches yet</h3>
          <p className="text-sm text-muted-foreground/60">
            Select jobs from the search results to start creating application batches
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Filters */}
      <div className="flex gap-3 mb-4 pb-2 border-b">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="progress">By Progress</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Batch Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Success Rate</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches.map((batch) => {
              const completedJobs = batch.jobs.filter(job => job.status === 'completed').length;
              const failedJobs = batch.jobs.filter(job => job.status === 'failed').length;
              const progress = (completedJobs / batch.totalApplications) * 100;

              return (
                <React.Fragment key={batch.id}>
                  <TableRow className="cursor-pointer hover:bg-accent/50">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(batch.id)}
                        className="h-6 w-6 p-0"
                      >
                        {expandedBatches.includes(batch.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{batch.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {batch.category} • {new Date(batch.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(batch.status)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{completedJobs}/{batch.totalApplications}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {batch.successRate}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {batch.status === 'processing' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onPauseBatch(batch.id);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Pause className="w-4 h-4" />
                          </Button>
                        )}
                        {batch.status === 'paused' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onResumeBatch(batch.id);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                        {failedJobs > 0 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onRetryBatch(batch.id);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded Row - Job Details */}
                  {expandedBatches.includes(batch.id) && (
                    <TableRow className="bg-accent/20">
                      <TableCell colSpan={6} className="py-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Job Applications ({batch.jobs.length})</h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {batch.jobs.map((job) => (
                              <div 
                                key={job.id} 
                                className="flex items-center justify-between p-3 bg-background rounded-md border"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{job.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {job.company} • {job.location}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className="text-xs text-green-600">
                                    {job.salary}
                                  </Badge>
                                  {getStatusIcon(job.status)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
