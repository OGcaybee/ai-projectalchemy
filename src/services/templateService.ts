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
    image: templateThumbnails.portfolio,
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
    image: templateThumbnails.adminDashboard,
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
    image: templateThumbnails.portfolio,
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

// Enhanced download function with better error handling and fallbacks
export const downloadTemplate = async (template: Template, customDescription?: string): Promise<string> => {
  try {
    console.log("Starting template download for:", template.name);
    if (customDescription) {
      console.log("Custom description provided:", customDescription);
    }
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a new JSZip instance
    const zip = new JSZip();
    let filesAdded = 0;
    
    // If the template has a GitHub URL, try to fetch files from the repository
    if (template.githubUrl) {
      try {
        console.log("Fetching from GitHub URL:", template.githubUrl);
        
        // Convert GitHub repository URL to raw content URL format
        // Try multiple branches since we don't know which one is the default
        const branches = ['main', 'master'];
        let successfulBranch = null;
        
        for (const branch of branches) {
          if (successfulBranch) continue;
          
          const rawBaseUrl = template.githubUrl
            .replace('github.com', 'raw.githubusercontent.com')
            .replace(/\/$/, '') + `/${branch}/`;
          
          console.log("Attempting to fetch from branch:", branch, "URL:", rawBaseUrl);
          
          // First check if the branch exists by fetching a common file like README.md
          try {
            const testResponse = await fetch(`${rawBaseUrl}README.md`);
            if (testResponse.ok) {
              successfulBranch = branch;
              console.log("Found valid branch:", branch);
            }
          } catch (error) {
            console.log(`Branch ${branch} appears invalid:`, error);
            continue;
          }
          
          if (!successfulBranch) continue;
          
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
                filesAdded++;
                console.log(`Successfully fetched ${file}`);
              }
            } catch (error) {
              console.log(`Could not fetch ${file} from GitHub:`, error);
            }
          }
          
          // Try to fetch additional directories
          const dirsToFetch = ['src', 'public', 'assets', 'css', 'js', 'images'];
          
          for (const dir of dirsToFetch) {
            // For simplicity, we'll just add a placeholder file to indicate these directories
            // In a real implementation, you'd recursively fetch directory contents
            zip.file(`${dir}/.gitkeep`, "This directory was detected but files were not fetched individually");
            filesAdded++;
          }
        }
      } catch (error) {
        console.error("Error fetching files from GitHub:", error);
        toast.error("Could not fetch files from GitHub. Falling back to template generation.");
      }
    }
    
    // Get the theme colors based on the custom theme selection
    const themeColors = getThemeColors(template.customTheme);
    
    // If we couldn't fetch any files from GitHub or there's no GitHub URL,
    // generate template files based on the template data
    if (filesAdded === 0) {
      console.log("No files fetched from GitHub, generating template files");
      
      // Create project files with the proper structure
      const projectDescription = customDescription || template.description;
      
      // Generate files based on the template's tech stack
      if (template.techStack.includes('React')) {
        createReactTemplate(zip, template, projectDescription, themeColors);
      } else if (template.techStack.includes('Vue')) {
        createVueTemplate(zip, template, projectDescription, themeColors);
      } else {
        createBasicTemplate(zip, template, projectDescription, themeColors);
      }
      
      console.log("Template files generated successfully");
    }
    
    // Add README file regardless of source
    addReadmeFile(zip, template, customDescription);
    
    // Generate a more substantial zip with actual content
    console.log("Generating ZIP file");
    const zipContent = await zip.generateAsync({ type: "blob" });
    
    // Create a URL for the blob
    const downloadUrl = URL.createObjectURL(zipContent);
    console.log("Download URL created:", downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error("Error downloading template:", error);
    
    // Create an emergency fallback ZIP with minimal content
    try {
      console.log("Creating emergency fallback ZIP");
      const zip = new JSZip();
      
      zip.file("README.md", `# ${template.name}\n\n${template.description}\n\nThis is a fallback template with minimal content due to an error in the download process.`);
      zip.file("index.html", `<!DOCTYPE html>
<html>
<head>
  <title>${template.name}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }</style>
</head>
<body>
  <h1>${template.name}</h1>
  <p>${template.description}</p>
  <p>This is a fallback template created due to an error in the download process.</p>
  <h2>Tech Stack</h2>
  <ul>${template.techStack.map(tech => `<li>${tech}</li>`).join('')}</ul>
</body>
</html>`);
      
      const zipContent = await zip.generateAsync({ type: "blob" });
      toast.warning("Using fallback template due to download issues");
      return URL.createObjectURL(zipContent);
    } catch (fallbackError) {
      console.error("Even fallback creation failed:", fallbackError);
      throw new Error("Failed to download template");
    }
  }
};

