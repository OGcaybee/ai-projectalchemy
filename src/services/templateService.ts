
import { templateThumbnails, getTemplateThumbnail } from "@/assets/template-thumbnails";
import JSZip from "jszip";
import { GROQ_API_KEY } from "@/config";

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
      const projectFiles = {
        // HTML entry point
        "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
  <div id="root"></div>
  <script src="./src/main.js" type="module"></script>
</body>
</html>`,

        // Main CSS file
        "styles/main.css": `:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}

body {
  font-family: 'Inter', sans-serif;
  color: #333;
  line-height: 1.5;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}`,

        // Main JS file
        "src/main.js": `import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import App from './App.js'

createApp(App).mount('#root')`,

        // App component
        "src/App.js": `export default {
  name: 'App',
  data() {
    return {
      appName: '${template.name}',
      description: '${template.description}',
      features: [
        'Responsive design',
        'Modern UI components',
        'Customizable themes',
        'Easy to integrate',
        'Well documented'
      ]
    }
  },
  template: \`
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900" style="color: var(--primary-color)">{{ appName }}</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <p class="text-lg text-center mb-4">{{ description }}</p>
              
              <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4" style="color: var(--secondary-color)">Features</h2>
                <ul class="space-y-2">
                  <li v-for="feature in features" class="flex items-start">
                    <span class="mr-2" style="color: var(--accent-color)">✓</span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
              
              <div class="mt-8 text-center">
                <button class="btn-primary">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow mt-8 py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p class="text-center text-gray-500">
            Built with ${template.techStack.join(', ')}
          </p>
        </div>
      </footer>
    </div>
  \`
}`,

        // README file
        "README.md": `# ${template.name}

${template.description}

## About This Project

This project was generated using the Thynk AI Template Customizer with the following configuration:

- Template: ${template.name}
- Theme: ${template.customTheme || 'Default'}
- Tech Stack: ${template.techStack.join(', ')}

## Getting Started

1. Extract the ZIP file
2. Open the folder in your favorite code editor
3. For a quick preview, open the index.html file in your browser
4. For development, it's recommended to set up a local server:
   \`\`\`
   npx serve
   \`\`\`

## Features

- Responsive design for all device sizes
- Modern UI components
- Customizable theme colors
- Easy to extend

## Credits

Original template by: ${template.author || 'Template Creator'}
${template.githubUrl ? `GitHub: ${template.githubUrl}` : ''}

## License

MIT
`,

        // Package JSON (for reference)
        "package.json": `{
  "name": "${template.name.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "${template.description}",
  "main": "index.html",
  "scripts": {
    "start": "serve .",
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    ${generateDependencies(template.techStack)}
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "serve": "^14.0.0"
  }
}`
      };
      
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

// Helper function to generate dependencies based on tech stack
function generateDependencies(techStack: string[]): string {
  const deps: Record<string, string> = {};
  
  if (techStack.includes('React')) deps['react'] = '"^18.2.0"';
  if (techStack.includes('Vue')) deps['vue'] = '"^3.3.4"';
  if (techStack.includes('Tailwind CSS')) deps['tailwindcss'] = '"^3.3.3"';
  if (techStack.includes('TypeScript')) deps['typescript'] = '"^5.0.2"';
  if (techStack.includes('Next.js')) deps['next'] = '"^13.4.12"';
  if (techStack.includes('Chart.js')) deps['chart.js'] = '"^4.3.0"';
  if (techStack.includes('Express')) deps['express'] = '"^4.18.2"';
  if (techStack.includes('MongoDB')) deps['mongodb'] = '"^5.7.0"';
  if (techStack.includes('Alpine.js')) deps['alpinejs'] = '"^3.12.3"';
  if (techStack.includes('Gatsby')) deps['gatsby'] = '"^5.12.4"';
  if (techStack.includes('GraphQL')) deps['graphql'] = '"^16.8.1"';
  if (techStack.includes('Framer Motion')) deps['framer-motion'] = '"^10.16.4"';
  if (techStack.includes('Material UI')) deps['@mui/material'] = '"^5.14.15"';
  if (techStack.includes('Redux')) deps['redux'] = '"^4.2.1"';
  if (techStack.includes('React Native')) deps['react-native'] = '"^0.72.6"';
  if (techStack.includes('Expo')) deps['expo'] = '"^49.0.0"';
  
  return Object.entries(deps)
    .map(([name, version]) => `"${name}": ${version}`)
    .join(',\n    ');
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
    default: // Purple/Blue
      return { primary: '#7c3aed', secondary: '#6d28d9', accent: '#a78bfa' };
  }
}

// Technical stacks for the AI generator
export interface PageDescription {
  name: string;
  path: string;
  description: string;
}

export const TECH_STACK_OPTIONS = [
  "react", 
  "vue", 
  "alpine", 
  "typescript", 
  "tailwind",
  "node"
];

// Function to generate custom projects
export const generateCustomProject = async (
  projectName: string,
  projectDescription: string,
  selectedTechStacks: string[],
  selectedTheme: string = 'blue'
): Promise<string> => {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();
    const themeColors = getThemeColors(selectedTheme);
    
    // Determine which template files to generate based on the selected tech stack
    if (selectedTechStacks.includes('react')) {
      // React project structure
      createReactProject(zip, projectName, projectDescription, selectedTechStacks, themeColors);
    } else if (selectedTechStacks.includes('vue')) {
      // Vue project structure
      createVueProject(zip, projectName, projectDescription, selectedTechStacks, themeColors);
    } else if (selectedTechStacks.includes('alpine')) {
      // Alpine.js project structure
      createAlpineProject(zip, projectName, projectDescription, selectedTechStacks, themeColors);
    } else {
      // Default to a simple HTML/CSS/JS project
      createBasicProject(zip, projectName, projectDescription, selectedTechStacks, themeColors);
    }
    
    // Add README
    zip.file('README.md', `# ${projectName}

${projectDescription}

## About This Project

This project was generated using the ThynkAI Generator with the following configuration:

- Project Name: ${projectName}
- Theme: ${selectedTheme}
- Tech Stack: ${selectedTechStacks.join(', ')}

## Getting Started

1. Extract the ZIP file
2. Open the folder in your favorite code editor
3. Install dependencies with \`npm install\` or \`yarn\`
4. Start the development server with \`npm run dev\` or \`yarn dev\`

## Features

- Responsive design for all device sizes
- Modern UI components
- ${selectedTechStacks.includes('tailwind') ? 'Styled with Tailwind CSS' : 'Custom styling'}
- ${selectedTechStacks.includes('typescript') ? 'Type safety with TypeScript' : 'JavaScript for logic'}
- Easy to customize and extend

## License

MIT
`);
    
    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: "blob" });
    
    // Return the download URL
    return URL.createObjectURL(zipContent);
  } catch (error) {
    console.error("Error generating custom project:", error);
    throw new Error("Failed to generate custom project");
  }
};

