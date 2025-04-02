
import { toast } from "sonner";
import JSZip from "jszip";

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

// Hugging Face API
const HUGGING_FACE_API_KEY = "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";
const HUGGING_FACE_API_ENDPOINT = "https://api-inference.huggingface.co/models/codellama/CodeLlama-34b-Instruct-hf";

const createProjectZip = async (project: GeneratedProject): Promise<string> => {
  try {
    const zip = new JSZip();
    
    // Create README file
    zip.file("README.md", `# ${project.name}\n\n${project.description}\n\nGenerated with Thynk AI`);
    
    // Create a src folder structure
    const srcFolder = zip.folder("src");
    const assetsFolder = zip.folder("assets");
    
    // If we have frontend code, create the appropriate files
    if (project.codeSnippets.frontend) {
      // Try to determine if it's HTML or JS based on content
      if (project.codeSnippets.frontend.includes("<!DOCTYPE html>") || 
          project.codeSnippets.frontend.includes("<html")) {
        zip.file("index.html", project.codeSnippets.frontend);
      } else if (project.techStack.includes("React")) {
        srcFolder?.file("App.jsx", project.codeSnippets.frontend);
        
        // Create a basic index.html for React apps
        zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.name}</title>
</head>
<body>
  <div id="root"></div>
  <script src="src/index.js" type="module"></script>
</body>
</html>`);
        
        // Create a simple index.js
        srcFolder?.file("index.js", `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`);
      } else {
        // Assume it's JavaScript
        srcFolder?.file("main.js", project.codeSnippets.frontend);
      }
    }
    
    // If we have backend code, create appropriate files
    if (project.codeSnippets.backend) {
      // For Node.js
      if (project.techStack.includes("Node.js") || 
          project.techStack.includes("Express")) {
        zip.file("server.js", project.codeSnippets.backend);
      } else {
        // For other backends
        zip.file("backend/index.js", project.codeSnippets.backend);
      }
    }
    
    // Create package.json with appropriate dependencies
    const dependencies: Record<string, string> = {};
    project.techStack.forEach(tech => {
      switch (tech) {
        case "React":
          dependencies["react"] = "^18.2.0";
          dependencies["react-dom"] = "^18.2.0";
          break;
        case "Express":
        case "Node.js":
          dependencies["express"] = "^4.18.2";
          break;
        case "MongoDB":
          dependencies["mongodb"] = "^5.0.0";
          dependencies["mongoose"] = "^7.0.0";
          break;
        case "Tailwind CSS":
          dependencies["tailwindcss"] = "^3.3.0";
          break;
      }
    });
    
    zip.file("package.json", JSON.stringify({
      name: project.name.toLowerCase().replace(/\s+/g, '-'),
      version: "1.0.0",
      description: project.description,
      main: project.techStack.includes("Express") ? "server.js" : "index.js",
      scripts: {
        start: project.techStack.includes("Express") ? "node server.js" : "serve"
      },
      dependencies,
      devDependencies: {
        "serve": "^14.0.0"
      }
    }, null, 2));
    
    // Create basic CSS if needed
    if (!project.codeSnippets.frontend.includes("<style>") && 
        !project.codeSnippets.frontend.includes("import './styles.css'")) {
      zip.file("src/styles.css", `/* Generated styles for ${project.name} */
body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  color: #333;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

header {
  background-color: #f8f9fa;
  padding: 20px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
  margin-top: 40px;
}
`);
    }
    
    // Generate the ZIP file
    const content = await zip.generateAsync({ type: "blob" });
    return URL.createObjectURL(content);
  } catch (error) {
    console.error("Error creating project ZIP:", error);
    throw new Error("Failed to create downloadable project file");
  }
};

export const generateProject = async (requirements: ProjectRequirement): Promise<GeneratedProject> => {
  try {
    toast.info("Starting project generation with CodeLlama...");
    
    // Create a detailed and specific prompt for the AI
    const prompt = `
    <INST>
    You are a professional web developer tasked with creating a complete ${requirements.projectType} application. Your task is to generate real, production-ready code based on the following requirements.

    Project Description: ${requirements.description}
    
    Required Features:
    ${requirements.features.map(feature => `- ${feature}`).join('\n')}
    
    Technology Stack:
    ${requirements.techStack.map(tech => `- ${tech}`).join('\n')}
    
    I need you to generate:
    1. ACTUAL FUNCTIONAL FRONTEND CODE (not pseudocode) implementing the main user interface of this application. 
       This code should use ${requirements.techStack.filter(t => t.includes('React') || t.includes('Vue') || t.includes('Angular') || t.includes('HTML') || t.includes('CSS')).join(', ')}.
    
    2. ACTUAL FUNCTIONAL BACKEND CODE (not pseudocode) implementing the server, API endpoints, and database interactions.
       This code should use ${requirements.techStack.filter(t => t.includes('Node') || t.includes('Express') || t.includes('MongoDB') || t.includes('SQL') || t.includes('Python') || t.includes('Django') || t.includes('Flask')).join(', ')}.
    
    3. A file structure showing the organization of both frontend and backend components.
    
    IMPORTANT GUIDELINES:
    - Do NOT generate pseudocode or placeholder code. Create COMPLETE, WORKING code snippets.
    - Include proper imports, error handling, and comments.
    - For frontend: Include styling, state management, and component structure.
    - For backend: Include routes, controllers, database models, and connection setup.
    - Limit your code to the most important files that demonstrate the core functionality.
    - For each code section, specify the file path where it should be placed.
    
    Format your response as follows:
    
    ## Project Overview
    [Brief description of the generated project]
    
    ## Frontend Code
    \`\`\`jsx
    // src/components/MainComponent.jsx
    [Your actual frontend code here]
    \`\`\`
    
    ## Backend Code
    \`\`\`js
    // server/index.js
    [Your actual backend code here]
    \`\`\`
    
    ## Project Structure
    \`\`\`
    frontend/
      ├── src/
      │   ├── components/
      │   ├── pages/
      │   ├── ...
    backend/
      ├── controllers/
      ├── models/
      ├── ...
    \`\`\`
    </INST>
    `;

    console.log("Sending request to CodeLlama API with prompt:", prompt);
    console.log("API Endpoint:", HUGGING_FACE_API_ENDPOINT);
    console.log("API Key (first 5 chars):", HUGGING_FACE_API_KEY.substring(0, 5) + "...");

    // Call HuggingFace API
    const response = await fetch(HUGGING_FACE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 4000,
          temperature: 0.2,
          top_p: 0.95,
          do_sample: true
        }
      })
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      
      // If model is busy, generate a fallback response
      if (errorData.error && errorData.error.includes("Model too busy")) {
        console.log("Model too busy, generating fallback response");
        return generateFallbackProject(requirements);
      }
      
      throw new Error(errorData.error || "Failed to generate project with AI");
    }

    const data = await response.json();
    const aiResponse = typeof data === 'string' ? data : (data.generated_text || '');

    console.log("Received AI response of length:", aiResponse.length);

    // Extract code snippets from the AI response with improved parsing
    let frontendCode = "// Generated Frontend Code\n";
    let backendCode = "// Generated Backend Code\n";
    let projectName = requirements.projectType + " Application";
    let projectDescription = requirements.description;
    
    try {
      // Try to extract overview
      const overviewMatch = aiResponse.match(/## Project Overview\s*([^#]+)/);
      if (overviewMatch && overviewMatch[1]) {
        projectDescription = overviewMatch[1].trim();
      }
      
      // Try to extract frontend code
      const frontendMatch = aiResponse.match(/## Frontend Code\s*```(?:jsx?|tsx?|react|html)([\s\S]*?)```/);
      if (frontendMatch && frontendMatch[1]) {
        frontendCode = frontendMatch[1].trim();
      } else {
        // Alternative pattern
        const altFrontendMatch = aiResponse.match(/```(?:jsx?|tsx?|react|html)([\s\S]*?)```/);
        if (altFrontendMatch && altFrontendMatch[1]) {
          frontendCode = altFrontendMatch[1].trim();
        }
      }
      
      // Try to extract backend code
      const backendMatch = aiResponse.match(/## Backend Code\s*```(?:js|ts|node|express|backend)([\s\S]*?)```/);
      if (backendMatch && backendMatch[1]) {
        backendCode = backendMatch[1].trim();
      } else {
        // Look for second code block if specific tagging failed
        const codeBlocks = aiResponse.match(/```[\s\S]*?```/g);
        if (codeBlocks && codeBlocks.length >= 2) {
          const secondBlock = codeBlocks[1].replace(/```[\s\S]*?/, '').replace(/```/, '').trim();
          if (!frontendCode.includes(secondBlock)) {
            backendCode = secondBlock;
          }
        }
      }
      
      // Extract project structure
      const structureMatch = aiResponse.match(/## Project Structure\s*```([\s\S]*?)```/);
      let frontendStructure: string[] = [];
      let backendStructure: string[] = [];
      
      if (structureMatch && structureMatch[1]) {
        const structureText = structureMatch[1].trim();
        const frontendPart = structureText.match(/frontend\/[\s\S]*?(?=backend\/|$)/);
        const backendPart = structureText.match(/backend\/[\s\S]*/);
        
        if (frontendPart) {
          frontendStructure = frontendPart[0]
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        }
        
        if (backendPart) {
          backendStructure = backendPart[0]
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        }
      }
      
      // If structure extraction failed, generate based on tech stack
      if (frontendStructure.length === 0) {
        frontendStructure = generateFrontendStructure(requirements.techStack);
      }
      
      if (backendStructure.length === 0) {
        backendStructure = generateBackendStructure(requirements.techStack);
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      // Fallback to basic structure
      frontendCode = aiResponse;
      backendCode = "// Backend code generation failed, please try again";
    }

    const generatedProject: GeneratedProject = {
      id: `proj-${Date.now()}`,
      name: requirements.projectType || "Generated Project",
      description: projectDescription,
      codeSnippets: {
        frontend: frontendCode,
        backend: backendCode
      },
      techStack: [...requirements.techStack],
      structure: {
        frontend: generateFrontendStructure(requirements.techStack),
        backend: generateBackendStructure(requirements.techStack)
      }
    };
    
    const downloadUrl = await createProjectZip(generatedProject);
    toast.success("Project generated successfully!");
    return { ...generatedProject, downloadUrl };
    
  } catch (error) {
    console.error("Error generating project:", error);
    toast.error("Failed to generate project. Please try again later.");
    throw error;
  }
};

// Function to generate a fallback project when the API fails
const generateFallbackProject = (requirements: ProjectRequirement): GeneratedProject => {
  console.log("Generating fallback project");
  
  const projectName = requirements.projectType || "Generated Project";
  let frontendCode = "";
  let backendCode = "";
  
  // Basic HTML/CSS/JS template
  if (requirements.techStack.includes("HTML") || 
      requirements.techStack.includes("CSS") || 
      requirements.techStack.includes("JavaScript")) {
    frontendCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    header {
      background-color: #f5f5f5;
      padding: 1rem;
      margin-bottom: 2rem;
      border-radius: 5px;
    }
    .main-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    .card {
      background: white;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      padding: 20px;
    }
    footer {
      margin-top: 2rem;
      text-align: center;
      padding: 1rem;
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <header>
    <h1>${projectName}</h1>
    <p>${requirements.description || "A project generated with Thynk AI"}</p>
  </header>
  
  <div class="main-content">
    ${requirements.features.map(feature => `
    <div class="card">
      <h2>${feature}</h2>
      <p>Implementation for ${feature}</p>
    </div>
    `).join('')}
  </div>
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} ${projectName} - Generated with Thynk AI</p>
  </footer>

  <script>
    // Basic JavaScript functionality
    document.addEventListener('DOMContentLoaded', () => {
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        card.addEventListener('click', () => {
          card.style.transform = 'scale(1.05)';
          setTimeout(() => {
            card.style.transform = 'scale(1)';
          }, 200);
        });
      });
      
      console.log('${projectName} initialized');
    });
  </script>
</body>
</html>`;
  }
  
  // Basic React template
  if (requirements.techStack.includes("React")) {
    frontendCode = `import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeFeature, setActiveFeature] = useState(null);
  
  const features = [
    ${requirements.features.map(feature => `{
      id: ${requirements.features.indexOf(feature) + 1},
      name: "${feature}",
      description: "Implementation for ${feature}"
    }`).join(',\n    ')}
  ];
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>${projectName}</h1>
        <p>${requirements.description || "A project generated with Thynk AI"}</p>
      </header>
      
      <div className="features-container">
        {features.map(feature => (
          <div 
            key={feature.id}
            className={\`feature-card \${activeFeature === feature.id ? 'active' : ''}\`}
            onClick={() => setActiveFeature(feature.id)}
          >
            <h2>{feature.name}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} ${projectName} - Generated with Thynk AI</p>
      </footer>
    </div>
  );
}

export default App;`;
  }
  
  // Basic Express backend
  if (requirements.techStack.includes("Node.js") || 
      requirements.techStack.includes("Express")) {
    backendCode = `const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to ${projectName} API' });
});

${requirements.features.map(feature => `
// ${feature} endpoint
app.get('/api/${feature.toLowerCase().replace(/\s+/g, '-')}', (req, res) => {
  res.json({ 
    feature: '${feature}',
    status: 'implemented',
    data: { /* sample data for ${feature} */ }
  });
});`).join('\n')}

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;
  }
  
  // Prepare and return the generated project
  const generatedProject: GeneratedProject = {
    id: `proj-${Date.now()}`,
    name: projectName,
    description: requirements.description || `A ${projectName} generated with Thynk AI`,
    codeSnippets: {
      frontend: frontendCode,
      backend: backendCode
    },
    techStack: [...requirements.techStack],
    structure: {
      frontend: generateFrontendStructure(requirements.techStack),
      backend: generateBackendStructure(requirements.techStack)
    }
  };
  
  // Create the downloadable ZIP and attach it to the project
  createProjectZip(generatedProject)
    .then(url => {
      generatedProject.downloadUrl = url;
    })
    .catch(err => console.error("Failed to create fallback ZIP:", err));
  
  toast.success("Project generated with fallback template!");
  return generatedProject;
};

const generateFrontendStructure = (techStack: string[]): string[] => {
  const structure = [
    "src/",
    "src/components/",
    "src/pages/",
    "src/hooks/",
    "src/utils/",
    "public/",
    "package.json"
  ];

  if (techStack.includes("React")) {
    structure.push("src/App.jsx", "src/index.jsx");
  }

  if (techStack.includes("TypeScript")) {
    structure.push("tsconfig.json");
    // Convert any .jsx to .tsx
    const tsxStructure = structure.map(path => 
      path.endsWith(".jsx") ? path.replace(".jsx", ".tsx") : path
    );
    return tsxStructure;
  }

  if (techStack.includes("Next.js")) {
    structure.push(
      "pages/",
      "pages/api/",
      "pages/_app.jsx",
      "pages/index.jsx",
      "next.config.js"
    );
  }

  if (techStack.includes("Tailwind CSS")) {
    structure.push("tailwind.config.js", "postcss.config.js");
  }

  return structure;
};

const generateBackendStructure = (techStack: string[]): string[] => {
  const structure = [
    "server.js",
    "routes/",
    "controllers/",
    "models/",
    "middleware/",
    "package.json"
  ];

  if (techStack.includes("Express")) {
    structure.push("routes/api.js");
  }

  if (techStack.includes("MongoDB")) {
    structure.push("models/db.js");
  }

  if (techStack.includes("PostgreSQL")) {
    structure.push("models/db.js", "migrations/");
  }

  if (techStack.includes("GraphQL")) {
    structure.push("schema/", "resolvers/");
  }

  return structure;
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
    case 'portfolio':
      return ['Project showcase', 'About section', 'Skills display', 'Contact form', 'Resume download'];
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
