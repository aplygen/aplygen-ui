import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export type BackgroundJob = {
  id: number;
  title: string;
  status: "running" | "completed";
};

interface BackgroundJobBoxProps {
  jobs: BackgroundJob[];
  batchNumber?: number;
}

const JOBS_PER_PAGE = 6;

export const BackgroundJobBox: React.FC<BackgroundJobBoxProps> = ({ jobs, batchNumber }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  if (!jobs.length) return null;

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const displayJobs = jobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/20">
        <CardTitle className="text-lg flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          ApplyGen Application Batches
          {typeof batchNumber === "number"
            ? ` (Set ${batchNumber + 1})`
            : " (Current Set)"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {displayJobs.map((job, index) => (
            <Card 
              key={job.id} 
              className={cn(
                "p-4 transition-all duration-300 border-2",
                "animate-in slide-in-from-left-4 duration-300",
                job.status === "running" 
                  ? "border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-25 hover:shadow-md" 
                  : "border-green-200 bg-gradient-to-r from-green-50 to-green-25 hover:shadow-md"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800 flex-1 mr-3">
                  {job.title}
                </span>
                <div className="flex items-center gap-2">
                  {job.status === "running" && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  )}
                  <span
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full font-semibold border",
                      job.status === "running"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                        : "bg-green-100 text-green-800 border-green-300"
                    )}
                  >
                    {job.status === "running" ? "Running" : "Completed"}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

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
      </CardContent>
    </Card>
  );
};
