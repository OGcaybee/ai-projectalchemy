
import { templateThumbnails, getTemplateThumbnail } from "@/assets/template-thumbnails";
import JSZip from "jszip";

export type Template = {
  id: string;
  name: string;
  description: string;
  category: 'Dashboard' | 'E-commerce' | 'Portfolio' | 'Blog' | 'SaaS' | 'Mobile App' | 'Landing Page' | 'Other' | 'Admin Dashboard';
  image: string;
  techStack: string[];
  popularity: number;
  author?: string;
  githubUrl?: string;
  customTheme?: string;
};

// Updated template data with real-world projects
const templates: Template[] = [
  {
    id: "template-1",
    name: "TailAdmin Dashboard",
    description: "Free Tailwind CSS admin dashboard with dark mode and charts",
    category: "Dashboard",
    image: templateThumbnails.dashboard,
    techStack: ["HTML", "Tailwind CSS", "Alpine.js", "Chart.js"],
    popularity: 95,
    author: "TailAdmin",
    githubUrl: "https://github.com/TailAdmin/free-tailwind-dashboard-template"
  },
  {
    id: "template-2",
    name: "E-commerce Store",
    description: "Modern e-commerce platform with Stripe integration",
    category: "E-commerce",
    image: templateThumbnails.ecommerce,
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    popularity: 92,
    author: "adrianhajdin",
    githubUrl: "https://github.com/adrianhajdin/ecommerce_sanity_stripe"
  },
  {
    id: "template-3",
    name: "Developer Portfolio",
    description: "Clean and minimal developer portfolio with projects showcase",
    category: "Portfolio",
    image: templateThumbnails.portfolio,
    techStack: ["React", "Next.js", "Tailwind CSS"],
    popularity: 88,
    author: "soumyajit4419",
    githubUrl: "https://github.com/soumyajit4419/Portfolio"
  },
  {
    id: "template-4",
    name: "NextJS Blog",
    description: "SEO-friendly blog built with Next.js and Tailwind CSS",
    category: "Blog",
    image: templateThumbnails.blog,
    techStack: ["Next.js", "Tailwind CSS", "MDX"],
    popularity: 85,
    author: "timlrx",
    githubUrl: "https://github.com/timlrx/tailwind-nextjs-starter-blog"
  },
  {
    id: "template-5",
    name: "Open SaaS",
    description: "Open-source SaaS template with authentication and payments",
    category: "SaaS",
    image: templateThumbnails.saas,
    techStack: ["React", "Next.js", "Tailwind CSS", "Prisma"],
    popularity: 82,
    author: "steven-tey",
    githubUrl: "https://github.com/steven-tey/precedent"
  },
  {
    id: "template-6",
    name: "React Native Starter",
    description: "Cross-platform mobile app template with ready-to-use screens",
    category: "Mobile App",
    image: templateThumbnails.mobileApp,
    techStack: ["React Native", "Expo", "TypeScript"],
    popularity: 78,
    author: "obytes",
    githubUrl: "https://github.com/obytes/react-native-template-obytes"
  },
  {
    id: "template-7",
    name: "Gatsby Blog",
    description: "Fast and SEO-optimized blog built with Gatsby",
    category: "Blog",
    image: templateThumbnails.blog,
    techStack: ["Gatsby", "React", "GraphQL", "Markdown"],
    popularity: 76,
    author: "gatsbyjs",
    githubUrl: "https://github.com/gatsbyjs/gatsby-starter-blog"
  },
  {
    id: "template-8",
    name: "Tremor Dashboard",
    description: "Modern analytics dashboard with Tremor components",
    category: "Dashboard",
    image: templateThumbnails.dashboard,
    techStack: ["React", "Next.js", "Tailwind CSS", "Tremor"],
    popularity: 74,
    author: "tremorlabs",
    githubUrl: "https://github.com/tremorlabs/tremor"
  },
  {
    id: "template-9",
    name: "Creative Portfolio",
    description: "Stunning portfolio for designers with beautiful animations",
    category: "Portfolio",
    image: templateThumbnails.analyticsApp,
    techStack: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    popularity: 72,
    author: "bchiang7",
    githubUrl: "https://github.com/bchiang7/v4"
  },
  {
    id: "template-10",
    name: "Landing Page",
    description: "Modern landing page template for startups and products",
    category: "Landing Page",
    image: templateThumbnails.landingPage,
    techStack: ["HTML", "Tailwind CSS", "Alpine.js"],
    popularity: 70,
    author: "cruip",
    githubUrl: "https://github.com/cruip/tailwind-landing-page-template"
  },
  {
    id: "template-11",
    name: "Admin Dashboard Pro",
    description: "Feature-rich admin panel with dark mode and multiple layouts",
    category: "Admin Dashboard",
    image: templateThumbnails.ecommerceMobile,
    techStack: ["React", "Redux", "Material UI", "Chart.js"],
    popularity: 68,
    author: "themesberg",
    githubUrl: "https://github.com/themesberg/material-tailwind-dashboard-react"
  },
  {
    id: "template-12",
    name: "Photography Portfolio",
    description: "Minimalist portfolio for photographers with gallery view",
    category: "Portfolio",
    image: templateThumbnails.photography,
    techStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    popularity: 65,
    author: "leerob",
    githubUrl: "https://github.com/leerob/leerob.io"
  }
];

// API methods
export const getAllTemplates = async (): Promise<Template[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return templates;
};

export const getTemplatesByCategory = async (category: string): Promise<Template[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return templates.filter(template => 
    category === 'All' ? true : template.category === category
  );
};

export const getTemplateById = async (id: string): Promise<Template | undefined> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 200));
  return templates.find(template => template.id === id);
};

// Define the tech stack options
export const TECH_STACK_OPTIONS = [
  "react", 
  "vue", 
  "alpine", 
  "typescript", 
  "tailwind", 
  "node"
];

// Improved download function that fetches actual files from GitHub before creating a zip
export const downloadTemplate = async (template: Template): Promise<string> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a new JSZip instance
    const zip = new JSZip();
    
    // If the template has a GitHub URL, try to fetch some basic files from the raw content
    if (template.githubUrl) {
      try {
        // Convert GitHub repository URL to raw content URL format
        // Example: https://github.com/username/repo to https://raw.githubusercontent.com/username/repo/main/
        const rawBaseUrl = template.githubUrl
          .replace('github.com', 'raw.githubusercontent.com')
          .replace(/\/$/, '') + '/main/';
        
        // List of common files to fetch
        const filesToFetch = [
          'index.html',
          'README.md',
          'package.json',
          'style.css',
          'styles.css',
          'script.js',
          'main.js',
          'app.js',
          '.gitignore'
        ];
        
        // Try to fetch each file from the repository
        for (const file of filesToFetch) {
          try {
            const response = await fetch(`${rawBaseUrl}${file}`);
            if (response.ok) {
              const content = await response.text();
              zip.file(file, content);
            }
          } catch (error) {
            console.log(`Could not fetch ${file} from GitHub`);
          }
        }
        
        // Try to fetch additional directories
        const dirsToFetch = ['src', 'public', 'assets', 'css', 'js', 'images'];
        
        for (const dir of dirsToFetch) {
          // For simplicity, we'll just add a placeholder file to indicate these directories
          // In a real implementation, you'd recursively fetch directory contents
          zip.file(`${dir}/.gitkeep`, "This directory was detected but files were not fetched individually");
        }
      } catch (error) {
        console.error("Error fetching files from GitHub:", error);
      }
    }
    
    // Get the theme colors based on the custom theme selection
    const themeColors = getThemeColors(template.customTheme);
    
    // If we couldn't fetch files from GitHub or there's no GitHub URL,
    // fall back to generating example files
    if (Object.keys(zip.files).length === 0) {
      // Create project files with the proper structure
      let projectFiles: Record<string, string> = {};
      
      // Check if the template contains Alpine.js
      if (template.techStack.includes("Alpine.js")) {
        projectFiles = generateAlpineTemplate(template, themeColors);
      } 
      // Check if the template contains React
      else if (template.techStack.includes("React")) {
        projectFiles = generateReactTemplate(template, themeColors);
      }
      // Check if the template is Vue.js based
      else if (template.techStack.includes("Vue.js")) {
        projectFiles = generateVueTemplate(template, themeColors);
      }
      // Default HTML/CSS/JS template
      else {
        projectFiles = generateBasicTemplate(template, themeColors);
      }
      
      // Add files to the zip
      Object.entries(projectFiles).forEach(([path, content]) => {
        // Handle directories
        if (path.includes('/')) {
          const directory = path.substring(0, path.lastIndexOf('/'));
          if (!zip.folder(directory)) {
            zip.folder(directory);
          }
        }
        
        zip.file(path, content);
      });
    }
    
    // Generate a more substantial zip with actual content
    const zipContent = await zip.generateAsync({ type: "blob" });
    
    // Create a URL for the blob
    return URL.createObjectURL(zipContent);
  } catch (error) {
    console.error("Error downloading template:", error);
    throw new Error("Failed to download template");
  }
};

