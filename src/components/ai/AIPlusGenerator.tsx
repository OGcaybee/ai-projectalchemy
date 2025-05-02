
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, PlusCircle, Trash2, Code, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { generateProject, downloadProject } from "@/services/aiService";
import { integrateWithGroq } from "@/services/templateService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AIPlusGenerator = () => {
  const { isAuthenticated } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [pages, setPages] = useState<{ name: string; path: string; description: string; }[]>([
    { name: "Home", path: "/", description: "Landing page with overview information" }
  ]);
  const [techStack, setTechStack] = useState("react-tailwind-node-mongo");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const techStackOptions = [
    { value: "react-tailwind-node-mongo", label: "React + Tailwind + Node.js/Express + MongoDB" },
    { value: "html-css-js-flask-sqlite", label: "HTML/CSS/JS + Flask + SQLite" },
    { value: "vue-django-postgres", label: "Vue.js + Django + PostgreSQL" },
    { value: "react-firebase", label: "React + Firebase (Serverless)" }
  ];

  const handleAddPage = () => {
    setPages([...pages, { name: "", path: "", description: "" }]);
  };

  const handlePageChange = (index: number, field: keyof typeof pages[0], value: string) => {
    const updatedPages = [...pages];
    updatedPages[index] = { ...updatedPages[index], [field]: value };
    setPages(updatedPages);
  };

  const handleRemovePage = (index: number) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to generate a project");
      return;
    }

    if (!projectName.trim()) {
      toast.error("Project name is required");
      return;
    }

    if (!projectDescription.trim()) {
      toast.error("Project description is required");
      return;
    }

    // Make sure all pages have names and paths
    const invalidPages = pages.filter(page => !page.name.trim() || !page.path.trim());
    if (invalidPages.length > 0) {
      toast.error("All pages must have names and paths");
      return;
    }

    setIsGenerating(true);

    try {
      toast.info("Generating your project with AI. This may take a few moments...");

      // First, try to generate with Groq AI - this is the fast modern approach
      try {
        // For now we're using a customized template approach while fully integrating with Groq
        const groqTemplate = {
          id: "ai-generated",
          name: projectName,
          description: projectDescription,
          category: "Dashboard",
          image: "",
          techStack: techStackOptions.find(option => option.value === techStack)?.label.split(" + ") || ["React"],
          popularity: 100,
          customTheme: "blue"
        };
        
        const downloadUrl = await integrateWithGroq(groqTemplate, projectDescription);
        setDownloadUrl(downloadUrl);
        toast.success("Project generated successfully!");
      } catch (groqError) {
        console.error("Groq generation failed:", groqError);
        toast.warning("Advanced AI generation failed. Falling back to template-based generation...");
        
        // Fallback to our basic project generator
        const project = await generateProject({
          projectName,
          projectType: "Custom",
          description: projectDescription,
          features: pages.map(page => page.name),
          techStack: techStackOptions.find(option => option.value === techStack)?.label.split(" + ") || ["React"],
          imageUrls: [],
          themeColor: "blue"
        });
        
        const url = await downloadProject(project);
        setDownloadUrl(url);
        toast.success("Project generated successfully with template fallback!");
      }
    } catch (error) {
      console.error("Error generating project:", error);
      toast.error("Failed to generate project. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    
    // Create a download link and click it
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success("Download started!");
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div>
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="E.g. Task Manager App"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="techStack">Technology Stack</Label>
          <Select value={techStack} onValueChange={(value) => setTechStack(value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select technology stack" />
            </SelectTrigger>
            <SelectContent>
              {techStackOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="projectDescription">Project Description</Label>
          <Textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Describe what your project should do in detail"
            className="mt-1 min-h-[100px]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Pages</Label>
            <Button variant="outline" size="sm" onClick={handleAddPage}>
              <PlusCircle className="w-4 h-4 mr-2" /> Add Page
            </Button>
          </div>

          {pages.map((page, index) => (
            <div key={index} className="p-4 border rounded-md bg-secondary/10">
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <Label htmlFor={`page-name-${index}`} className="text-xs">Page Name</Label>
                    <Input
                      id={`page-name-${index}`}
                      value={page.name}
                      onChange={(e) => handlePageChange(index, "name", e.target.value)}
                      placeholder="E.g. Home"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`page-path-${index}`} className="text-xs">Path</Label>
                    <Input
                      id={`page-path-${index}`}
                      value={page.path}
                      onChange={(e) => handlePageChange(index, "path", e.target.value)}
                      placeholder="E.g. /"
                      className="mt-1"
                    />
                  </div>
                </div>
                {index !== 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePage(index)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor={`page-desc-${index}`} className="text-xs">Description</Label>
                <Textarea
                  id={`page-desc-${index}`}
                  value={page.description}
                  onChange={(e) => handlePageChange(index, "description", e.target.value)}
                  placeholder="Describe what this page should contain"
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isGenerating || !projectName || !projectDescription}
            className="w-full bg-brand-purple hover:bg-brand-purple/90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Code className="mr-2 h-4 w-4" />
                Generate Project
              </>
            )}
          </Button>
          
          {downloadUrl && (
            <Button 
              variant="outline" 
              onClick={handleDownload} 
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Generated Project
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPlusGenerator;
