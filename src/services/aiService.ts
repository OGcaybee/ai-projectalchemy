import { generateProjectCss } from "./cssGenerationService";
import { enhanceProjectContent } from "./aiServiceEnhancer";

export interface ProjectRequirement {
  projectType: string;
  projectName: string;
  themeColor?: string;
  layout?: string;
  features?: string[];
  description?: string;
  targetAudience?: string;
  complexity?: string;
  customInstructions?: string;
}

interface GeneratedProject {
  html: string;
  css: string;
  js: string;
}

// Generate project based on requirements
export const generateProject = async (requirements: ProjectRequirement): Promise<GeneratedProject> => {
  console.log("Generating project with requirements:", requirements);

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate HTML based on project type and requirements
    const html = generateHtml(requirements);
    
    // Generate CSS using the separate service
    const css = generateProjectCss(requirements);
    
    // Generate JS based on project type and features
    const js = generateJs(requirements);

    return { html, css, js };
  } catch (error) {
    console.error("Error in project generation:", error);
    throw new Error("Failed to generate project. Please try again.");
  }
};

// Generate project using AI prompt
export const generateWithAI = async (prompt: string): Promise<GeneratedProject> => {
  console.log("Generating project with AI prompt:", prompt);

  try {
    // Simulate API call delay (would be real AI processing time in production)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract project requirements from the prompt
    const projectType = extractProjectType(prompt);
    const features = extractFeatures(prompt);
    const themeColor = extractColor(prompt);

    // Construct a project requirement object
    const requirements: ProjectRequirement = {
      projectType,
      projectName: "AI Generated Project",
      themeColor,
      features,
      description: prompt,
    };

    // Generate base content
    let html = generateAIHtml(prompt, requirements);
    let css = generateAICss(prompt, requirements);
    let js = generateAIJs(prompt, requirements);

    // Enhance content using the new service
    const enhancedContent = await enhanceProjectContent(prompt, { html, css, js });
    
    return enhancedContent;
  } catch (error) {
    console.error("Error in AI generation:", error);
    throw new Error("Failed to generate project with AI. Please try again.");
  }
};

// Helper function to extract project type from prompt
const extractProjectType = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes("e-commerce") || promptLower.includes("ecommerce") || promptLower.includes("shop")) {
    return "e-commerce";
  } else if (promptLower.includes("blog") || promptLower.includes("article")) {
    return "blog";
  } else if (promptLower.includes("portfolio") || promptLower.includes("resume")) {
    return "portfolio";
  } else if (promptLower.includes("landing") || promptLower.includes("splash")) {
    return "landing-page";
  } else if (promptLower.includes("dashboard") || promptLower.includes("admin")) {
    return "dashboard";
  } else {
    return "website";
  }
};

// Helper function to extract features from prompt
const extractFeatures = (prompt: string): string[] => {
  const features: string[] = [];
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes("responsive") || promptLower.includes("mobile")) {
    features.push("responsive");
  }
  
  if (promptLower.includes("dark mode") || promptLower.includes("dark theme")) {
    features.push("darkMode");
  }
  
  if (promptLower.includes("animation") || promptLower.includes("transition")) {
    features.push("animations");
  }
  
  if (promptLower.includes("login") || promptLower.includes("sign in") || promptLower.includes("register")) {
    features.push("authentication");
  }
  
  if (promptLower.includes("form") || promptLower.includes("contact")) {
    features.push("forms");
  }
  
  if (promptLower.includes("gallery") || promptLower.includes("slider") || promptLower.includes("carousel")) {
    features.push("gallery");
  }
  
  // Ensure we have at least some features
  if (features.length === 0) {
    features.push("responsive");
  }
  
  return features;
};

// Helper function to extract color from prompt
const extractColor = (prompt: string): string | undefined => {
  const promptLower = prompt.toLowerCase();
  const colorMapping: Record<string, string> = {
    blue: "blue",
    green: "green",
    red: "red",
    purple: "purple",
    orange: "orange",
    pink: "pink",
    yellow: "yellow",
    teal: "teal",
    gray: "gray"
  };
  
  for (const [colorName, colorValue] of Object.entries(colorMapping)) {
    if (promptLower.includes(colorName)) {
      return colorValue;
    }
  }
  
  return undefined;
};