// Generate a React application template
function createReactTemplate(zip: JSZip, template: Template, description: string, themeColors: { primary: string, secondary: string, accent: string }) {
  // Create basic project structure
  const src = zip.folder("src");
  src?.folder("components");
  src?.folder("pages");
  src?.folder("styles");
  src?.folder("assets");
  src?.folder("utils");
  
  // Create main files
  zip.file("package.json", `{
  "name": "${template.name.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "${description}",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    ${generateDependencies(template.techStack)}
  },
  "devDependencies": {
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.3.3",
    "postcss": "^8.4.30",
    "autoprefixer": "^10.4.16"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`);

  // Create React app entry point
  src?.file("index.js", `import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`);

  // Create main App component
  src?.file("App.js", `import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
`);

  // Create components
  src?.file("components/Header.js", `import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl font-bold" style={{ color: "${themeColors.primary}" }}>
          ${template.name}
        </h1>
        <p className="text-gray-500">${description}</p>
      </div>
    </header>
  );
}

export default Header;
`);

  src?.file("components/Footer.js", `import React from 'react';

function Footer() {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-gray-500">
          Built with ${template.techStack.join(', ')}
        </p>
        <p className="text-center text-gray-400 text-sm mt-2">
          © ${new Date().getFullYear()} ${template.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
`);

  src?.file("components/Dashboard.js", `import React, { useState } from 'react';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const features = [
    'Responsive design',
    'Modern UI components',
    'Customizable themes',
    'Easy to integrate',
    'Well documented'
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="tabs flex border-b mb-6">
        <button 
          onClick={() => setActiveTab('overview')}
          className={\`px-4 py-2 font-medium \${activeTab === 'overview' ? 'border-b-2 border-blue-500' : 'text-gray-500'}\`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('features')}
          className={\`px-4 py-2 font-medium \${activeTab === 'features' ? 'border-b-2 border-blue-500' : 'text-gray-500'}\`}
        >
          Features
        </button>
        <button 
          onClick={() => setActiveTab('tech')}
          className={\`px-4 py-2 font-medium \${activeTab === 'tech' ? 'border-b-2 border-blue-500' : 'text-gray-500'}\`}
        >
          Tech Stack
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "${themeColors.secondary}" }}>
            Project Overview
          </h2>
          <p className="mb-4">
            ${description}
          </p>
          <div className="mt-6 flex justify-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'features' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "${themeColors.secondary}" }}>
            Key Features
          </h2>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-green-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {activeTab === 'tech' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "${themeColors.secondary}" }}>
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {${JSON.stringify(template.techStack)}.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
`);

  // Create CSS files
  src?.file("styles/index.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafb;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}
`);

  src?.file("styles/App.css", `.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
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
}
`);

  // Create tailwind config
  zip.file("tailwind.config.js", `module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "${themeColors.primary}",
        secondary: "${themeColors.secondary}",
        accent: "${themeColors.accent}",
      },
    },
  },
  plugins: [],
};
`);

  // Create public directory with HTML
  const public_ = zip.folder("public");
  public_?.file("index.html", `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="${description}" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>${template.name}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`);

  public_?.file("manifest.json", `{
  "short_name": "${template.name}",
  "name": "${template.name}",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`);
}

// Generate a Vue application template
function createVueTemplate(zip: JSZip, template: Template, description: string, themeColors: { primary: string, secondary: string, accent: string }) {
  // Create basic project structure
  const src = zip.folder("src");
  src?.folder("components");
  src?.folder("views");
  src?.folder("assets");
  src?.folder("router");
  src?.folder("store");
  
  // Create main files
  zip.file("package.json", `{
  "name": "${template.name.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "${description}",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    ${generateDependencies(template.techStack)}
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "tailwindcss": "^3.3.3",
    "postcss": "^8.4.30",
    "autoprefixer": "^10.4.16"
  }
}`);

  // Create Vue app entry point
  src?.file("main.js", `import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

