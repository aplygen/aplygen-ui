
import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BentoCard } from "@/components/BentoCard";

export default function Applications() {
  // Example static data for demonstration
  const searchData = {
    totalSearches: 4,
    filters: ["Remote", "Full-Time", "Frontend", "Senior"],
    lastSearched: "2025-06-11",
  };
  const saveData = {
    savedFilters: 2,
    filters: ["Management", "Backend"],
  };
  const analyticsData = {
    interviews: 5,
    offers: 2,
    progress: "40%",
  };
  const jobsData = {
    applied: 10,
    status: {
      interviewing: 2,
      offered: 1,
      rejected: 3,
      pending: 4,
    },
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <main className="w-full py-6 flex-1 flex flex-col items-center px-4">
            <div className="w-full max-w-5xl">
              <h1 className="text-2xl font-bold mb-6">Applications</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <BentoCard
                  icon="search"
                  title="Job Search"
                  description="Total searches, filters, and last activity"
                >
                  <div className="mt-3">
                    <div className="text-xs mb-0.5 text-muted-foreground">
                      Filters used: <span className="font-medium">{searchData.filters.join(", ")}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last search: <span className="font-medium">{searchData.lastSearched}</span>
                    </div>
                    <div className="mt-2 text-xs">Total smart searches: <span className="font-bold">{searchData.totalSearches}</span></div>
                  </div>
                </BentoCard>
                <BentoCard
                  icon="save"
                  title="Saved Filters"
                  description="Overview of your saved smart search filters"
                >
                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground">
                      Filters: <span className="font-medium">{saveData.filters.join(", ")}</span>
                    </div>
                    <div className="mt-2 text-xs">
                      Total: <span className="font-bold">{saveData.savedFilters}</span>
                    </div>
                  </div>
                </BentoCard>
                <BentoCard
                  icon="chart-bar"
                  title="Analytics"
                  description="Interview, offer progress, and more"
                >
                  <div className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground">
                    <span>Interviews: <span className="font-bold">{analyticsData.interviews}</span></span>
                    <span>Offers: <span className="font-bold">{analyticsData.offers}</span></span>
                    <span>Progress: <span className="font-bold">{analyticsData.progress}</span></span>
                  </div>
                </BentoCard>
                <BentoCard
                  icon="file-check"
                  title="Applied Jobs & Status"
                  description="Stats of applied jobs and statuses"
                >
                  <div className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground">
                    <span>Total applied: <span className="font-bold">{jobsData.applied}</span></span>
                    <span>Interviewing: <span className="font-bold">{jobsData.status.interviewing}</span></span>
                    <span>Offered: <span className="font-bold">{jobsData.status.offered}</span></span>
                    <span>Rejected: <span className="font-bold">{jobsData.status.rejected}</span></span>
                    <span>Pending: <span className="font-bold">{jobsData.status.pending}</span></span>
                  </div>
                </BentoCard>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
