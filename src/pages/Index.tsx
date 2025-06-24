
import * as React from "react";
import { BentoCard } from "@/components/BentoCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobList } from "@/components/JobList";
import { BatchManager } from "@/components/BatchManager";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { ChatSearchBox } from "@/components/ChatSearchBox";
import { Job, JobBatch, BatchJob } from "@/types/batch";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SAVED_FILTERS = [
  { id: 1, name: "Remote React Jobs", criteria: "Remote, React, $90k+" },
  { id: 2, name: "Frontend (Remote or NYC)", criteria: "Frontend, NYC/Remote, $100k+" },
  { id: 3, name: "Senior Backend Engineer", criteria: "Backend, Node.js, $120k+" },
  { id: 4, name: "Full Stack Developer", criteria: "Full Stack, TypeScript, $110k+" },
  { id: 5, name: "UI/UX Designer", criteria: "Design, Figma, $85k+" },
  { id: 6, name: "DevOps Engineer", criteria: "AWS, Docker, $130k+" },
];

const MOCK_JOBS: Job[] = [
  { id: 1, title: "Frontend Engineer", company: "InnovateX", location: "Remote", salary: "$120,000", posted: "2025-06-10" },
  { id: 2, title: "React Developer", company: "Acme Corp.", location: "New York, NY", salary: "$110,000", posted: "2025-06-12" },
  { id: 3, title: "UI Engineer", company: "BrightTech", location: "Remote", salary: "$125,000", posted: "2025-06-13" },
  { id: 4, title: "Product Designer", company: "DesignLoose", location: "NYC", salary: "$105,000", posted: "2025-06-12" },
  { id: 5, title: "Fullstack Engineer", company: "CodeBase", location: "Remote", salary: "$130,000", posted: "2025-06-11" },
  { id: 6, title: "Frontend Developer", company: "WebGen", location: "Remote", salary: "$100,000", posted: "2025-06-11" },
  { id: 7, title: "Senior UI Engineer", company: "BloomLogic", location: "Remote", salary: "$130,000", posted: "2025-06-10" },
  { id: 8, title: "Junior React Dev", company: "QuickApps", location: "Remote", salary: "$85,000", posted: "2025-06-09" },
  { id: 9, title: "Frontend Architect", company: "CoreSystems", location: "NYC", salary: "$145,000", posted: "2025-06-08" },
  { id: 10, title: "UI/UX Designer", company: "PixelPush", location: "NYC", salary: "$102,000", posted: "2025-06-10" },
  { id: 11, title: "Web Engineer", company: "SkyForge", location: "Remote", salary: "$110,000", posted: "2025-06-13" },
  { id: 12, title: "Frontend Lead", company: "AppPilot", location: "Remote", salary: "$135,000", posted: "2025-06-09" },
];

const USER_DATA = {
  name: "Vishwas",
  tagline: "Full Stack Developer",
  jobTitle: "Software Engineer"
};

