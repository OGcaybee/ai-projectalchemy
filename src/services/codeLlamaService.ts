
import { toast } from "sonner";

export type ProjectRequirement = {
  projectType: string;
  projectName: string;
  description: string;
  features: string[];
  techStack: string[];
  imageUrls?: string[];
  themeColor?: string;
};

export type GeneratedProject = {
  id: string;
  name: string;
  description: string;
  codeSnippets: {
    frontend: string;
    backend?: string;
  };
  techStack: string[];
  structure: {
    frontend: string[];
    backend?: string[];
  };
  downloadUrl?: string;
  previewImageUrl?: string;
};

// CodeLlama API details (using the Hugging Face API)
const HUGGING_FACE_API_KEY = "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";
const HUGGING_FACE_API_ENDPOINT = "https://api-inference.huggingface.co/models/codellama/CodeLlama-34b-Instruct-hf";

// Generate an index.html file with proper structure and theme
const generateHtmlFile = (projectName: string, themeColor: string = "#7c3aed") => {
  // Convert theme name to color code if needed
  const colorMap: Record<string, string> = {
    "default": "#7c3aed", // Purple
    "green": "#059669",
    "blue": "#2563eb",
    "red": "#dc2626",
    "orange": "#ea580c",
    "pink": "#db2777"
  };
  
  const primaryColor = colorMap[themeColor] || themeColor;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    :root {
      --primary-color: ${primaryColor};
      --secondary-color: ${getSecondaryColor(primaryColor)};
      --accent-color: ${getAccentColor(primaryColor)};
    }
    .btn-primary {
      background-color: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
    }
    .btn-primary:hover {
      background-color: var(--secondary-color);
    }
    .header {
      background-color: var(--primary-color);
      color: white;
    }
  </style>
</head>
<body>
  <div id="app"></div>
  <script src="./main.js" type="module"></script>
</body>
</html>`;
};

// Helper function to get secondary color (darker shade)
function getSecondaryColor(primaryColor: string): string {
  // Simple darkening logic - this would be better with a proper color library
  if (primaryColor.startsWith('#')) {
    // Darken by reducing RGB values by about 15%
    const r = parseInt(primaryColor.slice(1, 3), 16);
    const g = parseInt(primaryColor.slice(3, 5), 16);
    const b = parseInt(primaryColor.slice(5, 7), 16);
    
    const darkerR = Math.max(0, Math.floor(r * 0.85)).toString(16).padStart(2, '0');
    const darkerG = Math.max(0, Math.floor(g * 0.85)).toString(16).padStart(2, '0');
    const darkerB = Math.max(0, Math.floor(b * 0.85)).toString(16).padStart(2, '0');
    
    return `#${darkerR}${darkerG}${darkerB}`;
  }
  return primaryColor;
}

// Helper function to get accent color (lighter shade)
function getAccentColor(primaryColor: string): string {
  // Simple lightening logic
  if (primaryColor.startsWith('#')) {
    // Lighten by increasing RGB values by about 20%
    const r = parseInt(primaryColor.slice(1, 3), 16);
    const g = parseInt(primaryColor.slice(3, 5), 16);
    const b = parseInt(primaryColor.slice(5, 7), 16);
    
    const lighterR = Math.min(255, Math.floor(r * 1.4)).toString(16).padStart(2, '0');
    const lighterG = Math.min(255, Math.floor(g * 1.4)).toString(16).padStart(2, '0');
    const lighterB = Math.min(255, Math.floor(b * 1.4)).toString(16).padStart(2, '0');
    
    return `#${lighterR}${lighterG}${lighterB}`;
  }
  return primaryColor;
}

