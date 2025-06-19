
export interface JobBatch {
  id: string;
  name: string;
  createdAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'paused' | 'failed';
  jobs: BatchJob[];
  category: string;
  successRate: number;
  totalApplications: number;
}

export interface BatchJob {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: 'preparing' | 'applying' | 'completed' | 'failed';
  appliedAt?: Date;
  failureReason?: string;
  applicationUrl?: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
}
