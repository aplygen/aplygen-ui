
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  searchFilters?: {
    search?: string;
    location?: string;
    salary?: string;
    jobType?: string;
  };
}

interface ChatSearchBoxProps {
  onSearch: (filters: { search?: string; location?: string; salary?: string; jobType?: string }) => void;
}

const EXAMPLE_PROMPTS = [
  "Find remote React jobs paying over $100k",
  "Show frontend positions in NYC",
  "I want senior roles at startups",
  "Remote full-stack developer jobs"
];

export const ChatSearchBox: React.FC<ChatSearchBoxProps> = ({ onSearch }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const parseNaturalLanguage = (query: string): ChatMessage['searchFilters'] => {
    const filters: ChatMessage['searchFilters'] = {};
    
    // Extract job type/role
    if (query.toLowerCase().includes('react') || query.toLowerCase().includes('frontend')) {
      filters.jobType = 'frontend';
      filters.search = 'React Frontend';
    } else if (query.toLowerCase().includes('backend')) {
      filters.jobType = 'backend';
      filters.search = 'Backend';
    } else if (query.toLowerCase().includes('fullstack') || query.toLowerCase().includes('full-stack')) {
      filters.jobType = 'fullstack';
      filters.search = 'Full Stack';
    } else if (query.toLowerCase().includes('design') || query.toLowerCase().includes('ui/ux')) {
      filters.jobType = 'design';
      filters.search = 'Designer';
    }
    
    // Extract location
    if (query.toLowerCase().includes('remote')) {
      filters.location = 'remote';
    } else if (query.toLowerCase().includes('nyc') || query.toLowerCase().includes('new york')) {
      filters.location = 'nyc';
    } else if (query.toLowerCase().includes('sf') || query.toLowerCase().includes('san francisco')) {
      filters.location = 'sf';
    }
    
    // Extract salary
    if (query.toLowerCase().includes('100k') || query.toLowerCase().includes('$100')) {
      filters.salary = '100k-120k';
    } else if (query.toLowerCase().includes('120k') || query.toLowerCase().includes('$120')) {
      filters.salary = '120k-150k';
    } else if (query.toLowerCase().includes('150k') || query.toLowerCase().includes('$150')) {
      filters.salary = '150k+';
    }
    
    return filters;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Parse the natural language query
    const searchFilters = parseNaturalLanguage(input);
    
    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I found jobs matching your criteria! I'll search for ${searchFilters.search || 'jobs'} ${searchFilters.location ? `in ${searchFilters.location}` : ''} ${searchFilters.salary ? `with salary range ${searchFilters.salary}` : ''}.`,
        timestamp: new Date(),
        searchFilters
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
      // Apply the search filters
      onSearch(searchFilters);
    }, 1000);
    
    setInput("");
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="space-y-4">
      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="max-h-40 overflow-y-auto space-y-3 p-3 bg-accent/20 rounded-lg">
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
                  {message.searchFilters && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Object.entries(message.searchFilters).map(([key, value]) => (
                        value && (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key}: {value}
                          </Badge>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="h-3 w-3" />
              </div>
              <div className="bg-secondary px-3 py-2 rounded-lg text-sm text-secondary-foreground">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your ideal job... (e.g., 'Remote React jobs over $100k')"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1"
        />
        <Button 
          onClick={handleSend} 
          disabled={!input.trim() || isLoading}
          size="sm"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Example Prompts */}
      {messages.length === 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            Try these examples:
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((prompt, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="cursor-pointer hover:bg-accent transition-colors text-xs"
                onClick={() => handleExampleClick(prompt)}
              >
                {prompt}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
