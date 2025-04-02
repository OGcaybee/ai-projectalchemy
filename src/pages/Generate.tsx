import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getTemplateById, Template } from "@/services/templateService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, ArrowLeft, Palette, FileCode, Lock } from "lucide-react";
import SubscriptionPrompt from "@/components/SubscriptionPrompt";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectCustomizationForm from "@/components/ai/ProjectCustomizationForm";
import { GeneratedProject } from "@/services/codeLlamaService";

const Generate = () => {
  const { isAuthenticated, user, incrementProjectCount, checkRemainingGenerations } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const templateIdFromQuery = queryParams.get('template');
  
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateIdFromQuery || "");
  const [projectName, setProjectName] = useState("");
  const [projectTheme, setProjectTheme] = useState<string>("default");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [mockProjectStructure, setMockProjectStructure] = useState({
    frontend: [] as string[],
    backend: [] as string[]
  });
  const [generatedProject, setGeneratedProject] = useState<GeneratedProject | null>(null);

  const themeOptions = [
    { value: "default", label: "Default (Purple/Blue)", color: "#7c3aed" },
    { value: "green", label: "Nature Green", color: "#059669" },
    { value: "blue", label: "Ocean Blue", color: "#2563eb" },
    { value: "red", label: "Ruby Red", color: "#dc2626" },
    { value: "orange", label: "Sunset Orange", color: "#ea580c" },
    { value: "pink", label: "Rose Pink", color: "#db2777" },
  ];

  useEffect(() => {
    const loadTemplate = async () => {
      if (selectedTemplateId) {
        setIsLoading(true);
        try {
          const template = await getTemplateById(selectedTemplateId);
          if (template) {
            setSelectedTemplate(template);
            setProjectName(template.name);
            generateMockStructure(template);
          }
        } catch (error) {
          console.error("Error loading template:", error);
          toast.error("Failed to load template");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTemplate();
  }, [selectedTemplateId]);

  const generateMockStructure = (template: Template) => {
    const frontendStructure = [
      "src/",
      "├── components/",
      "│   ├── layout/",
      "│   ├── ui/",
      "│   └── features/",
      "├── pages/",
      "├── hooks/",
      "├── styles/",
      "└── utils/"
    ];

    const backendStructure = [
      "server/",
      "├── controllers/",
      "├── models/",
      "├── routes/",
      "├── middleware/",
      "└── utils/"
    ];

    if (template.category === "Dashboard") {
      frontendStructure.push("├── dashboard/");
      frontendStructure.push("│   ├── charts/");
      frontendStructure.push("│   └── widgets/");
    } else if (template.category === "E-commerce") {
      frontendStructure.push("├── store/");
      frontendStructure.push("│   ├── products/");
      frontendStructure.push("│   ├── cart/");
      frontendStructure.push("│   └── checkout/");
      backendStructure.push("├── payment/");
    } else if (template.category === "Blog") {
      frontendStructure.push("├── blog/");
      frontendStructure.push("│   ├── posts/");
      frontendStructure.push("│   └── comments/");
      backendStructure.push("├── content/");
    }

    setMockProjectStructure({
      frontend: frontendStructure,
      backend: backendStructure
    });
  };

  const handleGenerateProject = () => {
    if (!isAuthenticated) {
      toast.error("Please login to generate a project");
      navigate("/login");
      return;
    }

    setShowSubscriptionPrompt(true);
  };

  const handleDownloadProject = async () => {
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }

    if (selectedTemplate.githubUrl) {
      window.open(selectedTemplate.githubUrl, '_blank', 'noopener,noreferrer');
      toast.success(`Redirecting to ${selectedTemplate.name} repository`);
    } else {
      toast.error("Repository not available for this template");
    }
  };

  const handleProjectGenerated = (project: GeneratedProject) => {
    setGeneratedProject(project);
  };

  const mockCodeSnippets = {
    frontend: `// Example React component for ${projectName || "your project"}
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

export default function ${projectName.replace(/\s+/g, '') || "MainComponent"}() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to ${projectName || "your project"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(item => (
          <div key={item.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2">{item.description}</p>
            <Button className="mt-4">View Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    backend: `// Example Express server for ${projectName || "your project"}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/${projectName.toLowerCase().replace(/\s+/g, '_') || "app_database"}')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/data', async (req, res) => {
  try {
    const data = [
      { id: 1, title: 'Item 1', description: 'Description for item 1' },
      { id: 2, title: 'Item 2', description: 'Description for item 2' },
      { id: 3, title: 'Item 3', description: 'Description for item 3' },
    ];
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Project Generator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generate your next project with AI or use existing templates
          </p>
          
          {isAuthenticated && user && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
              {user.subscriptionTier === 'free' ? (
                <>
                  <span className="mr-2">Free Plan:</span> 
                  <span className="font-semibold">{user.points} generations remaining</span>
                </>
              ) : (
                <>
                  <span className="mr-2">{user.subscriptionTier === 'pro' ? 'Pro' : 'Team'} Plan:</span> 
                  <span className="font-semibold">Unlimited generations</span>
                </>
              )}
            </div>
          )}
        </div>

        <Tabs defaultValue="ai">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="ai" className="flex-1">AI Generator</TabsTrigger>
            <TabsTrigger value="custom-builder" className="flex-1">Customized Template Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI Code Generator</CardTitle>
                <CardDescription>
                  Generate a complete project with AI based on your description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="ai-project-name">Project Name</Label>
                  <Input
                    id="ai-project-name"
                    placeholder="Enter a name for your AI-generated project"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="ai-project-description">Project Description</Label>
                  <textarea
                    id="ai-project-description"
                    className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    placeholder="Describe your project in detail. Include features, pages, functionality, and design preferences."
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frontend Framework</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <input type="radio" name="frontend" id="react" defaultChecked />
                        <Label htmlFor="react" className="cursor-pointer">React</Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <input type="radio" name="frontend" id="vue" disabled />
                        <Label htmlFor="vue" className="cursor-pointer opacity-50">Vue (Coming Soon)</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Backend Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <input type="radio" name="backend" id="rest" defaultChecked />
                        <Label htmlFor="rest" className="cursor-pointer">REST API</Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <input type="radio" name="backend" id="graphql" disabled />
                        <Label htmlFor="graphql" className="cursor-pointer opacity-50">GraphQL (Coming Soon)</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="border-2 border-orange-500 bg-orange-50 mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 text-orange-500 mr-2" />
                        <span className="font-medium text-orange-700">Premium Feature</span>
                      </div>
                      <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium">
                        Pro Plan
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      AI-powered code generation is available exclusively for Pro and Team subscribers.
                      Upgrade your plan to unlock unlimited AI-generated projects.
                    </p>
                    <Button 
                      onClick={() => setShowSubscriptionPrompt(true)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      Upgrade to Pro
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleGenerateProject}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Generate Project
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="custom-builder">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customized Template Builder</CardTitle>
                  <CardDescription>
                    Quickly customize and download pre-built templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries({
                      dashboard: "Dashboard",
                      ecommerce: "E-commerce Store",
                      blog: "Content Blog",
                      portfolio: "Portfolio Site",
                      landingPage: "Landing Page",
                      adminDashboard: "Admin Dashboard"
                    }).map(([key, name]) => (
                      <div 
                        key={key}
                        onClick={() => {
                          setSelectedTemplateId(key);
                          toast.success(`${name} template selected`);
                        }}
                        className="relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-md overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                        <img 
                          src={`../../public/template-icons/${key}-template.png`} 
                          alt={name}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="p-3 border-t">
                          <h3 className="font-medium">{name}</h3>
                          <p className="text-xs text-gray-500">Click to select</p>
                        </div>
                        {selectedTemplateId === key && (
                          <div className="absolute top-2 right-2 bg-brand-purple text-white text-xs px-2 py-1 rounded-full z-20">
                            Selected
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {selectedTemplateId && (
                    <>
                      <div className="border-t border-gray-200 pt-6 mt-6">
                        <h3 className="text-lg font-medium mb-4">Customize Your Template</h3>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="custom-project-name">Project Name</Label>
                            <Input
                              id="custom-project-name"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                              placeholder="Enter a name for your project"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Theme Color</Label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                              {themeOptions.map((theme) => (
                                <div 
                                  key={theme.value}
                                  className={`p-2 border rounded-md cursor-pointer transition-all ${
                                    projectTheme === theme.value ? 'border-2 border-brand-purple' : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                  onClick={() => setProjectTheme(theme.value)}
                                >
                                  <div 
                                    className="w-full h-4 rounded-full mb-2"
                                    style={{ backgroundColor: theme.color }}
                                  ></div>
                                  <p className="text-xs text-center truncate">{theme.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          onClick={handleDownloadProject}
                          disabled={isDownloading}
                          className="bg-brand-purple hover:bg-brand-purple/90"
                        >
                          <Download className="h-4 w-4 mr-2" /> 
                          View Repository
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <SubscriptionPrompt 
        open={showSubscriptionPrompt} 
        onClose={() => setShowSubscriptionPrompt(false)} 
      />
    </div>
  );
};

export default Generate;
