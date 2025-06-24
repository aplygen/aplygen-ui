
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Mail, Phone, Calendar, Edit } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: "Vishwas Kumar",
    title: "Senior Software Engineer",
    email: "vishwas@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies.",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Software Engineer",
        duration: "2022 - Present",
        description: "Leading a team of 5 developers building scalable web applications."
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        duration: "2020 - 2022",
        description: "Developed and maintained multiple client projects using modern web technologies."
      }
    ]
  });
  
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Profile Header */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="text-2xl">
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="text-2xl font-bold"
                        />
                        <Input
                          value={profile.title}
                          onChange={(e) => setProfile({...profile, title: e.target.value})}
                          className="text-lg"
                        />
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                        <p className="text-lg text-gray-600">{profile.title}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {profile.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {profile.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Member since 2020
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">About</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows={4}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-700">{profile.bio}</p>
            )}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {skill}
                </Badge>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm">
                  + Add Skill
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-blue-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm">
                  + Add Experience
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