// Helper function to create a React project
function createReactProject(
  zip: JSZip, 
  projectName: string, 
  projectDescription: string, 
  techStacks: string[],
  themeColors: { primary: string, secondary: string, accent: string }
): void {
  // Create basic project structure
  const src = zip.folder("src");
  src?.folder("components");
  src?.folder("pages");
  src?.folder("hooks");
  src?.folder("context");
  src?.folder("assets");
  
  const isTypescript = techStacks.includes('typescript');
  const fileExt = isTypescript ? 'tsx' : 'jsx';
  const indexFileExt = isTypescript ? 'tsx' : 'jsx';
  
  // Create index.html
  zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.${indexFileExt}"></script>
</body>
</html>
`);

  // Create package.json
  const packageJson = {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.14.2',
      ...(techStacks.includes('tailwind') ? {} : { '@emotion/styled': '^11.11.0' })
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.0.4',
      'vite': '^4.4.9',
      ...(techStacks.includes('typescript') ? {
        '@types/react': '^18.2.20',
        '@types/react-dom': '^18.2.7',
        'typescript': '^5.1.6'
      } : {}),
      ...(techStacks.includes('tailwind') ? {
        'autoprefixer': '^10.4.14',
        'postcss': '^8.4.27',
        'tailwindcss': '^3.3.3'
      } : {})
    }
  };
  
  zip.file("package.json", JSON.stringify(packageJson, null, 2));
  
  // Add Vite config
  zip.file("vite.config.js", `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`);
  
  // Add TypeScript configuration if needed
  if (isTypescript) {
    zip.file("tsconfig.json", `
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`);
    
    zip.file("tsconfig.node.json", `
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`);
  }
  
  // Add Tailwind config if needed
  if (techStacks.includes('tailwind')) {
    zip.file("tailwind.config.js", `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "${themeColors.primary}",
        secondary: "${themeColors.secondary}",
        accent: "${themeColors.accent}",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
`);
    
    zip.file("postcss.config.js", `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);
  }
  
  // Main entry file
  src?.file(`main.${indexFileExt}`, `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.${fileExt}'
${techStacks.includes('tailwind') ? "import './index.css'" : "import './styles.css'"}

ReactDOM.createRoot(document.getElementById('root')${isTypescript ? " as HTMLElement" : ""}).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);
  
  // App component
  src?.file(`App.${fileExt}`, `
import { useState } from 'react'
${isTypescript ? "import React from 'react'" : ""}
import Header from './components/Header.${fileExt}'
import Footer from './components/Footer.${fileExt}'
import HomePage from './pages/HomePage.${fileExt}'

${isTypescript ? "const App: React.FC = () => {" : "function App() {"}
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <div className={${techStacks.includes('tailwind') ? 
      '`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`' : 
      '`app ${darkMode ? "dark" : ""}`'}}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className=${techStacks.includes('tailwind') ? 
        '"container mx-auto px-4 py-8"' : 
        '"main-content"'}>
        <HomePage />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App
`);
  
  // Add CSS
  if (techStacks.includes('tailwind')) {
    src?.file("index.css", `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans antialiased;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded font-medium transition-colors;
  }
  .btn-primary {
    @apply bg-primary text-white hover:bg-opacity-90;
  }
  .btn-secondary {
    @apply bg-secondary text-white hover:bg-opacity-90;
  }
  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
  }
}
`);
  } else {
    src?.file("styles.css", `
:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
  --light-bg: #f9fafb;
  --dark-bg: #111827;
  --light-text: #1f2937;
  --dark-text: #f9fafb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
}

.app {
  min-height: 100vh;
  background-color: var(--light-bg);
  color: var(--light-text);
}

.app.dark {
  background-color: var(--dark-bg);
  color: var(--dark-text);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-secondary:hover {
  opacity: 0.9;
}

.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.app.dark .card {
  background-color: #1f2937;
}
`);
  }
  
  // Header component
  src?.folder("components")?.file(`Header.${fileExt}`, `
${isTypescript ? "import React from 'react'" : ""}

${isTypescript ? 
  "interface HeaderProps {\n  darkMode: boolean;\n  toggleDarkMode: () => void;\n}\n\nconst Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {" : 
  "function Header({ darkMode, toggleDarkMode }) {"}

  return (
    <header className=${techStacks.includes('tailwind') ? 
      '`py-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`' : 
      '`header ${darkMode ? "dark" : ""}`'}>
      <div className=${techStacks.includes('tailwind') ? '"container mx-auto px-4 flex justify-between items-center"' : '"header-container"'}>
        <div className=${techStacks.includes('tailwind') ? '"text-xl font-bold"' : '"logo"'}>
          ${projectName}
        </div>
        
        <nav className=${techStacks.includes('tailwind') ? '"flex items-center space-x-6"' : '"nav-links"'}>
          <a href="#" className=${techStacks.includes('tailwind') ? '"hover:text-primary"' : '""'}>Home</a>
          <a href="#" className=${techStacks.includes('tailwind') ? '"hover:text-primary"' : '""'}>Features</a>
          <a href="#" className=${techStacks.includes('tailwind') ? '"hover:text-primary"' : '""'}>About</a>
          <a href="#" className=${techStacks.includes('tailwind') ? '"hover:text-primary"' : '""'}>Contact</a>
        </nav>
        
        <button 
          onClick={toggleDarkMode}
          className=${techStacks.includes('tailwind') ? 
            '`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`' : 
            '"theme-toggle-btn"'}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  )
}

export default Header
`);

  // Footer component
  src?.folder("components")?.file(`Footer.${fileExt}`, `
${isTypescript ? "import React from 'react'" : ""}