// AI integration to generate custom project files based on user selections
export const generateCustomProject = async (
  projectName: string,
  projectDescription: string,
  selectedTechStacks: string[],
  theme: string = "blue"
): Promise<string> => {
  try {
    // Get the theme colors
    const themeColors = getThemeColors(theme);
    
    // Create a new JSZip instance
    const zip = new JSZip();
    
    // Try to generate project using AI if GROQ API is available
    try {
      const generatedFiles = await generateWithAI(projectName, projectDescription, selectedTechStacks, theme);
      
      // Add AI-generated files to the zip
      Object.entries(generatedFiles).forEach(([path, content]) => {
        // Handle directories
        if (path.includes('/')) {
          const directory = path.substring(0, path.lastIndexOf('/'));
          if (!zip.folder(directory)) {
            zip.folder(directory);
          }
        }
        
        zip.file(path, content);
      });
    } catch (error) {
      console.error("AI generation failed, falling back to templates:", error);
      
      // If AI generation fails, fall back to template generation
      let projectFiles: Record<string, string> = {};
      
      // Generate based on selected tech stacks
      if (selectedTechStacks.includes("alpine")) {
        const mockTemplate = {
          name: projectName,
          description: projectDescription,
          techStack: selectedTechStacks,
          customTheme: theme,
        } as Template;
        
        projectFiles = generateAlpineTemplate(mockTemplate, themeColors);
      } 
      else if (selectedTechStacks.includes("react")) {
        const mockTemplate = {
          name: projectName,
          description: projectDescription,
          techStack: selectedTechStacks,
          customTheme: theme,
        } as Template;
        
        projectFiles = generateReactTemplate(mockTemplate, themeColors);
      }
      else if (selectedTechStacks.includes("vue")) {
        const mockTemplate = {
          name: projectName,
          description: projectDescription,
          techStack: selectedTechStacks,
          customTheme: theme,
        } as Template;
        
        projectFiles = generateVueTemplate(mockTemplate, themeColors);
      }
      else {
        // Default to basic template
        const mockTemplate = {
          name: projectName,
          description: projectDescription,
          techStack: selectedTechStacks,
          customTheme: theme,
        } as Template;
        
        projectFiles = generateBasicTemplate(mockTemplate, themeColors);
      }
      
      // Add files to the zip
      Object.entries(projectFiles).forEach(([path, content]) => {
        // Handle directories
        if (path.includes('/')) {
          const directory = path.substring(0, path.lastIndexOf('/'));
          if (!zip.folder(directory)) {
            zip.folder(directory);
          }
        }
        
        zip.file(path, content);
      });
    }
    
    // Add README.md
    zip.file("README.md", `
# ${projectName}

${projectDescription}

## Tech Stack

${selectedTechStacks.join(', ')}

## Getting Started

1. Clone this repository
2. Install dependencies with \`npm install\` or \`yarn\`
3. Start the development server with \`npm run dev\` or \`yarn dev\`

## Features

- Responsive design
- ${theme.charAt(0).toUpperCase() + theme.slice(1)} theme colors
- Modern UI components
- Easy to customize
    `);
    
    // Add package.json with appropriate dependencies
    zip.file("package.json", generatePackageJson(projectName, projectDescription, selectedTechStacks));
    
    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: "blob" });
    
    // Create a URL for the blob
    return URL.createObjectURL(zipContent);
  } catch (error) {
    console.error("Error generating custom project:", error);
    throw new Error("Failed to generate custom project");
  }
};

// Function to integrate with GROQ API
export const integrateWithGroq = async (
  prompt: string,
  systemMessage: string = "You are an expert full-stack developer who creates comprehensive, production-ready web applications."
): Promise<string> => {
  try {
    // Try to get the GROQ API key from a global environment variable or configuration
    const GROQ_API_KEY = (window as any).GROQ_API_KEY || process.env.GROQ_API_KEY;
    
    if (!GROQ_API_KEY) {
      throw new Error("GROQ API Key not found");
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 8000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "GROQ API request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error using GROQ API:", error);
    throw error;
  }
};

// Helper function to generate project files using AI
const generateWithAI = async (
  projectName: string,
  projectDescription: string,
  selectedTechStacks: string[],
  theme: string
): Promise<Record<string, string>> => {
  const themeColors = getThemeColors(theme);
  
  // Format the prompt for the AI
  const prompt = `
Generate a complete web project with the following details:

Project Name: ${projectName}
Project Description: ${projectDescription}
Tech Stack: ${selectedTechStacks.join(', ')}
Theme Colors: 
- Primary: ${themeColors.primary}
- Secondary: ${themeColors.secondary}
- Accent: ${themeColors.accent}

Requirements:
1. Create a responsive and modern web application
2. Include a home page, about page, and contact page
3. Use the specified tech stack (${selectedTechStacks.join(', ')})
4. Apply the theme colors throughout the UI
5. Follow best practices for the selected technologies
6. Make sure the code is well-structured and maintainable
7. Include comments and documentation for key functionality

Return your response as a collection of files with their paths and content. Use format:

FILE: [file path]
[file content]
END_FILE

For example:
FILE: index.html
<!DOCTYPE html>
<html>...</html>
END_FILE

FILE: styles/main.css
body {...}
END_FILE

You MUST include at least the following files:
- index.html (or equivalent main entry point)
- CSS styling
- JavaScript functionality
- README.md with setup instructions
`;

  try {
    // Call the AI service to generate the project
    const aiResponse = await integrateWithGroq(prompt);
    
    // Parse the AI response to extract files
    const filePattern = /FILE: ([^\n]+)\n([\s\S]*?)END_FILE/g;
    const files: Record<string, string> = {};
    
    let match;
    while ((match = filePattern.exec(aiResponse)) !== null) {
      const [, filePath, fileContent] = match;
      files[filePath.trim()] = fileContent.trim();
    }
    
    // If no files were extracted, throw an error
    if (Object.keys(files).length === 0) {
      throw new Error("Could not parse AI response for files");
    }
    
    return files;
  } catch (error) {
    console.error("Error generating with AI:", error);
    throw error;
  }
};

// Functions to generate template-specific files

