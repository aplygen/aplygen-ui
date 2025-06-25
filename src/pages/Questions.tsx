
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, Bot } from "lucide-react";

const Questions = () => {
  const [questions, setQuestions] = React.useState([
    {
      id: 1,
      category: "General",
      question: "Tell me about yourself",
      answer: "I am a passionate full-stack developer with 5+ years of experience...",
      isCommon: true
    },
    {
      id: 2,
      category: "Technical",
      question: "What is your experience with React?",
      answer: "I have been working with React for over 4 years...",
      isCommon: true
    },
    {
      id: 3,
      category: "Behavioral",
      question: "Describe a challenging project you worked on",
      answer: "One of the most challenging projects I worked on was...",
      isCommon: true
    }
  ]);

  const [newQuestion, setNewQuestion] = React.useState({
    category: "",
    question: "",
    answer: ""
  });

  const [preferences, setPreferences] = React.useState({
    workLocation: "Hybrid",
    salaryRange: "$80,000 - $120,000",
    availableStartDate: "2 weeks notice",
    workAuthorization: "US Citizen",
    relocationWillingness: "Open to relocation"
  });

  const { toast } = useToast();

  const categories = ["General", "Technical", "Behavioral", "Company-Specific", "Salary & Benefits"];

  const addQuestion = () => {
    if (newQuestion.question.trim()) {
      const question = {
        id: Date.now(),
        category: newQuestion.category || "General",
        question: newQuestion.question,
        answer: newQuestion.answer,
        isCommon: false
      };
      setQuestions(prev => [...prev, question]);
      setNewQuestion({ category: "", question: "", answer: "" });
      toast({
        title: "Question Added",
        description: "Your custom question has been added successfully.",
      });
    }
  };

  const removeQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    toast({
      title: "Question Removed",
      description: "The question has been deleted.",
    });
  };

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleSaveAll = () => {
    toast({
      title: "All Saved",
      description: "Your questions and preferences have been saved successfully.",
    });
  };

  const generateAIAnswer = (questionId: number) => {
    // Simulate AI generation
    const aiAnswers = [
      "Based on your profile, here's a suggested answer...",
      "Drawing from your experience, you could mention...",
      "Consider highlighting your skills in..."
    ];
    
    const randomAnswer = aiAnswers[Math.floor(Math.random() * aiAnswers.length)];
    updateQuestion(questionId, 'answer', randomAnswer);
    
    toast({
      title: "AI Answer Generated",
      description: "An AI-powered answer has been generated for this question.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Job Application Q&A</h1>
          <p className="text-muted-foreground">Prepare answers for common interview questions and application forms</p>
        </div>

        {/* Job Preferences */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              Job Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workLocation">Preferred Work Location</Label>
                <Input
                  id="workLocation"
                  value={preferences.workLocation}
                  onChange={(e) => setPreferences(prev => ({...prev, workLocation: e.target.value}))}
                  placeholder="e.g., Remote, Hybrid, On-site"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryRange">Expected Salary Range</Label>
                <Input
                  id="salaryRange"
                  value={preferences.salaryRange}
                  onChange={(e) => setPreferences(prev => ({...prev, salaryRange: e.target.value}))}
                  placeholder="e.g., $80,000 - $120,000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Available Start Date</Label>
                <Input
                  id="startDate"
                  value={preferences.availableStartDate}
                  onChange={(e) => setPreferences(prev => ({...prev, availableStartDate: e.target.value}))}
                  placeholder="e.g., Immediately, 2 weeks notice"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workAuth">Work Authorization</Label>
                <Input
                  id="workAuth"
                  value={preferences.workAuthorization}
                  onChange={(e) => setPreferences(prev => ({...prev, workAuthorization: e.target.value}))}
                  placeholder="e.g., US Citizen, H1B, F1 OPT"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="relocation">Relocation Willingness</Label>
              <Input
                id="relocation"
                value={preferences.relocationWillingness}
                onChange={(e) => setPreferences(prev => ({...prev, relocationWillingness: e.target.value}))}
                placeholder="e.g., Open to relocation, Prefer current location"
              />
            </div>
          </CardContent>
        </Card>

        {/* Add New Question */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Custom Question
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newQuestion.category}
                  onChange={(e) => setNewQuestion(prev => ({...prev, category: e.target.value}))}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newQuestion">Question</Label>
                <Input
                  id="newQuestion"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion(prev => ({...prev, question: e.target.value}))}
                  placeholder="Enter your question"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newAnswer">Answer</Label>
              <Textarea
                id="newAnswer"
                value={newQuestion.answer}
                onChange={(e) => setNewQuestion(prev => ({...prev, answer: e.target.value}))}
                rows={3}
                placeholder="Enter your answer"
              />
            </div>
            <Button onClick={addQuestion}>
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </CardContent>
        </Card>

        {/* Questions List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Q&A Database</h2>
            <Button onClick={handleSaveAll}>
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>

          {categories.map(category => {
            const categoryQuestions = questions.filter(q => q.category === category);
            if (categoryQuestions.length === 0) return null;

            return (
              <Card key={category} className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">{category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      ({categoryQuestions.length} questions)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {categoryQuestions.map((q) => (
                    <div key={q.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{q.question}</h4>
                          {q.isCommon && <Badge variant="secondary" className="text-xs">Common</Badge>}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => generateAIAnswer(q.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Bot className="w-4 h-4 mr-2" />
                            AI Assist
                          </Button>
                          {!q.isCommon && (
                            <Button
                              onClick={() => removeQuestion(q.id)}
                              variant="ghost"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Your Answer</Label>
                        <Textarea
                          value={q.answer}
                          onChange={(e) => updateQuestion(q.id, 'answer', e.target.value)}
                          rows={4}
                          placeholder="Enter your answer here..."
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Questions;
