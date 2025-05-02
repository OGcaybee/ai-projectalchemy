
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
import { integrateWithGroq, TECH_STACK_OPTIONS, generateCustomProject } from "@/services/templateService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const AIPlusGenerator = () => {
  const { isAuthenticated } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [pages, setPages] = useState<{ name: string; path: string; description: string; }[]>([
    { name: "Home", path: "/", description: "Landing page with overview information" }
  ]);
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>(["react", "tailwind"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("blue");

  const themeOptions = [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" }
  ];

  const availableTechStacks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "alpine", label: "Alpine.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "node", label: "Node.js" }
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

  const toggleTechStack = (value: string) => {
    setSelectedTechStacks(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
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
      toast.info("Generating your project. This may take a few moments...");

      try {
        // Use the local template generation with selected tech stacks
        const downloadUrl = await generateCustomProject(
          projectName, 
          projectDescription,
          selectedTechStacks,
          selectedTheme
        );
        
        setDownloadUrl(downloadUrl);
        toast.success("Project generated successfully!");
      } catch (error) {
        console.error("Custom generation failed:", error);
        toast.warning("Custom generation failed. Falling back to template-based generation...");
        
        // Fallback to our basic project generator
        const project = await generateProject({
          projectName,
          projectType: "Custom",
          description: projectDescription,
          features: pages.map(page => page.name),
          techStack: selectedTechStacks,
          imageUrls: [],
          themeColor: selectedTheme
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
          <Label htmlFor="theme">Theme Color</Label>
          <Select value={selectedTheme} onValueChange={(value) => setSelectedTheme(value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select theme color" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="techStack">Technology Stack</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {availableTechStacks.map((tech) => (
              <div key={tech.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={tech.value}
                  checked={selectedTechStacks.includes(tech.value)}
                  onCheckedChange={() => toggleTechStack(tech.value)}
                />
                <label 
                  htmlFor={tech.value}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {tech.label}
                </label>
              </div>
            ))}
          </div>
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
