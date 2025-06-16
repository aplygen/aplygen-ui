
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
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          ApplyGen Application Batches
          {typeof batchNumber === "number"
            ? ` (Set ${batchNumber + 1})`
            : " (Current Set)"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {displayJobs.map((job) => (
            <Card key={job.id} className="p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{job.title}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    job.status === "running"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {job.status === "running" ? "Running" : "Completed"}
                </span>
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
      </CardContent>
    </Card>
  );
};