${isTypescript ? 
  "interface FooterProps {\n  darkMode: boolean;\n}\n\nconst Footer: React.FC<FooterProps> = ({ darkMode }) => {" : 
  "function Footer({ darkMode }) {"}

  return (
    <footer className=${techStacks.includes('tailwind') ? 
      '`py-6 mt-8 border-t ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`' : 
      '`footer ${darkMode ? "dark" : ""}`'}>
      <div className=${techStacks.includes('tailwind') ? '"container mx-auto px-4 text-center"' : '"footer-container"'}>
        <p className=${techStacks.includes('tailwind') ? '"text-sm text-gray-500 dark:text-gray-400"' : '"copyright"'}>
          &copy; {new Date().getFullYear()} ${projectName}. All rights reserved.
        </p>
        <div className=${techStacks.includes('tailwind') ? '"mt-4 flex justify-center space-x-4"' : '"social-links"'}>
          <a href="#" className=${techStacks.includes('tailwind') ? '"text-gray-400 hover:text-primary"' : '""'}>Twitter</a>
          <a href="#" className=${techStacks.includes('tailwind') ? '"text-gray-400 hover:text-primary"' : '""'}>GitHub</a>
          <a href="#" className=${techStacks.includes('tailwind') ? '"text-gray-400 hover:text-primary"' : '""'}>LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
`);

  // Home page component
  src?.folder("pages")?.file(`HomePage.${fileExt}`, `
${isTypescript ? "import React from 'react'" : ""}

${isTypescript ? "const HomePage: React.FC = () => {" : "function HomePage() {"}
  return (
    <div className=${techStacks.includes('tailwind') ? '""' : '"home-page"'}>
      <section className=${techStacks.includes('tailwind') ? 
        '"py-12 text-center"' : 
        '"hero-section"'}>
        <h1 className=${techStacks.includes('tailwind') ? 
          '"text-4xl font-bold mb-6"' : 
          '"hero-title"'}>
          Welcome to ${projectName}
        </h1>
        <p className=${techStacks.includes('tailwind') ? 
          '"text-xl max-w-2xl mx-auto mb-8"' : 
          '"hero-subtitle"'}>
          ${projectDescription || 'A modern web application built with React'}
        </p>
        <div className=${techStacks.includes('tailwind') ? 
          '"flex justify-center gap-4"' : 
          '"cta-buttons"'}>
          <button className=${techStacks.includes('tailwind') ? 
            '"btn btn-primary"' : 
            '"btn btn-primary"'}>Get Started</button>
          <button className=${techStacks.includes('tailwind') ? 
            '"btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"' : 
            '"btn btn-secondary"'}>Learn More</button>
        </div>
      </section>

      <section className=${techStacks.includes('tailwind') ? 
        '"py-12"' : 
        '"features-section"'}>
        <h2 className=${techStacks.includes('tailwind') ? 
          '"text-3xl font-bold text-center mb-12"' : 
          '"section-title"'}>Key Features</h2>
        <div className=${techStacks.includes('tailwind') ? 
          '"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"' : 
          '"features-grid"'}>
          <div className=${techStacks.includes('tailwind') ? '"card"' : '"card"'}>
            <h3 className=${techStacks.includes('tailwind') ? 
              '"text-xl font-semibold mb-3"' : 
              '"feature-title"'}>Modern Stack</h3>
            <p>Built with the latest web technologies for better performance and developer experience.</p>
          </div>
          <div className=${techStacks.includes('tailwind') ? '"card"' : '"card"'}>
            <h3 className=${techStacks.includes('tailwind') ? 
              '"text-xl font-semibold mb-3"' : 
              '"feature-title"'}>Responsive Design</h3>
            <p>Looks great on any device, from mobile phones to desktop computers.</p>
          </div>
          <div className=${techStacks.includes('tailwind') ? '"card"' : '"card"'}>
            <h3 className=${techStacks.includes('tailwind') ? 
              '"text-xl font-semibold mb-3"' : 
              '"feature-title"'}>Customizable</h3>
            <p>Easy to customize to match your brand and specific requirements.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
`);
}

// Helper function to create a Vue project
function createVueProject(
  zip: JSZip, 
  projectName: string, 
  projectDescription: string, 
  techStacks: string[],
  themeColors: { primary: string, secondary: string, accent: string }
): void {
  // Create basic project structure
  const src = zip.folder("src");
  src?.folder("components");
  src?.folder("views");
  src?.folder("assets");
  
  const isTypescript = techStacks.includes('typescript');
  const fileExt = isTypescript ? '.ts' : '.js';
  const componentExt = isTypescript ? '.vue' : '.vue';
  
  // Create index.html
  zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main${fileExt}"></script>
</body>
</html>
`);

  // Create package.json
  const packageJson = {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    dependencies: {
      'vue': '^3.3.4',
      'vue-router': '^4.2.4',
      ...(techStacks.includes('typescript') ? {} : {})
    },
    devDependencies: {
      '@vitejs/plugin-vue': '^4.2.3',
      'vite': '^4.4.9',
      ...(techStacks.includes('typescript') ? {
        '@types/node': '^20.4.9',
        '@vue/tsconfig': '^0.4.0',
        'typescript': '^5.1.6',
        'vue-tsc': '^1.8.8'
      } : {}),
      ...(techStacks.includes('tailwind') ? {
        'autoprefixer': '^10.4.14',
        'postcss': '^8.4.27',
        'tailwindcss': '^3.3.3'
      } : {})
    }
  };
  
  zip.file("package.json", JSON.stringify(packageJson, null, 2));
  
  // Add Vite config
  zip.file(`vite.config${isTypescript ? '.ts' : '.js'}`, `
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
${isTypescript ? "import { fileURLToPath, URL } from 'node:url'" : ""}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  ${isTypescript ? `
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }` : ''}
})
`);
  
  // Add TypeScript configuration if needed
  if (isTypescript) {
    zip.file("tsconfig.json", `
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
`);
    
    zip.file("tsconfig.node.json", `
{
  "extends": "@vue/tsconfig/tsconfig.node.json",
  "include": ["vite.config.ts"],
  "compilerOptions": {
    "composite": true,
    "types": ["node"]
  }
}
`);
    
    src?.file("env.d.ts", `/// <reference types="vite/client" />`);
  }
  
  // Add Tailwind config if needed
  if (techStacks.includes('tailwind')) {
    zip.file("tailwind.config.js", `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "${themeColors.primary}",
        secondary: "${themeColors.secondary}",
        accent: "${themeColors.accent}",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
`);
    
    zip.file("postcss.config.js", `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);
  }
  
  // Main entry file
  src?.file(`main${fileExt}`, `
import { createApp } from 'vue'
import App from './App.vue'
import router from './router${fileExt}'
${techStacks.includes('tailwind') ? "import './assets/tailwind.css'" : "import './assets/main.css'"}

const app = createApp(App)
app.use(router)
app.mount('#app')
`);

  // Router
  src?.file(`router${fileExt}`, `
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})

export default router
`);
  
  // App component
  src?.file("App.vue", `
<template>
  <div id="app" :class="{ 'dark': darkMode }">
    <TheHeader :dark-mode="darkMode" @toggle-dark-mode="toggleDarkMode" />
    <main class="${techStacks.includes('tailwind') ? 'container mx-auto px-4 py-8' : 'main-content'}">
      <router-view />
    </main>
    <TheFooter :dark-mode="darkMode" />
  </div>
</template>

<script${isTypescript ? " lang=\"ts\"" : ""}>
import { defineComponent, ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  },
  setup() {
    const darkMode = ref(false)

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value
    }

    return {
      darkMode,
      toggleDarkMode
    }
  }
})
</script>

${techStacks.includes('tailwind') ? '' : 
`<style>
:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
  --light-bg: #f9fafb;
  --dark-bg: #111827;
  --light-text: #1f2937;
  --dark-text: #f9fafb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
}

#app {
  min-height: 100vh;
  background-color: var(--light-bg);
  color: var(--light-text);
}

#app.dark {
  background-color: var(--dark-bg);
  color: var(--dark-text);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

#app.dark .card {
  background-color: #1f2937;
}
</style>`}
`);

  // Add CSS
  if (techStacks.includes('tailwind')) {
    src?.folder("assets")?.file("tailwind.css", `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans antialiased;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded font-medium transition-colors;
  }
  .btn-primary {
    @apply bg-primary text-white hover:bg-opacity-90;
  }
  .btn-secondary {
    @apply bg-secondary text-white hover:bg-opacity-90;
  }
  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
  }
}
`);
  } else {
    src?.folder("assets")?.file("main.css", `
:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
}
`);
  }
  
  // Header component
  src?.folder("components")?.file("TheHeader.vue", `
<template>
  <header :class="['header', { 'dark': darkMode }]">
    <div class="${techStacks.includes('tailwind') ? 
      'container mx-auto px-4 flex justify-between items-center' : 
      'header-container'}">
      <div class="${techStacks.includes('tailwind') ? 'text-xl font-bold' : 'logo'}">
        ${projectName}
      </div>
      
      <nav class="${techStacks.includes('tailwind') ? 'flex items-center space-x-6' : 'nav-links'}">
        <router-link to="/" class="${techStacks.includes('tailwind') ? 'hover:text-primary' : ''}">Home</router-link>
        <router-link to="/about" class="${techStacks.includes('tailwind') ? 'hover:text-primary' : ''}">About</router-link>
        <a href="#features" class="${techStacks.includes('tailwind') ? 'hover:text-primary' : ''}">Features</a>
        <a href="#contact" class="${techStacks.includes('tailwind') ? 'hover:text-primary' : ''}">Contact</a>
      </nav>
      
      <button 
        @click="$emit('toggle-dark-mode')"
        class="${techStacks.includes('tailwind') ? 
          'p-2 rounded-full transition-colors' : 
          'theme-toggle-btn'}"
        :class="${techStacks.includes('tailwind') ? 
          'darkMode ? \'bg-gray-700\' : \'bg-gray-100\'' : 
          ''}"
      >
        {{ darkMode ? "🌙" : "☀️" }}
      </button>
    </div>
  </header>
