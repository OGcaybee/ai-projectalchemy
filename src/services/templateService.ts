
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

.hover\:bg-primary:hover {
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

  "template-2": { // E-commerce Store
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
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <h1 class="text-2xl font-bold text-gray-900">ShopEase</h1>
        <nav class="hidden md:flex space-x-8">
          <a href="#" class="text-gray-900 hover:text-brand-primary">Home</a>
          <a href="#" class="text-gray-600 hover:text-brand-primary">Shop</a>
          <a href="#" class="text-gray-600 hover:text-brand-primary">Categories</a>
          <a href="#" class="text-gray-600 hover:text-brand-primary">Deals</a>
          <a href="#" class="text-gray-600 hover:text-brand-primary">About</a>
        </nav>
      </div>
      <div class="flex items-center space-x-4">
        <div class="relative hidden md:block">
          <input type="text" placeholder="Search products..." class="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent">
          <svg class="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <button class="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </button>
        <div class="relative">
          <button class="bg-gray-100 p-2 rounded-full hover:bg-gray-200 relative">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="absolute -top-1 -right-1 bg-brand-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
        </div>
        <button class="md:hidden bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <main>
    <!-- Hero Banner -->
    <div class="relative bg-cover bg-center h-96" style="background-image: url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="container mx-auto px-4 h-full flex items-center relative z-10">
        <div class="max-w-xl">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Summer Collection 2023</h2>
          <p class="text-lg text-white mb-8">Discover our latest arrivals with up to 40% discount on selected items.</p>
          <div class="flex space-x-4">
            <button class="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3 rounded-md font-medium transition duration-300">
              Shop Now
            </button>
            <button class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-gray-900 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div class="bg-gray-100 rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Fashion" class="w-full h-48 object-cover">
            <div class="p-4 text-center">
              <h3 class="text-lg font-medium">Fashion</h3>
              <p class="text-sm text-gray-500 mt-1">120+ Products</p>
            </div>
          </div>
          <div class="bg-gray-100 rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
            <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Electronics" class="w-full h-48 object-cover">
            <div class="p-4 text-center">
              <h3 class="text-lg font-medium">Electronics</h3>
              <p class="text-sm text-gray-500 mt-1">340+ Products</p>
            </div>
          </div>
          <div class="bg-gray-100 rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Home & Kitchen" class="w-full h-48 object-cover">
            <div class="p-4 text-center">
              <h3 class="text-lg font-medium">Home & Kitchen</h3>
              <p class="text-sm text-gray-500 mt-1">160+ Products</p>
            </div>
          </div>
          <div class="bg-gray-100 rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
            <img src="https://images.unsplash.com/photo-1528459584353-bc548d57face?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80" alt="Beauty" class="w-full h-48 object-cover">
            <div class="p-4 text-center">
              <h3 class="text-lg font-medium">Beauty</h3>
              <p class="text-sm text-gray-500 mt-1">95+ Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold">Featured Products</h2>
          <a href="#" class="text-brand-primary hover:underline font-medium">View All</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <!-- Product 1 -->
          <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80" alt="Smart Watch" class="w-full h-64 object-cover">
              <div class="absolute top-2 right-2">
                <button class="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center mb-2">
                <span class="text-yellow-400 mr-1">★★★★</span>
                <span class="text-gray-300">★</span>
                <span class="text-xs text-gray-500 ml-1">(24)</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Smart Watch X1</h3>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-lg font-bold">$129.99</span>
                  <span class="text-sm text-gray-500 line-through ml-2">$199.99</span>
                </div>
                <button class="bg-brand-primary text-white p-2 rounded-full hover:bg-brand-primary-dark transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- Product 2 -->
          <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Wireless Headphones" class="w-full h-64 object-cover">
              <div class="absolute top-2 left-2">
                <span class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">SALE</span>
              </div>
              <div class="absolute top-2 right-2">
                <button class="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center mb-2">
                <span class="text-yellow-400 mr-1">★★★★★</span>
                <span class="text-xs text-gray-500 ml-1">(124)</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Premium Wireless Headphones</h3>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-lg font-bold">$89.99</span>
                  <span class="text-sm text-gray-500 line-through ml-2">$149.99</span>
                </div>
                <button class="bg-brand-primary text-white p-2 rounded-full hover:bg-brand-primary-dark transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- Product 3 -->
          <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="Running Shoes" class="w-full h-64 object-cover">
              <div class="absolute top-2 right-2">
                <button class="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center mb-2">
                <span class="text-yellow-400 mr-1">★★★★</span>
                <span class="text-gray-300">★</span>
                <span class="text-xs text-gray-500 ml-1">(56)</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Ultra Boost Running Shoes</h3>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-lg font-bold">$179.99</span>
                </div>
                <button class="bg-brand-primary text-white p-2 rounded-full hover:bg-brand-primary-dark transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- Product 4 -->
          <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="Smartphone" class="w-full h-64 object-cover">
              <div class="absolute top-2 right-2">
                <button class="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center mb-2">
                <span class="text-yellow-400 mr-1">★★★★★</span>
                <span class="text-xs text-gray-500 ml-1">(89)</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Smartphone Pro Max</h3>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-lg font-bold">$899.99</span>
                  <span class="text-sm text-gray-500 line-through ml-2">$999.99</span>
                </div>
                <button class="bg-brand-primary text-white p-2 rounded-full hover:bg-brand-primary-dark transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-brand-primary text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p class="text-lg opacity-90 mb-8">Get the latest updates on new products and upcoming sales.</p>
          <form class="flex flex-col sm:flex-row gap-2">
            <input type="email" placeholder="Your email address" class="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white">
            <button type="submit" class="px-6 py-3 bg-white text-brand-primary font-medium rounded-lg hover:bg-gray-100 transition duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="bg-gray-900 text-white pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold mb-4">ShopEase</h2>
          <p class="text-gray-400 mb-4">The modern e-commerce platform with everything you need to sell online.</p>
          <div class="flex space-x-4">
            <a href="#" class="bg-gray-800 hover:bg-brand-primary p-2 rounded-full transition duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="bg-gray-800 hover:bg-brand-primary p-2 rounded-full transition duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="bg-gray-800 hover:bg-brand-primary p-2 rounded-full transition duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Shop</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white">All Products</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">New Arrivals</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Best Sellers</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Discounted</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Support</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white">Contact Us</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">FAQs</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Shipping Info</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Returns Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Company</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Careers</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Press</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Affiliates</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">&copy; 2023 ShopEase. All rights reserved.</p>
          <div class="mt-4 md:mt-0 flex items-center space-x-4">
            <a href="#" class="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm">Cookies Settings</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script type="text/babel">
    // Sample React component that could be used in this project
    // This is just for demonstration and to show how React would be used
    
    const ShoppingCartContext = React.createContext();
    
    const ShoppingCartProvider = ({ children }) => {
      const [cart, setCart] = React.useState([]);
      
      const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
          const existingItem = prevCart.find(item => item.id === product.id);
          if (existingItem) {
            return prevCart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
          }
          return [...prevCart, { ...product, quantity }];
        });
      };
      
      const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
      };
      
      const updateQuantity = (productId, quantity) => {
        setCart(prevCart =>
          prevCart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      };
      
      return (
        <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
          {children}
        </ShoppingCartContext.Provider>
      );
    };
    
    // This is where you would render your React app
    // ReactDOM.render(
    //   <ShoppingCartProvider>
    //     <App />
    //   </ShoppingCartProvider>,
    //   document.getElementById('root')
    // );
  </script>

  <script src="./js/main.js"></script>
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
}

