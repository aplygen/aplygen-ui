
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
      "transition-all duration-300 ease-in-out relative",
      isActive
        ? "bg-primary text-primary-foreground shadow-lg scale-105"
        : "hover:bg-accent text-muted-foreground hover:text-accent-foreground hover:scale-105"
    );

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-background/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl px-8 py-4 shadow-2xl animate-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-8">
        {/* Left: Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl w-10 h-10 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg hover:scale-110 transition-transform duration-200">
            A
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hidden sm:inline">
            Aplygen
          </span>
        </div>

        {/* Center: Navigation */}
        <div className="flex items-center gap-3">
          {navItems.map((item) => (
            <NavLink
              to={item.url}
              key={item.url}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${getNavCls({ isActive })}`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.title}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/20 rounded-xl animate-pulse" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right: Theme toggle & Profile */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl h-10 w-10 hover:scale-110 transition-all duration-200 hover:bg-accent/50"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? 
              <Sun className="h-5 w-5 text-yellow-500" /> : 
              <Moon className="h-5 w-5 text-blue-600" />
            }
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-xl h-10 w-10 hover:scale-110 transition-all duration-200 hover:bg-accent/50" 
            aria-label="Profile"
          >
            <Avatar className="h-7 w-7">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                <User className="w-4 h-4 text-primary" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </nav>
  );
}
