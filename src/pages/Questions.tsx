
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, BookOpen, Clock, Star, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  type: 'technical' | 'behavioral' | 'situational';
  tags: string[];
  estimatedTime: number;
  isFavorite: boolean;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "React",
    difficulty: "Medium",
    question: "Explain the difference between useState and useEffect hooks in React",
    type: "technical",
    tags: ["hooks", "react", "fundamentals"],
    estimatedTime: 5,
    isFavorite: true,
  },
  {
    id: "q2", 
    category: "JavaScript",
    difficulty: "Hard",
    question: "How does JavaScript's event loop work?",
    type: "technical",
    tags: ["async", "javascript", "fundamentals"],
    estimatedTime: 8,
    isFavorite: false,
  },
  {
    id: "q3",
    category: "Behavioral",
    difficulty: "Easy",
    question: "Tell me about a time you had to work with a difficult team member",
    type: "behavioral",
    tags: ["teamwork", "communication"],
    estimatedTime: 3,
    isFavorite: false,
  },
  {
    id: "q4",
    category: "System Design",
    difficulty: "Hard",
    question: "How would you design a URL shortener like bit.ly?",
    type: "technical",
    tags: ["system-design", "scalability"],
    estimatedTime: 15,
    isFavorite: true,
  },
];

const getDifficultyColor = (difficulty: Question['difficulty']) => {
  switch (difficulty) {
    case 'Easy':
      return "bg-green-100 text-green-800 border-green-300";
    case 'Medium':
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case 'Hard':
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const Questions = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [difficultyFilter, setDifficultyFilter] = React.useState("all");
  const [selectedQuestion, setSelectedQuestion] = React.useState<Question | null>(null);
  const [answer, setAnswer] = React.useState("");
  const { toast } = useToast();

  const filteredQuestions = React.useMemo(() => {
    return MOCK_QUESTIONS.filter(q => {
      const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           q.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter === "all" || q.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === "all" || q.difficulty === difficultyFilter;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, categoryFilter, difficultyFilter]);

  const handleSaveAnswer = () => {
    if (!selectedQuestion || !answer.trim()) return;
    
    toast({
      title: "Answer Saved",
      description: "Your practice answer has been saved successfully.",
    });
    
    setAnswer("");
    setSelectedQuestion(null);
  };

  const categories = [...new Set(MOCK_QUESTIONS.map(q => q.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Interview Preparation</h1>
          <p className="text-muted-foreground">Practice common interview questions and improve your responses</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{MOCK_QUESTIONS.length}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {MOCK_QUESTIONS.filter(q => q.difficulty === 'Easy').length}
              </div>
              <div className="text-sm text-muted-foreground">Easy</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {MOCK_QUESTIONS.filter(q => q.difficulty === 'Medium').length}
              </div>
              <div className="text-sm text-muted-foreground">Medium</div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {MOCK_QUESTIONS.filter(q => q.difficulty === 'Hard').length}
              </div>
              <div className="text-sm text-muted-foreground">Hard</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions, categories, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Questions List */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Questions ({filteredQuestions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    onClick={() => setSelectedQuestion(question)}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {question.category}
                          </Badge>
                          <Badge className={`text-xs border ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </Badge>
                          {question.isFavorite && (
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-sm font-medium line-clamp-2">{question.question}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {question.estimatedTime} min
                          <span>•</span>
                          <span className="capitalize">{question.type}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
                
                {filteredQuestions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No questions found matching your criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Practice Area */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Practice Area</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedQuestion ? (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedQuestion.category}</Badge>
                      <Badge className={`border ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                        {selectedQuestion.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {selectedQuestion.estimatedTime} min
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="font-medium">{selectedQuestion.question}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {selectedQuestion.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Answer</label>
                    <Textarea
                      placeholder="Type your answer here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      rows={8}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleSaveAnswer} className="flex-1">
                      Save Answer
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedQuestion(null)}
                    >
                      Back to List
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a question from the list to start practicing</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Questions;
