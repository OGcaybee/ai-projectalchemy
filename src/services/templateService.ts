
import { templateThumbnails } from "@/assets/template-thumbnails";
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

// Updated template data with real-world projects and working repositories
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
    name: "Material Tailwind Dashboard",
    description: "Feature-rich admin panel with dark mode and multiple layouts",
    category: "Admin Dashboard",
    image: templateThumbnails.adminDashboard,
    techStack: ["React", "Tailwind CSS", "Material UI", "Chart.js"],
    popularity: 68,
    author: "themesberg",
    githubUrl: "https://github.com/themesberg/material-tailwind-dashboard-react"
  },
  {
    id: "template-12",
    name: "Leerob.io Portfolio",
    description: "Minimalist portfolio by Vercel's VP of Product",
    category: "Portfolio",
    image: templateThumbnails.portfolio,
    techStack: ["React", "Next.js", "Tailwind CSS", "MDX"],
    popularity: 65,
    author: "leerob",
    githubUrl: "https://github.com/leerob/leerob.io"
  },
  {
    id: "template-13",
    name: "T3 Stack Starter",
    description: "Full-stack starter with tRPC, Prisma, and Next.js",
    category: "SaaS",
    image: templateThumbnails.saas,
    techStack: ["Next.js", "tRPC", "Prisma", "TypeScript"],
    popularity: 89,
    author: "t3-oss",
    githubUrl: "https://github.com/t3-oss/create-t3-app"
  },
  {
    id: "template-14",
    name: "Shopify Storefront",
    description: "Headless Shopify storefront using React and GraphQL",
    category: "E-commerce",
    image: templateThumbnails.ecommerce,
    techStack: ["React", "Shopify", "GraphQL", "Tailwind CSS"],
    popularity: 83,
    author: "Shopify",
    githubUrl: "https://github.com/Shopify/storefront-api-examples"
  },
  {
    id: "template-15",
    name: "ChatGPT Clone",
    description: "AI chat application with OpenAI integration",
    category: "SaaS",
    image: templateThumbnails.saas,
    techStack: ["React", "Node.js", "OpenAI API", "Tailwind CSS"],
    popularity: 91,
    author: "mckaywrigley",
    githubUrl: "https://github.com/mckaywrigley/chatbot-ui"
  },
  {
    id: "template-16",
    name: "Travel Agency Website",
    description: "Modern travel website with booking functionality",
    category: "Landing Page",
    image: templateThumbnails.landingPage,
    techStack: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    popularity: 77,
    author: "adrianhajdin",
    githubUrl: "https://github.com/adrianhajdin/project_travel_advisor"
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

// This function now redirects to GitHub instead of generating a ZIP file
export const downloadTemplate = async (template: Template): Promise<string> => {
  try {
    // Redirect to GitHub directly
    if (template.githubUrl) {
      return template.githubUrl;
    } else {
      throw new Error("Repository URL not available");
    }
  } catch (error) {
    console.error("Error preparing template:", error);
    throw new Error("Failed to prepare template");
  }
};

// Helper function to get theme colors based on selection (kept in case we need it)
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
