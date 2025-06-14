
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

export function AppNavbar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-muted text-primary font-medium"
      : "hover:bg-muted/50 text-muted-foreground transition";

  return (
    <nav className="w-full h-16 flex items-center px-4 border-b bg-background justify-between gap-4">
      {/* Left: Logo/Title */}
      <div className="flex items-center gap-3 min-w-[150px]">
        <span className="bg-primary rounded-lg w-9 h-9 flex items-center justify-center text-primary-foreground font-bold text-xl">
          A
        </span>
        <span className="font-bold text-lg tracking-tight">Aplygen</span>
      </div>

      {/* Center: Navigation */}
      <div className="flex-1 flex items-center justify-center gap-2 md:gap-4">
        {navItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.url}
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${getNavCls({ isActive })}`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="hidden sm:inline">{item.title}</span>
          </NavLink>
        ))}
      </div>

      {/* Right: Theme toggle & Profile */}
      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Profile" className="ml-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback>
              <User className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </nav>
  );
}
