
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Moon, Sun, Briefcase, Settings, FileText, Home, User, History, MessageCircle, Clock } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  jobCount: number;
}

const MOCK_CHAT_SESSIONS: ChatSession[] = [
  {
    id: "1",
    name: "Frontend Engineer Search",
    lastMessage: "Found 15 matching jobs",
    timestamp: new Date("2025-01-10"),
    jobCount: 15,
  },
  {
    id: "2", 
    name: "React Developer Roles",
    lastMessage: "Applied to 8 positions",
    timestamp: new Date("2025-01-09"),
    jobCount: 8,
  },
  {
    id: "3",
    name: "Remote UI/UX Jobs",
    lastMessage: "Saved 12 opportunities",
    timestamp: new Date("2025-01-08"),
    jobCount: 12,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [theme, setTheme] = React.useState("light");

  const collapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  const mainNavItems = [
    { title: "Smart Jobs Hub", url: "/", icon: Home },
    { title: "Applications", url: "/applications", icon: Briefcase },
    { title: "Application Logs", url: "/logs", icon: History },
    { title: "Q&A Prep", url: "/questions", icon: FileText },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarHeader className="py-4 px-3 flex items-center gap-2 border-b">
        <span className="bg-primary rounded-lg w-8 h-8 flex items-center justify-center text-primary-foreground font-bold text-lg">
          A
        </span>
        {!collapsed && (
          <span className="font-semibold text-lg tracking-tight">Aplygen</span>
        )}
      </SidebarHeader>

      <SidebarContent className="flex-1 flex flex-col justify-between">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chat History */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Recent Chats
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-1 px-2">
                {MOCK_CHAT_SESSIONS.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      "p-2 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
                      "border border-transparent hover:border-muted"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <MessageCircle className="h-3 w-3 mt-1 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium truncate">{session.name}</h4>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {session.lastMessage}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs h-4 px-1">
                            <Briefcase className="h-2 w-2 mr-1" />
                            {session.jobCount}
                          </Badge>
                          <Badge variant="outline" className="text-xs h-4 px-1">
                            <Clock className="h-2 w-2 mr-1" />
                            {session.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3 border-t flex justify-between items-center">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        {/* Profile Avatar Button */}
        <Button variant="ghost" size="icon" aria-label="Profile" className="ml-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