// Generate Alpine.js template
function generateAlpineTemplate(template: Template, themeColors: any): Record<string, string> {
  return {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
  <link rel="stylesheet" href="./styles/main.css">
  <script defer src="https://unpkg.com/alpinejs@3.12.3/dist/cdn.min.js"></script>
</head>
<body class="bg-gray-100 font-sans">
  <div x-data="{ isOpen: false, darkMode: false, activePage: 'home' }">
    <header class="bg-white shadow-md" :class="{ 'dark-header': darkMode }">
      <nav class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <a href="#" class="text-2xl font-bold text-gray-800" :class="{ 'text-white': darkMode }" style="color: ${themeColors.primary}">
              ${template.name}
            </a>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" 
               class="hover:text-gray-600 transition" 
               :class="{ 'text-white hover:text-gray-200': darkMode, 'text-gray-800': !darkMode }"
               @click.prevent="activePage = 'home'">Home</a>
            <a href="#" 
               class="hover:text-gray-600 transition" 
               :class="{ 'text-white hover:text-gray-200': darkMode, 'text-gray-800': !darkMode }"
               @click.prevent="activePage = 'features'">Features</a>
            <a href="#" 
               class="hover:text-gray-600 transition" 
               :class="{ 'text-white hover:text-gray-200': darkMode, 'text-gray-800': !darkMode }"
               @click.prevent="activePage = 'about'">About</a>
            <a href="#" 
               class="hover:text-gray-600 transition" 
               :class="{ 'text-white hover:text-gray-200': darkMode, 'text-gray-800': !darkMode }"
               @click.prevent="activePage = 'contact'">Contact</a>
          </div>
          
          <div class="flex items-center space-x-4">
            <button @click="darkMode = !darkMode" class="p-2 rounded-full hover:bg-gray-200">
              <template x-if="darkMode">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </template>
              <template x-if="!darkMode">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </template>
            </button>
            
            <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div x-show="isOpen" class="md:hidden mt-3 space-y-2" x-transition>
          <a href="#" @click.prevent="activePage = 'home'; isOpen = false" class="block py-2 px-4 hover:bg-gray-200" :class="{ 'text-white hover:bg-gray-700': darkMode }">Home</a>
          <a href="#" @click.prevent="activePage = 'features'; isOpen = false" class="block py-2 px-4 hover:bg-gray-200" :class="{ 'text-white hover:bg-gray-700': darkMode }">Features</a>
          <a href="#" @click.prevent="activePage = 'about'; isOpen = false" class="block py-2 px-4 hover:bg-gray-200" :class="{ 'text-white hover:bg-gray-700': darkMode }">About</a>
          <a href="#" @click.prevent="activePage = 'contact'; isOpen = false" class="block py-2 px-4 hover:bg-gray-200" :class="{ 'text-white hover:bg-gray-700': darkMode }">Contact</a>
        </div>
      </nav>
    </header>
    
    <main :class="{ 'dark-mode': darkMode }">
      <!-- Home Page -->
      <section x-show="activePage === 'home'" class="container mx-auto px-6 py-12">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-6" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }" style="color: ${themeColors.primary}">
              Welcome to ${template.name}
            </h1>
            <p class="text-lg mb-6" :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">
              ${template.description}
            </p>
            <div class="flex space-x-4">
              <button class="btn-primary" style="background-color: ${themeColors.primary}">
                Get Started
              </button>
              <button class="btn-secondary" style="border-color: ${themeColors.secondary}; color: ${themeColors.secondary}">
                Learn More
              </button>
            </div>
          </div>
          <div class="md:w-1/2">
            <div class="rounded-lg shadow-xl overflow-hidden bg-white" :class="{ 'bg-gray-800': darkMode }">
              <div class="h-64 bg-gradient-to-r" style="background: linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})"></div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }">
                  Beautiful Design
                </h3>
                <p :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">
                  This template includes a beautiful design with customizable colors and components.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Features Page -->
      <section x-show="activePage === 'features'" class="container mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold mb-12 text-center" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }" style="color: ${themeColors.primary}">
          Features
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6 rounded-lg shadow-md" :class="{ 'bg-gray-800': darkMode, 'bg-white': !darkMode }">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: ${themeColors.primary}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }">
              Fast Performance
            </h3>
            <p :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">
              Optimized for speed and efficiency with lightweight Alpine.js.
            </p>
          </div>
          
          <div class="p-6 rounded-lg shadow-md" :class="{ 'bg-gray-800': darkMode, 'bg-white': !darkMode }">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: ${themeColors.secondary}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }">
              Beautiful UI
            </h3>
            <p :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">
              Modern and clean UI components with responsive design.
            </p>
          </div>
          
          <div class="p-6 rounded-lg shadow-md" :class="{ 'bg-gray-800': darkMode, 'bg-white': !darkMode }">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: ${themeColors.accent}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }">
              Customizable
            </h3>
            <p :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">
              Easy to customize with Tailwind CSS and Alpine.js variables.
            </p>
          </div>
        </div>
      </section>
      
      <!-- About Page -->
      <section x-show="activePage === 'about'" class="container mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold mb-12 text-center" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }" style="color: ${themeColors.primary}">
          About Us
        </h2>
        
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <div class="rounded-lg shadow-xl overflow-hidden">
              <div class="h-64 bg-gradient-to-br" style="background: linear-gradient(to bottom right, ${themeColors.primary}, ${themeColors.accent})"></div>
            </div>
          </div>
          
          <div class="md:w-1/2 md:pl-12">
            <h3 class="text-2xl font-semibold mb-4" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }">
              Our Story
            </h3>
            <p class="mb-4" :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
              nisl nunc bibendum nunc, vel bibendum nunc nisl vel bibendum. Sed euismod, velit vel bibendum bibendum.
            </p>
            <p :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">
              Nunc bibendum nunc, vel bibendum nunc nisl vel bibendum. Sed euismod, velit vel bibendum bibendum, 
              nisl nunc bibendum nunc, vel bibendum nunc nisl vel bibendum.
            </p>
          </div>
        </div>
      </section>
      
      <!-- Contact Page -->
      <section x-show="activePage === 'contact'" class="container mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold mb-12 text-center" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }" style="color: ${themeColors.primary}">
          Contact Us
        </h2>
        
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <form x-data="{ name: '', email: '', message: '' }" @submit.prevent="alert('Form submitted!')">
              <div class="mb-4">
                <label class="block mb-2" :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">Name</label>
                <input type="text" x-model="name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2" 
                  :class="{ 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500': darkMode, 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500': !darkMode }"
                  required>
              </div>
              
              <div class="mb-4">
                <label class="block mb-2" :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">Email</label>
                <input type="email" x-model="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2" 
                  :class="{ 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500': darkMode, 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500': !darkMode }"
                  required>
              </div>
              
              <div class="mb-4">
                <label class="block mb-2" :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">Message</label>
                <textarea x-model="message" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2" 
                  :class="{ 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500': darkMode, 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500': !darkMode }"
                  rows="5" required></textarea>
              </div>
              
              <button type="submit" class="btn-primary" style="background-color: ${themeColors.primary}">
                Send Message
              </button>
            </form>
          </div>
          
          <div class="md:w-1/2 md:pl-8">
            <div class="rounded-lg overflow-hidden shadow-lg p-6" :class="{ 'bg-gray-800': darkMode, 'bg-white': !darkMode }">
              <h3 class="text-xl font-semibold mb-4" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }" style="color: ${themeColors.secondary}">
                Get in Touch
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm" :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">Email</p>
                    <p class="text-base font-medium" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }">
                      contact@example.com
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm" :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">Phone</p>
                    <p class="text-base font-medium" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }">
                      +1 (123) 456-7890
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm" :class="{ 'text-gray-300': darkMode, 'text-gray-600': !darkMode }">Address</p>
                    <p class="text-base font-medium" :class="{ 'text-white': darkMode, 'text-gray-800': !darkMode }">
                      123 Main Street, City, Country
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <footer class="py-8 mt-12" :class="{ 'bg-gray-900 text-white': darkMode, 'bg-gray-100 text-gray-700': !darkMode }">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <a href="#" class="text-xl font-bold" style="color: ${themeColors.primary}">
              ${template.name}
            </a>
            <p class="mt-2 text-sm" :class="{ 'text-gray-400': darkMode, 'text-gray-500': !darkMode }">
              &copy; 2025 All Rights Reserved
            </p>
          </div>
          
          <div class="flex space-x-6">
            <a href="#" class="hover:text-gray-400 transition-colors">Terms</a>
            <a href="#" class="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" class="hover:text-gray-400 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
  
  <script src="./src/main.js"></script>
</body>
</html>`,

    "styles/main.css": `:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