.bg-brand-primary-dark {
  background-color: var(--brand-primary-dark);
}

.text-brand-primary {
  color: var(--brand-primary);
}

.hover\:bg-brand-primary:hover {
  background-color: var(--brand-primary);
}

.hover\:bg-brand-primary-dark:hover {
  background-color: var(--brand-primary-dark);
}

/* Animations */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transform {
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:scale-105:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: var(--tw-transform);
}

/* Product Card Custom Styles */
.product-card {
  position: relative;
  overflow: hidden;
}

.product-card:hover img {
  transform: scale(1.05);
}

.product-card img {
  transition: transform 0.3s ease;
}

.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 12px;
  background-color: var(--brand-primary);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}`,
    "js/main.js": `document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuButton = document.querySelector('button[aria-label="Menu"]');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Product quick view functionality
  const quickViewButtons = document.querySelectorAll('.quick-view-button');
  
  quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = button.dataset.productId;
      openQuickView(productId);
    });
  });
  
  function openQuickView(productId) {
    // This would be replaced with actual implementation
    console.log('Opening quick view for product:', productId);
    
    // Example implementation:
    // 1. Fetch product data from API or local data store
    // 2. Populate modal with product information
    // 3. Show modal
  }
  
  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const productCard = button.closest('.product-card');
      if (!productCard) return;
      
      const productId = productCard.dataset.productId;
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.product-price').dataset.price;
      const productImage = productCard.querySelector('img').src;
      
      addToCart({
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        quantity: 1
      });
      
      showNotification(`Added ${productName} to cart!`);
    });
  });
  
  // Shopping cart functionality
  let cart = [];
  
  function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += product.quantity;
    } else {
      cart.push(product);
    }
    
    updateCartUI();
    saveCartToLocalStorage();
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToLocalStorage();
  }
  
  function updateQuantity(productId, newQuantity) {
    const index = cart.findIndex(item => item.id === productId);
    
    if (index !== -1) {
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        cart[index].quantity = newQuantity;
        updateCartUI();
        saveCartToLocalStorage();
      }
    }
  }
  
  function updateCartUI() {
    const cartCountElement = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    
    if (cartCountElement) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountElement.textContent = totalItems;
    }
    
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';
      
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
      } else {
        cart.forEach(item => {
          const cartItemElement = document.createElement('div');
          cartItemElement.className = 'cart-item';
          cartItemElement.innerHTML = \`
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-content">
              <h4>${item.name}</h4>
              <div class="cart-item-price">$${item.price.toFixed(2)}</div>
              <div class="cart-item-quantity">
                <button class="quantity-btn quantity-decrease" data-product-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn quantity-increase" data-product-id="${item.id}">+</button>
              </div>
            </div>
            <button class="remove-item" data-product-id="${item.id}">&times;</button>
          \`;
          
          cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Add event listeners to new elements
        document.querySelectorAll('.quantity-decrease').forEach(btn => {
          btn.addEventListener('click', () => {
            const productId = btn.dataset.productId;
            const currentQuantity = cart.find(item => item.id === productId).quantity;
            updateQuantity(productId, currentQuantity - 1);
          });
        });
        
        document.querySelectorAll('.quantity-increase').forEach(btn => {
          btn.addEventListener('click', () => {
            const productId = btn.dataset.productId;
            const currentQuantity = cart.find(item => item.id === productId).quantity;
            updateQuantity(productId, currentQuantity + 1);
          });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
          btn.addEventListener('click', () => {
            const productId = btn.dataset.productId;
            removeFromCart(productId);
          });
        });
      }
    }
    
    if (cartTotalElement) {
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotalElement.textContent = \`$\${total.toFixed(2)}\`;
    }
  }
  
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCartUI();
    }
  }
  
  // Load cart data when the page loads
  loadCartFromLocalStorage();
  
  // Notification system
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
});`,
    "README.md": `# E-commerce Store Template

Modern e-commerce platform with Stripe integration.

## Features

- Responsive design for all device sizes
- Product grid with filtering capabilities
- Product details with image gallery
- Shopping cart with local storage
- Checkout process with Stripe integration
- User authentication system

## Tech Stack

- React for frontend UI
- Node.js with Express for backend
- MongoDB for database storage
- Stripe for payment processing

## Installation

1. Extract the ZIP file
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables (see .env.example)
5. Start the development server:
   ```
   npm start
   ```

## Backend Setup

1. Navigate to the backend directory
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your MongoDB connection
4. Configure Stripe API keys
5. Start the server:
   ```
   npm run dev
   ```

## Credits

Created by adrianhajdin
GitHub: https://github.com/adrianhajdin/ecommerce_sanity_stripe

## License

MIT License`
  },

  "template-3": { // Developer Portfolio
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
    <!-- Navbar -->
    <nav class="fixed w-full z-10 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <div class="container mx-auto px-6 py-3">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold text-primary">AC</div>
                <div class="hidden md:flex space-x-10">
                    <a href="#home" class="nav-link active">Home</a>
                    <a href="#about" class="nav-link">About</a>
                    <a href="#skills" class="nav-link">Skills</a>
                    <a href="#projects" class="nav-link">Projects</a>
                    <a href="#contact" class="nav-link">Contact</a>
                </div>
                <div class="md:hidden">
                    <button id="menu-toggle" class="focus:outline-none">
                        <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile menu -->
        <div id="mobile-menu" class="hidden md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#home" class="mobile-nav-link active">Home</a>
                <a href="#about" class="mobile-nav-link">About</a>
                <a href="#skills" class="mobile-nav-link">Skills</a>
                <a href="#projects" class="mobile-nav-link">Projects</a>
                <a href="#contact" class="mobile-nav-link">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="min-h-screen flex items-center">
        <div class="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
            <div class="md:w-1/2 text-center md:text-left">
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
                    <span class="text-white">Hi, I'm </span>
                    <span class="text-primary">Alex Chen</span>
                </h1>
                <h2 class="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-semibold mb-6">
                    Full-Stack Developer
                </h2>
                <p class="text-gray-400 text-lg mb-8">
                    I build exceptional and accessible digital experiences for the web.
                </p>
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                    <a href="#contact" class="py-3 px-8 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition duration-300 inline-flex items-center justify-center">
                        Contact Me
                    </a>
                    <a href="#projects" class="py-3 px-8 bg-transparent border-2 border-primary hover:bg-primary/10 text-primary font-semibold rounded-lg transition duration-300 inline-flex items-center justify-center">
                        View Projects
                    </a>
                </div>
                <div class="flex mt-8 space-x-5 justify-center md:justify-start">
                    <a href="https://github.com/" target="_blank" class="social-icon">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://linkedin.com/" target="_blank" class="social-icon">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://twitter.com/" target="_blank" class="social-icon">
                        <i class="fab fa-twitter"></i>
                    </a>
                </div>
            </div>
            <div class="md:w-1/2 mb-10 md:mb-0">
                <div class="relative">
                    <div class="w-64 h-64 md:w-80 md:h-80 mx-auto overflow-hidden rounded-full border-4 border-primary mb-5">
                        <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Alex Chen" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute -z-10 top-5 left-5 right-5 bottom-5 rounded-full bg-primary opacity-20 blur-xl"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-800">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row items-center">
                <div class="md:w-1/2 mb-10 md:mb-0">
                    <div class="relative">
                        <div class="w-full h-96 overflow-hidden rounded-lg shadow-xl">
                            <img src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="Working on laptop" class="w-full h-full object-cover">
                        </div>
                        <div class="absolute -z-10 top-5 -left-5 -right-5 -bottom-5 rounded-lg bg-primary opacity-20 blur-xl"></div>
                    </div>
                </div>
                <div class="md:w-1/2 md:pl-10">
                    <div class="section-title mb-6">
                        <h2 class="text-3xl font-bold">About Me</h2>
                        <div class="w-24 h-1 bg-primary mt-2"></div>
                    </div>
                    <p class="text-gray-300 mb-6">
                        I'm a passionate full-stack developer with over 5 years of experience creating web applications. I enjoy solving complex problems and turning ideas into reality through elegant and efficient code.
                    </p>
                    <p class="text-gray-300 mb-6">
                        My journey in software development began when I was in college, and I've been in love with creating digital experiences ever since. I specialize in JavaScript, React, Node.js, and modern web technologies.
                    </p>
                    <p class="text-gray-300 mb-8">
                        When I'm not coding, you'll find me hiking, reading sci-fi novels, or experimenting with new recipes in the kitchen.
                    </p>
                    <div class="grid grid-cols-2 gap-4 text-gray-300">
                        <div>
                            <p class="mb-2"><span class="font-bold text-primary">Name:</span> Alex Chen</p>
                            <p class="mb-2"><span class="font-bold text-primary">Experience:</span> 5+ Years</p>
                            <p><span class="font-bold text-primary">Degree:</span> BSc Computer Science</p>
                        </div>
                        <div>
                            <p class="mb-2"><span class="font-bold text-primary">Email:</span> alex@example.com</p>
                            <p class="mb-2"><span class="font-bold text-primary">Location:</span> San Francisco, CA</p>
                            <p><span class="font-bold text-primary">Freelance:</span> Available</p>
                        </div>
                    </div>
                    <div class="mt-8">
                        <a href="#" class="inline-flex items-center py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition duration-300">
                            <span>Download CV</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-20">
        <div class="container mx-auto px-6">
            <div class="section-title text-center mb-16">
                <h2 class="text-3xl font-bold">My Skills</h2>
                <div class="w-24 h-1 bg-primary mx-auto mt-2"></div>
                <p class="text-gray-400 mt-4 max-w-xl mx-auto">
                    I've worked with a variety of technologies in the web development world.
                    Here are my main areas of expertise:
                </p>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="skill-card">
                    <div class="icon-container">
                        <i class="fab fa-react"></i>
                    </div>
                    <h3>React</h3>
                </div>
                <div class="skill-card">
                    <div class="icon-container">
                        <i class="fab fa-node-js"></i>
                    </div>
                    <h3>Node.js</h3>
                </div>
                <div class="skill-card">
                    <div class="icon-container">
                        <i class="fab fa-js"></i>
                    </div>
                    <h3>JavaScript</h3>
                </div>
                <div class="skill-card">
                    <div class="icon-container">
                        <i class="fab fa-html5"></i>
                    </div>
                    <h3>HTML/CSS</h3>
                </div>
                <div class="skill-card">
                    <div class="icon-container">
                        <i class="fas fa-database"></i>
                    </div>
                    <h3>MongoDB</h3>
                </div>
                <div class="skill-card">
                    <div class="icon-container">
                        <i class="fas fa-server"></i>
                    </div>
                    <h3>Express</h3>
                </div>
                <div class="skill-card">
                    <div class="icon-container">
                        <i class="fab fa-docker"></i>
                    </div>
                    <h3>Docker</h3>
                </div>
                <div class="skill-card">
                    <div class="icon-container">
                        <i class="fab fa-git-alt"></i>
                    </div>
                    <h3>Git</h3>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-gray-800">
        <div class="container mx-auto px-6">
            <div class="section-title text-center mb-16">
                <h2 class="text-3xl font-bold">My Projects</h2>
                <div class="w-24 h-1 bg-primary mx-auto mt-2"></div>
                <p class="text-gray-400 mt-4 max-w-xl mx-auto">
                    Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Project 1 -->
                <div class="project-card">
                    <div class="project-img">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Project 1">
                    </div>
                    <div class="project-content">
                        <h3>E-commerce Dashboard</h3>
                        <p>A real-time dashboard for e-commerce businesses with sales analytics, inventory management, and customer insights.</p>
                        <div class="tech-stack">
                            <span>React</span>
                            <span>Node.js</span>
                            <span>MongoDB</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="btn-project">View Project</a>
                            <a href="#" class="btn-code">Code <i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                
                <!-- Project 2 -->
                <div class="project-card">
                    <div class="project-img">
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Project 2">
                    </div>
                    <div class="project-content">
                        <h3>Task Management App</h3>
                        <p>A collaborative task management application with real-time updates, file sharing, and progress tracking features.</p>
                        <div class="tech-stack">
                            <span>React</span>
                            <span>Firebase</span>
                            <span>Material UI</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="btn-project">View Project</a>
                            <a href="#" class="btn-code">Code <i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                
                <!-- Project 3 -->
                <div class="project-card">
                    <div class="project-img">
                        <img src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Project 3">
                    </div>
                    <div class="project-content">
                        <h3>Fitness Tracker</h3>
                        <p>A comprehensive fitness tracking application with workout plans, nutrition log, and progress visualization.</p>
                        <div class="tech-stack">
                            <span>React Native</span>
                            <span>Express</span>
                            <span>MongoDB</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="btn-project">View Project</a>
                            <a href="#" class="btn-code">Code <i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-12">
                <a href="#" class="inline-flex items-center py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition duration-300">
                    <span>View All Projects</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
        <div class="container mx-auto px-6">
            <div class="section-title text-center mb-16">
                <h2 class="text-3xl font-bold">Contact Me</h2>
                <div class="w-24 h-1 bg-primary mx-auto mt-2"></div>
                <p class="text-gray-400 mt-4 max-w-xl mx-auto">
                    Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <div class="mb-8">
                        <h3 class="text-xl font-bold mb-4">Get in touch</h3>
                        <p class="text-gray-400">
                            I'm currently available for freelance work or full-time positions. If you have a project that needs some creative touch, don't hesitate to contact me.
                        </p>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <h4 class="font-medium mb-1">Location</h4>
                                <p class="text-gray-400">San Francisco, California, USA</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div>
                                <h4 class="font-medium mb-1">Email</h4>
                                <p class="text-gray-400">alex@example.com</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="contact-icon">
                                <i class="fas fa-phone-alt"></i>
                            </div>
                            <div>
                                <h4 class="font-medium mb-1">Phone</h4>
                                <p class="text-gray-400">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-8">
                        <h3 class="text-xl font-bold mb-4">Follow me</h3>
                        <div class="flex space-x-4">
                            <a href="#" class="social-icon-large">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="social-icon-large">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="#" class="social-icon-large">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="social-icon-large">
                                <i class="fab fa-dribbble"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div>
                    <form id="contact-form">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input type="text" id="name" name="name" class="form-input" placeholder="Your Name" required>
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input type="email" id="email" name="email" class="form-input" placeholder="Your Email" required>
                            </div>
                        </div>
                        <div class="mb-6">
                            <label for="subject" class="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                            <input type="text" id="subject" name="subject" class="form-input" placeholder="Subject" required>
                        </div>
                        <div class="mb-6">
                            <label for="message" class="block text-sm font-medium text-gray-300 mb-1">Message</label>
                            <textarea id="message" name="message" rows="5" class="form-textarea" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" class="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center">
                            <span>Send Message</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-center py-8">
        <div class="container mx-auto px-6">
            <p class="text-gray-400">
                &copy; 2023 Alex Chen. All rights reserved.
            </p>
            <p class="text-gray-500 text-sm mt-1">
                Designed & Built with ❤️
            </p>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="hidden fixed bottom-8 right-8 bg-primary hover:bg-primary-dark text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    </button>

    <script src="./js/main.js"></script>
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
}

/* General Styles */
body {
  background-color: var(--bg-dark);
  color: var(--text);
  scroll-behavior: smooth;
}

section {
  background-color: var(--bg-dark);
}

.text-primary {
  color: var(--primary);
}

.bg-primary {
  background-color: var(--primary);
}

.bg-primary-dark {
  background-color: var(--primary-dark);
}

.hover\:bg-primary-dark:hover {
  background-color: var(--primary-dark);
}

.border-primary {
  border-color: var(--primary);
}

/* Navigation */
.nav-link {
  position: relative;
  font-size: 16px;
  color: var(--text);
  padding: 5px 0;
  transition: all 0.3s ease;
}

.nav-link:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:hover, .nav-link.active {
  color: var(--primary);
}

.nav-link:hover:after, .nav-link.active:after {
  width: 100%;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem;
  font-size: 16px;
  color: var(--text);
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover, .mobile-nav-link.active {
  background-color: var(--secondary);
  color: var(--primary);
  border-left-color: var(--primary);
}

/* Social Icons */
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--text);
  background-color: var(--secondary);
  font-size: 18px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: var(--primary);
  color: var(--bg-dark);
  transform: translateY(-3px);
}

.social-icon-large {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: var(--text);
  background-color: var(--secondary);
  font-size: 20px;
  transition: all 0.3s ease;
}

.social-icon-large:hover {
  background-color: var(--primary);
  color: var(--bg-dark);
  transform: translateY(-3px);
}

/* Skills */
.skill-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: var(--secondary);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.skill-card .icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  margin-bottom: 15px;
  border-radius: 50%;
  background-color: rgba(100, 255, 218, 0.1);
  color: var(--primary);
  font-size: 32px;
  transition: all 0.3s ease;
}

