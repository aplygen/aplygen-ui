
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, User, MapPin, DollarSign, Check, Package, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job, JobBatch } from "@/types/batch";
import { BatchManager } from "@/components/BatchManager";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'job';
  content?: string;
  timestamp: Date;
  job?: Job;
  applied?: boolean;
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
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (jobs.length > 0 && activeTab === "jobs") {
      const jobMessages: ChatMessage[] = jobs.map(job => ({
        id: `job-${job.id}`,
        type: 'job',
        timestamp: new Date(),
        job,
        applied: appliedJobIds.has(job.id)
      }));

      setMessages(prev => {
        const nonJobMessages = prev.filter(msg => msg.type !== 'job');
        return [...nonJobMessages, ...jobMessages];
      });
    }
  }, [jobs, appliedJobIds, activeTab]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev.filter(msg => msg.type !== 'job'), userMessage]);
    setChatInput("");
    
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm searching for jobs that match your request...",
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
    
    setMessages(prev => [...prev.filter(msg => msg.type !== 'job'), userMessage]);
    
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
      setAppliedJobIds(prev => new Set([...prev, ...selectedJobIds]));
      setSelectedJobIds(new Set());
    }
  };

  const handleFilterClick = (filter: typeof SAVED_FILTERS[0]) => {
    handleSearch(filter.name);
  };

  const renderChatContent = () => {
    if (activeTab === "batches") {
      return (
        <div className="flex-1 overflow-hidden">
          <BatchManager
            batches={batches}
            onPauseBatch={onPauseBatch}
            onResumeBatch={onResumeBatch}
            onRetryBatch={onRetryBatch}
          />
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((message) => (
          <div key={message.id} className={cn(
            "flex gap-2",
            message.type === 'user' ? 'justify-end' : 'justify-start'
          )}>
            {message.type === 'job' && message.job ? (
              <div className={cn(
                "w-full p-3 rounded-lg border cursor-pointer transition-all max-w-md",
                selectedJobIds.has(message.job.id) 
                  ? "border-primary bg-primary/5 shadow-md" 
                  : appliedJobIds.has(message.job.id)
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-primary/50 hover:bg-accent/30"
              )}
              onClick={() => !appliedJobIds.has(message.job!.id) && toggleJobSelection(message.job!.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{message.job.title}</h4>
                    <p className="text-xs text-muted-foreground">{message.job.company}</p>
                  </div>
                  {appliedJobIds.has(message.job.id) ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className={cn(
                      "w-4 h-4 rounded border-2 flex-shrink-0",
                      selectedJobIds.has(message.job.id) 
                        ? "bg-primary border-primary" 
                        : "border-gray-300"
                    )} />
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {message.job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {message.job.salary}
                  </div>
                </div>
                {appliedJobIds.has(message.job.id) && (
                  <Badge variant="secondary" className="text-xs">Applied</Badge>
                )}
              </div>
            ) : (
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
                    : 'bg-secondary text-secondary-foreground'
                )}>
                  {message.content}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-primary/20">
      {/* Header with Tabs */}
      <div className="p-4 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Jobs ({jobs.length})
            </TabsTrigger>
            <TabsTrigger value="batches" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Batches ({batches.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {renderChatContent()}
      </div>

      {/* Bottom Section - Filters and Chat Input */}
      <div className="p-4 border-t bg-accent/5 space-y-3">
        {/* Saved Filters */}
        <div>
          <div className="text-sm font-medium mb-2">Quick Filters:</div>
          <div className="flex flex-wrap gap-1">
            {SAVED_FILTERS.map((filter) => (
              <Badge 
                key={filter.id}
                variant="outline" 
                className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => handleFilterClick(filter)}
              >
                {filter.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        {selectedJobIds.size > 0 && (
          <Button onClick={handleApplySelected} className="w-full" size="sm">
            Apply to {selectedJobIds.size} selected job{selectedJobIds.size > 1 ? 's' : ''}
          </Button>
        )}

        {/* Chat Input */}
        <div className="flex gap-2">
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Search jobs or chat about your preferences..."
            onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
            className="flex-1"
          />
          <Button onClick={handleChatSend} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