</template>

<script${isTypescript ? " lang=\"ts\"" : ""}>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheHeader',
  props: {
    darkMode: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-dark-mode']
})
</script>

${techStacks.includes('tailwind') ? 
`<style scoped>
header {
  @apply py-4 shadow-md;
}

header.dark {
  @apply bg-gray-800;
}

header:not(.dark) {
  @apply bg-white;
}
</style>` : 
`<style scoped>
.header {
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.header.dark {
  background-color: #1f2937;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: inherit;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.theme-toggle-btn {
  padding: 0.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  background-color: #f3f4f6;
}

.header.dark .theme-toggle-btn {
  background-color: #374151;
}
</style>`}
`);

  // Footer component
  src?.folder("components")?.file("TheFooter.vue", `
<template>
  <footer :class="['footer', { 'dark': darkMode }]">
    <div class="${techStacks.includes('tailwind') ? 'container mx-auto px-4 text-center' : 'footer-container'}">
      <p class="${techStacks.includes('tailwind') ? 'text-sm text-gray-500 dark:text-gray-400' : 'copyright'}">
        &copy; {{ currentYear }} ${projectName}. All rights reserved.
      </p>
      <div class="${techStacks.includes('tailwind') ? 'mt-4 flex justify-center space-x-4' : 'social-links'}">
        <a href="#" class="${techStacks.includes('tailwind') ? 'text-gray-400 hover:text-primary' : ''}">Twitter</a>
        <a href="#" class="${techStacks.includes('tailwind') ? 'text-gray-400 hover:text-primary' : ''}">GitHub</a>
        <a href="#" class="${techStacks.includes('tailwind') ? 'text-gray-400 hover:text-primary' : ''}">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>

<script${isTypescript ? " lang=\"ts\"" : ""}>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'TheFooter',
  props: {
    darkMode: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    return {
      currentYear
    }
  }
})
</script>

${techStacks.includes('tailwind') ? 
`<style scoped>
footer {
  @apply py-6 mt-8 border-t;
}

footer.dark {
  @apply bg-gray-800 border-gray-700;
}

footer:not(.dark) {
  @apply bg-white border-gray-200;
}
</style>` : 
`<style scoped>
.footer {
  padding: 1.5rem 0;
  margin-top: 2rem;
  border-top: 1px solid #e5e7eb;
  background-color: white;
}

.footer.dark {
  background-color: #1f2937;
  border-top-color: #374151;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.copyright {
  color: #6b7280;
}

.footer.dark .copyright {
  color: #9ca3af;
}

.social-links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-links a {
  color: #6b7280;
  text-decoration: none;
}

.social-links a:hover {
  color: var(--primary-color);
}

.footer.dark .social-links a {
  color: #9ca3af;
}
</style>`}
`);

  // Home view
  src?.folder("views")?.file("Home.vue", `
<template>
  <div class="home">
    <section class="${techStacks.includes('tailwind') ? 'py-12 text-center' : 'hero-section'}">
      <h1 class="${techStacks.includes('tailwind') ? 'text-4xl font-bold mb-6' : 'hero-title'}">
        Welcome to ${projectName}
      </h1>
      <p class="${techStacks.includes('tailwind') ? 'text-xl max-w-2xl mx-auto mb-8' : 'hero-subtitle'}">
        ${projectDescription || 'A modern web application built with Vue.js'}
      </p>
      <div class="${techStacks.includes('tailwind') ? 'flex justify-center gap-4' : 'cta-buttons'}">
        <button class="${techStacks.includes('tailwind') ? 'btn btn-primary' : 'btn btn-primary'}">
          Get Started
        </button>
        <button class="${techStacks.includes('tailwind') ? 
          'btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600' : 
          'btn btn-secondary'}">
          Learn More
        </button>
      </div>
    </section>

    <section id="features" class="${techStacks.includes('tailwind') ? 'py-12' : 'features-section'}">
      <h2 class="${techStacks.includes('tailwind') ? 'text-3xl font-bold text-center mb-12' : 'section-title'}">
        Key Features
      </h2>
      <div class="${techStacks.includes('tailwind') ? 
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 
        'features-grid'}">
        <div class="${techStacks.includes('tailwind') ? 'card' : 'card'}">
          <h3 class="${techStacks.includes('tailwind') ? 'text-xl font-semibold mb-3' : 'feature-title'}">
            Modern Stack
          </h3>
          <p>Built with the latest web technologies for better performance and developer experience.</p>
        </div>
        <div class="${techStacks.includes('tailwind') ? 'card' : 'card'}">
          <h3 class="${techStacks.includes('tailwind') ? 'text-xl font-semibold mb-3' : 'feature-title'}">
            Responsive Design
          </h3>
          <p>Looks great on any device, from mobile phones to desktop computers.</p>
        </div>
        <div class="${techStacks.includes('tailwind') ? 'card' : 'card'}">
          <h3 class="${techStacks.includes('tailwind') ? 'text-xl font-semibold mb-3' : 'feature-title'}">
            Customizable
          </h3>
          <p>Easy to customize to match your brand and specific requirements.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script${isTypescript ? " lang=\"ts\"" : ""}>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView'
})
</script>

${!techStacks.includes('tailwind') ? 
`<style scoped>
.hero-section {
  padding: 3rem 0;
  text-align: center;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 42rem;
  margin: 0 auto 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.features-section {
  padding: 3rem 0;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>` : ''}
`);

  // About view
  src?.folder("views")?.file("About.vue", `
<template>
  <div class="about">
    <h1 class="${techStacks.includes('tailwind') ? 'text-3xl font-bold mb-6' : 'page-title'}">
      About ${projectName}
    </h1>
    <p class="${techStacks.includes('tailwind') ? 'mb-4' : ''}">
      ${projectDescription || 'This is a Vue.js project created with Vite.'}
    </p>
    <p class="${techStacks.includes('tailwind') ? 'mb-4' : ''}">
      It features a modern tech stack with ${techStacks.join(', ')} to provide an optimal development experience.
    </p>
    
    <div class="${techStacks.includes('tailwind') ? 'mt-8' : 'tech-stack-section'}">
      <h2 class="${techStacks.includes('tailwind') ? 'text-2xl font-semibold mb-4' : 'section-subtitle'}">
        Technology Stack
      </h2>
      <ul class="${techStacks.includes('tailwind') ? 'list-disc pl-6 space-y-2' : 'tech-list'}">
        ${techStacks.map(tech => 
          `<li>${tech.charAt(0).toUpperCase() + tech.slice(1)}</li>`
        ).join('\n        ')}
      </ul>
    </div>
  </div>
</template>

<script${isTypescript ? " lang=\"ts\"" : ""}>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutView'
})
</script>

