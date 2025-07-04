
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Search, Package, MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job, JobBatch } from "@/types/batch";
import { BatchManager } from "@/components/BatchManager";
import { ChatSidebar } from "@/components/ChatSidebar";
import { JobCard } from "@/components/JobCard";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'jobs';
  content?: string;
  timestamp: Date;
  jobCount?: number;
  searchQuery?: string;
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

const USER_DATA = {
  name: "Vishwas",
  tagline: "Full Stack Developer",
  jobTitle: "Software Engineer"
};

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
  const [activeTab, setActiveTab] = React.useState("chat");
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
  const [hasStartedChat, setHasStartedChat] = React.useState(false);
  const [allFoundJobs, setAllFoundJobs] = React.useState<Job[]>([]);
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
    
    if (!hasStartedChat) {
      setHasStartedChat(true);
    }
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    
    // Simulate job search response with job count
    setTimeout(() => {
      const foundJobs = jobs.slice(0, Math.min(5, jobs.length));
      setAllFoundJobs(prev => {
        const existingIds = new Set(prev.map(job => job.id));
        const newJobs = foundJobs.filter(job => !existingIds.has(job.id));
        return [...prev, ...newJobs];
      });

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I found ${foundJobs.length} jobs matching "${chatInput}". Click below to view and apply to them.`,
        timestamp: new Date()
      };
      
      const jobsMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'jobs',
        jobCount: foundJobs.length,
        searchQuery: chatInput,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage, jobsMessage]);
    }, 500);
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setChatInput(searchTerm);
    handleChatSend();
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
    const selectedJobs = allFoundJobs.filter(job => selectedJobIds.has(job.id));
    if (selectedJobs.length > 0) {
      onApply(selectedJobs);
      setSelectedJobIds(new Set());
    }
  };

  const handleViewJobs = () => {
    setActiveTab("jobs");
  };

  const handleViewBatches = () => {
    setActiveTab("batches");
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
    setHasStartedChat(false);
    setAllFoundJobs([]);
  };

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <ChatSidebar
        sessions={chatSessions}
        activeSessionId={activeSessionId}
        onSessionSelect={setActiveSessionId}
        onNewSession={handleNewSession}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with User Profile */}
        <div className="p-4 border-b bg-white flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Job Search Assistant</h1>
            <p className="text-sm text-muted-foreground">Find and apply to your dream jobs</p>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-medium text-sm">{USER_DATA.name}</p>
              <p className="text-xs text-muted-foreground">{USER_DATA.tagline}</p>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold">
                {USER_DATA.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!hasStartedChat ? (
            /* Initial Welcome Screen */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-2xl mx-auto p-8">
                <h2 className="text-3xl font-bold mb-4">Welcome to Job Search Assistant</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ask me to find jobs, search by keywords, or describe your ideal position. I'll help you discover and apply to the perfect opportunities.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SAVED_FILTERS.map((filter) => (
                    <Badge 
                      key={filter.id}
                      variant="outline" 
                      className="text-sm cursor-pointer hover:bg-primary/10 transition-colors px-4 py-2"
                      onClick={() => handleFilterClick(filter)}
                    >
                      {filter.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Tabs Component */
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              {/* Tabs Header */}
              <div className="px-4 pt-4 border-b bg-white">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="jobs" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Jobs ({allFoundJobs.length})
                  </TabsTrigger>
                  <TabsTrigger value="batches" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Batches ({batches.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-hidden">
                {/* Chat View */}
                <TabsContent value="chat" className="h-full flex flex-col m-0 p-4">
                  <div className="flex-1 overflow-y-auto mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id}>
                          {message.type === 'jobs' ? (
                            <div className="border rounded-lg p-4 bg-white shadow-sm">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold">Found {message.jobCount} jobs</h4>
                                  <p className="text-sm text-gray-600">Search: "{message.searchQuery}"</p>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button 
                                  onClick={handleViewJobs}
                                  className="flex items-center gap-2"
                                >
                                  View Jobs <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={handleViewBatches}
                                  className="flex items-center gap-2"
                                >
                                  View Batches <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className={cn(
                              "flex gap-3",
                              message.type === 'user' ? 'justify-end' : 'justify-start'
                            )}>
                              <div className={cn(
                                "flex gap-3 max-w-[80%]",
                                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                              )}>
                                <div className={cn(
                                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                  message.type === 'user' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-secondary text-secondary-foreground'
                                )}>
                                  {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </div>
                                <div className={cn(
                                  "px-4 py-3 rounded-lg",
                                  message.type === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-white border shadow-sm'
                                )}>
                                  {message.content}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </TabsContent>

                {/* Jobs View */}
                <TabsContent value="jobs" className="h-full flex flex-col m-0 p-4">
                  <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {allFoundJobs.map((job) => (
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
                </TabsContent>

                {/* Batches View */}
                <TabsContent value="batches" className="h-full m-0 p-4">
                  <BatchManager
                    batches={batches}
                    onPauseBatch={onPauseBatch}
                    onResumeBatch={onResumeBatch}
                    onRetryBatch={onRetryBatch}
                  />
                </TabsContent>
              </div>
            </Tabs>
          )}
        </div>

        {/* Bottom Chat Input - Fixed at bottom */}
        <div className="border-t bg-white p-4 space-y-3">
          {/* Apply Button - Only show if jobs are selected */}
          {selectedJobIds.size > 0 && (
            <Button onClick={handleApplySelected} className="w-full">
              Apply to {selectedJobIds.size} selected job{selectedJobIds.size > 1 ? 's' : ''}
            </Button>
          )}

          {/* Quick Filters - Only show if chat hasn't started */}
          {!hasStartedChat && (
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
