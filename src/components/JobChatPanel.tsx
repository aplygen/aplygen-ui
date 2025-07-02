
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bot, User, MapPin, DollarSign, Calendar, Building, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job } from "@/types/batch";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'job';
  content?: string;
  timestamp: Date;
  job?: Job;
  applied?: boolean;
}

interface JobChatPanelProps {
  jobs: Job[];
  onApply: (selectedJobs: Job[]) => void;
  search: string;
  setSearch: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  salary: string;
  setSalary: (value: string) => void;
  jobType: string;
  setJobType: (value: string) => void;
}

const SAVED_FILTERS = [
  { id: 1, name: "Remote React Jobs", criteria: "Remote, React, $90k+" },
  { id: 2, name: "Frontend (Remote or NYC)", criteria: "Frontend, NYC/Remote, $100k+" },
  { id: 3, name: "Senior Backend Engineer", criteria: "Backend, Node.js, $120k+" },
];

export const JobChatPanel: React.FC<JobChatPanelProps> = ({
  jobs,
  onApply,
  search,
  setSearch,
  location,
  setLocation,
  salary,
  setSalary,
  jobType,
  setJobType
}) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = React.useState("");
  const [selectedJobIds, setSelectedJobIds] = React.useState<Set<number>>(new Set());
  const [appliedJobIds, setAppliedJobIds] = React.useState<Set<number>>(new Set());
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    // Add jobs as chat messages when they change
    if (jobs.length > 0) {
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
  }, [jobs, appliedJobIds]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `Search for: ${search}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev.filter(msg => msg.type !== 'job'), userMessage]);
      
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `Found ${jobs.length} jobs matching your criteria. Select the ones you'd like to apply to!`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 500);
    }
  };

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
    setSearch(filter.name);
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `Applied filter: ${filter.name}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev.filter(msg => msg.type !== 'job'), userMessage]);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-primary/20">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">💼</span>
          Job Search & Chat
        </h2>
      </div>

      {/* Search Form */}
      <div className="p-4 border-b bg-accent/10">
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">Search</Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="nyc">NYC</SelectItem>
                <SelectItem value="sf">SF</SelectItem>
              </SelectContent>
            </Select>
            <Select value={salary} onValueChange={setSalary}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Salary" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="80k-100k">$80k-$100k</SelectItem>
                <SelectItem value="100k-120k">$100k-$120k</SelectItem>
                <SelectItem value="120k+">$120k+</SelectItem>
              </SelectContent>
            </Select>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="fullstack">Full Stack</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>

        {/* Saved Filters */}
        <div className="mt-3">
          <div className="text-sm font-medium mb-2">Quick Filters:</div>
          <div className="flex flex-wrap gap-1">
            {SAVED_FILTERS.map((filter) => (
              <Badge 
                key={filter.id}
                variant="outline" 
                className="text-xs cursor-pointer hover:bg-primary/10"
                onClick={() => handleFilterClick(filter)}
              >
                {filter.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages & Jobs */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((message) => (
          <div key={message.id} className={cn(
            "flex gap-2",
            message.type === 'user' ? 'justify-end' : 'justify-start'
          )}>
            {message.type === 'job' && message.job ? (
              <div className={cn(
                "w-full p-3 rounded-lg border cursor-pointer transition-all",
                selectedJobIds.has(message.job.id) 
                  ? "border-primary bg-primary/5" 
                  : appliedJobIds.has(message.job.id)
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-primary/50 hover:bg-accent/30"
              )}
              onClick={() => !appliedJobIds.has(message.job!.id) && toggleJobSelection(message.job!.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{message.job.title}</h4>
                    <p className="text-xs text-muted-foreground">{message.job.company}</p>
                  </div>
                  {appliedJobIds.has(message.job.id) ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className={cn(
                      "w-4 h-4 rounded border-2",
                      selectedJobIds.has(message.job.id) 
                        ? "bg-primary border-primary" 
                        : "border-gray-300"
                    )} />
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
                  <Badge variant="secondary" className="mt-2 text-xs">Applied</Badge>
                )}
              </div>
            ) : (
              <div className={cn(
                "flex gap-2 max-w-[80%]",
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs",
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

      {/* Bottom Actions */}
      <div className="p-4 border-t bg-accent/10 space-y-2">
        {selectedJobIds.size > 0 && (
          <Button onClick={handleApplySelected} className="w-full" size="sm">
            Apply to {selectedJobIds.size} selected job{selectedJobIds.size > 1 ? 's' : ''}
          </Button>
        )}
        <div className="flex gap-2">
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about jobs or describe what you're looking for..."
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
