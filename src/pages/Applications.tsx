
import * as React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BentoCard } from "@/components/BentoCard";

const bentoData = [
  {
    icon: "search",
    title: "Job Search",
    description: "Find new job opportunities with AI-powered filters for roles, location, salary, and more.",
    content: (
      <ul className="text-sm mt-3 space-y-1">
        <li>• React Developer - New York, $120k</li>
        <li>• UX Designer - Remote, $100k</li>
        <li>• Backend Engineer - Berlin, $110k</li>
        <li className="italic text-xs text-muted-foreground">3 more matches…</li>
      </ul>
    ),
  },
  {
    icon: "save",
    title: "Saved Filters",
    description: "Quickly access and manage your saved job search filters.",
    content: (
      <ul className="text-sm mt-3 space-y-1">
        <li>• Remote Frontend, $110k+</li>
        <li>• Product Manager, San Francisco</li>
        <li>• Junior QA, London</li>
      </ul>
    ),
  },
  {
    icon: "chart-bar",
    title: "Analytics",
    description: "View insights on your job applications, interview rates, and success trends.",
    content: (
      <div className="mt-3 space-y-1">
        <div className="text-lg font-bold">12</div>
        <div className="text-xs text-muted-foreground">Applications this week</div>
        <div className="text-sm">
          <span className="font-semibold text-green-600">34%</span> Interview rate
        </div>
      </div>
    ),
  },
  {
    icon: "file-check",
    title: "Applied Jobs & Status",
    description: "Track the jobs you’ve applied to and see current application statuses.",
    content: (
      <ul className="text-sm mt-3 space-y-1">
        <li>• Meta — Interview</li>
        <li>• Google — Awaiting Response</li>
        <li>• Stripe — Rejected</li>
        <li>• Canva — Offer</li>
      </ul>
    ),
  },
];

const Applications = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          {/* Always-visible SidebarTrigger in header for mobile/desktop */}
          <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors flex items-center">
            <div className="h-16 flex items-center px-6 gap-4 w-full">
              <div className="md:hidden block">
                <SidebarTrigger />
              </div>
              <h2 className="font-semibold text-lg">Applications Dashboard</h2>
              {/* SidebarTrigger visible on desktop when sidebar is collapsed */}
              <div className="hidden md:block ml-auto">
                <SidebarTrigger />
              </div>
            </div>
          </header>
          <main className="flex-1 w-full p-6 flex items-stretch">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full mx-auto max-w-screen-2xl">
              {bentoData.map((card) => (
                <BentoCard
                  key={card.title}
                  icon={card.icon as any}
                  title={card.title}
                  description={card.description}
                  className="relative"
                >
                  {card.content}
                </BentoCard>
              ))}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Applications;