${!techStacks.includes('tailwind') ? 
`<style scoped>
.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.tech-stack-section {
  margin-top: 2rem;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.tech-list {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.tech-list li {
  margin-bottom: 0.5rem;
}
</style>` : ''}
`);
}

// Helper function to create an Alpine.js project
function createAlpineProject(
  zip: JSZip, 
  projectName: string, 
  projectDescription: string, 
  techStacks: string[],
  themeColors: { primary: string, secondary: string, accent: string }
): void {
  // Create basic project structure
  zip.folder("public");
  zip.folder("src");
  zip.folder("src/js");
  zip.folder("src/css");
  zip.folder("src/partials");
  
  const hasTailwind = techStacks.includes('tailwind');
  
  // Create index.html
  zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${hasTailwind ? 
    '<script src="https://cdn.tailwindcss.com"></script>' :
    '<link rel="stylesheet" href="./src/css/styles.css">'}
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="./src/js/app.js"></script>
  ${hasTailwind ? `
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: "${themeColors.primary}",
            secondary: "${themeColors.secondary}",
            accent: "${themeColors.accent}",
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
        }
      }
    }
  </script>` : ''}
</head>
<body class="${hasTailwind ? 
  'font-sans antialiased min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white' : 
  'font-sans antialiased min-h-screen'}" 
  x-data="{ darkMode: false }" 
  :class="{ 'dark': darkMode }">
  
  <!-- Header -->
  <header class="${hasTailwind ? 
    'bg-white dark:bg-gray-800 shadow-md' : 
    'header'}">
    <div class="${hasTailwind ? 
      'container mx-auto px-4 py-4 flex justify-between items-center' : 
      'container'}">
      <div class="${hasTailwind ? 'text-xl font-bold' : 'logo'}">
        ${projectName}
      </div>
      
      <nav class="${hasTailwind ? 'hidden md:flex items-center space-x-6' : 'nav-links'}">
        <a href="#" class="${hasTailwind ? 'hover:text-primary' : ''}">Home</a>
        <a href="#features" class="${hasTailwind ? 'hover:text-primary' : ''}">Features</a>
        <a href="#about" class="${hasTailwind ? 'hover:text-primary' : ''}">About</a>
        <a href="#contact" class="${hasTailwind ? 'hover:text-primary' : ''}">Contact</a>
      </nav>
      
      <button 
        @click="darkMode = !darkMode"
        class="${hasTailwind ? 
          'p-2 rounded-full bg-gray-200 dark:bg-gray-700' : 
          'theme-toggle'}"
      >
        <span x-show="!darkMode">🌙</span>
        <span x-show="darkMode">☀️</span>
      </button>
      
      <button 
        @click="mobileMenu = !mobileMenu"
        class="${hasTailwind ? 
          'md:hidden p-2' : 
          'mobile-toggle'}"
        x-data="{ mobileMenu: false }" 
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile menu -->
    <div 
      x-data="{ mobileMenu: false }" 
      x-show="mobileMenu" 
      class="${hasTailwind ? 
        'md:hidden bg-white dark:bg-gray-800 shadow-md' : 
        'mobile-menu'}"
    >
      <nav class="${hasTailwind ? 'px-4 pt-2 pb-4 space-y-3' : ''}">
        <a href="#" class="${hasTailwind ? 'block hover:text-primary py-2' : 'mobile-link'}">Home</a>
        <a href="#features" class="${hasTailwind ? 'block hover:text-primary py-2' : 'mobile-link'}">Features</a>
        <a href="#about" class="${hasTailwind ? 'block hover:text-primary py-2' : 'mobile-link'}">About</a>
        <a href="#contact" class="${hasTailwind ? 'block hover:text-primary py-2' : 'mobile-link'}">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="${hasTailwind ? 'container mx-auto px-4 py-8' : 'main-content'}">
    <!-- Hero Section -->
    <section class="${hasTailwind ? 'py-12 text-center' : 'hero-section'}">
      <h1 class="${hasTailwind ? 'text-4xl font-bold mb-6' : 'hero-title'}">
        Welcome to ${projectName}
      </h1>
      <p class="${hasTailwind ? 'text-xl max-w-2xl mx-auto mb-8' : 'hero-subtitle'}">
        ${projectDescription || 'A modern web application built with Alpine.js'}
      </p>
      <div class="${hasTailwind ? 'flex justify-center gap-4' : 'cta-buttons'}">
        <button class="${hasTailwind ? 
          'px-4 py-2 bg-primary text-white font-medium rounded hover:bg-opacity-90 transition-colors' : 
          'btn-primary'}">
          Get Started
        </button>
        <button class="${hasTailwind ? 
          'px-4 py-2 bg-gray-200 dark:bg-gray-700 font-medium rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors' : 
          'btn-secondary'}">
          Learn More
        </button>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="${hasTailwind ? 'py-12' : 'features-section'}">
      <h2 class="${hasTailwind ? 'text-3xl font-bold text-center mb-12' : 'section-title'}">
        Key Features
      </h2>
      <div class="${hasTailwind ? 
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 
        'features-grid'}"
        x-data="{
          features: [
            { 
              title: 'Modern Stack', 
              description: 'Built with Alpine.js and other modern technologies for better performance.' 
            },
            { 
              title: 'Responsive Design', 
              description: 'Looks great on any device, from mobile phones to desktop computers.' 
            },
            { 
              title: 'Customizable', 
              description: 'Easy to customize to match your brand and specific requirements.' 
            }
          ]
        }"
      >
        <template x-for="feature in features" :key="feature.title">
          <div class="${hasTailwind ? 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6' : 'card'}">
            <h3 class="${hasTailwind ? 'text-xl font-semibold mb-3' : 'feature-title'}" x-text="feature.title"></h3>
            <p x-text="feature.description"></p>
          </div>
        </template>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="${hasTailwind ? 
    'py-6 mt-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800' : 
    'footer'}">
    <div class="${hasTailwind ? 'container mx-auto px-4 text-center' : 'footer-container'}">
      <p class="${hasTailwind ? 'text-sm text-gray-500 dark:text-gray-400' : 'copyright'}">
        &copy; <span x-text="new Date().getFullYear()"></span> ${projectName}. All rights reserved.
      </p>
      <div class="${hasTailwind ? 'mt-4 flex justify-center space-x-4' : 'social-links'}">
        <a href="#" class="${hasTailwind ? 'text-gray-400 hover:text-primary' : 'social-link'}">Twitter</a>
        <a href="#" class="${hasTailwind ? 'text-gray-400 hover:text-primary' : 'social-link'}">GitHub</a>
        <a href="#" class="${hasTailwind ? 'text-gray-400 hover:text-primary' : 'social-link'}">LinkedIn</a>
      </div>
    </div>
  </footer>

</body>
</html>
`);

  // Create app.js
  zip.file("src/js/app.js", `
// Alpine.js main application
document.addEventListener('alpine:init', () => {
  // Define your Alpine.js data and methods here
  Alpine.data('counter', () => ({
    count: 0,
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }));
  
  // Dark mode toggle functionality
  Alpine.data('darkMode', () => ({
    dark: localStorage.getItem('dark') === 'true',
    init() {
      this.$watch('dark', (val) => {
        localStorage.setItem('dark', val);
      });
    }
  }));
});

// Feature data
const featureData = [
  {
    title: 'Modern Stack',
    description: 'Built with Alpine.js and modern web technologies for better performance and user experience.'
  },
  {
    title: 'Responsive Design',
    description: 'Looks great on any device, from mobile phones to desktop computers.'
  },
  {
    title: 'Customizable',
    description: 'Easy to customize to match your brand and specific requirements.'
  }
];
`);

  // Create CSS if not using Tailwind
  if (!hasTailwind) {
    zip.file("src/css/styles.css", `
:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
  --light-bg: #f9fafb;
  --dark-bg: #111827;
  --light-text: #1f2937;
  --dark-text: #f9fafb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  background-color: var(--light-bg);
  color: var(--light-text);
}

body.dark {
  background-color: var(--dark-bg);
  color: var(--dark-text);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

body.dark .header {
  background-color: #1f2937;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
}

.nav-links {
  display: none;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .mobile-toggle {
    display: none;
  }
}

.nav-links a {
  text-decoration: none;
  color: inherit;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.theme-toggle {
  padding: 0.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  background-color: #f3f4f6;
}

body.dark .theme-toggle {
  background-color: #374151;
}

.mobile-menu {
  padding: 1rem 0;
  display: none;
}

.mobile-link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: inherit;
}

.mobile-link:hover {
  color: var(--primary-color);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.hero-section {
  padding: 3rem 0;
  text-align: center;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 42rem;
  margin: 0 auto 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: #e5e7eb;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
}

body.dark .btn-secondary {
  background-color: #374151;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

body.dark .btn-secondary:hover {
  background-color: #4b5563;
}

.features-section {
  padding: 3rem 0;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
}

body.dark .card {
  background-color: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.footer {
  padding: 1.5rem 0;
  margin-top: 2rem;
  background-color: white;
  border-top: 1px solid #e5e7eb;
}

body.dark .footer {
  background-color: #1f2937;
  border-top: 1px solid #374151;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.copyright {
  color: #6b7280;
}

body.dark .copyright {
  color: #9ca3af;
}

.social-links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  color: #6b7280;
  text-decoration: none;
}

.social-link:hover {
  color: var(--primary-color);
}

body.dark .social-link {
  color: #9ca3af;
}
`);
  }

  // Create robots.txt
  zip.file("robots.txt", `User-agent: *
Allow: /
`);

  // Create README.md
  zip.file("README.md", `# ${projectName}

${projectDescription || 'A modern Alpine.js project'}

## About

This project is a lightweight web application built with Alpine.js${techStacks.includes('tailwind') ? ' and Tailwind CSS' : ''}.

## Features

- Responsive design for all devices
- Dark mode toggle
- Modern UI components
- Simple and lightweight

## Getting Started

1. Clone the repository
2. Open index.html in your browser or set up a local server
   \`\`\`
   npx serve
   \`\`\`
3. Start customizing the content and styles

## Dependencies

- Alpine.js: A minimal framework for composing JavaScript behavior
${techStacks.includes('tailwind') ? '- Tailwind CSS: A utility-first CSS framework' : ''}

## License

MIT
`);
}