createApp(App).use(router).mount('#app')
`);

  // Create main App component
  src?.file("App.vue", `<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
`);

  // Create components
  src?.file("components/Header.vue", `<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 class="text-2xl font-bold" :style="{ color: primaryColor }">
        ${template.name}
      </h1>
      <p class="text-gray-500">${description}</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      primaryColor: '${themeColors.primary}'
    }
  }
}
</script>
`);

  src?.file("components/Footer.vue", `<template>
  <footer class="bg-white shadow-md mt-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <p class="text-center text-gray-500">
        Built with ${template.techStack.join(', ')}
      </p>
      <p class="text-center text-gray-400 text-sm mt-2">
        © {{ new Date().getFullYear() }} ${template.name}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
`);

  src?.file("views/Home.vue", `<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="tabs flex border-b mb-6">
      <button
        @click="activeTab = 'overview'"
        :class="['px-4', 'py-2', 'font-medium', activeTab === 'overview' ? 'border-b-2 border-blue-500' : 'text-gray-500']"
      >
        Overview
      </button>
      <button
        @click="activeTab = 'features'"
        :class="['px-4', 'py-2', 'font-medium', activeTab === 'features' ? 'border-b-2 border-blue-500' : 'text-gray-500']"
      >
        Features
      </button>
      <button
        @click="activeTab = 'tech'"
        :class="['px-4', 'py-2', 'font-medium', activeTab === 'tech' ? 'border-b-2 border-blue-500' : 'text-gray-500']"
      >
        Tech Stack
      </button>
    </div>
    
    <div v-if="activeTab === 'overview'" class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4" :style="{ color: secondaryColor }">
        Project Overview
      </h2>
      <p class="mb-4">
        ${description}
      </p>
      <div class="mt-6 flex justify-center">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Get Started
        </button>
      </div>
    </div>
    
    <div v-if="activeTab === 'features'" class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4" :style="{ color: secondaryColor }">
        Key Features
      </h2>
      <ul class="space-y-2">
        <li v-for="(feature, index) in features" :key="index" class="flex items-start">
          <span class="mr-2 text-green-500">✓</span>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </div>
    
    <div v-if="activeTab === 'tech'" class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4" :style="{ color: secondaryColor }">
        Technology Stack
      </h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="(tech, index) in techStack" :key="index" class="px-3 py-1 bg-gray-100 rounded-full text-sm">
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeTab: 'overview',
      secondaryColor: '${themeColors.secondary}',
      features: [
        'Responsive design',
        'Modern UI components',
        'Customizable themes',
        'Easy to integrate',
        'Well documented'
      ],
      techStack: ${JSON.stringify(template.techStack)}
    }
  }
}
</script>
`);

  // Create CSS
  src?.file("assets/styles/main.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}

body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafb;
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
}
`);

  // Create router
  src?.file("router/index.js", `import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
`);

  // Create tailwind config
  zip.file("tailwind.config.js", `module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "${themeColors.primary}",
        secondary: "${themeColors.secondary}",
        accent: "${themeColors.accent}",
      },
    },
  },
  plugins: [],
}
`);

  // Create Vue config
  zip.file("vue.config.js", `module.exports = {
  publicPath: '/',
  lintOnSave: false
}
`);

  // Create public directory with HTML
  const public_ = zip.folder("public");
  public_?.file("index.html", `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>${template.name}</title>
    <meta name="description" content="${description}">
  </head>
  <body>
    <noscript>
      <strong>We're sorry but ${template.name} doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
`);
}

