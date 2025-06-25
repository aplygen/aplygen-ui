
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Settings, FileText, HelpCircle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FloatingNavbar = () => {
  const location = useLocation();
  
  // Hide navbar on auth pages
  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/resume", icon: FileText, label: "Resume" },
    { href: "/questions", icon: HelpCircle, label: "Q&A" },
    { href: "/logs", icon: Activity, label: "Logs" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <TooltipProvider>
      <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-background/80 backdrop-blur-xl border border-border/40 rounded-2xl px-4 py-3 shadow-2xl shadow-black/10">
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Tooltip key={item.href} delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ease-out group",
                        "hover:scale-105 active:scale-95",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 transition-all duration-300",
                        isActive ? "scale-110" : "group-hover:scale-110"
                      )} />
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full animate-pulse" />
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    className="bg-background/95 backdrop-blur-sm border border-border shadow-xl animate-in fade-in-0 zoom-in-95 duration-200"
                    sideOffset={8}
                  >
                    <p className="text-sm font-medium">{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export { FloatingNavbar };