// Helper function to create a basic HTML/CSS/JS project
function createBasicProject(
  zip: JSZip, 
  projectName: string, 
  projectDescription: string, 
  techStacks: string[],
  themeColors: { primary: string, secondary: string, accent: string }
): void {
  // Create basic project structure
  zip.folder("css");
  zip.folder("js");
  zip.folder("images");
  
  const hasTailwind = techStacks.includes('tailwind');
  
  // Create index.html
  zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${hasTailwind ? 
    '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">' :
    '<link rel="stylesheet" href="./css/styles.css">'}
  <script defer src="./js/script.js"></script>
</head>
<body class="${hasTailwind ? 'font-sans antialiased bg-gray-50 dark:bg-gray-900 dark:text-white' : ''}" data-theme="light">
  
  <!-- Header -->
  <header class="${hasTailwind ? 'bg-white dark:bg-gray-800 shadow-md' : 'header'}">
    <div class="${hasTailwind ? 'container mx-auto px-4 py-4 flex justify-between items-center' : 'container'}">
      <div class="${hasTailwind ? 'text-xl font-bold' : 'logo'}">
        ${projectName}
      </div>
      
      <nav class="${hasTailwind ? 'hidden md:flex items-center space-x-6' : 'nav-links'}">
        <a href="#" class="${hasTailwind ? 'hover:text-blue-600' : ''}">Home</a>
        <a href="#features" class="${hasTailwind ? 'hover:text-blue-600' : ''}">Features</a>
        <a href="#about" class="${hasTailwind ? 'hover:text-blue-600' : ''}">About</a>
        <a href="#contact" class="${hasTailwind ? 'hover:text-blue-600' : ''}">Contact</a>
      </nav>
      
      <button 
        id="theme-toggle"
        class="${hasTailwind ? 
          'p-2 rounded-full bg-gray-200 dark:bg-gray-700' : 
          'theme-toggle'}"
      >
        <span id="theme-toggle-icon">🌙</span>
      </button>
      
      <button 
        id="mobile-toggle"
        class="${hasTailwind ? 
          'md:hidden p-2' : 
          'mobile-toggle'}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile menu -->
    <div 
      id="mobile-menu"
      class="${hasTailwind ? 
        'hidden md:hidden bg-white dark:bg-gray-800 shadow-md' : 
        'mobile-menu'}"
    >
      <nav class="${hasTailwind ? 'px-4 pt-2 pb-4 space-y-3' : ''}">
        <a href="#" class="${hasTailwind ? 'block hover:text-blue-600 py-2' : 'mobile-link'}">Home</a>
        <a href="#features" class="${hasTailwind ? 'block hover:text-blue-600 py-2' : 'mobile-link'}">Features</a>
        <a href="#about" class="${hasTailwind ? 'block hover:text-blue-600 py-2' : 'mobile-link'}">About</a>
        <a href="#contact" class="${hasTailwind ? 'block hover:text-blue-600 py-2' : 'mobile-link'}">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="${hasTailwind ? 'container mx-auto px-4 py-8' : 'main-content'}">
    <!-- Hero Section -->
    <section class="${hasTailwind ? 'py-12 text-center' : 'hero-section'}">
      <h1 class="${hasTailwind ? 'text-4xl font-bold mb-6' : 'hero-title'}">
        Welcome to ${projectName}
      </h1>
      <p class="${hasTailwind ? 'text-xl max-w-2xl mx-auto mb-8' : 'hero-subtitle'}">
        ${projectDescription || 'A modern web application built with HTML, CSS and JavaScript'}
      </p>
      <div class="${hasTailwind ? 'flex justify-center gap-4' : 'cta-buttons'}">
        <button class="${hasTailwind ? 
          'px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors' : 
          'btn-primary'}">
          Get Started
        </button>
        <button class="${hasTailwind ? 
          'px-4 py-2 bg-gray-200 dark:bg-gray-700 font-medium rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors' : 
          'btn-secondary'}">
          Learn More
        </button>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="${hasTailwind ? 'py-12' : 'features-section'}">
      <h2 class="${hasTailwind ? 'text-3xl font-bold text-center mb-12' : 'section-title'}">
        Key Features
      </h2>
      <div class="${hasTailwind ? 
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 
        'features-grid'}" id="features-container">
        <!-- Features will be added here by JavaScript -->
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="${hasTailwind ? 'py-12' : 'about-section'}">
      <h2 class="${hasTailwind ? 'text-3xl font-bold text-center mb-8' : 'section-title'}">
        About ${projectName}
      </h2>
      <div class="${hasTailwind ? 'max-w-3xl mx-auto' : ''}">
        <p class="${hasTailwind ? 'mb-4' : ''}">
          ${projectDescription || 'This is a modern web application built with standard web technologies.'}
        </p>
        <p>
          Our goal is to provide a clean, responsive, and accessible user interface that delivers an excellent user experience on all devices.
        </p>
        
        <h3 class="${hasTailwind ? 'text-xl font-semibold mt-6 mb-4' : 'subsection-title'}">Technology Stack</h3>
        <ul class="${hasTailwind ? 'list-disc pl-6 space-y-2' : 'tech-list'}">
          ${techStacks.map(tech => 
            `<li>${tech.charAt(0).toUpperCase() + tech.slice(1)}</li>`
          ).join('\n          ')}
        </ul>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="${hasTailwind ? 'py-12' : 'contact-section'}">
      <h2 class="${hasTailwind ? 'text-3xl font-bold text-center mb-8' : 'section-title'}">
        Contact Us
      </h2>
      <div class="${hasTailwind ? 'max-w-xl mx-auto' : 'contact-container'}">
        <form id="contact-form" class="${hasTailwind ? 'space-y-4' : 'contact-form'}">
          <div>
            <label for="name" class="${hasTailwind ? 'block text-sm font-medium mb-1' : 'form-label'}">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              class="${hasTailwind ? 
                'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600' : 
                'form-input'}"
            >
          </div>
          <div>
            <label for="email" class="${hasTailwind ? 'block text-sm font-medium mb-1' : 'form-label'}">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              class="${hasTailwind ? 
                'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600' : 
                'form-input'}"
            >
          </div>
          <div>
            <label for="message" class="${hasTailwind ? 'block text-sm font-medium mb-1' : 'form-label'}">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4" 
              required 
              class="${hasTailwind ? 
                'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600' : 
                'form-textarea'}"
            ></textarea>
          </div>
          <button 
            type="submit" 
            class="${hasTailwind ? 
              'w-full px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors' : 
              'btn-primary'}"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="${hasTailwind ? 
    'py-6 mt-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800' : 
    'footer'}">
    <div class="${hasTailwind ? 'container mx-auto px-4 text-center' : 'footer-container'}">
      <p class="${hasTailwind ? 'text-sm text-gray-500 dark:text-gray-400' : 'copyright'}">
        &copy; <span id="current-year"></span> ${projectName}. All rights reserved.
      </p>
      <div class="${hasTailwind ? 'mt-4 flex justify-center space-x-4' : 'social-links'}">
        <a href="#" class="${hasTailwind ? 'text-gray-400 hover:text-blue-600' : 'social-link'}">Twitter</a>
        <a href="#" class="${hasTailwind ? 'text-gray-400 hover:text-blue-600' : 'social-link'}">GitHub</a>
        <a href="#" class="${hasTailwind ? 'text-gray-400 hover:text-blue-600' : 'social-link'}">LinkedIn</a>
      </div>
    </div>
  </footer>

