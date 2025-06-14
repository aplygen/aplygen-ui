
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Moon, Sun, Briefcase, Settings, FileText, Home, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // Helper for active class
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  const navItems = [
    { title: "Smart Jobs Hub", url: "/", icon: Home },
    { title: "Applications", url: "/applications", icon: Briefcase },
    { title: "Resumes", url: "/resumes", icon: FileText },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible>
      <SidebarHeader className="py-4 px-3 flex items-center gap-2 border-b">
        <span className="bg-primary rounded-lg w-8 h-8 flex items-center justify-center text-primary-foreground font-bold text-lg">
          A
        </span>
        <span className="font-semibold text-lg tracking-tight">Aplygen</span>
      </SidebarHeader>
      <SidebarContent className="flex-1 flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3 border-t flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        {/* Profile Avatar Button */}
        <Button variant="ghost" size="icon" aria-label="Profile" className="ml-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback>
              <User className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </SidebarFooter>
      {/* Fallback trigger for collapsed state */}
      <SidebarTrigger className="m-2 self-end" />
    </Sidebar>
  );
}
