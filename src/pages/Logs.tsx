
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Filter, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplicationLog {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  appliedAt: Date;
  status: 'preparing' | 'applying' | 'completed' | 'failed' | 'interview' | 'offer' | 'rejected';
  batchName: string;
  failureReason?: string;
  notes?: string;
}

const MOCK_APPLICATION_LOGS: ApplicationLog[] = [
  {
    id: "app-1",
    jobTitle: "Frontend Engineer",
    company: "InnovateX",
    location: "Remote",
    salary: "$120,000",
    appliedAt: new Date("2025-06-20"),
    status: "interview",
    batchName: "Batch #1 - Frontend Jobs",
  },
  {
    id: "app-2",
    jobTitle: "React Developer",
    company: "Acme Corp.",
    location: "New York, NY",
    salary: "$110,000",
    appliedAt: new Date("2025-06-20"),
    status: "completed",
    batchName: "Batch #1 - Frontend Jobs",
  },
  {
    id: "app-3",
    jobTitle: "UI Engineer",
    company: "BrightTech",
    location: "Remote",
    salary: "$125,000",
    appliedAt: new Date("2025-06-19"),
    status: "rejected",
    batchName: "Batch #2 - UI/UX Jobs",
  },
  {
    id: "app-4",
    jobTitle: "Product Designer",
    company: "DesignLoose",
    location: "NYC",
    salary: "$105,000",
    appliedAt: new Date("2025-06-19"),
    status: "failed",
    batchName: "Batch #2 - UI/UX Jobs",
    failureReason: "Application submission failed",
  },
  {
    id: "app-5",
    jobTitle: "Fullstack Engineer",
    company: "CodeBase",
    location: "Remote",
    salary: "$130,000",
    appliedAt: new Date("2025-06-18"),
    status: "offer",
    batchName: "Batch #3 - Full Stack Jobs",
  },
];

const getStatusColor = (status: ApplicationLog['status']) => {
  switch (status) {
    case 'preparing':
      return "bg-gray-100 text-gray-800 border-gray-300";
    case 'applying':
      return "bg-blue-100 text-blue-800 border-blue-300";
    case 'completed':
      return "bg-green-100 text-green-800 border-green-300";
    case 'failed':
      return "bg-red-100 text-red-800 border-red-300";
    case 'interview':
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case 'offer':
      return "bg-purple-100 text-purple-800 border-purple-300";
    case 'rejected':
      return "bg-orange-100 text-orange-800 border-orange-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const Logs = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [applications, setApplications] = React.useState<ApplicationLog[]>(MOCK_APPLICATION_LOGS);

  const filteredApplications = React.useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const statusCounts = React.useMemo(() => {
    return applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [applications]);

  const handleExportLogs = () => {
    // Mock export functionality
    console.log("Exporting application logs...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-6 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Application Logs</h1>
          <p className="text-muted-foreground">Track your job application history and progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{applications.length}</div>
              <div className="text-sm text-muted-foreground">Total Applied</div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{statusCounts.completed || 0}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.interview || 0}</div>
              <div className="text-sm text-muted-foreground">Interview</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{statusCounts.offer || 0}</div>
              <div className="text-sm text-muted-foreground">Offers</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{statusCounts.rejected || 0}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{statusCounts.failed || 0}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.applying || 0}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Actions
              </div>
              <Button onClick={handleExportLogs} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="applying">Applying</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Application History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Details</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{app.jobTitle}</div>
                          {app.failureReason && (
                            <div className="text-xs text-red-600">{app.failureReason}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{app.company}</TableCell>
                      <TableCell>{app.location}</TableCell>
                      <TableCell>{app.salary}</TableCell>
                      <TableCell>{app.appliedAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs border", getStatusColor(app.status))}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{app.batchName}</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredApplications.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No applications found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Logs;