</body>
</html>
`);

  // Create JavaScript
  zip.file("js/script.js", `
// Feature data
const features = [
  {
    title: 'Modern Design',
    description: 'Clean and modern UI built with contemporary web standards.'
  },
  {
    title: 'Responsive Layout',
    description: 'Looks great on any device, from mobile phones to desktop computers.'
  },
  {
    title: 'Customizable',
    description: 'Easy to customize to match your brand and specific requirements.'
  }
];

// DOM elements
const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const featuresContainer = document.getElementById('features-container');
const contactForm = document.getElementById('contact-form');
const currentYearElement = document.getElementById('current-year');

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderFeatures();
  setupEventListeners();
  currentYearElement.textContent = new Date().getFullYear();
});

// Initialize theme based on user preference or localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = savedTheme;
  updateThemeToggleIcon(savedTheme);
}

// Update the theme toggle icon based on current theme
function updateThemeToggleIcon(theme) {
  themeToggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Toggle between light and dark themes
function toggleTheme() {
  const currentTheme = document.body.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  updateThemeToggleIcon(newTheme);
}

// Render features dynamically
function renderFeatures() {
  featuresContainer.innerHTML = '';
  
  features.forEach(feature => {
    const featureCard = document.createElement('div');
    featureCard.className = document.body.classList.contains('tailwind') ? 
      'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6' : 
      'card';
    
    const title = document.createElement('h3');
    title.className = document.body.classList.contains('tailwind') ? 
      'text-xl font-semibold mb-3' : 
      'feature-title';
    title.textContent = feature.title;
    
    const description = document.createElement('p');
    description.textContent = feature.description;
    
    featureCard.appendChild(title);
    featureCard.appendChild(description);
    featuresContainer.appendChild(featureCard);
  });
}

// Set up event listeners
function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Contact form submission
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });
  
  // Handle anchor links smoothly
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
      
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return; // Handle empty href="#"
      
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(contactForm);
  const formValues = {};
  
  for (let [key, value] of formData.entries()) {
    formValues[key] = value;
  }
  
  // In a real application, you would send this data to your backend
  console.log('Form submitted with:', formValues);
  
  // Show success message
  alert('Thank you for your message! We will get back to you soon.');
  contactForm.reset();
}
`);

  // Create CSS if not using Tailwind
  if (!hasTailwind) {
    zip.file("css/styles.css", `
:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
  --light-bg: #f9fafb;
  --dark-bg: #111827;
  --light-text: #1f2937;
  --dark-text: #f9fafb;
  --light-card-bg: #ffffff;
  --dark-card-bg: #1f2937;
  --light-input-bg: #ffffff;
  --dark-input-bg: #374151;
  --light-border: #e5e7eb;
  --dark-border: #4b5563;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  background-color: var(--light-bg);
  color: var(--light-text);
  transition: background-color 0.3s, color 0.3s;
}

