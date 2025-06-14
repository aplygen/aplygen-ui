
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type BackgroundJob = {
  id: number;
  title: string;
  status: "running" | "completed";
};

interface BackgroundJobBoxProps {
  jobs: BackgroundJob[];
}

export const BackgroundJobBox: React.FC<BackgroundJobBoxProps> = ({ jobs }) => {
  if (!jobs.length) return null;
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-base">Background Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-muted-foreground/10">
          {jobs.map((job) => (
            <li key={job.id} className="py-2 flex justify-between items-center">
              <span>{job.title}</span>
              <span className={`text-xs px-2 rounded ${
                job.status === "running"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-800"
              }`}>
                {job.status === "running" ? "Running" : "Completed"}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