.dark-header {
  background-color: #2a2a2a;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: white;
  background-color: var(--primary-color);
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: var(--secondary-color);
  background-color: transparent;
  border: 1px solid var(--secondary-color);
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark-mode .btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Animation utilities */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}`,

    "src/main.js": `// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  console.log('${template.name} application loaded');
  
  // You can add additional JavaScript functionality here
  
  // Example: Show a welcome message in the console
  console.log('Welcome to ${template.name}!');
  console.log('This application uses Alpine.js for reactivity');
  
  // Example: Log theme colors
  console.log('Theme colors:', {
    primary: '${themeColors.primary}',
    secondary: '${themeColors.secondary}',
    accent: '${themeColors.accent}'
  });
});

// This file can be extended with additional functionality as needed`,

    "README.md": `# ${template.name}

${template.description}

## Features

- Built with Alpine.js and Tailwind CSS
- Responsive design for all device sizes
- Dark mode toggle
- Customizable theme colors
- Multiple page navigation
- Interactive components

## Getting Started

1. Clone this repository
2. Open index.html in your browser
3. For a production deployment, consider using a static file server

## Customization

You can customize the theme colors by editing the CSS variables in \`styles/main.css\`:

\`\`\`css
:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}
\`\`\`

## Tech Stack

${template.techStack.join(', ')}

## License

MIT
`
  };
}

// Generate React template
function generateReactTemplate(template: Template, themeColors: any): Record<string, string> {
  const includeTypeScript = template.techStack.includes('TypeScript');
  const extension = includeTypeScript ? 'tsx' : 'jsx';
  
  return {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.${includeTypeScript ? 'tsx' : 'jsx'}"></script>
</body>
</html>`,

    [`src/main.${extension}`]: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

    [`src/App.${extension}`]: `import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { ThemeProvider } from './contexts/ThemeContext';

${includeTypeScript ? `interface AppProps {}` : ''}

const App${includeTypeScript ? ': React.FC<AppProps>' : ''} = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;`,

    [`src/contexts/ThemeContext.${extension}`]: `import React, { createContext, useState, useContext, useEffect } from 'react';

${includeTypeScript ? `
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}` : ''}

const ThemeContext = createContext(${includeTypeScript ? 
  '{ darkMode: false, toggleDarkMode: () => {} } as ThemeContextType' : 
  '{ darkMode: false, toggleDarkMode: () => {} }'});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider${includeTypeScript ? ': React.FC<ThemeProviderProps>' : ''} = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Check for user preference on mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
      
    setDarkMode(isDarkMode);
  }, []);
  
  // Update when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};`,

    [`src/components/Header.${extension}`]: `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

${includeTypeScript ? `interface HeaderProps {}` : ''}

const Header${includeTypeScript ? ': React.FC<HeaderProps>' : ''} = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <header className={`py-4 shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold" style={{ color: '${themeColors.primary}' }}>
            ${template.name}
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={darkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'}>
              Home
            </Link>
            <Link to="/features" className={darkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'}>
              Features
            </Link>
            <Link to="/about" className={darkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'}>
              About
            </Link>
            <Link to="/contact" className={darkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'}>
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <button 
              onClick={toggleMenu}
              className="md:hidden focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 space-y-2">
            <Link to="/" onClick={toggleMenu} className={`block py-2 px-4 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}>
              Home
            </Link>
            <Link to="/features" onClick={toggleMenu} className={`block py-2 px-4 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}>
              Features
            </Link>
            <Link to="/about" onClick={toggleMenu} className={`block py-2 px-4 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}>
              About
            </Link>
            <Link to="/contact" onClick={toggleMenu} className={`block py-2 px-4 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}>
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;`,

    [`src/components/Footer.${extension}`]: `import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

${includeTypeScript ? `interface FooterProps {}` : ''}

const Footer${includeTypeScript ? ': React.FC<FooterProps>' : ''} = () => {
  const { darkMode } = useTheme();
  
  return (
    <footer className={\`py-8 mt-12 \${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}\`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-bold" style={{ color: '${themeColors.primary}' }}>
              ${template.name}
            </Link>
            <p className={\`mt-2 text-sm \${darkMode ? 'text-gray-400' : 'text-gray-500'}\`}>
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-gray-400 transition-colors">Terms</Link>
            <Link to="#" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-gray-400 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;`,

    [`src/pages/HomePage.${extension}`]: `import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';

${includeTypeScript ? `interface HomePageProps {}` : ''}

const HomePage${includeTypeScript ? ': React.FC<HomePageProps>' : ''} = () => {
  const { darkMode } = useTheme();
  
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 
            className={\`text-4xl md:text-5xl font-bold mb-6 \${darkMode ? 'text-white' : 'text-gray-800'}\`}
            style={{ color: '${themeColors.primary}' }}
          >
            Welcome to ${template.name}
          </h1>
          <p className={\`text-lg mb-6 \${darkMode ? 'text-gray-300' : 'text-gray-600'}\`}>
            ${template.description}
          </p>
          <div className="flex space-x-4">
            <Button 
              variant="primary" 
              style={{ backgroundColor: '${themeColors.primary}' }}
            >
              Get Started
            </Button>
            <Button 
              variant="secondary"
              style={{ borderColor: '${themeColors.secondary}', color: '${themeColors.secondary}' }}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className={\`rounded-lg shadow-xl overflow-hidden \${darkMode ? 'bg-gray-800' : 'bg-white'}\`}>
            <div 
              className="h-64 bg-gradient-to-r" 
              style={{ background: \`linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})\` }}
            />
            <div className="p-6">
              <h3 className={\`text-xl font-bold mb-2 \${darkMode ? 'text-white' : 'text-gray-800'}\`}>
                Beautiful Design
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                This template includes a beautiful design with customizable colors and components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;`,

    [`src/pages/FeaturesPage.${extension}`]: `import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

${includeTypeScript ? `interface FeaturesPageProps {}` : ''}

const FeaturesPage${includeTypeScript ? ': React.FC<FeaturesPageProps>' : ''} = () => {
  const { darkMode } = useTheme();
  
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 
        className={\`text-3xl font-bold mb-12 text-center \${darkMode ? 'text-white' : 'text-gray-800'}\`}
        style={{ color: '${themeColors.primary}' }}
      >
        Features
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={\`p-6 rounded-lg shadow-md \${darkMode ? 'bg-gray-800' : 'bg-white'}\`}>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: '${themeColors.primary}' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className={\`text-xl font-semibold mb-2 \${darkMode ? 'text-white' : 'text-gray-800'}\`}>
            Fast Performance
          </h3>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Optimized for speed and efficiency with React.
          </p>
        </div>
        
        <div className={\`p-6 rounded-lg shadow-md \${darkMode ? 'bg-gray-800' : 'bg-white'}\`}>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: '${themeColors.secondary}' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h3 className={\`text-xl font-semibold mb-2 \${darkMode ? 'text-white' : 'text-gray-800'}\`}>
            Beautiful UI
          </h3>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Modern and clean UI components with responsive design.
          </p>
        </div>
        
        <div className={\`p-6 rounded-lg shadow-md \${darkMode ? 'bg-gray-800' : 'bg-white'}\`}>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: '${themeColors.accent}' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className={\`text-xl font-semibold mb-2 \${darkMode ? 'text-white' : 'text-gray-800'}\`}>
            Customizable
          </h3>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Easy to customize with ${includeTypeScript ? 'TypeScript' : 'JavaScript'} and CSS variables.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;`,

    [`src/pages/AboutPage.${extension}`]: `import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

${includeTypeScript ? `interface AboutPageProps {}` : ''}

const AboutPage${includeTypeScript ? ': React.FC<AboutPageProps>' : ''} = () => {
  const { darkMode } = useTheme();
  
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 
        className={\`text-3xl font-bold mb-12 text-center \${darkMode ? 'text-white' : 'text-gray-800'}\`}
        style={{ color: '${themeColors.primary}' }}
      >
        About Us
      </h2>
      
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="rounded-lg shadow-xl overflow-hidden">
            <div 
              className="h-64 bg-gradient-to-br" 
              style={{ background: \`linear-gradient(to bottom right, ${themeColors.primary}, ${themeColors.accent})\` }}
            />
          </div>
        </div>
        
        <div className="md:w-1/2 md:pl-12">
          <h3 className={\`text-2xl font-semibold mb-4 \${darkMode ? 'text-white' : 'text-gray-800'}\`}>
            Our Story
          </h3>
          <p className={\`mb-4 \${darkMode ? 'text-gray-300' : 'text-gray-600'}\`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
            nisl nunc bibendum nunc, vel bibendum nunc nisl vel bibendum. Sed euismod, velit vel bibendum bibendum.
          </p>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Nunc bibendum nunc, vel bibendum nunc nisl vel bibendum. Sed euismod, velit vel bibendum bibendum, 
            nisl nunc bibendum nunc, vel bibendum nunc nisl vel bibendum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;`,

    [`src/pages/ContactPage.${extension}`]: `import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';

${includeTypeScript ? `
interface ContactPageProps {}

interface FormData {
  name: string;
  email: string;
  message: string;
}` : ''}

const ContactPage${includeTypeScript ? ': React.FC<ContactPageProps>' : ''} = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState${includeTypeScript ? '<FormData>' : ''}({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e${includeTypeScript ? ': React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>' : ''}) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e${includeTypeScript ? ': React.FormEvent<HTMLFormElement>' : ''}) => {
    e.preventDefault();
    alert('Form submitted!');
    console.log(formData);
  };
  
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 
        className={\`text-3xl font-bold mb-12 text-center \${darkMode ? 'text-white' : 'text-gray-800'}\`}
        style={{ color: '${themeColors.primary}' }}
      >
        Contact Us
      </h2>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                className={\`block mb-2 \${darkMode ? 'text-gray-200' : 'text-gray-700'}\`}
              >
                Name
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={
                  \`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 \${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  }\`
                }
                required
              />
            </div>
            
            <div className="mb-4">
              <label 
                className={\`block mb-2 \${darkMode ? 'text-gray-200' : 'text-gray-700'}\`}
              >
                Email
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={
                  \`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 \${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  }\`
                }
                required
              />
            </div>
            
            <div className="mb-4">
              <label 
                className={\`block mb-2 \${darkMode ? 'text-gray-200' : 'text-gray-700'}\`}
              >
                Message
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={
                  \`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 \${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  }\`
                }
                rows={5}
                required
              />
            </div>
            
            <Button 
              type="submit"
              variant="primary"
              style={{ backgroundColor: '${themeColors.primary}' }}
            >
              Send Message
            </Button>
          </form>
        </div>
        
        <div className="md:w-1/2 md:pl-8">
          <div className={\`rounded-lg overflow-hidden shadow-lg p-6 \${darkMode ? 'bg-gray-800' : 'bg-white'}\`}>
            <h3 
              className={\`text-xl font-semibold mb-4 \${darkMode ? 'text-white' : 'text-gray-800'}\`}
              style={{ color: '${themeColors.secondary}' }}
            >
              Get in Touch
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className={\`h-5 w-5 \${darkMode ? 'text-gray-200' : 'text-gray-700'}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className={\`text-sm \${darkMode ? 'text-gray-300' : 'text-gray-600'}\`}>Email</p>
                  <p className={\`text-base font-medium \${darkMode ? 'text-white' : 'text-gray-800'}\`}>
                    contact@example.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className={\`h-5 w-5 \${darkMode ? 'text-gray-200' : 'text-gray-700'}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className={\`text-sm \${darkMode ? 'text-gray-300' : 'text-gray-600'}\`}>Phone</p>
                  <p className={\`text-base font-medium \${darkMode ? 'text-white' : 'text-gray-800'}\`}>
                    +1 (123) 456-7890
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className={\`h-5 w-5 \${darkMode ? 'text-gray-200' : 'text-gray-700'}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className={\`text-sm \${darkMode ? 'text-gray-300' : 'text-gray-600'}\`}>Address</p>
                  <p className={\`text-base font-medium \${darkMode ? 'text-white' : 'text-gray-800'}\`}>
                    123 Main Street, City, Country
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;`,

    [`src/components/Button.${extension}`]: `import React from 'react';

${includeTypeScript ? `
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  style?: React.CSSProperties;
}` : ''}

const Button${includeTypeScript ? ': React.FC<ButtonProps>' : ''} = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  style = {}
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-2 font-medium rounded-md transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-transparent border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800'
  };
  
  return (
    <button
      type={type}
      className={\`\${baseClasses} \${variantClasses[variant]}\`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;`,

    "src/styles/index.css": `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

.dark {
  background-color: #121212;
  color: #ffffff;
}

/* Custom utilities */
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: white;
  background-color: var(--primary-color);
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: var(--secondary-color);
  background-color: transparent;
  border: 1px solid var(--secondary-color);
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.dark .btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Animation utilities */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}`,

    "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: '${themeColors.primary}',
        secondary: '${themeColors.secondary}',
        accent: '${themeColors.accent}',
      },
    },
  },
  plugins: [],
};`,

    "postcss.config.js": `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

    "README.md": `# ${template.name}

${template.description}

## Features

- Built with React${includeTypeScript ? '/TypeScript' : ''} and Tailwind CSS
- Dark mode support
- Responsive design for all device sizes
- Modern UI components
- React Router integration
- Customizable theme colors

## Getting Started

1. Clone this repository
2. Install dependencies: \`npm install\` or \`yarn\`
3. Start the development server: \`npm run dev\` or \`yarn dev\`
4. Build for production: \`npm run build\` or \`yarn build\`

## Project Structure

\`\`\`
src/
├── components/    # UI components
├── contexts/      # React contexts (theme)
├── pages/         # Page components
├── styles/        # CSS and Tailwind styles
└── main.${extension}      # Entry point
\`\`\`

## Customization

You can customize the theme colors by editing:
- \`src/styles/index.css\` - CSS variables
- \`tailwind.config.js\` - Tailwind theme settings

## Tech Stack

${template.techStack.join(', ')}

## License

MIT
`
  };
}

