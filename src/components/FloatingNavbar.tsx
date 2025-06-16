
import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Briefcase, FileText, Settings, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
    isActive
      ? "bg-primary text-primary-foreground"
      : "hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors";

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-background/80 backdrop-blur-md border rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center gap-6">
        {/* Left: Logo/Title */}
        <div className="flex items-center gap-2">
          <span className="bg-primary rounded-lg w-8 h-8 flex items-center justify-center text-primary-foreground font-bold text-sm">
            A
          </span>
          <span className="font-bold text-base tracking-tight hidden sm:inline">Aplygen</span>
        </div>

        {/* Center: Navigation */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              to={item.url}
              key={item.url}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-full text-sm ${getNavCls({ isActive })}`
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden md:inline">{item.title}</span>
            </NavLink>
          ))}
        </div>

        {/* Right: Theme toggle & Profile */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full h-8 w-8"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full h-8 w-8" aria-label="Profile">
            <Avatar className="h-6 w-6">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>
                <User className="w-3 h-3" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </nav>
  );
}
