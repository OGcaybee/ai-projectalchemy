
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

const DEEPSEEK_API_KEY = "sk-d112f3873fb54cfe86f3d53bc6fd677e";
const DEEPSEEK_API_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";

const createProjectZip = async (project: GeneratedProject): Promise<string> => {
  try {
    // In a real implementation, this would create a ZIP file with the project structure
    // For now, we're creating a Blob with the project data
    const projectData = JSON.stringify({
      name: project.name,
      description: project.description,
      frontend: project.codeSnippets.frontend,
      backend: project.codeSnippets.backend,
      structure: project.structure
    }, null, 2);

    return URL.createObjectURL(new Blob(
      [projectData], 
      { type: 'application/json' }
    ));
  } catch (error) {
    console.error("Error creating project ZIP:", error);
    throw new Error("Failed to create downloadable project file");
  }
};

export const generateProject = async (requirements: ProjectRequirement): Promise<GeneratedProject> => {
  try {
    // Create a prompt for the AI based on requirements
    const prompt = `
    Create a ${requirements.projectType} application that ${requirements.description}.
    
    Features to include:
    ${requirements.features.map(feature => `- ${feature}`).join('\n')}
    
    Tech stack to use:
    ${requirements.techStack.map(tech => `- ${tech}`).join('\n')}
    
    The response should include:
    1. A detailed frontend code snippet demonstrating the main component
    2. A detailed backend code snippet for the server setup and main functionality
    3. A list of files and folders for both frontend and backend structure
    
    DO NOT RETURN SAMPLE OR PLACEHOLDER CODE. Generate actual, functional code based on the requirements.
    `;

    // Call DeepSeek API
    const response = await fetch(DEEPSEEK_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-coder",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate project with AI");
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "";

    // Extract code snippets from the AI response
    // This is a simple extraction - in a real app, you might need more sophisticated parsing
    let frontendCode = "// Generated Frontend Code\n";
    let backendCode = "// Generated Backend Code\n";
    
    try {
      // Try to extract code blocks from markdown
      const frontendMatch = aiResponse.match(/```(?:jsx?|tsx?|react|html)([\s\S]*?)```/);
      const backendMatch = aiResponse.match(/```(?:js|node|express|backend)([\s\S]*?)```/);
      
      if (frontendMatch && frontendMatch[1]) {
        frontendCode = frontendMatch[1].trim();
      }
      
      if (backendMatch && backendMatch[1]) {
        backendCode = backendMatch[1].trim();
      }
      
      // If specific blocks aren't found, try to split the response
      if (!frontendMatch && !backendMatch) {
        const blocks = aiResponse.match(/```[\s\S]*?```/g);
        if (blocks && blocks.length >= 2) {
          frontendCode = blocks[0].replace(/```[\s\S]*?/, '').replace(/```$/, '').trim();
          backendCode = blocks[1].replace(/```[\s\S]*?/, '').replace(/```$/, '').trim();
        }
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      // Fallback to using the raw response
      const parts = aiResponse.split("Backend Code:");
      if (parts.length > 1) {
        frontendCode = parts[0].replace("Frontend Code:", "").trim();
        backendCode = parts[1].trim();
      }
    }

    // Generate project structure based on tech stack
    const frontendStructure = generateFrontendStructure(requirements.techStack);
    const backendStructure = generateBackendStructure(requirements.techStack);

    const generatedProject: GeneratedProject = {
      id: `proj-${Date.now()}`,
      name: `${requirements.projectType} Application`,
      description: `A ${requirements.projectType} application that ${requirements.description}`,
      codeSnippets: {
        frontend: frontendCode,
        backend: backendCode
      },
      techStack: [...requirements.techStack],
      structure: {
        frontend: frontendStructure,
        backend: backendStructure
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