// Generate Vue template
function generateVueTemplate(template: Template, themeColors: any): Record<string, string> {
  return {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>`,

    "src/main.js": `import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'
import Home from './pages/Home.vue'
import Features from './pages/Features.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/features', component: Features },
  { path: '/about', component: About },
  { path: '/contact', component: Contact }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')`,

    "src/App.vue": `<template>
  <div class="app" :class="{ 'dark': isDarkMode }">
    <Header @toggle-dark-mode="toggleDarkMode" :isDarkMode="isDarkMode" />
    <main :class="{ 'dark-mode': isDarkMode }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :isDarkMode="isDarkMode" :primaryColor="'${themeColors.primary}'" :secondaryColor="'${themeColors.secondary}'" :accentColor="'${themeColors.accent}'" />
        </transition>
      </router-view>
    </main>
    <Footer :isDarkMode="isDarkMode" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isDarkMode: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
    }
  },
  created() {
    // Check for user preference on mount
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches
    this.isDarkMode = isDarkMode
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dark-mode {
  background-color: #121212;
  color: #ffffff;
  min-height: calc(100vh - 140px);
}
</style>`,

    "src/components/Header.vue": `<template>
  <header :class="{'bg-gray-900 text-white': isDarkMode, 'bg-white text-gray-900': !isDarkMode}" class="py-4 shadow-md">
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center">
        <router-link to="/" :style="{color: '${themeColors.primary}'}" class="text-2xl font-bold">
          ${template.name}
        </router-link>
        
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" :class="isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'">
            Home
          </router-link>
          <router-link to="/features" :class="isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'">
            Features
          </router-link>
          <router-link to="/about" :class="isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'">
            About
          </router-link>
          <router-link to="/contact" :class="isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'">
            Contact
          </router-link>
        </div>
        
        <div class="flex items-center space-x-4">
          <button 
            @click="$emit('toggle-dark-mode')" 
            class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <template v-if="isDarkMode">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </template>
          </button>
          
          <button 
            @click="isOpen = !isOpen"
            class="md:hidden focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div v-show="isOpen" class="md:hidden mt-3 space-y-2">
        <router-link to="/" @click="isOpen = false" :class="{'text-white hover:bg-gray-800': isDarkMode, 'text-gray-800 hover:bg-gray-100': !isDarkMode}" class="block py-2 px-4">
          Home
        </router-link>
        <router-link to="/features" @click="isOpen = false" :class="{'text-white hover:bg-gray-800': isDarkMode, 'text-gray-800 hover:bg-gray-100': !isDarkMode}" class="block py-2 px-4">
          Features
        </router-link>
        <router-link to="/about" @click="isOpen = false" :class="{'text-white hover:bg-gray-800': isDarkMode, 'text-gray-800 hover:bg-gray-100': !isDarkMode}" class="block py-2 px-4">
          About
        </router-link>
        <router-link to="/contact" @click="isOpen = false" :class="{'text-white hover:bg-gray-800': isDarkMode, 'text-gray-800 hover:bg-gray-100': !isDarkMode}" class="block py-2 px-4">
          Contact
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  emits: ['toggle-dark-mode']
}
</script>`,

    "src/components/Footer.vue": `<template>
  <footer :class="{'bg-gray-900 text-white': isDarkMode, 'bg-gray-100 text-gray-700': !isDarkMode}" class="py-8 mt-12">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-6 md:mb-0">
          <router-link to="/" :style="{color: '${themeColors.primary}'}" class="text-xl font-bold">
            ${template.name}
          </router-link>
          <p :class="{'text-gray-400': isDarkMode, 'text-gray-500': !isDarkMode}" class="mt-2 text-sm">
            &copy; {{ new Date().getFullYear() }} All Rights Reserved
          </p>
        </div>
        
        <div class="flex space-x-6">
          <router-link to="#" class="hover:text-gray-400 transition-colors">Terms</router-link>
          <router-link to="#" class="hover:text-gray-400 transition-colors">Privacy</router-link>
          <router-link to="#" class="hover:text-gray-400 transition-colors">Support</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    }
  }
}
</script>`,

    "src/pages/Home.vue": `<template>
  <section class="container mx-auto px-6 py-12">
    <div class="flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 mb-8 md:mb-0">
        <h1 
          :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}"
          :style="{color: primaryColor}"
          class="text-4xl md:text-5xl font-bold mb-6"
        >
          Welcome to ${template.name}
        </h1>
        <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}" class="text-lg mb-6">
          ${template.description}
        </p>
        <div class="flex space-x-4">
          <button 
            class="btn-primary"
            :style="{backgroundColor: primaryColor}"
          >
            Get Started
          </button>
          <button 
            class="btn-secondary"
            :style="{borderColor: secondaryColor, color: secondaryColor}"
          >
            Learn More
          </button>
        </div>
      </div>
      <div class="md:w-1/2">
        <div :class="{'bg-gray-800': isDarkMode, 'bg-white': !isDarkMode}" class="rounded-lg shadow-xl overflow-hidden">
          <div 
            class="h-64 bg-gradient-to-r" 
            :style="{background: \`linear-gradient(to right, \${primaryColor}, \${secondaryColor})\`}"
          ></div>
          <div class="p-6">
            <h3 :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}" class="text-xl font-bold mb-2">
              Beautiful Design
            </h3>
            <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}">
              This template includes a beautiful design with customizable colors and components.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    },
    primaryColor: {
      type: String,
      required: true
    },
    secondaryColor: {
      type: String,
      required: true
    },
    accentColor: {
      type: String,
      required: true
    }
  }
}
</script>`,

    "src/pages/Features.vue": `<template>
  <section class="container mx-auto px-6 py-12">
    <h2 
      :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}"
      :style="{color: primaryColor}"
      class="text-3xl font-bold mb-12 text-center"
    >
      Features
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div :class="{'bg-gray-800': isDarkMode, 'bg-white': !isDarkMode}" class="p-6 rounded-lg shadow-md">
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          :style="{backgroundColor: primaryColor}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}" class="text-xl font-semibold mb-2">
          Fast Performance
        </h3>
        <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}">
          Optimized for speed and efficiency with Vue.js.
        </p>
      </div>
      
      <div :class="{'bg-gray-800': isDarkMode, 'bg-white': !isDarkMode}" class="p-6 rounded-lg shadow-md">
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          :style="{backgroundColor: secondaryColor}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <h3 :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}" class="text-xl font-semibold mb-2">
          Beautiful UI
        </h3>
        <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}">
          Modern and clean UI components with responsive design.
        </p>
      </div>
      
      <div :class="{'bg-gray-800': isDarkMode, 'bg-white': !isDarkMode}" class="p-6 rounded-lg shadow-md">
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          :style="{backgroundColor: accentColor}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h3 :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}" class="text-xl font-semibold mb-2">
          Customizable
        </h3>
        <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}">
          Easy to customize with Vue.js and CSS variables.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    },
    primaryColor: {
      type: String,
      required: true
    },
    secondaryColor: {
      type: String,
      required: true
    },
    accentColor: {
      type: String,
      required: true
    }
  }
}
</script>`,

    "src/pages/About.vue": `<template>
  <section class="container mx-auto px-6 py-12">
    <h2 
      :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}"
      :style="{color: primaryColor}"
      class="text-3xl font-bold mb-12 text-center"
    >
      About Us
    </h2>
    
    <div class="flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 mb-8 md:mb-0">
        <div class="rounded-lg shadow-xl overflow-hidden">
          <div 
            class="h-64 bg-gradient-to-br" 
            :style="{background: \`linear-gradient(to bottom right, \${primaryColor}, \${accentColor})\`}"
          ></div>
        </div>
      </div>
      
      <div class="md:w-1/2 md:pl-12">
        <h3 :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}" class="text-2xl font-semibold mb-4">
          Our Story
        </h3>
        <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}" class="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
          nisl nunc bibendum nunc, vel bibendum nunc nisl vel bibendum. Sed euismod, velit vel bibendum bibendum.
        </p>
        <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}">
          Nunc bibendum nunc, vel bibendum nunc nisl vel bibendum. Sed euismod, velit vel bibendum bibendum, 
          nisl nunc bibendum nunc, vel bibendum nunc nisl vel bibendum.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    },
    primaryColor: {
      type: String,
      required: true
    },
    secondaryColor: {
      type: String,
      required: true
    },
    accentColor: {
      type: String,
      required: true
    }
  }
}
</script>`,

    "src/pages/Contact.vue": `<template>
  <section class="container mx-auto px-6 py-12">
    <h2 
      :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}"
      :style="{color: primaryColor}"
      class="text-3xl font-bold mb-12 text-center"
    >
      Contact Us
    </h2>
    
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label 
              :class="{'text-gray-200': isDarkMode, 'text-gray-700': !isDarkMode}"
              class="block mb-2"
            >
              Name
            </label>
            <input 
              type="text"
              v-model="formData.name"
              :class="{
                'bg-gray-700 border-gray-600 text-white focus:ring-blue-500': isDarkMode,
                'bg-white border-gray-300 text-gray-900 focus:ring-blue-500': !isDarkMode
              }"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              required
            />
          </div>
          
          <div class="mb-4">
            <label 
              :class="{'text-gray-200': isDarkMode, 'text-gray-700': !isDarkMode}"
              class="block mb-2"
            >
              Email
            </label>
            <input 
              type="email"
              v-model="formData.email"
              :class="{
                'bg-gray-700 border-gray-600 text-white focus:ring-blue-500': isDarkMode,
                'bg-white border-gray-300 text-gray-900 focus:ring-blue-500': !isDarkMode
              }"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              required
            />
          </div>
          
          <div class="mb-4">
            <label 
              :class="{'text-gray-200': isDarkMode, 'text-gray-700': !isDarkMode}"
              class="block mb-2"
            >
              Message
            </label>
            <textarea 
              v-model="formData.message"
              :class="{
                'bg-gray-700 border-gray-600 text-white focus:ring-blue-500': isDarkMode,
                'bg-white border-gray-300 text-gray-900 focus:ring-blue-500': !isDarkMode
              }"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              rows="5"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit"
            class="btn-primary"
            :style="{backgroundColor: primaryColor}"
          >
            Send Message
          </button>
        </form>
      </div>
      
      <div class="md:w-1/2 md:pl-8">
        <div :class="{'bg-gray-800': isDarkMode, 'bg-white': !isDarkMode}" class="rounded-lg overflow-hidden shadow-lg p-6">
          <h3 
            :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}"
            :style="{color: secondaryColor}"
            class="text-xl font-semibold mb-4"
          >
            Get in Touch
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" :class="{'text-gray-200': isDarkMode, 'text-gray-700': !isDarkMode}" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-4">
                <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}" class="text-sm">Email</p>
                <p :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}" class="text-base font-medium">
                  contact@example.com
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" :class="{'text-gray-200': isDarkMode, 'text-gray-700': !isDarkMode}" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div class="ml-4">
                <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}" class="text-sm">Phone</p>
                <p :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}" class="text-base font-medium">
                  +1 (123) 456-7890
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" :class="{'text-gray-200': isDarkMode, 'text-gray-700': !isDarkMode}" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <p :class="{'text-gray-300': isDarkMode, 'text-gray-600': !isDarkMode}" class="text-sm">Address</p>
                <p :class="{'text-white': isDarkMode, 'text-gray-800': !isDarkMode}" class="text-base font-medium">
                  123 Main Street, City, Country
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    },
    primaryColor: {
      type: String,
      required: true
    },
    secondaryColor: {
      type: String,
      required: true
    },
    accentColor: {
      type: String,
      required: true
    }
  },
  methods: {
    submitForm() {
      alert('Form submitted!')
      console.log(this.formData)
      // Reset form
      this.formData = {
        name: '',
        email: '',
        message: ''
      }
    }
  }
}
</script>`,

    "src/assets/main.css": `:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  transition: background-color 0.3s, color 0.3s;
  margin: 0;
  padding: 0;
}

.dark {
  background-color: #121212;
  color: #ffffff;
}

/* Custom utilities */
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: white;
  background-color: var(--primary-color);
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: var(--secondary-color);
  background-color: transparent;
  border: 1px solid var(--secondary-color);
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Router transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animation utilities */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}`,

    "README.md": `# ${template.name}

${template.description}

## Features

- Built with Vue 3
- Dark mode support
- Responsive design for all device sizes
- Modern UI components
- Vue Router integration
- Customizable theme colors

## Getting Started

1. Clone this repository
2. Install dependencies: \`npm install\` or \`yarn\`
3. Start the development server: \`npm run dev\` or \`yarn dev\`
4. Build for production: \`npm run build\` or \`yarn build\`

## Project Structure

\`\`\`
src/
├── assets/       # CSS and other assets
├── components/   # UI components
├── pages/        # Page components
└── App.vue       # Root component
\`\`\`

## Customization

You can customize the theme colors by editing the CSS variables in \`src/assets/main.css\`:

\`\`\`css
:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}
\`\`\`

## Tech Stack

${template.techStack.join(', ')}

## License

MIT
`
  };
}

