
export const templateThumbnails = {
  dashboard: "/lovable-uploads/dashboard-template.png",
  ecommerce: "/lovable-uploads/ecommerce-template.png",
  portfolio: "/lovable-uploads/portfolio-template.png",
  blog: "/lovable-uploads/blog-template.png",
  saas: "/lovable-uploads/saas-template.png",
  mobileApp: "/lovable-uploads/mobile-app-template.png",
  landingPage: "/lovable-uploads/landing-page-template.png",
  adminDashboard: "/lovable-uploads/admin-dashboard.png",
  contentBlog: "/lovable-uploads/content-blog.png",
  analyticsApp: "/lovable-uploads/analytics-app.png",
  ecommerceMobile: "/lovable-uploads/ecommerce-mobile.png",
  personalPortfolio: "/lovable-uploads/personal-portfolio.png",
  default: "/lovable-uploads/4a7b9440-eda6-4273-bebc-4a08e6ae4c26.png"
};

export const backgroundImages = {
  login: "/lovable-uploads/login-bg.png",
  signup: "/lovable-uploads/signup-bg.png",
  docs: "/lovable-uploads/docs-bg.png",
  hero: "/lovable-uploads/hero-banner.png"
};

// Function to get a template thumbnail by name or fallback to default
export const getTemplateThumbnail = (name: string): string => {
  const normalizedName = name.toLowerCase().replace(/\s+/g, '');
  
  // Check for direct matches in templateThumbnails
  for (const [key, value] of Object.entries(templateThumbnails)) {
    if (key.toLowerCase() === normalizedName) {
      return value;
    }
  }
  
  // Check for partial matches in templateThumbnails
  for (const [key, value] of Object.entries(templateThumbnails)) {
    if (normalizedName.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedName)) {
      return value;
    }
  }
  
  // If no match found, return default
  return templateThumbnails.default;
};
