
import { templateThumbnails, getTemplateThumbnail } from "@/assets/template-thumbnails";
import JSZip from "jszip";
import { toast } from "sonner";

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

// Tech stack options that can be selected by users
export const TECH_STACK_OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "alpine", label: "Alpine.js" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "bootstrap", label: "Bootstrap" },
  { value: "node", label: "Node.js" },
  { value: "express", label: "Express" },
  { value: "mongodb", label: "MongoDB" },
  { value: "firebase", label: "Firebase" }
];

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

// Template code snippets organized by tech stack
const templateCode = {
  react: {
    component: (componentName: string, description: string) => `import React, { useState } from 'react';

interface ${componentName}Props {
  title?: string;
  description?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ 
  title = "${componentName}",
  description = "${description}"
}) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      
      <button 
        onClick={() => setIsActive(!isActive)}
        className={\`px-4 py-2 rounded \${
          isActive 
            ? "bg-blue-600 text-white" 
            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
        }\`}
      >
        {isActive ? 'Active' : 'Inactive'}
      </button>
    </div>
  );
};

export default ${componentName};
`,
    app: (appName: string) => `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
`,
    navbar: (appName: string) => `import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">${appName}</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
            >
              Home
            </Link>
            <Link 
              to="/about"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
            >
              About
            </Link>
            <Link 
              to="/contact"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
`,
    footer: () => `import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
`,
    homePage: (appName: string, description: string) => `import React from 'react';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Welcome to ${appName}
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          ${description}
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Get started
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
      
      <div className="py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Check out our amazing features designed to help you succeed.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: 'Feature 1',
                  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                },
                {
                  name: 'Feature 2',
                  description: 'Quas cupiditate laboriosam fugiat, aperiam minus ad.',
                },
                {
                  name: 'Feature 3',
                  description: 'Mollitia consequatur doloremque neque nesciunt ut.',
                },
                {
                  name: 'Feature 4',
                  description: 'Excepturi aliquam in iure, repellat tempora.',
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
`,
    aboutPage: (appName: string) => `import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
          About ${appName}
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Learn more about our mission, vision, and the team behind our success.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
            nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia,
            nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {
                name: 'John Doe',
                role: 'CEO & Founder',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              },
              {
                name: 'Jane Smith',
                role: 'CTO',
                bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              },
              {
                name: 'Mike Johnson',
                role: 'Lead Designer',
                bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
              },
            ].map((person) => (
              <div key={person.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{person.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{person.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
`,
    contactPage: () => `import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
          Contact Us
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Have questions? We're here to help.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-gray-600 dark:text-gray-300">
                    +1 (123) 456-7890
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-gray-600 dark:text-gray-300">
                    info@yourcompany.com
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-gray-600 dark:text-gray-300">
                    123 Main St, Suite 100<br />
                    San Francisco, CA 94105
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-md p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          Your message has been sent successfully!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {submitError && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-800 dark:text-red-200">
                          {submitError}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9">
            <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-md">
              {/* Replace this div with an actual map if needed */}
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400">Map would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
`,
  },
  vue: {
    component: (componentName: string, description: string) => `<template>
  <div class="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
    <h2 class="text-xl font-bold mb-2">{{ title }}</h2>
    <p class="text-gray-600 dark:text-gray-300 mb-4">{{ description }}</p>
    
    <button 
      @click="isActive = !isActive"
      :class="[
        'px-4 py-2 rounded',
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
      ]"
    >
      {{ isActive ? 'Active' : 'Inactive' }}
    </button>
  </div>
</template>

<script>
export default {
  name: '${componentName}',
  props: {
    title: {
      type: String,
      default: '${componentName}'
    },
    description: {
      type: String,
      default: '${description}'
    }
  },
  data() {
    return {
      isActive: false
    };
  }
};
</script>
`,
    app: (appName: string) => `<template>
  <div id="app" class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <Navbar :app-name="appName" />
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      appName: '${appName}'
    };
  }
};
</script>
`,
    navbar: (appName: string) => `<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ appName }}</span>
          </router-link>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link 
              to="/" 
              class="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-blue-500 text-gray-900 dark:text-white"
              exact
            >
              Home
            </router-link>
            <router-link 
              to="/about" 
              class="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-blue-500 text-gray-900 dark:text-white"
            >
              About
            </router-link>
            <router-link 
              to="/contact" 
              class="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-blue-500 text-gray-900 dark:text-white"
            >
              Contact
            </router-link>
          </div>
        </div>
        
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span class="sr-only">Open main menu</span>
            <svg v-if="isMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMenuOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link 
          to="/"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
          active-class="bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-300"
          exact
        >
          Home
        </router-link>
        <router-link 
          to="/about"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
          active-class="bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-300"
        >
          About
        </router-link>
        <router-link 
          to="/contact"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
          active-class="bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-300"
        >
          Contact
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    appName: {
      type: String,
      default: 'App'
    }
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  watch: {
    '$route'() {
      this.isMenuOpen = false;
    }
  }
};
</script>
`,
    footer: () => `<template>
  <footer class="bg-white dark:bg-gray-800 py-6 shadow-inner">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {{ currentYear }} Your Company. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">GitHub</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>
`,
    homePage: (appName: string, description: string) => `<template>
  <div class="max-w-7xl mx-auto">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
        Welcome to {{ appName }}
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        {{ description }}
      </p>
      <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <div class="rounded-md shadow">
          <a
            href="#"
            class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
          >
            Get started
          </a>
        </div>
        <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
          <a
            href="#"
            class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
    
    <div class="py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Check out our amazing features designed to help you succeed.
          </p>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div v-for="(feature, index) in features" :key="index" class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{{ feature.name }}</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                {{ feature.description }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      appName: '${appName}',
      description: '${description}',
      features: [
        {
          name: 'Feature 1',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
          name: 'Feature 2',
          description: 'Quas cupiditate laboriosam fugiat, aperiam minus ad.',
        },
        {
          name: 'Feature 3',
          description: 'Mollitia consequatur doloremque neque nesciunt ut.',
        },
        {
          name: 'Feature 4',
          description: 'Excepturi aliquam in iure, repellat tempora.',
        },
      ]
    };
  }
};
</script>
`,
    aboutPage: (appName: string) => `<template>
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
        About {{ appName }}
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Learn more about our mission, vision, and the team behind our success.
      </p>
    </div>
    
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
        <p class="text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
          nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia,
          nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.
        </p>
        
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Our Vision</h2>
        <p class="text-gray-600 dark:text-gray-300">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </p>
        
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Our Team</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div v-for="(person, index) in team" :key="index" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div class="text-center">
              <div class="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4"></div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ person.name }}</h3>
              <p class="text-sm text-blue-600 dark:text-blue-400 mb-2">{{ person.role }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-300">{{ person.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      appName: '${appName}',
      team: [
        {
          name: 'John Doe',
          role: 'CEO & Founder',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          name: 'Jane Smith',
          role: 'CTO',
          bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          name: 'Mike Johnson',
          role: 'Lead Designer',
          bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        },
      ]
    };
  }
};
</script>
`,
    contactPage: () => `<template>
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
        Contact Us
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Have questions? We're here to help.
      </p>
    </div>
    
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg mb-8">
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="ml-3 text-gray-600 dark:text-gray-300">
                  +1 (123) 456-7890
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-3 text-gray-600 dark:text-gray-300">
                  info@yourcompany.com
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-3 text-gray-600 dark:text-gray-300">
                  123 Main St, Suite 100<br />
                  San Francisco, CA 94105
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div v-if="submitSuccess" class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-md p-4 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-green-800 dark:text-green-200">
                      Your message has been sent successfully!
                    </p>
                  </div>
                </div>
              </div>
              
              <div v-if="submitError" class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md p-4 mb-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-red-800 dark:text-red-200">
                      {{ submitError }}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  v-model="formData.name"
                  required
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="formData.email"
                  required
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  v-model="formData.subject"
                  required
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  v-model="formData.message"
                  required
                  class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Find Us</h2>
        <div class="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-md">
          <!-- Replace this div with an actual map if needed -->
          <div class="flex items-center justify-center h-full">
            <p class="text-gray-500 dark:text-gray-400">Map would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      submitSuccess: false,
      submitError: ''
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = '';
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate success
        this.submitSuccess = true;
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      } catch (error) {
        this.submitError = 'Something went wrong. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>
`,
  },
  typescript: {
    // TypeScript versions of the React components
    component: (componentName: string, description: string) => `import React, { useState } from 'react';

interface ${componentName}Props {
  title?: string;
  description?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ 
  title = "${componentName}",
  description = "${description}"
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  
  return (
    <div className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      
      <button 
        onClick={() => setIsActive(!isActive)}
        className={\`px-4 py-2 rounded \${
          isActive 
            ? "bg-blue-600 text-white" 
            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
        }\`}
      >
        {isActive ? 'Active' : 'Inactive'}
      </button>
    </div>
  );
};

export default ${componentName};
`,
    interface: (name: string) => `export interface ${name} {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ${name}CreateInput {
  name: string;
  description: string;
}

export interface ${name}UpdateInput {
  name?: string;
  description?: string;
}
`,
  },
  alpine: {
    component: (componentName: string, description: string) => `<div x-data="{ isActive: false }" class="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
  <h2 class="text-xl font-bold mb-2">${componentName}</h2>
  <p class="text-gray-600 dark:text-gray-300 mb-4">${description}</p>
  
  <button 
    @click="isActive = !isActive"
    :class="isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'"
    class="px-4 py-2 rounded"
  >
    <span x-text="isActive ? 'Active' : 'Inactive'"></span>
  </button>
</div>
`,
    app: (appName: string, description: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <link rel="stylesheet" href="./styles.css">
</head>
<body class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <div x-data="{ 
    darkMode: localStorage.getItem('darkMode') === 'true',
    menuOpen: false,
    currentPage: window.location.hash ? window.location.hash.substring(1) : 'home',
    init() {
      if (this.darkMode || (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        this.darkMode = true;
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
      
      window.addEventListener('hashchange', () => {
        this.currentPage = window.location.hash ? window.location.hash.substring(1) : 'home';
      });
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode ? 'true' : 'false');
      
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <a href="#home" class="flex-shrink-0 flex items-center">
              <span class="text-xl font-bold text-gray-900 dark:text-white">${appName}</span>
            </a>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a 
                href="#home" 
                class="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{ 'border-blue-500 text-gray-900 dark:text-white': currentPage === 'home' }"
              >
                Home
              </a>
              <a 
                href="#about" 
                class="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{ 'border-blue-500 text-gray-900 dark:text-white': currentPage === 'about' }"
              >
                About
              </a>
              <a 
                href="#contact" 
                class="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{ 'border-blue-500 text-gray-900 dark:text-white': currentPage === 'contact' }"
              >
                Contact
              </a>
            </div>
          </div>
          
          <div class="flex items-center">
            <button @click="toggleDarkMode" class="p-2 rounded-md text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span x-show="!darkMode" class="sr-only">Dark Mode</span>
              <svg x-show="!darkMode" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span x-show="darkMode" class="sr-only">Light Mode</span>
              <svg x-show="darkMode" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            
            <div class="-mr-2 flex items-center sm:hidden ml-4">
              <button
                @click="menuOpen = !menuOpen"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span class="sr-only">Open main menu</span>
                <svg x-show="!menuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg x-show="menuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div x-show="menuOpen" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <a 
            href="#home"
            @click="menuOpen = false"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
            :class="{ 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-300': currentPage === 'home' }"
          >
            Home
          </a>
          <a 
            href="#about"
            @click="menuOpen = false"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
            :class="{ 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-300': currentPage === 'about' }"
          >
            About
          </a>
          <a 
            href="#contact"
            @click="menuOpen = false"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
            :class="{ 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-300': currentPage === 'contact' }"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Home page -->
      <div x-show="currentPage === 'home'" class="max-w-7xl mx-auto">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Welcome to ${appName}
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            ${description}
          </p>
          <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
              <a
                href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get started
              </a>
            </div>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        
        <div class="py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
              <h2 class="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
              <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Everything you need
              </p>
              <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                Check out our amazing features designed to help you succeed.
              </p>
            </div>

            <div class="mt-10">
              <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div x-data="{
                  feature: {
                    name: 'Feature 1',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                  }
                }" class="relative">
                  <dt>
                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white" x-text="feature.name"></p>
                  </dt>
                  <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300" x-text="feature.description"></dd>
                </div>
                
                <div x-data="{
                  feature: {
                    name: 'Feature 2',
                    description: 'Quas cupiditate laboriosam fugiat, aperiam minus ad.'
                  }
                }" class="relative">
                  <dt>
                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white" x-text="feature.name"></p>
                  </dt>
                  <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300" x-text="feature.description"></dd>
                </div>
                
                <div x-data="{
                  feature: {
                    name: 'Feature 3',
                    description: 'Mollitia consequatur doloremque neque nesciunt ut.'
                  }
                }" class="relative">
                  <dt>
                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white" x-text="feature.name"></p>
                  </dt>
                  <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300" x-text="feature.description"></dd>
                </div>
                
                <div x-data="{
                  feature: {
                    name: 'Feature 4',
                    description: 'Excepturi aliquam in iure, repellat tempora.'
                  }
                }" class="relative">
                  <dt>
                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white" x-text="feature.name"></p>
                  </dt>
                  <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300" x-text="feature.description"></dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <!-- About page -->
      <div x-show="currentPage === 'about'" class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            About ${appName}
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Learn more about our mission, vision, and the team behind our success.
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
              nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia,
              nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.
            </p>
            
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Our Vision</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Our Team</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div x-data="{
                person: {
                  name: 'John Doe',
                  role: 'CEO & Founder',
                  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                }
              }" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div class="text-center">
                  <div class="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4"></div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white" x-text="person.name"></h3>
                  <p class="text-sm text-blue-600 dark:text-blue-400 mb-2" x-text="person.role"></p>
                  <p class="text-sm text-gray-500 dark:text-gray-300" x-text="person.bio"></p>
                </div>
              </div>
              
              <div x-data="{
                person: {
                  name: 'Jane Smith',
                  role: 'CTO',
                  bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                }
              }" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div class="text-center">
                  <div class="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4"></div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white" x-text="person.name"></h3>
                  <p class="text-sm text-blue-600 dark:text-blue-400 mb-2" x-text="person.role"></p>
                  <p class="text-sm text-gray-500 dark:text-gray-300" x-text="person.bio"></p>
                </div>
              </div>
              
              <div x-data="{
                person: {
                  name: 'Mike Johnson',
                  role: 'Lead Designer',
                  bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
                }
              }" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div class="text-center">
                  <div class="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4"></div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white" x-text="person.name"></h3>
                  <p class="text-sm text-blue-600 dark:text-blue-400 mb-2" x-text="person.role"></p>
                  <p class="text-sm text-gray-500 dark:text-gray-300" x-text="person.bio"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact page -->
      <div x-show="currentPage === 'contact'" x-data="{
        formData: {
          name: '',
          email: '',
          subject: '',
          message: ''
        },
        isSubmitting: false,
        submitSuccess: false,
        submitError: '',
        
        submitForm() {
          this.isSubmitting = true;
          this.submitSuccess = false;
          this.submitError = '';
          
          // Simulate API call
          setTimeout(() => {
            // Simulate success
            this.submitSuccess = true;
            this.formData = {
              name: '',
              email: '',
              subject: '',
              message: ''
            };
            this.isSubmitting = false;
          }, 1000);
        }
      }" class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            Contact Us
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Have questions? We're here to help.
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg mb-8">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
                <p class="text-gray-600 dark:text-gray-300 mb-6">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
                
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div class="ml-3 text-gray-600 dark:text-gray-300">
                      +1 (123) 456-7890
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="ml-3 text-gray-600 dark:text-gray-300">
                      info@yourcompany.com
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div class="ml-3 text-gray-600 dark:text-gray-300">
                      123 Main St, Suite 100<br />
                      San Francisco, CA 94105
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form @submit.prevent="submitForm" class="space-y-6">
                  <template x-if="submitSuccess">
                    <div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-md p-4 mb-4">
                      <div class="flex">
                        <div class="flex-shrink-0">
                          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div class="ml-3">
                          <p class="text-sm text-green-800 dark:text-green-200">
                            Your message has been sent successfully!
                          </p>
                        </div>
                      </div>
                    </div>
                  </template>
                  
                  <template x-if="submitError">
                    <div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md p-4 mb-4">
                      <div class="flex">
                        <div class="flex-shrink-0">
                          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div class="ml-3">
                          <p class="text-sm text-red-800 dark:text-red-200" x-text="submitError"></p>
                        </div>
                      </div>
                    </div>
                  </template>
                  
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      x-model="formData.name"
                      required
                      class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      x-model="formData.email"
                      required
                      class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      x-model="formData.subject"
                      required
                      class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      x-model="formData.message"
                      required
                      class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                  
                  <div class="flex justify-end">
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <span x-text="isSubmitting ? 'Sending...' : 'Send Message'"></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Find Us</h2>
            <div class="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-md">
              <!-- Replace this div with an actual map if needed -->
              <div class="flex items-center justify-center h-full">
                <p class="text-gray-500 dark:text-gray-400">Map would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 py-6 shadow-inner">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            &copy; <span x-text="new Date().getFullYear()"></span> Your Company. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">GitHub</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>

  <style>
    /* Define dark mode styles */
    .dark {
      color-scheme: dark;
    }
  </style>