.skill-card:hover .icon-container {
  background-color: var(--primary);
  color: var(--bg-dark);
}

.skill-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

/* Projects */
.project-card {
  background-color: var(--secondary);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.project-img {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.project-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-img img {
  transform: scale(1.1);
}

.project-content {
  padding: 25px;
}

.project-content h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text);
}

.project-content p {
  color: var(--text-secondary);
  margin-bottom: 15px;
  line-height: 1.6;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tech-stack span {
  padding: 4px 12px;
  border-radius: 20px;
  background-color: rgba(100, 255, 218, 0.1);
  color: var(--primary);
  font-size: 12px;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 10px;
}

.btn-project, .btn-code {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-project {
  background-color: var(--primary);
  color: var(--bg-dark);
}

.btn-project:hover {
  background-color: var(--primary-dark);
}

.btn-code {
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
}

.btn-code:hover {
  background-color: rgba(100, 255, 218, 0.1);
}

.btn-code i {
  margin-left: 6px;
}

/* Contact */
.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: var(--secondary);
  color: var(--primary);
  font-size: 20px;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 12px 16px;
  background-color: var(--secondary);
  border: 2px solid var(--secondary);
  border-radius: 8px;
  color: var(--text);
  transition: border-color 0.3s ease;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-input::placeholder, .form-textarea::placeholder {
  color: var(--text-secondary);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-fadeIn {
  animation: fadeIn 1s ease;
}

.animate-slideIn {
  animation: slideIn 0.5s ease;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Utility */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}`,
    "js/main.js": `document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Close mobile menu if open
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
      
      // Smooth scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
      
      // Update active nav link
      setActiveNavLink(targetId);
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
    
    // Update active nav link on scroll
    updateActiveNavOnScroll();
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // Simulate form submission (would be replaced with actual API call)
      console.log('Form submission:', formDataObj);
      
      // Show success message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>Message Sent!</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
      submitBtn.disabled = true;
      
      // Reset form and button after delay
      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 3000);
    });
  }
  
  // Typing effect for hero section
  const heroHeading = document.querySelector('#home h2');
  const professions = ['Full-Stack Developer', 'React Specialist', 'UI/UX Enthusiast', 'Problem Solver'];
  
  if (heroHeading) {
    let currentIndex = 0;
    
    function updateProfession() {
      fadeOut(heroHeading, () => {
        heroHeading.textContent = professions[currentIndex];
        currentIndex = (currentIndex + 1) % professions.length;
        fadeIn(heroHeading);
      });
    }
    
    // Start the profession rotation after a delay
    setTimeout(() => {
      setInterval(updateProfession, 3000);
    }, 3000);
  }
  
  // Helper functions
  function fadeOut(element, callback) {
    element.style.transition = 'opacity 0.5s ease';
    element.style.opacity = 0;
    setTimeout(() => {
      if (callback) callback();
    }, 500);
  }
  
  function fadeIn(element) {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      element.style.opacity = 1;
    }, 10);
  }
  
  function setActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  function updateActiveNavOnScroll() {
    const scrollPosition = window.pageYOffset;
    
    // Get all sections and their positions
    const sections = document.querySelectorAll('section');
    const navMap = Array.from(sections).map(section => {
      return {
        id: '#' + section.id,
        offsetTop: section.offsetTop - 100, // Adjust for navbar and some padding
        offsetBottom: section.offsetTop + section.offsetHeight - 100
      };
    });
    
    // Find the current active section
    let activeSection = navMap[0].id;
    for (let i = 0; i < navMap.length; i++) {
      if (scrollPosition >= navMap[i].offsetTop && scrollPosition < navMap[i].offsetBottom) {
        activeSection = navMap[i].id;
        break;
      }
    }
    
    // Update active nav link
    setActiveNavLink(activeSection);
  }
  
  // Initialize the active link based on the current position
  updateActiveNavOnScroll();
  
  // Add animations to elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .section-title');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible = elementTop < window.innerHeight && elementBottom > 0;
      
      if (isVisible) {
        element.classList.add('animate-fadeIn');
      }
    });
  };
  
  // Initial check for elements in view
  animateOnScroll();
  
  // Check for new elements on scroll
  window.addEventListener('scroll', animateOnScroll);
});`,
    "README.md": `# Developer Portfolio Template

Clean and minimal developer portfolio with projects showcase.

## Features

- Responsive design for all device sizes
- Animated sections with smooth transitions
- Project showcase with filterable categories
- Skills visualization
- Contact form
- Social media links
- Dark mode with accent color

## Tech Stack

- React
- Next.js
- Tailwind CSS
- Framer Motion for animations

## Getting Started

1. Extract the ZIP file
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

- **Theme Colors**: Edit the CSS variables in styles/style.css
- **Content**: Update your personal information in the components
- **Projects**: Add or remove projects in the data/projects.js file
- **Skills**: Modify your skills in the data/skills.js file

## Deployment

This portfolio is optimized for deployment on Vercel or Netlify. Simply connect your repository to either platform for automatic deployments.

## Credits

Created by soumyajit4419
GitHub: https://github.com/soumyajit4419/Portfolio

## License

MIT License`
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
`
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
    
    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: "blob" });
    
    // Create a URL for the blob
    return URL.createObjectURL(zipContent);
  } catch (error) {
    console.error("Error downloading template:", error);
    throw new Error("Failed to download template");
  }
};
