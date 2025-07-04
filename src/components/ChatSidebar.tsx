
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, MessageCircle, Briefcase, Clock, Home, FileText, Settings, User, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  jobCount: number;
  appliedCount: number;
}

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
}

const navItems = [
  { title: "Smart Jobs Hub", url: "/", icon: Home },
  { title: "Applications", url: "/applications", icon: Briefcase },
  { title: "Resumes", url: "/resumes", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  sessions,
  activeSessionId,
  onSessionSelect,
  onNewSession
}) => {
  const { theme, setTheme } = useTheme();

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
      : "hover:bg-gray-100 text-gray-700 transition-colors";

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Header with Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-primary rounded-lg w-8 h-8 flex items-center justify-center text-primary-foreground font-bold text-lg">
            A
          </span>
          <span className="font-semibold text-lg tracking-tight">Aplygen</span>
        </div>
        
        <Button 
          onClick={onNewSession}
          className="w-full justify-start gap-2"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          New Job Search
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="p-2 border-b border-gray-200">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${getNavCls({ isActive })}`
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Chat Sessions */}
      <div className="flex-1 overflow-y-auto p-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">
          Recent Chats
        </h3>
        <div className="space-y-1">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onSessionSelect(session.id)}
              className={cn(
                "p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100",
                activeSessionId === session.id ? "bg-primary/10 border border-primary/20" : ""
              )}
            >
              <div className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{session.name}</h4>
                  <p className="text-xs text-gray-500 truncate mt-1">{session.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {session.jobCount}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {session.appliedCount}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Theme Toggle */}
      <div className="p-3 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full justify-start gap-2"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </div>
  );
};