// Generate a basic HTML/CSS/JS template
function createBasicTemplate(zip: JSZip, template: Template, description: string, themeColors: { primary: string, secondary: string, accent: string }) {
  // Create CSS folder and file
  const stylesFolder = zip.folder("styles");
  stylesFolder?.file("main.css", `:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  color: #333;
  line-height: 1.5;
  background-color: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
}

header h1 {
  color: var(--primary-color);
  margin-bottom: 8px;
}

main {
  padding: 40px 0;
}

.tab-container {
  margin-bottom: 30px;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
}

.tab.active {
  border-bottom: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.tab:not(.active) {
  color: #6b7280;
}

.tab-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-top: 20px;
}

.feature-list {
  list-style: none;
  margin-top: 16px;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.feature-list li::before {
  content: "✓";
  color: var(--accent-color);
  margin-right: 8px;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tech-tag {
  background-color: #f3f4f6;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
  display: inline-block;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}

.text-center {
  text-align: center;
}

footer {
  background-color: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px 0;
  margin-top: 40px;
}

footer p {
  color: #6b7280;
  text-align: center;
}

h2 {
  color: var(--secondary-color);
  margin-bottom: 16px;
}

.mt-20 {
  margin-top: 20px;
}

@media (max-width: 640px) {
  .tabs {
    flex-direction: column;
  }
  
  .tab {
    padding: 10px;
  }
}
`);

  // Create JS folder and file
  const jsFolder = zip.folder("src");
  jsFolder?.file("main.js", `document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Initialize tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      
      // Deactivate all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.style.display = 'none');
      
      // Activate clicked tab
      tab.classList.add('active');
      document.getElementById(target).style.display = 'block';
    });
  });
  
  // Set default active tab
  document.querySelector('.tab').click();
  
  // Initialize any other interactive elements
  const startButton = document.querySelector('.btn-primary');
  if (startButton) {
    startButton.addEventListener('click', () => {
      alert('Welcome to ${template.name}!');
    });
  }
});
`);

  // Create HTML file
  zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
  <header>
    <div class="container">
      <h1>${template.name}</h1>
      <p>${description}</p>
    </div>
  </header>
  
  <main>
    <div class="container">
      <div class="tab-container">
        <div class="tabs">
          <div class="tab active" data-target="overview">Overview</div>
          <div class="tab" data-target="features">Features</div>
          <div class="tab" data-target="tech">Tech Stack</div>
        </div>
        
        <div id="overview" class="tab-content">
          <h2>Project Overview</h2>
          <p>${description}</p>
          <div class="text-center mt-20">
            <button class="btn-primary">Get Started</button>
          </div>
        </div>
        
        <div id="features" class="tab-content" style="display: none;">
          <h2>Key Features</h2>
          <ul class="feature-list">
            <li>Responsive design</li>
            <li>Modern UI components</li>
            <li>Customizable themes</li>
            <li>Easy to integrate</li>
            <li>Well documented</li>
          </ul>
        </div>
        
        <div id="tech" class="tab-content" style="display: none;">
          <h2>Technology Stack</h2>
          <div class="tech-stack">
            ${template.techStack.map(tech => `<div class="tech-tag">${tech}</div>`).join('\n            ')}
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <footer>
    <div class="container">
      <p>Built with ${template.techStack.join(', ')}</p>
      <p>© ${new Date().getFullYear()} ${template.name}. All rights reserved.</p>
    </div>
  </footer>
  
  <script src="./src/main.js"></script>
</body>
</html>
`);
}

// Add a README file to the zip
function addReadmeFile(zip: JSZip, template: Template, customDescription?: string) {
  const description = customDescription || template.description;
  
  zip.file("README.md", `# ${template.name}

${description}

## About This Project

This project was generated using the Thynk AI Template Customizer with the following configuration:

- **Template:** ${template.name}
- **Theme:** ${template.customTheme || 'Default'}
- **Tech Stack:** ${template.techStack.join(', ')}

## Getting Started

1. Extract the ZIP file
2. Open the folder in your favorite code editor
3. Follow the setup instructions below based on the tech stack

${template.techStack.includes('React') 
  ? `### For React Projects
1. Install dependencies: \`npm install\`
2. Start development server: \`npm start\`
3. Build for production: \`npm run build\`` 
  : template.techStack.includes('Vue') 
  ? `### For Vue Projects
1. Install dependencies: \`npm install\`
2. Start development server: \`npm run serve\`
3. Build for production: \`npm run build\``
  : `### For HTML/CSS/JS Projects
1. For a quick preview, open the index.html file in your browser
2. For development, it's recommended to set up a local server:
   \`\`\`
   npx serve
   \`\`\``}

## Features

- Responsive design for all device sizes
- Modern UI components
- Customizable theme colors
- Easy to extend

## Project Structure

${template.techStack.includes('React') 
  ? `- **src/**
  - **components/**: Reusable UI components
  - **pages/**: Page components
  - **styles/**: CSS files
  - **utils/**: Utility functions
  - **assets/**: Static assets`
  : template.techStack.includes('Vue')
  ? `- **src/**
  - **components/**: Vue components
  - **views/**: Vue pages
  - **assets/styles/**: CSS files
  - **router/**: Vue Router setup
  - **store/**: Vuex store (if applicable)`
  : `- **index.html**: Main HTML file
- **styles/**: CSS stylesheets
- **src/**: JavaScript files
- **assets/**: Images and other static assets`}

## Credits

Original template by: ${template.author || 'Template Creator'}
${template.githubUrl ? `GitHub: ${template.githubUrl}` : ''}

## License

MIT
`);
}

// Helper function to generate dependencies based on tech stack
function generateDependencies(techStack: string[]): string {
  const deps: Record<string, string> = {};
  
  if (techStack.includes('React')) {
    deps['react'] = '"^18.2.0"';
    deps['react-dom'] = '"^18.2.0"';
    deps['react-router-dom'] = '"^6.15.0"';
  }
  if (techStack.includes('Vue')) {
    deps['vue'] = '"^3.3.4"';
    deps['vue-router'] = '"^4.2.4"';
  }
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

// Import the Groq service functionality for AI-generated projects
export const integrateWithGroq = async (template: Template, customDescription?: string): Promise<string> => {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();
    
    // Get theme colors
    const themeColors = getThemeColors(template.customTheme);
    
    // Generate files based on AI service
    // This is a placeholder for actual AI integration
    // In a real implementation, this would call an AI service
    
    // For now, just create standard files based on the template
    if (template.techStack.includes('React')) {
      createReactTemplate(zip, template, customDescription || template.description, themeColors);
    } else if (template.techStack.includes('Vue')) {
      createVueTemplate(zip, template, customDescription || template.description, themeColors);
    } else {
      createBasicTemplate(zip, template, customDescription || template.description, themeColors);
    }
    
    // Add README
    addReadmeFile(zip, template, customDescription);
    
    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: "blob" });
    
    return URL.createObjectURL(zipContent);
  } catch (error) {
    console.error("Error integrating with AI:", error);
    // Fallback to regular template download
    return downloadTemplate(template, customDescription);
  }
};

// New function to get templates by search query
export const getTemplatesBySearch = async (query: string): Promise<Template[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query.trim()) return templates;
  
  const searchQuery = query.toLowerCase();
  return templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery) ||
    template.description.toLowerCase().includes(searchQuery) ||
    template.category.toLowerCase().includes(searchQuery) ||
    template.techStack.some(tech => tech.toLowerCase().includes(searchQuery))
  );
};

// Add a new helper function to customize a template
export const customizeTemplate = async (
  templateId: string, 
  customizations: { 
    name?: string;
    description?: string; 
    theme?: string;
    techStack?: string[];
  }
): Promise<string> => {
  try {
    const template = await getTemplateById(templateId);
    
    if (!template) {
      throw new Error("Template not found");
    }
    
    // Create a customized version of the template
    const customizedTemplate: Template = {
      ...template,
      name: customizations.name || template.name,
      description: customizations.description || template.description,
      customTheme: customizations.theme || template.customTheme,
      techStack: customizations.techStack || template.techStack
    };
    
    // Use the enhanced download function
    return downloadTemplate(customizedTemplate, customizations.description);
  } catch (error) {
    console.error("Error customizing template:", error);
    throw new Error("Failed to customize template");
  }
};
