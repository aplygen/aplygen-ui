
import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Briefcase, FileText, Settings, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Applications", url: "/applications", icon: Briefcase },
  { title: "Resumes", url: "/resumes", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function FloatingNavbar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative group transition-all duration-300 ease-in-out",
      "flex flex-col items-center justify-center w-12 h-12 rounded-xl",
      isActive
        ? "bg-primary text-primary-foreground shadow-lg scale-110"
        : "hover:bg-accent text-muted-foreground hover:text-accent-foreground hover:scale-105"
    );

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-background/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl px-6 py-3 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2">
        {/* Navigation Items */}
        {navItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.url}
            end
            className={({ isActive }) => getNavCls({ isActive })}
          >
            {({ isActive }) => (
              <>
                <item.icon className="h-5 w-5" />
                
                {/* Hover tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                  <div className="bg-foreground text-background text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
                    {item.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-foreground"></div>
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Separator */}
        <div className="w-px h-8 bg-border mx-2" />

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="group relative w-12 h-12 rounded-xl hover:scale-105 transition-all duration-200 hover:bg-accent/50"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? 
            <Sun className="h-5 w-5 text-yellow-500" /> : 
            <Moon className="h-5 w-5 text-blue-600" />
          }
          
          {/* Hover tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
            <div className="bg-foreground text-background text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
              {theme === "dark" ? "Light mode" : "Dark mode"}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-foreground"></div>
            </div>
          </div>
        </Button>

        {/* Profile */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="group relative w-12 h-12 rounded-xl hover:scale-105 transition-all duration-200 hover:bg-accent/50" 
          aria-label="Profile"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
              <User className="w-4 h-4 text-primary" />
            </AvatarFallback>
          </Avatar>
          
          {/* Hover tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
            <div className="bg-foreground text-background text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
              Profile
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-foreground"></div>
            </div>
          </div>
        </Button>
      </div>
    </nav>
  );
}
