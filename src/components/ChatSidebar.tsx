
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageCircle, Briefcase, Clock } from "lucide-react";
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

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  sessions,
  activeSessionId,
  onSessionSelect,
  onNewSession
}) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <Button 
          onClick={onNewSession}
          className="w-full justify-start gap-2"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          New Job Search
        </Button>
      </div>

      {/* Chat Sessions */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
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
              <MessageCircle className="h-4 w-4 mt-0.5 text-gray-500" />
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
  );
};
