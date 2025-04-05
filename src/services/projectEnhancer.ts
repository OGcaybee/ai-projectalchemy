
import { ProjectRequirement, GeneratedProject } from '@/services/aiService';

// Define interfaces for enhanced project structures
interface EnhancedCodeSection {
  name: string;
  content: string;
  language: string;
}

interface EnhancedComponent {
  name: string;
  description: string;
  code: EnhancedCodeSection;
  dependencies?: string[];
}

interface EnhancedProjectStructure {
  frontend: {
    components: EnhancedComponent[];
    pages: EnhancedComponent[];
    styles: EnhancedCodeSection[];
    utils: EnhancedCodeSection[];
  };
  backend: {
    routes: EnhancedCodeSection[];
    models: EnhancedCodeSection[];
    controllers: EnhancedCodeSection[];
    services: EnhancedCodeSection[];
  };
  configuration: EnhancedCodeSection[];
}

export interface EnhancedProject extends GeneratedProject {
  enhancedStructure: EnhancedProjectStructure;
  features: string[];
  complexity: 'basic' | 'intermediate' | 'advanced';
  estimatedDevelopmentTime: string;
  designSystem?: {
    colors: Record<string, string>;
    typography: Record<string, string>;
    spacing: Record<string, string>;
  };
}

// Collection of React component templates for different project types
const componentTemplates = {
  // Navigation components
  Navbar: {
    basic: `import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">Logo</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 font-medium">
                Home
              </Link>
              <Link to="/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 font-medium">
                Products
              </Link>
              <Link to="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 font-medium">
                About
              </Link>
              <Link to="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <Link to="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md">Login</Link>
            <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Sign up</Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button type="button" className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;`,
    advanced: `import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={\`fixed w-full z-50 transition-all duration-300 \${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}\`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Brand</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={\`relative text-base font-medium \${
                  isActivePath(link.path) 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                } transition-colors duration-200\`}
              >
                {link.name}
                {isActivePath(link.path) && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-200">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200">
              Sign Up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={\`block px-3 py-2 rounded-md text-base font-medium \${
                    isActivePath(link.path)
                      ? 'text-white bg-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }\`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center justify-between px-3">
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;`
  },
  
  // Product Card component for e-commerce
  ProductCard: {
    basic: `import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        <button 
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;`,
    advanced: `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize,
      quantity
    });
  };

  return (
    <motion.div 
      className="rounded-lg overflow-hidden bg-white"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-w-3 aspect-h-4">
        <img 
          src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        <div 
          className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <button 
            className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium transform hover:scale-105 transition-transform"
            onClick={() => window.location.href = \`/product/\${product.id}\`}
          >
            View Details
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <div className="flex items-center">
            {product.originalPrice && product.originalPrice > product.price ? (
              <>
                <span className="text-gray-400 line-through text-sm mr-2">${product.originalPrice.toFixed(2)}</span>
                <span className="text-red-600 font-medium">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-gray-900 font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        {product.rating && (
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={\`w-4 h-4 \${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}\`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>
        )}
        
        {product.sizes && (
          <div className="mt-3">
            <p className="text-sm text-gray-700 mb-1">Size:</p>
            <div className="flex space-x-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={\`px-2 py-1 text-xs border rounded \${
                    selectedSize === size 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }\`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border rounded">
            <button 
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              -
            </button>
            <span className="px-2 py-1 text-gray-800">{quantity}</span>
            <button 
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors duration-200"
            onClick={handleAddToCart}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;`
  },
  
  // Hero section for landing pages
  Hero: {
    basic: `import React from 'react';

const Hero = () => {
  return (
    <div className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Our Website
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The best solution for your needs. Discover our amazing products and services.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;`,
    advanced: `import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ title, subtitle, ctaText, ctaUrl, secondaryCtaText, secondaryCtaUrl, image, videoUrl }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
      {/* Background pattern */}
      <div className="hidden lg:block lg:absolute lg:inset-0">
        <svg
          className="absolute left-0 transform translate-y-1/3 -translate-x-1/4 lg:translate-x-0 opacity-20"
          width="640"
          height="784"
          fill="none"
          viewBox="0 0 640 784"
        >
          <defs>
            <pattern
              id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
              x="118"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect y="72" width="640" height="640" className="text-white" fill="currentColor" />
          <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <motion.div 
          className="lg:grid lg:grid-cols-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center"
            variants={itemVariants}
          >
            <div>
              <motion.div 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-5 bg-gray-100 text-gray-800 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span>New Release</span>
              </motion.div>
              <motion.h1 
                className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-5xl lg:mt-6 xl:text-6xl"
                variants={itemVariants}
              >
                <span className="block">{title}</span>
                <span className="block text-blue-600">{subtitle}</span>
              </motion.h1>
              <motion.p 
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>
              <motion.div 
                className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
                variants={itemVariants}
              >
                <form action="#" method="POST" className="sm:flex">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button 
                      type="submit" 
                      className="block w-full py-3 px-4 rounded-md shadow bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-xs text-gray-500">
                  By signing up, you agree to our terms and conditions.
                </p>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex space-x-4"
                variants={itemVariants}
              >
                <a
                  href={ctaUrl}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {ctaText || 'Get Started'}
                </a>
                <a
                  href={secondaryCtaUrl}
                  className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  {secondaryCtaText || 'Learn More'}
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            variants={itemVariants}
          >
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                {videoUrl ? (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={videoUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full object-cover"
                    ></iframe>
                  </div>
                ) : (
                  <img
                    className="w-full"
                    src={image || 'https://images.unsplash.com/photo-1556740749-887f6717d7e4'}
                    alt="App screenshot"
                  />
                )}
                {!videoUrl && (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <button
                      type="button"
                      className="flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Trusted by section */}
        <motion.div 
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="sm:text-center">
            <p className="text-base text-gray-500 font-medium">Trusted by over 5000+ companies</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className="h-12 opacity-50 hover:opacity-100 transition-opacity duration-200" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className="h-12 opacity-50 hover:opacity-100 transition-opacity duration-200" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className="h-12 opacity-50 hover:opacity-100 transition-opacity duration-200" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
              <img className="h-12 opacity-50 hover:opacity-100 transition-opacity duration-200" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Transistor" />
            </div>
            <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
              <img className="h-12 opacity-50 hover:opacity-100 transition-opacity duration-200" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Workcation" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;`
  }
};

