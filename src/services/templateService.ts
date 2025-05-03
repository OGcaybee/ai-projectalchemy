
import { GROQ_API_KEY } from '@/config';
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

// Template thumbnail constants to be imported from elsewhere if needed
const templateThumbnails = {
  dashboard: "/template-thumbnails/dashboard.jpg",
  ecommerce: "/template-thumbnails/ecommerce.jpg",
  portfolio: "/template-thumbnails/portfolio.jpg",
  blog: "/template-thumbnails/blog.jpg",
  saas: "/template-thumbnails/saas.jpg",
  mobileApp: "/template-thumbnails/mobile-app.jpg",
  landingPage: "/template-thumbnails/landing-page.jpg",
  adminDashboard: "/template-thumbnails/admin-dashboard.jpg",
  contentBlog: "/template-thumbnails/content-blog.jpg",
  analyticsApp: "/template-thumbnails/analytics-app.jpg",
  ecommerceMobile: "/template-thumbnails/ecommerce-mobile.jpg",
  personalPortfolio: "/template-thumbnails/personal-portfolio.jpg",
  default: "/template-thumbnails/default.jpg"
};

// Adding back the TECH_STACK_OPTIONS constant that AIPlusGenerator needs
export const TECH_STACK_OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "alpine", label: "Alpine.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "node", label: "Node.js" }
];

export const getTemplateThumbnail = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'dashboard': return templateThumbnails.dashboard;
    case 'e-commerce': return templateThumbnails.ecommerce;
    case 'portfolio': return templateThumbnails.portfolio;
    case 'blog': return templateThumbnails.blog;
    case 'saas': return templateThumbnails.saas;
    case 'mobile app': return templateThumbnails.mobileApp;
    case 'landing page': return templateThumbnails.landingPage;
    case 'admin dashboard': return templateThumbnails.adminDashboard;
    default: return templateThumbnails.default;
  }
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
    image: templateThumbnails.default, // Changed from photography to default
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

