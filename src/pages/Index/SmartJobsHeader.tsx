
import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const SmartJobsHeader: React.FC = () => (
  <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors">
    <div className="h-16 flex items-center px-6 gap-4">
      {/* Show sidebar trigger button on mobile */}
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h2 className="font-semibold text-lg">Smart Jobs Hub</h2>
    </div>
  </header>
);