// Utility functions to enhance project generation
export const enhanceProject = (project: GeneratedProject, requirements: ProjectRequirement): EnhancedProject => {
  // Determine project complexity based on requirements
  const complexity = determineProjectComplexity(requirements);
  
  // Generate enhanced structure based on project type
  const enhancedStructure = generateEnhancedStructure(requirements, complexity);
  
  // Generate estimated development time based on complexity
  const estimatedDevelopmentTime = generateEstimatedTime(complexity, requirements);
  
  // Generate a design system based on theme color
  const designSystem = generateDesignSystem(requirements.themeColor);
  
  // Create enhanced project object
  const enhancedProject: EnhancedProject = {
    ...project,
    enhancedStructure,
    features: requirements.features,
    complexity,
    estimatedDevelopmentTime,
    designSystem
  };
  
  return enhancedProject;
};

// Helper function to determine project complexity
const determineProjectComplexity = (requirements: ProjectRequirement): 'basic' | 'intermediate' | 'advanced' => {
  const { features, techStack, description } = requirements;
  
  // Count complexity factors
  let complexityScore = 0;
  
  // More features = more complex
  complexityScore += features.length * 0.5;
  
  // Check for advanced technologies
  const advancedTechs = ['GraphQL', 'TypeScript', 'Redux', 'Firebase', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'WebSockets', 'Three.js'];
  advancedTechs.forEach(tech => {
    if (techStack.includes(tech)) complexityScore += 1;
  });
  
  // Check description for complexity indicators
  const complexityIndicators = ['complex', 'advanced', 'real-time', 'interactive', 'dashboard', 'authentication', 'secure', 'scalable'];
  complexityIndicators.forEach(indicator => {
    if (description.toLowerCase().includes(indicator)) complexityScore += 0.5;
  });
  
  // Determine complexity level
  if (complexityScore >= 5) {
    return 'advanced';
  } else if (complexityScore >= 2) {
    return 'intermediate';
  }
  return 'basic';
};

