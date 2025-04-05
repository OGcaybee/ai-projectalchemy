
import { ProjectRequirement, GeneratedProject } from '@/services/aiService';
import { enhanceProject, EnhancedProject } from '@/services/projectEnhancer';
import { toast } from 'sonner';

/**
 * Enhanced AI service for more detailed project generation
 */
export const generateEnhancedProject = async (requirements: ProjectRequirement): Promise<EnhancedProject> => {
  try {
    toast.info("Starting enhanced project generation...");
    
    // First, generate the base project using the original service
    const baseProject = await import('@/services/aiService').then(module => {
      return module.generateProject(requirements);
    });
    
    toast.info("Enhancing project with additional details...");
    
    // Enhance the base project with more detailed structure and content
    const enhancedProject = enhanceProject(baseProject, requirements);
    
    // Add more CSS styling to the project
    enhancedProject.codeSnippets.frontend = addEnhancedStyling(
      enhancedProject.codeSnippets.frontend, 
      requirements.themeColor || 'default'
    );
    
    toast.success("Enhanced project generated successfully!");
    return enhancedProject;
    
  } catch (error) {
    console.error("Error generating enhanced project:", error);
    toast.error("Failed to generate enhanced project. Using standard generation.");
    
    // Fallback to standard generation
    const baseProject = await import('@/services/aiService').then(module => {
      return module.generateProject(requirements);
    });
    
    return enhanceProject(baseProject, requirements);
  }
};

/**
 * Add enhanced styling to the project HTML
 */
const addEnhancedStyling = (html: string, themeColor: string): string => {
  // Extract any existing CSS
  const existingCssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const existingCss = existingCssMatch ? existingCssMatch[1] : '';
  
  // Define theme color palette
  const colorPalettes = {
    default: {
      primary: '#7c3aed',
      primaryDark: '#6d28d9',
      primaryLight: '#a78bfa',
      secondary: '#4285f4',
      secondaryDark: '#2563eb', 
      secondaryLight: '#60a5fa',
      accent: '#f472b6',
      background: '#f9fafb',
      text: '#111827',
      textLight: '#6b7280'
    },
    green: {
      primary: '#059669',
      primaryDark: '#047857',
      primaryLight: '#34d399',
      secondary: '#10b981',
      secondaryDark: '#065f46',
      secondaryLight: '#6ee7b7',
      accent: '#fbbf24',
      background: '#f0fdf4',
      text: '#064e3b',
      textLight: '#374151'
    },
    blue: {
      primary: '#2563eb',
      primaryDark: '#1d4ed8',
      primaryLight: '#60a5fa',
      secondary: '#3b82f6',
      secondaryDark: '#1e40af',
      secondaryLight: '#93c5fd',
      accent: '#f43f5e',
      background: '#eff6ff',
      text: '#1e3a8a',
      textLight: '#374151'
    },
    red: {
      primary: '#dc2626',
      primaryDark: '#b91c1c',
      primaryLight: '#f87171',
      secondary: '#ef4444',
      secondaryDark: '#991b1b',
      secondaryLight: '#fca5a5',
      accent: '#3b82f6',
      background: '#fef2f2',
      text: '#7f1d1d',
      textLight: '#374151'
    },
    orange: {
      primary: '#ea580c',
      primaryDark: '#c2410c',
      primaryLight: '#fb923c',
      secondary: '#f97316',
      secondaryDark: '#9a3412',
      secondaryLight: '#fdba74',
      accent: '#2563eb',
      background: '#fff7ed',
      text: '#7c2d12',
      textLight: '#374151'
    },
    pink: {
      primary: '#db2777',
      primaryDark: '#be185d',
      primaryLight: '#f472b6',
      secondary: '#ec4899',
      secondaryDark: '#9d174d',
      secondaryLight: '#f9a8d4',
      accent: '#3b82f6',
      background: '#fdf2f8',
      text: '#831843',
      textLight: '#374151'
    }
  };
  
  const colors = colorPalettes[themeColor as keyof typeof colorPalettes] || colorPalettes.default;
  
  // Create enhanced CSS
  const enhancedCss = `
/* Enhanced styles for ${themeColor} theme */
:root {
  --primary: ${colors.primary};
  --primary-dark: ${colors.primaryDark};
  --primary-light: ${colors.primaryLight};
  --secondary: ${colors.secondary};
  --secondary-dark: ${colors.secondaryDark};
  --secondary-light: ${colors.secondaryLight};
  --accent: ${colors.accent};
  --background: ${colors.background};
  --text: ${colors.text};
  --text-light: ${colors.textLight};
  --container-padding: 2rem;
  --border-radius: 0.5rem;
  --transition: all 0.3s ease;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text);
  line-height: 1.6;
  background-color: var(--background);
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

nav a {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

nav a:hover, nav a.active {
  color: var(--primary);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
}

.btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.btn.btn-secondary {
  background-color: var(--secondary);
}

.btn.btn-secondary:hover {
  background-color: var(--secondary-dark);
}

.btn.btn-outline {
  background-color: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

.btn.btn-outline:hover {
  background-color: var(--primary);
  color: white;
}

.hero {
  padding: 5rem 0;
  background: linear-gradient(to right, var(--background), white);
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--primary);
}

.hero p {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  max-width: 600px;
}

.features {
  padding: 5rem 0;
}

.features h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--primary);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary);
}

.cta {
  background-color: var(--primary);
  color: white;
  padding: 5rem 0;
  text-align: center;
}

.cta h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta .btn {
  background-color: white;
  color: var(--primary);
}

.cta .btn:hover {
  background-color: var(--background);
}

footer {
  background-color: white;
  padding: 2rem 0;
  text-align: center;
  color: var(--text-light);
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  nav ul {
    gap: 1rem;
  }
}

/* Product grid for e-commerce */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  border-radius: var(--border-radius);
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
}

.product-image {
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 1.5rem;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
  margin-top: 0.5rem;
}

/* Blog/article styling */
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  border-radius: var(--border-radius);
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
}

.article-image {
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-info {
  padding: 1.5rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  color: var(--text-light);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

/* Dashboard layout */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 16rem;
  background-color: var(--primary-dark);
  color: white;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-nav {
  padding: 1.5rem 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: var(--transition);
}

.sidebar-nav a:hover, .sidebar-nav a.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.main-content {
  flex: 1;
  overflow: auto;
}

.dash-header {
  background-color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dashboard-content {
  padding: 1.5rem;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-light);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.stat {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

/* Utility classes */
.text-center {
  text-align: center;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }

${existingCss}
`;

  // Replace any existing style tag or add new one if none exists
  if (existingCssMatch) {
    return html.replace(/<style>[\s\S]*?<\/style>/, `<style>${enhancedCss}</style>`);
  } else {
    return html.replace('</head>', `<style>${enhancedCss}</style></head>`);
  }
};

/**
 * Download the enhanced project with proper structure
 */
export const downloadEnhancedProject = async (project: EnhancedProject): Promise<string> => {
  try {
    // Use the existing download function from aiService
    return await import('@/services/aiService').then(module => {
      return module.downloadProject(project);
    });
  } catch (error) {
    console.error("Error downloading enhanced project:", error);
    toast.error("Failed to download enhanced project");
    throw error;
  }
};