// Base HTML generation function
const generateHtml = (requirements: ProjectRequirement): string => {
  const { projectType, projectName, features = [] } = requirements;
  
  // Template selection based on project type
  switch (projectType) {
    case "landing-page":
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="hero">
    <nav class="navbar">
      <div class="container">
        <h1 class="logo">${projectName}</h1>
        <ul class="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
    
    <div class="container hero-content">
      <div class="hero-text">
        <h2>Welcome to ${projectName}</h2>
        <p>The best solution for your business needs</p>
        <button class="btn-primary">Get Started</button>
      </div>
      <div class="hero-image">
        <img src="https://via.placeholder.com/600x400" alt="Hero Image">
      </div>
    </div>
  </header>

  <section id="features" class="features">
    <div class="container">
      <h2>Our Features</h2>
      <div class="features-grid">
        <div class="feature">
          <div class="feature-icon">📈</div>
          <h3>Feature 1</h3>
          <p>Description of feature 1</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🔒</div>
          <h3>Feature 2</h3>
          <p>Description of feature 2</p>
        </div>
        <div class="feature">
          <div class="feature-icon">💡</div>
          <h3>Feature 3</h3>
          <p>Description of feature 3</p>
        </div>
      </div>
    </div>
  </section>

  <section id="about" class="about">
    <div class="container">
      <div class="about-content">
        <div class="about-image">
          <img src="https://via.placeholder.com/500x300" alt="About Us">
        </div>
        <div class="about-text">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ipsum ac feugiat luctus. Cras auctor mi in semper tempus.</p>
          <p>Praesent eu tristique nisl. Donec vel ipsum eu quam feugiat suscipit.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" class="pricing">
    <div class="container">
      <h2>Pricing Plans</h2>
      <div class="pricing-grid">
        <div class="pricing-plan">
          <h3>Basic</h3>
          <p class="price">$9.99<span>/month</span></p>
          <ul class="plan-features">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <button class="btn-secondary">Choose Plan</button>
        </div>
        <div class="pricing-plan popular">
          <div class="popular-tag">Popular</div>
          <h3>Pro</h3>
          <p class="price">$19.99<span>/month</span></p>
          <ul class="plan-features">
            <li>All Basic Features</li>
            <li>Feature 4</li>
            <li>Feature 5</li>
            <li>Feature 6</li>
          </ul>
          <button class="btn-primary">Choose Plan</button>
        </div>
        <div class="pricing-plan">
          <h3>Enterprise</h3>
          <p class="price">$29.99<span>/month</span></p>
          <ul class="plan-features">
            <li>All Pro Features</li>
            <li>Feature 7</li>
            <li>Feature 8</li>
            <li>Feature 9</li>
          </ul>
          <button class="btn-secondary">Choose Plan</button>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="contact">
    <div class="container">
      <h2>Contact Us</h2>
      <div class="contact-content">
        <form class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" rows="5" required></textarea>
          </div>
          <button type="submit" class="btn-primary">Send Message</button>
        </form>
        <div class="contact-info">
          <h3>Get in Touch</h3>
          <p>Have questions? Reach out to us!</p>
          <div class="info-item">
            <span class="info-icon">📍</span>
            <p>123 Street Name, City, Country</p>
          </div>
          <div class="info-item">
            <span class="info-icon">📞</span>
            <p>+1 234 5678 900</p>
          </div>
          <div class="info-item">
            <span class="info-icon">✉️</span>
            <p>info@example.com</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <h3>${projectName}</h3>
          <p>© ${new Date().getFullYear()} ${projectName}. All rights reserved.</p>
        </div>
        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-newsletter">
          <h4>Subscribe to our Newsletter</h4>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email address">
            <button type="submit" class="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;

    // Add more cases for other project types...
    case "blog":
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <h1 class="logo">${projectName}</h1>
        <ul class="nav-links">
          <li><a href="#" class="active">Home</a></li>
          <li><a href="#">Categories</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <div class="featured-post">
        <div class="post-image">
          <img src="https://via.placeholder.com/1200x600" alt="Featured Post">
        </div>
        <div class="post-content">
          <div class="post-meta">
            <span class="category">Technology</span>
            <span class="date">March 15, 2023</span>
          </div>
          <h2>The Future of Web Development</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at elit vel turpis varius porttitor et id risus.</p>
          <a href="#" class="read-more">Read More</a>
        </div>
      </div>
    </div>
  </section>

  <section class="blog-posts">
    <div class="container">
      <h2 class="section-title">Latest Articles</h2>
      
      <div class="posts-grid">
        <!-- Post 1 -->
        <article class="post-card">
          <div class="post-image">
            <img src="https://via.placeholder.com/400x300" alt="Post 1">
          </div>
          <div class="post-content">
            <div class="post-meta">
              <span class="category">Design</span>
              <span class="date">March 10, 2023</span>
            </div>
            <h3>10 UI Design Trends in 2023</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel turpis varius porttitor et id risus.</p>
            <a href="#" class="read-more">Read More</a>
          </div>
        </article>
        
        <!-- Post 2 -->
        <article class="post-card">
          <div class="post-image">
            <img src="https://via.placeholder.com/400x300" alt="Post 2">
          </div>
          <div class="post-content">
            <div class="post-meta">
              <span class="category">Development</span>
              <span class="date">March 5, 2023</span>
            </div>
            <h3>Getting Started with React</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel turpis varius porttitor et id risus.</p>
            <a href="#" class="read-more">Read More</a>
          </div>
        </article>
        
        <!-- Post 3 -->
        <article class="post-card">
          <div class="post-image">
            <img src="https://via.placeholder.com/400x300" alt="Post 3">
          </div>
          <div class="post-content">
            <div class="post-meta">
              <span class="category">Business</span>
              <span class="date">February 28, 2023</span>
            </div>
            <h3>Building a Successful Online Business</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel turpis varius porttitor et id risus.</p>
            <a href="#" class="read-more">Read More</a>
          </div>
        </article>
        
        <!-- Post 4 -->
        <article class="post-card">
          <div class="post-image">
            <img src="https://via.placeholder.com/400x300" alt="Post 4">
          </div>
          <div class="post-content">
            <div class="post-meta">
              <span class="category">Productivity</span>
              <span class="date">February 22, 2023</span>
            </div>
            <h3>5 Tips to Boost Your Productivity</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel turpis varius porttitor et id risus.</p>
            <a href="#" class="read-more">Read More</a>
          </div>
        </article>
      </div>
      
      <div class="pagination">
        <a href="#" class="active">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#" class="next">Next →</a>
      </div>
    </div>
  </section>
  
  <aside class="sidebar">
    <div class="container">
      <div class="sidebar-content">
        <!-- About Widget -->
        <div class="widget about-widget">
          <h3 class="widget-title">About</h3>
          <div class="about-content">
            <img src="https://via.placeholder.com/150" alt="Author" class="author-image">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel turpis varius porttitor et id risus.</p>
          </div>
        </div>
        
        <!-- Categories Widget -->
        <div class="widget categories-widget">
          <h3 class="widget-title">Categories</h3>
          <ul class="categories-list">
            <li><a href="#">Technology <span>(12)</span></a></li>
            <li><a href="#">Design <span>(8)</span></a></li>
            <li><a href="#">Development <span>(15)</span></a></li>
            <li><a href="#">Business <span>(7)</span></a></li>
            <li><a href="#">Productivity <span>(5)</span></a></li>
          </ul>
        </div>
        
        <!-- Popular Posts Widget -->
        <div class="widget popular-posts-widget">
          <h3 class="widget-title">Popular Posts</h3>
          <ul class="popular-posts">
            <li>
              <div class="post-image">
                <img src="https://via.placeholder.com/100x70" alt="Popular Post">
              </div>
              <div class="post-info">
                <h4><a href="#">The Future of AI in Web Development</a></h4>
                <span class="date">March 1, 2023</span>
              </div>
            </li>
            <li>
              <div class="post-image">
                <img src="https://via.placeholder.com/100x70" alt="Popular Post">
              </div>
              <div class="post-info">
                <h4><a href="#">How to Optimize Your Website Performance</a></h4>
                <span class="date">February 15, 2023</span>
              </div>
            </li>
            <li>
              <div class="post-image">
                <img src="https://via.placeholder.com/100x70" alt="Popular Post">
              </div>
              <div class="post-info">
                <h4><a href="#">10 Essential Tools for Every Developer</a></h4>
                <span class="date">February 10, 2023</span>
              </div>
            </li>
          </ul>
        </div>
        
        <!-- Newsletter Widget -->
        <div class="widget newsletter-widget">
          <h3 class="widget-title">Newsletter</h3>
          <p>Subscribe to our newsletter and get the latest updates straight to your inbox.</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email address">
            <button type="submit" class="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </aside>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <h3>${projectName}</h3>
          <p>© ${new Date().getFullYear()} ${projectName}. All rights reserved.</p>
        </div>
        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="footer-social">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;
    
    default:
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <h1 class="logo">${projectName}</h1>
        <ul class="nav-links">
          <li><a href="#" class="active">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h2>Welcome to ${projectName}</h2>
        <p>This is a sample website generated by ThynkAI</p>
        <button class="btn-primary">Learn More</button>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Our Features</h2>
        <div class="features-grid">
          <div class="feature">
            <h3>Feature 1</h3>
            <p>Description of feature 1</p>
          </div>
          <div class="feature">
            <h3>Feature 2</h3>
            <p>Description of feature 2</p>
          </div>
          <div class="feature">
            <h3>Feature 3</h3>
            <p>Description of feature 3</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${projectName}. All rights reserved.</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;
  }
};

