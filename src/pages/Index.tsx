import * as React from "react";
import { JobChatInterface } from "@/components/JobChatInterface";
import { Job, JobBatch, BatchJob } from "@/types/batch";
import { useToast } from "@/hooks/use-toast";

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
];

const USER_DATA = {
  name: "Vishwas",
  tagline: "Full Stack Developer",
  jobTitle: "Software Engineer"
};

const Index = () => {
  const [search, setSearch] = React.useState("");
  const [appliedJobIds, setAppliedJobIds] = React.useState<Set<number>>(new Set());
  const [batches, setBatches] = React.useState<JobBatch[]>([]);
  const { toast } = useToast();

  const availableJobs = React.useMemo(() => {
    return MOCK_JOBS.filter(job => !appliedJobIds.has(job.id));
  }, [appliedJobIds]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Compact Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-6 py-2 border border-primary/20">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
              {USER_DATA.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold">Hi, {USER_DATA.name}! 👋</p>
              <p className="text-xs text-muted-foreground">{USER_DATA.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <main className="w-full max-w-5xl mx-auto px-6 pb-8">
        <div className="h-[calc(100vh-140px)]">
          <JobChatInterface
            jobs={availableJobs}
            batches={batches}
            onApply={handleApply}
            onPauseBatch={(id) => handleBatchAction(id, 'pause')}
            onResumeBatch={(id) => handleBatchAction(id, 'resume')}
            onRetryBatch={(id) => handleBatchAction(id, 'retry')}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
