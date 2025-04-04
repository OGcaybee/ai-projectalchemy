import { toast } from "sonner";
import JSZip from "jszip";

export type ProjectRequirement = {
  projectType: string;
  description: string;
  features: string[];
  techStack: string[];
  projectName?: string;
  themeColor?: string;
  imageUrls?: string[];
};

export type GeneratedProject = {
  id: string;
  name: string;
  description: string;
  codeSnippets: {
    frontend: string;
    backend: string;
  };
  techStack: string[];
  structure: {
    frontend: string[];
    backend: string[];
  };
  previewImageUrl?: string;
  downloadUrl?: string;
};

// We're switching from Hugging Face to a local template-based generation approach
// which doesn't require any API keys and will be free and reliable
const TEMPLATE_BASED_GENERATION = true;

// Generate project based on requirements
export const generateProject = async (requirements: ProjectRequirement): Promise<GeneratedProject> => {
  try {
    toast.info("Starting project generation...");
    
    // If we're using template-based generation (no API calls)
    if (TEMPLATE_BASED_GENERATION) {
      return generateTemplateBasedProject(requirements);
    }
    
    // This is a fallback for if we want to reimplement API-based generation later
    return generateFallbackProject(requirements);
    
  } catch (error) {
    console.error("Error generating project:", error);
    toast.error("Failed to generate project. Please try again later.");
    throw error;
  }
};

// Our new approach: generate projects based on predefined templates
const generateTemplateBasedProject = async (requirements: ProjectRequirement): Promise<GeneratedProject> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const projectName = requirements.projectName || requirements.projectType || "Generated Project";
  const themeColor = requirements.themeColor || 'default';
  
  // Select the right template based on project type
  let templateHtml = "";
  let templateCss = "";
  let templateJs = "";
  
  // Generate template based on project type
  switch (requirements.projectType.toLowerCase()) {
    case "e-commerce":
      templateHtml = generateEcommerceTemplate(requirements);
      templateCss = generateEcommerceCss(themeColor);
      templateJs = generateEcommerceJs(requirements);
      break;
    case "portfolio":
      templateHtml = generatePortfolioTemplate(requirements);
      templateCss = generatePortfolioCss(themeColor);
      templateJs = generatePortfolioJs(requirements);
      break;
    case "blog":
      templateHtml = generateBlogTemplate(requirements);
      templateCss = generateBlogCss(themeColor);
      templateJs = generateBlogJs(requirements);
      break;
    case "dashboard":
      templateHtml = generateDashboardTemplate(requirements);
      templateCss = generateDashboardCss(themeColor);
      templateJs = generateDashboardJs(requirements);
      break;
    default:
      // Default to a landing page
      templateHtml = generateLandingPageTemplate(requirements);
      templateCss = generateLandingPageCss(themeColor);
      templateJs = generateLandingPageJs(requirements);
  }
  
  // Create a project object
  const generatedProject: GeneratedProject = {
    id: `proj-${Date.now()}`,
    name: projectName,
    description: requirements.description || `A ${requirements.projectType} application`,
    codeSnippets: {
      frontend: templateHtml,
      backend: templateJs
    },
    techStack: [...requirements.techStack],
    structure: {
      frontend: [
        "index.html",
        "styles.css",
        "script.js",
        "assets/"
      ],
      backend: []
    },
    previewImageUrl: requirements.imageUrls && requirements.imageUrls.length > 0 ? requirements.imageUrls[0] : undefined
  };
  
  // Create a downloadable zip file
  try {
    const downloadUrl = await createProjectZip({
      ...generatedProject,
      cssCode: templateCss
    });
    
    generatedProject.downloadUrl = downloadUrl;
  } catch (error) {
    console.error("Error creating downloadable ZIP:", error);
  }
  
  toast.success("Project generated successfully!");
  return generatedProject;
};

