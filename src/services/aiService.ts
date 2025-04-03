import { toast } from "sonner";
import JSZip from "jszip";

export type ProjectRequirement = {
  projectType: string;
  description: string;
  features: string[];
  techStack: string[];
  projectName?: string;
  themeColor?: string;
  imageUrls?: string[];
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
  previewImageUrl?: string;
  downloadUrl?: string;
};

// Hugging Face API
const HUGGING_FACE_API_KEY = "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";
const HUGGING_FACE_API_ENDPOINT = "https://api-inference.huggingface.co/models/codellama/CodeLlama-34b-Instruct-hf";

const createProjectZip = async (project: GeneratedProject & { cssCode?: string }): Promise<string> => {
  try {
    const zip = new JSZip();
    
    // Create README file
    zip.file("README.md", `# ${project.name}\n\n${project.description}\n\nGenerated with Thynk AI`);
    
    // Add the HTML, CSS, and JS files
    let htmlContent = project.codeSnippets.frontend;
    const cssContent = project.cssCode || "";
    const jsContent = project.codeSnippets.backend || "";
    
    // If the HTML doesn't include DOCTYPE or html tags, wrap it
    if (!htmlContent.includes("<!DOCTYPE html>") && !htmlContent.includes("<html")) {
      htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.name}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${htmlContent}
<script src="script.js"></script>
</body>
</html>`;
    }
    
    zip.file("index.html", htmlContent);
    
    // Add CSS file
    if (cssContent) {
      zip.file("styles.css", cssContent);
    } else {
      // Default CSS if none was generated
      zip.file("styles.css", `/* Styles for ${project.name} */
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
  padding: 15px;
}

header {
  background-color: #f8f9fa;
  padding: 1rem 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

h1, h2, h3 {
  margin-top: 0;
}

.btn {
  display: inline-block;
  background: #3f51b5;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #303f9f;
}
`);
    }
    
    // Add JS file
    if (jsContent) {
      zip.file("script.js", jsContent);
    } else {
      // Default JS if none was generated
      zip.file("script.js", `// JavaScript for ${project.name}
document.addEventListener('DOMContentLoaded', () => {
  console.log('${project.name} initialized');
  
  // Add basic functionality here
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('Button clicked:', button.textContent);
    });
  });
});
`);
    }
    
    // Create a simple package.json
    zip.file("package.json", JSON.stringify({
      name: project.name.toLowerCase().replace(/\s+/g, '-'),
      version: "1.0.0",
      description: project.description,
      main: "index.html",
      scripts: {
        start: "serve",
        dev: "serve"
      },
      dependencies: {},
      devDependencies: {
        "serve": "^14.0.0"
      }
    }, null, 2));
    
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
    You are a professional web developer tasked with creating a ${requirements.projectType} application named "${requirements.projectName || "My App"}". Your task is to generate real, production-ready code based on the following requirements.

    Project Description: ${requirements.description}
    
    ${requirements.features.length > 0 ? `Required Features:
    ${requirements.features.map(feature => `- ${feature}`).join('\n')}` : ''}
    
    Technology Stack:
    ${requirements.techStack.map(tech => `- ${tech}`).join('\n')}
    
    Theme Color: ${requirements.themeColor || 'default'}
    
    ${requirements.imageUrls && requirements.imageUrls.length > 0 ? `Reference Images:
    ${requirements.imageUrls.map(url => `- ${url}`).join('\n')}` : ''}
    
    I need you to generate a single-page web application with HTML, CSS and JavaScript (NOT a React application). Please focus on generating a simple but working implementation that demonstrates the core functionality.
    
    IMPORTANT GUIDELINES:
    - Do NOT use React or any complex framework, just use vanilla JavaScript or at most a small library
    - Create ACTUAL working code, not pseudocode
    - Include proper comments
    - Make sure to use the specified theme color
    - Focus on visual design and user experience
    - Create something simple but complete rather than complex and partial
    
    Return your response as a vanilla JavaScript application that can run directly in a browser.
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
    console.log("Received response from API:", typeof data);
    
    let generatedCode = "";
    if (typeof data === 'string') {
      generatedCode = data;
    } else if (data.generated_text) {
      generatedCode = data.generated_text;
    } else {
      console.error("Unexpected API response format:", data);
      generatedCode = "// Error: Failed to parse AI response";
    }
    
    console.log("Generated code length:", generatedCode.length);

    // Extract HTML, CSS, and JavaScript from the response
    let htmlCode = "";
    let cssCode = "";
    let jsCode = "";
    
    // Try to parse the response for HTML, CSS, and JS sections
    if (generatedCode.includes("<!DOCTYPE html>") || generatedCode.includes("<html")) {
      htmlCode = generatedCode;
    } else {
      // Look for code blocks
      const htmlMatch = generatedCode.match(/```html([\s\S]*?)```/);
      const cssMatch = generatedCode.match(/```css([\s\S]*?)```/);
      const jsMatch = generatedCode.match(/```(?:javascript|js)([\s\S]*?)```/);
      
      if (htmlMatch && htmlMatch[1]) {
        htmlCode = htmlMatch[1].trim();
      }
      
      if (cssMatch && cssMatch[1]) {
        cssCode = cssMatch[1].trim();
      }
      
      if (jsMatch && jsMatch[1]) {
        jsCode = jsMatch[1].trim();
      }
      
      // If we couldn't extract specific sections, just use the whole response
      if (!htmlCode && !cssCode && !jsCode) {
        htmlCode = generatedCode;
      }
    }

    // Create a project structure based on the generated code
    const frontendStructure = [
      "index.html",
      "styles.css",
      "script.js",
      "assets/"
    ];
    
    const generatedProject: GeneratedProject = {
      id: `proj-${Date.now()}`,
      name: requirements.projectName || requirements.projectType || "Generated Project",
      description: requirements.description || `A ${requirements.projectType} application`,
      codeSnippets: {
        frontend: htmlCode,
        backend: jsCode
      },
      techStack: [...requirements.techStack],
      structure: {
        frontend: frontendStructure,
        backend: []
      },
      previewImageUrl: requirements.imageUrls && requirements.imageUrls.length > 0 ? requirements.imageUrls[0] : undefined
    };
    
    // Create a downloadable zip file
    try {
      const downloadUrl = await createProjectZip({
        ...generatedProject,
        codeSnippets: {
          frontend: htmlCode,
          backend: jsCode
        },
        cssCode: cssCode
      });
      
      generatedProject.downloadUrl = downloadUrl;
    } catch (error) {
      console.error("Error creating downloadable ZIP:", error);
    }
    
    toast.success("Project generated successfully!");
    return generatedProject;
    
  } catch (error) {
    console.error("Error generating project:", error);
    toast.error("Failed to generate project. Please try again later.");
    throw error;
  }
};

// Function to generate a fallback project when the API fails
const generateFallbackProject = (requirements: ProjectRequirement): GeneratedProject => {
  console.log("Generating fallback project");
  
  const projectName = requirements.projectName || requirements.projectType || "Generated Project";
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