// Generate basic HTML/CSS/JS template
function generateBasicTemplate(template: Template, themeColors: any): Record<string, string> {
  return {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
  <link rel="stylesheet" href="./styles/main.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
</head>
<body class="bg-gray-100 font-sans">
  <!-- Header -->
  <header class="bg-white shadow-md dark-header">
    <div class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <a href="#" class="text-2xl font-bold text-gray-800 dark-text" style="color: ${themeColors.primary}">
            ${template.name}
          </a>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <a href="#home" class="text-gray-800 hover:text-gray-600 transition dark-text">Home</a>
          <a href="#features" class="text-gray-800 hover:text-gray-600 transition dark-text">Features</a>
          <a href="#about" class="text-gray-800 hover:text-gray-600 transition dark-text">About</a>
          <a href="#contact" class="text-gray-800 hover:text-gray-600 transition dark-text">Contact</a>
        </div>
        
        <div class="flex items-center space-x-4">
          <button id="darkModeToggle" class="p-2 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" id="darkModeIcon" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="lightModeIcon" class="h-6 w-6 text-yellow-300 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          
          <button id="mobileMenuToggle" class="md:hidden focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800 dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div id="mobileMenu" class="md:hidden mt-3 space-y-2 hidden">
        <a href="#home" class="block py-2 px-4 text-gray-800 hover:bg-gray-200 dark-text dark-hover">Home</a>
        <a href="#features" class="block py-2 px-4 text-gray-800 hover:bg-gray-200 dark-text dark-hover">Features</a>
        <a href="#about" class="block py-2 px-4 text-gray-800 hover:bg-gray-200 dark-text dark-hover">About</a>
        <a href="#contact" class="block py-2 px-4 text-gray-800 hover:bg-gray-200 dark-text dark-hover">Contact</a>
      </div>
    </div>
  </header>
  
  <main>
    <!-- Home Section -->
    <section id="home" class="container mx-auto px-6 py-12">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-8 md:mb-0">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark-text" style="color: ${themeColors.primary}">
            Welcome to ${template.name}
          </h1>
          <p class="text-lg mb-6 text-gray-600 dark-text-secondary">
            ${template.description}
          </p>
          <div class="flex space-x-4">
            <button class="btn-primary" style="background-color: ${themeColors.primary}">
              Get Started
            </button>
            <button class="btn-secondary" style="border-color: ${themeColors.secondary}; color: ${themeColors.secondary}">
              Learn More
            </button>
          </div>
        </div>
        <div class="md:w-1/2">
          <div class="rounded-lg shadow-xl overflow-hidden bg-white dark-card">
            <div class="h-64 bg-gradient-to-r" style="background: linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})"></div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 text-gray-800 dark-text">
                Beautiful Design
              </h3>
              <p class="text-gray-600 dark-text-secondary">
                This template includes a beautiful design with customizable colors and components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section id="features" class="container mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark-text" style="color: ${themeColors.primary}">
        Features
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 rounded-lg shadow-md bg-white dark-card">
          <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: ${themeColors.primary}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark-text">
            Fast Performance
          </h3>
          <p class="text-gray-600 dark-text-secondary">
            Optimized for speed and efficiency with vanilla JavaScript.
          </p>
        </div>
        
        <div class="p-6 rounded-lg shadow-md bg-white dark-card">
          <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: ${themeColors.secondary}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark-text">
            Beautiful UI
          </h3>
          <p class="text-gray-600 dark-text-secondary">
            Modern and clean UI components with responsive design.
          </p>
        </div>
        
        <div class="p-6 rounded-lg shadow-md bg-white dark-card">
          <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background-color: ${themeColors.accent}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark-text">
            Customizable
          </h3>
          <p class="text-gray-600 dark-text-secondary">
            Easy to customize with CSS variables and simple JavaScript.
          </p>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section id="about" class="container mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark-text" style="color: ${themeColors.primary}">
        About Us
      </h2>
      
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-8 md:mb-0">
          <div class="rounded-lg shadow-xl overflow-hidden">
            <div class="h-64 bg-gradient-to-br" style="background: linear-gradient(to bottom right, ${themeColors.primary}, ${themeColors.accent})"></div>
          </div>
        </div>
        
        <div class="md:w-1/2 md:pl-12">
          <h3 class="text-2xl font-semibold mb-4 text-gray-800 dark-text">
            Our Story
          </h3>
          <p class="mb-4 text-gray-600 dark-text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
            nisl nunc bibendum nunc, vel bibendum nunc nisl vel bibendum. Sed euismod, velit vel bibendum bibendum.
          </p>
          <p class="text-gray-600 dark-text-secondary">
            Nunc bibendum nunc, vel bibendum nunc nisl vel bibendum. Sed euismod, velit vel bibendum bibendum, 
            nisl nunc bibendum nunc, vel bibendum nunc nisl vel bibendum.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <section id="contact" class="container mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark-text" style="color: ${themeColors.primary}">
        Contact Us
      </h2>
      
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <form id="contactForm">
            <div class="mb-4">
              <label class="block mb-2 text-gray-700 dark-text">Name</label>
              <input type="text" id="name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark-input" required>
            </div>
            
            <div class="mb-4">
              <label class="block mb-2 text-gray-700 dark-text">Email</label>
              <input type="email" id="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark-input" required>
            </div>
            
            <div class="mb-4">
              <label class="block mb-2 text-gray-700 dark-text">Message</label>
              <textarea id="message" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark-input" rows="5" required></textarea>
            </div>
            
            <button type="submit" class="btn-primary" style="background-color: ${themeColors.primary}">
              Send Message
            </button>
          </form>
        </div>
        
        <div class="md:w-1/2 md:pl-8">
          <div class="rounded-lg overflow-hidden shadow-lg p-6 bg-white dark-card">
            <h3 class="text-xl font-semibold mb-4 text-gray-800 dark-text" style="color: ${themeColors.secondary}">
              Get in Touch
            </h3>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-600 dark-text-secondary">Email</p>
                  <p class="text-base font-medium text-gray-800 dark-text">
                    contact@example.com
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-600 dark-text-secondary">Phone</p>
                  <p class="text-base font-medium text-gray-800 dark-text">
                    +1 (123) 456-7890
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-600 dark-text-secondary">Address</p>
                  <p class="text-base font-medium text-gray-800 dark-text">
                    123 Main Street, City, Country
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  
  <footer class="py-8 mt-12 bg-gray-100 text-gray-700 dark-footer">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-6 md:mb-0">
          <a href="#" class="text-xl font-bold" style="color: ${themeColors.primary}">
            ${template.name}
          </a>
          <p class="mt-2 text-sm text-gray-500 dark-text-tertiary">
            &copy; <span id="currentYear"></span> All Rights Reserved
          </p>
        </div>
        
        <div class="flex space-x-6">
          <a href="#" class="hover:text-gray-400 transition-colors dark-text">Terms</a>
          <a href="#" class="hover:text-gray-400 transition-colors dark-text">Privacy</a>
          <a href="#" class="hover:text-gray-400 transition-colors dark-text">Support</a>
        </div>
      </div>
    </div>
  </footer>
  
  <script src="./src/main.js"></script>
</body>
</html>`,

    "styles/main.css": `:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

body.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

.dark-header {
  transition: background-color 0.3s, color 0.3s;
}

body.dark-mode .dark-header {
  background-color: #2a2a2a;
}

body.dark-mode .dark-footer {
  background-color: #2a2a2a;
}

body.dark-mode .dark-text {
  color: #ffffff;
}

body.dark-mode .dark-text-secondary {
  color: #cccccc;
}

body.dark-mode .dark-text-tertiary {
  color: #999999;
}

body.dark-mode .dark-card {
  background-color: #2a2a2a;
}

body.dark-mode .dark-hover:hover {
  background-color: #3a3a3a;
}

body.dark-mode .dark-input {
  background-color: #333;
  border-color: #555;
  color: white;
}

body.dark-mode .dark-input:focus {
  border-color: var(--primary-color);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: white;
  background-color: var(--primary-color);
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: var(--secondary-color);
  background-color: transparent;
  border: 1px solid var(--secondary-color);
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

body.dark-mode .btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Animation utilities */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}`,

    "src/main.js": `// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  console.log('${template.name} application loaded');
  
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = document.getElementById('darkModeIcon');
  const lightModeIcon = document.getElementById('lightModeIcon');
  const body = document.body;
  
  // Check for saved dark mode preference or system preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial dark mode state
  if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeIcon.classList.add('hidden');
    lightModeIcon.classList.remove('hidden');
  }
  
  darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    darkModeIcon.classList.toggle('hidden');
    lightModeIcon.classList.toggle('hidden');
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  });
  
  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    console.log('Form submitted', {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    });
    
    alert('Message sent successfully!');
    contactForm.reset();
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
});`,

    "README.md": `# ${template.name}