// Generate AI HTML based on prompt
const generateAIHtml = (prompt: string, requirements: ProjectRequirement): string => {
  // For simplicity, we're using the same HTML generation
  return generateHtml(requirements);
};

// Generate AI CSS based on prompt
const generateAICss = (prompt: string, requirements: ProjectRequirement): string => {
  // For simplicity, we're using the CSS generation service
  return generateProjectCss(requirements);
};

// Generate JS based on project type and features
const generateJs = (requirements: ProjectRequirement): string => {
  const { features = [] } = requirements;
  
  let js = `// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
  console.log('${requirements.projectName} - DOM fully loaded and parsed');
  
  // Initialize the application
  initApp();
});

// Initialize the application
function initApp() {
  // Add event listeners
  addEventListeners();
  
  // Other initialization code
  ${features.includes("animations") ? "initAnimations();" : ""}
  ${features.includes("darkMode") ? "initDarkMode();" : ""}
}

// Add event listeners to elements
function addEventListeners() {
  // Get navigation links
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Add click event listener to each link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      navLinks.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
    });
  });
  
  // Form submission handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      form.reset();
      alert('Thank you for your submission!');
    });
  });
}`;

  // Add feature-specific JS
  if (features.includes("animations")) {
    js += `

// Initialize animations
function initAnimations() {
  // Set up intersection observer to trigger animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all elements with animation class
  document.querySelectorAll('.animated').forEach(element => {
    observer.observe(element);
  });
}`;
  }

  if (features.includes("darkMode")) {
    js += `

// Initialize dark mode
function initDarkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  const body = document.body;
  
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    if (darkModeToggle) {
      const toggleInput = darkModeToggle.querySelector('input');
      if (toggleInput) toggleInput.checked = true;
    }
  }
  
  // Add event listener to toggle if it exists
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}`;
  }

  return js;
};

// Generate AI JS based on prompt
const generateAIJs = (prompt: string, requirements: ProjectRequirement): string => {
  // For simplicity, we're using the same JS generation
  return generateJs(requirements);
};

export default {
  generateProject,
  generateWithAI
};