</body>
</html>
`,
  },
  html: {
    basic: (appName: string, description: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <header class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 class="text-2xl font-bold">${appName}</h1>
      <p class="text-gray-500 dark:text-gray-400">${description}</p>
    </div>
  </header>
  
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">Welcome to our application</h2>
      <p class="mb-4">
        This is a simple HTML template for your project.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 class="font-medium text-lg mb-2">Feature One</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Description of the first feature goes here. This explains what the feature does and why it's useful.
          </p>
        </div>
        
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 class="font-medium text-lg mb-2">Feature Two</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Description of the second feature goes here. This explains what the feature does and why it's useful.
          </p>
        </div>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h3 class="font-medium text-lg mb-2">Feature Three</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Description of the third feature goes here. This explains what the feature does and why it's useful.
          </p>
        </div>
        
        <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h3 class="font-medium text-lg mb-2">Feature Four</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Description of the fourth feature goes here. This explains what the feature does and why it's useful.
          </p>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  </main>
  
  <footer class="bg-white dark:bg-gray-800 py-6 shadow-inner mt-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-gray-500 dark:text-gray-400">
        &copy; 2025 ${appName}. All rights reserved.
      </p>
    </div>
  </footer>
</body>
</html>
`,
  }
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
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl font-bold" style={{ color: "${themeColors.primary}" }}>
          ${template.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-300">${description}</p>
      </div>
    </header>
  );
}

