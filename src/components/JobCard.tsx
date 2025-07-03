
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Check, Clock } from "lucide-react";
import { Job } from "@/types/batch";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  isApplied: boolean;
  onToggleSelect: (jobId: number) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSelected,
  isApplied,
  onToggleSelect
}) => {
  return (
    <div 
      className={cn(
        "p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md",
        isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-gray-200",
        isApplied ? "border-green-500 bg-green-50 opacity-75" : ""
      )}
      onClick={() => !isApplied && onToggleSelect(job.id)}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-sm line-clamp-2">{job.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{job.company}</p>
          </div>
          <div className="ml-2">
            {isApplied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <div className={cn(
                "w-5 h-5 rounded border-2 flex-shrink-0",
                isSelected ? "bg-primary border-primary" : "border-gray-300"
              )} />
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <DollarSign className="h-3 w-3" />
            <span>{job.salary}</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {job.posted}
          </Badge>
          {isApplied && (
            <Badge variant="secondary" className="text-xs">Applied</Badge>
          )}
        </div>
      </div>
    </div>
  );
};
