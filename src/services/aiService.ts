
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
};

// This simulates an API call to an AI service
export const generateProject = async (requirements: ProjectRequirement): Promise<GeneratedProject> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // In a real app, this would be a call to DeepSeek AI or similar service
  // For now, we return mock data based on the requirements
  
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
  
  return generatedProject;
};

export const saveProject = async (project: GeneratedProject): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  toast.success("Project saved successfully!");
  
  // In a real app, this would save the project to a database
  console.log("Project saved:", project);
};

export const getRecommendedFeatures = async (projectType: string): Promise<string[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return different features based on project type
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