// Pre-created template content by template ID for immediate download
const templateContent: Record<string, Record<string, string>> = {
  "template-1": { // TailAdmin Dashboard
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TailAdmin Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
  <link rel="stylesheet" href="./styles/style.css">
</head>
<body class="bg-gray-100">
  <div x-data="{ sidebarOpen: false }" class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'" class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-primary overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <span class="text-white text-2xl mx-2 font-semibold">TailAdmin</span>
        </div>
      </div>

      <nav class="mt-10">
        <a class="flex items-center mt-4 py-2 px-6 bg-opacity-25 bg-gray-700 text-gray-100" href="index.html">
          <span class="mx-3">Dashboard</span>
        </a>
        <a class="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" href="#">
          <span class="mx-3">Analytics</span>
        </a>
        <a class="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" href="#">
          <span class="mx-3">Customers</span>
        </a>
        <a class="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" href="#">
          <span class="mx-3">Orders</span>
        </a>
        <a class="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" href="#">
          <span class="mx-3">Products</span>
        </a>
        <a class="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" href="#">
          <span class="mx-3">Settings</span>
        </a>
      </nav>
    </div>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="flex justify-between items-center py-4 px-6 bg-white">
        <div class="flex items-center">
          <button @click="sidebarOpen = !sidebarOpen" class="text-gray-500 focus:outline-none lg:hidden">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
        </div>
        
        <div class="flex items-center">
          <div x-data="{ notificationOpen: false }" class="relative">
            <button @click="notificationOpen = ! notificationOpen" class="flex mx-4 text-gray-600 focus:outline-none">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>

            <div x-show="notificationOpen" @click.away="notificationOpen = false" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50" style="display: none;">
              <div class="text-center p-4 bg-gray-100">Notifications</div>
              <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-primary -mx-2">
                <p class="text-sm mx-2">
                  <span class="font-bold">New Order</span> from Customer #2450
                </p>
              </a>
              <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-primary -mx-2">
                <p class="text-sm mx-2">
                  <span class="font-bold">Server Rebooted</span> successfully
                </p>
              </a>
            </div>
          </div>
          
          <div x-data="{ dropdownOpen: false }" class="relative">
            <button @click="dropdownOpen = ! dropdownOpen" class="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
              <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Your avatar">
            </button>

            <div x-show="dropdownOpen" @click.away="dropdownOpen = false" class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10" style="display: none;">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">Settings</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">Logout</a>
            </div>
          </div>
        </div>
      </header>
      
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="container mx-auto px-6 py-8">
          <h3 class="text-gray-700 text-3xl font-medium">Dashboard</h3>
          
          <div class="mt-4">
            <div class="flex flex-wrap -mx-6">
              <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                  <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                    <svg class="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none">
                      <path d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z" fill="currentColor"></path>
                      <path d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z" fill="currentColor"></path>
                      <path d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z" fill="currentColor"></path>
                      <path d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z" fill="currentColor"></path>
                      <path d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z" fill="currentColor"></path>
                      <path d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z" fill="currentColor"></path>
                    </svg>
                  </div>

                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">8,282</h4>
                    <div class="text-gray-500">New Users</div>
                  </div>
                </div>
              </div>

              <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                  <div class="p-3 rounded-full bg-orange-600 bg-opacity-75">
                    <svg class="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none">
                      <path d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z" fill="currentColor"></path>
                      <path d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z" fill="currentColor"></path>
                      <path d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z" fill="currentColor"></path>
                    </svg>
                  </div>

                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">200,521</h4>
                    <div class="text-gray-500">Total Orders</div>
                  </div>
                </div>
              </div>

              <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                  <div class="p-3 rounded-full bg-green-600 bg-opacity-75">
                    <svg class="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none">
                      <path d="M6.99998 11.2H21L22.4 13.6H7.75999L4.82599 1.40001H1.99999C1.44999 1.40001 0.999992 1.95001 0.999992 2.50001C0.999992 3.05001 1.44999 3.60001 1.99999 3.60001H3.57999L6.99998 11.2ZM9.79999 8.4H18.2L19.6 6H8.39999L9.79999 8.4Z" fill="currentColor"></path>
                      <path d="M22.4 16.8C22.4 15.6402 23.1403 14.9 24.3 14.9C25.4597 14.9 26.2 15.6402 26.2 16.8C26.2 17.9598 25.4597 18.7 24.3 18.7C23.1403 18.7 22.4 17.9598 22.4 16.8Z" fill="currentColor"></path>
                      <path d="M11.2 18.7C10.0403 18.7 9.30001 17.9598 9.30001 16.8C9.30001 15.6402 10.0403 14.9 11.2 14.9C12.3597 14.9 13.1 15.6402 13.1 16.8C13.1 17.9598 12.3597 18.7 11.2 18.7Z" fill="currentColor"></path>
                    </svg>
                  </div>

                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">$86,000</h4>
                    <div class="text-gray-500">Total Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <div class="flex flex-wrap -mx-6">
              <div class="w-full px-6">
                <div class="relative flex items-center px-5 py-5 bg-white rounded-md shadow-sm">
                  <h4 class="text-xl font-semibold text-gray-700">Sales Overview</h4>
                  <div class="ml-auto">
                    <select class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md focus:outline-none">
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div class="w-full bg-white p-5 rounded-lg shadow">
              <canvas id="sales-chart" height="100"></canvas>
            </div>
          </div>

          <div class="mt-8">
            <div class="flex flex-col mt-8">
              <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <table class="min-w-full">
                    <thead>
                      <tr>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </div>
                            <div class="ml-4">
                              <div class="text-sm leading-5 font-medium text-gray-900">John Smith</div>
                              <div class="text-sm leading-5 text-gray-500">john@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div class="text-sm leading-5 text-gray-900">Software Engineer</div>
                          <div class="text-sm leading-5 text-gray-500">Web dev</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">Admin</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                          <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                        </td>
                      </tr>
                      <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </div>
                            <div class="ml-4">
                              <div class="text-sm leading-5 font-medium text-gray-900">Jane Cooper</div>
                              <div class="text-sm leading-5 text-gray-500">jane@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div class="text-sm leading-5 text-gray-900">Product Designer</div>
                          <div class="text-sm leading-5 text-gray-500">UI/UX</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">Designer</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                          <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <script>
    // Initialize charts
    document.addEventListener('DOMContentLoaded', function() {
      var ctx = document.getElementById('sales-chart').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Sales',
            backgroundColor: 'rgba(66, 153, 225, 0.2)',
            borderColor: 'rgba(66, 153, 225, 1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });
  </script>
</body>
</html>`,
    "styles/style.css": `/* TailAdmin Custom Styles */
:root {
  --primary: #5A67D8;
  --primary-dark: #4C51BF;
  --primary-light: #7F9CF5;
}

.bg-primary {
  background-color: var(--primary);
}

.hover\\:bg-primary:hover {
  background-color: var(--primary);
}

.text-primary {
  color: var(--primary);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Animations */
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Utility Classes */
.transition-all {
  transition: all 0.3s ease;
}`,
    "README.md": `# TailAdmin Dashboard Template

Free Tailwind CSS admin dashboard with dark mode and charts.

## Features

- Responsive design for all device sizes
- Interactive dashboard with charts
- Dark mode support
- Mobile-friendly navigation
- Sample tables and data display
- Built with Alpine.js for interactivity
- Chart.js for data visualization

## Getting Started

1. Extract the ZIP file
2. Open index.html in your browser to see the template
3. Customize the template to fit your project needs

## Tech Stack

- HTML
- Tailwind CSS
- Alpine.js
- Chart.js

## Credits

Created by TailAdmin
GitHub: https://github.com/TailAdmin/free-tailwind-dashboard-template

## License

MIT License`
  },

  "template-2": { 
    // E-commerce Store template content
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ShopEase - Modern E-commerce Platform</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
  <link rel="stylesheet" href="./styles/main.css">
  <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body class="bg-gray-50 text-gray-800">
  <!-- E-commerce store content here -->
</body>
</html>`,
    "styles/main.css": `:root {
  --brand-primary: #f97316;
  --brand-primary-dark: #ea580c;
  --brand-secondary: #172554;
  --brand-secondary-light: #1e3a8a;
}

/* Custom Classes */
.bg-brand-primary {
  background-color: var(--brand-primary);
}`,
    "README.md": `# E-commerce Store Template

Modern e-commerce platform with Stripe integration.`
  },

  "template-3": {
    // Developer Portfolio template content
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Chen - Software Developer</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body class="bg-gray-900 text-white font-sans antialiased">
    <!-- Developer portfolio content here -->
</body>
</html>`,
    "styles/style.css": `/* Variables */
:root {
  --primary: #64ffda;
  --primary-dark: #4db6ac;
  --secondary: #112240;
  --bg-dark: #0a192f;
  --text: #ccd6f6;
  --text-secondary: #8892b0;
}`,
    "README.md": `# Developer Portfolio Template

Clean and minimal developer portfolio with projects showcase.`
  }
};

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

// Adding back the functions needed by AIPlusGenerator.tsx
export const integrateWithGroq = async (prompt: string): Promise<string> => {
  // Simplified mock implementation
  console.log("integrateWithGroq called with prompt:", prompt);
  return "Mock integration response";
};

export const generateCustomProject = async (
  projectName: string,
  projectDescription: string,
  selectedTechStacks: string[],
  selectedTheme: string
): Promise<string> => {
  try {
    // Mock implementation that creates a basic project using our template system
    const themeColors = getThemeColors(selectedTheme);
    
    // Create a new JSZip instance
    const zip = new JSZip();
    
    // Add basic project files
    zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    :root {
      --primary: ${themeColors.primary};
      --secondary: ${themeColors.secondary};
      --accent: ${themeColors.accent};
    }
    .bg-primary { background-color: var(--primary); }
    .text-primary { color: var(--primary); }
  </style>
</head>
<body>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">${projectName}</h1>
    <p class="mb-6">${projectDescription}</p>
    <div class="bg-primary text-white p-4 rounded">
      Generated with custom technology stack: ${selectedTechStacks.join(', ')}
    </div>
  </div>
</body>
</html>`);
    
    zip.file("README.md", `# ${projectName}

${projectDescription}

## Tech Stack

${selectedTechStacks.map(tech => `- ${tech}`).join('\n')}

## Getting Started

1. Extract the ZIP file
2. Open index.html in your browser to see the basic template
3. Customize the template to fit your project needs
`);
    
    // Generate blob and return URL
    const blob = await zip.generateAsync({ type: "blob" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating custom project:", error);
    throw new Error("Failed to generate custom project");
  }
};

// Enhanced download function that uses pre-created template content
export const downloadTemplate = async (template: Template): Promise<string> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Create a new JSZip instance
    const zip = new JSZip();
    
    // Get pre-created content for this template if available
    const preCreatedContent = templateContent[template.id];
    
    if (preCreatedContent) {
      // Add all pre-created files to the zip
      Object.entries(preCreatedContent).forEach(([filePath, content]) => {
        // Handle directories
        if (filePath.includes('/')) {
          const directory = filePath.substring(0, filePath.lastIndexOf('/'));
          if (!zip.folder(directory)) {
            zip.folder(directory);
          }
        }
        
        zip.file(filePath, content);
      });
    } else {
      // Fallback: Generate basic template structure with theme colors
      const themeColors = getThemeColors(template.customTheme);
      
      // Create project files with the proper structure
      zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
  <h1>${template.name}</h1>
  <p>${template.description}</p>
</body>
</html>`);
    }
    
    // Generate blob and return URL
    const blob = await zip.generateAsync({ type: "blob" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating template:", error);
    throw new Error("Failed to generate template");
  }
};