export default Header;
`);

  src?.file("components/Footer.js", `import React from 'react';

function Footer() {
  return (
    <footer className="bg-white shadow-md dark:bg-gray-800 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Built with ${template.techStack.join(', ')}
        </p>
        <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-2">
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
          className={\`px-4 py-2 font-medium \${activeTab === 'overview' ? 'border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}\`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('features')}
          className={\`px-4 py-2 font-medium \${activeTab === 'features' ? 'border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}\`}
        >
          Features
        </button>
        <button 
          onClick={() => setActiveTab('tech')}
          className={\`px-4 py-2 font-medium \${activeTab === 'tech' ? 'border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}\`}
        >
          Tech Stack
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "${themeColors.secondary}" }}>
            Project Overview
          </h2>
          <p className="mb-4 dark:text-gray-300">
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
        <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "${themeColors.secondary}" }}>
            Key Features
          </h2>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-green-500">✓</span>
                <span className="dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {activeTab === 'tech' && (
        <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "${themeColors.secondary}" }}>
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {${JSON.stringify(template.techStack)}.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm dark:text-gray-300">
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

@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
    color: #f9fafb;
  }
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

@media (prefers-color-scheme: dark) {
  .app {
    color-scheme: dark;
  }
}
`);

  // Create tailwind config
  zip.file("tailwind.config.js", `module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'media',
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

  // If TypeScript is in the tech stack, add TypeScript versions of files
  if (template.techStack.includes('TypeScript')) {
    // Rename files to .tsx/.ts
    const jsFiles = Object.keys(zip.files).filter(path => path.endsWith('.js') && !path.includes('tailwind.config.js'));
    
    jsFiles.forEach(filePath => {
      const content = zip.file(filePath)?.async('string');
      if (content) {
        content.then(text => {
          const newPath = filePath.replace('.js', filePath.includes('components/') || filePath.includes('pages/') ? '.tsx' : '.ts');
          zip.file(newPath, text);
          zip.remove(filePath);
        });
      }
    });
    
    // Add tsconfig
    zip.file("tsconfig.json", `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}`);
  }
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
  <header class="bg-white shadow-md dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 class="text-2xl font-bold" :style="{ color: primaryColor }">
        ${template.name}
      </h1>
      <p class="text-gray-500 dark:text-gray-300">${description}</p>
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
  <footer class="bg-white shadow-md dark:bg-gray-800 mt-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <p class="text-center text-gray-500 dark:text-gray-400">
        Built with ${template.techStack.join(', ')}
      </p>
      <p class="text-center text-gray-400 dark:text-gray-500 text-sm mt-2">
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
        :class="['px-4', 'py-2', 'font-medium', activeTab === 'overview' ? 'border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400']"
      >
        Overview
      </button>
      <button
        @click="activeTab = 'features'"
        :class="['px-4', 'py-2', 'font-medium', activeTab === 'features' ? 'border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400']"
      >
        Features
      </button>
      <button
        @click="activeTab = 'tech'"
        :class="['px-4', 'py-2', 'font-medium', activeTab === 'tech' ? 'border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400']"
      >
        Tech Stack
      </button>
    </div>
    
    <div v-if="activeTab === 'overview'" class="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
      <h2 class="text-xl font-semibold mb-4" :style="{ color: secondaryColor }">
        Project Overview
      </h2>
      <p class="mb-4 dark:text-gray-300">
        ${description}
      </p>
      <div class="mt-6 flex justify-center">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Get Started
        </button>
      </div>
    </div>
    
    <div v-if="activeTab === 'features'" class="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
      <h2 class="text-xl font-semibold mb-4" :style="{ color: secondaryColor }">
        Key Features
      </h2>
      <ul class="space-y-2">
        <li v-for="(feature, index) in features" :key="index" class="flex items-start">
          <span class="mr-2 text-green-500">✓</span>
          <span class="dark:text-gray-300">{{ feature }}</span>
        </li>
      </ul>
    </div>
    
    <div v-if="activeTab === 'tech'" class="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
      <h2 class="text-xl font-semibold mb-4" :style="{ color: secondaryColor }">
        Technology Stack
      </h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="(tech, index) in techStack" :key="index" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm dark:text-gray-300">
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

@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
    color: #f9fafb;
  }
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
  darkMode: 'media',
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

  // If TypeScript is in the tech stack, add TypeScript versions of files
  if (template.techStack.includes('TypeScript')) {
    // Rename files to .ts
    const jsFiles = Object.keys(zip.files).filter(path => 
      (path.endsWith('.js') && !path.includes('tailwind.config.js') && !path.includes('vue.config.js'))
    );
    
    jsFiles.forEach(filePath => {
      const content = zip.file(filePath)?.async('string');
      if (content) {
        content.then(text => {
          const newPath = filePath.replace('.js', '.ts');
          
          // Add TypeScript typing to Vue components
          if (filePath.includes('router/')) {
            const tsContent = text.replace('import Home from', 'import Home from');
            zip.file(newPath, tsContent);
          } else {
            zip.file(newPath, text);
          }
          
          zip.remove(filePath);
        });
      }
    });
    
    // Add tsconfig
    zip.file("tsconfig.json", `{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}`);
    
    // Add vue-shim.d.ts
    src?.file("vue-shim.d.ts", `declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}`);
  }
}

// Generate a basic HTML/CSS/JS template
function createBasicTemplate(zip: JSZip, template: Template, description: string, themeColors: { primary: string, secondary: string, accent: string }) {
  // Check if we should use Alpine.js
  const useAlpine = template.techStack.includes('Alpine.js');
  
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

@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
    color: #f9fafb;
  }
  
  .card, .tab-content, header, footer {
    background-color: #1f2937 !important;
    color: #f9fafb;
  }
  
  .text-gray-600, .text-gray-500 {
    color: #d1d5db !important;
  }
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

@media (prefers-color-scheme: dark) {
  .tech-tag {
    background-color: #374151;
    color: #f9fafb;
  }
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
  
  if (useAlpine) {
    // If Alpine.js is selected, create the HTML with Alpine.js
    zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="./styles/main.css">
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
  <div x-data="{ 
    activeTab: 'overview',
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    features: [
      'Responsive design',
      'Modern UI components',
      'Customizable themes',
      'Easy to integrate',
      'Well documented'
    ],
    techStack: ${JSON.stringify(template.techStack)}
  }">
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
            <div 
              class="tab" 
              :class="{ 'active': activeTab === 'overview' }"
              @click="activeTab = 'overview'"
            >
              Overview
            </div>
            <div 
              class="tab" 
              :class="{ 'active': activeTab === 'features' }"
              @click="activeTab = 'features'"
            >
              Features
            </div>
            <div 
              class="tab" 
              :class="{ 'active': activeTab === 'tech' }"
              @click="activeTab = 'tech'"
            >
              Tech Stack
            </div>
          </div>
          
          <div x-show="activeTab === 'overview'" class="tab-content">
            <h2>Project Overview</h2>
            <p>${description}</p>
            <div class="text-center mt-20">
              <button class="btn-primary">Get Started</button>
            </div>
          </div>
          
          <div x-show="activeTab === 'features'" class="tab-content" x-cloak>
            <h2>Key Features</h2>
            <ul class="feature-list">
              <template x-for="feature in features" :key="feature">
                <li x-text="feature"></li>
              </template>
            </ul>
          </div>
          
          <div x-show="activeTab === 'tech'" class="tab-content" x-cloak>
            <h2>Technology Stack</h2>
            <div class="tech-stack">
              <template x-for="tech in techStack" :key="tech">
                <div class="tech-tag" x-text="tech"></div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <footer>
      <div class="container">
        <p>Built with <span x-text="techStack.join(', ')"></span></p>
        <p>© <span x-text="new Date().getFullYear()"></span> ${template.name}. All rights reserved.</p>
      </div>
    </footer>
  </div>
  
  <style>
    [x-cloak] { display: none !important; }
  </style>
</body>
</html>`);
  } else {
    // Standard HTML/JS version
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
}

