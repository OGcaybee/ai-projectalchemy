
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Code, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedContent {
  html: string;
  css: string;
  js: string;
}

const AIPlusGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const { toast } = useToast();

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description of what you want to create.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Use the Transformers.js library to generate content locally
      // This is a placeholder - in a real app, you'd implement proper AI generation
      setTimeout(() => {
        // Mock generated content
        setGeneratedContent({
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>AI Generated Project</h1>
    <p>This is a sample project based on your prompt: "${prompt}"</p>
    <div class="content">
      <!-- Content would be generated based on the prompt -->
      <p>Your custom content would appear here.</p>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
          css: `body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  color: #333;
  background-color: #fff;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.content {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}`,
          js: `// Simple interactive script
document.addEventListener('DOMContentLoaded', () => {
  console.log('AI-generated project loaded');
  
  // Add a click event to the content div
  const content = document.querySelector('.content');
  if (content) {
    content.addEventListener('click', () => {
      alert('You clicked on the content area!');
    });
  }
});`,
        });
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const downloadProject = () => {
    if (!generatedContent) return;
    
    // In a real implementation, you would create a zip file with the generated content
    toast({
      title: "Download started",
      description: "Your project files are being prepared for download.",
    });
    
    // This is a placeholder for the actual download functionality
    console.log("Downloading project:", generatedContent);
  };

  const renderPreview = () => {
    if (!generatedContent) return null;
    
    return (
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-bold">Generated Project Preview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-medium mb-2 flex items-center">
              <Code className="mr-2 h-4 w-4" /> HTML
            </h4>
            <div className="bg-secondary p-4 rounded-md overflow-x-auto">
              <pre className="text-xs">{generatedContent.html}</pre>
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium mb-2 flex items-center">
              <Code className="mr-2 h-4 w-4" /> CSS
            </h4>
            <div className="bg-secondary p-4 rounded-md overflow-x-auto">
              <pre className="text-xs">{generatedContent.css}</pre>
            </div>
          </Card>
        </div>
        
        <Card className="p-4">
          <h4 className="font-medium mb-2 flex items-center">
            <Code className="mr-2 h-4 w-4" /> JavaScript
          </h4>
          <div className="bg-secondary p-4 rounded-md overflow-x-auto">
            <pre className="text-xs">{generatedContent.js}</pre>
          </div>
        </Card>
        
        <div className="flex justify-center mt-6">
          <Button onClick={downloadProject} className="flex items-center">
            <Download className="mr-2 h-4 w-4" /> Download Project
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI+ Generator</h2>
      <p className="text-muted-foreground mb-6">
        Describe what you want to create, and our AI will generate a complete project for you without using templates.
      </p>
      
      <div className="space-y-4">
        <Textarea 
          placeholder="Describe the project you want to create in detail. For example: 'Create a personal portfolio website with a dark theme, responsive design, and sections for about me, skills, projects, and contact form.'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[150px] p-4"
        />
        
        <Button 
          onClick={generateContent}
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
            </>
          ) : "Generate Project"}
        </Button>
      </div>
      
      {renderPreview()}
    </div>
  );
};

export default AIPlusGenerator;
