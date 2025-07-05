
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Plus, 
  Trash2, 
  HelpCircle,
  User,
  Briefcase,
  Target,
  MessageSquare
} from "lucide-react";

interface ContextQuestion {
  id: string;
  question: string;
  answer: string;
  category: 'experience' | 'skills' | 'motivation' | 'challenges';
  isAnswered: boolean;
}

interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter' | 'portfolio' | 'other';
  uploadDate: string;
  size: string;
}

export default function Applications() {
  const { toast } = useToast();
  
  const [applicationContext, setApplicationContext] = React.useState({
    personalStatement: "Passionate full-stack developer with 5+ years of experience in building scalable web applications.",
    careerObjective: "Seeking a senior developer role where I can contribute to innovative projects and mentor junior developers.",
    keyStrengths: ["React", "TypeScript", "Node.js", "System Design", "Team Leadership"],
    preferredRoles: ["Senior Frontend Developer", "Full Stack Engineer", "Tech Lead"],
    salaryExpectation: "$120k - $150k",
    availability: "2 weeks notice"
  });

  const [documents, setDocuments] = React.useState<Document[]>([
    {
      id: "1",
      name: "Resume_2024.pdf",
      type: "resume",
      uploadDate: "2024-01-15",
      size: "245 KB"
    },
    {
      id: "2", 
      name: "Cover_Letter_Template.pdf",
      type: "cover-letter",
      uploadDate: "2024-01-10",
      size: "180 KB"
    }
  ]);

  const [contextQuestions, setContextQuestions] = React.useState<ContextQuestion[]>([
    {
      id: "1",
      question: "Tell me about a time you had to handle a difficult technical challenge",
      answer: "",
      category: "experience",
      isAnswered: false
    },
    {
      id: "2",
      question: "How do you stay updated with the latest technology trends?",
      answer: "I regularly follow tech blogs, attend conferences, and contribute to open-source projects.",
      category: "skills",
      isAnswered: true
    },
    {
      id: "3",
      question: "Why are you interested in this position?",
      answer: "",
      category: "motivation", 
      isAnswered: false
    }
  ]);

  const [newQuestion, setNewQuestion] = React.useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: Document['type']) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        type,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${Math.round(file.size / 1024)} KB`
      };
      setDocuments(prev => [...prev, newDoc]);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleAnswerQuestion = (id: string, answer: string) => {
    setContextQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, answer, isAnswered: answer.trim() !== "" } : q
    ));
  };

  const addCustomQuestion = () => {
    if (newQuestion.trim()) {
      const question: ContextQuestion = {
        id: Date.now().toString(),
        question: newQuestion,
        answer: "",
        category: "experience",
        isAnswered: false
      };
      setContextQuestions(prev => [...prev, question]);
      setNewQuestion("");
      toast({
        title: "Question Added",
        description: "Custom question has been added to your context.",
      });
    }
  };

  const getCategoryIcon = (category: ContextQuestion['category']) => {
    switch (category) {
      case 'experience': return <Briefcase className="h-4 w-4" />;
      case 'skills': return <Target className="h-4 w-4" />;
      case 'motivation': return <MessageSquare className="h-4 w-4" />;
      case 'challenges': return <HelpCircle className="h-4 w-4" />;
      default: return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: ContextQuestion['category']) => {
    switch (category) {
      case 'experience': return "bg-blue-100 text-blue-800 border-blue-300";
      case 'skills': return "bg-green-100 text-green-800 border-green-300";
      case 'motivation': return "bg-purple-100 text-purple-800 border-purple-300";
      case 'challenges': return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const answeredQuestions = contextQuestions.filter(q => q.isAnswered).length;

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Application Context</h1>
          <p className="text-muted-foreground">
            Manage your application materials and prepare context for job applications
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{documents.length}</div>
              <div className="text-sm text-muted-foreground">Documents</div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{answeredQuestions}</div>
              <div className="text-sm text-muted-foreground">Answered</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {contextQuestions.length - answeredQuestions}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {applicationContext.keyStrengths.length}
              </div>
              <div className="text-sm text-muted-foreground">Key Skills</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="context" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="context">Application Context</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="questions">Context Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="context" className="space-y-6">
            {/* Personal Context */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personalStatement">Personal Statement</Label>
                  <Textarea
                    id="personalStatement"
                    value={applicationContext.personalStatement}
                    onChange={(e) => setApplicationContext(prev => ({
                      ...prev, personalStatement: e.target.value
                    }))}
                    rows={3}
                    placeholder="Brief description of your professional background..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="careerObjective">Career Objective</Label>
                  <Textarea
                    id="careerObjective"
                    value={applicationContext.careerObjective}
                    onChange={(e) => setApplicationContext(prev => ({
                      ...prev, careerObjective: e.target.value
                    }))}
                    rows={2}
                    placeholder="What you're looking for in your next role..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                    <Input
                      id="salaryExpectation"
                      value={applicationContext.salaryExpectation}
                      onChange={(e) => setApplicationContext(prev => ({
                        ...prev, salaryExpectation: e.target.value
                      }))}
                      placeholder="e.g. $100k - $120k"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      value={applicationContext.availability}
                      onChange={(e) => setApplicationContext(prev => ({
                        ...prev, availability: e.target.value
                      }))}
                      placeholder="e.g. 2 weeks notice"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Strengths */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Key Strengths & Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {applicationContext.keyStrengths.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer">
                      {skill}
                      <button
                        onClick={() => {
                          setApplicationContext(prev => ({
                            ...prev,
                            keyStrengths: prev.keyStrengths.filter((_, i) => i !== index)
                          }));
                        }}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill or strength"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const skill = e.currentTarget.value.trim();
                        if (skill && !applicationContext.keyStrengths.includes(skill)) {
                          setApplicationContext(prev => ({
                            ...prev,
                            keyStrengths: [...prev.keyStrengths, skill]
                          }));
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Upload Section */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(['resume', 'cover-letter', 'portfolio', 'other'] as const).map((type) => (
                    <div key={type} className="space-y-2">
                      <Label className="capitalize">{type.replace('-', ' ')}</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e, type)}
                          className="hidden"
                          id={`upload-${type}`}
                        />
                        <label htmlFor={`upload-${type}`} className="cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Click to upload</p>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Your Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs capitalize">
                              {doc.type.replace('-', ' ')}
                            </Badge>
                            <span>{doc.uploadDate}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setDocuments(prev => prev.filter(d => d.id !== doc.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            {/* Add Question */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Add Context Question</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a question you often encounter in applications..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                  <Button onClick={addCustomQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <div className="space-y-4">
              {contextQuestions.map((question) => (
                <Card key={question.id} className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`border text-xs ${getCategoryColor(question.category)}`}>
                              {getCategoryIcon(question.category)}
                              <span className="ml-1 capitalize">{question.category}</span>
                            </Badge>
                            {question.isAnswered && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                Answered
                              </Badge>
                            )}
                          </div>
                          <p className="font-medium mb-3">{question.question}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setContextQuestions(prev => prev.filter(q => q.id !== question.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Your Answer</Label>
                        <Textarea
                          value={question.answer}
                          onChange={(e) => handleAnswerQuestion(question.id, e.target.value)}
                          placeholder="Write your answer here..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
