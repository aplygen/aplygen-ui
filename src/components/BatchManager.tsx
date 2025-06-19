
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
      <Card className="border-2 border-primary/20">
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">No application batches yet</h3>
              <p className="text-sm text-muted-foreground">
                Select jobs from the search results to start creating application batches
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Application Batches ({batches.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
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
        </CardContent>
      </Card>

      <div className="space-y-4">
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
