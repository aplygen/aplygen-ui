
import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BentoCard } from "@/components/BentoCard";

const bentoData = [
  {
    icon: "search",
    title: "Job Search",
    description: "Find new job opportunities with AI-powered filters for roles, location, salary, and more.",
  },
  {
    icon: "save",
    title: "Saved Filters",
    description: "Quickly access and manage your saved job search filters.",
  },
  {
    icon: "chart-bar",
    title: "Analytics",
    description: "View insights on your job applications, interview rates, and success trends.",
  },
  {
    icon: "file-check",
    title: "Applied Jobs & Status",
    description: "Track the jobs you’ve applied to and see current application statuses.",
  },
];

const Applications = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors">
            <div className="h-16 flex items-center px-6 gap-4">
              <h2 className="font-semibold text-lg">Applications Dashboard</h2>
            </div>
          </header>
          <main className="flex-1 w-full p-6 flex items-stretch">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full mx-auto max-w-screen-2xl">
              {bentoData.map((card) => (
                <BentoCard key={card.title} icon={card.icon as any} title={card.title} description={card.description} />
              ))}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Applications;