${template.description}

## Features

- Responsive design for all device sizes
- Dark mode toggle with preference saving
- Smooth scroll navigation
- Contact form with client-side validation
- Beautiful UI with customizable colors

## Getting Started

1. Clone this repository
2. Open index.html in your browser
3. For a production deployment, consider using a static file server

## Customization

You can customize the theme colors by editing the CSS variables in \`styles/main.css\`:

\`\`\`css
:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}
\`\`\`

## Tech Stack

HTML, CSS, and JavaScript

## License

MIT
`
  };
}

// Helper function to generate package.json content based on tech stack
function generatePackageJson(projectName: string, description: string, techStack: string[]): string {
  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {
    "vite": "^5.0.0"
  };
  
  // Add dependencies based on selected tech stacks
  if (techStack.includes('react')) {
    dependencies['react'] = '^18.2.0';
    dependencies['react-dom'] = '^18.2.0';
    dependencies['react-router-dom'] = '^6.18.0';
    devDependencies['@vitejs/plugin-react'] = '^4.2.0';
  }
  
  if (techStack.includes('vue')) {
    dependencies['vue'] = '^3.3.8';
    dependencies['vue-router'] = '^4.2.5';
    devDependencies['@vitejs/plugin-vue'] = '^4.5.0';
  }
  
  if (techStack.includes('typescript')) {
    dependencies['typescript'] = '^5.2.2';
    devDependencies['@types/react'] = '^18.2.37';
    devDependencies['@types/react-dom'] = '^18.2.15';
  }
  
  if (techStack.includes('tailwind')) {
    devDependencies['tailwindcss'] = '^3.3.5';
    devDependencies['postcss'] = '^8.4.31';
    devDependencies['autoprefixer'] = '^10.4.16';
  }
  
  if (techStack.includes('node')) {
    dependencies['express'] = '^4.18.2';
    dependencies['cors'] = '^2.8.5';
    dependencies['dotenv'] = '^16.3.1';
  }
  
  if (techStack.includes('alpine')) {
    dependencies['alpinejs'] = '^3.13.2';
  }
  
  // Generate scripts based on tech stack
  const scripts: Record<string, string> = {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  };
  
  if (techStack.includes('typescript')) {
    scripts['dev'] = 'vite';
    scripts['build'] = 'tsc && vite build';
  }
  
  if (techStack.includes('node')) {
    scripts['server'] = 'node server.js';
    scripts['dev:full'] = 'concurrently "npm run dev" "npm run server"';
    devDependencies['concurrently'] = '^8.2.2';
  }
  
  return JSON.stringify({
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    private: true,
    version: '1.0.0',
    description,
    type: 'module',
    scripts,
    dependencies,
    devDependencies
  }, null, 2);
}

// Helper function to get theme colors based on selection
function getThemeColors(theme?: string): { primary: string, secondary: string, accent: string } {
  switch (theme) {
    case 'green':
      return { primary: '#059669', secondary: '#047857', accent: '#34d399' };
    case 'blue':
      return { primary: '#2563eb', secondary: '#1d4ed8', accent: '#60a5fa' };
    case 'red':
      return { primary: '#dc2626', secondary: '#b91c1c', accent: '#f87171' };
    case 'orange':
      return { primary: '#ea580c', secondary: '#c2410c', accent: '#fb923c' };
    case 'pink':
      return { primary: '#db2777', secondary: '#be185d', accent: '#f472b6' };
    case 'purple':
      return { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' };
    default: // Default blue
      return { primary: '#2563eb', secondary: '#1d4ed8', accent: '#60a5fa' };
  }
}