// Helper to create a main.js file that uses the generated code
const generateMainJsFile = (frontendCode: string, projectName: string): string => {
  // Extract any imports needed
  const importMatches = frontendCode.match(/import [^;]+;/g) || [];
  const imports = importMatches.join('\n');
  
  // Clean up the code to work as a standalone app
  const cleanedCode = frontendCode
    .replace(/import [^;]+;/g, '')
    .replace(/export default [^{]+{/, 'const App = {')
    .trim();
  
  return `// Generated main.js for ${projectName}
${imports}

// Mount app to DOM
document.addEventListener('DOMContentLoaded', () => {
  ${cleanedCode}
  
  // Create a root element and render app
  const appContainer = document.getElementById('app');
  const appElement = document.createElement('div');
  appElement.innerHTML = \`
    <div class="min-h-screen bg-gray-50">
      <header class="header shadow-md">
        <div class="container mx-auto px-4 py-6">
          <h1 class="text-2xl font-bold">${projectName}</h1>
        </div>
      </header>
      <main class="container mx-auto px-4 py-8">
        <div id="content" class="bg-white rounded-lg shadow p-6">
          <!-- Generated content will be placed here -->
        </div>
      </main>
    </div>
  \`;
  
  appContainer.appendChild(appElement);
  
  // Execute any initialization code
  try {
    if (typeof init === 'function') {
      init();
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
});
`;
};

// Generate a README.md file for the project
const generateReadmeFile = (project: GeneratedProject): string => {
  return `# ${project.name}

${project.description}

## Generated Project by Customized Template Builder

This project was generated using the CodeLlama AI model through the Customized Template Builder.

## Tech Stack

${project.techStack.map(tech => `- ${tech}`).join('\n')}

## Getting Started

1. Extract the ZIP file
2. Open index.html in your browser
3. To modify, edit main.js file

## Project Structure

\`\`\`
${project.structure.frontend.join('\n')}
${project.structure.backend ? '\n' + project.structure.backend.join('\n') : ''}
\`\`\`
`;
};

// Generate a package.json file for the project
const generatePackageJsonFile = (project: GeneratedProject): string => {
  const dependencies: Record<string, string> = {};
  
  // Add dependencies based on tech stack
  if (project.techStack.includes('React')) dependencies['react'] = '^18.2.0';
  if (project.techStack.includes('Vue')) dependencies['vue'] = '^3.3.4';
  if (project.techStack.includes('Tailwind CSS')) dependencies['tailwindcss'] = '^3.3.3';
  if (project.techStack.includes('TypeScript')) dependencies['typescript'] = '^5.0.2';
  
  return JSON.stringify({
    name: project.name.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    description: project.description,
    main: 'index.html',
    scripts: {
      start: 'serve .',
      dev: 'vite',
      build: 'vite build'
    },
    dependencies,
    devDependencies: {
      vite: '^5.0.0',
      serve: '^14.0.0'
    }
  }, null, 2);
};

// Create a zip file from the generated project files
export const createZipFile = async (project: GeneratedProject): Promise<Blob> => {
  try {
    // Generate the content for each file
    const htmlFile = generateHtmlFile(project.name, project.themeColor);
    const mainJsFile = generateMainJsFile(project.codeSnippets.frontend, project.name);
    const readmeFile = generateReadmeFile(project);
    const packageJsonFile = generatePackageJsonFile(project);
    
    // Create a structure representing the files in our project
    const files = {
      'index.html': htmlFile,
      'main.js': mainJsFile,
      'README.md': readmeFile,
      'package.json': packageJsonFile
    };
    
    // In a real implementation, we'd use JSZip or similar
    // For now, we'll create a JSON representation of the project
    const projectJson = JSON.stringify({
      files: Object.entries(files).map(([path, content]) => ({
        path,
        content,
        type: path.endsWith('.js') ? 'application/javascript' : 
              path.endsWith('.html') ? 'text/html' : 
              path.endsWith('.md') ? 'text/markdown' : 
              path.endsWith('.json') ? 'application/json' : 
              'text/plain'
      })),
      metadata: {
        name: project.name,
        description: project.description,
        techStack: project.techStack
      }
    }, null, 2);

    // Create a blob that represents our project
    return new Blob([projectJson], { type: 'application/zip' });
  } catch (error) {
    console.error("Error creating project ZIP:", error);
    throw new Error("Failed to create downloadable project file");
  }
};

// Generate a project using the CodeLlama API
export const generateProject = async (requirements: ProjectRequirement): Promise<GeneratedProject> => {
  try {
    toast.info("Starting project generation with CodeLlama...");
    
    // Create a detailed and specific prompt for the AI
    const prompt = `
    <INST>
    You are a professional web developer tasked with creating a ${requirements.projectType} application named "${requirements.projectName}". Your task is to generate real, production-ready code based on the following requirements.

    Project Description: ${requirements.description || requirements.projectType + " application"}
    
    ${requirements.features && requirements.features.length > 0 
      ? `Required Features:\n${requirements.features.map(feature => `- ${feature}`).join('\n')}`
      : ''}
    
    Technology Stack:
    ${requirements.techStack.map(tech => `- ${tech}`).join('\n')}
    
    ${requirements.themeColor 
      ? `Theme Color: ${requirements.themeColor}`
      : ''}
    
    ${requirements.imageUrls && requirements.imageUrls.length > 0
      ? `Include these images in the design:\n${requirements.imageUrls.map(url => `- ${url}`).join('\n')}`
      : ''}
    
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

    // Call HuggingFace API with the prompt
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate project with AI");
    }

    const data = await response.json();
    let aiResponse = "";
    
    // Handle different response formats from Hugging Face
    if (typeof data === 'string') {
      aiResponse = data;
    } else if (data.generated_text) {
      aiResponse = data.generated_text;
    } else if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      aiResponse = data[0].generated_text;
    } else {
      console.error("Unexpected API response format:", data);
      throw new Error("Received invalid response format from AI service");
    }

    // Extract the code from the AI response (looking for code blocks)
    const codeBlockMatch = aiResponse.match(/```(?:html|js|javascript)([\s\S]*?)```/);
    let generatedCode = codeBlockMatch 
      ? codeBlockMatch[1].trim() 
      : aiResponse.replace(/```/g, '').trim();

    // Create a basic structure if no code was generated
    if (!generatedCode || generatedCode.length < 50) {
      generatedCode = `
// Simple ${requirements.projectType} application
function init() {
  const contentElement = document.getElementById('content');
  
  // Create basic interface
  contentElement.innerHTML = \`
    <div class="text-center">
      <h2 class="text-xl font-bold mb-4">${requirements.projectName}</h2>
      <p class="mb-4">${requirements.description || "Welcome to your new application"}</p>
      <button class="btn-primary">Get Started</button>
    </div>
  \`;
  
  // Add event listeners
  const button = contentElement.querySelector('button');
  if (button) {
    button.addEventListener('click', () => {
      alert('Button clicked!');
    });
  }
}
      `;
    }

    // Generate a preview image based on project type
    const previewImageUrl = getPreviewImageForType(requirements.projectType, requirements.themeColor);

    // Create the final project object
    const generatedProject: GeneratedProject = {
      id: `proj-${Date.now()}`,
      name: requirements.projectName,
      description: requirements.description || `A ${requirements.projectType} application`,
      codeSnippets: {
        frontend: generatedCode
      },
      techStack: [...requirements.techStack],
      structure: {
        frontend: [
          "index.html",
          "main.js",
          "README.md",
          "package.json"
        ]
      },
      previewImageUrl,
      themeColor: requirements.themeColor
    };
    
    // Create the downloadable zip file
    const zipBlob = await createZipFile(generatedProject);
    generatedProject.downloadUrl = URL.createObjectURL(zipBlob);
    
    toast.success("Project generated successfully!");
    return generatedProject;
  } catch (error) {
    console.error("Error generating project:", error);
    toast.error("Failed to generate project. Please try again later.");
    throw error;
  }
};

// Helper function to get a preview image based on project type
function getPreviewImageForType(projectType: string, themeColor?: string): string {
  const type = projectType.toLowerCase();
  
  if (type.includes('dashboard')) return "/lovable-uploads/dashboard-template.png";
  if (type.includes('ecommerce') || type.includes('shop')) return "/lovable-uploads/ecommerce-template.png";
  if (type.includes('portfolio')) return "/lovable-uploads/portfolio-template.png";
  if (type.includes('blog')) return "/lovable-uploads/blog-template.png";
  if (type.includes('saas')) return "/lovable-uploads/saas-template.png";
  if (type.includes('mobile')) return "/lovable-uploads/mobile-app-template.png";
  if (type.includes('landing')) return "/lovable-uploads/landing-page-template.png";
  if (type.includes('admin')) return "/lovable-uploads/admin-dashboard.png";
  
  // Default image
  return "/lovable-uploads/4a7b9440-eda6-4273-bebc-4a08e6ae4c26.png";
}

// Simulate downloading the project
export const downloadProject = async (project: GeneratedProject): Promise<string> => {
  if (project.downloadUrl) {
    return project.downloadUrl;
  }
  
  const zipBlob = await createZipFile(project);
  return URL.createObjectURL(zipBlob);
};
