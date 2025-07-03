
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, User, Search, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job, JobBatch } from "@/types/batch";
import { BatchManager } from "@/components/BatchManager";
import { ChatSidebar } from "@/components/ChatSidebar";
import { JobCard } from "@/components/JobCard";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  jobCount: number;
  appliedCount: number;
}

interface JobChatInterfaceProps {
  jobs: Job[];
  batches: JobBatch[];
  onApply: (selectedJobs: Job[]) => void;
  onPauseBatch: (batchId: string) => void;
  onResumeBatch: (batchId: string) => void;
  onRetryBatch: (batchId: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

const SAVED_FILTERS = [
  { id: 1, name: "Remote React", criteria: "Remote, React, $90k+" },
  { id: 2, name: "Frontend NYC", criteria: "Frontend, NYC/Remote, $100k+" },
  { id: 3, name: "Senior Backend", criteria: "Backend, Node.js, $120k+" },
  { id: 4, name: "UI/UX Design", criteria: "Design, Remote, $80k+" },
];

export const JobChatInterface: React.FC<JobChatInterfaceProps> = ({
  jobs,
  batches,
  onApply,
  onPauseBatch,
  onResumeBatch,
  onRetryBatch,
  search,
  setSearch
}) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = React.useState("");
  const [selectedJobIds, setSelectedJobIds] = React.useState<Set<number>>(new Set());
  const [appliedJobIds, setAppliedJobIds] = React.useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = React.useState("jobs");
  const [chatSessions, setChatSessions] = React.useState<ChatSession[]>([
    {
      id: "1",
      name: "Frontend Jobs Search",
      lastMessage: "Found 10 frontend jobs",
      timestamp: new Date(),
      jobCount: 10,
      appliedCount: 3
    }
  ]);
  const [activeSessionId, setActiveSessionId] = React.useState("1");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    // Update applied job IDs from batches
    const appliedIds = new Set<number>();
    batches.forEach(batch => {
      batch.jobs.forEach(job => {
        appliedIds.add(job.id);
      });
    });
    setAppliedJobIds(appliedIds);
  }, [batches]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I found ${jobs.length} jobs matching your request. You can select the ones you'd like to apply to from the grid above.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `Search: ${searchTerm}`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Found ${jobs.length} jobs matching "${searchTerm}". Select the ones you'd like to apply to!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  const toggleJobSelection = (jobId: number) => {
    setSelectedJobIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleApplySelected = () => {
    const selectedJobs = jobs.filter(job => selectedJobIds.has(job.id));
    if (selectedJobs.length > 0) {
      onApply(selectedJobs);
      setSelectedJobIds(new Set());
    }
  };

  const handleFilterClick = (filter: typeof SAVED_FILTERS[0]) => {
    handleSearch(filter.name);
  };

  const handleNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: `Job Search ${chatSessions.length + 1}`,
      lastMessage: "New session started",
      timestamp: new Date(),
      jobCount: 0,
      appliedCount: 0
    };
    setChatSessions(prev => [...prev, newSession]);
    setActiveSessionId(newSession.id);
    setMessages([]);
    setSelectedJobIds(new Set());
  };

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <ChatSidebar
        sessions={chatSessions}
        activeSessionId={activeSessionId}
        onSessionSelect={setActiveSessionId}
        onNewSession={handleNewSession}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Tabs Component - Properly wrapping TabsContent */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          {/* Header with Tabs */}
          <div className="p-4 border-b bg-white">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Available Jobs ({jobs.length})
              </TabsTrigger>
              <TabsTrigger value="batches" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Application Batches ({batches.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content Area */}
          <TabsContent value="jobs" className="flex-1 flex flex-col m-0 p-4 space-y-4">
            {/* Jobs Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJobIds.has(job.id)}
                    isApplied={appliedJobIds.has(job.id)}
                    onToggleSelect={toggleJobSelection}
                  />
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="max-h-48 overflow-y-auto border rounded-lg p-3 bg-gray-50">
              <div className="space-y-2">
                {messages.map((message) => (
                  <div key={message.id} className={cn(
                    "flex gap-2",
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}>
                    <div className={cn(
                      "flex gap-2 max-w-[80%]",
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}>
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      )}>
                        {message.type === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                      </div>
                      <div className={cn(
                        "px-3 py-2 rounded-lg text-sm",
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white border'
                      )}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="batches" className="flex-1 m-0 p-4">
            <BatchManager
              batches={batches}
              onPauseBatch={onPauseBatch}
              onResumeBatch={onResumeBatch}
              onRetryBatch={onRetryBatch}
            />
          </TabsContent>
        </Tabs>

        {/* Bottom Section */}
        <div className="p-4 border-t bg-white space-y-3">
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {SAVED_FILTERS.map((filter) => (
              <Badge 
                key={filter.id}
                variant="outline" 
                className="text-xs cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1"
                onClick={() => handleFilterClick(filter)}
              >
                {filter.name}
              </Badge>
            ))}
          </div>

          {/* Apply Button */}
          {selectedJobIds.size > 0 && (
            <Button onClick={handleApplySelected} className="w-full">
              Apply to {selectedJobIds.size} selected job{selectedJobIds.size > 1 ? 's' : ''}
            </Button>
          )}

          {/* Chat Input */}
          <div className="flex gap-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Search for jobs or ask me anything..."
              onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
              className="flex-1"
            />
            <Button onClick={handleChatSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