body[data-theme="dark"] {
  background-color: var(--dark-bg);
  color: var(--dark-text);
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  background-color: var(--light-card-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background-color 0.3s;
}

body[data-theme="dark"] .header {
  background-color: var(--dark-card-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
}

.nav-links {
  display: none;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .mobile-toggle {
    display: none;
  }
}

.nav-links a:hover {
  color: var(--primary-color);
}

.theme-toggle, 
.mobile-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle {
  background-color: var(--light-border);
  border-radius: 9999px;
  height: 36px;
  width: 36px;
}

body[data-theme="dark"] .theme-toggle {
  background-color: var(--dark-border);
}

.mobile-menu {
  padding: 1rem 0;
  display: none;
  background-color: var(--light-card-bg);
}

body[data-theme="dark"] .mobile-menu {
  background-color: var(--dark-card-bg);
}

.mobile-menu.hidden {
  display: none;
}

.mobile-link {
  display: block;
  padding: 0.5rem 1rem;
}

.mobile-link:hover {
  color: var(--primary-color);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.hero-section {
  padding: 3rem 0;
  text-align: center;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 42rem;
  margin: 0 auto 2rem;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: var(--light-border);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
}

body[data-theme="dark"] .btn-secondary {
  background-color: var(--dark-border);
}

.btn-secondary:hover {
  opacity: 0.9;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
}

.subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
}

.features-section,
.about-section,
.contact-section {
  padding: 3rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background-color: var(--light-card-bg);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  transition: background-color 0.3s;
}

body[data-theme="dark"] .card {
  background-color: var(--dark-card-bg);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.contact-container {
  max-width: 36rem;
  margin: 0 auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--light-border);
  border-radius: 0.25rem;
  background-color: var(--light-input-bg);
  transition: border-color 0.2s, background-color 0.3s;
}

body[data-theme="dark"] .form-input,
body[data-theme="dark"] .form-textarea {
  border-color: var(--dark-border);
  background-color: var(--dark-input-bg);
  color: var(--dark-text);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.tech-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.footer {
  padding: 1.5rem 0;
  margin-top: 2rem;
  background-color: var(--light-card-bg);
  border-top: 1px solid var(--light-border);
  transition: background-color 0.3s, border-color 0.3s;
}

body[data-theme="dark"] .footer {
  background-color: var(--dark-card-bg);
  border-top-color: var(--dark-border);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.copyright {
  color: #6b7280;
}

body[data-theme="dark"] .copyright {
  color: #9ca3af;
}

.social-links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  color: #6b7280;
}

.social-link:hover {
  color: var(--primary-color);
}

body[data-theme="dark"] .social-link {
  color: #9ca3af;
}
`);
  }

  // Create README.md
  zip.file("README.md", `# ${projectName}

${projectDescription || 'A modern web project'}

## About

This project is a lightweight web application built with standard web technologies${techStacks.includes('tailwind') ? ' including Tailwind CSS' : ''}.

## Features

- Responsive design for all devices
- Dark/light mode toggle
- Contact form
- Modern UI

## Getting Started

1. Clone the repository
2. Open index.html in your browser or set up a local server
   \`\`\`
   npx serve
   \`\`\`
3. Start customizing the content and styles

## Technologies Used

${techStacks.map(tech => '- ' + tech.charAt(0).toUpperCase() + tech.slice(1)).join('\n')}

## License

MIT
`);
}

// Integrate with GROQ API for AI-powered generation
export const integrateWithGroq = async (
  projectName: string,
  projectDescription: string,
  techStack: string[],
  pages: { name: string; path: string; description: string }[]
): Promise<string> => {
  try {
    if (!GROQ_API_KEY) {
      throw new Error("GROQ API key is not configured. Using template-based generation instead.");
    }

    // Create a new JSZip instance
    const zip = new JSZip();
    
    // Set up the prompt for GROQ API
    const prompt = `
      Generate a web project called "${projectName}" with the following description: "${projectDescription}".
      The project uses the following technologies: ${techStack.join(", ")}.
      
      The project should have these pages:
      ${pages.map(page => `- ${page.name} (${page.path}): ${page.description}`).join("\n")}
      
      Please provide complete, working code for all necessary files including:
      1. HTML files for each page
      2. CSS styles (Tailwind classes or custom CSS based on tech stack)
      3. JavaScript/TypeScript functionality
      4. Package.json and configuration files
      5. README.md
      
      Make sure the code is well-structured, follows best practices, and is fully functional.
      Use modern features and techniques appropriate for the chosen tech stack.
    `;

    // Call GROQ API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: "You are an expert full-stack developer who creates comprehensive, production-ready web applications with clean, optimized code."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 32000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate project with GROQ API");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Extract file content using regex
    const fileRegex = /```(?:html|css|javascript|typescript|js|ts|jsx|tsx|json|md|bash)(?:[^\n]*)\s*([\s\S]*?)```/g;
    let match;
    let fileCount = 0;

    while ((match = fileRegex.exec(content)) !== null) {
      const fileContent = match[1].trim();
      const fileTypeMatch = match[0].match(/```(\w+)/);
      const fileType = fileTypeMatch ? fileTypeMatch[1] : "txt";
      
      // Try to extract filename from comments or code context
      const fileNameMatch = fileContent.match(/(?:^|\n)(?:\/\/|\/\*|#|<!--)\s*filename:\s*([^\n\*\/]+)/i);
      const fileName = fileNameMatch 
        ? fileNameMatch[1].trim() 
        : `file-${fileCount}.${getExtensionFromType(fileType)}`;
      
      zip.file(fileName, fileContent);
      fileCount++;
    }
    
    // If no files were extracted using regex, create a basic structure
    if (fileCount === 0) {
      // Extract what appear to be code blocks even without proper markdown formatting
      const basicCodeBlockRegex = /(?:(?:\/\/|\/\*|#|<!--)\s*filename:\s*([^\n\*\/]+)[^\n]*\n)([\s\S]*?)(?:\n\s*(?:\/\/|\/\*|#|<!--)\s*end\s*(?:\*\/|-->)?|$)/gi;
      let basicMatch;
      
      while ((basicMatch = basicCodeBlockRegex.exec(content)) !== null) {
        const fileName = basicMatch[1].trim();
        const fileContent = basicMatch[2].trim();
        
        if (fileName && fileContent) {
          zip.file(fileName, fileContent);
          fileCount++;
        }
      }
      
      // If still no files, create a minimal project
      if (fileCount === 0) {
        const themeColors = getThemeColors("blue");
        
        if (techStack.includes("react")) {
          createReactProject(zip, projectName, projectDescription, techStack, themeColors);
        } else if (techStack.includes("vue")) {
          createVueProject(zip, projectName, projectDescription, techStack, themeColors);
        } else if (techStack.includes("alpine")) {
          createAlpineProject(zip, projectName, projectDescription, techStack, themeColors);
        } else {
          createBasicProject(zip, projectName, projectDescription, techStack, themeColors);
        }
        
        // Add a note about the fallback
        zip.file("README.md", `# ${projectName}

${projectDescription}

## About This Project

This project was generated using the AI Template Generator with the following configuration:

- Project Name: ${projectName}
- Tech Stack: ${techStack.join(', ')}

**Note:** This is a fallback template as the AI-generated content couldn't be parsed correctly.

## Pages

${pages.map(page => `- ${page.name} (${page.path}): ${page.description}`).join('\n')}

## Getting Started

1. Extract the ZIP file
2. Open the folder in your favorite code editor
3. Follow the setup instructions in the specific technology documentation

## License

MIT
`);
      }
    }

    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: "blob" });
    
    // Return the download URL
    return URL.createObjectURL(zipContent);
  } catch (error) {
    console.error("Error in AI project generation:", error);
    // Fall back to template-based generation
    const themeColors = getThemeColors("blue");
    return generateCustomProject(projectName, projectDescription, techStack, "blue");
  }
};

// Helper to determine file extension from code type
function getExtensionFromType(fileType: string): string {
  const typeToExt: Record<string, string> = {
    html: "html",
    css: "css",
    javascript: "js",
    js: "js",
    typescript: "ts",
    ts: "ts",
    jsx: "jsx",
    tsx: "tsx",
    json: "json",
    md: "md",
    bash: "sh"
  };
  
  return typeToExt[fileType] || "txt";
}

// Exporting AI service integration
export const generateProject = async (project: any): Promise<any> => {
  // This is a wrapper for the AI service, maintained for backward compatibility
  return project;
};

export const downloadProject = async (project: any): Promise<string> => {
  try {
    // Generate project using selected tech stacks as a fallback
    return generateCustomProject(
      project.projectName, 
      project.description,
      ["react", "tailwind"],
      "blue"
    );
  } catch (error) {
    console.error("Error downloading project:", error);
    throw new Error("Failed to download project");
  }
};