// Template generators for different project types
function generateEcommerceTemplate(requirements: ProjectRequirement): string {
  const features = requirements.features || [];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${requirements.projectName || "E-commerce Store"}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <h1>${requirements.projectName || "E-commerce Store"}</h1>
        </div>
        <nav class="nav">
          <ul>
            <li><a href="#" class="active">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <button class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          </button>
          <button class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
          <button class="btn-icon cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
            <span class="cart-count">0</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h2>Welcome to Our Store</h2>
          <p>${requirements.description || "Find the best products for your needs"}</p>
          <button class="btn btn-primary">Shop Now</button>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="products-section">
      <div class="container">
        <h2 class="section-title">Featured Products</h2>
        <div class="products-grid">
          <div class="product-card">
            <div class="product-image">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product">
            </div>
            <div class="product-info">
              <h3>Premium Watch</h3>
              <p class="product-price">$199.99</p>
              <div class="product-rating">
                <span>★★★★☆</span>
                <small>(42 reviews)</small>
              </div>
              <button class="btn btn-sm add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div class="product-card">
            <div class="product-image">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" alt="Product">
            </div>
            <div class="product-info">
              <h3>Wireless Headphones</h3>
              <p class="product-price">$149.99</p>
              <div class="product-rating">
                <span>★★★★★</span>
                <small>(107 reviews)</small>
              </div>
              <button class="btn btn-sm add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div class="product-card">
            <div class="product-image">
              <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" alt="Product">
            </div>
            <div class="product-info">
              <h3>Polaroid Camera</h3>
              <p class="product-price">$89.99</p>
              <div class="product-rating">
                <span>★★★★☆</span>
                <small>(56 reviews)</small>
              </div>
              <button class="btn btn-sm add-to-cart">Add to Cart</button>
            </div>
          </div>
          <div class="product-card">
            <div class="product-image">
              <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f" alt="Product">
            </div>
            <div class="product-info">
              <h3>Stylish Sunglasses</h3>
              <p class="product-price">$79.99</p>
              <div class="product-rating">
                <span>★★★★☆</span>
                <small>(38 reviews)</small>
              </div>
              <button class="btn btn-sm add-to-cart">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="view-all-container">
          <button class="btn btn-outline">View All Products</button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><circle cx="12" cy="20" r="1"></circle></svg>
            </div>
            <h3>Free Shipping</h3>
            <p>Free shipping on all orders over $50</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3>Store Pickup</h3>
            <p>Collect your order from one of our stores</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>
            </div>
            <h3>Quality Guarantee</h3>
            <p>Shop with confidence with our quality guarantee</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10H3"></path><path d="M21 6H3"></path><path d="M21 14H3"></path><path d="M21 18H3"></path></svg>
            </div>
            <h3>Easy Returns</h3>
            <p>30-day return policy for all products</p>
          </div>
        </div>
      </div>
    </section>
    
    ${features.length > 0 ? `
    <!-- Custom Features Section -->
    <section class="custom-features-section">
      <div class="container">
        <h2 class="section-title">Store Features</h2>
        <div class="custom-features-grid">
          ${features.map(feature => `
            <div class="custom-feature-card">
              <h3>${feature}</h3>
              <p>Implemented with care and attention to detail.</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}
    
    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest updates on new products and upcoming sales</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email address" required>
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><a href="#">All Products</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Sale Items</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>About Us</h3>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} ${requirements.projectName || "E-commerce Store"}. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;
}

function generateEcommerceCss(themeColor: string): string {
  // Get theme color values
  const colors = getThemeColors(themeColor);
  
  return `/* E-commerce Store Styles */
:root {
  --primary-color: ${colors.primary};
  --secondary-color: ${colors.secondary};
  --accent-color: ${colors.accent};
  --text-color: #333;
  --light-gray: #f8f9fa;
  --border-color: #e2e8f0;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 0.95rem;
}

.btn-sm {
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.btn-outline:hover {
  background-color: var(--light-gray);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: var(--text-color);
}

/* Header */
.header {
  background-color: white;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo h1 {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.nav ul {
  display: flex;
}

.nav ul li {
  margin-right: 1.5rem;
}

.nav ul li a {
  position: relative;
  padding-bottom: 5px;
}

.nav ul li a.active::after,
.nav ul li a:hover::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-icon {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hero Section */
.hero {
  background-color: var(--light-gray);
  padding: 4rem 0;
  text-align: center;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.hero p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #666;
}

/* Products Section */
.products-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background-color: var(--primary-color);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 1.2rem;
}

.product-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.7rem;
}

.product-rating {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.product-rating span {
  color: #ffc107;
  margin-right: 0.5rem;
}

.product-rating small {
  color: #666;
}

.view-all-container {
  text-align: center;
  margin-top: 3rem;
}

/* Features Section */
.features-section {
  background-color: var(--light-gray);
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: var(--shadow);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background-color: var(--light-gray);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: var(--primary-color);
}

.feature-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.feature-card p {
  color: #666;
  font-size: 0.9rem;
}

/* Custom Features Section */
.custom-features-section {
  padding: 4rem 0;
}

.custom-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.custom-feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border-left: 4px solid var(--primary-color);
}

.custom-feature-card h3 {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.custom-feature-card p {
  color: #666;
  font-size: 0.9rem;
}

/* Newsletter Section */
.newsletter-section {
  background-color: var(--primary-color);
  color: white;
  padding: 4rem 0;
}

.newsletter-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-content h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.newsletter-content p {
  margin-bottom: 2rem;
  opacity: 0.9;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 0.95rem;
}

.newsletter-form button {
  border-radius: 0 4px 4px 0;
  background-color: white;
  color: var(--primary-color);
}

.newsletter-form button:hover {
  background-color: var(--light-gray);
}

/* Footer */
.footer {
  background-color: var(--light-gray);
  padding-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding-bottom: 3rem;
}

.footer-section h3 {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.footer-section h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 30px;
  height: 2px;
  background-color: var(--primary-color);
}

.footer-section ul li {
  margin-bottom: 0.7rem;
}

.footer-section ul li a {
  color: #666;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--primary-color);
  color: white;
}

.footer-bottom {
  text-align: center;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-color);
  font-size: 0.9rem;
  color: #666;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .header-content {
    height: auto;
    flex-direction: column;
    padding: 1rem 0;
  }
  
  .nav {
    margin: 1rem 0;
  }
  
  .nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav ul li {
    margin: 0 0.7rem 0.5rem;
  }
  
  .hero {
    padding: 3rem 0;
  }
  
  .hero h2 {
    font-size: 2rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form input {
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .newsletter-form button {
    border-radius: 4