// Generate the enhanced structure for the project
const generateEnhancedStructure = (requirements: ProjectRequirement, complexity: string): EnhancedProjectStructure => {
  const projectType = requirements.projectType.toLowerCase();
  const isReact = requirements.techStack.some(tech => tech.includes('React'));
  const isNode = requirements.techStack.some(tech => tech.includes('Node'));
  
  // Initialize structure
  const structure: EnhancedProjectStructure = {
    frontend: {
      components: [],
      pages: [],
      styles: [],
      utils: []
    },
    backend: {
      routes: [],
      models: [],
      controllers: [],
      services: []
    },
    configuration: []
  };
  
  // Add common components based on project type
  if (projectType.includes('e-commerce')) {
    // Add e-commerce specific components
    structure.frontend.components.push({
      name: 'Navbar',
      description: 'Main navigation component with cart icon and user menu',
      code: {
        name: 'Navbar.jsx',
        content: complexity === 'advanced' ? componentTemplates.Navbar.advanced : componentTemplates.Navbar.basic,
        language: 'jsx'
      }
    });
    
    structure.frontend.components.push({
      name: 'ProductCard',
      description: 'Display individual product with image, title, price, and add to cart button',
      code: {
        name: 'ProductCard.jsx',
        content: complexity === 'advanced' ? componentTemplates.ProductCard.advanced : componentTemplates.ProductCard.basic,
        language: 'jsx'
      }
    });
    
    // Add more e-commerce specific files
    if (complexity !== 'basic') {
      structure.frontend.utils.push({
        name: 'cartUtils.js',
        content: `// Utility functions for shopping cart operations
export const addToCart = (item, cart) => {
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    return cart.map(cartItem => 
      cartItem.id === item.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1 } 
        : cartItem
    );
  }
  
  return [...cart, { ...item, quantity: 1 }];
};

export const removeFromCart = (itemId, cart) => {
  return cart.filter(item => item.id !== itemId);
};

export const updateQuantity = (itemId, quantity, cart) => {
  return cart.map(item => 
    item.id === itemId ? { ...item, quantity } : item
  );
};

export const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};`,
        language: 'javascript'
      });
    }
  }
  else if (projectType.includes('blog') || projectType.includes('content')) {
    // Add blog specific components and files
    structure.frontend.components.push({
      name: 'ArticlePreview',
      description: 'Component for showing article preview with image, title, excerpt, and date',
      code: {
        name: 'ArticlePreview.jsx',
        content: `import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';

const ArticlePreview = ({ article }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
      <Link to={\`/articles/\${article.slug}\`}>
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <div>
          <span className="text-sm text-blue-500 font-medium">
            {article.category}
          </span>
          <Link
            to={\`/articles/\${article.slug}\`}
            className="block mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {article.title}
          </Link>
          <p className="mt-2 text-gray-600 line-clamp-3">
            {article.excerpt}
          </p>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={article.author.avatar}
              alt={article.author.name}
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {article.author.name}
            </p>
            <div className="flex text-sm text-gray-500">
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
              <span className="mx-1">•</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;`,
        language: 'jsx'
      }
    });
    
    structure.frontend.utils.push({
      name: 'dateUtils.js',
      content: `// Date formatting utility functions
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return \`\${diffInMinutes} \${diffInMinutes === 1 ? 'minute' : 'minutes'} ago\`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return \`\${diffInHours} \${diffInHours === 1 ? 'hour' : 'hours'} ago\`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return \`\${diffInDays} \${diffInDays === 1 ? 'day' : 'days'} ago\`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return \`\${diffInMonths} \${diffInMonths === 1 ? 'month' : 'months'} ago\`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return \`\${diffInYears} \${diffInYears === 1 ? 'year' : 'years'} ago\`;
};`,
      language: 'javascript'
    });
  }
  else if (projectType.includes('dashboard') || projectType.includes('admin')) {
    // Add dashboard specific components
    structure.frontend.components.push({
      name: 'DashboardSidebar',
      description: 'Sidebar navigation for the dashboard with links to various sections',
      code: {
        name: 'DashboardSidebar.jsx',
        content: `import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'ChartPieIcon' },
  { name: 'Customers', href: '/dashboard/customers', icon: 'UsersIcon' },
  { name: 'Products', href: '/dashboard/products', icon: 'ShoppingBagIcon' },
  { name: 'Orders', href: '/dashboard/orders', icon: 'ClipboardListIcon' },
  { name: 'Reports', href: '/dashboard/reports', icon: 'DocumentReportIcon' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'CogIcon' },
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  const renderIcon = (iconName) => {
    // This is a placeholder for actual icons
    return (
      <svg className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  };
  
  const isActiveLink = (href) => {
    return location.pathname === href || location.pathname.startsWith(\`\${href}/\`);
  };
  
  return (
    <div className="h-full bg-gray-800 w-64 flex flex-col">
      <div className="h-16 flex items-center px-4 bg-gray-900">
        <div className="flex-shrink-0 flex items-center">
          <img
            className="h-8 w-auto"
            src="/logo.svg"
            alt="Logo"
          />
          <span className="ml-2 text-white text-lg font-medium">Admin Panel</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={\`group flex items-center px-2 py-2 text-sm font-medium rounded-md \${
                isActiveLink(item.href)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }\`}
            >
              {renderIcon(item.icon)}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User profile"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Tom Cook</p>
            <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;`,
        language: 'jsx'
      }
    });
    
    structure.frontend.components.push({
      name: 'StatsCard',
      description: 'Card component for displaying statistics',
      code: {
        name: 'StatsCard.jsx',
        content: `import React from 'react';

const StatsCard = ({ title, value, icon, change, changeType = 'increase', previousValue }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={\`p-3 rounded-md \${
              changeType === 'increase' ? 'bg-green-500' : 'bg-red-500'
            } bg-opacity-10\`}>
              {icon || (
                <svg className={`w-6 h-6 \${
                  changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              )}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              {change && (
                <div className={\`ml-2 flex items-baseline text-sm font-semibold \${
                  changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }\`}>
                  {changeType === 'increase' ? (
                    <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="sr-only">{changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                  {change}
                </div>
              )}
            </dd>
          </div>
        </div>
      </div>
      {previousValue && (
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Previous value: {previousValue}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;`,
        language: 'jsx'
      }
    });
  }
  else {
    // General landing page components
    structure.frontend.components.push({
      name: 'Hero',
      description: 'Hero section for landing page',
      code: {
        name: 'Hero.jsx',
        content: complexity === 'advanced' ? componentTemplates.Hero.advanced : componentTemplates.Hero.basic,
        language: 'jsx'
      }
    });
  }
  
  // Add backend code if Node.js is in tech stack
  if (isNode) {
    structure.backend.routes.push({
      name: 'apiRoutes.js',
      content: `// API routes configuration
const express = require('express');
const router = express.Router();

// Import controllers based on project type
${projectType.includes('e-commerce') ? "const productController = require('../controllers/productController');\nconst cartController = require('../controllers/cartController');\nconst orderController = require('../controllers/orderController');" : 
  projectType.includes('blog') ? "const articleController = require('../controllers/articleController');\nconst commentController = require('../controllers/commentController');" : 
  "const mainController = require('../controllers/mainController');"}

// Define routes
${projectType.includes('e-commerce') ? `// Product routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Cart routes
router.get('/cart', cartController.getCart);
router.post('/cart/add', cartController.addToCart);
router.put('/cart/update', cartController.updateCart);
router.delete('/cart/remove/:id', cartController.removeFromCart);

// Order routes
router.get('/orders', orderController.getAllOrders);
router.post('/orders', orderController.createOrder);
router.get('/orders/:id', orderController.getOrderById);` : 
  
  projectType.includes('blog') ? `// Article routes
router.get('/articles', articleController.getAllArticles);
router.get('/articles/:slug', articleController.getArticleBySlug);
router.post('/articles', articleController.createArticle);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);

// Comment routes
router.get('/comments/article/:articleId', commentController.getCommentsByArticleId);
router.post('/comments', commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);` : 

  `// Main routes
router.get('/data', mainController.getData);
router.post('/submit', mainController.handleSubmission);`}

module.exports = router;`,
      language: 'javascript'
    });
    
    // Add a specific controller based on project type
    if (projectType.includes('e-commerce')) {
      structure.backend.controllers.push({
        name: 'productController.js',
        content: `// Product controller for e-commerce application
const Product = require('../models/Product');

// Get all products with optional filters
exports.getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort, limit = 10, page = 1 } = req.query;
    
    // Build query
    const query = {};
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Build sort options
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    } else {
      sortOptions = { createdAt: -1 }; // Default sort by newest
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
      
    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        total: totalProducts,
        page: parseInt(page),
        pages: Math.ceil(totalProducts / parseInt(limit)),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;
    
    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    
    // Create new product
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock
    });
    
    // Save to database
    const savedProduct = await product.save();
    
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;
    
    // Find and update product
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, imageUrl, stock },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};`,
        language: 'javascript'
      });
    }
    else if (projectType.includes('blog')) {
      structure.backend.controllers.push({
        name: 'articleController.js',
        content: `// Article controller for blog application
const Article = require('../models/Article');
const slugify = require('slugify');

// Get all articles with pagination and filtering
exports.getAllArticles = async (req, res) => {
  try {
    const { category, tag, author, limit = 10, page = 1 } = req.query;
    
    // Build query
    const query = {};
    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (author) query.author = author;
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query
    const articles = await Article.find(query)
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    // Get total count for pagination
    const totalArticles = await Article.countDocuments(query);
    
    res.json({
      articles,
      pagination: {
        total: totalArticles,
        page: parseInt(page),
        pages: Math.ceil(totalArticles / parseInt(limit)),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving articles', error: error.message });
  }
};

// Get a single article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar bio')
      .populate('comments');
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving article', error: error.message });
  }
};

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, category, tags, coverImage, author } = req.body;
    
    // Validate required fields
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required' });
    }
    
    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });
    
    // Create article
    const article = new Article({
      title,
      slug,
      content,
      excerpt: content.substring(0, 150) + '...',
      author,
      category,
      tags,
      coverImage,
      publishedAt: new Date(),
      readingTime: Math.ceil(content.split(' ').length / 200) // Approx. 200 words per minute
    });
    
    // Save to database
    const savedArticle = await article.save();
    
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
};

// Update an article
exports.updateArticle = async (req, res) => {
  try {
    const { title, content, category, tags, coverImage, status } = req.body;
    const updates = { title, content, category, tags, coverImage, status };
    
    // Update slug if title is changed
    if (title) {
      updates.slug = slugify(title, { lower: true, strict: true });
    }
    
    // Update excerpt if content is changed
    if (content) {
      updates.excerpt = content.substring(0, 150) + '...';
      updates.readingTime = Math.ceil(content.split(' ').length / 200);
    }
    
    // Find and update article
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error: error.message });
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
};`,
        language: 'javascript'
      });
    }
  }
  
  return structure;
};

// Generate estimated development time based on complexity
const generateEstimatedTime = (complexity: string, requirements: ProjectRequirement): string => {
  let baseHours = 0;
  
  switch (complexity) {
    case 'advanced':
      baseHours = 160; // 4 weeks
      break;
    case 'intermediate':
      baseHours = 80; // 2 weeks
      break;
    case 'basic':
      baseHours = 40; // 1 week
      break;
  }
  
  // Adjust based on features
  baseHours += requirements.features.length * 4;
  
  // Adjust based on tech stack complexity
  const complexTech = ['GraphQL', 'TypeScript', 'Redux', 'Firebase', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'].filter(
    tech => requirements.techStack.includes(tech)
  ).length;
  
  baseHours += complexTech * 8;
  
  // Format the estimate
  if (baseHours >= 160) {
    return `${Math.ceil(baseHours / 40)} weeks`;
  } else if (baseHours >= 40) {
    return `${Math.ceil(baseHours / 40)} week${baseHours > 40 ? 's' : ''}`;
  } else {
    return `${baseHours} hours`;
  }
};

// Generate a design system based on theme color
const generateDesignSystem = (themeColor?: string): { colors: Record<string, string>; typography: Record<string, string>; spacing: Record<string, string> } => {
  // Default colors
  const defaultColors = {
    primary: '#333333',
    secondary: '#ffffff',
    accent: '#f8f8f8',
    background: '#ffffff',
    text: '#1f2937',
    muted: '#6b7280',
    border: '#e5e7eb',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b'
  };
  
  // Theme color variations
  let colors = { ...defaultColors };
  
  switch (themeColor) {
    case 'green':
      colors = {
        ...colors,
        primary: '#059669',
        secondary: '#ffffff',
        accent: '#f8f8f8'
      };
      break;
    case 'blue':
      colors = {
        ...colors,
        primary: '#2563eb',
        secondary: '#ffffff',
        accent: '#f8f8f8'
      };
      break;
    case 'red':
      colors = {
        ...colors,
        primary: '#dc2626',
        secondary: '#ffffff',
        accent: '#f8f8f8'
      };
      break;
    case 'orange':
      colors = {
        ...colors,
        primary: '#ea580c',
        secondary: '#ffffff',
        accent: '#f8f8f8'
      };
      break;
    case 'pink':
      colors = {
        ...colors,
        primary: '#db2777',
        secondary: '#ffffff',
        accent: '#f8f8f8'
      };
      break;
  }
  
  // Typography
  const typography = {
    fontFamily: 'Inter, system-ui, sans-serif',
    headingFontFamily: 'Inter, system-ui, sans-serif',
    baseSize: '16px',
    scaleRatio: '1.25',
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
    body: '1rem',
    small: '0.875rem',
    xs: '0.75rem',
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700'
  };
  
  // Spacing
  const spacing = {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '40': '10rem',
    '48': '12rem',
    '56': '14rem',
    '64': '16rem'
  };
  
  return {
    colors,
    typography,
    spacing
  };
};

// Generate project configuration files based on tech stack
export const generateConfigurationFiles = (techStack: string[]): EnhancedCodeSection[] => {
  const configurations: EnhancedCodeSection[] = [];
  
  // Add package.json if Node.js is in tech stack
  if (techStack.includes('Node.js')) {
    configurations.push({
      name: 'package.json',
      content: `{
  "name": "generated-project",
  "version": "1.0.0",
  "description": "A project generated by Thynk AI",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"${techStack.includes('MongoDB') ? ',\n    "mongoose": "^6.0.12"' : ''}${techStack.includes('GraphQL') ? ',\n    "apollo-server-express": "^3.5.0",\n    "graphql": "^16.0.0"' : ''}${techStack.includes('React') ? ',\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"' : ''}${techStack.includes('TypeScript') ? ',\n    "typescript": "^4.5.2"' : ''}
  },
  "devDependencies": {
    "nodemon": "^2.0.15"${techStack.includes('Jest') ? ',\n    "jest": "^27.4.5"' : ''}${techStack.includes('TypeScript') ? ',\n    "@types/node": "^16.11.12",\n    "@types/express": "^4.17.13"' : ''}
  }
}`,
      language: 'json'
    });
  }
  
  // Add index.js if Express is in tech stack
  if (techStack.includes('Express') || techStack.includes('Node.js')) {
    configurations.push({
      name: 'index.js',
      content: `const express = require('express');
const path = require('path');
${techStack.includes('MongoDB') ? "const mongoose = require('mongoose');" : ''}
${techStack.includes('GraphQL') ? "const { ApolloServer } = require('apollo-server-express');\nconst { typeDefs, resolvers } = require('./graphql');" : ''}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files if we have a frontend
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', require('./routes/apiRoutes'));

${techStack.includes('GraphQL') ? `// Set up GraphQL server
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  });
  
  await server.start();
  server.applyMiddleware({ app });
  console.log(\`GraphQL server ready at http://localhost:\${PORT}\${server.graphqlPath}\`);
}

startApolloServer();` : ''}

${techStack.includes('MongoDB') ? `// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));` : ''}

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      language: 'javascript'
    });
  }
  
  // Add .env file
  configurations.push({
    name: '.env',
    content: `# Environment Variables
NODE_ENV=development
PORT=5000
${techStack.includes('MongoDB') ? 'MONGODB_URI=mongodb://localhost:27017/myapp' : ''}
${techStack.includes('JWT') ? 'JWT_SECRET=your_jwt_secret_key_here' : ''}`,
    language: 'plaintext'
  });
  
  // Add README.md
  configurations.push({
    name: 'README.md',
    content: `# Generated Project

This project was automatically generated by Thynk AI.

## Tech Stack

${techStack.map(tech => `- ${tech}`).join('\n')}

## Getting Started

### Prerequisites

- Node.js ${techStack.includes('MongoDB') ? '\n- MongoDB' : ''}

### Installation

1. Clone the repository
2. Install dependencies
   \`\`\`
   npm install
   \`\`\`
3. Create a .env file in the root directory with the following variables
   \`\`\`
   NODE_ENV=development
   PORT=5000
   ${techStack.includes('MongoDB') ? 'MONGODB_URI=mongodb://localhost:27017/myapp' : ''}
   \`\`\`
4. Start the server
   \`\`\`
   npm start
   \`\`\`
   
## Project Structure

\`\`\`
.
├── index.js                # App entry point
├── package.json
├── .env                   
├── routes/                 # API routes
├── controllers/            # Route controllers
├── models/                 # Database models
${techStack.includes('GraphQL') ? '├── graphql/                # GraphQL schema and resolvers' : ''}
${techStack.includes('React') ? '├── client/                 # React frontend\n    ├── src/             # React source files\n    ├── public/          # Static assets' : ''}
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

## License

MIT`,
    language: 'markdown'
  });
  
  return configurations;
};

export default {
  enhanceProject,
  generateConfigurationFiles,
  determineProjectComplexity,
  generateEnhancedStructure,
  generateEstimatedTime,
  generateDesignSystem
};