// Generate a complete project based on tech stacks
export const generateCustomProject = async (
  projectName: string,
  description: string,
  selectedTechStacks: string[],
  customTheme?: string
): Promise<string> => {
  try {
    // Create a mock template with selected tech stacks
    const mockTemplate: Template = {
      id: "custom-" + Date.now(),
      name: projectName,
      description: description,
      category: "Other",
      image: "",
      techStack: selectedTechStacks,
      popularity: 0,
      customTheme: customTheme
    };

    // Get theme colors
    const themeColors = getThemeColors(customTheme);
    
    // Create a JSZip instance
    const zip = new JSZip();
    
    // Determine primary framework/library
    const isPrimarilyReact = selectedTechStacks.includes('react');
    const isPrimarilyVue = selectedTechStacks.includes('vue');
    const isPrimarilyAlpine = selectedTechStacks.includes('alpine');
    const useTypeScript = selectedTechStacks.includes('typescript');
    
    // Generate appropriate template
    if (isPrimarilyReact) {
      createReactTemplate(zip, mockTemplate, description, themeColors);
    } else if (isPrimarilyVue) {
      createVueTemplate(zip, mockTemplate, description, themeColors);
    } else if (isPrimarilyAlpine) {
      // Use Alpine.js-based template
      const stylesFolder = zip.folder("styles");
      stylesFolder?.file("main.css", `:root {
  --primary-color: ${themeColors.primary};
  --secondary-color: ${themeColors.secondary};
  --accent-color: ${themeColors.accent};
}

body {
  font-family: 'Inter', sans-serif;
  color: #333;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
    color: #f9fafb;
  }
}

[x-cloak] { display: none !important; }
`);
      
      // Create Alpine.js HTML file
      zip.file("index.html", templateCode.alpine.app(projectName, description));
    } else {
      createBasicTemplate(zip, mockTemplate, description, themeColors);
    }
    
    // Add basic README
    zip.file("README.md", `# ${projectName}

${description}

## About This Project

This project was generated with the following tech stack:

${selectedTechStacks.map(tech => `- ${tech}`).join('\n')}

## Getting Started

1. Extract the ZIP file
2. Open the folder in your favorite code editor
3. Follow the setup instructions below based on your project's tech stack

## Setup Instructions

${isPrimarilyReact 
  ? `### React Project
1. Install dependencies: \`npm install\`
2. Start development server: \`npm start\`
3. Build for production: \`npm run build\``
  : isPrimarilyVue
  ? `### Vue Project
1. Install dependencies: \`npm install\`
2. Start development server: \`npm run serve\`
3. Build for production: \`npm run build\``
  : isPrimarilyAlpine
  ? `### Alpine.js Project
1. Open \`index.html\` in your browser
2. For development, it's recommended to use a local server:
   \`\`\`
   npx serve
   \`\`\``
  : `### HTML/CSS/JS Project
1. Open \`index.html\` in your browser
2. For development, it's recommended to use a local server:
   \`\`\`
   npx serve
   \`\`\``}

## Project Structure

${isPrimarilyReact
  ? `- **src/**
  - **components/**: Reusable UI components
  - **pages/**: Page components
  - **styles/**: CSS files
  - **assets/**: Static assets`
  : isPrimarilyVue
  ? `- **src/**
  - **components/**: Vue components
  - **views/**: Vue pages
  - **assets/**: Static assets
  - **router/**: Vue Router setup`
  : `- **index.html**: Main HTML file
- **styles/**: CSS stylesheets
- **src/**: JavaScript files`}

## Customizing

This template was generated with the theme color: ${customTheme || 'Default'}

You can modify the theme colors in the following locations:

${isPrimarilyReact
  ? `- **src/styles/index.css**: CSS variables
- **tailwind.config.js**: Tailwind theme configuration`
  : isPrimarilyVue
  ? `- **src/assets/styles/main.css**: CSS variables
- **tailwind.config.js**: Tailwind theme configuration`
  : `- **styles/main.css**: CSS variables`}
`);
    
    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: 'blob' });
    return URL.createObjectURL(zipContent);
  } catch (error) {
    console.error("Error generating custom project:", error);
    throw new Error("Failed to generate custom project");
  }
};

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