const Index = () => {
  const [search, setSearch] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [jobType, setJobType] = React.useState("");
  const [appliedJobIds, setAppliedJobIds] = React.useState<Set<number>>(new Set());
  const [batches, setBatches] = React.useState<JobBatch[]>([]);
  const { toast } = useToast();

  const availableJobs = React.useMemo(() => {
    return MOCK_JOBS.filter(job => !appliedJobIds.has(job.id));
  }, [appliedJobIds]);

  const handleChatSearch = React.useCallback((filters: { 
    search?: string; 
    location?: string; 
    salary?: string; 
    jobType?: string 
  }) => {
    if (filters.search) setSearch(filters.search);
    if (filters.location) setLocation(filters.location);
    if (filters.salary) setSalary(filters.salary);
    if (filters.jobType) setJobType(filters.jobType);
    
    toast({
      title: "Search Applied",
      description: "AI has updated your search filters based on your request.",
    });
  }, [toast]);

  const generateBatchName = React.useCallback((jobs: Job[]) => {
    const categories = jobs.map(job => {
      const title = job.title.toLowerCase();
      if (title.includes('frontend') || title.includes('react') || title.includes('ui')) return 'Frontend';
      if (title.includes('backend')) return 'Backend';
      if (title.includes('fullstack') || title.includes('full stack')) return 'Full Stack';
      if (title.includes('design')) return 'Design';
      return 'General';
    });

    const categoryCount = categories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dominantCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b
    );

    return `Batch #${batches.length + 1} - ${dominantCategory} Jobs`;
  }, [batches.length]);

  const handleApply = React.useCallback(async (selectedJobs: Job[]) => {
    if (selectedJobs.length === 0) return;

    const batchId = `batch-${Date.now()}`;
    const batchJobs: BatchJob[] = selectedJobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      status: 'preparing' as const,
    }));

    const newBatch: JobBatch = {
      id: batchId,
      name: generateBatchName(selectedJobs),
      createdAt: new Date(),
      status: 'pending',
      jobs: batchJobs,
      category: selectedJobs.length > 1 ? 'Mixed' : 'Single Application',
      successRate: 0,
      totalApplications: selectedJobs.length,
    };

    setAppliedJobIds(prev => new Set([...prev, ...selectedJobs.map(j => j.id)]));
    setBatches(prev => [...prev, newBatch]);

    toast({
      title: "Batch Created",
      description: `${selectedJobs.length} jobs added to ${newBatch.name}`,
    });

    // Start processing simulation
    setTimeout(() => {
      setBatches(prev => prev.map(batch => 
        batch.id === batchId ? { ...batch, status: 'processing' as const } : batch
      ));
    }, 1000);

    // Simulate job processing
    batchJobs.forEach((job, index) => {
      setTimeout(() => {
        setBatches(prev => prev.map(batch => {
          if (batch.id !== batchId) return batch;
          
          const updatedJobs = batch.jobs.map(j => 
            j.id === job.id ? { ...j, status: 'applying' as const, appliedAt: new Date() } : j
          );
          
          return { ...batch, jobs: updatedJobs };
        }));
      }, 2000 + index * 1000);

      setTimeout(() => {
        setBatches(prev => prev.map(batch => {
          if (batch.id !== batchId) return batch;
          
          const isSuccess = Math.random() > 0.2;
          const updatedJobs = batch.jobs.map(j => 
            j.id === job.id ? { 
              ...j, 
              status: isSuccess ? 'completed' as const : 'failed' as const,
              failureReason: !isSuccess ? 'Application submission failed' : undefined
            } : j
          );
          
          const completedJobs = updatedJobs.filter(j => j.status === 'completed').length;
          const allJobsProcessed = updatedJobs.every(j => j.status === 'completed' || j.status === 'failed');
          
          return { 
            ...batch, 
            jobs: updatedJobs,
            successRate: Math.round((completedJobs / batch.totalApplications) * 100),
            status: allJobsProcessed ? 'completed' as const : batch.status
          };
        }));
      }, 4000 + index * 1000);
    });
  }, [generateBatchName, toast]);

  const handleBatchAction = React.useCallback((batchId: string, action: 'pause' | 'resume' | 'retry') => {
    setBatches(prev => prev.map(batch => {
      if (batch.id !== batchId) return batch;
      
      switch (action) {
        case 'pause':
          return { ...batch, status: 'paused' as const };
        case 'resume':
          return { ...batch, status: 'processing' as const };
        case 'retry':
          const retriedJobs = batch.jobs.map(job => 
            job.status === 'failed' ? { ...job, status: 'preparing' as const, failureReason: undefined } : job
          );
          return { ...batch, jobs: retriedJobs, status: 'processing' as const };
        default:
          return batch;
      }
    }));
    
    const messages = {
      pause: "Batch Paused",
      resume: "Batch Resumed", 
      retry: "Retrying Failed Applications"
    };
    
    toast({
      title: messages[action],
      description: `Application processing has been ${action}d`,
    });
  }, [toast]);

  const handleFormSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 pb-20">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-6 py-3 border border-primary/20">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
              {USER_DATA.name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold">Hi, {USER_DATA.name}! 👋</p>
              <p className="text-sm text-muted-foreground">{USER_DATA.tagline}</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ready to find your next opportunity? Let's get you connected with the perfect job.
          </p>
        </div>
      </div>

      <main className="w-full max-w-7xl mx-auto p-6 space-y-8">
        {/* Search and Filters Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[280px]">
          {/* Job Search */}
          <div className="lg:col-span-2">
            <Card className="h-full border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Job Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Search for jobs (e.g., React remote)..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" variant="default" className="px-6">
                      Search
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="nyc">New York, NY</SelectItem>
                        <SelectItem value="sf">San Francisco, CA</SelectItem>
                        <SelectItem value="la">Los Angeles, CA</SelectItem>
                        <SelectItem value="chicago">Chicago, IL</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={salary} onValueChange={setSalary}>
                      <SelectTrigger>
                        <SelectValue placeholder="Salary Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60k-80k">$60k - $80k</SelectItem>
                        <SelectItem value="80k-100k">$80k - $100k</SelectItem>
                        <SelectItem value="100k-120k">$100k - $120k</SelectItem>
                        <SelectItem value="120k-150k">$120k - $150k</SelectItem>
                        <SelectItem value="150k+">$150k+</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={jobType} onValueChange={setJobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="fullstack">Full Stack</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
                
                <Separator />
                
                <div>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-muted-foreground">✨ AI Search Assistant</h4>
                    <p className="text-xs text-muted-foreground">Describe your ideal job in natural language</p>
                  </div>
                  <ChatSearchBox onSearch={handleChatSearch} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Saved Filters */}
          <div>
            <Card className="h-full border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💾</span>
                  Saved Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {SAVED_FILTERS.map((filter) => (
                    <div key={filter.id} className="p-3 hover:bg-accent/50 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-primary/20 group">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-medium text-sm group-hover:text-primary transition-colors">{filter.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {filter.criteria.split(', ').map((criterion, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {criterion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Jobs Section */}
        <BentoCard
          icon="search"
          title="Available Jobs"
          description={`${availableJobs.length} jobs matching your criteria`}
          className="h-[600px]"
        >
          <div className="h-[480px] -mx-8 -mb-8 mt-4">
            <div className="h-full px-8 pb-8">
              <JobList jobs={availableJobs} onApply={handleApply} />
            </div>
          </div>
        </BentoCard>

        {/* Application Batches Section */}
        <BentoCard
          icon="package"
          title="Application Batches"
          description={`${batches.length} batches in progress or completed`}
          className="h-[600px]"
        >
          <div className="h-[480px] -mx-8 -mb-8 mt-4">
            <div className="h-full px-8 pb-8">
              <BatchManager
                batches={batches}
                onPauseBatch={(id) => handleBatchAction(id, 'pause')}
                onResumeBatch={(id) => handleBatchAction(id, 'resume')}
                onRetryBatch={(id) => handleBatchAction(id, 'retry')}
              />
            </div>
          </div>
        </BentoCard>
      </main>

      <FloatingNavbar />
    </div>
  );
};

export default Index;
