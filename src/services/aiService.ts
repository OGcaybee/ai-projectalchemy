import { toast } from "sonner";

export type ProjectRequirement = {
  projectType: string;
  description: string;
  features: string[];
  techStack: string[];
};

export type GeneratedProject = {
  id: string;
  name: string;
  description: string;
  codeSnippets: {
    frontend: string;
    backend: string;
  };
  techStack: string[];
  structure: {
    frontend: string[];
    backend: string[];
  };
  downloadUrl?: string;
};

const DEEPSEEK_API_KEY = "YOUR_DEEPSEEK_API_KEY";
const DEEPSEEK_API_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";

const createProjectZip = async (project: GeneratedProject): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return URL.createObjectURL(new Blob(
    [JSON.stringify(project, null, 2)], 
    { type: 'application/json' }
  ));
};

export const generateProject = async (requirements: ProjectRequirement): Promise<GeneratedProject> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const generatedProject: GeneratedProject = {
      id: `proj-${Date.now()}`,
      name: `${requirements.projectType} Application`,
      description: `A ${requirements.projectType} application that ${requirements.description}`,
      codeSnippets: {
        frontend: `
// Example React component for ${requirements.projectType}
import React, { useState, useEffect } from 'react';

const ${requirements.projectType.replace(/\s/g, '')}App = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch data from the API
    fetchData();
  }, []);
  
  const fetchData = async () => {
    // Implementation would go here
    console.log('Fetching data...');
  };
  
  return (
    <div className="app-container">
      <h1>${requirements.projectType} Application</h1>
      {/* Your components would go here */}
    </div>
  );
};

export default ${requirements.projectType.replace(/\s/g, '')}App;
      `,
        backend: `
// Example Express.js backend for ${requirements.projectType}
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Example route
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is sample data for your ${requirements.projectType} application' });
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
      `
      },
      techStack: [...requirements.techStack],
      structure: {
        frontend: [
          "src/",
          "src/components/",
          "src/pages/",
          "src/hooks/",
          "src/utils/",
          "public/",
          "package.json"
        ],
        backend: [
          "server.js",
          "routes/",
          "controllers/",
          "models/",
          "middleware/",
          "package.json"
        ]
      }
    };
    
    const downloadUrl = await createProjectZip(generatedProject);
    return { ...generatedProject, downloadUrl };
    
  } catch (error) {
    console.error("Error generating project:", error);
    toast.error("Failed to generate project. Please try again later.");
    throw error;
  }
};

export const saveProject = async (project: GeneratedProject): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  toast.success("Project saved successfully!");
  
  console.log("Project saved:", project);
};

export const getRecommendedFeatures = async (projectType: string): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  switch (projectType.toLowerCase()) {
    case 'e-commerce':
      return ['Product catalog', 'Shopping cart', 'Checkout', 'User accounts', 'Payment processing'];
    case 'blog':
      return ['Article management', 'Comments', 'Categories', 'Tags', 'Search'];
    case 'dashboard':
      return ['Analytics charts', 'Data tables', 'Filtering', 'User management', 'Notifications'];
    case 'social media':
      return ['User profiles', 'Posts/Timeline', 'Messaging', 'Notifications', 'Friend connections'];
    default:
      return ['Authentication', 'User profiles', 'Data storage', 'API integration', 'Responsive design'];
  }
};

export const downloadProject = async (project: GeneratedProject): Promise<string> => {
  if (project.downloadUrl) {
    return project.downloadUrl;
  }
  
  return await createProjectZip(project);
};
