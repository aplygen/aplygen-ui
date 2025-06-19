
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Filter } from "lucide-react";
import { BatchCard } from "@/components/BatchCard";
import { JobBatch } from "@/types/batch";

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

  if (batches.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
          <Package className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-semibold">No application batches yet</h3>
          <p className="text-sm text-muted-foreground">
            Select jobs from the search results to start creating application batches
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with filters */}
      <div className="flex-shrink-0 mb-4 space-y-3">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          <h3 className="font-semibold">Application Batches ({batches.length})</h3>
        </div>
        
        <div className="flex gap-3">
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
      </div>

      {/* Batch Cards - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {filteredBatches.map((batch) => (
          <BatchCard
            key={batch.id}
            batch={batch}
            onPause={onPauseBatch}
            onResume={onResumeBatch}
            onRetry={onRetryBatch}
          />
        ))}
      </div>
    </div>
  );
};
