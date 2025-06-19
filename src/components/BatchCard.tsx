
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Play, Pause, RotateCcw, Clock, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { JobBatch, BatchJob } from "@/types/batch";

interface BatchCardProps {
  batch: JobBatch;
  onPause: (batchId: string) => void;
  onResume: (batchId: string) => void;
  onRetry: (batchId: string) => void;
}

export const BatchCard: React.FC<BatchCardProps> = ({ batch, onPause, onResume, onRetry }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const completedJobs = batch.jobs.filter(job => job.status === 'completed').length;
  const failedJobs = batch.jobs.filter(job => job.status === 'failed').length;
  const progress = (completedJobs / batch.totalApplications) * 100;

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

  return (
    <Card className="border-2 border-primary/20 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-3">
              {batch.name}
              {getStatusBadge(batch.status)}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {batch.category} • Created {new Date(batch.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {batch.status === 'processing' && (
              <Button variant="outline" size="sm" onClick={() => onPause(batch.id)}>
                <Pause className="w-4 h-4" />
              </Button>
            )}
            {batch.status === 'paused' && (
              <Button variant="outline" size="sm" onClick={() => onResume(batch.id)}>
                <Play className="w-4 h-4" />
              </Button>
            )}
            {failedJobs > 0 && (
              <Button variant="outline" size="sm" onClick={() => onRetry(batch.id)}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{completedJobs}/{batch.totalApplications} completed</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{completedJobs} completed</span>
            <span>{failedJobs} failed</span>
            <span>{batch.successRate}% success rate</span>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-2 border-t pt-4">
            <h4 className="font-semibold text-sm">Job Applications</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {batch.jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-2 bg-accent/20 rounded-md">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.company} • {job.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600 font-semibold">{job.salary}</span>
                    {getStatusIcon(job.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
