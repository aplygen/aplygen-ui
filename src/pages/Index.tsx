
import * as React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          {/* Sticky header */}
          <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors">
            <div className="h-16 flex items-center px-6 gap-4">
              {/* Show sidebar trigger button on mobile */}
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              {/* Placeholder for search/filter bar */}
              <h2 className="font-semibold text-lg">Job Searches</h2>
            </div>
          </header>
          {/* Main scrollable feed/content */}
          <main className="flex-1 w-full p-6">
            {/* Placeholder: show empty state */}
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">No saved job searches</h1>
                <p className="text-muted-foreground mb-4">
                  Start with your first smart filter!
                </p>
                {/* Example: Add new search button in the future */}
                {/* <Button>New Smart Search</Button> */}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
