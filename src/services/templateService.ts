
export type Template = {
  id: string;
  name: string;
  description: string;
  category: 'Dashboard' | 'E-commerce' | 'Portfolio' | 'Blog' | 'Other';
  image: string;
  techStack: string[];
  popularity: number;
};

// Mock template data
const templates: Template[] = [
  {
    id: "template-1",
    name: "Admin Dashboard",
    description: "Complete admin dashboard with analytics, user management, and data visualization",
    category: "Dashboard",
    image: "/lovable-uploads/4a7b9440-eda6-4273-bebc-4a08e6ae4c26.png",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    popularity: 95
  },
  {
    id: "template-2",
    name: "E-commerce Store",
    description: "Fully-featured online store with product catalog, cart, and checkout",
    category: "E-commerce",
    image: "/lovable-uploads/4a7b9440-eda6-4273-bebc-4a08e6ae4c26.png",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    popularity: 92
  },
  {
    id: "template-3",
    name: "Developer Portfolio",
    description: "Professional portfolio website for developers with project showcase",
    category: "Portfolio",
    image: "/lovable-uploads/4a7b9440-eda6-4273-bebc-4a08e6ae4c26.png",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    popularity: 88
  },
  {
    id: "template-4",
    name: "Content Blog",
    description: "Clean and minimal blog with content management system",
    category: "Blog",
    image: "/lovable-uploads/4a7b9440-eda6-4273-bebc-4a08e6ae4c26.png",
    techStack: ["React", "GraphQL", "Contentful"],
    popularity: 85
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
