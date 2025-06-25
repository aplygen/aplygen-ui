
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Eye, Plus, Trash2 } from "lucide-react";

const Resume = () => {
  const [resumeData, setResumeData] = React.useState({
    personalInfo: {
      fullName: "Vishwas",
      email: "vishwas@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      linkedin: "linkedin.com/in/vishwas",
      github: "github.com/vishwas"
    },
    summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications.",
    experience: [
      {
        id: 1,
        company: "Tech Corp",
        position: "Senior Full Stack Developer",
        duration: "2022 - Present",
        description: "Led development of multiple web applications using React and Node.js"
      }
    ],
    education: [
      {
        id: 1,
        institution: "University of Technology",
        degree: "Bachelor of Computer Science",
        duration: "2015 - 2019",
        gpa: "3.8/4.0"
      }
    ],
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"]
  });

  const [coverLetters, setCoverLetters] = React.useState([
    {
      id: 1,
      title: "Software Engineer Cover Letter",
      content: "Dear Hiring Manager,\n\nI am writing to express my interest in the Software Engineer position...",
      createdAt: "2024-01-15"
    }
  ]);

  const { toast } = useToast();

  const handleSaveResume = () => {
    toast({
      title: "Resume Saved",
      description: "Your resume has been updated successfully.",
    });
  };

  const handleDownloadResume = () => {
    toast({
      title: "Download Started",
      description: "Your resume is being downloaded as PDF.",
    });
  };

  const handlePreviewResume = () => {
    toast({
      title: "Preview Ready",
      description: "Opening resume preview in new window.",
    });
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: "",
      position: "",
      duration: "",
      description: ""
    };
    setResumeData(prev => ({...prev, experience: [...prev.experience, newExp]}));
  };

  const removeExperience = (id: number) => {
    setResumeData(prev => ({
      ...prev, 
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addCoverLetter = () => {
    const newLetter = {
      id: Date.now(),
      title: "New Cover Letter",
      content: "",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCoverLetters(prev => [...prev, newLetter]);
  };

  const removeCoverLetter = (id: number) => {
    setCoverLetters(prev => prev.filter(letter => letter.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Resume & Cover Letters</h1>
          <p className="text-muted-foreground">Create and manage your professional documents</p>
        </div>

        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="cover-letters">Cover Letters</TabsTrigger>
          </TabsList>

          <TabsContent value="resume" className="space-y-6">
            {/* Resume Actions */}
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <Button onClick={handlePreviewResume} variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button onClick={handleDownloadResume} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button onClick={handleSaveResume}>
                    <FileText className="w-4 h-4 mr-2" />
                    Save Resume
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: {...prev.personalInfo, fullName: e.target.value}
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: {...prev.personalInfo, email: e.target.value}
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: {...prev.personalInfo, phone: e.target.value}
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: {...prev.personalInfo, location: e.target.value}
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={resumeData.summary}
                  onChange={(e) => setResumeData(prev => ({...prev, summary: e.target.value}))}
                  rows={4}
                  placeholder="Write a brief professional summary..."
                />
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Experience</CardTitle>
                  <Button onClick={addExperience} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      <Button
                        onClick={() => removeExperience(exp.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...resumeData.experience];
                            newExp[index] = {...exp, company: e.target.value};
                            setResumeData(prev => ({...prev, experience: newExp}));
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => {
                            const newExp = [...resumeData.experience];
                            newExp[index] = {...exp, position: e.target.value};
                            setResumeData(prev => ({...prev, experience: newExp}));
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={exp.duration}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index] = {...exp, duration: e.target.value};
                          setResumeData(prev => ({...prev, experience: newExp}));
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index] = {...exp, description: e.target.value};
                          setResumeData(prev => ({...prev, experience: newExp}));
                        }}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resumeData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const skill = e.currentTarget.value.trim();
                        if (skill && !resumeData.skills.includes(skill)) {
                          setResumeData(prev => ({...prev, skills: [...prev.skills, skill]}));
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cover-letters" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Cover Letters</h2>
              <Button onClick={addCoverLetter}>
                <Plus className="w-4 h-4 mr-2" />
                New Cover Letter
              </Button>
            </div>

            <div className="grid gap-6">
              {coverLetters.map((letter) => (
                <Card key={letter.id} className="border-primary/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{letter.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">Created: {letter.createdAt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeCoverLetter(letter.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={letter.title}
                        onChange={(e) => {
                          setCoverLetters(prev => prev.map(l => 
                            l.id === letter.id ? {...l, title: e.target.value} : l
                          ));
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content</Label>
                      <Textarea
                        value={letter.content}
                        onChange={(e) => {
                          setCoverLetters(prev => prev.map(l => 
                            l.id === letter.id ? {...l, content: e.target.value} : l
                          ));
                        }}
                        rows={12}
                        placeholder="Write your cover letter here..."
                      />
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
};

export default Resume;
